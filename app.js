const TOKEN_KEY = "netflix_clone_jwt";
const LIST_KEY = "netflix_clone_list";
const REACTIONS_KEY = "netflix_clone_reactions";

const featuredTitles = [
  {
    id: "midnight-protocol",
    title: "Midnight Protocol",
    kind: "Featured Film",
    genre: "Action thriller",
    match: "98% Match",
    year: "2026",
    quality: "4K Ultra HD",
    duration: "2h 14m",
    maturity: "16+",
    progress: 12,
    badge: "No. 1 in your watchlist",
    description:
      "A rogue analyst and a disgraced pilot discover a citywide blackout is only the opening move.",
    cast: "Mira Cole, Dev Rao, Lena Hart",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "red-signal",
    title: "The Red Signal",
    kind: "Limited Series",
    genre: "Mystery drama",
    match: "95% Match",
    year: "2025",
    quality: "Dolby Vision",
    duration: "6 episodes",
    maturity: "13+",
    progress: 0,
    badge: "New episodes tonight",
    description:
      "A detective follows a coded radio transmission that seems to predict disappearances before they happen.",
    cast: "Isha Grey, Marcus Vale, Theo Sen",
    image:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "after-orbit",
    title: "After Orbit",
    kind: "Sci-Fi Event",
    genre: "Space survival",
    match: "94% Match",
    year: "2026",
    quality: "4K Ultra HD",
    duration: "2h 02m",
    maturity: "13+",
    progress: 0,
    badge: "Top 10 this week",
    description:
      "When a rescue vessel wakes early from deep sleep, its crew finds Earth has stopped answering.",
    cast: "Noah Pierce, Asha Quinn, Jun Park",
    image:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1800&q=80"
  }
];

const trendingTitles = [
  {
    id: "night-city-zero",
    title: "Night City Zero",
    kind: "Film",
    genre: "Cyber thriller",
    match: "97% Match",
    year: "2026",
    quality: "4K Ultra HD",
    duration: "1h 56m",
    maturity: "16+",
    progress: 0,
    description:
      "A courier with stolen memories races across a city where every screen knows her name.",
    cast: "Rhea Sol, Anton Black, Kai Noor",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "velvet-heist",
    title: "Velvet Heist",
    kind: "Film",
    genre: "Crime",
    match: "91% Match",
    year: "2024",
    quality: "HD",
    duration: "1h 48m",
    maturity: "16+",
    progress: 0,
    description:
      "A quiet museum guard assembles a crew for a robbery that has to look like nothing happened.",
    cast: "Marta James, Eli Stone, Priya Kline",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "saltwater-crown",
    title: "Saltwater Crown",
    kind: "Series",
    genre: "Survival",
    match: "88% Match",
    year: "2025",
    quality: "Ultra HD",
    duration: "8 episodes",
    maturity: "13+",
    progress: 0,
    description:
      "A luxury expedition turns into a test of loyalty when a storm reveals the captain's hidden map.",
    cast: "Nora Wynn, Caleb Finn, Gia Torres",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "static-bloom",
    title: "Static Bloom",
    kind: "Limited Series",
    genre: "Drama",
    match: "92% Match",
    year: "2026",
    quality: "Dolby Vision",
    duration: "5 episodes",
    maturity: "13+",
    progress: 0,
    description:
      "Two musicians rebuild a broken friendship after an unreleased song becomes an overnight obsession.",
    cast: "Lina Park, Omar Reyes, Jules Finch",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "cold-mercury",
    title: "Cold Mercury",
    kind: "Film",
    genre: "Arctic suspense",
    match: "93% Match",
    year: "2025",
    quality: "4K Ultra HD",
    duration: "2h 01m",
    maturity: "16+",
    progress: 0,
    description:
      "A weather station crew receives a distress call from a ship that sank twenty years ago.",
    cast: "Anika Frost, Ben Vale, Tomas Reed",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "glass-harbor",
    title: "Glass Harbor",
    kind: "Film",
    genre: "Noir mystery",
    match: "90% Match",
    year: "2024",
    quality: "HD",
    duration: "1h 42m",
    maturity: "13+",
    progress: 0,
    description:
      "A journalist returns to her hometown and finds every witness remembers a different version of one night.",
    cast: "Eden Wells, Kiran Shah, Luca Merin",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=700&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1500&q=80"
  }
];

