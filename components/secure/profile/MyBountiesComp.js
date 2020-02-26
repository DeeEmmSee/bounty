import {ToReadableDateString, GetCookieData, GetBountyStatus} from '../../../library/common';

class MyBountiesComp extends React.Component {
    constructor(props){
        super(props);
        let cookieData = GetCookieData();

        this.state = {
            bounties: [],
            currentUserId: cookieData.userId,
            loaded: false
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
        obj.order = "CreatedDate";
        obj.orderDesc = true;

        this.props.api.GetBounties(obj)
        .then(res => {
            state.setState({loaded: true, bounties: res.data});

            // Update ProfileComp stats
            this.props.UpdateProfileStats();
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
    }

    GoToBounty(bountyId){
        window.location.href = '/bounties/' + bountyId;
    }

    render() {
        const BountyListOpen = this.state.bounties.filter(b => { return b.Status === 1; }).sort((a, b) => { return b.CreatedDate > a.CreatedDate ? 1 : -1; }).map((bounty, key) =>
            <tr style={{cursor: 'pointer'}} key={key} onClick={this.GoToBounty.bind(this, bounty.ID)}>
                <td>{bounty.Title}</td>
                <td>${bounty.TotalAmount}</td>
                <td>{ToReadableDateString(bounty.CreatedDate)}</td>
                <td>{bounty.Attempts.filter(ba => { return ba.StatusID === 0 }).length}</td>
            </tr>
        );

        const BountyListClaimed = this.state.bounties.filter(b => { return b.Status === 2; }).sort((a, b) => { return b.ClaimedDate > a.ClaimedDate ? 1 : -1; }).map((bounty, key) =>
            <tr style={{cursor: 'pointer'}} key={key} onClick={this.GoToBounty.bind(this, bounty.ID)}>
                <td>{bounty.Title}</td>
                <td>${bounty.TotalAmount}</td>
                <td>{ToReadableDateString(bounty.CreatedDate)}</td>
                <td>{bounty.ClaimedByUsername}</td>
                <td>{ToReadableDateString(bounty.ClaimedDate)}</td>
                <td>{bounty.Contributors.filter(c => !c.Paid).length}</td>
            </tr>
        );

        const BountyListClosed = this.state.bounties.filter(b => { return b.Status === 3; }).sort((a, b) => { return b.CreatedDate > a.CreatedDate ? 1 : -1; }).map((bounty, key) =>
            <tr style={{cursor: 'pointer'}} key={key} onClick={this.GoToBounty.bind(this, bounty.ID)}>
                <td>{bounty.Title}</td>
                <td>${bounty.TotalAmount}</td>
                <td>{ToReadableDateString(bounty.CreatedDate)}</td>
                <td>{bounty.ClaimedByUsername}</td>
                <td>{ToReadableDateString(bounty.ClaimedDate)}</td>
            </tr>
        );

        return(
            <div>
                <h4>Open</h4>
                {this.state.bounties.filter(b => { return b.Status === 1}).length > 0 ? <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Current Amount</th>
                            <th>Created Date</th>
                            <th>Outstanding Attempts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BountyListOpen}
                    </tbody>
                </table> : <span>No bounties found!</span>}

                <hr />

                <h4>Claimed</h4>
                {this.state.bounties.filter(b => { return b.Status === 2}).length > 0 ? <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Current Amount</th>
                            <th>Created Date</th>
                            <th>Claimed By</th>
                            <th>Claimed Date</th>
                            <th>Contributions to Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BountyListClaimed}
                    </tbody>
                </table> : <span>No bounties found!</span>}

                <hr />

                <h4>Closed</h4>
                {this.state.bounties.filter(b => { return b.Status === 3}).length > 0 ? <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Current Amount</th>
                            <th>Created Date</th>
                            <th>Claimed By</th>
                            <th>Claimed Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BountyListClosed}
                    </tbody>
                </table> : <span>No bounties found!</span>}


            </div>
        );
    }
}

export default MyBountiesComp;