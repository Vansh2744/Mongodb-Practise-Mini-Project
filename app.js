const express = require("express");
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine','ejs');

const students = require("./Database/data");

app.get("/", async (req, res) => {
  res.render('index');
});

app.post('/create', async (req,res)=>{
  const {username,email,age,imageUrl} = req.body;
  await students.create({
    username,email,age,imageUrl
  })
  res.redirect('/read');
})

app.get('/read',async (req,res)=>{
  const user = await students.find();
  res.render('readuser',{user});
})

app.get('/delete',async (req,res)=>{
  await students.findOneAndDelete({_id:req.query.id});
  res.redirect('/read');
})

app.get('/edit',async (req,res)=>{
  const user = await students.findOne({_id:req.query.id});
  res.render('edit',{user});
})

app.post('/update',async (req,res)=>{
  const {username,email,age,imageUrl} = req.body;
  await students.findOneAndUpdate(
    { _id: req.query.id },
    { username, email, age, imageUrl }
  );
  res.redirect('/read');
})

app.get("*", (req, res, next) => {
  res.send("Error Ocurred");
});

app.listen(3000, () => {
  console.log("listening...");
});
