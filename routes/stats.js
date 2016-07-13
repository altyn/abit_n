var express = require('express');
var router = express.Router();
var async = require('async');
var Comission = require('../models/comission');
var Department = require('../models/catalog/departments');

router.get('/comission', function(req, res){
    var data;
    data = {};

    async.parallel({
        total: function(callback) {
            return Comission.count({}).exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        byDepartmentChart: function (callback) {
            Comission.aggregate([
                {
                    $group: {
                        _id: '$department',  //$department is the column name in collection
                        count: {$sum: 1}
                    }
                }
            ], function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });

        }
    }, function(err, data){
        res.render('stats/comission_stats', {
            title: 'Статистика абитуриентов',
            data: data
        });
        console.log(data);
    });


});

router.post('/', function (req, res, done) {


});

module.exports = router;