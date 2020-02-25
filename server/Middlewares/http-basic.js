const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const BasicStrategy = require('passport-http').BasicStrategy;



app.use(bodyParser.json());
app.use(cors())



passport.use(new BasicStrategy(
    function(email, password, done) {
  
        let user = undefined

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                user = users[i]
                break
            }
        }
    
      if(user == undefined)
      {
        console.log("HTTP Basic username not found");
        return done(null, false, { message: "HTTP Basic username not found" });
      }
      if(user.password !== password) 
      {
        console.log("HTTP Basic password not matching username");
        return done(null, false, { message: "HTTP Basic password not found" });
      }
      return done(null, user);
    }
  ));
  
  app.get('/httpBasicProtectedResource',
          passport.authenticate('basic', { session: false }),
          (req, res) => {
    
    res.json({
      yourProtectedResource: "profit"
    });
  });
  
  