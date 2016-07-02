var express = require('express');
var passport = require('passport');
var router = express.Router();

/* Catalog routers*/
router.use('/users', isLoggedIn, require('./users'));
router.use('/acdegree', isLoggedIn, require('./catalog/acdegree'));
router.use('/actitle', isLoggedIn, require('./catalog/actitle'));
router.use('/country', isLoggedIn, require('./catalog/country'));
router.use('/departments', isLoggedIn, require('./catalog/departments'));
router.use('/groups', isLoggedIn, require('./groups'));
router.use('/district', isLoggedIn, require('./catalog/district'));
router.use('/discipline', isLoggedIn, require('./catalog/discipline'))
router.use('/formaobuch', isLoggedIn, require('./catalog/formaobuch'));
router.use('/jobstatus', isLoggedIn, require('./catalog/jobstatus'));
router.use('/nationality', isLoggedIn, require('./catalog/nationality'));
router.use('/position', isLoggedIn, require('./catalog/position'))
router.use('/region', isLoggedIn, require('./catalog/region'));
router.use('/sostobuch', isLoggedIn, require('./catalog/sostobuch'));
router.use('/zachislenie', isLoggedIn, require('./catalog/zachislenie'));
router.use('/ort', isLoggedIn, require('./catalog/ort'));

/* Persons router*/
router.use('/abiturient', isLoggedIn, require('./abiturient'));
router.use('/students', isLoggedIn, require('./student'));
router.use('/teachers', isLoggedIn, require('./teacher'));
router.use('/comission', isLoggedIn, require('./comission'));


/* Main pages routers */
router.get('/', function(req, res, next) {
    res.render('index', { title: "BDOC - BAFE" });
});
router.get('/dashboard', isLoggedIn, function(req, res, next) {
    res.render('admin/dashboard', { title: 'Dashboard' });
});
router.get('/login', function (req, res) {
    res.render('login', {
      message: req.flash('loginMessage')
    });
});
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));
router.get('/logout', function(req, res) {
   req.logout();
   res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next()
  res.redirect('/');
}