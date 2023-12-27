const mongoose = require('mongoose');

const BucketSchema = new mongoose.Schema({
    bucketName: {
        type: String,
    },
    bucketGoal: {
        type: Number,
        default: 0.0,
    },
    bucketModifiedAt: {
        type: String,
    },
    accounts: [{
        account: {
            type: mongoose.Schema.Types.Mixed,
            ref: 'Account',
        },
        accountAvailable: {
            type: Number,
            default: 0.0,
        },
        inputValue: {
            type: Number,
            default: 0.0,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
        isEntire: {
            type: Boolean,
            default: false,
        },
    }],
});

let Bucket = mongoose.model('Bucket', BucketSchema);

module.exports = Bucket;