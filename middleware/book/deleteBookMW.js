/**
 * Törli a könyvet az adatbázisból
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        if (typeof res.locals.book === 'undefined') {
            return next();
        }
        return res.locals.book.remove(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/konyvek');
        });
    };
};