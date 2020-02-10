import Layout from '../../components/Layout';
import { GetBounty as GetBountyFunc, SaveNewBountyContribution as SaveNewContribFunc, SaveNewAttempt as SaveNewAttemptFunc } from '../../library/APIFunctions';
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
            currentUserId: cookieData.userId,
            txtAttemptProof: "",
            errorMsgSubmitAttempt: "",
            errorMsgContribution: ""
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
        this.setState({errorMsgContribution: ""});

        let state = this;
        let contObj = {};
       
        contObj.BountyID = state.state.bounty.ID;
        contObj.UserID = state.state.currentUserId;
        contObj.Amount = Number(state.state.txtContributionAmount);
        contObj.skipBountyCheck = false;
        contObj.DateAdded = GetDBDate();

        if (contObj.Amount <= 0) {
            state.setState({errorMsgContribution: "Please enter a valid amount"});
        }
        else {
            SaveNewContribFunc(contObj)
            .then(res => {
                // success
                state.GetBounty(contObj.BountyID);
                state.setState({txtContributionAmount: ""});
                $("#newContributorModal").modal('hide');
            })
            .catch(err => {
                console.log(err);
                state.setState({errorMsg: err});
            });
        }
        
    }

    SaveNewAttempt() {
        this.setState({errorMsgSubmitAttempt: ""});

        console.log(this.state.bounty.UserID);
        console.log(this.state.currentUserId);

        let urlProof = this.state.txtAttemptProof.toLowerCase();

        if (urlProof == "" || (urlProof.indexOf("youtube.com") < 0 && urlProof.indexOf("twitch.tv") < 0 )) {
            this.setState({errorMsgSubmitAttempt: "Please enter a valid URL"});
            return;
        }
        else if (this.state.bounty.CreatedBy == this.state.currentUserId) {
            this.setState({errorMsgSubmitAttempt: "You cannot submit proof for a bounty that was created by yourself"});
            return;
        }

        let state = this;
        let obj = {};
       
        obj.BountyID = state.state.bounty.ID;
        obj.UserID = state.state.currentUserId;
        obj.Proof = state.state.txtAttemptProof;
        obj.DateAdded = GetDBDate();

        SaveNewAttemptFunc(obj)
        .then(res => {
            // success
            state.setState({txtAttemptProof: "", errorMsgSubmitAttempt: "Attempt submitted successfully!"});
            $("#newAttemptModal").modal('hide');
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
                        
                        <br />

                        <h4>Attempts</h4>
                        {
                            this.state.bounty.Status == 1 && <a href="#" data-toggle="modal" data-target="#newAttemptModal">Click here to submit an attempt</a>
                        }
                        
                        <div className="modal fade" id="newAttemptModal" tabIndex="-1" role="dialog" aria-labelledby="newAttemptModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="newAttemptModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Link to proof (Must be a valid Youtube/Twitch URL)</label><br />
                                                <input type="text" name="txtAttemptProof" value={this.state.txtAttemptProof} className="form-control" placeholder="" onChange={this.HandleInputChange.bind(this)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={this.SaveNewAttempt.bind(this)} className="btn btn-primary">Submit</button><br />
                                        <span style={{"color": "red"}}>{this.state.errorMsgSubmitAttempt}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />
                        <br />

                       
                        <h4>Contributors</h4>
                        { 
                            this.state.bounty.AllowContributors && this.state.bounty.Contributors.filter(ContribCheck, this.state.currentUserId).length === 0 && <a href="#" data-toggle="modal" data-target="#newContributorModal">Click here to add a contribution</a>
                        }

                        <div className="modal fade" id="newContributorModal" tabIndex="-1" role="dialog" aria-labelledby="newContributorModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="newContributorModalLabel">Modal title</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
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
                                            
                                        </div> 
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={this.SaveNewContribution.bind(this)} className="btn btn-primary">Add Contribution</button>
                                        <span style={{"color": "red"}}>{this.state.errorMsgContribution}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

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