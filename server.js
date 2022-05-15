const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload')
let initial_path = path.join(__dirname,"blog"); //Instead of blog put the name of the folder under which all the files related to project are given
const app=express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/',(req,res)=>{
    res.sendFile(path.join(initial_path,"home.html"))//change the home/index page acc to project
})

app.get('/editor',(req,res)=>{
    res.sendFile(path.join(initial_path,"editor.html"))//change the home/index page acc to project
})

app.post('/upload',(req,res)=>{
    let file= req.files.image;
    let date= new Date();

    let imgName = date.getDate()+date.getTime()+file.name;

    let path ='public/uploads/'+imgName;
    file.mv(path,(err,result)=>{
        if(err){
            throw err;
        }
        else{
            res.json(`uploads/${imgName}`);
        }
    })
})

app.get("/:blog",(req,res) => {
    res.sendFile(path.join(initial_path,"blog.html"));
})
app.listen("3000",()=>{
    console.log('listening.......');
})