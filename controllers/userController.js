const User = require("../models/user");
const bcrypt = require("bcrypt");

const defaultPic ="../static/images/avatar.png";

const addNewUser = async({username, email, password, image}) =>{
    if(!image){
        image = defaultPic;
    }
    console.log(email);
    let emailRegex = /.*@.*\..*/
    if(!emailRegex.test(email)){
        return {status: false, message: "Invalid Email ID"};
    }
    //bcrypt 
    let hash = await bcrypt.hash(password, 10);
    console.log(hash);
    try {
        let user = new User({name:username, email:email, password:hash, image:image})
        await user.save();
        return true
    } catch (e) {
        console.log("Error",e.message)
        return e.message;        
    }
}

module.exports = {
    addNewUser
};