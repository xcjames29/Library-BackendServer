const Member = require("../models/member");

const printAllMembers = async () => {
    let member = await Member.find();
    console.log("---------");
    if (member.length === 0) console.log(" 0 Results.")
    member.forEach(e => {
        console.log("Name: "+e.name +" | MemberID: " + e.memberID); 
    });
    console.log("---------");
}


const addMember = async (name) => {
    try {
        let record =  await Member.findOne({name:name});
        if(!record){
            const member = Member({name: name});
            await member.save();
            console.log(name + " is added");
        }
        else{
            console.log(name + " is already exist!");
        }
    }
    catch (e) {
        console.log(e);
    }
}

const deleteMember = async(name) =>{
    try {
        let record =  await Member.findOne({name:name});
        if(record){
            await Member.deleteOne({name:name}, (err)=>{
                if(err){
                    console.log(err)
                }
                else{
                console.log(name +" is deleted.")
                }
            })
        }
        else{
            let recordId = await Member.findOne({memberID:name});
            if(recordId){
                await Member.deleteOne({memberID:name}, (err)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                    console.log(name +" is deleted.")
                    }
                })
            }
            else console.log(name +" is not available!");
        }
     }
     catch (e) {
         console.log(e.message);
     }
}

const getMemberId = async (name) =>{
    let member = await Member.findOne({name:name});
    console.log(member);
    return member?member._id:null;
}

module.exports = {
    printAllMembers,
    addMember,
    deleteMember,
    getMemberId
};