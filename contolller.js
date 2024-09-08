// controllers/noteController.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './data.json');

// Helper function to read data from file
const readData = (callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err, null);
        }
        try {
            const notes = data ? JSON.parse(data) : [];
            callback(null, notes);
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
};

// Helper function to write data to file
const writeData = (notes, callback) => {
    fs.writeFile(filePath, JSON.stringify(notes, null, 2), 'utf8', (err) => {
        callback(err);
    });
};

exports.getNotes = (req, res) => {
    readData((err, notes) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading notes', error: err });
        }
        res.json(notes);
    });
};

exports.addNote = (req, res) => {
    const { title } = req.body;
    if (!title ) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    readData((err, notes) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading notes', error: err });
        }

        const newNote = { id: Date.now(), title };
        notes.push(newNote);

        writeData(notes, (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Error saving note', error: writeErr });
            }
            res.status(201).json(newNote);
        });
    });
};

exports.deleteNote = (req, res) => {
    const { id } = req.params;

    readData((err, notes) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading notes', error: err });
        }

        const updatedNotes = notes.filter(note => note.id != id);

        writeData(updatedNotes, (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Error deleting note', error: writeErr });
            }
            res.json({ message: 'Note deleted successfully' });
        });
    });
};
