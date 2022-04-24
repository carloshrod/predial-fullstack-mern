const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

exports.connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Connected to Database!!!")
    } catch (error) {
        console.log("Connection to Database failed!!!");
        console.log(error);
    }
}
