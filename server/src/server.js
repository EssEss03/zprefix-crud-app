const cors = require('cors'); 
const express = require('express');
const cookieParser = require('cookie-parser');
const server = express();
const knex = require('knex')(require('../knexfile').development);
require('dotenv').config();
const bcrypt = require('bcrypt');

// ✅ Import session & auth middleware
const { createSession, checkAuth } = require('./auth');

// Middleware
server.use(express.json());
server.use(cors());
server.use(cookieParser());

// Test Route
server.get('/', (req, res) => {
  res.status(200).json({ message: "I am working" });
});

// ✅ Register Route
server.post('/register', async (req, res) => {
  const { username, password, first_name, last_name } = req.body;

  if (!username || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await knex('users')
      .insert({
        username,
        password: hashedPassword,
        first_name,
        last_name
      })
      .returning(['id', 'username']);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// ✅ Login Route with token session
server.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }

  try {
    const user = await knex('users').where({ username }).first();

    if (user && await bcrypt.compare(password, user.password)) {
      const token = createSession(user.id);
      // Set the token in the cookies
      res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 86400000), path: '/' });
      res.cookie('userId', user.id, { expires: new Date(Date.now() + 86400000), path: '/' });
      res.cookie('username', user.username, { expires: new Date(Date.now() + 86400000), path: '/' });

      return res.status(200).json({ id: user.id, username: user.username, token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
});

// Get all users
server.get('/users', async (req, res) => {
  try {
    const users = await knex('users').select('id', 'first_name', 'last_name', 'username');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch users.' });
  }
});

// ✅ Get all items (public view — can trim description here if needed)
server.get('/items', async (req, res) => {
  try {
    const items = await knex('items').select('*');

    const limitedItems = items.map(item => ({
      ...item,
      description: item.description.length > 100
        ? item.description.slice(0, 100) + '...'
        : item.description
    }));

    res.status(200).json(limitedItems);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch items.' });
  }
});

// ✅ Get a single item (public)
server.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await knex('items').where({ id }).first();
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch item.' });
  }
});

// ✅ Get items for a specific user (public or for logged-in user)
server.get('/users/:id/items', async (req, res) => {
  const { id } = req.params;
  try {
    const items = await knex('items').where({ user_id: id });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch user items.' });
  }
});

// ✅ PROTECTED: Create new item
server.post('/items', checkAuth, async (req, res) => {
  const { item_name, description, quantity } = req.body;
  const user_id = req.user.id; // 👈 derived from token

  try {
    const [newItem] = await knex('items')
      .insert({ user_id, item_name, description, quantity })
      .returning('*');

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create item.' });
  }
});

// ✅ PROTECTED: Update item
server.put('/items/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const { item_name, description, quantity } = req.body;

  try {
    const item = await knex('items').where({ id }).first();
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    const [updatedItem] = await knex('items')
      .where({ id })
      .update({ item_name, description, quantity })
      .returning('*');

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update item.' });
  }
});

// ✅ PROTECTED: Delete item
server.delete('/items/:id', checkAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const item = await knex('items').where({ id }).first();
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (item.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });

    await knex('items').where({ id }).del();
    res.status(200).json({ message: 'Item deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete item.' });
  }
});

module.exports = server;
