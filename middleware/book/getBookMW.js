/**
 * Az adatbázisban szereplő könyv lekérdezése url-ben kapott azonosító alapján
 */

module.exports = function (objectrepository) {
    const BookModel = objectrepository.BookModel;
    return function (req, res, next) {
        return BookModel.findOne({ _id: req.params.konyvid }).populate("_user").exec( (err, book) => {
            if(err || !book) {
                return next(err);
            }
            res.locals.book = book;
            return next();
        });
    };
};