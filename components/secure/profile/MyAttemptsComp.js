import Link from 'next/link';
import {ToReadableDateString, GetCookieData, GetAttemptStatus} from '../../../library/common';

class MyAttemptsComp extends React.Component {
    constructor(props){
        super(props);
        let cookieData = GetCookieData();

        this.state = {
            attempts: [],
            currentUserId: cookieData.userId,
            loaded: false,
            api: api
        };

        this.GetAttempts(true);
    }
    
    GetAttempts(initial) {
        if (!initial) {
            this.setState({loaded: false});        
        }

        let state = this;

        this.props.api.GetBountyAttemptsByUser(this.state.currentUserId)
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
            <tr key={key}>
                <td>{attempt.BountyName}</td>
                <td><Link href={attempt.Proof}><a>{attempt.Proof}</a></Link></td>
                <td>{ToReadableDateString(attempt.DateAdded)}</td>
                <td>{GetAttemptStatus(attempt.StatusID)}</td>
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
                                <th>Status</th>
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