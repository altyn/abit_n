var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({

    /*========= Personal Data (Required)=========*/
    _id: {
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
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String
    },
    phone:{
        type: String
    },
    avatar: {
        type: String
    },

    /*========= Data for education (Required)=========*/
    department:{
        type: String
    },
    group_code: {
        type: String,
        required: true
    },
    formaobuch:{
        type: String,
        required: true
    },
    acdegree:{
        type: String,
        required: true
    },
    semestr: {
        type: Number,
        default: 01
    },
    zachislenie: {
        type: String,
        default: "Не определено"
    },
    summa_kontrakta: {
        type: Number,
        default: 0
    },
    sostobuch: {
        type: String
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

    /*=========== Documents =======*/
    bafe_diplom_ser: {
        type: String
    },
    bafe_diplom_number: {
        type: String
    },
    bafe_diplom_date: {
        type: Date
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


    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    },

    /*========== About Relatives ===========*/
    about_mother: {
        type: String
    },
    about_father: {
        type: String
    }

});

module.exports = mongoose.model('Student', studentSchema);
