var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var acdemicdegreeSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    short: {
        type: String,
        default: 'N/A'
    }
});

module.exports = mongoose.model('Academicdegree', acdemicdegreeSchema);