var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var abiturientSchema = new Schema({

    regnumber: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    middlename:{
        type: String,
        required: true
    },
    nationality:{
        type: String,
        required: true
    },
    citizenship:{
        type: String,
        default: "КР"
    },
    sex:{
        type: String,
        required: true
    },
    department:{
        type: String
    },
    formaobuch:{
        type: String,
        required: true
    },
    acdegree:{
        type: String,
        required: true
    },
    to_course: {
        type: Number,
        default: 01
    },

    /*========= Passport Data (Required)=========*/
    pass_series: {
        type: String,
        required: true
    },
    pass_number: {
        type: String,
        required: true
    },
    pass_from: {
        type: String,
        required: true
    },
    pass_date: {
        type: Date,
        required: true
    },

    /*=========== Documents =======*/

    doc_type: {
      type: String
    },
    doc_series: {
        type: String
    },
    doc_number: {
        type: String
    },
    doc_from: {
        type: String
    },
    doc_date: {
        type: Date
    },


    ortid: {
      type: String
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String
    },

    /*========== Address =========*/
    h_country: {
        type: String
    },
    h_region: {
      type: String
    },
    h_district: {
        type: String
    },
    home_address: {
        type: String
    },
    l_country: {
        type: String
    },
    l_region: {
        type: String
    },
    l_district: {
        type: String
    },
    live_address: {
        type: String
    },
    phone:{
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date
    },
    avatar: {
        type: String
    },

    /*========== About Relatives ===========*/
    about_mother: {
        type: String
    },
    about_father: {
        type: String
    }

});

module.exports = mongoose.model('Abiturient', abiturientSchema);
