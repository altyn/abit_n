var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sostobuchSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Sostobuch', sostobuchSchema);