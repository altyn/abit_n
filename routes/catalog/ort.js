var express = require('express');
var router = express.Router();
var Ort = require('../../models/catalog/ort');

router.get('/', function(req, res){
    Ort.
        find({}).
        sort({ created: 'desc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/ort', {
                title: 'Сертификаты ОРТ',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Ort.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/ort');
        } else {

            var newCatalog = new Ort;

            newCatalog._abiturId = req.body.id;
            newCatalog.code = req.body.code;
            newCatalog.color = req.body.color;
            newCatalog.mainPoint = req.body.mainpoint;
            newCatalog.subjectPoint = req.body.subjectpoint;
            newCatalog.foryear = req.body.yr;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/ort');
            });
        }
    });
});

module.exports = router;