const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;


module.exports = new LocalStrategy({
    usernameField: 'email',
    usernameField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: req.body.email.trim(),
        password: req.body.password.trim(),
        name: req.body.name.trim()
    };

    const newUser = new User(userData);

    newUser.save((err) => {
        if(err) {return done(err);}

        return done(null);
    });
});