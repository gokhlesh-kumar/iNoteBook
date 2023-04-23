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
    body('title', 'Title required').isLength({min:1}),
    body('description', 'description required').isLength({min:1}),
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




// Route 3: Update the notes of user: PUT "/api/notes/update" Login required
router.put('/update/:id', fetchuser, async(req, res) => {
    
    const {title, description, tag} = req.body;

    try {
        // Creating new Note to upadte
        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

        // Find the node to be updated and update it.
        let note = await Note.findById(req.params.id);
        if(!note) { return res.status(401).send({error : 'Wrong user ID'})}

        // Allow updation only if user own this note
        if(note.user.toString() !== req.user.id) { return res.status(401).send({error : 'Not Allowed'});}

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {$new : true});
        res.json(note);

    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})




// Route 4: Delete the existing notes of user: DELETE "/api/notes/delete" Login required
router.delete('/delete/:id', fetchuser, async(req, res) => {
    
    try {

        // Find the node to be deleted and delete it.
        let note = await Note.findById(req.params.id);
        if(!note) { return res.status(401).send({error : 'Wrong user ID'})}

        // Allow deletion only if user own this note
        if(note.user.toString() !== req.user.id) { return res.status(401).send({error : 'Not Allowed'});}

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted" , note : note});

    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router