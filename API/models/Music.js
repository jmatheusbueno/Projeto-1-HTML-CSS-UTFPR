const mongoose = require('mongoose');

const Music = mongoose.model('Music', {
    tittle: String,
});

module.exports = Music;