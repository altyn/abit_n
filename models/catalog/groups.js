var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    semestr: {
        type: Number,
        required: true,
        default: 1
    },
    curator: {
        type: String,
        default: 'N/A'
    },
    formaobuch: {
        type: String
    },
    note: {
        type: String
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Groups', groupsSchema);