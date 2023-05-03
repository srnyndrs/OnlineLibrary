const expect = require('chai').expect;
const getBookMW = require('../../../../middleware/book/getBookMW');

describe('getBookMW middleware ', function () {
    it('should set res.locals.book with a book object from db', function (done) {
        const middleware = getBookMW( {
            BookModel: {
                findOne: ((p1) => ({
                    populate: () => ({
                        exec: ((callback) => {
                            expect(p1).to.be.eql({ _id: '12' });
                            callback(null, 'mockBook');
                        }),
                    }),
                }))
            }
        });
        const resMock = {
            locals: {}
        };
        middleware({
            params: {
                konyvid: '12'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ book: 'mockBook' });
            done();
        });
    });
    it('should call next with error when there is a db problem', function (done) {
        const middleware = getBookMW( {
            BookModel: {
                findOne: ((p1) => ({
                    populate: () => ({
                        exec: ((callback) => {
                            expect(p1).to.be.eql({ _id: '12' });
                            callback('db_error', 'mockBook');
                        }),
                    }),
                }))
            }
        });
        const resMock = {
            locals: {}
        };
        middleware({
            params: {
                konyvid: '12'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql('db_error');
            done();
        });
    });
    it('should call next when no book found in the db', function (done) {
        const middleware = getBookMW( {
            BookModel: {
                findOne: ((p1) => ({
                    populate: () => ({
                        exec: ((callback) => {
                            expect(p1).to.be.eql({ _id: '12' });
                            callback(undefined, null);
                        }),
                    }),
                }))
            }
        });
        const resMock = {
            locals: {}
        };
        middleware({
            params: {
                konyvid: '12'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({});
            done();
        });
    });
});