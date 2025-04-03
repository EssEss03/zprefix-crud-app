const sessions = {}; // Simple in-memory session store

function generateToken() {
  return Math.random().toString(36).substring(2); // Simple random token
}

function createSession(userId) {
  const token = generateToken();
  sessions[token] = userId;
  return token;
}

function getUserIdFromToken(token) {
  return sessions[token];
}

function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = { id: userId }; // Attach user to request
  next();
}

module.exports = { createSession, getUserIdFromToken, checkAuth };