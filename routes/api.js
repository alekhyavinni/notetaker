const express=require('express')
const router=express.Router();
const fs=require('fs')
let notes=require('../db/db.json');
const{v4:uuidv4}=require('uuid');


// GET /api/notes 
router.get('/notes',(req,res)=>{
    res.json(notes)
})

//return new note, add to db.json, return to client, give note unique ID when saved
router.post('/notes',(req,res)=>{
    const {title,text}=req.body;
    if(title && text){
        const newNotes = {
            title,
            text,
            id: uuidv4(),
    }
    notes.push(newNotes);

    let noteString = JSON.stringify(notes,null,3)

    fs.writeFile(`./db/db.json`,noteString,(err)=>
    err ? console.error(err) : console.log(`New note has been added!`))

    const response = {
        status: 'success',
        body: newNotes,
    };
    console.log(response)
    res.status(201).json(response)
}
else{
    res.status(500).json('Error in adding note');
}

})

//Delete requests
router.delete('/notes/:id',(req,res)=>{
    const{id}=req.params;

    fs.readFile("./db/db.json", "utf8", (error, data) =>
    err ? console.err(err) :  (notes = JSON.parse(data))
    )

    const deletedNote =notes.filter(note =>note.id === req.params.id)
    if(deletedNote){
        let filteredNotes=notes.filter(note =>note.id!=req.params.id)
        let notesString=JSON.stringify(filteredNotes,null,3)
        fs.writeFile(`./db/db.json`, notesString, (err) =>
        err
        ? console.error(err)
        : console.log(`Note deleted!`));
        res.status(200).json(filteredNotes);
    }
    else{
        res.status(500).json('Error deleting note');
    }

})
module.exports = router;