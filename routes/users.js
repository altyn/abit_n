var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/', function (req, res) {
    User.
        find({}).
        sort({ created: 'desc'}).
        exec( function (err, users) {
            if (err) return console.error(err);

            res.render('admin/users', {
                title: 'Список пользователей',
                users: users,
                message : req.flash('signupMessage')
            })
        });
});

router.post('/', passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: '/users',
    failureFlash: true
}));

module.exports = router;