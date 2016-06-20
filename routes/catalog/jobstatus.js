var express = require('express');
var router = express.Router();
var Jobstatus = require('../../models/catalog/jobstatus');

router.get('/', function(req, res){
    Jobstatus.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, catalog) {
            if (err) return console.error(err);

            res.render('catalog/jobstatus', {
                title: 'Статус ППС',
                catalog: catalog
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Jobstatus.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/jobstatus');
        } else {

            var newCatalog = new Jobstatus();

            newCatalog._id = req.body._id;
            newCatalog.desc =  req.body.desc;

            newCatalog.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/jobstatus');
            });
        }
    });
});

module.exports = router;