require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const session = require('express-session')
const CategoryController = require("./controllers/categoryController");

const MemberController = require("./controllers/memberController");
const IssueController = require("./controllers/issueController");
const mongoose = require('mongoose');
const app = express();
const PORT = 8111;

const bookRouter = require("./routes/books")
const authRouter = require("./routes/auth")
app.use(morgan('dev'));
app.set('view engine','pug');
app.use(express.static('static'))
app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.get("/" ,(req,res)=>{
    res.render('index', {message:"Welcome to MyLibrary!"});
})
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Mongo DB Connected")
}).catch((e)=>{
    console.log(e.message);
});


let validateRequest = ((req,res,next)=>{
    let authHeader = req.headers['authorization'];
    if(!authHeader) {
        res.status(403).send("Token not provided.");
        return;
    }
    let token = authHeader.split(" ")[1];
    console.log("token here: ",token)
    if(!token){
        res.status(403).send("Token not provided.");
        return;
    }
    try{
        let tokenData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("this is data",tokenData);
        next();
    }
    catch(e){
        console.log(e);
        res.status(403).send("Invalid Token Provided");
    }
})
app.use("/books", validateRequest,bookRouter);
app.use(authRouter);



app.get("/addBook", async(req,res)=>{
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