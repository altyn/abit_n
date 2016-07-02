var express = require('express');
var router = express.Router();
var Position = require('../../models/catalog/position');

router.get('/', function(req, res){
    Position.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/position', {
                title: 'Каталог "Должности"',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Position.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Пользователь с таким именем уже существует!');
            res.redirect('/position');
        } else {

            var newCatalog = new Position();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/position');
            });
        }
    });
});

module.exports = router;