import {GetBounties} from '../../../library/APIFunctions';
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
    
    GetBounties(initial) {
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
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
    }

    SelectedBounty(evt) {
        if (evt.target.value !== undefined && evt.target.value !== "undefined" && evt.target.value !== "" && evt.target.value !== "-- Please select --") {
            let bounty = this.state.bounties.find(b => { return b.ID == evt.target.value}); // Needs to be 2x '=' because casting

            if (bounty !== undefined && bounty !== 'undefined') {
                this.setState({selectedBounty: bounty, initialValue: false});
            }
        }
        else {
            this.setState({initialValue: true});
        }
    }

    render() {
        const BountyOptions = this.state.bounties.filter(b => { return b.Status === 1 && b.Attempts.filter(ba => { return ba.StatusID === 0; }).length; }).map((bounty, key) => 
            <option key={key} value={bounty.ID}>{bounty.Title} ({bounty.Attempts.filter(ba => { return ba.StatusID === 0; }).length})</option>
        );

        const BountyAttempts = this.state.selectedBounty.Attempts.filter(ba => { return ba.StatusID === 0; }).sort((a, b) => { return b.DateAdded > a.DateAdded ? 1 : -1; }).map((ba, key) => 
            <li key={key}>{ba.UserID}</li>
        );


        return(
            <div>
                <div className="form-group">
                    <select className="form-control" onChange={this.SelectedBounty.bind(this)}>
                        <option>-- Please select --</option>
                        {BountyOptions}
                    </select>
                </div>


                { !this.state.initialValue && 
                    <div>
                        <h4>{this.state.selectedBounty.Title}</h4>

                        <ul>
                            {BountyAttempts}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

export default PendingAttemptsComp;