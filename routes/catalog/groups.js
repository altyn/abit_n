var express = require('express');
var router = express.Router();
var async = require('async');
var Groups = require('../../models/catalog/groups');
var Department = require('../../models/catalog/departments');
var Formaobuch = require('../../models/catalog/formaobuch');

router.get('/', function(req, res){
    var data;
    data = {};

    async.parallel({
        groups: function (callback) {
            return Groups
                .find({})
                .exec(function (err, result) {
                    if (err) console.error(err);

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
        res.render('admin/groups', {
            title: 'Группы',
            data: data
        });
    });
});
router.post('/add', function (req, res, done) {

    var newData = new Groups();

    newData.department = req.body.department;
    newData.code = req.body.code;
    newData.name = req.body.name;
    newData.semestr = req.body.semestr;
    newData.curator = req.body.curator;
    newData.formaobuch = req.body.formaobuch;
    newData.note = req.body.note;


    newData.save(function (err) {
        if (err) console.log(err);
        req.flash('message', 'Данные успешно добавлены!');
        res.redirect('/groups');
    });
});
router.get('/bydepartment/:depname', function(req, res){

    var filter = req.params.depname;

    var data;
    data = {};

    async.parallel({
        groups: function (callback) {
            return Groups
                .find({})
                .exec(function (err, result) {
                    if (err) console.error(err);

                    return callback(err, result);
                });
        }
    }, function(err, data){
        res.render('admin/groups_filter', {
            title: 'Группы по департаментам',
            data: data
        });
        console.log(filter);
    });

});

router.post('/list', function (req, res, done) {

    var data;
    data = {};

    async.parallel({
        groups: function (callback) {
            return Groups
                .find({})
                .exec(function (err, result) {
                    if (err) console.error(err);

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

        if(!err) {
            res.status(200).jsonp({data: data.groups });
        }
    });
});

module.exports = router;