import Layout from '../../components/Layout';
import { GetUser as GetUserFunc } from '../../library/APIFunctions';
import { withRouter } from 'next/router';
import {ToReadableDateString, GetStatus, GetDBDate, GetCookieData} from '../../library/common';

class ProfilePage extends React.Component {
    constructor(props){
        super(props);

        let cookieData = GetCookieData();

        this.state = {
            loaded: false,
            user: {}
        };

        this.GetUser(this.props.router.query.profile);
    }
        
    // This is empty because without it we cannot get the bountyId from query
    static async getInitialProps(){
        return {"test": "test"};
    }

    GetUser(profileId){
        this.state.loaded = false;
        let profilePage = this;

        GetUserFunc(profileId)
        .then(function(res) {
            profilePage.setState((state) => { return {user: res.data, loaded: true} });
        })
        .catch(function(error) {
           console.log(error);
           profilePage.setState((state) => { return { loaded: true} });
        });
    }

    render() {
        return (
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>{this.state.user.Username}</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                       
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(ProfilePage);