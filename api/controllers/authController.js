const User = require("../models/user.js");
const crypto = require('crypto');
const config = require('../models/config.js');
const jwtSecret = config.jwt_secret;
const timeout = config.expiry_length;
const jwt = require('jsonwebtoken');
//const uuid = require('uuid');

var refreshTokens = {};

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    User.getUserByEmail(req.body.email)
        .then((user)=> {
            if(!user) {
                res.status(404).send({error: 'No user found for those credentials'});
            }
            else {
                let passwordFields = user.Password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user.ID,
                        email: user.Email,
                        name: user.Username,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        });
};

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        var token = jwt.sign(req.body, jwtSecret, { expiresIn: timeout });
        let b = Buffer.from(hash); //new Buffer(hash);
        let refreshToken = b.toString('base64');
        
        refreshTokens[refreshToken] = req.body.userId;

        // Set access token into cookies
        //res.cookie("token", token, {expire: Date.now() + timeout}) // 7 days

        res.status(201).send({accessToken: token, refreshToken: refreshToken, userId: req.body.userId});
    } catch (err) {
        console.log(err);
        res.status(500).send({errors: err});
    }
};

exports.getTokens = (req, res) => {
    res.status(201).send(refreshTokens);
}

exports.refreshToken = () => {
    var refreshToken = req.body.refreshToken;
    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == username)) {
        User.getUserByEmail(req.body.email)
        .then((user)=> {
            var body = {
                userId: user.ID,
                email: user.Email,
                name: user.Username,
            };
            var token = jwt.sign(body, jwtSecret, { expiresIn: timeout });
            res.json({newToken: token});
        });
    }
    else {
        res.send(401);
    }
}

exports.rejectToken = (req, res) => {
    var refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) { 
      delete refreshTokens[refreshToken];
    } 
    res.send(204);
};

/*exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash); //new Buffer(hash);
        let refresh_token = b.toString('base64');
        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};




exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = new Buffer(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + jwtSecret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


exports.validJWTNeeded = (req, res, next) => {
    return next(); // DEBUG ONLY

    // if (req.headers['authorization']) {
    //     try {
    //         let authorization = req.headers['authorization'].split(' ');
    //         if (authorization[0] !== 'Bearer') {
    //             return res.status(401).send({error: 'Invalid header'});
    //         } else {
    //             req.jwt = jwt.verify(authorization[1], jwtSecret);
    //             return next();
    //         }

    //     } catch (err) {
    //         return res.status(403).send({error: 'Unknown error'});
    //     }
    // } else {
    //     return res.status(401).send({error: 'No auth header'});
    // }
};*/