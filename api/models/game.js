// MySQL
const sql = require('../models/sql.js');

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
        sql.query("SELECT * FROM games", function(err, res) {
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

module.exports = Game;