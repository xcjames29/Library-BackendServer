const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
    member: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member"
    },
    book: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Book"
    },
    isReturned:{
        type: Boolean,
        default: false,
        require: true
    }
},{timestamps:true,})


const IssueModel = new mongoose.model('Issue',IssueSchema);


module.exports = IssueModel;