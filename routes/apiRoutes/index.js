const {notes} = require('../../db/db');
const {createNewNote, validateNote, findById, saveNote, deleteNote } = require('../../lib/notes');
var uniqid = require('uniqid');

const router = require('express').Router();

router.get('/notes',(req, res)=>{
    res.json(notes);
});

router.get('/notes/:id', (req, res)=>{
    const result = findById(req.params.id, notes);
    if (result){
        res.json(result);
    }
    else{
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res)=>{

    let arNotes = notes;
    req.body.id = uniqid();

    if (!validateNote(req.body)){
        res.status(400).send('The note is not properly formatted.');
    }
    else{
        const note = createNewNote(req.body, arNotes);
        res.json(note);
        }
});

router.post('/notes/:id', (req, res)=>{

    let arNotes = notes;

    if (!validateNote(req.body)){
        res.status(400).send('The note is not properly formatted.');
    }
    else{
        const note = saveNote(req.body, arNotes);
        res.json(note);
        }
});

router.delete('/notes/:id', (req, res)=>{

    let arNotes = notes;

    deleteNote(req.params.id, arNotes);

    res.json({message: 'The note has been deleted!'});
});

module.exports = router;
