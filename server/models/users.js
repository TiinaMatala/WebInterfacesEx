var db = require('../db');
const bcrypt = require('bcryptjs');
const saltRounds = 4;

var users= {
    login: function(users, callback) {
    db.query('select * from users where email=?', [email], function(err, rows) {
      if (err) {
          callback(err, null);
          console.log("ERROR");
      } else
          callback(null, rows[0].email);
          console.log("email : "+rows[0].email);
          console.log("password : "+rows[0].password);
  
  }); 
  
  },
  add: function(users, callback) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
      return db.query(
      'insert into users (email, password) values(?,?,?)',
      [email, hash],
      callback);

  },
  get: function(callback) {
    return db.query('select * from users', callback);
  },
  getByUserId: function(user_id, callback) {
    return db.query('select * from users where user_id=?', [user_id], callback);
  },

  };

  module.exports = users ;