const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountName: {
        type: String,
    },
    accountBalance: {
        type: Number,
        default: 0.0,
    },
    accountModifiedAt: {
        type: String,
    }
});

let Account = mongoose.model('Account', AccountSchema);

module.exports = Account;