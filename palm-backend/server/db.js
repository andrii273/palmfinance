if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: '.env' });
} else {
    require('dotenv').config({ path: '.env.development' });
}
const mongoose = require("mongoose");

module.exports = () => {
    const connection = mongoose
        .connect("mongodb+srv://michael:happy@maincluster.7ttzpzy.mongodb.net/palm")
        .then((result) => console.log("connected to database"))
        .catch((err) => console.log(err));
}