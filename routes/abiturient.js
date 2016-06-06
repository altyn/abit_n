var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('admin/abiturient', { title: 'Абитуриенты' });
});

module.exports = router;