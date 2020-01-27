const express = require('express');
const app = express();
//const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const passport = require('passport');
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

//Site
const htmlPath = path.join(__dirname, '../public/html');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/*app.use('/scripts', express.static(path.join(__dirname, '../public/scripts')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: htmlPath });
});

app.get('/bounties/:bounty', (req, res) => {
	res.sendFile('bounty.html', { root: htmlPath });
});

app.get('/register', (req, res) => {
	res.sendFile('register.html', { root: htmlPath });
});

app.get('/login', (req, res) => {
	res.sendFile('login.html', { root: htmlPath });
});

app.get('/bounties', (req, res) => {
	res.sendFile('bounties.html', { root: htmlPath });
});

app.get('/create-bounty', (req, res) => {
	res.sendFile('newbounty.html', { root: htmlPath });
});*/
	
// Last
app.listen(PORT, function(){
	console.log("Now running on port " + PORT);
});

var opts = {}
//var refreshTokens = {};
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('./models/config.js').jwt_secret;

// Setup JWT options
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
opts.secretOrKey = jwtSecret;

// Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.userId);
})

/*
passport.deserializeUser(function (username, done) {
  done(null, username)
})
*/

passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
	//If the token has expiration, raise unauthorized
  var expirationDate = new Date(jwtPayload.exp * 1000);
  if(expirationDate < new Date()) {
    return done(null, false);
  }
  var user = jwtPayload;
  done(null, user);
}));

// Routes
var routes = require('./routes.js');
routes(app, passport);