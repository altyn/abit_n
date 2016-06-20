var express = require('express');
var router = express.Router();
var async = require('async');
var District = require('../../models/catalog/district');
var Region = require('../../models/catalog/region');

router.get('/', function(req, res){

    var catalog;

    catalog = {};

    async.parallel({
        districts: function (callback) {
            return District.find({}).sort('_id').exec( function (err, result) {
                if (err) return (err);
                return callback(err, result);
            });
        },
        regions: function (callback) {
            return Region.find({}).sort('_id').exec( function (err, result) {
                if(err) return(err);
                if (!result){
                    result === 'No departments';
                    return callback(err, result);
                } else {
                    return callback(err, result);
                }
            });
        }
    }, function(err, catalog){
        res.render( 'catalog/district', {
            title : 'Каталог "Районы"',
            catalog: catalog
        });
        console.log(catalog);;
    });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    District.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/district');
        } else {

            var newCatalog = new District();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;
            newCatalog.region = req.body.regions;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/district');
            });
        }
    });
});

module.exports = router;