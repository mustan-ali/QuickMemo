const express = require("express");
const router = express.Router();
const { createAccount, login } = require("../controllers/userController");

// Create a new account
router.post("/create-account", createAccount);

// Login to account
router.post("/login", login);

module.exports = router;