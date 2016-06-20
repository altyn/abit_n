var express = require('express');
var router = express.Router();
var async = require('async');
var Region = require('../../models/catalog/region');
var Country = require('../../models/catalog/country');

router.get('/', function(req, res){

    var catalog;
    catalog = {};
    async.parallel({
        countries: function(callback){
            return Country.find({}).sort('_id').exec(function(err, result){
                if (err) return err;
                return callback(err, result)
            });
        },
        regions: function(callback) {
            return Region.find({}).sort('_id').exec(function(err, result){
                if (err) return err;
                return callback(err, result)
            });
        }

    }, function(err, catalog){
        res.render('catalog/region', {
            title: 'Регионы',
            catalog: catalog
        });
    });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Region.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/region');
        } else {

            var newCatalog = new Region();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;
            newCatalog.country = req.body.country;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/region');
            });
        }
    });
});

module.exports = router;