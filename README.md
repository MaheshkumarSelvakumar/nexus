# NEXUS — Level Up Your Learning

A gamified cyberpunk-themed learning quest tracker for students.
Earn XP, level up and complete quests to master new skills.

## Live Demo
[https://nexus-zeta-indol.vercel.app](https://nexus-zeta-indol.vercel.app)

## Features
- JWT Authentication — register and login securely
- Profession-based learning paths — 6 career tracks plus custom
- Gamified XP system — earn points completing quests
- Level progression — unique titles per profession
- Three-column kanban board — Quests, In Progress, Completed
- Real database — quests saved to PostgreSQL via Supabase
- Cyberpunk UI — dark theme with neon green accents
- Fully responsive — works on mobile and desktop

## Tech Stack
**Frontend:** React 18, Vite, Tailwind CSS, JavaScript
**Backend:** Node.js, Express, JWT, bcrypt, Prisma ORM
**Database:** PostgreSQL via Supabase
**Deployment:** Frontend on Vercel, Backend on Render

## Architecture
React Frontend (Vercel)
↕ HTTPS + JWT
Express Backend (Render)
↕ Prisma ORM
PostgreSQL Database (Supabase — Mumbai)

## Local Setup

### Frontend
```bash
git clone https://github.com/MaheshkumarSelvakumar/nexus.git
cd nexus
npm install
npm run dev
```

Create `.env`:
VITE_BASE_URL=http://localhost:5000/api

### Backend
```bash
git clone https://github.com/MaheshkumarSelvakumar/nexus-backend.git
cd nexus-backend
npm install
```

Create `.env`:
PORT=5000
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

```bash
npx prisma db push
npm run dev
```

## Author
**Maheshkumar Selvakumar** — Software Engineer at TCS

- Portfolio: [maheshkumarselvakumar.github.io/portfolio](https://maheshkumarselvakumar.github.io/portfolio/)
- LinkedIn: [linkedin.com/in/maheshkumar-selvakumar-730208403](https://www.linkedin.com/in/maheshkumar-selvakumar-730208403/)
- GitHub: [github.com/MaheshkumarSelvakumar](https://github.com/MaheshkumarSelvakumar)