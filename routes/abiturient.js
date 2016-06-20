var express = require('express');
var router = express.Router();
var async = require('async');
var Abiturient = require('../models/abiturient');
var Nationality = require('../models/catalog/nationality');
var Department = require('../models/catalog/departments');
var Formobuch = require('../models/catalog/formaobuch');
var Acdegree = require('../models/catalog/academicdegree');
var Ort = require('../models/catalog/ort');
var Country = require('../models/catalog/country');
var Region = require('../models/catalog/region');
var District = require('../models/catalog/district');

router.get('/', function(req, res){

    var new_abiturient;

    new_abiturient = {};

    async.parallel({
        nationalities: function (callback) {
            return Nationality.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        departments: function (callback) {
            return Department.find({}).sort('_id').exec( function (err, result) {
                if(err) return(err);
                if (!result){
                    result === 'No departments';
                    return callback(err, result);
                } else {
                    return callback(err, result);
                }
            });
        },
        formobuchs: function (callback) {
            return Formobuch.find({}).sort('_id').exec( function (err, result) {
                if(err) return(err);
                return callback(err, result)
            });
        },
        academicdegree: function (callback) {
            return Acdegree.find({}).sort('_id').exec( function (err, result) {
                if(err) return(err);
                return callback(err, result);
            });
        },
        ort: function (callback) {
            return Ort.find({}).sort({'created': -1}).exec( function (err, result) {
                if(err) return(err);
                return callback(err, result);
            });
        },
        countries: function (callback) {
            return Country.find({}).sort('_id').exec( function (err, result) {
                if(err) return (err);
                return callback(err, result);
            });
        },
        regions: function (callback) {
            return Region.find({}).sort('_id').exec( function (err, result) {
                if(err) return(err);
                if (!result){
                    result === 'No regions';
                    return callback(err, result);
                } else {
                    return callback(err, result);
                }

            });
        },
        districts: function (callback) {
            return District.find({}).sort('_id').exec( function (err, result) {
                if(err) return(err);
                if (!result){
                    result === 'No districts';
                    return callback(err, result);
                } else {
                    return callback(err, result);
                }

            });
        },
        abiturient: function (callback) {
            return Abiturient.find({}).sort('created').exec( function (err, result) {
                if(err) return(err);
                if (!result){
                    result === 'No abiturients';
                    return callback(err, result);
                } else {
                    return callback(err, result);
                }

            });
        }

    }, function(err, new_abiturient){
        res.render( 'admin/abiturient', {
            title : 'Абитуриенты',
            new_abiturient: new_abiturient
        });
    });
});

router.post('/', function(req, res, done){

    var idregnumber = req.body.regnumber;
    var image_url = 'avatars/default-avatar-girl.png';

    //Abiturient.find({ 'regnumer' : idregnumber}, function (err, abiturient) {
    //
    //    if (err)
    //        throw err;
    //
    //    if (abiturient) {
    //        req.flash('message', 'Абитуриент с таким регистрационным номером уже существует!');
    //        res.redirect('/abiturient');
    //    } else {
    if (req.body.sex == "Мужчина"){
        image_url = 'avatars/default-avatar-guy.png';
    }

            var newAbit = new Abiturient();

            newAbit.regnumber = idregnumber;
            newAbit.birthdate = parseDate(req.body.birthdate);
            newAbit.lastname = req.body.surname;
            newAbit.name = req.body.name;
            newAbit.middlename = req.body.middle_name;
            newAbit.nationality = req.body.nationality;
            newAbit.citizenship = req.body.citizen;
            newAbit.sex = req.body.sex;
            newAbit.department = req.body.department;
            newAbit.formaobuch = req.body.formaobuch;
            newAbit.acdegree = req.body.acdegree;
            newAbit.to_course = req.body.course;

            newAbit.pass_series = req.body.pass_series;
            newAbit.pass_number = req.body.pass_number;
            newAbit.pass_from = req.body.pass_from;
            newAbit.pass_date = parseDate(req.body.pass_date);

            newAbit.doc_type = req.body.d_type;
            newAbit.doc_series = req.body.d_series;
            newAbit.doc_number = req.body.d_number;
            newAbit.doc_from = req.body.d_from;
            newAbit.doc_date = parseDate(req.body.d_date);

            newAbit.ortid = req.body.ort;

            newAbit.h_country = req.body.h_country;
            newAbit.h_region = req.body.h_region;
            newAbit.h_district = req.body.h_district;
            newAbit.home_address = req.body.h_address;

            newAbit.l_country = req.body.l_country;
            newAbit.l_region = req.body.l_region;
            newAbit.l_district = req.body.l_district;
            newAbit.live_address = req.body.l_address;

            newAbit.phone = req.body.phone;
            newAbit.email = req.body.email;
            newAbit.avatar = image_url;
            newAbit.about_mother = req.body.about_m;
            newAbit.about_father = req.body.about_f;

            newAbit.save( function (err) {
                if (err)
                    console.error(err);
                req.flash('message', 'Данные успешно добавлены!');
                res.redirect('/abiturient');
            });
    //    }
    //});
});

router.get('/print/:regnumber', function(req, res){

    Abiturient.
        find({ regnumber: req.params.regnumber}).
        exec( function (err, abiturient) {
            if (err) return console.error(err);

            res.render('admin/abiturient_print', {
                title: 'Абитуриенты',
                abiturient: abiturient
            })

            console.log(abiturient);
            console.log(req.params.regnumber);
    });

});

module.exports = router;

function parseDate(input) {
    var parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}