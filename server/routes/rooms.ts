var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {"name":"Ego",   "betSize":1},
    {"name":"Earth", "betSize":2},
    {"name":"Asgard", "betSize":5},
    {"name":"Vormir", "betSize":20},
    {"name":"Titan",  "betSize":100}
  ]
  );
 }); 

module.exports = router;
