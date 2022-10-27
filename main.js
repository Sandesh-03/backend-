const exp = require('express');
const app = exp();

const mongoose =require('mongoose');
const note = require('./models/notesmodel');
const bodyparser= require('body-parser');
const { deleteOne } = require('./models/notesmodel');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://sandy03:sandy%4003@cluster0.i1xsiix.mongodb.net/notesdb').then(
    function(){
        app.get("/",function(req,res){
            res.send("home page");
        });
        app.post("/notes/list/",async function(req,res) {
            var notes = await note.find({usrid : req.body.usrid});
            res.json(notes);
        });
       
        app.post("/notes/add",async function(req,res){
         await note.deleteOne({id:req.body.id});
            const newNote= new note({
            id : req.body.id,
            usrid :req.body.usrid,
            title :req.body.title,
            content :req.body.content
        });

            await newNote.save();
            const response ={message : " new node created "+  `id : ${req.body.id}`}
            res.json(response);
        });
        app.post("/notes/delete",async function(req,res){
            await note.deleteOne({id:req.body.id});
               const response ={message : "  note deleted "+  `id : ${req.body.id}`}
               res.json(response);
           });
    }
)
const PORT = process.env.PORT ||5000

app.listen(PORT,function(){
    console.log('app started at '+ PORT)
});