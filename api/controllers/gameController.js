var Game = require("../models/game.js");

exports.getAllGames = function(req, res) {
    Game.getAllGames()
    .then(function(games) {
        res.status(200).send(games);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};