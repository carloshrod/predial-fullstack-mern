require("dotenv").config();

exports.MONGODB_URI = process.env.MONGODB_URI

exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

exports.USER = process.env.USER_MAIL_SERVER
exports.PASSWORD = process.env.PASS_MAIL_SERVER

exports.ADMIN_URL = process.env.ADMIN_URL
exports.USER_INT_URL = process.env.USER_INT_URL
exports.USER_EXT_URL = process.env.USER_EXT_URL

exports.CLOUD_NAME = process.env.CLOUD_NAME
exports.CLOUD_API_KEY = process.env.CLOUD_API_KEY
exports.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET
