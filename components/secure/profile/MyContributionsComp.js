import {GetBountyContributionsByUser, SetBountyContributionAsPaid} from '../../../library/APIFunctions';
import {ToReadableDateString, GetCookieData, GetBountyStatus} from '../../../library/common';

class MyContributionsComp extends React.Component {
    constructor(props){
        super(props);
        let cookieData = GetCookieData();

        this.state = {
            contributions: [],
            currentUserId: cookieData.userId,
            loaded: false
        };

        this.GetContributions(true);
    }
    
    GetContributions(initial) {
        if (!initial) {
            this.setState({loaded: false});        
        }

        let state = this;

        GetBountyContributionsByUser(this.state.currentUserId)
        .then(res => {
            state.setState({loaded: true, contributions: res.data});
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
    }

    SetAsPaid(contrib){
        let state = this;
        state.setState({loaded: false});

        if (confirm("By clicking OK you are agreed that $" + contrib.Amount + " has successfully been paid to " + contrib.BountyClaimedBy + " and that this contribution can be closed")) {
            SetBountyContributionAsPaid(contrib.ID, contrib.BountyID)
            .then(res => {
                state.GetContributions(false);
            })
            .catch(err => {
                console.log(err);
                state.setState({loaded: true});
            });
        }
    }

    render() {
        const ContributionListToPay = this.state.contributions.filter(contrib => { return contrib.BountyStatus === 2 && !contrib.Paid}).map((contrib, key) =>
            <tr key={key}>
                <td>{contrib.BountyName}</td>
                <td>${contrib.Amount}</td>
                <td>{ToReadableDateString(contrib.DateAdded)}</td>
                <td>{contrib.BountyClaimedBy}</td>
                <td>{!contrib.Paid && contrib.BountyStatus == 2 ? <button className="btn btn-primary" onClick={this.SetAsPaid.bind(this, contrib)}>Mark as Paid</button> : ToReadableDateString(contrib.DatePaid) }</td>
            </tr>
        );
        
        const ContributionListOpen = this.state.contributions.filter(contrib => { return contrib.BountyStatus === 1 && !contrib.Paid} ).map((contrib, key) =>
            <tr key={key}>
                <td>{contrib.BountyName}</td>
                <td>${contrib.Amount}</td>
                <td>{ToReadableDateString(contrib.DateAdded)}</td>
            </tr>
        );
        
        const ContributionListClosed = this.state.contributions.filter(contrib => { return contrib.Paid} ).sort((a, b) => { return b.DatePaid > a.DatePaid ? 1 : -1 }).map((contrib, key) =>
            <tr key={key}>
                <td>{contrib.BountyName}</td>
                <td>${contrib.Amount}</td>
                <td>{ToReadableDateString(contrib.DateAdded)}</td>
                <td>{contrib.BountyClaimedBy}</td>
                <td>{ToReadableDateString(contrib.DatePaid)}</td>
            </tr>
        );

        return(
            <div>
                <h4>To Pay</h4>
                {this.state.contributions.filter(contrib => { return contrib.BountyStatus === 2 && !contrib.Paid}).length > 0 ? <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Bounty</th>
                            <th>Amount</th>
                            <th>Date Added</th>
                            <th>Payee</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ContributionListToPay}
                    </tbody>
                </table> : <span>No bounties to pay!</span>}

                <hr />

                <h4>Submitted</h4>
                {this.state.contributions.filter(contrib => { return contrib.BountyStatus === 1 && !contrib.Paid} ).length > 0 ?<table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Bounty</th>
                            <th>Amount</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ContributionListOpen}
                    </tbody>
                </table> : <span>No contributions submitted</span>}

                <hr />

                <h4>Closed</h4>
                {this.state.contributions.filter(contrib => { return contrib.Paid} ).length > 0 ? <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Bounty</th>
                            <th>Amount</th>
                            <th>Date Added</th>
                            <th>Payee</th>
                            <th>Date Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ContributionListClosed}
                    </tbody>
                </table> : <span>No contributions found!</span>}
            </div>
        );
    }
}

export default MyContributionsComp;