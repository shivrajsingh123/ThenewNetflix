const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const JWT_SECRET =
  process.env.JWT_SECRET ||
  "dev-secret-change-this-before-deploying-netflix-clone";
const TOKEN_TTL_SECONDS = 60 * 60 * 6;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlJson(input) {
  return base64Url(JSON.stringify(input));
}

function fromBase64Url(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
}

function signJwt(payload) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const claims = {
    ...payload,
    iat: now,
    exp: now + TOKEN_TTL_SECONDS
  };
  const unsigned = `${base64UrlJson(header)}.${base64UrlJson(claims)}`;
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(unsigned)
    .digest("base64url");
  return `${unsigned}.${signature}`;
}

function verifyJwt(token) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Malformed token");
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsigned = `${encodedHeader}.${encodedPayload}`;
  const expected = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(unsigned)
    .digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    throw new Error("Invalid token signature");
  }

  const header = JSON.parse(fromBase64Url(encodedHeader));
  const payload = JSON.parse(fromBase64Url(encodedPayload));
  if (header.alg !== "HS256" || header.typ !== "JWT") {
    throw new Error("Unsupported token header");
  }
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }
  return payload;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    avatarColor: user.avatarColor
  };
}

async function ensureStore() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  try {
    await fsp.access(USERS_FILE, fs.constants.F_OK);
  } catch {
    const demoUser = createUserRecord({
      name: "Demo Viewer",
      email: "demo@netflix.local",
      password: "Stream@1234"
    });
    await fsp.writeFile(USERS_FILE, JSON.stringify([demoUser], null, 2));
  }
}

async function readUsers() {
  await ensureStore();
  const raw = await fsp.readFile(USERS_FILE, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeUsers(users) {
  await fsp.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

function createUserRecord({ name, email, password }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 120000, 64, "sha512")
    .toString("hex");

  return {
    id: crypto.randomUUID(),
    name: String(name || "").trim(),
    email: normalizeEmail(email),
    passwordHash,
    salt,
    plan: "Premium",
    avatarColor: pickAvatarColor(email),
    createdAt: new Date().toISOString()
  };
}

function pickAvatarColor(seed) {
  const colors = ["#e50914", "#00a8e8", "#f5a623", "#15c47e", "#8b5cf6"];
  const hash = crypto.createHash("sha256").update(String(seed)).digest();
  return colors[hash[0] % colors.length];
}

function verifyPassword(password, user) {
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 120000, 64, "sha512")
    .toString("hex");
  const inputBuffer = Buffer.from(hash, "hex");
  const storedBuffer = Buffer.from(user.passwordHash, "hex");
  return (
    inputBuffer.length === storedBuffer.length &&
    crypto.timingSafeEqual(inputBuffer, storedBuffer)
  );
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

function sendError(res, status, message) {
  sendJson(res, status, { error: message });
}

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  return scheme === "Bearer" ? token : "";
}

async function authenticate(req) {
  const token = getBearerToken(req);
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const payload = verifyJwt(token);
  const users = await readUsers();
  const user = users.find((item) => item.id === payload.sub);
  if (!user) {
    throw new Error("User no longer exists");
  }
  return user;
}

function createSession(user) {
  return {
    token: signJwt({
      sub: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan
    }),
    expiresIn: TOKEN_TTL_SECONDS,
    user: publicUser(user)
  };
}

function validateAuthInput({ name, email, password }, isRegister) {
  const cleanEmail = normalizeEmail(email);
  const cleanName = String(name || "").trim();
  const cleanPassword = String(password || "");

  if (isRegister && cleanName.length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return "Enter a valid email address.";
  }
  if (cleanPassword.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return "";
}

async function handleApi(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "netflix-clone-jwt" });
    return;
  }

  if (req.method === "POST" && pathname === "/api/auth/register") {
    const body = await parseBody(req);
    const validationError = validateAuthInput(body, true);
    if (validationError) {
      sendError(res, 400, validationError);
      return;
    }

    const users = await readUsers();
    const email = normalizeEmail(body.email);
    if (users.some((user) => user.email === email)) {
      sendError(res, 409, "An account already exists for this email.");
      return;
    }

    const user = createUserRecord({
      name: body.name,
      email,
      password: body.password
    });
    users.push(user);
    await writeUsers(users);
    sendJson(res, 201, createSession(user));
    return;
  }

  if (req.method === "POST" && pathname === "/api/auth/login") {
    const body = await parseBody(req);
    const validationError = validateAuthInput(body, false);
    if (validationError) {
      sendError(res, 400, validationError);
      return;
    }

    const users = await readUsers();
    const user = users.find((item) => item.email === normalizeEmail(body.email));
    if (!user || !verifyPassword(String(body.password || ""), user)) {
      sendError(res, 401, "Email or password is incorrect.");
      return;
    }

    sendJson(res, 200, createSession(user));
    return;
  }

  if (req.method === "GET" && pathname === "/api/auth/me") {
    try {
      const user = await authenticate(req);
      sendJson(res, 200, { user: publicUser(user) });
    } catch (error) {
      sendError(res, 401, error.message);
    }
    return;
  }

  if (req.method === "POST" && pathname === "/api/auth/logout") {
    sendJson(res, 200, { ok: true });
    return;
  }

  sendError(res, 404, "API route not found.");
}

async function serveStatic(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const decodedPath = decodeURIComponent(requestedPath);
  const filePath = path.resolve(ROOT, `.${decodedPath}`);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const stats = await fsp.stat(filePath);
    if (stats.isDirectory()) {
      throw new Error("Directory listing is disabled");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=3600"
    });
    fs.createReadStream(filePath).pipe(res);
  } catch {
    const fallback = path.join(ROOT, "index.html");
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    });
    fs.createReadStream(fallback).pipe(res);
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }
    await serveStatic(req, res);
  } catch (error) {
    sendError(res, 500, error.message || "Something went wrong.");
  }
});

ensureStore()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Netflix clone running at http://localhost:${PORT}`);
      console.log("Demo login: demo@netflix.local / Stream@1234");
    });
  })
  .catch((error) => {
    console.error("Failed to initialize app:", error);
    process.exit(1);
  });
