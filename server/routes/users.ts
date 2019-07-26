var express = require('express');
var router = express.Router();

/* GET users listing. */
const users = [
  {"id": 1, "name": "leah", "password" : "leah123"}, 
  {"id": 2, "name": "roy", "password" : "roy123"},
  {"id": 3, "name": "zeta", "password" : "zeta123"}
];
router.get('/', function(req, res, next) {
  res.json(users);
 }); 

 router.post('/auth', function(req, res, next) {
   const {username,password} = req.body;
   console.log(username, password);
   let validUser:Boolean = false;
   users.forEach(function(user) {
     if(username == user.name && password == user.password){
       validUser = true;
     }
   });
   res.json({"authenticated" : validUser});

 }); 

module.exports = router;
