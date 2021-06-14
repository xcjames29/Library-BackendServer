const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');



const userController = require("../controllers/userController")

router.post('/', async (req, res) => {
    console.log("post request entered?");
    console.log(req.body);
    let { email, password } = req.body;
    console.log("email: " + email, "password: " + password);
    let data = await userController.loginAttemp(email, password);
    if (data.status) {
        let payload = {
            'email': data.result.email,
            'iat': Date.now()
        }
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).send({ status:true, result:{'ACCESS_TOKEN':token}})
    }
    else{
        res.status(400).send(data)
    }

})


module.exports = router;