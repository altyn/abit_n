var express = require('express');
var router = express.Router();
var Formaobuch = require('../../models/catalog/formaobuch');

router.get('/', function(req, res){
    Formaobuch.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/formaobuch', {
                title: 'Форма обучения',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Formaobuch.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/formaobuch');
        } else {

            var newCatalog = new Formaobuch();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/formaobuch');
            });
        }
    });
});

module.exports = router;