const mongoose = require('../database');

const MusicSchema = new mongoose.Schema({
    number: {
        type: Int16Array,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
});

const Music = mongoose.model('Music', MusicSchema);

module.exports = Music;