// MySQL
const sql = require('../models/sql.js');
var BountyContribution = require('../models/BountyContribution.js');
var Game = require('../models/Game.js');

class Bounty {
    constructor(obj){
        this.ID = obj.ID;
        this.Title = obj.Title;
        this.GameID = obj.GameID;
        this.BountyCondition = obj.BountyCondition;
        this.Description = obj.Description;
        this.Image = obj.Image;
        this.AllowContributors = obj.AllowContributors;
        this.Status = obj.Status;
        this.CreatedBy = obj.CreatedBy;
        this.CreatedDate = obj.CreatedDate;
        this.ClaimedBy = obj.ClaimedBy;
        this.ClaimedDate = obj.ClaimedDate;
        this.UpdatedDateTime = obj.UpdatedDateTime;
    
        // Calculated
        this.TotalAmount = obj.TotalAmount;
        this.Contributors = [];
        this.Game = {};
        this.CreatedByUsername = obj.CreatedByUsername;
        this.ClaimedByUsername = obj.ClaimedByUsername;
    }

    SetGame(game){
        this.GameID = game.ID;
        this.Game = game;
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
        var query = "SELECT b.`ID`, b.`GameID`, b.`Title`, b.`BountyCondition`, b.`Description`, b.`Image`, b.`Status`, b.`AllowContributors`, b.`Featured`, b.`CreatedBy`, b.`CreatedDate`, b.`ClaimedBy`, b.`ClaimedDate`, b.`UpdatedDateTime`, IFNULL(u.`Username`, 'N/A') as 'CreatedByUsername', IFNULL(u2.`Username`, 'N/A') as 'ClaimedByUsername', IFNULL(SUM(bc.`Amount`), 0) as 'TotalAmount' FROM bounties b LEFT JOIN users u ON b.CreatedBy = u.ID LEFT JOIN users u2 ON b.ClaimedBy = u.ID LEFT JOIN bountycontributions bc ON b.ID = bc.BountyID";

        if (where != "" && where != null){ query += " WHERE " + where; }

        query += " GROUP BY b.`ID`, b.`GameID`, b.`Title`, b.`BountyCondition`, b.`Description`, b.`Image`, b.`Status`, b.`AllowContributors`, b.`Featured`, b.`CreatedBy`, b.`CreatedDate`, b.`ClaimedBy`, b.`ClaimedDate`, b.`UpdatedDateTime`, IFNULL(u.`Username`, 'N/A'), IFNULL(u2.`Username`, 'N/A')";

        if (order != "" && order != null){ query += " ORDER BY " + order; query += orderDesc ? " DESC" : ""; }
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
                    
                    var bc = BountyContribution.getBountyContributionByBounty(bounty.ID);
                    promises.push(bc);

                    var game = Game.getGameById(bounty.GameID);
                    promises.push(game);
                }
                
                if (promises.length > 0) {
                    Promise.all(promises)
                    .then(function(vals){
                        let bountyCount = 0;

                        for (var i = 0; i < vals.length; i++){
                            if (i % 2 == 0) { // Even, contribs
                                bounties[bountyCount].SetContributors(vals[i]);
                            }
                            else {
                                bounties[bountyCount].SetGame(vals[i]);
                                bountyCount++;
                            }
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
        sql.query("SELECT b.*, IFNULL(u.Username, 'N/A') as 'CreatedByUsername', IFNULL(u2.Username, 'N/A') as 'ClaimedByUsername' FROM bounties b LEFT JOIN users u ON b.CreatedBy = u.ID LEFT JOIN users u2 ON b.ClaimedBy = u.ID WHERE b.ID = ?", bountyId, function(err, res) {
            if (err) {
                console.log(err);
                fail(err);
            }
            else {
                // Get Contributors
                if (res.length != 0) {
                    var bounty = new Bounty(res[0]);
                    var promises = [];

                    var bc = BountyContribution.getBountyContributionByBounty(bounty.ID);
                    promises.push(bc);

                    var game = Game.getGameById(bounty.GameID);
                    promises.push(game);

                    Promise.all(promises)
                    .then(function(vals){
                        for (var i = 0; i < vals.length; i++){
                            if (i % 2 == 0) { // Even, contribs
                                bounty.SetContributors(vals[i]);
                            }
                            else {
                                bounty.SetGame(vals[i]);
                            }
                        }

                        success(bounty);
                    })
                    .catch(function(err){
                        console.log(err);
                        fail(err);
                    });
                }
                else {
                    fail("No bounty found for id " + bountyId);
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

module.exports = Bounty;