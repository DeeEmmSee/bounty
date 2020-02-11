// MySQL
const sql = require('../models/sql.js');
var Bounty = require('../models/Bounty.js');

const fields = "`bc`.`ID`, `bc`.`BountyID`, `bc`.`UserID`, `bc`.`Amount`, `bc`.`DateAdded`, `bc`.`Paid`, `bc`.`DatePaid`";

class BountyContribution{
    constructor(obj){
        this.ID = obj.ID;
        this.BountyID = obj.BountyID;
        this.UserID = obj.UserID;
        this.Amount = obj.Amount;
        this.Username = obj.Username;
        this.DateAdded = obj.DateAdded;
        this.DatePaid = obj.DatePaid;
        this.Paid = obj.Paid;

        this.Username = obj.Username;
        this.BountyName = obj.BountyName;
        this.BountyStatus = obj.BountyStatus;
        this.BountyClaimedBy = obj.BountyClaimedBy;
    }

    ToDBObject(){
        return {
            "BountyID": this.BountyID,
            "UserID": this.UserID,
            "Amount": this.Amount,
            "DateAdded": this.DateAdded,
            "DatePaid": this.DatePaid,
            "Paid": this.Paid
        }
    }
}


BountyContribution.getBountyContributionByBounty = function(bountyId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT " + fields + ", IFNULL(u.Username, 'Unknown User') as 'Username', IFNULL(b.Title, 'Unknown Bounty') as 'BountyName', b.Status as 'BountyStatus' FROM bountycontributions bc LEFT JOIN users u On bc.UserID = u.ID LEFT JOIN bounties b ON bc.BountyID = b.ID WHERE BountyID = ? ORDER BY DateAdded DESC", bountyId, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var contribs = [];
                for (var i = 0; i < res.length; i++) {
                    contribs.push(new BountyContribution(res[i]));
                }
                success(contribs);
            }
        })
    });
};

BountyContribution.getBountyContributionByUser = function(userId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT " + fields + ", IFNULL(u.Username, 'Unknown User') as 'Username', IFNULL(b.Title, 'Unknown Bounty') as 'BountyName', b.Status as 'BountyStatus', IFNULL(u2.Username, 'N/A') as 'BountyClaimedBy' FROM bountycontributions bc LEFT JOIN users u On bc.UserID = u.ID LEFT JOIN bounties b ON bc.BountyID = b.ID LEFT JOIN users u2 On b.ClaimedBy = u.ID WHERE UserID = ? ORDER BY DateAdded DESC", userId, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var contribs = [];
                for (var i = 0; i < res.length; i++) {
                    contribs.push(new BountyContribution(res[i]));
                }
                success(contribs);
            }
        })
    });
};

BountyContribution.createBountyContribution = function(bountyContribution) {
    return new Promise(function(success, fail) {
        sql.query("INSERT INTO bountycontributions SET ?", bountyContribution.ToDBObject(), function(err, res) {
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

BountyContribution.setBountyContributionAsPaid = function(contribID) {
    return new Promise(function(success, fail) {
        sql.query("UPDATE bountycontributions SET Paid = TRUE, DatePaid = CURRENT_TIMESTAMP WHERE ID = " + contribID, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                success("Success!");
            }
        })
    });
};

module.exports = BountyContribution;