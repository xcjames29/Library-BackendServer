const Category = require("../models/category");

const printAllCategories = async () => {
    let categories = await Category.find();
    console.log("---------");
    if (categories.length === 0) console.log(" 0 Results.")
    categories.forEach(e => {
        console.log(e.name);
    });
    console.log("---------");
    return(categories)
}


const addCategory = async (response) => {
    try {
        let data =  await Category.findOne({name:response});
        if(!data){
            const category = Category({ name: response });
            await category.save();
            console.log(response + " is added");
        }
        else{
            console.log(response + " is already exist!");
        }
    }
    catch (e) {
        console.log(e.message);
    }
}


const deleteCategory = async (response) => {
    try {
       let data =  await Category.findOne({name:response});
       if(data){
        await Category.deleteOne({name:response}, (err)=>{
            if(err){
                console.log(err)
            }
            else{
             console.log(response +" is deleted.")
            }
        })
       }
       else{
           console.log(response +" is not available!");
       }
    }
    catch (e) {
        console.log(e.message);
    }
}

const getCategoryId = async(response)=>{
    let data =  await Category.findOne({name:response});
    return data._id;
}
module.exports = {
    printAllCategories,
    addCategory,
    deleteCategory,
    getCategoryId
};