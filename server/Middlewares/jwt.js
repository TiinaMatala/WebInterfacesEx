const express = require('express');
const app = express();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const port = 3000;

const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
      ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('./jwt-key.json');




passport.use(new BasicStrategy(
  function(email, password, done) {

    //const user = users.getUserByName(username);
    let user = undefined

    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            user = users[i]
            break
        }
    }

    if(user == undefined)
    {
      console.log("HTTP Basic email not found");
      return done(null, false, { message: "HTTP Basic email not found" });
    }

   
    if(user.password !== password) 
    {
      // Password does not match
      console.log("HTTP Basic password not matching email");
      return done(null, false, { message: "HTTP Basic password not found" });
    }
    return done(null, user);
  }
));

let options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

options.secretOrKey = jwtSecretKey.secret;

passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    console.log("Processing JWT payload for token content:");
    console.log(jwt_payload);
    return done(null, jwt_payload);
}));

app.get(
    '/jwtProtectedResource', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log("jwt");
        res.json(
            {
                status: "Successfully accessed protected resource with JWT",
                user: req.user
            }
        );
    }
);

app.get(
    '/loginForJWT', 
    passport.authenticate('basic', { session: false }),
    (req, res) => {
      const body = { 
        id: req.user.id,
        email : req.user.email, 
      };  
  
      const payload = {
        user : body
      };
  
    
      const token = jwt.sign(payload, jwtSecretKey.secret);
  
      return res.json({ token });
  }
)
 