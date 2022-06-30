const mongoose = require('mongoose');

const Login = mongoose.model('Login', {
    username: String,
    password: String,
});

module.exports = Login;