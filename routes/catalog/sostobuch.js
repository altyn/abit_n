var express = require('express');
var router = express.Router();
var Sostobuch = require('../../models/catalog/sostobuch');

router.get('/', function(req, res){
    Zachislenie.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, zachislenie) {
            if (err) return console.error(err);

            res.render('catalog/zachislenie', {
                title: 'Условия зачисления',
                zachislenie: zachislenie
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Zachislenie.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Пользователь с таким именем уже существует!');
            res.redirect('/zachislenie');
        } else {

            var newCatalog = new Zachislenie();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/zachislenie');
            });
        }
    });
});

module.exports = router;