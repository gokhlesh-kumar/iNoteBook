const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator'); // to validate the email and name 

const router = express.Router();


// Route 1: Get all the notes of user: GET "/api/notes/fetchallnotes" Login required
router.get('/fetchallnotes', fetchuser, async(req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);   

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2: Add the notes of user: POST "/api/notes/addnotes" Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Title required').isLength({min:3}),
    body('description', 'description required').isLength({min:3}),
], async(req, res) => {
    
    try {
        
        const {title, description, tag} = req.body;
        
        // If there are error in input return bad request
        const errors = validationResult(req);
        console.log('object')
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        
        const note = new Note({
            title, description, tag, user:req.user.id
        })
        const savenote = await note.save();
        res.json(savenote);
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router