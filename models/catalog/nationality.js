var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nationalitySchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Nationality', nationalitySchema);