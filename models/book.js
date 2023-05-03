const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Book = db.model('Book',{
    book_title: String,
    author: String,
    published: String,
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expiration_date: {
        type: String,
    }
});

module.exports = Book;