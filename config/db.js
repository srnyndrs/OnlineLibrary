const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MDPLSQ',
   { useNewUrlParser: true });
module.exports = mongoose;