# GiftLink — Full Stack Capstone Project

A full-stack app where users give away household items they no longer need,
or find free items instead of buying new ones.

- Backend: Node.js + Express + MongoDB (native driver) + JWT auth
- Frontend: React
- Search: category filtering + `natural` npm package for tokenizing/stemming

---

## 1. Prerequisites

- Node.js (v18+) — https://nodejs.org
- MongoDB running locally, OR a free MongoDB Atlas cluster
  - Local: install MongoDB Community Server and run `mongod` in a terminal
  - Atlas (easier, no install): https://www.mongodb.com/cloud/atlas/register — create a free
    cluster, add your IP to network access, create a DB user, and copy the connection string.
- Git + a GitHub account

---

## 2. Project setup

```bash
# unzip the project, then:
cd giftlink-project

# ---- Backend ----
cd backend
cp .env.example .env
# edit .env: set MONGO_URL to your local MongoDB or Atlas connection string
npm install

# Import the 16 sample gift items into MongoDB (Task 3)
npm run import-data
# You should see: "16 documents were inserted"
# Copy/paste that terminal output into a file named "inserted_items"

# Start the backend server
npm start
# Should print: "Server running on port 3060"
```

Open a **second terminal** for the frontend:

```bash
cd giftlink-project/frontend
npm install
npm start
# Opens http://localhost:3000 in your browser
```

Your app is now running fully locally:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3060

---

## 3. Putting it on GitHub (from scratch)

```bash
cd giftlink-project
git init
git add .
git commit -m "Initial commit: GiftLink full-stack project"
```

Then on GitHub.com:
1. Create a new repository named exactly: `fullstack-capstone-project`
2. Copy the remote URL it gives you, then:

```bash
git remote add origin https://github.com/<your-username>/fullstack-capstone-project.git
git branch -M main
git push -u origin main
```

---

## 4. Task-by-task checklist

**Task 1** — `user-story.md` is at the repo root. Get its GitHub URL after pushing
(click the file on GitHub, copy the URL).

**Task 2** — On GitHub: go to your repo → **Issues** tab → create at least 8 issues,
each labeled `new`, `icebox`, `technical-debt`, or `backlog` (create these labels if
they don't exist: Issues → Labels → New label). Screenshot that page and save it as
`userstories.png`.

**Task 3** — Terminal output of `npm run import-data`, saved as a file named `inserted_items`.

**Task 4** — `backend/util/database.js` — already contains `await client.connect()`. Push it, copy its GitHub URL.

**Task 5** — `backend/routes/giftRoutes.js` — uses `connectToDatabase()`, serves `/api/gifts` and `/api/gifts/:id`.

**Task 6** — `backend/routes/searchRoutes.js` — filters by `category`.

**Task 7** — `backend/app.js` — has `app.use('/api/search', searchRoutes)`.

**Task 8** — `backend/search/index.js` — imports `natural`.

**Task 9** — `frontend/src/components/RegisterPage/RegisterPage.js` — fetch has `method` and `headers`.

**Task 10** — `frontend/src/components/LoginPage/LoginPage.js` — fetch headers include `Content-Type` and `Authorization`.

**Task 11** — `backend/routes/authRoutes.js` — has `/register`, `/login`, `/update`.

**Task 12** — Deploy the app (see Deployment section below), then screenshot the live
landing page (showing the deployment URL, title, tagline, and Get Started button) as
`deployed_landingpage.png`.

**Tasks 13–17** — Run these curl commands against your **running local backend**
(`http://localhost:3060`) and save the command + its output into files named exactly
`mainpage`, `register`, `login`, `item_detail`, `search_item` (see section 5 below).

**Task 18** — Push to GitHub with the included `.github/workflows/ci.yml`, let the
Actions tab run, then copy the terminal-style log output of a successful run and save
it as a file named `CI/CD`.

---

## 5. Exact curl commands (Tasks 13–17)

Make sure the backend is running (`npm start` in `/backend`) before running these.

### Task 13 — list all items (save output as file `mainpage`)
```bash
curl -X GET http://localhost:3060/api/gifts
```

### Task 14 — register a user (save output as file `register`)
```bash
curl -X POST http://localhost:3060/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane.doe@example.com","password":"Password123"}'
```

### Task 15 — log in that user (save output as file `login`)
```bash
curl -X POST http://localhost:3060/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"Password123"}'
```

### Task 16 — get details of one item (save output as file `item_detail`)
```bash
curl -X GET http://localhost:3060/api/gifts/1
```

### Task 17 — search items by category (save output as file `search_item`)
```bash
curl -X GET "http://localhost:3060/api/search?category=Furniture"
```

To save both the command and its output into a file (Linux/Mac terminal):
```bash
{ echo '$ curl -X GET http://localhost:3060/api/gifts'; curl -X GET http://localhost:3060/api/gifts; } > mainpage
```
(Repeat the same pattern for the other four files, swapping in each command.)

---

## 6. Deployment (for Task 12)

Simple free options:
- **Backend**: Render.com or Railway.app — connect your GitHub repo, set the `MONGO_URL`
  and `JWT_SECRET` environment variables, deploy the `backend` folder.
- **Frontend**: Vercel or Netlify — connect your GitHub repo, set the build folder to
  `frontend`, and set an environment variable/config pointing `config.js`'s
  `backendUrl` to your deployed backend's URL before building.
- Once both are live, open the deployed frontend URL and take the screenshot for Task 12.

---

## 7. Project structure

```
giftlink-project/
├── backend/
│   ├── app.js
│   ├── logger.js
│   ├── Dockerfile
│   ├── util/
│   │   ├── database.js
│   │   └── import-mongo/
│   │       ├── index.js
│   │       └── gifts.json
│   ├── routes/
│   │   ├── giftRoutes.js
│   │   ├── searchRoutes.js
│   │   └── authRoutes.js
│   ├── search/
│   │   └── index.js
│   └── models/
│       └── User.js
├── frontend/
│   └── src/
│       ├── App.js
│       ├── config.js
│       └── components/
│           ├── Navbar/
│           ├── MainPage/
│           ├── DetailsPage/
│           ├── SearchPage/
│           ├── RegisterPage/
│           └── LoginPage/
├── user-story.md
└── .github/workflows/ci.yml
```
