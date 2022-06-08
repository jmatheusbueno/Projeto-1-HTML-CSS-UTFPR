const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
mongoose.Promise = global.Promisse;

module.exports = mongoose;