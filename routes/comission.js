var express = require('express');
var router = express.Router();
var async = require('async');
var Comission = require('../models/comission');
var Department = require('../models/catalog/departments');
var Formaobuch = require('../models/catalog/formaobuch');

router.get('/', function(req, res){

    var data;
    data = {};

    async.parallel({
        comission: function (callback) {
            return Comission.find({point: { $gt: 0}}).sort({ point: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        departments: function (callback) {
            return Department.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        formaobuch: function (callback) {
            return Formaobuch.find({}).sort('_id').exec( function (err, result) {
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
    newData.formaobuch = req.body.formaobuch;
    newData.tour = req.body.tour;


    newData.save( function (err) {
        if (err) console.log(err);
        req.flash('message', 'Данные успешно добавлены!');
        res.redirect('/comission');
    });
});

router.get('/sort', function(req, res){
    res.redirect('/comission/');
});
router.post('/sort', function(req, res){
    var tour = req.body.tour;
    res.redirect('/comission/sort/'+tour+'/'+req.body.department+'/'+req.body.formaobuch);
});
router.get('/sort/:tour/:depId/:formId', function(req, res){
    var tour = 1;

    tour = req.params.tour;
    var depSort = req.params.depId;
    var formobuchSort = req.params.formId;

    var data;
    data = {};

    async.parallel({
        comission: function (callback) {
            return Department.find({_id: depSort}).exec(function(err, depresult) {
                if (err) {
                    return (err);
                } else {
                    Formaobuch.find({_id: formobuchSort}).exec(function (err, formresult) {
                        if (err) {
                            return (err);
                        } else {
                            if ( depresult[0].name == 'undefined' && formresult[0].desc == 'undefined' ){
                                console.log(err);
                                res.redirect('/comission');
                            } else {
                                Comission
                                    .find({department: depresult[0].name, formaobuch: formresult[0].desc, tour: tour})
                                    .sort({point: 'desc'})
                                    .exec(function (err, result) {
                                        if (err) res.redirect('comission');
                                        return callback(err, result);
                                    });
                            }

                        }
                    });
                }
            });
        },
        departments: function (callback) {
            return Department.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        formaobuch: function (callback) {
            return Formaobuch.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        }
    }, function(err, data){
        res.render('admin/comission_sort', {
            title: 'Список абитуриентов отсортированный',
            data: data
        });
    });
});

router.get('/others', function(req, res) {

    var data;
    data = {};

    async.parallel({
        comission: function (callback) {
            return Comission.find({point: { $lte: 0}}).sort({ lastname: 'desc'}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        departments: function (callback) {
            return Department.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        formaobuch: function (callback) {
            return Formaobuch.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        }
    }, function(err, data){
        res.render('admin/comission_others', {
            title: 'Список абитуриентов',
            data: data
        });
    });
});
router.post('/others', function(req, res){
    res.redirect('/comission/others/'+req.body.department+'/'+req.body.formaobuch);
});
router.get('/others/:depId/:formId', function(req, res){

    var depSort = req.params.depId;
    var formobuchSort = req.params.formId;

    var depsCount = 0;
    var formCount = 0;

    //var data;
    //data = {};

    var resu = ["Не определено", "Не определено"];

    //Department.count().exec( function(err, count) {
    //    if(err){ return err } else {
    //
    //        if(depSort >= count && count >=0){
    //            Department.find({_id: depSort}).select('name -_id').exec(function(err, depresult){
    //
    //            });
    //        }else{
    //
    //        }
    //    }
    //});
    async.parallel({
        comission: function (callback) {

            return Department.find({_id: depSort}).select('name -_id').exec(function(err, depresult) {
                if (err) { return (err) } else {

                    resu[0] = depresult[0].name;

                    Formaobuch.find({_id: formobuchSort}).select('desc -_id').exec(function (err, formresult) {
                        if (err) { return (err) } else {
                                Comission
                                    .find({
                                        department: depresult[0].name,
                                        formaobuch: formresult[0].desc,
                                        point: {$lte: 0}
                                    })
                                    .sort({point: 'desc'})
                                    .exec(function (err, result) {
                                        if (err) res.redirect('comission');
                                        return callback(err, result);
                                    });
                            console.log(depresult[0].name+"/"+formresult[0].desc);
                            }
                    });
                }
            });
        },
        departments: function (callback) {
            return Department.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        formaobuch: function (callback) {
            return Formaobuch.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        }
    }, function(err, data){
        res.render('admin/comission_others', {
            title: 'Список абитуриентов отсортированный',
            data: data
        });
    });
});

router.get('/print/:regn', function (req, res){

    var regnumberValue = req.params.regn;

    Comission.
        find({ regnumber: regnumberValue}).
        limit(1).
        exec( function (err, data) {
            if (err) console.error(err);

            res.render('admin/comission_other_print', {
                title: 'Абитуриенты',
                data: data
            })
        });
});

module.exports = router;