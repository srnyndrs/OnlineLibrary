/**
 * A felhasználó a kölcsönzőjegy azonosítójával új jelszót kér
 * Új jelszót generál, beállítja és elküldi azt neki
 * Ez az üzenet e-mail cím helyett a console.log-ra érkezik
 */

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const UserModel = objectrepository.UserModel;
        if ((typeof req.body.ticket_id === 'undefined') &&
            (typeof req.body.password === 'undefined')) {
            return next();
        } else if (req.body.ticket_id === ''){
            res.locals.error = 'Üres azonosító mező!';
            return next();
        } else {
            return UserModel.findOne({ ticket_id: req.body.ticket_id }, function(err, user){
                if(!user) {
                    res.locals.error = 'Nem létezik ilyen felhasználó!';
                    return next();
                }
                user.password = `${Math.random()}`.slice(2);
                user.save();
                console.log("Uj jelszava:\n" + user.password)
                return next();
            });
        }
    };
};