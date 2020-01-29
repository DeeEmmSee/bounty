import Link from 'next/link';
import Cookies from 'universal-cookie';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        const cookies = new Cookies();

        let cookieObj = cookies.get("vgb_token");
        let loggedIn = cookieObj != null && cookieObj != undefined;
        
        let leftItems = [
            {"name": "", "href": "/"}
        ];
        let rightItems = [
            {"name": "", "href": "/"}
        ];

        this.state = {
            loggedIn: loggedIn,
            leftItems: leftItems,
            rightItems: rightItems,
        };
    }

    render() {
        const LeftItems = this.state.leftItems.map(() => {
            <li key={}></li>
        });

        const RightItems = this.state.rightItems.map(() => {
            <li key={}></li>
        });

        return(
           <div className="row" style={{"marginLeft": "-30px", "marginRight": "-30px"}}>
                <div className="col-sm-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">VGB.com</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="navbar-collapse collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link href="/"><a className="nav-link">Home <span className="sr-only">(current)</span></a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/bounties"><a className="nav-link">Bounties</a></Link>
                                </li>
                                { this.state.loggedIn &&
                                   (<li className="nav-item">
                                        <Link href="/create-bounty"><a className="nav-link">Create Bounty</a></Link>
                                    </li>) 
                                }
                            </ul>
                        </div>
                        <div className="text-right">
                            { !this.state.loggedIn &&
                                (<ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link href="/register"><a className="nav-link">Register</a></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/login"><a className="nav-link">Login</a></Link>
                                    </li> 
                                    {/* <li className="nav-item dropdown" v-if="!loggedIn">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Login
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </li> */}
                                </ul>)
                            }
                        </div>
                    </nav>
                </div>
            </div>           
        );
    }
}

// Index.getInitialProps = async function(context){
//     let res = await GetBounty("Guillermo Rauch");
//     let data = await res;

//     /*return {
//         data: data,
//         added: [{ID: 1, Title: Test1, CreatedDate: 2020-01-01, TotalAmount:1}, {ID: 2,Title: Test2, CreatedDate: 2020-01-02, TotalAmount:2}],
//         claimed: [{ID: 4,Title: Test4, CreatedDate: 2020-01-04, TotalAmount:4}, {ID: 3,Title: Test3, CreatedDate: 2020-01-03, TotalAmount:3}]
//     };*/
//     return { data: data };
// };

export default NavBar;