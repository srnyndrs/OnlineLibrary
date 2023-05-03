/**
 * Ellenőrzi, hogy bejelentkezett-e már a felhasználó és lekérdezi az adatait
 *      - ha nem, akkor redirect '/' (főoldal)
 *      - ha igen, akkor tárolás res.locals-on és next()
 */

const UserModel = require("../../models/user");

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof req.session.loggedin === 'undefined' || req.session.loggedin !== true) {
            return res.redirect('/');
        }
        UserModel.findOne({ _id: req.session.user_id}, (err,user) => {
            res.locals.user_data = user;
            return next();
        });
    }
};