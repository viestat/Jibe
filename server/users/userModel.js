var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Q        = require('q'),
    SALT_WORK_FACTOR  = 10;

//===========================
// User schema
//===========================
var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  salt: String,
  name: {
    first: String,
    last: String,
  },
  image: String,
  updated_at: {type: Date}
});

// method to compare usernames original password (salted + hashsed) with entered password
UserSchema.methods.comparePasswords = function (candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

// before saving any User
//   revise updated_at field with current date
//   update the has of the password if the password is reset or new
UserSchema.pre('save', function (next) {
  var user = this;
  this.updated_at = new Date();

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);