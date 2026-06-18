const express = require('express');
const { pool } = require('./pool');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Node.js and PostgreSQL API is running' });
});

// Get all employees
app.get('/data', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, role, department FROM employees'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
});

// Get employee by ID
app.get('/data/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM employees WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
});

// Add employee
app.post('/data', async (req, res) => {
  const { name, role, department } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO employees (name, role, department) VALUES ($1, $2, $3) RETURNING *',
      [name, role, department]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add employee' });
  }
});

// Update employee
app.put('/data', async (req, res) => {
  const { id, name, role, department } = req.body;

  try {
    const result = await pool.query(
      'UPDATE employees SET name = $1, role = $2, department = $3 WHERE id = $4 RETURNING *',
      [name, role, department, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(result.rows[0]);


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
});

// Delete employee
app.delete('/data/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM employees WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
});

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
