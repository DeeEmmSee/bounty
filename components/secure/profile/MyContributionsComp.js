import {GetBountyContributionsByUser} from '../../../library/APIFunctions';
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
            console.log(res.data);
            state.setState({loaded: true, contributions: res.data});
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
    }

    render() {
        const ContributionList = this.state.contributions.map((contrib, key) =>
            <tr style={{cursor: 'pointer'}} key={key}>
                <td>{contrib.BountyName}</td>
                <td>${contrib.Amount}</td>
                <td>{ToReadableDateString(contrib.DateAdded)}</td>
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