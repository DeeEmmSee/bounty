const User = require("../models/user.js");
const crypto = require('crypto');

exports.getUser = function(req, res) {
    User.getUserByEmail(req.body.email)
    .then(function(user) {
        res.status(200).send(user);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
    
    /*User.getUser(req.params.userId)
    .then(function() {
        res.status(200).send(user);
    })
    .catch(function() {
        res.status(500).send(err);
    });*/

    // , function(err, user){
    //     if (err) {
    //         res.status(500).send(err);
    //     }
    //     else {
    //         res.status(200).send(user);
    //     }
    // }
};

exports.createUser = function(req, res) {
    var user = new User(req.body);
    user.DateRegistered = new Date();
    
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                     .update(user.Password)
                     .digest("base64");
    user.Password = salt + "$" + hash;

    User.createUser(user)
    .then(function(userId) {
        res.status(201).send(userId.toString());
    })
    .catch(function(err) {
        res.status(500).send(err);
    });

    // , function(err, userId){
    //     if (err) {
    //         res.status(500).send(err);
    //     }
    //     else {
    //         res.status(201).send(userId.toString());
    //     }
    // }
};

exports.updateUser = function(req, res) {
    res.status(200).send("TO DO");
};