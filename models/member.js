const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    memberID:{
        type: Number,
        default: ()=>Date.now(),
        unique: true
    }
},{timespams:true})


const MemberModel = new mongoose.model('Member',MemberSchema);


module.exports = MemberModel;