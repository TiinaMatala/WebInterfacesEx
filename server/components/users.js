const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;
const router = express.Router();
const basicstrategy = require('../Middlewares/http-basic') ;
const BasicStrategy = require('passport-http').BasicStrategy;

const saltRounds = 4;


app.use(bodyParser.json());
app.use(cors());

let users = [

  {
     user_id: 1 ,
     email: "didi@oamk.fi",
     password: "didididi"
  }
   ,
  {
    user_id: 2 ,
    email: "lina@oamk.fi",
    password: "lina123"
 }

]


router.post('/register', (req, res) => {
  var password = req.body.password.trim();
  var email = req.body.email.trim();
  if ((typeof email === "string") &&
    (email.length > 4) &&
    (typeof password === "string") &&
    (password.length > 6)) {
      console.log(password)
    bcrypt.hash(password, saltRounds)
    .then(hash =>
    db.query('INSERT INTO users (email, password) VALUES (?,?)', [email, hash])
      )
    .then(dbResults => {
        console.log(dbResults);
        res.sendStatus(201);
      })
      
    .catch(error => {
        console.log(error);
      res.sendStatus(403) });
  }
}) 
router.post('/login', 
 passport.authenticate('basic', { session: false }),
  function (req, res ) {
  
          res.send(req.user.user_id.toString());
            console.log("user_id=", req.user.user_id);
          
  });


router.get('/:user_id',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    db.query('SELECT user_id, email FROM users WHERE user_id = ?', [req.params.user_id]).then(results => {
      res.json(results);

    })
  });

     router.get('/', (req, res) => {
      db.query('SELECT user_id, email FROM users').then(results => {
        res.json(results);

      })

    })

module.exports = router;



