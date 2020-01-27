import { withRouter } from 'next/router';
import axios from 'axios';

class BountyPage extends React.Component {
    constructor(props){
        super(props);
        this.loaded = false;
        this.bounty = null;

        this.GetBounty(this.props.router.query.bountyId);
    }
    
    GetBounty(bountyId){
        this.loaded = false;
        this.bounty = {'ID': bountyId};
        this.loaded = true;

        
        axios.get('/api/bounties/bounty?bountyId=' + id)
        .then(function(response) {
            //vue_bounty.loaded = true;
            //vue_bounty.bounty = response.data;
        })
        .catch(function(error) {
           console.log(error);
           //vue_bounty.errorMsg = error;
        });
    }

    render() {
        return (
            <div>
                {this.props.router.query.bountyId}
                ID: {this.bounty.ID}
            </div>
        );
    }
}

export default withRouter(BountyPage);