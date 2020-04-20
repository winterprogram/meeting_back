const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userdata = new Schema({
    userid: {
        default: 'abc123',
        unique: true,
        index: true,
        type: String
    },
    firstname: {
        default: 'abc',
        required: true,
        type: String
    },
    lastname: {
        default: 'abc',
        required: true,
        type: String
    },
    email: {
        default: 'ac@xyz',
        type: String
    },
    password: {
        type: String
    },
    mobilenumber: {
        default: '123',
        type: String
    },
    valid: {
        type: String
    },
    country: {
        default: 'India',
        type: String
    },
    createdon: {
        type: Date
    }
});

let signup = mongoose.model('userinfo', userdata)

module.exports = {
    signup: signup
}