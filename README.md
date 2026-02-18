# Balance Blueprint — Frontend

#### A full-stack MERN web application for personal finance management using the 50/30/20 budgeting rule.

## 📌 Overview

A modern fintech-style financial management dashboard built using:

* React (Vite)
* Tailwind CSS
* Context API
* Axios
* React Toastify
* 50/30/20 budgeting logic

---

## 🏗 Architecture

### UI Layer
* `pages/` — Dashboard, Login, Register, ProjectPage, ProjectDetails, NotFound
* `components/` — Reusable UI components (Button, Card, Input, ProgressBar, SmartAdviceCard)
* `layout/` — Persistent Layout and Navbar

### Business Logic Layer
* `utils/financeCalculations.js` — 50/30/20 rule calculations

### API Layer
* `api/api.js` — Axios instance with JWT interceptor and auto logout on 401
* `api/authService.js` — Register, login, and current user calls
* `api/projectService.js` — Project CRUD operations

### Global State
* `AuthContext` — User session and token management
* `ThemeContext` — Dark/Light mode toggle

---

## 🔐 Authentication Flow

```
Login/Register → AuthService → Backend API → JWT stored in localStorage → ProtectedRoute
```

---

## 📊 Financial Logic

Projects are categorized into three groups that map to the 50/30/20 rule:

* **Needs** — Target 50% of income (housing, food, utilities, transportation)
* **Wants** — Target 30% of income (dining, entertainment, subscriptions)
* **Savings** — Target 20% of income (emergency fund, investments, debt payoff)

Dashboard dynamically calculates actual totals and compares them against targets in real time.

---

## 🎨 Features

* Dark / Light mode toggle
* Animated progress bars with actual vs target comparison
* Financial charts powered by Recharts
* AI Smart Advice card with rule-based local logic
* Optional real AI advice via OpenAI backend integration
* Toast notifications via React Toastify
* Protected routes with role-based access
* API abstraction layer with automatic JWT attachment
* Scalable folder structure

---

## 🚀 Deployment

1. Create a `.env` file in the frontend root:
```
VITE_API_URL=https://backend-projectmern.onrender.com/api
```
2. Run `npm run build`
3. Deploy `dist/` folder as a Static Site on Render

---

## Table of Contents

* [Technologies Used](#technologiesused)
* [Project Next Steps](#nextsteps)
* [Deployed App](#deployment)
* [About the Author](#author)

## <a name="technologiesused"></a>Technologies Used

* React 18
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Recharts
* React Toastify
* Context API

## <a name="nextsteps"></a>Project Next Steps

* Add budget history and monthly comparison views
* Allow users to export spending reports as PDF
* Add notification alerts when spending exceeds category limits
* Implement OAuth login with Google
* Add mobile app version using React Native

## <a name="deployment"></a>Deployed Link

[Render Static Site](https://front-end-mern-project.onrender.com)

* Frontend Repository: [GitHub](https://github.com/Kaniyakm/frontend-projectMERN)
* If unable to view please run locally with `npm run dev`

## <a name="author"></a>About The Author

A full-stack developer focused on building practical applications that solve real world problems. Passionate about clean code, intuitive UI design, and using technology to make personal finance more accessible.
