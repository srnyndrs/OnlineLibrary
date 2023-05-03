const expect = require('chai').expect;
const getBorrowsMW= require('../../../../middleware/user/getBorrowsMW');

describe('getBorrowsMW middleware ', function () {
    it('should set res.locals.borrowed_books with an array of book objects from db', function (done) {
        const middleware = getBorrowsMW( {
            BookModel: {
                find: (p1,callback) => {
                    expect(p1).to.have.property( '_user', '12' );
                    callback(null, 'mockBooks');
                }
            }
        });
        const resMock = {
            locals: {}
        };
        middleware({
            session: {
                user_id: '12'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql(undefined);
            expect(resMock.locals).to.be.eql({ borrowed_books: 'mockBooks' });
            done();
        });
    });
    it('should call next with error when there is a db problem', function (done) {
        const middleware = getBorrowsMW( {
            BookModel: {
                find: (p1,callback) => {
                    expect(p1).to.have.property( '_user', '12' );
                    callback('db_error', null);
                }
            }
        });
        const resMock = {
            locals: {}
        };
        middleware({
            session: {
                user_id: '12'
            }
        },
        resMock,
        (err) => {
            expect(err).to.be.eql('db_error');
            done();
        });
    });
    it('should call next when no books found in the db', function (done) {
        const middleware = getBorrowsMW( {
            BookModel: {
                find: (p1,callback) => {
                    expect(p1).to.have.property( '_user', '12' );
                    callback(undefined, null);
                }
            }
        });
        const resMock = {
            locals: {}
        };
        middleware({
            session: {
                user_id: '12'
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