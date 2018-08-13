const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const LoginLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

module.exports = new LoginLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    console.log(email)
    console.log(req.body.email)
    console.log(password)
    console.log(req.body.password)
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    console.log(`this is the req.body on the local-login file: ${req.body}`);
    console.log(`this is the req.body.email on the local-login file: ${req.body.email}`);
    console.log(`this is the req.body.password on the local-login file: ${req.body.password}`);

    return User.findOne({email: userData.email}, (err, user) => {
        if (err) {return done(err); }

        console.log(`finding what is being searched for in local-login file: ${userData.email}`);
        // if the email is not found when queried
        if(!user) {
            const error = new Error('Incorrect password blaise!');
            error.name = 'IncorrectCredentialsError';
            return done(error);
        }

        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (err) {return done(err); }

            if(!isMatch) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }

            const payload = {
                sub: user._id
            };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.name
            };
                console.log(`this is the token from local-sign.js file: ${token}`);
                console.log(`this is the data.name from local-sign.js file: ${data.name}`);
            return done(null, token, data);
        });
    });
});