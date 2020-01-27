var Game = require("../models/game.js");

export function getAllGames(req, res) {
    Game.getAllGames()
    .then(function(games) {
        res.status(200).send(games);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};