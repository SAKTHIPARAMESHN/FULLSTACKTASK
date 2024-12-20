const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com', // Database host
    user: 'sql12753176',              // Database username
    password: 'c33ZHLVkeS',           // Database password
    database: 'sql12753176',          // Database name
                     // Port number
  });
  
  // Connect to the database
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  });
// API Routes
// Add Employee
app.post('/api/employees', (req, res) => {
  const { firstName, lastName, email, position, department, startDate } = req.body;

  const query = `
    INSERT INTO employees (first_name, last_name, email, position, department, start_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [firstName, lastName, email, position, department, startDate], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      res.status(201).send('Employee added successfully');
    }
  });
});

// Get All Employees (Optional)
app.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

// Start Server
app.listen(7000, () => {
  console.log(`Server is running on 70000`);
});
