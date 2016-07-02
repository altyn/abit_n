var express = require('express');
var router = express.Router();
var Nationality = require('../../models/catalog/nationality');

router.get('/', function(req, res){
    Nationality.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/nationality', {
                title: 'Каталог "Национальности"',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Nationality.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/position');
        } else {

            var newCatalog = new Nationality();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/nationality');
            });
        }
    });
});

module.exports = router;