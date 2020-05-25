const express=require('express');
const bodyParser=require('body-parser');
const Post =require('./models/todo');
const mongoose=require('mongoose');
const app=express();

const todoRouts=require("./routes/todo")

const path=require("path");

app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/bookstore",{useCreateIndex:true, useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
  console.log('connected to database!');
})
.catch((err)=>{
  console.log(err,'connection failed!');
})


app.use((req,res,next)=>{

res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Headers","origin,X-Requested-with,Content-Type,Accept,Authorization");
res.setHeader("Access-Control-Allow-Methods","GET,POST,PATH,DELETE,OPTION,PUT");
next();
})


app.use("/api/todo",todoRouts);


module.exports=app;
