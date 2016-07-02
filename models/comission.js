var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comissionSchema = new Schema({

    regnumber: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        reuired: true
    },
    passed: {
        type: Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Comission', comissionSchema);