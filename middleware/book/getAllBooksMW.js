/**
 * Lekérdezi az adatbázisban szereplő könyveket és azok adatait,
 * valamint feloldja a User-t ha van hozzá társítva
 */

module.exports = function (objectrepository) {
    const BookModel = objectrepository.BookModel;
    return function (req, res, next) {
        return BookModel.find({}).populate("_user").exec( (err, books) => {
            if(err)
                return next(err);
            res.locals.books = books;
            return next();
        });
    };
};