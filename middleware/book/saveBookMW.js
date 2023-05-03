/**
 * Elmenti - a kiválasztott könyv módosított adatait
 *         - az újonnan létrehozott könyvet
 */

module.exports = function (objectrepository) {
    const BookModel = objectrepository.BookModel;
    const UserModel = objectrepository.UserModel;
    return function (req, res, next) {
        if ((typeof req.body.book_title === 'undefined') ||
            (typeof req.body.author === 'undefined') ||
            (typeof req.body.published === 'undefined')) {
            return next();
        }
        if ((req.body.book_title === '') ||
            (req.body.author === '') ||
            (req.body.published === '')) {
            res.locals.error = 'Üres mezőket hagytál!';
            return next();
        }
        if (typeof res.locals.book === 'undefined') {
            const newBook = new BookModel();
            newBook.book_title = req.body.book_title;
            newBook.author = req.body.author;
            newBook.published = req.body.published;

            return newBook.save((err) => {
                if (err) {
                    return next(err);
                }
                return res.redirect('/konyvek');
            });
        } else {
            res.locals.book.book_title = req.body.book_title;
            res.locals.book.author = req.body.author;
            res.locals.book.published = req.body.published;
            if(req.body.user === '' || typeof req.body.user === 'undefined') {
                res.locals.book._user = null;
                return res.locals.book.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/konyvek');
                });
            } else {
                return UserModel.findOne( { ticket_id: req.body.user }, (err, user) => {
                    if(err) {
                        return next(err);
                    }
                    if(!user){
                        res.locals.error = 'Nincs ilyen azonosító az adatbázisban!';
                        return next();
                    } else {
                        if(!res.locals.book._user.equals(user)){
                            const currentDate = new Date();
                            res.locals.book.expiration_date = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 2) + '.' + currentDate.getDate() + '.';
                            res.locals.book._user = user._id;
                        }
                        return res.locals.book.save((err) => {
                            if (err) {
                                return next(err);
                            }
                            return res.redirect('/konyvek');
                        });
                    }
                });
            }
        }
    };
};