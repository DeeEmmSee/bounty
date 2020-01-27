// MySQL
import sql from '../models/sql.js';

class BountyContribution{
    constructor(obj){
        this.BountyID = obj.BountyID;
        this.UserID = obj.UserID;
        this.Amount = obj.Amount;
    }

    ToDBObject(){
        return {
            "BountyID": this.BountyID,
            "UserID": this.UserID,
            "Amount": this.Amount,
        }
    }
}

BountyContribution.getBountyContributionByBounty = function(bountyId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT * FROM bountycontributions WHERE BountyID = ?", bountyId, function(err, res) {
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
        sql.query("SELECT * FROM bountycontributions WHERE UserID = ?", userId, function(err, res) {
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
        sql.query("INSERT INTO bountycontributions SET ?", bountyContribution, function(err, res) {
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

export default BountyContribution;