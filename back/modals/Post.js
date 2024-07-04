const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    accountTitle: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);
