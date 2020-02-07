import Link from 'next/link';
import Layout from '../Layout';
import GameList from '../GameList';
import { SaveNewBounty as SaveNewBountyFunc, SaveNewBountyContribution as SaveNewBountyContFunc } from '../../library/APIFunctions';
import config from '../../library/config';
import { GetCookieData as CookieDataFunc, GetDBDate } from '../../library/common';

class CreateBountyComp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            txtName: "",
            selectedGame: null,
            txtRequirement: "",
            txtDescription: "",
            txtContributionAmount: "",
            chkAllowContributors: true,
            errorMsg: "",
            showFormFields: true,
            showSuccess: false,
            newUrl: "",
            disableAllowContributors: true
        };

        this.HandleInputChange = this.HandleInputChange.bind(this);
    }
    
    GameListCallback = game => {
        this.setState({selectedGame: game});
    }

    SaveBounty(evt) {
        evt.preventDefault();
        let state = this;

        if (this.IsValid()) {
            let obj = {};
            let cookieData = CookieDataFunc()

            obj.Title = this.state.txtName;
            obj.GameID = this.state.selectedGame.ID;
            obj.BountyCondition = this.state.txtRequirement;
            obj.Description = this.state.txtDescription;
            obj.AllowContributors = this.state.chkAllowContributors;
            obj.CreatedBy = cookieData.userId; 
            obj.CreatedDate = GetDBDate();
            obj.UpdatedDateTime = obj.createdDate;
            obj.Image = "https://www.w3schools.com/bootstrap4/la.jpg"; // TODO

            SaveNewBountyFunc(obj)
            .then(resp => {
                var contObj = {};
                contObj.BountyID = resp.data;
                contObj.UserID = cookieData.userId;
                contObj.Amount = Number(state.state.txtContributionAmount);
                contObj.skipBountyCheck = true;
                contObj.DateAdded = GetDBDate();
                
                if (contObj.Amount != NaN && contObj.Amount > 0) {
                    // Save contribution
                   this.SaveBountyContrib(state, contObj);
                }
                else {
                    state.setState({showFormFields: false, showSuccess: true, newUrl: config.site_url + "/bounties/" + contObj.BountyID});
                }

            })
            .catch(err => {
                console.log(err);
                state.setState({errorMsg: err});
            });
        }
        else {
            console.log("Not valid");
        }
    }

    SaveBountyContrib(state, contObj) {
        SaveNewBountyContFunc(contObj)
        .then(function(contResponse) {
            state.setState({showFormFields: false, showSuccess: true, newUrl: "/bounties/" + contObj.BountyID});
        })
        .catch(function(error) {
            console.log(error);
            state.setState({errorMsg: error});
        });
    }

    IsValid() {
        this.state.errorMsg = "";
        if (this.state.txtName == "") {
            this.setState({errorMsg: "Please enter a name"});
            return false;
        }
        if (this.state.selectedGame == null) {
            this.setState({errorMsg: "Please enter a game"});
            return false;
        }
        if (this.state.txtRequirement == "") {
            this.setState({errorMsg: "Please enter a requirement"});
            return false;
        }
        /*if (this.txtDescription == "") {
            this.errorMsg = "Please enter a description";
            return false;
        }*/
        if (this.state.txtContributionAmount == "" || isNaN(this.state.txtContributionAmount)) { // || this.txtContributionAmount <= 0
            this.setState({errorMsg: "Please enter a valid contribution amount"});
            return false;
        }

        return true;
    }

    // ContributionAmountChange(evt) {
    //     let amount = Number(this.state.txtContributionAmount);

    //     if (amount == 0){
    //         this.setState({chkAllowContributors: true, disableAllowContributors: true});
    //     }
    //     else {
    //         this.setState({disableAllowContributors: false});
    //     }

    //     this.HandleInputChange(evt);
    // }

    HandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        const Success = () => {
            return (
            <div className="row">
                <div className="col-sm-12">
                    Success! <br />
                    <Link href={this.state.newUrl}><a>Click here to view bounty page</a></Link>
                </div>
            </div>
            );
        };

        return(
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>Create Bounty</h2>
                    </div>
                </div>
               
                {this.state.showFormFields && 
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label>Name *</label>
                                <input type="text" name="txtName" value={this.state.txtName} className="form-control" onChange={this.HandleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label>Game *</label>
                                <GameList selectedCallback={this.GameListCallback}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtRequirement">Requirement *</label>
                                <input type="text" name="txtRequirement" value={this.state.txtRequirement} className="form-control" onChange={this.HandleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtDescription">Description</label>
                                <textarea rows="4" name="txtDescription" value={this.state.txtDescription} className="form-control" onChange={this.HandleInputChange}></textarea>
                            </div> 

                            <hr />

                            <h4>Contributors</h4>

                            <div className="form-group">
                                <label htmlFor="txtContributionAmount" className="control-label">Initial amount to Contribute ($) *</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">$</span>
                                    </div>
                                    <input type="text" name="txtContributionAmount" value={this.state.txtContributionAmount} className="form-control" placeholder="0" onChange={this.HandleInputChange}/>
                                </div>
                            </div>

                            <div className="form-check">
                                <input type="checkbox" name="chkAllowContributors" value={this.state.chkAllowContributors} className="form-check-input" onChange={this.HandleInputChange}/>
                                <label htmlFor="chkAllowContributors">Allow Contributors</label><br />
                                <small>If you don't want anyone else to contribute towards the bounty pot (i.e. a set amount) then leave this box unchecked.</small>
                            </div>

                            <hr />

                            <div className="form-group">
                                <p>
                                    By clicking this button you agree to adjudicating any entries towards this bounty and faithfully determining the first user to submit proof of fulfilling the requirement of this bounty.
                                    You also agree to pay said user the value above once proof has been verified.
                                </p>
                                <button onClick={this.SaveBounty.bind(this)} className="btn btn-primary">Save New Bounty</button>
                                <br />
                                <span style={{"color": "red"}}>{this.state.errorMsg}</span>
                            </div>

                        </div>
                    </div> }

                { this.state.showSuccess ? <Success /> : null }
            </div>
        );
    }
}

export default CreateBountyComp;