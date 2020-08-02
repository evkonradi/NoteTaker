const fs = require("fs");
const path = require("path");

//save notes to JSON file
function saveToJSON(notesArray){
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );
};

// create new note
function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(body);
    saveToJSON(notesArray);
    return note;
};

//function to edit the note, but it looks like the front end does not have this functionality
function saveNote(body, notesArray){
    const note = body;

    for (i = 0; i < notesArray.length; i++){
        if (notesArray[i].id === note.id){
            notesArray[i] = note;
        }
    };

    saveToJSON(notesArray);
    return note;
};

//delete a Note
function deleteNote(id, notesArray){

    let note = findById(id, notesArray);
    const index = notesArray.indexOf(note);
    notesArray.splice(index,1);

    saveToJSON(notesArray);
    return notesArray;
};

// validate data entry of a note
function validateNote(note){
    if (!note.title || typeof note.title !== 'string'){
        return false;
    }
    if (!note.text || typeof note.text !== 'string'){
        return false;
    }
    return true;
};

//find a note by id
function findById(id, notesArray){
    const result = notesArray.filter(note=>note.id ===id)[0];
    return result;
};

module.exports = {
    createNewNote,
    validateNote,
    findById,
    saveNote,
    deleteNote
};