import Layout from '../../components/Layout';
import { withRouter } from 'next/router';
import {ToReadableDateString, GetDBDate, GetCookieData, GetAPIFunctions} from '../../library/common';


class ProfilePage extends React.Component {
    constructor(props){
        super(props);

        let cookieData = GetCookieData();
        let api = GetAPIFunctions();

        this.state = {
            loaded: false,
            user: {},
            api: api
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

        this.state.api.GetUser(profileId)
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