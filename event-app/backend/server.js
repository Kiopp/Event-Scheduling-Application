const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = 5001; // Or any port of your choice

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB setup
const uri = "mongodb://localhost:27017/mydatabase";
let db;

const client = new MongoClient(uri);

client.connect()
  .then(() => {
    db = client.db('mydatabase'); // Initialize the database
    console.log('Connected successfully to MongoDB');
    
    // Start server after successful DB connection
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1); // Exit process with failure code
  });

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Basic validation
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Email, username, and password are required.' });
        }

        // Convert the username to lowercase before storing
        const normalizedUsername = username.toLowerCase();
        const normalizedEmail = email.toLowerCase();

        // Check if the email or username already exists in the database
        const existingUser = await db.collection('users').findOne({
            $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
        });

        if (existingUser) {
            // Check which field is already taken
            if (existingUser.email === normalizedEmail) {
                return res.status(400).json({ message: 'Email is already taken.' });
            } else if (existingUser.username === normalizedUsername) {
                return res.status(400).json({ message: 'Username is already taken.' });
            }
        }

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the user to the database
        const result = await db.collection('users').insertOne({
            email: normalizedEmail,
            username: normalizedUsername,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error('Error registering user:', error); // Log the error
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Convert the username to lowercase before querying
        const normalizedUsername = username.toLowerCase();

        // Find the user in the database
        const user = await db.collection('users').findOne({ username: normalizedUsername });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Authentication successful
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error });
    }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await client.close();
  process.exit(0);
});