var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);

var userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        default: "Пользователь"
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastlogin: {
        type: Date
    }

});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, salt, null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setLoginDate = function (date) {
    this.lastlogin  = date;
};

module.exports = mongoose.model('User', userSchema);