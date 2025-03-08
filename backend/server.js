const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user1");

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
