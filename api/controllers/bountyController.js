var Bounty = require("../models/bounty.js");
var BountyContribution = require("../models/bountycontribution.js");
var BountyAttempt = require("../models/bountyattempt.js");

function GetLimit(defaultValue, newValue) {
    if (newValue != 'undefined' && newValue != undefined && newValue != NaN){
        return newValue;
    }
    else {
        return defaultValue;
    }
}
exports.getRecentlyAdded = function(req, res) {
    let limit = GetLimit(3, req.query.limit);
    
    Bounty.getBounties("1=1", "`CreatedDate`", true, limit)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

exports.getRecentlyClaimed = function(req, res) {
    let limit = GetLimit(3, req.query.limit);
    
    Bounty.getBounties("1=1 AND IFNULL(`ClaimedDate`, '') != ''", "`ClaimedDate`", true, limit)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

exports.getFeatured = function(req, res) {
    let limit = GetLimit(5, req.query.limit);
    
    Bounty.getBounties("Featured = 1", "`CreatedDate`", false, limit)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

exports.getBounties = function(req, res) {
    let limit = GetLimit(100, req.query.limit); // TODO: infinite scrolling + limiting

    let where = "";
    let order = "";
    let orderDesc = false;

    if (req.body.where !== undefined && req.body.where !== 'undefined'){
        where = req.body.where;
    }

    if (req.body.order !== undefined && req.body.order !== 'undefined'){
        order = req.body.order;
    }

    if (req.body.orderDesc !== undefined && req.body.orderDesc !== 'undefined'){
        orderDesc = req.body.orderDesc;
    }

    Bounty.getBounties(where, order, orderDesc, limit)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

exports.getBounty = function(req, res) {
    Bounty.getBounty(req.query.bountyId)
    .then(function(bounty) {
        res.status(200).send(bounty);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

exports.createBounty = function(req, res) {
    var bounty = new Bounty(req.body);
    bounty.Status = 1; // Open

    Bounty.createBounty(bounty)
    .then(function(bountyId) {
        res.status(200).send(bountyId);
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send(err);
    });
};

exports.updateBounty = function(req, res) {
    var bounty = new Bounty(req.body);

    Bounty.updateBounty(bounty)
    .then(function(bountyId) {
        res.status(200).send(bountyId);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

exports.createBountyContribution = function(req, res) {
    var bountyContribution = new BountyContribution(req.body);

    // Check bounty
    if (req.body.skipBountyCheck){
        BountyContribution.createBountyContribution(bountyContribution)
        .then(function(bountycontribution) {
            res.status(200).send(bountycontribution);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
    }
    else {
        Bounty.getBounty(bountyContribution.BountyID)
        .then(function(bountyRes) {
            if (bountyRes !== null && bountyRes.ID != 'undefined' && bountyRes.ID != undefined) {
                if (bountyRes.AllowContributors){
                    BountyContribution.createBountyContribution(bountyContribution)
                    .then(function(bountycontribution) {
                        res.status(200).send(bountycontribution);
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.status(500).send(err);
                    });
                }
                else {
                    res.status(500).send("Bounty does not support extra contributors");
                }
            }
            else {
                res.status(500).send("No bounty found");
            }
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send(err);
        });  
    } 
};


exports.getBountyContribution = function(req, res) {
    if (req.body.type == "bounty") {
        BountyContribution.getBountyContributionByBounty(req.body.id)
        .then(function(bountycontribution) {
            res.status(200).send(bountycontribution);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
    }
    else if (req.body.type == "user") {
        BountyContribution.getBountyContributionByUser(req.body.id)
        .then(function(bountycontribution) {
            res.status(200).send(bountycontribution);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
    }
};

exports.isValidBountyAttempt = function(req, res, next) {
    Bounty.getBounty(req.body.BountyID)
    .then(function(bounty) {
        if (bounty.CreatedBy !== req.body.UserID) {
            BountyAttempt.getBountyAttemptsByUser(req.body.UserID)
            .then(function(attempts){
                if (bounty.MaxAttempts === 0 || attempts.length < bounty.MaxAttempts) {
                    next();
                }
                else {
                    res.status(400).send("Invalid bounty attempt (Too many attempts)");
                }
            })
            .catch(function (err) {
                res.status(400).send("Invalid bounty attempt (catch getting attempts)");
            });
        }
        else {
            res.status(400).send("Invalid bounty attempt (Bounty was created by same user attempting)");
        }
    })
    .catch (function(err) {
        res.status(400).send("Invalid bounty attempt (catch getting bounty)");
    });
};

exports.createBountyAttempt = function(req, res) {
    var bountyAttempt = new BountyAttempt(req.body);
    bountyAttempt.Confirmed = false;
    
    BountyAttempt.createBountyAttempt(bountyAttempt)
    .then(function(bountyAttemptId) {
        res.status(200).send(bountyAttemptId);
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send(err);
    });
};

exports.getBountyAttempts = function(req, res) {
    if (req.query.type == "bounty") {
        BountyAttempt.getBountyAttemptsByBounty(req.query.id)
        .then(function(attempts) {
            res.status(200).send(attempts);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
    }
    else if (req.query.type == "user") {
        BountyAttempt.getBountyAttemptsByUser(req.query.id)
        .then(function(attempts) {
            res.status(200).send(attempts);
        })
        .catch(function(err) {
            res.status(500).send(err);
        });
    }
    else {

    }
};