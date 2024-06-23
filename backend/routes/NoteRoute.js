const express = require("express");
const router = express.Router();
const { addNote, editNote, deleteNote, getNotes } = require("../controllers/noteController");
const authenticateToken = require("../middleware/tokenVerification");

// // Add a new note
router.post("/add-note", authenticateToken, addNote);

// // Edit a note
router.put("/edit-note/:id", authenticateToken, editNote);

// // Delete a note
router.delete("/delete-note/:id", authenticateToken, deleteNote);

// // Get all notes
router.get("/get-notes", authenticateToken, getNotes);

module.exports = router;