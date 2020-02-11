import ProfileOverviewComp from "./profile/ProfileOverviewComp";
import ToDoListComp from "./profile/ToDoListComp";
import MyBountiesComp from "./profile/MyBountiesComp";
import MyAttemptsComp from "./profile/MyAttemptsComp";
import MyContributionsComp from "./profile/MyContributionsComp";
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
                            <li className={this.state.activeSection === "todolist" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "todolist")}>To Do List</li>
                            <li className={this.state.activeSection === "mybounties" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "mybounties")}>My Bounties</li>
                            <li className={this.state.activeSection === "myattempts" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "myattempts")}>My Attempts</li>
                            <li className={this.state.activeSection === "mycontributions" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "mycontributions")}>My Contributions</li>
                            <li className={this.state.activeSection === "preferences" ? "profilemenu active" : "profilemenu"} onClick={this.ChangeSection.bind(this, "preferences")}>Preferences</li>
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        { this.state.activeSection === "profile" && <ProfileOverviewComp /> }
                        { this.state.activeSection === "todolist" && <ToDoListComp /> }
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