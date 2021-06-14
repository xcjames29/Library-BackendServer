const express = require('express')
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, "static/images/")
    },
    filename: function (req,file,cb){
        cb(null,  Date.now()+"-"+file.originalname);
    }
})
const multipart = multer({storage})
const router = express.Router();
const userController = require("../controllers/userController");
router.post('/', multipart.single("image"), async(req,res)=>{
    console.log("DATAAAAAAA",req.body);
    console.log("Image",req.file);
    req.body['image'] = req.file.filename;
    let result = await userController.addNewUser(req.body);
    console.log(result.body)
    if(result.status){
        res.statusCode = 201;
        res.send(result);
    }else{
        res.status(401).send(result);
    }
})

module.exports = router;