const readline = require("readline-sync");
const mongoose = require('mongoose');

const CategoryController = require("./controllers/categoryController");
const BookController = require("./controllers/bookController");
const MemberController = require("./controllers/memberController");
const IssueController = require("./controllers/issueController");

function options(){
    console.log("Here are some options that you can use: ");
    console.log("------Category Section----");
    console.log("1. Show all category");
    console.log("2. Add new category");
    console.log("3. Delete a category");
    console.log("------Book Section-----");
    console.log("4. See all books");
    console.log("5. Add a book");
    console.log("6. Delete a book");
    console.log("7. Search a book");
    console.log("8. Display books by category");
    console.log("------Member Section-----");
    console.log("9. See all members");
    console.log("10. Add a member");
    console.log("11. Delete a member");
    console.log("------Issue Section-----");
    console.log("12. Issue a book.");
    console.log("13. Return a book.");
    console.log("14. See active issues.");
    console.log("15. Show book issue history.");
    console.log("------Exit-----");
    console.log("16. Exit ");
}


async function showOptions(){
    console.log("Welcom to the library!");
    await mongoose.connect('mongodb://localhost/libraryDb',{ 
        useNewUrlParser: true ,
        useUnifiedTopology: true
    });
    let db = mongoose.connection;
    let stillRunning = true;
    while(stillRunning){
        options();
        let toDo = readline.question("Enter number of choice: ");
        console.log(toDo);
        if(toDo=="1"){
            await CategoryController.printAllCategories()
        }
        else if(toDo =="2"){
            let response = readline.question("What is the name of category? ");
            await CategoryController.addCategory(response);
        }
        else if(toDo =="3"){
            let response = readline.question("What category do you want to delete? ");
            await CategoryController.deleteCategory(response);
        }
        else if(toDo =="4"){
            await BookController.printAllBooks();
        }
        else if(toDo == "5"){
            let title = readline.question("What is the title of the book? ");
            let price = readline.question("What is the price of the book? ");
            let authors = [];
            let hasAnother = true;
            while(hasAnother){
                let author = readline.question("Who is the author of the book? ");
                authors.push(author);
                let another = readline.question("Does it have another author?(y,n) ");
                if(another != "y") hasAnother = false; 
            }
            let category = readline.question("What is the name of category? ");
           await BookController.addBook({title:title,price:price,authors:authors,category:await CategoryController.getCategoryId(category)});
        }
        else if(toDo == "6"){
            let title = readline.question("What is the title of the book you want to delete? ");
            await BookController.deleteBook(title);
        }
        else if(toDo == "7"){
            let title = readline.question("What is the book you want to search? ");
            await BookController.searchBook(title);
        }
        else if(toDo == "8"){
            let category = readline.question("What is the name of category? ");
            await BookController.searchBookCategory(await CategoryController.getCategoryId(category));
        }
        else if(toDo == "9"){
            await MemberController.printAllMembers();
        }
        else if(toDo == "10"){
           let name = readline.question("What is the name of the new member? ");
           await MemberController.addMember(name);
        }
        else if(toDo == "11"){
            let name = readline.question("What is the name/id of the member to delete? ");
            await MemberController.deleteMember(name);
        }
        else if(toDo == "12"){
            let book = readline.question("What is the name of the book to be issue?");
            let bookId = await BookController.getBookId(book);
            if(!bookId) console.log("There is no such book.")
            else{
                let name = readline.question("What is the name of the member? ");
                let memberId = await MemberController.getMemberId(name);
                if(!memberId) console.log("The member is not valid.");
                else{
                    await IssueController.addIssue(memberId,bookId)
                }
            }
        }
        else if(toDo == "13"){
            let book = readline.question("What is the name of the book to be return?");
            let bookId = await BookController.getBookId(book);
            if(!bookId) console.log("There is no such book.")
            else{
                let name = readline.question("What is the name of the member? ");
                let memberId = await MemberController.getMemberId(name);
                if(!memberId) console.log("The member is not valid.");
                else{
                    await IssueController.returnIssue(memberId,bookId)
                }
            }
        }
        else if(toDo == "14"){
            await IssueController.showActiveIssues();
        }
        else if(toDo == "15"){
            let book = readline.question("What is the name of the book to be return? ");
            let bookId = await BookController.getBookId(book);
            if(!bookId) console.log("There is no such book.")
            else{
                await IssueController.showBookHistory(bookId);
            }
        }
        else{
            stillRunning=false;
        }
    }
    db.close();
}

showOptions();