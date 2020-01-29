import Layout from '../components/Layout';
import { RegisterUser } from '../library/APIFunctions';
import RegSubmitSuccess from '../components/RegSubmitSuccess';

class Register extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            errorMsg: "",
            registerForm: true, 
            registerFormSuccess: false,
            invalidPassword: false,
            invalidPasswordReason: "",
            txtUsername: "",
            txtPassword: "",
            txtConfirmPassword: "",
            txtEmail: ""
        };

        this.HandleInputChange = this.HandleInputChange.bind(this);
    }
    
    SubmitRegistration(evt){
        evt.preventDefault();

        this.setState((state) => { return {
            invalidPassword: false,
            invalidPasswordReason: "",
            registerFormSuccess: false,
            errorMsg: ""
        }});

        if (this.state.txtPassword != this.state.txtConfirmPassword) {
            this.setState((state) => { return { errorMsg: "Passwords do not match" }});
        }
        else if (!this.PasswordValidation()) {
            this.setState((state) => { return { errorMsg: "Passwords do not match", invalidPassword: true }});
        }
        else {
            let reg = this;

            // API call
            let obj = {};
            obj.Username = this.state.txtUsername;
            obj.Password = this.state.txtPassword;
            obj.Email = this.state.txtEmail;
            obj.DateRegistered = new Date();

            RegisterUser(obj)
            .then(function(response) {
                reg.setState((state) => { return {
                    registerForm: false, 
                    registerFormSuccess: true,  
                    txtUsername: "",
                    txtPassword: "",
                    txtConfirmPassword: "",
                    txtEmail: ""
                }});
            })
            .catch(function(error) {
                reg.setState((state) => { return {errorMsg: error} });
            });
        }
    }

    PasswordValidation(){
        if (this.state.txtPassword.length < 8 || this.state.txtPassword.length > 128){
            this.setState({invalidPassword: true, invalidPasswordReason: "Password length must be at least 8 characters and less than 128 characters"});
            return false;
        }
        else {
            this.setState({invalidPassword: false, invalidPasswordReason: ""});
            return true;
        }
    }
    
    ResetPage(){
        this.setState((state) => { return {
            invalidPassword: false,
            invalidPasswordReason: "",
            registerFormSuccess: false
        } });
    }

    HandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name == this.state.txtPassword) {
            this.PasswordValidation();
        }

        this.setState({[name]: value});
    }

    render() {

        return(
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>Register</h2>
                    </div>
                </div>
                
                
                <div className="row">
                    <div className="col-sm-12" style={this.state.registerForm ? {"display": "block"} : {"display": "none"}}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="txtUsername" value={this.state.txtUsername} className="form-control" placeholder="Username" onChange={this.HandleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="txtPassword" value={this.state.txtPassword} className="form-control" placeholder="Password" onChange={this.HandleInputChange} />
                            <span style={{"fontSize": "small"}}>Must be at least 8 characters</span>
                            { this.state.invalidPassword ? <label style={{"color": "red"}}>{this.state.invalidPasswordReason}</label> : null}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="txtConfirmPassword" value={this.state.txtConfirmPassword} className="form-control" placeholder="Confirm Password" onChange={this.HandleInputChange} />
                            { this.state.txtPassword != this.state.txtConfirmPassword ? <label style={{"color": "red"}}>Passwords do not match</label> : null}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="txtEmail" value={this.state.txtEmail} className="form-control" placeholder="Email" onChange={this.HandleInputChange} />
                        </div>

                        <div className="form-group">
                            <button type="text" className="btn btn-primary" onClick={this.SubmitRegistration.bind(this)}>Submit</button>
                            <span>{this.state.errorMsg}</span>
                        </div>
                    </div>

                    {this.state.registerFormSuccess ? <RegSubmitSuccess /> : null}
                    
                </div>
            </Layout>
        );
    }
}

export default Register;