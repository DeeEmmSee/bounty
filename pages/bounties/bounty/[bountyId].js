import { withRouter } from 'next/router';
import axios from 'axios';

class BountyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            bounty: null,
            errorMsg: ""
        };
        let router = withRouter();
        
        this.GetBounty(router.query.bountyId);
    }
        
    getInitialProps(){
        return {"test": null};
    }

    GetBounty(bountyId){
        this.loaded = false;
        this.loaded = true;
        let bountyPage = this;
        
        console.log(this.props.router.query.bountyId);
        console.log(bountyId);

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
                ID: {this.bounty.ID}
                Title: {this.bounty.Title}
            </div>
        );
    }
}

export default withRouter(BountyPage);