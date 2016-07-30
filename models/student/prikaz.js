var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prikazSchema = new Schema({

    person_id: {
      type: String
    },
    code: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Prikaz', prikazSchema);
