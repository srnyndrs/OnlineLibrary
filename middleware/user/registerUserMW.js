/**
 * POST esetén ellenőrzi, hogy létezik-e már felhasználó a megadott azonosítóval
 *      - ha nem, akkor létrehozza és menti, majd redirect /kolcsonzes
 *      - ha igen, akkor hibaüzenet
 * Az 'admin' kölcsönzőjegy azonosítóval való regisztráció után tudjuk szerkeszteni a könyveket
 */

module.exports = function (objectrepository) {
    const UserModel = objectrepository.UserModel;
    return function (req, res, next) {
         if((typeof req.body.surname === 'undefined') &&
            (typeof req.body.first_name === 'undefined') &&
            (typeof req.body.ticket_id === 'undefined') &&
            (typeof req.body.email === 'undefined') &&
            (typeof req.body.password === 'undefined')) {
            return next();
        } else if((req.body.surname === '') ||
             (req.body.first_name === '') ||
             (req.body.ticket_id === '') ||
             (req.body.email === '') ||
             (req.body.password === '')) {
             res.locals.error = 'Töltsön ki minden mezőt!';
             return next();
         } else {
            return UserModel.findOne({ ticket_id: req.body.ticket_id}, (err,user)=> {
                if (user) {
                    res.locals.error = 'Már létezik ilyen felhasználó!';
                    return next();
                } else {
                    const newUser = new UserModel();
                    newUser.ticket_id = req.body.ticket_id;
                    newUser.surname = req.body.surname;
                    newUser.first_name = req.body.first_name;
                    newUser.email = req.body.email;
                    newUser.password = req.body.password;
                    if(newUser.ticket_id === 'admin') {
                        newUser.admin = true;
                    } else {
                        newUser.admin = false;
                    }
                    return newUser.save( (err) => {
                        if (err) {
                            return next(err);
                        }
                        req.session.user_id = newUser._id;
                        req.session.loggedin = true;
                        return req.session.save((err)=>{
                            return res.redirect('/kolcsonzes');
                        });
                    });
                }
            });
        }
    };
};