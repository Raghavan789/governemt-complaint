const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// Connect to MySQL database.
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'govt'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Route to render index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/insert', (req, res) => {
    const { name, age } = req.body;
    const insertQuery = 'INSERT INTO people (name, age) VALUES (?, ?)'; // Update tablename with your actual table name
    db.query(insertQuery, [name, age], (err, result) => {
        if (err) {
            throw err;
        }
        console.log('Data inserted successfully');
        res.redirect('/'); // Redirect back to the form
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});