var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var groupsSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    code: {
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
        default: 'Не определено'
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
    },
    graduated : {
        type: Boolean,
        default: false
    }
});

groupsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Groups', groupsSchema);