const originalTitles = [
  {
    id: "blackout-bay",
    title: "Blackout Bay",
    kind: "Netflix Original",
    genre: "8 episodes",
    match: "96% Match",
    year: "2026",
    quality: "4K Ultra HD",
    duration: "Season 1",
    maturity: "16+",
    progress: 0,
    description:
      "A seaside town loses power for one night, and every resident wakes up with a secret exposed.",
    cast: "Ari Lane, Milo Chen, Sera Knox",
    image:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "signal-house",
    title: "Signal House",
    kind: "Netflix Original",
    genre: "New season",
    match: "89% Match",
    year: "2025",
    quality: "HD",
    duration: "Season 2",
    maturity: "13+",
    progress: 0,
    description:
      "Contestants move into a remote smart home that starts changing the rules after sunset.",
    cast: "Ivy Cole, Jin Mercer, Sal Arlen",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "north-terminal",
    title: "North Terminal",
    kind: "Netflix Original",
    genre: "International thriller",
    match: "90% Match",
    year: "2025",
    quality: "Dolby Vision",
    duration: "7 episodes",
    maturity: "16+",
    progress: 44,
    description:
      "A delayed train strands strangers in a border station where everyone is waiting for the same envelope.",
    cast: "Sofia Leung, Mark Iyer, Talia Brook",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "neon-atlas",
    title: "Neon Atlas",
    kind: "Netflix Original",
    genre: "Animated adventure",
    match: "87% Match",
    year: "2024",
    quality: "Ultra HD",
    duration: "10 episodes",
    maturity: "7+",
    progress: 27,
    description:
      "A cartographer's apprentice redraws forbidden maps to save a city that moves every morning.",
    cast: "Maya Bright, Rex Alon, Tori Moon",
    image:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1500&q=80"
  }
];

const continueWatching = [
  {
    id: "quiet-chase",
    title: "The Quiet Chase",
    kind: "Series",
    genre: "Episode 4",
    match: "93% Match",
    year: "2025",
    quality: "HD",
    duration: "43m",
    maturity: "13+",
    progress: 68,
    description:
      "A surveillance expert who hates attention becomes the only person a missing witness will call.",
    cast: "Mina Arden, Paxton Lee, Rafi West",
    image:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1500&q=80"
  },
  {
    id: "amber-run",
    title: "Amber Run",
    kind: "Film",
    genre: "32m left",
    match: "86% Match",
    year: "2024",
    quality: "HD",
    duration: "1h 50m",
    maturity: "13+",
    progress: 76,
    description:
      "A marathon runner crosses a desert relay with one rule: never let the baton cool down.",
    cast: "Gia Moss, Ander Miles, Rui Stone",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
    backdrop:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1500&q=80"
  }
];

const allTitles = [
  ...featuredTitles,
  ...trendingTitles,
  ...originalTitles,
  ...continueWatching
];

const state = {
  mode: "login",
  token: localStorage.getItem(TOKEN_KEY) || "",
  user: null,
  heroIndex: 0,
  activeTitleId: "",
  watchlist: new Set(readStored(LIST_KEY, ["night-city-zero", "midnight-protocol"])),
  reactions: readStored(REACTIONS_KEY, {})
};

