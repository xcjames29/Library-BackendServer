const express = require('express')
const multer = require("multer")
const multipart = multer({dest: "../static/images"})
const router = express.Router();
const userController = require("../controllers/userController");
const mongoose = require('mongoose');
router.post('/', async(req,res)=>{
    await mongoose.connect('mongodb://localhost/libraryDb', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("DATAAAAAAA",req.body);
    let result = await userController.addNewUser(req.body);
    console.log(result)
    if(result.status){
        res.send(result);
    }else{
        res.status(401).send(result);
    }
})

module.exports = router;