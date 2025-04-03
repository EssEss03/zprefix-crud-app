# ⚙️ ZPrefix CRUD App - Client

This is the **React frontend** for the **ZPrefix Inventory Manager CRUD** application. It allows users to register, log in, manage their inventory (**create, read, update, delete** items), and browse public items. It communicates with an Express API backend.

---

## 📦 Tech Stack

- **React + Vite** Fast and modern frontend framework  
- **CSS** (custom styling via `App.css`)
- **Fetch API** for client-server communication
- **React Router** Dynamic for routing
- **Cookies & localStorage** for token/session handling

---

## 🛠️ Setup Instructions

1. **Install dependencies**
   ```bash
   cd client
   npm install

2. **Create .env file In the client/ folder**
    VITE_API_URL=http://localhost:3000

3. **Run the app**
    npm run dev

✅ Ensure your Express server is running on port 3000.
🔎 See ../server/README.md for backend setup.

## 🔐 Authentication
On login, a token is saved in both localStorage and cookies.

This token is required for:

- Creating

- Updating

- Deleting items

Guests can browse public items without logging in.

## ✅ Features Implemented
- 🔐 Authentication using cookies & localStorage

- 🧭 Routing with protected pages

- 🗃 Full CRUD functionality

- 🕶 Public browsing of items

- 🖼 Responsive and styled UI

## 🧪 Testing the App
Use seeded credentials (or register a new account)

- ✅ Log in → Redirects to Dashboard

- ➕ Add items → Shown under “Your Items”

- 🔍 Click an item → View, edit, delete

- 🚪 Log out → Returns to Home

- 🌐 Click “Browse All Items” → See public items

## 🔗 Backend Setup
See ../server/README.md
- Express API
- PostgreSQL database
- RESTful endpoints


--

> Made with ❤️ by Essence for the **ZPrefix CRUD Project**