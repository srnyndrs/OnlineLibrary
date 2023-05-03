/**
 *  A template engine segítségével értékeket renderel a sablonokba
 */

module.exports = function (objectrepository, viewName) {
    return function (req, res) {
        return res.render(viewName, res);
    };
};