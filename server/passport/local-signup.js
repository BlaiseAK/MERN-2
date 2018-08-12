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
    console.log(`this is the req on the local-signup file: ${req.body}`);
    console.log(`this is the email on the local-signup file: ${req.body.email}`);
    console.log(`this is the password on the local-signup file: ${req.body.password}`);
    console.log(`this is the done on the local-signup file: ${done}`);
    const newUser = new User(userData);
    console.log(`this is the new user on the local-signup file: ${newUser}`);
    newUser.save((err) => {
        if(err) {return done(err);}

        return done(null);
    });
});