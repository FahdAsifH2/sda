const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth'); // Import the routes
const cookieParser= require("cookie-parser")


// Set EJS as the view engine
app.set('view engine', 'ejs');
const db = require("./config/mongoose-connection")
// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root path
app.get('/', (req, res) => {
    res.render('index'); // Ensure you have an index.ejs file
});

app.get('/index', (req, res) => {
    res.render('index'); // Ensure you have an index.ejs file
});


// Use the authRoutes router for all routes under the paths specified
app.use('/', authRoutes); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});
