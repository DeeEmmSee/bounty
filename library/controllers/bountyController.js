var Bounty = require("../models/bounty.js");
var BountyContribution = require("../models/bountycontribution.js");

export function getRecentlyAdded(req, res) {
    Bounty.getBounties("1=1", "`CreatedDate`", true, 3)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

export function getRecentlyClaimed(req, res) {
    Bounty.getBounties("1=1 AND IFNULL(`ClaimedDate`, '') != ''", "`ClaimedDate`", true, 3)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

export function getFeatured(req, res) {
    Bounty.getBounties("Featured = 1", "`CreatedDate`", false, 5)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

export function getBounties(req, res) {
    Bounty.getBounties("", "", false, 10)
    .then(function(bounties) {
        res.status(200).send(bounties);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

export function getBounty(req, res) {
    Bounty.getBounty(req.query.bountyId)
    .then(function(bounty) {
        res.status(200).send(bounty);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

export function createBounty (req, res) {
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

export function updateBounty (req, res) {
    var bounty = new Bounty(req.body);

    Bounty.updateBounty(bounty)
    .then(function(bountyId) {
        res.status(200).send(bountyId);
    })
    .catch(function(err) {
        res.status(500).send(err);
    });
};

export function createBountyContribution (req, res) {
    var bountyContribution = new BountyContribution(req.body);
    //console.log(bountyContribution);

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
            if (bountyRes.length == 1) {
                if (bountyRes[0].AllowContributors){
                    BountyContribution.createBountyContribution(bountyContribution)
                    .then(function(bountycontribution) {
                        res.status(200).send(bountycontribution);
                    })
                    .catch(function(err) {
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
            res.status(500).send(err);
        });  
    } 
};


export function getBountyContribution(req, res) {
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