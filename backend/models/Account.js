const mongoose = require("mongoose");
const User = require('./User');

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Account", AccountSchema);