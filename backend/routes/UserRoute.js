const express = require("express");
const router = express.Router();
const { createAccount, login, getUser } = require("../controllers/userController");
const authenticateToken = require("../middleware/tokenVerification");

// Create a new account
router.post("/create-account", createAccount);

// Login to account
router.post("/login", login);

// Get user details
router.get("/user", authenticateToken, getUser);

module.exports = router;