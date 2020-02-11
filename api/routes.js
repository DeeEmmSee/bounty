module.exports = function(app, passport) {
    var userController = require('./controllers/userController.js');
    var bountyController = require('./controllers/bountyController.js');
    var authController = require('./controllers/authController.js');
    var gameController = require('./controllers/gameController.js');
        
    // API
    app.route('/api/bounties/recentlyadded')
        .get(bountyController.getRecentlyAdded);

    app.route('/api/bounties/recentlyclaimed')
        .get(bountyController.getRecentlyClaimed);

    app.route('/api/bounties/featured')
        .get(bountyController.getFeatured);
    
    app.route('/api/games/all')
        .get(gameController.getAllGames);

    app.route('/api/bounties/bounty')
        //.get([passport.authenticate('jwt'), bountyController.getBounty])
        .get([bountyController.getBounty])
        //.post([passport.authenticate('jwt'), bountyController.createBounty])
        .post([bountyController.createBounty])
        .patch([passport.authenticate('jwt'), bountyController.updateBounty]);
        //.put([passport.authenticate('jwt'), bountyController.updateBounty]);

    app.route('/api/bounties/bounties')
        .post([bountyController.getBounties]);
        //.post([passport.authenticate('jwt'), bountyController.getBounties]);
        
    app.route('/api/bounties/bountycontribution')
        .get([bountyController.getBountyContribution])
        //.post([passport.authenticate('jwt'), bountyController.createBountyContribution]);
        .post([bountyController.createBountyContribution]);

    app.route('/api/bounties/bountyattempt')
        .get([bountyController.getBountyAttempts])
        .post([bountyController.isValidBountyAttempt, bountyController.createBountyAttempt]);

    app.route('/api/users/user')
        //.get([passport.authenticate('jwt'), userController.getUser])
        .get([userController.getUser])
        .post([userController.createUser])//.post([passport.authenticate('jwt'), userController.createUser])
        .patch([passport.authenticate('jwt'), userController.updateUser]);
        //.put([passport.authenticate('jwt'), userController.updateUser]);

    // app.route('/api/bounties/bounty')
    //     .get([authController.validJWTNeeded, bountyController.getBounty])
    //     .post([authController.validJWTNeeded, bountyController.createBounty])
    //     .put([authController.validJWTNeeded, bountyController.updateBounty]);

    // app.route('/api/users/user')
    //     .get([authController.validJWTNeeded, userController.getUser])
    //     .post([authController.validJWTNeeded, userController.createUser])
    //     .put([authController.validJWTNeeded, userController.updateUser]);
        
    app.route('/api/auth/login')
        .post([
            authController.hasAuthValidFields,
            authController.isPasswordAndUserMatch,
            authController.login
        ]);

    app.route('/api/auth/refreshtoken')
        .post([
            authController.refreshToken
        ]);

    app.route('/api/auth/rejecttoken')
        .post([
            authController.rejectToken
        ]);

    app.route('/api/auth/tokens')
        .get([
            authController.getTokens
        ]);

    // app.route('/api/auth/refresh')
    //     .post([
    //         authController.validJWTNeeded,
    //         authController.verifyRefreshBodyField,
    //         authController.validRefreshNeeded,
    //         authController.login
    //     ]);

    // app.post('/api/:leaderboard', (req, res) => {

    // });

    // todoList Routes
    /*app.route('/tasks')
      .get(todoList.list_all_tasks)
      .post(todoList.create_a_task);
     
     app.route('/tasks/:taskId')
      .get(todoList.read_a_task)
      .put(todoList.update_a_task)
      .delete(todoList.delete_a_task);*/
};