/**
 * Felhasználó törlése
 * Ehhez ellenőrzi, hogy van-e aktív kölcsönzés
 *      - ha nincs -> törlés és átirányítás a főoldalra
 *      - ha van  -> nem történik semmi
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const BookModel = objectrepository.BookModel;
        if (typeof res.locals.user_data === 'undefined') {
            return next();
        }
        return BookModel.find({ _user: req.session.user_id }, (err, books) => {
            if(books.length === 0) {
                return res.locals.user_data.remove(err => {
                    if (err) {
                        return next(err);
                    }
                    return next();
                });
            } else {
                return res.redirect('/profil/' + req.session.user_id);
            }
        });
    };
};