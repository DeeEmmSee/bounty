import ProfileOverviewComp from "./profile/ProfileOverviewComp";
import PendingAttemptsComp from "./profile/PendingAttemptsComp";
import MyBountiesComp from "./profile/MyBountiesComp";
import MyAttemptsComp from "./profile/MyAttemptsComp";
import MyContributionsComp from "./profile/MyContributionsComp";
import PreferencesComp from "./profile/PreferencesComp";
import {GetProfileStats} from '../../library/APIFunctions';
import {GetCookieData} from '../../library/common';

class ProfileComp extends React.Component {
    constructor(props){
        super(props);
        let cookieData = GetCookieData();

        this.state = {
            activeSection: "profile",
            pendingAttempts: 0,
            myBounties: 0,
            myAttempts: 0,
            myContributions: 0,
            currentUserId: cookieData.userId,
            testShow: false
        };

        //if (props.section !== undefined && props.section !== 'undefined') {
        //    this.state.activeSection = props.section;
        //}

        this.PopulateStats = this.PopulateStats.bind(this);

        this.PopulateStats();
    }
    
    PopulateStats() {
        GetProfileStats(this.state.currentUserId)
        .then(res => {
            this.setState({pendingAttempts: res.data.pendingAttempts, myBounties: res.data.myBounties, myAttempts: res.data.myAttempts, myContributions: res.data.myContributions});
        })
        .catch(err => {
            console.log(err);
        });

        // pendingAttempts - where Status = 0
        // myBounties - where StatusID = 1 OR 2
        // myAttempts - where Status = 0
        // myContributions - where Paid = FALSE AND Bounty.StatusID = 2

    }

    ChangeSection(newSection){
        this.setState({activeSection: newSection});
    }

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <ul style={{"listStyle": "none"}}>
                            <li className={this.state.activeSection === "profile" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "profile")}>Profile</li>
                            <li className={this.state.activeSection === "pendingattempts" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "pendingattempts")}>Pending Attempts ({this.state.pendingAttempts})</li>
                            <li className={this.state.activeSection === "mybounties" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "mybounties")}>My Bounties ({this.state.myBounties})</li>
                            <li className={this.state.activeSection === "myattempts" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "myattempts")}>My Attempts ({this.state.myAttempts})</li>
                            <li className={this.state.activeSection === "mycontributions" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "mycontributions")}>My Contributions ({this.state.myContributions})</li>
                            <li className={this.state.activeSection === "preferences" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "preferences")}>Preferences</li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        { this.state.activeSection === "profile" && <ProfileOverviewComp /> }
                        { this.state.activeSection === "pendingattempts" && <PendingAttemptsComp UpdateProfileStats={this.PopulateStats} /> }
                        { this.state.activeSection === "mybounties" && <MyBountiesComp /> }
                        { this.state.activeSection === "myattempts" && <MyAttemptsComp /> }
                        { this.state.activeSection === "mycontributions" && <MyContributionsComp /> }
                        { this.state.activeSection === "preferences" && <PreferencesComp /> }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileComp;