var express = require('express');
var router = express.Router();
var Acdegree = require('../../models/catalog/academicdegree');

router.get('/', function(req, res){
    Acdegree.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/acdegree', {
                title: 'Каталог "Академическая степень"',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Acdegree.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/acdegree');
        } else {

            var newCatalog = new Acdegree();

            newCatalog._id = req.body._id;
            newCatalog.short = req.body.short;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/acdegree');
            });
        }
    });
});

module.exports = router;