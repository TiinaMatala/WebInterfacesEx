var express = require('express');
var router = express.Router();
var users = require('../models/users');
const Strategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

/*

passport.use(new Strategy((email, password, cb) => {
    db.query('SELECT user_id, email, password FROM users WHERE email = ?', [email]).then(dbResults => {
       if(dbResults.length == 0)
      {
        return cb(null, false);
      }
   bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
        if(bcryptResult == true)
        {
          cb(null, dbResults[0]);
        }
        else
        {
          return cb(null, false);
        }
      })
  
    }).catch(dbError => cb(err))
  }));

  router.get('/:id?', function(req, res, next) {
    if (req.params.id) {
      users.getById(req.params.id, function(err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    } else {
      users.get(function(err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows);
        }
      });
    }
  });



*/



