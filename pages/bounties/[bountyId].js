import Layout from '../../components/Layout';
import { GetBounty as GetBountyFunc, SaveNewBountyContribution as SaveNewContribFunc } from '../../library/APIFunctions';
import { withRouter } from 'next/router';
import {ToReadableDateString, GetStatus, GetDBDate, GetCookieData} from '../../library/common';

class BountyPage extends React.Component {
    constructor(props){
        super(props);

        let cookieData = GetCookieData();

        this.state = {
            loaded: false,
            bounty: {
                Contributors: []
            },
            errorMsg: "",
            txtContributionAmount: "",
            currentUserId: cookieData.userId
        };

        this.GetBounty(this.props.router.query.bountyId);
    }
        
    // This is empty because without it we cannot get the bountyId from query
    static async getInitialProps(){
        return {"test": "test"};
    }

    GetBounty(bountyId){
        this.state.loaded = false;
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

    HandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    SaveNewContribution() {
        let state = this;
        let contObj = {};
       
        contObj.BountyID = state.state.bounty.ID;
        contObj.UserID = state.state.currentUserId;
        contObj.Amount = Number(state.state.txtContributionAmount);
        contObj.skipBountyCheck = false;
        contObj.DateAdded = GetDBDate();

        SaveNewContribFunc(contObj)
        .then(res => {
            // success
            state.GetBounty(contObj.BountyID);
            state.setState({txtContributionAmount: ""});
        })
        .catch(err => {
            console.log(err);
            state.setState({errorMsg: err});
        });
    }

    render() {
        const Contributors = this.state.bounty.Contributors.map((contrib, key) =>
            <tr key={key}>
                <td>{contrib.Username}</td>
                <td>${contrib.Amount}</td>
            </tr>
        );

        const ContribCheck = function(contributor){
            return contributor.UserID == this;
        };

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
                        CreatedBy: {this.state.bounty.CreatedByUsername }<br />
                        CreatedDate: {ToReadableDateString(this.state.bounty.CreatedDate) }<br />
                        ClaimedBy: {this.state.bounty.ClaimedByUsername }<br />
                        ClaimedDate: {ToReadableDateString(this.state.bounty.ClaimedDate) }<br />
                        UpdatedDateTime: {ToReadableDateString(this.state.bounty.UpdatedDateTime) }<br />
                        TotalAmount: ${this.state.bounty.TotalAmount }<br />
                        
                        <h4>Contributors</h4>
                        { this.state.bounty.Contributors.length > 0 ?
                        <div>
                            <table className="table table-striped table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Contributors}
                                </tbody>
                            </table>

                            {this.state.bounty.AllowContributors && this.state.bounty.Contributors.filter(ContribCheck, this.state.currentUserId).length === 0 && 
                                 <div className="form-group">
                                    <label htmlFor="txtContributionAmount" className="control-label">Amount to Contribute ($) *</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">$</span>
                                        </div>
                                        <input type="text" name="txtContributionAmount" value={this.state.txtContributionAmount} className="form-control" placeholder="0" onChange={this.HandleInputChange.bind(this)}/>
                                    </div>
                                    <p>
                                        By clicking this button you agree to pay the user that successfully claimed this bounty the amount entered in the box above. It is your responsibility to ensure that all payments are made in good time after the bounty has been claimed. 
                                        You will be notified once the bounty has been claimed in order for you to make your payment swiftly.
                                    </p>
                                    <button onClick={this.SaveNewContribution.bind(this)} className="btn btn-primary">Add Contribution</button>
                                </div> 
                            }
                        </div>
                        :
                        <div>
                            No contributors for this bounty
                        </div>
                        }
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(BountyPage);