/**
 * A felhasználó által módosított adatokat menti az adatbázisba
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        res.locals.user_data.surname = req.body.surname;
        res.locals.user_data.first_name = req.body.first_name;
        res.locals.user_data.email = req.body.email;
        res.locals.user_data.password = req.body.password;
        res.locals.user_data.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/profil/' + req.session.user_id);
        });
    };
};