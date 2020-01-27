// MySQL
import sql from '../models/sql.js';
import BountyContribution from '../models/BountyContribution.js';

class Bounty {
    constructor(obj){
        this.ID = obj.ID;
        this.Title = obj.Title;
        this.GameID = obj.GameID;
        this.BountyCondition = obj.BountyCondition;
        this.Description = obj.Description;
        this.Image = "https://www.w3schools.com/bootstrap4/la.jpg"; //obj.image;
        this.AllowContributors = obj.AllowContributors;
        this.Status = obj.Status;
        this.CreatedBy = obj.CreatedBy;
        this.CreatedDate = obj.CreatedDate;
        this.ClaimedBy = obj.ClaimedBy;
        this.ClaimedDate = obj.ClaimedDate;
        this.UpdatedDateTime = obj.UpdatedDateTime;
    
        // Calculated
        this.TotalAmount = 0;
        this.Contributors = [];
    }

    SetContributors(contribs){
        this.Contributors = contribs;
        var amount = 0;

        for (var i = 0; i < contribs.length; i++) {
            amount += this.Contributors[i].Amount;
        }
        this.TotalAmount = amount;
    }

    ToDBObject(){
        return {
            "ID": this.ID,
            "Title": this.Title,
            "GameID": this.GameID,
            "BountyCondition": this.BountyCondition,
            "Description": this.Description,
            "Image": this.Image,
            "AllowContributors": this.AllowContributors,
            "Status": this.Status,
            "CreatedBy": this.CreatedBy,
            "CreatedDate": this.CreatedDate,
            "ClaimedBy": this.ClaimedBy,
            "ClaimedDate": this.ClaimedDate,
            "UpdatedDateTime": this.UpdatedDateTime
        };
    }
}
/*var Bounty = function(obj) {
    this.ID = obj.id;
    this.Title = obj.title;
    this.GameID = obj.gameId;
    this.BountyCondition = obj.condition;
    this.Description = obj.description;
    this.Image = "https://www.w3schools.com/bootstrap4/la.jpg"; //obj.image;
    this.AllowContributors = obj.allowContributors;
    this.Status = obj.status;
    this.CreatedBy = obj.createdBy;
    this.CreatedDate = obj.createdDate;
    this.ClaimedBy = obj.claimedBy;
    this.ClaimedDate = obj.claimedDate;
    this.UpdatedDateTime = obj.updatedDateTime;

    // Calculated
    //this.TotalAmount = "";
    this.Contributors = [];
}*/

Bounty.getBounties = function(where, order, orderDesc, limit) {
    return new Promise(function(success, fail) {
        var query = "SELECT * FROM bounties";

        if (where != "" && where != null){ query += " WHERE " + where; }
        if (order != "" && order != null){ query += " ORDER BY " + order; }
        query += orderDesc ? " DESC" : "";
        if (limit != "" && limit != null){ query += " LIMIT " + limit; }

        sql.query(query, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                var bounties = [];
                var promises = [];
                
                // Get Contributors
                for (var i = 0; i < res.length; i++) {
                    var bounty = new Bounty(res[i]);
                    bounties.push(bounty);
                    
                    var promise = BountyContribution.getBountyContributionByBounty(bounty.ID);
                    promises.push(promise);
                }
                
                if (promises.length > 0) {
                    Promise.all(promises)
                    .then(function(vals){
                        for (var i = 0; i < vals.length; i++){
                            bounties[i].SetContributors(vals[i]);
                        }
                        //console.log(bounties);
                        success(bounties);
                    })
                    .catch(function(err){
                        console.log(err);
                        fail(err);
                    });
                }
                else {
                    success(bounties);
                }
            }
        })
    });
}

Bounty.getBounty = function(bountyId) {
    return new Promise(function(success, fail) {
        sql.query("SELECT * FROM bounties WHERE ID = ?", bountyId, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                // Get Contributors
                if (res.length != 0) {
                    var bounty = new Bounty(res[0]);
                    BountyContribution.getBountyContributionByBounty(res[0].ID)
                    .then(function(cons){
                        bounty.SetContributors(cons);
                        success(bounty);
                    })
                    .catch(function(err) {
                        console.log(err);
                        fail(err, null);
                    });
                }
                else {
                    fail("No bounty found for id " + bountyId, null);
                }
            }
        })
    });
}


Bounty.createBounty = function(bounty) {
    return new Promise(function(success, fail) {
        sql.query("INSERT INTO bounties SET ?", bounty.ToDBObject(), function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                success(res.insertId.toString());
            }
        })
    });
}

Bounty.updateBounty = function(bounty) {
    return new Promise(function(success, fail) {
        sql.query("UPDATE bounties SET ? WHERE ID = ?", [bounty.ToDBObject(), bounty.ID], function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                success(res.insertId.toString());
            }
        })
    });
}

export default Bounty;