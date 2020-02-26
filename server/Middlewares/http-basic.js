const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('../db');
const BasicStrategy = require('passport-http').BasicStrategy;



app.use(bodyParser.json());
app.use(cors())



passport.use(new BasicStrategy(
    async (email, password, done) => {
      
  const user = await db.query('SELECT * FROM users Where email=?', [email]) 
  console.log(user[0])

    if(user == undefined)
      {
        console.log("HTTP Basic email not found");
        return done(null, false, { message: "HTTP Basic email not found" });
      }
      //if(user.password !== password) 
      if(bcrypt.compareSync(password, user[0].password) == false)
      {
        console.log("HTTP Basic password not matching email");
        return done(null, false, { message: "HTTP Basic password not found" });
      }
      return done(null, user[0]);
    }
  ));
  
  