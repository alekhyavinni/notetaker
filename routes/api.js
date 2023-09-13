const express=require('express')
const router=express.Router();
const fs=require('fs')
let note=require('../db/db.json');
const{v4:uuidv4}=require('uuid');


// GET /api/notes 
router.get('/notes',(req,res)=>{
    res.json(note)
})

//return new note, add to db.json, return to client, give note unique ID when saved
router.post('/notes',(req,res)=>{
    const {title,text}=req.body;
    if(title && text){
        const newNote = {
            title,
            text,
            id: uuidv4(),
    }
    note.push(newNote);

    let noteString = JSON.stringify(notes,null,3)

    fs.writeFile(`./db/db.json`,noteString,(err)=>
    err ? console.error(err) : console.log(`New note has been added!`))

    const response = {
        status: 'success',
        body: newNote,
    };
    console.log(response)
    res.status(201).json(response)
}
else{
    res.status(500).json('Error in adding note');
}

})

