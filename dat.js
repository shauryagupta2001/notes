// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const noteController = require('./contolller');

// GET route to retrieve all notes
router.get('/', noteController.getNotes);

// POST route to add a new note
router.post('/', noteController.addNote);

// DELETE route to delete a note by ID
router.delete('/:id', noteController.deleteNote);

module.exports = router;
