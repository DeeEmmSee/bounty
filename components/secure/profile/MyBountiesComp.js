import {GetBounties} from '../../../library/APIFunctions';
import {ToReadableDateString, GetCookieData} from '../../../library/common';

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
        obj.where = "UserID = " + this.state.currentUserId;
        obj.order = "CreatedDate";
        obj.orderDesc = true;

        GetBounties(obj)
        .then(res => {
            console.log(res.data);
            state.setState({loaded: true, bounties: res.data});
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
        const BountyList = this.state.bounties.map((bounty, key) =>
            <tr style={{cursor: 'pointer'}} key={key} onClick={this.GoToBounty.bind(this, bounty.ID)}>
                <td>{bounty.Title}</td>
                <td>${bounty.TotalAmount}</td>
                <td>{ToReadableDateString(bounty.CreatedDate)}</td>
            </tr>
        );

        return(
            <div>
                <table className="table table-striped table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Current Amount</th>
                            <th>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {BountyList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyBountiesComp;