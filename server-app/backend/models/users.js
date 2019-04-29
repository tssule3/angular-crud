const mongoose = require('mongoose');

const UserInfoSchema = mongoose.Schema({
    email: String,
    password: String
}, {collection: 'userInfo'});

module.exports = mongoose.model('Users', UserInfoSchema);