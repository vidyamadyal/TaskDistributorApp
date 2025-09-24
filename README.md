
---

## ✅ 1. Source Code for the Application

### 📦 What to Include:
- Full project folder:
  ```
  /TaskDistributionApp/
    ├── backend/
    │   ├── models/
    │   ├── controllers/
    │   ├── routes/
    │   ├── middleware/
    │   └── server.js
    ├── frontend/
    │   └── agent-task-ui/
    │       ├── src/
    │       │   ├── pages/
    │       │   ├── components/
    │       │   └── App.js
    │       └── package.json
  ```
- Remove `node_modules` folders
- Push to GitHub or zip the folder for submission

---

```markdown
# 🧠 Task Distribution System (MERN Stack)

A full-stack web app for admin login, agent management, and CSV-based task distribution.

## 🚀 Features
- Admin login with JWT authentication
- Agent creation with name, email, mobile, and password
- CSV upload with validation (`FirstName`, `Phone`, `Notes`)
- Automatic task distribution across 5 agents
- View tasks assigned to each agent

## 🛠️ Tech Stack
- MongoDB + Express.js
- React.js + Node.js
- Axios + React Router

## 📦 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/task-distribution-app.git
cd task-distribution-app
```

### 2. Backend Setup
```bash
cd backend
npm install
node server.js
```

### 3. Frontend Setup
```bash
cd frontend/agent-task-ui
npm install
npm start
```

### 4. MongoDB Setup
- Use MongoDB Atlas or local MongoDB
- Update connection string in `server.js`

## 🧪 Testing
- Login at `/`
- Add agents at `/agents`
- Upload CSV at `/upload`
- View tasks at `/view-tasks`

## 📹 Demo Video
[Watch the full walkthrough]
https://drive.google.com/file/d/1xP_W0nuENP2fOowQtkTsRvAFk1chDJHV/view?usp=sharing
```

