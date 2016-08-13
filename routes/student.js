var express = require('express');
var router = express.Router();
var async = require('async');
var Student = require('../models/student/student');
var Comission = require('../models/comission');
var Nationality = require('../models/catalog/nationality');
var Department = require('../models/catalog/departments');
var Formobuch = require('../models/catalog/formaobuch');
var Acdegree = require('../models/catalog/academicdegree');
var Ort = require('../models/catalog/ort');
var Country = require('../models/catalog/country');
var Region = require('../models/catalog/region');
var District = require('../models/catalog/district');
var Groups = require('../models/catalog/groups');
var Helpers = require('../lib/helpers');

router.get('/', function(req, res){
        res.render('student/students', { title: 'Студенты' });
});

router.get('/new', function(req, res){


    var new_abiturient;

    new_abiturient = {};

    async.parallel({
        groups: function (callback) {
            return Groups.find({}).sort('code').exec( function (err, result) {
                if (err) console.error(err);
                return callback(err, result);
            });
        },
        nationalities: function (callback) {
            return Nationality.find({}).sort('_id').exec( function (err, result) {
                if (err) console.error(err);
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
        }

    }, function(err, new_abiturient){
        //res.jsonp(data)
        res.render( 'student/student_new', {
            title : 'Добавить нового студента',
            new_abiturient: new_abiturient
        });
        console.log(new_abiturient);
    });

});

router.post('/new', function(req, res, done){

    var idregnumber = req.body.regnumber;
    var image_url = 'avatars/default-avatar-girl.png';

    if (req.body.sex == "Мужчина"){
        image_url = 'avatars/default-avatar-guy.png';
    }

    var newStud = new Student();

    newStud._id = idregnumber;
    newStud.birthdate = Helpers.parseDate(req.body.birthdate);
    newStud.lastname = req.body.surname;
    newStud.name = req.body.name;
    newStud.middlename = req.body.middle_name;
    newStud.nationality = req.body.nationality;
    newStud.citizenship = req.body.citizen;
    newStud.sex = req.body.sex;
    newStud.department = req.body.department;
    newStud.group_code = req.body.group;
    newStud.formaobuch = req.body.formaobuch;
    newStud.acdegree = req.body.acdegree;
    newStud.to_course = req.body.course;

    newStud.pass_series = req.body.pass_series;
    newStud.pass_number = req.body.pass_number;
    newStud.pass_from = req.body.pass_from;
    newStud.pass_date = Helpers.parseDate(req.body.pass_date);

    newStud.doc_type = req.body.d_type;
    newStud.doc_series = req.body.d_series;
    newStud.doc_number = req.body.d_number;
    newStud.doc_date = Helpers.parseDate(req.body.d_date);

    newStud.ortid = req.body.ort;

    newStud.h_country = req.body.h_country;
    newStud.h_region = req.body.h_region;
    newStud.h_district = req.body.h_district;
    newStud.home_address = req.body.h_address;

    newStud.l_country = req.body.l_country;
    newStud.l_region = req.body.l_region;
    newStud.l_district = req.body.l_district;
    newStud.live_address = req.body.l_address;

    newStud.phone = req.body.phone;
    newStud.email = req.body.email;
    newStud.avatar = image_url;
    newStud.about_mother = req.body.about_m;
    newStud.about_father = req.body.about_f;

    newStud.save( function (err) {
        if (err)
            console.error(err);
        req.flash('message', 'Данные успешно добавлены!');
        console.log(newStud);
        res.redirect('/students');
    });
    //    }
    //});
});

router.get('/new/:regnumber', function(req, res){

    //var query =  getComission(Comission, req.params.regnumber).exec(function(err,res){
    //    if(err) console.log(err);
    //    console.log(res);
    //    });

    var regnumberId = req.params.regnumber;


    var new_abiturient;

    new_abiturient = {};

    async.parallel({
        groups:         function (callback) {
            return Groups.find({}).sort('code').exec( function (err, result) {
                if (err) console.error(err);
                return callback(err, result);
            });
        },
        comission:      function (callback) {
            return Comission.find({regnumber : regnumberId }).sort('_id').exec( function (err, result) {
                if (err) console.error(err);
                return callback(err, result);
            });
        },
        nationalities:  function (callback) {
            return Nationality.find({}).sort('_id').exec( function (err, result) {
                if (err) console.error(err);
                return callback(err, result);
            });
        },
        departments:    function (callback) {
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
        formobuchs:     function (callback) {
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
        ort:            function (callback) {
            return Ort.find({}).sort({'created': -1}).exec( function (err, result) {
                if(err) return(err);
                return callback(err, result);
            });
        },
        countries:      function (callback) {
            return Country.find({}).sort('_id').exec( function (err, result) {
                if(err) return (err);
                return callback(err, result);
            });
        },
        regions:        function (callback) {
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
        districts:      function (callback) {
            return District.find({}).sort('_id').exec( function (err, result) {
                if(err) return(err);
                if (!result){
                    result === 'No districts';
                    return callback(err, result);
                } else {
                    return callback(err, result);
                }

            });
        }

    }, function(err, new_abiturient){
        //res.jsonp(data)
        res.render( 'student/student_from_comission', {
            title : 'Добавить нового студента',
            new_abiturient: new_abiturient
        });
        console.log(new_abiturient);
    });

});

router.get('/search.json', function(req, res) {
    Comission.
        find({}).
        exec( function (err, data) {
            if (err) console.error(err);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: data }));

        });
});

module.exports = router;

function getComission (Model, regnumber) {
    var query = Model.find({regnumber : regnumber});
    return query;
}