const authScreen = document.querySelector("#auth-screen");
const appScreen = document.querySelector("#app-screen");
const authForm = document.querySelector("#auth-form");
const authError = document.querySelector("#auth-error");
const loginTab = document.querySelector("#login-tab");
const registerTab = document.querySelector("#register-tab");
const nameField = document.querySelector("#name-field");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const rememberInput = document.querySelector("#remember");
const authSubmit = document.querySelector("#auth-submit span");
const demoFill = document.querySelector("#demo-fill");
const logoutButton = document.querySelector("#logout-button");
const profileButton = document.querySelector("#profile-button");
const profileMenu = document.querySelector("#profile-menu");
const profileEmail = document.querySelector("#profile-email");
const profilePlan = document.querySelector("#profile-plan");
const profileName = document.querySelector("#profile-name");
const avatar = document.querySelector("#avatar");
const notificationPanel = document.querySelector("#notification-panel");
const movieGrid = document.querySelector("#movie-grid");
const originalsRail = document.querySelector("#originals-rail");
const continueRail = document.querySelector("#continue-rail");
const watchlistGrid = document.querySelector("#watchlist-grid");
const searchInput = document.querySelector("#search-input");
const clearSearch = document.querySelector("#clear-search");
const toast = document.querySelector("#toast");
const notifyButton = document.querySelector("#notify-button");
const hero = document.querySelector("#home");
const heroBadge = document.querySelector("#hero-badge");
const heroTitle = document.querySelector("#hero-title");
const heroDescription = document.querySelector("#hero-description");
const heroMatch = document.querySelector("#hero-match");
const heroYear = document.querySelector("#hero-year");
const heroQuality = document.querySelector("#hero-quality");
const heroDuration = document.querySelector("#hero-duration");
const heroPlay = document.querySelector("#hero-play");
const heroList = document.querySelector("#hero-list");
const heroInfo = document.querySelector("#hero-info");
const heroPrev = document.querySelector("#hero-prev");
const heroNext = document.querySelector("#hero-next");
const titleModal = document.querySelector("#title-modal");
const modalClose = document.querySelector("#modal-close");
const modalArt = document.querySelector("#modal-art");
const modalKicker = document.querySelector("#modal-kicker");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalMeta = document.querySelector("#modal-meta");
const modalCast = document.querySelector("#modal-cast");
const modalPlay = document.querySelector("#modal-play");
const modalList = document.querySelector("#modal-list");
const modalLike = document.querySelector("#modal-like");
const playerModal = document.querySelector("#player-modal");
const playerScreen = document.querySelector("#player-screen");
const playerClose = document.querySelector("#player-close");
const playerTitle = document.querySelector("#player-title");
const playerProgress = document.querySelector("#player-progress");
const playerTime = document.querySelector("#player-time");

let playerTimer = 0;

