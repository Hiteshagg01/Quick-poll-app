# Quick Polling App

A simple web application to create, vote, and view poll results in real-time.

## 🚀 Features
- Create a poll with a question and multiple options.
- Vote on a poll.
- View poll results with real-time updates every 5 seconds.
- Fully responsive UI.

## 📦 Tech Stack
- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Database:** Supabase
- **Deployment:** Render (Backend) & Vercel (Frontend)

---

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/quick-polling-app.git
cd quick-polling-app
```

### 2️⃣ Backend Setup
1. Navigate to the backend folder:
```sh
cd backend
```
2. Install dependencies:
```sh
npm install
```
3. Create a `.env` file and add:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=5000
```
4. Start the backend server:
```sh
node server.js
```

### 3️⃣ Frontend Setup
1. Navigate to the frontend folder:
```sh
cd frontend
```
2. Install dependencies:
```sh
npm install
```
3. Update the API URL in `App.js`:
```js
const API_URL = "http://localhost:5000"; // Change to backend URL when deployed
```
4. Start the frontend server:
```sh
npm start
```

---

## 🌍 API Endpoints
### 1️⃣ Create a Poll
**POST** `/polls`
```json
{
  "question": "Your poll question",
  "options": ["Option 1", "Option 2"]
}
```

### 2️⃣ Get All Polls
**GET** `/polls`

### 3️⃣ Get a Single Poll by ID
**GET** `/polls/:pollId`

### 4️⃣ Vote on a Poll
**POST** `/polls/:pollId/vote`
```json
{
  "optionId": "option-id"
}
```

---

## 🚀 Deployment
### Backend (Render)
1. Push backend code to GitHub.
2. Create a new **Web Service** in [Render](https://render.com/).
3. Set environment variables.
4. Deploy and note the **backend URL**.

### Frontend (Vercel)
1. Push frontend code to GitHub.
2. Create a new **project** in [Vercel](https://vercel.com/).
3. Set environment variables (`REACT_APP_API_URL=your-backend-url`).
4. Deploy and note the **frontend URL**.

---

## 📸 Screenshots
_Add screenshots here_

---

## 🎯 To-Do
- Add user authentication
- Improve UI with animations
- Allow multiple votes per poll

---

## 🛠️ Author
- **Your Name** - [GitHub](https://github.com/your-profile)

Happy polling! 🚀

