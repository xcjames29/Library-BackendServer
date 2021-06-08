const express = require('express');
const morgan = require('morgan');

const CategoryController = require("./controllers/categoryController");

const MemberController = require("./controllers/memberController");
const IssueController = require("./controllers/issueController");
const mongoose = require('mongoose');
const app = express();
const PORT = 8111;

const bookRouter = require("./routes/books")


app.use(morgan('dev'));
app.set('view engine','pug');
app.use(express.static('static'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/" ,(req,res)=>{
    res.render('index', {message:"Welcome to MyLibrary!"});
})

app.use("/books",bookRouter)
app.get("/addBook", async(req,res)=>{
    await mongoose.connect('mongodb://localhost/libraryDb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    let categories =await CategoryController.printAllCategories();
    res.render('addBook',{categories:categories});
})

app.get(/.*/ ,(req,res)=>{
    res.statusCode = 404;
    res.send("404! ");
})

app.listen(PORT,()=>{
    console.log("Server is listening at PORT " +PORT);
})