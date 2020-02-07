import ProfileOverviewComp from "./profile/ProfileOverviewComp";
import MyBountiesComp from "./profile/MyBountiesComp";
import MySubmissionsComp from "./profile/MySubmissionsComp";
import PreferencesComp from "./profile/PreferencesComp";

class ProfileComp extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            activeSection: "profile"
        };

        //if (props.section !== undefined && props.section !== 'undefined') {
        //    this.state.activeSection = props.section;
        //}
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
                            <li className={this.state.activeSection === "mybounties" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "mybounties")}>My Bounties</li>
                            <li className={this.state.activeSection === "mysubmissions" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "mysubmissions")}>My Submissions</li>
                            <li className={this.state.activeSection === "preferences" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "preferences")}>Preferences</li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        { this.state.activeSection === "profile" && <ProfileOverviewComp /> }
                        { this.state.activeSection === "mybounties" && <MyBountiesComp /> }
                        { this.state.activeSection === "mysubmissions" && <MySubmissionsComp /> }
                        { this.state.activeSection === "preferences" && <PreferencesComp /> }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileComp;