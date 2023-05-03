/**
 *  Kijelentkeztetés, session törlése
 */

module.exports = function (objectrepository) {
    return function(req, res, next) {
        req.session.destroy((err) => {
            if(err) {
                return next(err);
            }
            return res.redirect('/');
        });
    };
};