# Interview Notes: Netflix Clone With JWT Authentication

## 1. Short Introduction

This project is a Netflix-style streaming web application with a polished
frontend and a working JWT authentication system. I built it using HTML, CSS,
JavaScript, and Node.js. The main goal was to show both frontend UI skills and
backend authentication knowledge in one complete project.

The app is not only a static UI. Users can log in, register, stay signed in with
a JWT token, search movies, open movie detail popups, add movies to My List, like
titles, switch featured hero content, and open a fake player overlay.

## 2. How I Would Explain The Project

I built a Netflix clone where the frontend behaves like a real streaming
dashboard and the backend handles authentication.

On the frontend, I focused on a clean Netflix-like experience: a cinematic login
page, a hero banner, movie cards, horizontal rows, responsive design, modals, a
watchlist, search, and interactive buttons.

On the backend, I created a small Node.js server. It serves the website files and
also exposes API routes for registration, login, logout, health check, and
current user verification. When a user logs in, the backend verifies the
password, creates a signed JWT, and sends it back to the frontend.

The frontend stores the JWT and uses it when calling the protected `/api/auth/me`
route. If the token is valid, the user stays logged in even after refreshing the
page.

## 3. Main Features

- Login and register system
- JWT-based session handling
- Password hashing with PBKDF2 and random salt
- Demo account for quick testing
- Protected `/api/auth/me` route
- Responsive Netflix-style UI
- Search functionality
- Movie detail modal
- Fake player overlay
- Like button
- My List watchlist
- Profile dropdown
- Notification dropdown
- Persistent watchlist and likes using localStorage

## 4. Tech Stack

Frontend:

- HTML
- CSS
- JavaScript

Backend:

- Node.js
- Built-in `http` module
- Built-in `crypto` module
- File-based JSON storage for demo users

Authentication:

- JWT signed with HS256
- PBKDF2 password hashing
- Bearer token authorization

## 5. Authentication Flow

This is the flow I would explain in an interview:

1. The user enters an email and password.
2. The frontend sends the credentials to `/api/auth/login`.
3. The backend finds the user by email.
4. It hashes the entered password using the same salt stored for that user.
5. It compares the generated hash with the stored password hash.
6. If the password is correct, the server creates a JWT.
7. The JWT contains user information like user id, email, name, plan, issued
   time, and expiry time.
8. The server signs the JWT with a secret key.
9. The frontend stores the token.
10. On refresh, the frontend sends the token to `/api/auth/me`.
11. The server verifies the token signature and expiry.
12. If valid, the user remains logged in.

## 6. JWT Explanation

JWT stands for JSON Web Token. It is a signed token that allows the server to
verify a user's identity without storing a session on the server.

In this project, the token has three parts:

```text
header.payload.signature
```

- Header tells the algorithm, which is HS256.
- Payload contains user claims like id, email, name, issue time, and expiry.
- Signature proves the token was created by the server and was not changed.

If someone changes the payload, the signature will no longer match, so the server
rejects the token.

## 7. Why I Used JWT

I used JWT because it is a common authentication approach for modern web apps and
APIs. It is useful when the frontend and backend communicate through API calls.

It also helped me demonstrate:

- Token creation
- Token verification
- Expiry handling
- Protected API routes
- Bearer token usage

## 8. Password Security

I did not store passwords directly. I used PBKDF2 hashing with a random salt.

The salt makes sure that even if two users have the same password, their stored
hashes will be different. PBKDF2 also performs many iterations, which makes brute
force attacks harder compared to a simple hash.

## 9. Important API Routes

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

What they do:

- `/api/health` checks if the backend is running.
- `/api/auth/register` creates a new user.
- `/api/auth/login` validates credentials and returns a JWT.
- `/api/auth/me` verifies the JWT and returns the logged-in user.
- `/api/auth/logout` confirms logout on the client side.

## 10. How Logout Works

This project uses stateless JWT authentication. That means the server does not
store active sessions.

When the user logs out, the frontend removes the JWT from localStorage. After
that, the frontend no longer sends the token, so protected user data cannot be
loaded.

In a production app, I would improve logout by using httpOnly cookies, refresh
tokens, token rotation, and optionally a token blacklist for immediate
server-side invalidation.

## 11. Frontend Explanation

The frontend is built as a single-page experience with plain JavaScript.

Important frontend parts:

- `index.html` contains the structure.
- `style.css` contains the complete responsive UI.
- `app.js` contains all interactions and API calls.

The app changes screens based on authentication state. If a valid token exists,
it shows the main streaming dashboard. If not, it shows the login/register page.

Movie data is stored in JavaScript arrays. The UI is rendered dynamically from
that data, which makes it easier to update cards, rows, modals, and the hero
section from one source.

## 12. Search Explanation

The search input filters the movie list on the frontend. It checks title, genre,
cast, year, kind, and description. This is enough for a demo project because the
movie data is small.

For a production system, I would move search to the backend or use a search
service if the catalog became large.

## 13. Watchlist And Likes

My List and likes are saved in localStorage. This makes the app feel persistent
after refresh.

In a production app, I would save this data in a database connected to the user's
account, so the same watchlist appears across devices.

## 14. What I Am Proud Of

I am proud that the project is complete from end to end. It has:

- A strong visual interface
- A real backend
- Secure password hashing
- JWT-based login
- Protected route verification
- Interactive frontend behavior
- Responsive design

It shows that I can connect frontend design with backend logic.

## 15. Limitations I Can Honestly Mention

This project is a demo, so there are things I would improve for production:

