const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;
const config = ('../../config');

module.exports = new LocalStrategy({
    usernameFeild: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: req.body.email.trim(),
        password: req.body.password.trim()
    };

    console.log(`this is the req.body on the local-login file: ${req.body}`);
    console.log(`this is the req.body.email on the local-login file: ${req.body.email}`);
    console.log(`this is the req.body.password on the local-login file: ${req.body.password}`);

    return User.findOne({email: userData.email}, (err, user) => {
        if (err) {return done(err); }

        console.log(`finding what is being searched for in local-login file: ${userData.email}`);
        // if the email is not found when queried
        if(!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }

        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (err) {return done(err); }

            if(isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }

            const payload = {
                sub: user._id
            };

            // create a token string
            const token = jwt.sign(payload. config, jwtSecret);
            const data = {
                name: user.name
            };

            return done(null, token, data);
        });
    });
});