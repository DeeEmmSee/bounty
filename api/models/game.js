// MySQL
const sql = require('../models/sql.js');
const fields = "`ID`,`Name`,`Year`,`Console`";

class Game{
    constructor(obj){
        this.ID = obj.ID;
        this.Name = obj.Name;
        this.Year = obj.Year;
        this.Console = obj.Console;
    }

    ToDBObject(){
        return {
            "ID": this.ID,
            "Name": this.Name,
            "Year": this.Year,
            "Console": this.Console,
        };
    }
}

Game.getAllGames = function() {
    return new Promise(function(success, fail) {
        sql.query("SELECT " + fields + " FROM games", function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var results = [];
                for (var i = 0; i < res.length; i++) {
                    results.push(new Game(res[i]));
                }
                success(results);
            }
        });
    });
};

Game.getGameById = function(ID) {
    return new Promise(function(success, fail) {
        sql.query("SELECT " + fields + " FROM games WHERE ID = ?", ID, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                if (res.length != 0) {
                    var game = new Game(res[0]);
                    success(game);
                }
                else {
                    fail("No game found for id " + ID, null);
                }
            }
        });
    });
}
module.exports = Game;