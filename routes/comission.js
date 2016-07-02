var express = require('express');
var router = express.Router();
var async = require('async');
var Comission = require('../models/comission');
var Department = require('../models/catalog/departments')

router.get('/', function(req, res){

    var data;
    data = {};

    async.parallel({
        comission: function (callback) {
            return Comission.find({}).sort({ point: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        departments: function (callback) {
            return Department.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        }
    }, function(err, data){
        res.render('admin/comission', {
            title: 'Список абитуриентов',
            data: data
        });
    });
});

router.post('/', function (req, res, done) {

    var newData = new Comission();

    newData.regnumber = req.body.regnumber;
    newData.lastname =  req.body.lastname;
    newData.name = req.body.name;
    newData.middlename = req.body.middlename;
    newData.point = req.body.point;
    newData.department = req.body.department;


    newData.save( function (err) {
        if (err) console.log(err);
        req.flash('message', 'Данные успешно добавлены!');
        res.redirect('/comission');
    });
});

module.exports = router;