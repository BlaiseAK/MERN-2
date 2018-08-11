const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {unique: true}
    },
    password: String,
    name: String
});

mongoose.pluralize(null);

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    console.log('password: ' +password);
    console.log('callback: '+callback);
    console.log('this.password: '+this.callback);
    bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
    const user = this;

    console.log('user is what?'+user);

    if(!user.isModified('password')) return next();

    return bcrypt.genSalt((saltError, salt) => {
        console.log('SALT: '+salt);
        if(saltError) {return next(saltError); }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if(hashError) { return next(hashError); }

            console.log('password before being saved' +user.password);
            user.password = hash;

            return next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);