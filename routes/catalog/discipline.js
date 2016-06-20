var express = require('express');
var router = express.Router();
var Discipline = require('../../models/catalog/discipline');

router.get('/', function(req, res){
    Discipline.
        find({}).
        sort({ _id: 'desc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/discipline', {
                title: 'Каталог "Дисциплина"',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Discipline.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/discipline');
        } else {

            var newCatalog = new Discipline();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/discipline');
            });
        }
    });
});

module.exports = router;