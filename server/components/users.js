var express = require('express');
var router = express.Router();
var users = require('../models/users');
const Strategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');



router.post('/login', function(req, res) {
    var Password=request.body.password;
	var email = request.body.email;
  console.log('send email:',email); 
  if (email && loginPassword) {} 







})