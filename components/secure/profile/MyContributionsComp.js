import {GetBountyContributionsByUser, SetBountyContributionAsPaid} from '../../../library/APIFunctions';
import {ToReadableDateString, GetCookieData} from '../../../library/common';

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

    SetAsPaid(contribID, amount, claimedUser){
        let state = this;
        state.setState({loaded: false});

        if (confirm("By clicking OK you are agreed that $" + amount + " has successfully been paid to " + claimedUser + " and that this contribution can be closed")) {
            SetBountyContributionAsPaid(contribID)
            .then(res => {
                console.log(res.data);
                state.GetContributions(false);
            })
            .catch(err => {
                console.log(err);
                state.setState({loaded: true});
            });
        }
    }

    render() {
        const ContributionList = this.state.contributions.map((contrib, key) =>
            <tr key={key}>
                <td>{contrib.BountyName}</td>
                <td>${contrib.Amount}</td>
                <td>{ToReadableDateString(contrib.DateAdded)}</td>
                <td>{contrib.Paid ? "Yes" : "No"}</td>
                <td>{!contrib.Paid && <button className="btn btn-primary" onClick={this.SetAsPaid.bind(this, contrib.ID, contrib.Amount, contrib.BountyName)}>Mark as Paid</button>}</td>
            </tr>
        );
        
        return(
            <div>
                <div>
                    <table className="table table-striped table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>Bounty</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Paid</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ContributionList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MyContributionsComp;