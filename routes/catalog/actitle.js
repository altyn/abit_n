var express = require('express');
var router = express.Router();
var Actitle = require('../../models/catalog/academictitle');

router.get('/', function(req, res){
    Actitle.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/actitle', {
                title: 'Каталог "Ученые звания"',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Actitle.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/actitle');
        } else {

            var newCatalog = new Actitle();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/actitle');
            });
        }
    });
});

module.exports = router;