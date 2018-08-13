const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const config = require('./config');
const PORT = process.env.PORT || 3001;

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactUserAuth2");

require('./server/models').connect(process.env.MONGODB_URI || "mongodb://localhost/reactUserAuth2");

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());

const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

const SignupStrategy = require('./server/passport/local-signup');
const LoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', SignupStrategy);
passport.use('local-login', LoginStrategy);


const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, function() {
    console.log(`API Server now listening on PORT ${PORT}!`);
});