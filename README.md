# MERN Task Manager 🚀

A full-stack **MERN (MongoDB, Express, React, Node.js)** application to manage tasks with user authentication, task CRUD operations, and a modern React frontend.

## 🌐 Live Demo
[Task Manager App](https://mern-task-manager-kxxg.onrender.com)

---

## ✨ Features
- 🔑 User authentication (Register / Login / JWT Auth)
- 📝 Task management (Create, Read, Update, Delete)
- 🎨 Modern React frontend (Vite + React 18)
- 🛠️ REST API backend with Express & MongoDB
- 🔒 Protected routes (role-based access)
- 🌍 Deployed on **Render**

---

## 🗂️ Project Structure
MERN-Task-Manager/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── api/ # Axios client
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components (Login, Tasks, Dashboard)
│ │ ├── redux/ # Redux slices & store
│ │ └── main.jsx # Entry point
│ └── vite.config.js # Vite configuration
│
├── server/ # Node.js backend
│ ├── config/ # Database connection
│ ├── middleware/ # Error handling & auth middleware
│ ├── models/ # Mongoose schemas
│ ├── route/ # Express routes (auth, tasks)
│ ├── index.js # Express entry point
│ └── package.json
│
├── .env # Environment variables
├── package.json # Root package.json with scripts
└── README.md




# From root
npm run dev
Backend runs on http://localhost:3000

Frontend runs on http://localhost:5173

🚀 Deployment (Render)
Backend (API)
Deploy root folder as Web Service

🔑 API Endpoints
Auth
POST /api/auth/register → Register new user

POST /api/auth/login → Login user & get token

Tasks
GET /api/tasks → Get all tasks (auth required)

POST /api/tasks → Create task

PUT /api/tasks/:id → Update task

DELETE /api/tasks/:id → Delete task

🛠️ Tech Stack
Frontend: React 18, Vite, Redux Toolkit, Axios

Backend: Node.js, Express, Mongoose

Database: MongoDB Atlas

Deployment: Render

📜 License
MIT © 2025 [MUHZINA]

yaml
Copy code
