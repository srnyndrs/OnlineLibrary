/**
 * A kiválasztott könyv társítása kölcsönzésként a felhasználóhoz
 * Könyv mentése az adatbázisba
 */

const mongoose = require('mongoose');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof res.locals.book === 'undefined') {
            return next();
        }

        res.locals.book._user = mongoose.Types.ObjectId(req.session.user_id);

        const currentDate = new Date();
        res.locals.book.expiration_date = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 2) + '.' + currentDate.getDate() + '.';

        return res.locals.book.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/kolcsonzes');
        });
    };
};