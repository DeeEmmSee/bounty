// MySQL
const sql = require('../models/sql.js');
var Bounty = require('../models/Bounty.js');

class BountyAttempt{
    constructor(obj){
        this.ID = obj.ID;
        this.BountyID = obj.BountyID;
        this.UserID = obj.UserID;
        this.Proof = obj.Proof;
        this.DateAdded = obj.DateAdded;
        this.Confirmed = obj.Confirmed;
    }

    ToDBObject(){
        return {
            "BountyID": this.BountyID,
            "UserID": this.UserID,
            "Proof": this.Proof,
            "DateAdded": this.DateAdded,
            "Confirmed": this.Confirmed,
        }
    }
}

BountyAttempt.getBountyAttemptsByBounty = function(bountyId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT ba.*, IFNULL(u.Username, 'Unknown User') as 'Username' FROM bountyattempts ba LEFT JOIN users u On ba.UserID = u.ID WHERE BountyID = ? ORDER BY DateAdded DESC", bountyId, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var attempts = [];
                for (var i = 0; i < res.length; i++) {
                    attempts.push(new BountyAttempt(res[i]));
                }
                success(attempts);
            }
        })
    });
};

BountyAttempt.getBountyAttemptsByUser = function(userId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT * FROM bountyattempts WHERE UserID = ? ORDER BY DateAdded DESC", userId, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var attempts = [];
                for (var i = 0; i < res.length; i++) {
                    attempts.push(new BountyAttempt(res[i]));
                }
                success(attempts);
            }
        })
    });
};

BountyAttempt.createBountyAttempt = function(bountyAttempt) {
    return new Promise(function(success, fail) {
        sql.query("INSERT INTO bountyattempts SET ?", bountyAttempt.ToDBObject(), function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                success(res.insertId.toString());
            }
        })
    });
};

module.exports = BountyAttempt;