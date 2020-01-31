import Layout from '../../components/Layout';
import { GetBounty as GetBountyFunc } from '../../library/APIFunctions';
import { withRouter } from 'next/router';
import {ToReadableDateString, GetStatus} from '../../library/common';

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
        
    // This is empty because without it we cannot get the bountyId from query
    static async getInitialProps(){
        return {};
    }

    GetBounty(bountyId){
        this.loaded = false;
        this.loaded = true;
        let bountyPage = this;

        GetBountyFunc(bountyId)
        .then(function(res) {
            bountyPage.setState((state) => { return {bounty: res.data, loaded: true} });
        })
        .catch(function(error) {
           console.log(error);
           bountyPage.setState((state) => { return { loaded: true} });
        });
    }

    render() {
        return (
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>{this.state.bounty.Title}</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        ID: {this.state.bounty.ID} <br />
                        Title: {this.state.bounty.Title }<br />
                        {/* Game: {this.state.bounty.Game.Name }<br /> */}
                        Condition: {this.state.bounty.BountyCondition }<br />
                        Description: {this.state.bounty.Description }<br />
                        Status: {GetStatus(this.state.bounty.Status) }<br />
                        CreatedBy: {this.state.bounty.CreatedBy }<br />
                        CreatedDate: {ToReadableDateString(this.state.bounty.CreatedDate) }<br />
                        ClaimedBy: {this.state.bounty.ClaimedBy }<br />
                        ClaimedDate: {ToReadableDateString(this.state.bounty.ClaimedDate) }<br />
                        UpdatedDateTime: {ToReadableDateString(this.state.bounty.UpdatedDateTime) }<br />
                        TotalAmount: {this.state.bounty.TotalAmount }<br />
                        Contributors: {this.state.bounty.Contributors }<br />
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(BountyPage);