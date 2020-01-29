import Layout from '../components/Layout';
import Cookies from 'universal-cookie';
import { Login as LoginFunc } from '../library/APIFunctions';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            txtEmail: "",
            txtPassword: "",
        };

        this.HandleInputChange = this.HandleInputChange.bind(this);
    }
    
    SubmitLogin(){
        this.setState({"errorMsg": ""});
        
        let obj = {};
        obj.email = this.state.txtEmail;
        obj.password = this.state.txtPassword;

        LoginFunc(obj)
        .then(function(response) {
            // Cookie
            const cookies = new Cookies();
            let curDate = new Date();
            curDate.setDate(curDate.getDate() + 1);
            
            cookies.set("vgb_token", response.data.accessToken, { "expires": curDate });

            // redirect
            window.location.href = "/";
        })
        .catch(function(error) {
            console.log(error);
            this.setState({"errorMsg": error});
        });
    }

    HandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        return(
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>Login</h2>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="txtEmail" className="form-control" value={this.state.txtEmail} onChange={this.HandleInputChange}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="txtPassword" className="form-control"  value={this.state.txtPassword} onChange={this.HandleInputChange}/>
                        </div>

                        <div className="form-group">
                            <button type="text" className="btn btn-primary" onClick={this.SubmitLogin.bind(this)}>Submit</button>
                            <span>{this.errorMsg}</span>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Login;