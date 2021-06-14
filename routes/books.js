const express = require("express");

const router = express.Router();
const BookController = require("../controllers/bookController");
const CategoryController = require("../controllers/categoryController");
router
    .route("/")
    .get(async(req, res) => {
        let books = await BookController.printAllBooks();
        //res.render('books' ,{message:'List of Books' ,data:books})
        res.json(books);
    }).post(async( req, res) => {
        console.log(req.body);
        let categoryId = await CategoryController.getCategoryId(req.body.category)
        let newObj = {
            title: req.body.title,
            authors: req.body.author.split(","),
            price: req.body.price,
            category: categoryId
        }
        await BookController.addBook(newObj);
        console.log(newObj);
        res.writeHead(301,{'Location':"/books"});
        res.end();
    })
    .delete(async(req,res)=>{
        console.log(req.body);
        await BookController.deleteBookId(req.body._id)
        res.end();
    })

module.exports = router;