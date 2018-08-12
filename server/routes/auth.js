const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

function validateSignupForm(payload){
    const errors = {};
    let isFormValid = true;
    let message = '';

    if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address'
    }

    if(!payload || typeof payload.password !== 'string' || (payload.password.trim().lenth < 8)) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if(!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if(!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';
    
    if(!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }
    
    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }
    
    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    console.log(`Payload.email of the auth.js file in routes: ${payload.email}`);
    console.log(`Payload.password of the auth.js file in routes: ${payload.password}`);
    
    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if(!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    return passport.authenticate('local-signup', (err) => {
        if(err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }
            
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.'
        });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    console.log(`router.post on the auth.js file: req.body.email, ${req.body.email}`);
    console.log(`router.post on the auth.js file: req.body.password, ${req.body.password}`);
    console.log(`router.post on the auth.js file: validationResult: ${validationResult.success}`);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    
    return passport.authenticate('local-login', (err, token, userData) => {
        if(err) {
            if(err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }
        
        console.log(`req at the end of the router: ${res.success}`);
        console.log(`req at the end of the router: ${res.message}`);
        console.log(`req at the end of the router: ${res.token}`);
        console.log(`req at the end of the router: ${res.user}`);
        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);
});

module.exports = router;