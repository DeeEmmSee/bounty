import {GetBounties, UpdateBountyAttempt} from '../../../library/APIFunctions';
import {ToReadableDateString, GetCookieData, GetBountyStatus} from '../../../library/common';

class PendingAttemptsComp extends React.Component {
    constructor(props){
        super(props);
        let cookieData = GetCookieData();

        this.state = {
            bounties: [],
            selectedBounty: {
                Attempts: []
            },
            currentUserId: cookieData.userId,
            loaded: false,
            initialValue: true
        };

        this.GetBounties(true);
    }
    
    GetBounties(initial, selectedBountyID) {
        if (!initial) {
            this.setState({loaded: false});        
        }

        let state = this;

        let obj = {};
        obj.where = "b.CreatedBy = " + this.state.currentUserId;
        obj.order = "Title";
        obj.orderDesc = false;

        GetBounties(obj)
        .then(res => {
            state.setState({loaded: true, bounties: res.data});

            if (selectedBountyID !== undefined) {
                state.SetSelectedBounty(selectedBountyID);
            }

            // Update ProfileComp stats
            this.props.UpdateProfileStats();
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
    }

    SelectedBounty(evt) {
        if (evt.target.value !== undefined && evt.target.value !== "undefined" && evt.target.value !== "" && evt.target.value !== "-- Please select --") {
            this.SetSelectedBounty(evt.target.value);
        }
        else {
            this.setState({initialValue: true});
        }
    }

    SetSelectedBounty(id) {
        let bounty = this.state.bounties.find(b => { return b.ID == id}); // Needs to be 2x '=' because casting

        if (bounty !== undefined && bounty !== 'undefined') {
            // If attempts are oustanding then set active bounty
            if (bounty.Attempts.filter(ba => { return ba.StatusID === 0; }).length > 0) {
                this.setState({selectedBounty: bounty, initialValue: false});
            }
            else {
                this.setState({selectedBounty: { Attempts: [] }, initialValue: false});
            }
        }
    }

    UpdateAttempt(AttemptID, StatusID, BountyID){
        let state = this;

        UpdateBountyAttempt(AttemptID, StatusID, BountyID)
        .then(res => {
            // Update Bounties then set selected bounty
            this.GetBounties(false, BountyID);
        })
        .catch(err => {
            console.log(err);
            state.setState({loaded: true});
        });
    }

    render() {
        const BountyOptions = this.state.bounties.filter(b => { return b.Status === 1 && b.Attempts.filter(ba => { return ba.StatusID === 0; }).length; }).map((bounty, key) => 
            <option key={key} value={bounty.ID}>{bounty.Title} ({bounty.Attempts.filter(ba => { return ba.StatusID === 0; }).length})</option>
        );

        const LatestBountyAttempt = this.state.selectedBounty.Attempts.filter(ba => { return ba.StatusID === 0; }).sort((a, b) => { return a.DateAdded > b.DateAdded ? 1 : -1; }).map((ba, key) => 
        <div key={key} className="row">
            {key === 0 &&
                <div className="col-sm-12">
                    {ba.Username} <br />
                    {ba.Proof} <br />
                    {ToReadableDateString(ba.DateAdded)} <br />
                    <button className="btn btn-success" onClick={this.UpdateAttempt.bind(this, ba.ID, 1, ba.BountyID)}>Approve</button>
                    <button className="btn btn-danger" onClick={this.UpdateAttempt.bind(this, ba.ID, -1, ba.BountyID)}>Reject</button>
                </div> 
            }
        </div>
    );


        return(
            <div>
                <div className="form-group">
                    {this.state.bounties.filter(b => { return b.Status === 1 && b.Attempts.filter(ba => { return ba.StatusID === 0; }).length; }).length > 0 ?
                    <select className="form-control" onChange={this.SelectedBounty.bind(this)}>
                        <option>-- Please select --</option>
                        {BountyOptions}
                    </select> : <span>All pending attempts have been actioned! :)</span>
                    }
                </div>


                { !this.state.initialValue && 
                    <div>
                        <h4>{this.state.selectedBounty.Title}</h4>

                        {this.state.selectedBounty.Attempts.filter(ba => { return ba.StatusID === 0; }).length > 0 ? LatestBountyAttempt : null }
                        
                        {/* <ul>
                            {BountyAttempts}
                        </ul> */}
                    </div>
                }
            </div>
        );
    }
}

export default PendingAttemptsComp;