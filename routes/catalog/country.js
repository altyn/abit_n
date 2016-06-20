var express = require('express');
var router = express.Router();
var Country = require('../../models/catalog/country');

router.get('/', function(req, res){
    Country.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/country', {
                title: 'Регионы',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Country.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/country');
        } else {

            var newCatalog = new Country();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;
            newCatalog.country = req.body.country;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/country');
            });
        }
    });
});

module.exports = router;