function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function icon(name) {
  const paths = {
    play: '<path d="M8 5v14l11-7Z" />',
    plus: '<path d="M12 5v14M5 12h14" />',
    check: '<path d="M20 6 9 17l-5-5" />',
    info:
      '<path d="M12 16v-4" /><path d="M12 8h.01" /><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />',
    like:
      '<path d="M7 10v11" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h1a2 2 0 0 1 2 2v1.88Z" />'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.play}</svg>`;
}

function getTitle(id) {
  return allTitles.find((title) => title.id === id) || featuredTitles[0];
}

async function api(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(path, {
    ...options,
    headers
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

function setMode(mode) {
  state.mode = mode;
  const isRegister = mode === "register";
  loginTab.classList.toggle("active", !isRegister);
  registerTab.classList.toggle("active", isRegister);
  loginTab.setAttribute("aria-selected", String(!isRegister));
  registerTab.setAttribute("aria-selected", String(isRegister));
  nameField.classList.toggle("hidden", !isRegister);
  nameInput.required = isRegister;
  passwordInput.autocomplete = isRegister ? "new-password" : "current-password";
  authSubmit.textContent = isRegister ? "Create Account" : "Sign In";
  authError.textContent = "";
}

function saveToken(token) {
  state.token = token;
  if (rememberInput.checked) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

function clearToken() {
  state.token = "";
  state.user = null;
  localStorage.removeItem(TOKEN_KEY);
}

function showApp(user) {
  state.user = user;
  authScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");
  profileName.textContent = user.name.split(" ")[0] || "Viewer";
  profileEmail.textContent = user.email;
  profilePlan.textContent = `${user.plan || "Premium"} plan`;
  avatar.textContent = (user.name || user.email || "V").slice(0, 1).toUpperCase();
  avatar.style.background = user.avatarColor || "#e50914";
  renderApp();
}

function showAuth() {
  closeDetails();
  closePlayer();
  authScreen.classList.remove("hidden");
  appScreen.classList.add("hidden");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.add("hidden");
  }, 2600);
}

function setListButton(button, titleId) {
  const inList = state.watchlist.has(titleId);
  button.classList.toggle("is-active", inList);
  button.dataset.titleId = titleId;
  button.innerHTML = `${icon(inList ? "check" : "plus")}<span>${
    inList ? "In My List" : "My List"
  }</span>`;
  button.setAttribute(
    "aria-label",
    `${inList ? "Remove" : "Add"} ${getTitle(titleId).title} ${
      inList ? "from" : "to"
    } My List`
  );
}

function setReactionButton(button, titleId) {
  const isLiked = state.reactions[titleId] === "like";
  button.classList.toggle("is-active", isLiked);
  button.dataset.titleId = titleId;
  button.innerHTML = `${icon("like")}<span>${isLiked ? "Liked" : "Like"}</span>`;
}

function renderHero() {
  const title = featuredTitles[state.heroIndex];
  hero.style.setProperty("--hero-image", `url("${title.backdrop}")`);
  heroBadge.lastChild.textContent = ` ${title.badge}`;
  heroTitle.textContent = title.title;
  heroDescription.textContent = title.description;
  heroMatch.textContent = title.match;
  heroYear.textContent = title.year;
  heroQuality.textContent = title.quality;
  heroDuration.textContent = title.duration;
  heroPlay.dataset.titleId = title.id;
  heroInfo.dataset.titleId = title.id;
  setListButton(heroList, title.id);
}

function titleSearchText(title) {
  return [
    title.title,
    title.kind,
    title.genre,
    title.description,
    title.cast,
    title.year
  ]
    .join(" ")
    .toLowerCase();
}

function cardActions(title) {
  const inList = state.watchlist.has(title.id);
  const liked = state.reactions[title.id] === "like";
  return `
    <div class="movie-actions">
      <button class="round-action" type="button" data-action="play" data-title-id="${title.id}" aria-label="Play ${escapeHtml(title.title)}">
        ${icon("play")}
      </button>
      <button class="round-action ${inList ? "is-active" : ""}" type="button" data-action="list" data-title-id="${title.id}" aria-label="${inList ? "Remove from" : "Add to"} My List">
        ${icon(inList ? "check" : "plus")}
      </button>
      <button class="round-action ${liked ? "is-active" : ""}" type="button" data-action="like" data-title-id="${title.id}" aria-label="Like ${escapeHtml(title.title)}">
        ${icon("like")}
      </button>
      <button class="round-action" type="button" data-action="details" data-title-id="${title.id}" aria-label="More info about ${escapeHtml(title.title)}">
        ${icon("info")}
      </button>
    </div>
  `;
}

function movieCard(title) {
  return `
    <article class="movie-card" data-title-id="${title.id}">
      <button class="card-hit" type="button" data-action="details" data-title-id="${title.id}" aria-label="Open ${escapeHtml(title.title)} details"></button>
      <img src="${title.image}" alt="${escapeHtml(title.title)} poster" loading="lazy" />
      <div class="quick-preview">
        <span>${escapeHtml(title.kind)}</span>
        <strong>${escapeHtml(title.maturity)}</strong>
      </div>
      <div class="movie-info">
        <span class="match">${escapeHtml(title.match)}</span>
        <h3>${escapeHtml(title.title)}</h3>
        <p>${escapeHtml(title.genre)}</p>
        ${cardActions(title)}
      </div>
    </article>
  `;
}

function railCard(title) {
  const progress = title.progress
    ? `<div class="progress" aria-label="${title.progress}% watched"><span style="width:${title.progress}%"></span></div>`
    : "";

  return `
    <article class="poster-card" data-title-id="${title.id}">
      <button class="card-hit" type="button" data-action="details" data-title-id="${title.id}" aria-label="Open ${escapeHtml(title.title)} details"></button>
      <img src="${title.backdrop}" alt="${escapeHtml(title.title)} backdrop" loading="lazy" />
      <div class="movie-info">
        <span class="match">${escapeHtml(title.match)}</span>
        <h3>${escapeHtml(title.title)}</h3>
        <p>${escapeHtml(title.genre)}</p>
        ${progress}
        ${cardActions(title)}
      </div>
    </article>
  `;
}

function renderCatalog() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = trendingTitles.filter((title) => titleSearchText(title).includes(query));

  movieGrid.innerHTML = filtered.length
    ? filtered.map(movieCard).join("")
    : '<div class="empty-state">No titles match your search.</div>';
  originalsRail.innerHTML = originalTitles.map(railCard).join("");
  continueRail.innerHTML = continueWatching.map(railCard).join("");
}

function renderWatchlist() {
  const savedTitles = allTitles.filter((title) => state.watchlist.has(title.id));
  watchlistGrid.innerHTML = savedTitles.length
    ? savedTitles.map(movieCard).join("")
    : '<div class="empty-state">Your list is waiting for a good first pick.</div>';
}

function renderApp() {
  renderHero();
  renderCatalog();
  renderWatchlist();
}

function changeHero(direction) {
  state.heroIndex =
    (state.heroIndex + direction + featuredTitles.length) % featuredTitles.length;
  renderHero();
  hero.classList.remove("hero-pulse");
  window.requestAnimationFrame(() => hero.classList.add("hero-pulse"));
}

function toggleWatchlist(titleId) {
  const title = getTitle(titleId);
  if (state.watchlist.has(titleId)) {
    state.watchlist.delete(titleId);
    showToast(`${title.title} removed from My List.`);
  } else {
    state.watchlist.add(titleId);
    showToast(`${title.title} added to My List.`);
  }
  writeStored(LIST_KEY, [...state.watchlist]);
  renderApp();
  if (!titleModal.classList.contains("hidden")) {
    setListButton(modalList, titleId);
  }
}

function toggleLike(titleId) {
  const title = getTitle(titleId);
  if (state.reactions[titleId] === "like") {
    delete state.reactions[titleId];
    showToast(`Removed like for ${title.title}.`);
  } else {
    state.reactions[titleId] = "like";
    showToast(`Liked ${title.title}.`);
  }
  writeStored(REACTIONS_KEY, state.reactions);
  renderApp();
  if (!titleModal.classList.contains("hidden")) {
    setReactionButton(modalLike, titleId);
  }
}

function openDetails(titleId) {
  const title = getTitle(titleId);
  state.activeTitleId = title.id;
  modalArt.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,.75), rgba(0,0,0,.08)), url("${title.backdrop}")`;
  modalKicker.textContent = title.kind;
  modalTitle.textContent = title.title;
  modalDescription.textContent = title.description;
  modalMeta.innerHTML = [title.match, title.year, title.quality, title.duration, title.maturity]
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
  modalCast.textContent = `Cast: ${title.cast}`;
  modalPlay.dataset.titleId = title.id;
  setListButton(modalList, title.id);
  setReactionButton(modalLike, title.id);
  titleModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeDetails() {
  titleModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

function openPlayer(titleId) {
  const title = getTitle(titleId);
  closeDetails();
  playerTitle.textContent = title.title;
  playerScreen.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,.88), rgba(0,0,0,.18)), url("${title.backdrop}")`;
  playerModal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  let progress = Math.max(0, Math.min(92, title.progress || 0));
  window.clearInterval(playerTimer);
  updatePlayerProgress(progress);
  playerTimer = window.setInterval(() => {
    progress = Math.min(100, progress + 4);
    updatePlayerProgress(progress);
    if (progress >= 100) {
      window.clearInterval(playerTimer);
      showToast(`Credits rolling on ${title.title}.`);
    }
  }, 850);
}

function updatePlayerProgress(progress) {
  playerProgress.style.width = `${progress}%`;
  const minutes = Math.floor((progress / 100) * 134);
  playerTime.textContent = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(
    minutes % 60
  ).padStart(2, "0")}`;
}

