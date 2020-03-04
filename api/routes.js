module.exports = function(app, passport) {
    var userController = require('./controllers/userController.js');
    var bountyController = require('./controllers/bountyController.js');
    var authController = require('./controllers/authController.js');
    var gameController = require('./controllers/gameController.js');
        
    // API

    // games
    app.route('/api/games/all')
        .get(gameController.getAllGames);

    // bounties
    app.route('/api/bounties/recentlyadded')
        .get(bountyController.getRecentlyAdded);

    app.route('/api/bounties/recentlyclaimed')
        .get(bountyController.getRecentlyClaimed);

    app.route('/api/bounties/featured')
        .get(bountyController.getFeatured);
        
    app.route('/api/bounties/bounty')
        .get([bountyController.getBounty])
        .post([passport.authenticate('jwt'), bountyController.createBounty])
        .patch([passport.authenticate('jwt'), bountyController.updateBounty]);

    app.route('/api/bounties/bounties')
        .post([bountyController.getBounties]);
        
    app.route('/api/bounties/bountycontribution')
        .get([bountyController.getBountyContribution])
        .post([passport.authenticate('jwt'), bountyController.createBountyContribution])
        .patch([passport.authenticate('jwt'), bountyController.setBountyContributionAsPaid, bountyController.checkBountyStatusAfterContribUpdate]);

    app.route('/api/bounties/bountyattempt')
        .get([bountyController.getBountyAttempts])
        .post([passport.authenticate('jwt'), bountyController.isValidBountyAttempt, bountyController.createBountyAttempt])
        .patch([passport.authenticate('jwt'), bountyController.updateBountyAttempt, bountyController.checkBountyStatusAfterAttemptUpdate]);

    app.route('/api/bounties/profilestats')
        .get([passport.authenticate('jwt'), bountyController.getProfileStats]);

    // users
    app.route('/api/users/user')
        .get([passport.authenticate('jwt'), userController.getUser])
        .post([userController.createUser]) // TODO?
        .patch([passport.authenticate('jwt'), userController.updateUser]);
    
    // auth
    app.route('/api/auth/login')
        .post([authController.hasAuthValidFields, authController.isPasswordAndUserMatch, authController.login]);

    app.route('/api/auth/refreshtoken')
        .post([authController.refreshToken]);

    app.route('/api/auth/rejecttoken')
        .post([authController.rejectToken]);

    app.route('/api/auth/tokens')
        .get([authController.getTokens]);
};