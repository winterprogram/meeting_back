const bcrypt = require('bcrypt')
const saltRounds = 10

/* Custom Library */

let hashpassword = (myPlaintextPassword) => {
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(myPlaintextPassword, salt)
  return hash
}


let comparePassword = (oldPassword, hashpassword, cb) => {
  bcrypt.compare(oldPassword, hashpassword, (err, res) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, res)
    }
  })
}




module.exports = {
  hashpassword: hashpassword,
  comparePassword: comparePassword
}