var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {"id" : 111, "name":"Ego",   "betSize":1},
    {"id" : 121, "name":"Earth", "betSize":2},
    {"id" : 131, "name":"Asgard", "betSize":5},
    {"id" : 141, "name":"Vormir", "betSize":20},
    {"id" : 151, "name":"Titan",  "betSize":100}
  ]
  );
 }); 

module.exports = router;