- Use a real database instead of a JSON file.
- Store JWTs in secure httpOnly cookies instead of localStorage.
- Add HTTPS.
- Add rate limiting for login attempts.
- Add password reset and email verification.
- Add refresh tokens.
- Add real video streaming.
- Add backend storage for watchlist and likes.
- Add automated tests.
- Add better role-based access control if needed.

Being honest about limitations is good because it shows that I understand the
difference between a demo project and a production application.

## 16. Common Interview Questions And Answers

### Q1. What problem does this project solve?

It demonstrates a complete streaming app experience with user authentication. It
combines frontend UI development with backend authentication and protected API
routes.

### Q2. Is this only a frontend clone?

No. It has a real Node.js backend. The backend handles registration, login,
password hashing, JWT signing, JWT verification, and protected user lookup.

### Q3. Why did you use JWT?

I used JWT because it is commonly used for API authentication. It allows the
frontend to send a signed token with requests, and the backend can verify that
token without storing a server-side session.

### Q4. Where is the JWT stored?

In this demo, it is stored in localStorage. This keeps the user logged in after a
page refresh. In production, I would prefer httpOnly secure cookies because they
reduce the risk of token theft through XSS.

### Q5. How do you protect routes?

The protected route is `/api/auth/me`. The frontend sends the JWT in the
Authorization header as a Bearer token. The backend verifies the token signature,
checks expiry, and then returns the user only if the token is valid.

### Q6. How are passwords stored?

Passwords are hashed using PBKDF2 with a random salt. The plain password is never
stored. During login, the entered password is hashed again with the stored salt,
and the result is compared with the saved hash.

### Q7. What happens if someone modifies the JWT?

The signature will become invalid. Since the backend recalculates the signature
using the secret key, any modified token will fail verification and be rejected.

### Q8. What happens when the token expires?

The backend checks the `exp` value inside the token. If the expiry time has
passed, the token is rejected and the frontend sends the user back to login.

### Q9. How does logout work?

The frontend removes the JWT from localStorage. Since the app no longer has a
token to send, the user is effectively logged out. For production, I would add
refresh tokens or token blacklisting if immediate server-side invalidation is
needed.

### Q10. Why did you use a JSON file instead of a database?

For this project, the goal was to keep the setup simple and focus on the
authentication flow and UI. A JSON file is fine for a demo. In production, I
would use a database like MongoDB, PostgreSQL, or MySQL.

### Q11. How would you make this production-ready?

I would use a real database, store tokens in httpOnly secure cookies, add HTTPS,
rate limiting, refresh tokens, email verification, password reset, input
validation, logging, automated tests, and real media storage.

### Q12. How does the frontend know if the user is already logged in?

On page load, the frontend checks if a JWT exists. If it does, it calls
`/api/auth/me`. If the backend verifies the token successfully, the app opens the
dashboard. Otherwise, the token is removed and the login page is shown.

### Q13. What is the role of localStorage in this project?

localStorage stores the JWT, watchlist, and liked titles. The JWT keeps the user
logged in after refresh, and the watchlist and likes make the UI feel persistent.

### Q14. What are the security risks of localStorage?

The main risk is XSS. If malicious JavaScript runs on the page, it can read
localStorage. That is why in production I would use httpOnly secure cookies for
tokens and also apply strong XSS protection.

### Q15. Why did you not use Express?

I wanted to show that I understand the core Node.js concepts. I used the built-in
`http`, `fs`, and `crypto` modules to keep the project lightweight and
dependency-free. In a larger project, Express or another framework would make
routing and middleware easier.

### Q16. How is the UI made responsive?

The CSS uses responsive grids, flexible layouts, clamp values, and media queries.
The layout changes for smaller screens so the app still works on mobile and
tablet sizes.

### Q17. How does the fake player work?

When the user clicks Play, the app opens a full-screen overlay with the selected
title and background image. A progress bar updates using JavaScript to simulate
playback.

### Q18. How is My List implemented?

Each movie has an id. When the user clicks My List, the id is added to or removed
from a Set in JavaScript. Then it is saved to localStorage and the UI re-renders.

### Q19. How would you add real videos?

I would store video metadata in the database, use a video player on the frontend,
and serve video through a proper media pipeline or CDN. For protected content, I
would also need signed URLs or DRM depending on the requirements.

### Q20. What did you learn from this project?

I learned how to connect a polished frontend with backend authentication. I also
practiced JWT signing and verification, password hashing, protected routes,
frontend state management, localStorage persistence, responsive design, and
building an app-like user experience without heavy frameworks.

## 17. Quick Demo Script

If I need to demo it in an interview, I can say:

1. First, this is the login page with a demo account.
2. I log in using the demo credentials.
3. The backend validates the password and returns a JWT.
4. The frontend stores the token and opens the dashboard.
5. I can switch featured titles using the hero arrows.
6. I can search for titles.
7. I can open a movie detail modal.
8. I can click Play to open the player overlay.
9. I can add or remove titles from My List.
10. If I refresh, the app checks `/api/auth/me` with the JWT and keeps me logged
    in.
11. When I sign out, the token is removed and the login screen returns.

## 18. Best One-Minute Answer

This is a Netflix-inspired streaming app with JWT authentication. I built the UI
with HTML, CSS, and JavaScript, and I built the backend with Node.js. The app has
login, register, protected session checking, password hashing, movie search,
detail modals, a watchlist, likes, a profile dropdown, notifications, and a fake
player overlay. The backend signs JWTs after login and verifies them on the
protected `/api/auth/me` route. For a demo, data is stored in JSON and
localStorage, but in production I would move users and watchlist data to a real
database, use secure httpOnly cookies, add HTTPS, rate limiting, refresh tokens,
and automated tests.
