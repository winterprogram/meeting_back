const mongoose = require('mongoose')
const Schema = mongoose.Schema

let tokenSchema = new Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

let verify = mongoose.model('token',tokenSchema)

module.exports ={
    verify:verify
}