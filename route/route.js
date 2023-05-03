const authMW = require('../middleware/auth/authMW');
const checkPasswordMW = require('../middleware/auth/checkPasswordMW');
const logoutMW = require('../middleware/auth/logoutMW');
const resetPasswordMW = require('../middleware/auth/resetPasswordMW');

const borrowBookMW = require('../middleware/book/borrowBookMW');
const deleteBookMW = require('../middleware/book/deleteBookMW');
const getAllBooksMW = require('../middleware/book/getAllBooksMW');
const getBookMW = require('../middleware/book/getBookMW');
const saveBookMW = require('../middleware/book/saveBookMW');

const renderMW = require('../middleware/render/renderMW');

const deleteUserMW = require('../middleware/user/deleteUserMW');
const getBorrowsMW = require('../middleware/user/getBorrowsMW');
const registerUserMW = require('../middleware/user/registerUserMW');
const saveUserMW = require('../middleware/user/saveUserMW');

const BookModel = require('../models/book');
const UserModel = require('../models/user')

module.exports = function (app) {
    const objectrepository = {
        UserModel,
        BookModel
    };

    app.use('/regisztracio',
        registerUserMW(objectrepository),
        renderMW(objectrepository, 'index'));

    app.use('/bejelentkezes',
        checkPasswordMW(objectrepository),
        renderMW(objectrepository, 'login'));

    app.use('/elfelejtett_jelszo',
        resetPasswordMW(objectrepository),
        renderMW(objectrepository, 'login'));

    app.get('/kolcsonzes',
        authMW(objectrepository),
        getAllBooksMW(objectrepository),
        renderMW(objectrepository, 'lend'));

    app.use('/kolcsonzes/:konyvid',
        authMW(objectrepository),
        getBookMW(objectrepository),
        borrowBookMW(objectrepository));

    app.get('/kolcsonzesek/:profil_id',
        authMW(objectrepository),
        getBorrowsMW(objectrepository),
        renderMW(objectrepository, 'borrows'));

    app.get('/konyvek',
        authMW(objectrepository),
        getAllBooksMW(objectrepository),
        renderMW(objectrepository, 'edit'));

    app.use('/konyvek/uj',
        authMW(objectrepository),
        saveBookMW(objectrepository),
        renderMW(objectrepository, 'editbook'));

    app.use('/konyvek/modositas/:konyvid',
        authMW(objectrepository),
        getBookMW(objectrepository),
        saveBookMW(objectrepository),
        renderMW(objectrepository, 'editbook'));

    app.use('/konyvek/torles/:konyvid',
        authMW(objectrepository),
        getBookMW(objectrepository),
        deleteBookMW(objectrepository));

    app.get('/profil/:profil_id',
        authMW(objectrepository),
        renderMW(objectrepository, 'profile'));

    app.use('/profil/:profil_id/modositas',
        authMW(objectrepository),
        saveUserMW(objectrepository),
        renderMW(objectrepository, 'profile'));

    app.use('/profil/:profil_id/torles',
        authMW(objectrepository),
        deleteUserMW(objectrepository),
        logoutMW(objectrepository));

    app.get('/kijelentkezes',
        authMW(objectrepository),
        logoutMW(objectrepository));
};