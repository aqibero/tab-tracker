const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

async function hashPassword (user, options) {
  const SALT_FACTOR = 8
    
  if (!user.changed('password')) {
    return
  }
  return await bcrypt
    .hash(user.password, null, null, function(error, hash){ 
      // console.log(hash)
      //  Store hash in password DB.
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
  }, {
    hooks: {
      beforeCreate: hashPassword
      // beforeUpdate: hashPassword,
      // beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}
