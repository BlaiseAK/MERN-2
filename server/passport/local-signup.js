const User = require('mongoose').model('User');
const SignupLocalStrategy = require('passport-local').Strategy;


module.exports = new SignupLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    console.log(email);
    console.log(password)
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim()
    };

    const newUser = new User(userData);

    newUser.save((err) => {
        if(err) {return done(err);}

        return done(null);
    });
});