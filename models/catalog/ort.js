var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ort = new Schema({
    _abiturId:      { type: Number, required: true},
    code:           { type: String, required: true},
    color:          { type: String },
    mainPoint:      { type: Number, required: true, default: '0'},
    subjectPoint:   { type: Number, default: '0'},
    foryear:        { type: Number},
    created:        { type :Date, default: Date.now}
});

module.exports = mongoose.model('Ort', ort);