const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(session({
    secret: 'admin',
    resave: true,
    saveUninitialized: false
}));

require('./route/route')(app);

app.get('/',function (req, res) {
    res.redirect('/bejelentkezes'); // '/bejelentkezes' a főoldal a root '/' helyett
});

app.listen(3000, function () {
    console.log('On :3000');
});