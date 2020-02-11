import {GetBountyAttemptsByUser} from '../../../library/APIFunctions';
import {ToReadableDateString, GetCookieData} from '../../../library/common';

class MyAttemptsComp extends React.Component {
    constructor(props){
        super(props);
        let cookieData = GetCookieData();

        this.state = {
            attempts: [],
            currentUserId: cookieData.userId,
            loaded: false
        };

        this.GetAttempts(true);
    }
    
    GetAttempts(initial) {
        if (!initial) {
            this.setState({loaded: false});        
        }

        let state = this;

        GetBountyAttemptsByUser(this.state.currentUserId)
        .then(res => {
            state.setState({loaded: true, attempts: res.data});
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
    }

    render() {
        const AttemptsList = this.state.attempts.map((attempt, key) =>
            <tr style={{cursor: 'pointer'}} key={key}>
                <td>{attempt.BountyName}</td>
                <td>{attempt.Proof}</td>
                <td>{ToReadableDateString(attempt.DateAdded)}</td>
            </tr>
        );
        
        return(
            <div>
                <div>
                    <table className="table table-striped table-hover">
                        <thead className="thead-light">
                            <tr>
                                <th>Bounty</th>
                                <th>Proof</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AttemptsList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MyAttemptsComp;