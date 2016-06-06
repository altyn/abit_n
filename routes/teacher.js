var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('admin/teachers', { title: 'Преподаватели' });});

module.exports = router;