var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var disciplineSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Discipline', disciplineSchema);