import Layout from '../components/Layout';

class Login extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": center}}>Login</h2>
                    </div>
                </div>
                
            </Layout>
        );
    }
}

export default Login;