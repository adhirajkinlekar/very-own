// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3003;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database (replace with real database logic)
const users = [
  { id: 1, name: 'Alice', schoolId: 1 },
  { id: 2, name: 'Bob', schoolId: 1 },
  { id: 3, name: 'Charlie', schoolId: 2 }
];

// Route to get users by school ID
app.get('/admin/:adminId', (req, res) => {
  const { schoolId } = req.params;
  const result = users.filter(user => user.schoolId == schoolId);
  res.json(result);
});

app.get('/admin/:adminId', (req, res) => {
  const { schoolId } = req.params;
  const result = users.filter(user => user.schoolId == schoolId);
  res.json(result);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
