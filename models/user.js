const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User',{
    ticket_id: String,
    surname: String,
    first_name: String,
    email : String,
    password : String,
    admin: Boolean
});

module.exports = User;