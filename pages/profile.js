import Layout from '../components/Layout';
import ProfileComp from '../components/secure/ProfileComp';
import AccessDenied from '../components/AccessDenied';
import {IsLoggedIn} from '../library/common';

class Profile extends React.Component {
    constructor(props){
        super(props);
        let loggedIn = IsLoggedIn();

        this.state = {
            loggedIn: loggedIn
        };

    }
    
    render() {
        return(
            <Layout>
                {
                    this.state.loggedIn ? <ProfileComp /> : <AccessDenied />
                }
            </Layout>
        );
    }
}

export default Profile;