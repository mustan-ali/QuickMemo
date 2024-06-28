const express = require("express");
const router = express.Router();
const { addNote, editNote, deleteNote, getNotes, pinNote, searchNotes } = require("../controllers/noteController");
const authenticateToken = require("../middleware/tokenVerification");

// Add a new note
router.post("/add-note", authenticateToken, addNote);

// Edit a note
router.put("/edit-note/:id", authenticateToken, editNote);

// Delete a note
router.delete("/delete-note/:id", authenticateToken, deleteNote);

// Get all notes
router.get("/get-notes", authenticateToken, getNotes);

// Pin a note
router.put("/pin-note/:id", authenticateToken, pinNote);

// Search notes
router.get("/search-notes", authenticateToken, searchNotes);

module.exports = router;