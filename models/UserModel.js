const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  userId: {
    required: true,
    unique: true,
    index: true,
    default: '',
    type: String
  },
  userName: {
    required: true,
    unique: true,
    index: true,
    type: String,
  },
  mobileNumber: {
    type: Number,
    default: '',
    minlength: 10,
    maxlength: 10,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  countryName: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
   
  },

  password: {
    type: String,
    required: true,
    default: 'password'
  },

  isAdmin: {
    type: Boolean,
    default: 'false'
  },
  createdOn: {
    type: Date,
    default: ''
  }
})

mongoose.model('User', userSchema)