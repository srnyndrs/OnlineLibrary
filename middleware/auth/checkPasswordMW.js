/**
 * Ellenőrzi a bejelentkezni szándékozó felhasználóhoz társított jelszót
 *      - ha sikeres -> session + redirect /kolcsonzes
 *      - ha sikertelen -> hibaüzenet
 * 'admin' kölcsönzési azonosító esetén admin jogok garantalása a session-ben
 */

const UserModel = require("../../models/user");

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if((typeof req.body.ticket_id === 'undefined') &&
            (typeof req.body.password === 'undefined')) {
            return next();
        }
        UserModel.findOne({ ticket_id: req.body.ticket_id }, (err,user)=> {
            if(!user) {
                res.locals.error = 'Nem létezik ilyen felhasználó!';
                return next();
            }
            if(user.password === req.body.password) {
                req.session.loggedin = true;
                req.session.user_id = user._id;
                if (user.ticket_id === "admin") {
                    req.session.admin = true;
                }
                return req.session.save((err)=>{
                    return res.redirect('/kolcsonzes');
                });
            } else {
                res.locals.error = 'Hibás jelszó!';
                return next();
            }
        });
    };
};