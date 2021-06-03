const Issue = require("../models/issue");

const printIssue = async () => {
    let issue = await Issue.find().populate("book", "member");
    console.log(issue);
}

const addIssue = async (name, book) => {
    let issueBook = await Issue.findOne({ book: book, isReturned: false }).populate("book").populate("member");
    let issueMember = await Issue.findOne({ member: name, isReturned: false }).populate("book").populate("member");
    console.log(issueBook);
    if (issueBook) console.log(" Book is still issued. ");
    else if (issueMember) console.log(" Member has issued book. ");
    else {
        const issue = Issue({ member: name, book: book });
        await issue.save();
        console.log("Book has been issued.");
    }
}

const returnIssue = async (memberId, bookId) => {
    let issue = await Issue({ member: memberId, book: bookId, isReturned: false }).findOne();
    if (!issue) console.log("There is no issue record");
    else {
        issue.isReturned = true;
        await issue.save();
        console.log("Book returened Successfully");
    }
}


const showActiveIssues = async () => {
    let issue = await Issue.find({ isReturned: false }).populate("book").populate("member");
    console.log("------------");
    if (issue.length === 0) console.log(" 0 active issue. ");
    issue.forEach(e => {
        console.log(e.book.title + " is issued by " + e.member.name)
    });
    console.log("------------");
}

const showBookHistory = async (bookId) => {
    let issue = await Issue.find({book:bookId}).populate("book").populate("member");
    console.log("------------");
    if (issue.length === 0) console.log(" 0 active issue.");
    issue.forEach(e => {
        let borrowDate = new Date(e.createdAt).toLocaleDateString();
        console.log(e.book.title + " is issued by " + e.member.name + " issued at " + borrowDate);
    });
    console.log("------------");
}

module.exports = {
    printIssue,
    addIssue,
    returnIssue,
    showActiveIssues,
    showBookHistory
}