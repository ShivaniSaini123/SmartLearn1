const bcrypt = require('bcryptjs');
require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/user1");
const userRouter = require("./routes/user");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
const PORT = process.env.PORT || 3005 || 3003;
app.use(
    cors({
        origin: ["http://localhost:3001", "http://localhost:3004"], // Change '*' to your frontend URL
        credentials: true, // Allow credentials (cookies, authorization headers)
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type, Authorization"
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:3001", "http://localhost:3004"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        },
    })
);


passport.use(new LocalStrategy(User.authenticate()));
// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/api/users", userRouter );
app.use("/api/profile", profileRoutes);
mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 30000,  // Increase timeout to 10s
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
