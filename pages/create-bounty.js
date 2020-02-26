/*import Link from 'next/link';
import Layout from '../components/Layout';
import GameList from '../components/GameList';
import config from '../library/config';
import { GetCookieData as CookieDataFunc, GetDBDate, IsLoggedIn } from '../library/common';*/

import Layout from '../components/Layout';
import CreateBountyComp from '../components/secure/CreateBountyComp';
import AccessDenied from '../components/AccessDenied';
import { IsLoggedIn } from '../library/common';

class CreateBounty extends React.Component {
    constructor(props){
        super(props);
        let loggedIn = IsLoggedIn();

        this.state = {
            loggedIn: loggedIn
        };

    }

    render(){
        return (
            <Layout>
                {
                    this.state.loggedIn ? <CreateBountyComp /> : <AccessDenied />
                }
            </Layout>
        );
    }
}

export default CreateBounty;