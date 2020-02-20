const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcryptjs');
const passport = require('passport');

//app.get('/', (req, res) => res.send('Hello World!'));
app.use(bodyParser.json());

app.use(cors())

passport.use(new Strategy((email, password, cb) => {

    db.query('', [email]).then(dbResults => {
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
  
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));