function closePlayer() {
  window.clearInterval(playerTimer);
  playerModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

async function bootstrapSession() {
  if (!state.token) {
    showAuth();
    return;
  }

  try {
    const data = await api("/api/auth/me");
    showApp(data.user);
  } catch {
    clearToken();
    showAuth();
  }
}

loginTab.addEventListener("click", () => setMode("login"));
registerTab.addEventListener("click", () => setMode("register"));

demoFill.addEventListener("click", () => {
  setMode("login");
  emailInput.value = "demo@netflix.local";
  passwordInput.value = "Stream@1234";
  showToast("Demo credentials added.");
});

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  authError.textContent = "";
  authForm.classList.add("loading");

  const payload = {
    email: emailInput.value,
    password: passwordInput.value
  };
  if (state.mode === "register") {
    payload.name = nameInput.value;
  }

  try {
    const endpoint =
      state.mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const data = await api(endpoint, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    saveToken(data.token);
    showApp(data.user);
    showToast(`Welcome, ${data.user.name}.`);
  } catch (error) {
    authError.textContent = error.message;
  } finally {
    authForm.classList.remove("loading");
  }
});

logoutButton.addEventListener("click", async () => {
  try {
    await api("/api/auth/logout", { method: "POST" });
  } catch {
    // Local token removal is enough for this stateless demo session.
  }
  clearToken();
  showAuth();
  showToast("Signed out.");
});

