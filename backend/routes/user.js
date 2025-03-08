const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const User = require('../models/user1'); // Import the User model
const router = express.Router();

// ✅ Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Register user using passport-local-mongoose
        const newUser = new User({ username, email });
        await User.register(newUser, password); // Passport will hash and save password

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Properly authenticate user
        const authResult = await new Promise((resolve, reject) => {
            user.authenticate(password, (err, authenticatedUser) => {
                if (err || !authenticatedUser) reject("Invalid credentials");
                resolve(authenticatedUser);
            });
        });

        if (!authResult) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error });
    }
});

module.exports = router;
