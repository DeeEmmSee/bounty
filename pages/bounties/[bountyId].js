import { withRouter } from 'next/router';
import axios from 'axios';

class BountyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            bounty: {},
            errorMsg: ""
        };

        this.GetBounty(this.props.router.query.bountyId);
    }
        
    /*static async getInitialProps(){
        return {};
    }*/

    GetBounty(bountyId){
        this.loaded = false;
        this.loaded = true;
        let bountyPage = this;

        axios.get('/api/bounties/bounty?bountyId=' + bountyId)
        .then(function(response) {
            bountyPage.setState((state) => { return {bounty: res.data, loaded: true} });
        })
        .catch(function(error) {
           //console.log(error);
           bountyPage.setState((state) => { return { loaded: true} });
        });
    }

    render() {
        return (
            <div>
                {this.props.router.query.bountyId}
                ID: {this.state.bounty.ID}
                Title: {this.state.bounty.Title}
            </div>
        );
    }
}

export default withRouter(BountyPage);