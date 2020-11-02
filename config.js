exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
     'mongodb+srv://LeahBorns:Test1234@commute-calculator-fina.zpygx.mongodb.net/commute-calculator-final-capstone?retryWrites=true&w=majority' :
     'mongodb+srv://LeahBorns:Test1234@commute-calculator-fina.zpygx.mongodb.net/commute-calculator-final-capstone?retryWrites=true&w=majority');
exports.PORT = process.env.PORT || 8080;

//exports.JWT_SECRET = process.env.JWT_SECRET;
//exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '365d';

exports.JWT_SECRET = process.env.JWT_SECRET;
DATABASE_URL = 'mongodb+srv://LeahBorns:Test1234@commute-calculator-fina.zpygx.mongodb.net/commute-calculator-final-capstone?retryWrites=true&w=majority'
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
