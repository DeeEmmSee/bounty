// MySQL
const sql = require('../models/sql.js');

const fields = "`bc`.`ID`, `bc`.`BountyID`, `bc`.`UserID`, `bc`.`Amount`, `bc`.`DateAdded`, `bc`.`Paid`, `bc`.`DatePaid`";

class BountyContribution{
    constructor(obj){
        this.BountyID = obj.BountyID;
        this.UserID = obj.UserID;
        this.Amount = obj.Amount;
        this.Username = obj.Username;
        this.DateAdded = obj.DateAdded;
        this.DatePaid = obj.DatePaid;
        this.Paid = obj.Paid;

        this.Username = obj.Username;
        this.BountyName = obj.BountyName;
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
        sql.query("SELECT " + fields + ", IFNULL(u.Username, 'Unknown User') as 'Username', IFNULL(b.Title, 'Unknown Bounty') as 'BountyName' FROM bountycontributions bc LEFT JOIN users u On bc.UserID = u.ID LEFT JOIN bounties b ON bc.BountyID = b.ID WHERE BountyID = ? ORDER BY DateAdded DESC", bountyId, function(err, res) {
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
        sql.query("SELECT " + fields + ", IFNULL(u.Username, 'Unknown User') as 'Username', IFNULL(b.Title, 'Unknown Bounty') as 'BountyName' FROM bountycontributions bc LEFT JOIN users u On bc.UserID = u.ID LEFT JOIN bounties b ON bc.BountyID = b.ID WHERE UserID = ? ORDER BY DateAdded DESC", userId, function(err, res) {
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

module.exports = BountyContribution;