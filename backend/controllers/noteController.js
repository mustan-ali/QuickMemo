const Note = require("../models/NoteModel");
const jwt = require("jsonwebtoken");


const addNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }

    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const newNote = new Note({ title, content, tags: tags || [], userId: user._id });

        await newNote.save();

        return res.json({ error: false, newNote, message: "Note created successfully" });
    }
    catch (error) {
        return res.status(500).json(error);
    }
}


const editNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes to save" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) {
            note.title = title;
        }

        if (content) {
            note.content = content;
        }

        if (tags) {
            note.tags = tags;
        }

        if (isPinned) {
            note.isPinned = isPinned;
        }

        await note.save();

        return res.json({ error: false, note, message: "Note updated successfully" });

    } catch (error) {
        return res.status(500).json(error);
    }
}


const getNotes = async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

        return res.json({ error: false, notes, message: "Notes fetched successfully" });

    } catch (error) {
        return res.status(500).json(error);
    }
}


const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({ error: false, message: "Note deleted successfully" });

    } catch (error) {
        return res.status(500).json(error);
    }
}


const pinNote = async (req, res) => {
    const noteId = req.params.id;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({ error: false, note, message: "Note pinned successfully" });

    } catch (error) {
        return res.status(500).json(error);
    }
}

const searchNotes = async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Query is required" });
    }

    try {
        const results = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ]
        });

        return res.json({ error: false, notes: results, message: "Notes fetched successfully" });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
}
module.exports = { addNote, editNote, getNotes, deleteNote, pinNote, searchNotes };