# 💰 Smart Finance Tracker

## 📌 Overview
A modern fintech-style financial management dashboard built using:
- React (Vite)
- Tailwind CSS
- Context API
- Axios
- React Toastify
- 50/30/20 budgeting logic

---

## 🏗 Architecture

### UI Layer
- Pages/
- Components/
- Layout/

### Business Logic Layer
- utils/financeCalculations.jsx

### API Layer
- api/api.js
- api/authService.js
- api/projectService.js

### Global State
- AuthContext
- ThemeContext

---

## 🔐 Authentication Flow
Login/Register → AuthService → Backend → JWT stored → ProtectedRoute

---

## 📊 Financial Logic
Projects categorized:
- Needs (50%)
- Wants (30%)
- Savings (20%)

Dashboard dynamically calculates totals.

---

## 🎨 Features
- Dark / Light mode
- Animated progress bars
- Toast notifications
- Protected routes
- API abstraction layer
- Scalable folder structure

---

## 🚀 Deployment
1. Add VITE_API_URL in .env
2. npm run build
3. Deploy to Vercel / Netlify
