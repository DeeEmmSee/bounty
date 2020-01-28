import Layout from '../components/Layout';
import { RegisterUser } from '../library/APIFunctions';

class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            errorMsg: "",
            registerFormSuccess: false,
            registerFormFail: false,
            invalidPassword: false,
            txtUsername: "",
            txtPassword: "",
            txtConfirmPassword: "",
            txtEmail: ""
        };

        this.HandleInputChange = this.HandleInputChange.bind(this);
    }
    
    SubmitRegistration(){
        this.state.invalidPasswordReason = "";
        this.state.invalidPassword = false;
        this.state.registerFormSuccess = false;
        this.state.registerFormFail = false;
        this.state.errorMsg = "";

        if (this.state.txtPassword != this.state.txtConfirmPassword) {
            this.state.registerFormFail = true;
            this.state.errorMsg = "Passwords do not match";
        }
        else if (!this.PasswordValidation()) {
            this.state.invalidPassword = true;
            this.state.registerFormFail = true;
            this.state.errorMsg = "Password does not match criteria";
        }
        else {
            this.state.registerForm = false;

            let reg = this;

            // API call
            var obj = {};
            obj.Username = this.state.txtUsername;
            obj.Password = this.state.txtPassword;
            obj.Email = this.state.txtEmail;
            obj.DateRegistered = new Date();

            RegisterUser(obj)
            .then(function(response) {
                reg.setState((state) => { return {registerFormSuccess: true} });
            })
            .catch(function(error) {
                reg.setState((state) => { return {registerFormFail: true, errorMsg: error} });
            });
        }
    }

    PasswordValidation(){
        if (this.state.txtPassword.length >= 8 && this.state.txtPassword.length <= 128){
            this.setState({invalidPassword: true, invalidPasswordReason: "Password length must be at least 8 characters and less than 128 characters"});
            return false;
        }
        else {
            this.setState({invalidPassword: false, invalidPasswordReason: ""});
            return true;
        }
    }
    
    ResetPage(){
        this.setState({
            invalidPassword: false,
            invalidPasswordReason: "",
            registerFormSuccess: false,
            registerFormFail: false,
            registerForm: true
        });
    }

    HandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name == txtPassword) {
            this.PasswordValidation();
        }

        this.setState({[name]: value});
    }

    render() {
        const SubmitSuccess = (
            <div className="col-sm-12">
                Success! <a href="/login">Please click here to log in</a>
            </div>
        );

        const SubmitFail = (
            <div className="col-sm-12">
                Failed! <a onClick="ResetPage">Click here to try again</a>
                <label style={{"color": "red"}}>{this.state.errorMsg}</label>
            </div>
        );

        return(
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>Register</h2>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-12" v-if="registerForm">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="txtUsername" value={this.state.txtUsername} className="form-control" placeholder="Username" onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="txtPassword" value={this.state.txtPassword} className="form-control" placeholder="Password" onChange={this.handleInputChange} />
                            <span style={{"fontSize": "small"}}>Must be at least 8 characters</span>
                            { this.state.invalidPassword ? <label style={{"color": "red"}}>{{invalidPasswordReason}}</label> : null}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="txtConfirmPassword" value={this.state.txtConfirmPassword} className="form-control" placeholder="Confirm Password" onChange={this.handleInputChange} />
                            { this.state.txtPassword != this.state.txtConfirmPassword ? <label style={{"color": red}}>Passwords do not match</label> : null}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="txtEmail" value={this.state.txtEmail} className="form-control" placeholder="Email" onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group">
                            <button type="text" className="btn btn-primary" onClick={this.SubmitRegistration}>Submit</button>
                        </div>
                    </div>

                   {this.state.registerFormSuccess ? <SubmitSuccess /> : null}
                   {this.state.registerFormFail ? <SubmitFail /> : null}
                    
                </div>
            </Layout>
        );
    }
}

export default Register;