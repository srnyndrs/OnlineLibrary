/**
 * Lekérdezi az adott felhasználó által kölcsönzött könyveket
 */

module.exports = function (objectrepository) {
    const BookModel = objectrepository.BookModel;
    return function (req, res, next) {
        return BookModel.find({ _user: req.session.user_id }, (err, books) => {
            if(err || !books) {
                return next(err);
            }
            res.locals.borrowed_books = books;
            return next();
        });
    };
};