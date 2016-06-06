var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('Academic Degree');
});

module.exports = router;