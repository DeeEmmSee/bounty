// MySQL
const sql = require('../models/sql.js');
var Bounty = require('../models/Bounty.js');

const fields = "`ba`.`ID`, `ba`.`UserID`, `ba`.`BountyID`, `ba`.`Proof`, `ba`.`DateAdded`, `ba`.`StatusID`";
class BountyAttempt{
    constructor(obj){
        this.ID = obj.ID;
        this.BountyID = obj.BountyID;
        this.UserID = obj.UserID;
        this.Proof = obj.Proof;
        this.DateAdded = obj.DateAdded;
        this.StatusID = obj.StatusID;

        this.Username = obj.Username;
        this.BountyName = obj.BountyName;
    }

    ToDBObject(){
        return {
            "BountyID": this.BountyID,
            "UserID": this.UserID,
            "Proof": this.Proof,
            "DateAdded": this.DateAdded,
            "StatusID": this.StatusID,
        }
    }
}

BountyAttempt.getConfirmedBountyAttempt = function(bountyId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT " + fields + ", IFNULL(u.Username, 'Unknown User') as 'Username', IFNULL(b.Title, 'Unknown Bounty') as 'BountyName' FROM bountyattempts ba LEFT JOIN users u On ba.UserID = u.ID LEFT JOIN bounties b ON ba.BountyID = b.ID WHERE ba.BountyID = ? AND StatusID = 1 ORDER BY DateAdded DESC LIMIT 1", bountyId, function(err, res) {
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

BountyAttempt.getBountyAttemptsByBounty = function(bountyId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT " + fields + ", IFNULL(u.Username, 'Unknown User') as 'Username', IFNULL(b.Title, 'Unknown Bounty') as 'BountyName' FROM bountyattempts ba LEFT JOIN users u On ba.UserID = u.ID LEFT JOIN bounties b ON ba.BountyID = b.ID WHERE BountyID = ? ORDER BY DateAdded DESC", bountyId, function(err, res) {
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
        sql.query("SELECT " + fields + ", IFNULL(u.Username, 'Unknown User') as 'Username', IFNULL(b.Title, 'Unknown Bounty') as 'BountyName' FROM bountyattempts ba LEFT JOIN users u On ba.UserID = u.ID LEFT JOIN bounties b ON ba.BountyID = b.ID WHERE UserID = ? ORDER BY DateAdded DESC", userId, function(err, res) {
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