searchInput.addEventListener("input", renderCatalog);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  renderCatalog();
  searchInput.focus();
});

notifyButton.addEventListener("click", (event) => {
  event.stopPropagation();
  notificationPanel.classList.toggle("hidden");
  profileMenu.classList.add("hidden");
});

profileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  profileMenu.classList.toggle("hidden");
  notificationPanel.classList.add("hidden");
});

heroPrev.addEventListener("click", () => changeHero(-1));
heroNext.addEventListener("click", () => changeHero(1));
modalClose.addEventListener("click", closeDetails);
playerClose.addEventListener("click", closePlayer);

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  const scrollButton = event.target.closest("[data-scroll-rail]");

  if (action) {
    const titleId = action.dataset.titleId;
    if (action.dataset.action === "play") openPlayer(titleId);
    if (action.dataset.action === "details") openDetails(titleId);
    if (action.dataset.action === "list") toggleWatchlist(titleId);
    if (action.dataset.action === "like") toggleLike(titleId);
    return;
  }

  if (scrollButton) {
    const rail = document.getElementById(scrollButton.dataset.scrollRail);
    const direction = Number(scrollButton.dataset.direction || 1);
    rail.scrollBy({ left: direction * rail.clientWidth * 0.86, behavior: "smooth" });
    return;
  }

  if (!profileMenu.contains(event.target) && !profileButton.contains(event.target)) {
    profileMenu.classList.add("hidden");
  }
  if (!notificationPanel.contains(event.target) && !notifyButton.contains(event.target)) {
    notificationPanel.classList.add("hidden");
  }
});

titleModal.addEventListener("click", (event) => {
  if (event.target === titleModal) closeDetails();
});

playerModal.addEventListener("click", (event) => {
  if (event.target === playerModal) closePlayer();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetails();
    closePlayer();
    profileMenu.classList.add("hidden");
    notificationPanel.classList.add("hidden");
  }
  if (appScreen.classList.contains("hidden")) return;
  if (event.key === "ArrowLeft" && titleModal.classList.contains("hidden")) changeHero(-1);
  if (event.key === "ArrowRight" && titleModal.classList.contains("hidden")) changeHero(1);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-links a")
      .forEach((item) => item.classList.toggle("active", item === link));
  });
});

setMode("login");
bootstrapSession();
