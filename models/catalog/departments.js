var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    head: {
        type: String,
        default: 'Пользователь'
    },
    assistant: {
        type: String,
        default: 'Пользователь'
    },
    phone: {
        type: String,
        default: 'N/A'
    },
    email: {
        type: String
    },
    comment: {
        type: String
    }
});

module.exports = mongoose.model('Department', departmentSchema);