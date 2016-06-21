var express = require('express');
var router = express.Router();
var Departments = require('../../models/catalog/departments');

router.get('/', function(req, res){
    Departments.
        find({}).
        sort({ _id: 'asc'}).
        exec( function (err, departments) {
            if (err) return console.error(err);

            res.render('catalog/departments', {
                title: 'Департаменты',
                departments: departments
            })
        });
});

router.post('/', function (req, res, done) {
    var id = req.body._id;

    Departments.findOne({ '_id' : id}, function (err, catalog) {

        if (err)
            return done(err);

        if (catalog) {
            req.flash('message', 'Уже существует!');
            res.redirect('/departments');
        } else {

            var newDep = new Departments();

            newDep._id = req.body._id;
            newDep.name =  req.body.desc;
            newDep.head = req.body.header;
            newDep.assistant = req.body.assist;
            newDep.phone = req.body.phone;
            newDep.email = req.body.email;
            newDep.comment = req.body.note;

            newDep.save( function (err) {
                if (err)
                    throw err;
                req.flash('message', 'Данные успешно добавлены!')
                res.redirect('/departments');
            });
        }
    });
});

module.exports = router;