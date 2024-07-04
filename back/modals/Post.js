const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    image: {
        type: String,
        // required: true
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
