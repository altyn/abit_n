var express = require('express');
var router = express.Router();
var Sostobuch = require('../../models/catalog/sostobuch');

router.get('/', function(req, res){
    Sostobuch.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/sostobuch', {
                title: 'Каталог "Состояние обучения"',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Sostobuch.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/sostobuch');
        } else {

            var newCatalog = new Sostobuch();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/sostobuch');
            });
        }
    });
});

module.exports = router;