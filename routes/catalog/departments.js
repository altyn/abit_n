var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('hello department');
});

module.exports = router;