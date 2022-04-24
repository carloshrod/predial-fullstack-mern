const nodemailer = require('nodemailer');
const { USER, PASSWORD } = require('../config');

exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
        user: USER,
        pass: PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})
