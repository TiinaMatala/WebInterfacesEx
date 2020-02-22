const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const users = require('../models/users');
const router = express.Router()

const saltRounds = 4;


app.use(bodyParser.json());
app.use(cors())


router.post('/register', (req, res) => {
  var password = req.body.password.trim();
  var email = req.body.email.trim();
  if ((typeof email === "string") &&
    (email.length > 4) &&
    (typeof password === "string") &&
    (password.length > 6)) {
    bcrypt.hash(password, saltRounds).then(hash =>
      db.query('INSERT INTO users (email, password) VALUES (?,?)', [email, hash])
    )
      .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
      })
      .catch(error => res.sendStatus(403));
  }
})

router.post('/', function (req, res, next) {
  users.add(req.body, function (err, count) {
console.log('jhvjhv')
    if (err) {                                                                                                                                                                                                                                                                                                                                                                                                                              
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});


router.post('/login', function (req, res) {
  var password = req.body.password;
  var email = req.body.email;
  console.log('send email:', email);
  if (email && password) {
    db.query('SELECT * FROM users WHERE email = ?',
      [email], function (error, results, fields) {
        if (results.length > 0) {
          if (bcrypt.compareSync(password, results[0].password)) {
            response.send(results[0].user_id.toString());
            console.log("user_id=", results[0].user_id);
          }

        } else {
          console.log("unsuccessful");
          response.send(false);
        }
        response.end();
      });
  } else {
    response.send('Please enter email and password');
    response.end();
  }
});

router.get('users/:user_id',
  //passport.authenticate('basic', { session: false }),
  (req, res) => {
    db.query('SELECT user_id, email FROM users WHERE user_id = ?', [req.params.user_id]).then(results => {
      res.json(results);

    })
  });

    router.get('/:user_id?', function (req, res, next) {
      if (req.params.user_id) {
        users.getByUserId(req.params.user_id, function (err, rows) {
          if (err) {
            res.json(err);
          } else {
            res.json(rows);
          }
        });
      } else {
        users.get(function (err, rows) {
          if (err) {
            res.json(err);
          } else {
            res.json(rows);
          }
        });
      }
    });



    router.get('/users', (req, res) => {
      db.query('SELECT user_id, email FROM users').then(results => {
        res.json(results);

      })

    })










module.exports = router;



