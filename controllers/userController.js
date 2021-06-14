const User = require("../models/user");
const bcrypt = require("bcrypt");

const defaultPic ="avatar.png";

const addNewUser = async({username, email, password, image}) =>{
    console.log(image);
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
    console.log(image)
    try {
        let user = new User({name:username, email:email, password:hash, image:image})
        await user.save();
        return {status: true, result: "Successfully Added"}
    } catch (e) {
        console.log("Error",e.message)
        return {status: false, result: e.message}        
    }
}

const loginAttemp = async(email,password) =>{
    let user =  await User.findOne({email:email});
    if(!user) return {status: false, result: "Email does not exist."} 
    else{
        let isValid = bcrypt.compareSync( password,user.password);
        console.log(isValid);
        if(isValid) return {status: true , result:user}
        else return {status: false , result: "Invalid Password"}
    }
}

module.exports = {
    addNewUser,
    loginAttemp
};