# ⚙️ ZPrefix CRUD App - Server

This is the **Express.js + PostgreSQL** backend for the **ZPrefix Inventory Manager CRUD** application. It provides authentication, authorization, and full CRUD routes for items, connected to a PostgreSQL database.

## 📊 Tech Stack

- **Node.js + Express.js**

- **PostgreSQL** (using Knex.js as query builder)

- **bcrypt** for password hashing

- **dotenv** for environment variable management

- **cors** for cross-origin support

---

## ⚖️ API Base URL

http://localhost:3000

Make sure your frontend VITE_API_URL matches this URL.

## ⚙️ Setup Instructions

1. **Clone & Install**
    cd server
    npm install

2. **Configure Environment**
Create a .env file in the server/ folder:

    POSTGRES_USER=your_postgres_username
    POSTGRES_PASSWORD=your_postgres_password
    POSTGRES_DB=zprefix_crud_db
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432

Replace the values with your local PostgreSQL credentials.

3. **Create the Database**
Using your terminal or pgAdmin:
    CREATE DATABASE zprefix_crud_db;

4. **Run Migrations**
    npx knex migrate:latest

This creates the users and items tables.

5. **Seed the Database (Optional but helpful for testing)**
    npx knex seed:run

This will create 2 users and several items.

6. **Start the Server**
    node index.js

You should see:
Express server listening on 3000

## 🛡️ Authentication
- Login generates a token (session-based, stored in memory)
- Token is returned and also stored in cookies (used in frontend)
- Protected routes require a Bearer <token> in the Authorization header

## 📂 API Routes Overview

**Public**

- GET /items - Returns all items (first 100 chars of description)
- GET /items/:id - Get full details of an item
- GET /users/:id/items - Get items created by a specific user

**Auth**

- POST /register - Create new user
- POST /login - Log in and receive token

**Protected (requires token)**

- POST /items - Create a new item
- PUT /items/:id - Update an item
- DELETE /items/:id - Delete an item

--

> Made with ❤️ by Essence for the **ZPrefix CRUD Project**