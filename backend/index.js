// Import required dependencies
const express = require('express'); // Express framework for building the server
const bodyParser = require('body-parser'); // Middleware to parse JSON request bodies
const { Pool } = require('pg'); // PostgreSQL client
const cors = require('cors'); // Middleware for Cross-Origin Resource Sharing

// Initialize Express app
const app = express();
const port = 3001; // Port for the backend server, separate from the React app
// Please do not modify port numbers without coordinating with the frontend configuration.

// Configure PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres', // Database user (default is 'postgres')
    host: 'localhost', // Database server address (local in this case)
    database: 'db1', // Name of the PostgreSQL database
    password: 'admin', // Database password
    port: 5432, // PostgreSQL server port
});
// The database connection settings above are crucial. Do not alter without consulting the database admin.

// Middleware setup
app.use(cors()); // Allow Cross-Origin requests (for communication with the React frontend)
app.use(bodyParser.json()); // Parse incoming JSON payloads from client requests
// Do not remove or modify the middleware above, as it enables essential server functionality.

// Login route
app.post('/login', (req, res) => {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Query database to authenticate user
    pool.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password],
        (error, results) => {
            if (error) {
                // Log and respond with error if there's an issue with the query
                console.error('Error querying the database:', error);
                return res.status(500).json({ success: false, message: 'Database error' });
            }

            // Check if user exists in the database
            if (results.rows.length > 0) {
                // Successful login
                res.json({ success: true, message: 'Login successful', username });
            } else {
                // Unsuccessful login
                res.json({ success: false, message: 'Invalid username or password' });
            }
        }
    );
});
// Please do not modify the login route as it is essential for user authentication.

// Save a note for a specific user
app.post('/notes', async (req, res) => {
    const { username, note } = req.body;
    // Ensure both username and note are provided in the request
    if (!username || !note) {
        return res.status(400).json({ success: false, error: 'Missing username or note' });
    }

    try {
        // Insert the note into the database
        await pool.query('INSERT INTO notes (username, note) VALUES ($1, $2)', [username, note]);
        res.status(200).json({ success: true }); // Successful note insertion
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ success: false, error: 'Failed to save note' });
    }
});
// Do not change this route. It enables saving notes to the database for users.

// Retrieve all notes for a specific user
app.get('/notes/:username', async (req, res) => {
    const { username } = req.params; // Get username from URL parameters

    try {
        // Query to retrieve notes for the given username
        const result = await pool.query(
            'SELECT * FROM notes WHERE username = $1 ORDER BY created_at DESC',
            [username]
        );
        res.status(200).json(result.rows); // Return retrieved notes to client
    } catch (error) {
        console.error('Error retrieving notes:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve notes' });
    }
});
// This route is critical for retrieving user notes and should not be altered.

// Sign-up route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    console.log('Received signup request with:', req.body); // Log incoming request body for debugging

    try {
        console.log('Inserting into UserAccount...');
        
        // Insert new user into UserAccount table
        await pool.query(
            'INSERT INTO UserAccount (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
            [firstName, lastName, email, password]
        );

        console.log('Inserting into users...');
        
        // Insert user credentials into users table (for login)
        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [email, password]
        );

        res.status(200).json({ success: true, message: 'Account created successfully' }); // Sign-up success response
    } catch (error) {
        console.error('Error creating user:', error); // Log detailed error information
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create account'
        });
    }
});
// The sign-up route is essential for new user registration. Do not modify without backend team approval.

// Start server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
// The server starts on the specified port, making it accessible via http://localhost:3001
// Please do not change this port number without updating the frontend configuration accordingly.
