const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;

//app.get('/', (req, res) => res.send('Hello World!'));
app.use(bodyParser.json());
app.use(cors())

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

  
 app.post('/users/register', (req, res) => {
    let email = req.body.email.trim();
    let password = req.body.password.trim();
if((typeof email === "string") &&
    (email.length > 4) &&
    (typeof password === "string") &&
    (password.length > 6))
 {
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

 app.get('/users/:user_id',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
   db.query('SELECT user_id, email FROM users WHERE user_id = ?', [req.params.user_id]).then(results => {
      res.json(results);

    })

    app.get('/users', (req, res) => {
       db.query('SELECT user_id, email FROM users').then(results => {
        res.json(results);
    
      })
    
    })
    

  });
  
  
  
  
  
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));