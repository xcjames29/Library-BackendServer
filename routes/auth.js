const express = require('express')
const multer = require("multer")
const jwt = require('jsonwebtoken');
const userController = require("../controllers/userController")
let refreshTokenList = [];

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
router.post('/signup', multipart.single("image"), async(req,res)=>{
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



router.post('/login', async (req, res) => {
    console.log("post request entered?");
    console.log(req.body);
    let { email, password } = req.body;
    console.log("email: " + email, "password: " + password);
    let data = await userController.loginAttemp(email, password);
    if (data.status) {
        let payload = {
            'email': data.result.email
        }
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME});
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME});
        res.status(200).send({ status:true, result:{'ACCESS_TOKEN':token, "REFRESH_TOKEN":refreshToken}});
    }
    else{
        res.status(400).send(data)
    }

})


router.post("/token", async(req,res)=>{
    console.log("DATAAAAAAA",req.body);
    let {refreshToken} = req.body;
    try{
        let data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(data);
        let newToken = jwt.sign({email:data.email},process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME})
        res.status(200).send({status:true, result:{'ACCESS_TOKEN':newToken}});
    }
    catch(e){
        console.log(e);
        res.status(403).send("Refresh Token Expired");
    }
})



module.exports = router;