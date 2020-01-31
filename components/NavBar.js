import Link from 'next/link';
import Cookies from 'universal-cookie';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        const cookies = new Cookies();

        let cookieObj = cookies.get("vgb_token");
        let loggedIn = cookieObj != null && cookieObj != undefined;

        let li = [
            {"name": "Home", "href": "/", "class": "nav-item active", "active": false},
            {"name": "Bounties", "href": "/bounties", "class": "nav-item", "active": false}
        ];
        let ri = [
            {"name": "Register", "href": "/register", "class": "nav-item", "active": false},
            {"name": "Login", "href": "/login", "class": "nav-item", "active": false}
        ];

        // check cookie
        if (loggedIn) {
            li.push({"name": "Create Bounty", "href": "/create-bounty", "class": "nav-item", "active": false});

            ri = [{"name": "Profile", "href": "/profile", "class": "nav-item", "active": false}];
        }

        // Set active
        let item = li.find((i) => {
            return i.href === props.page;
        });

        if (item !== undefined) {
            li[li.indexOf(item)].active = true;
        }
        else {
            item = ri.find((i) => {
                return i.href === props.page;
            });

            if (item !== undefined) {
                ri[ri.indexOf(item)].active = true;
            }
        }
       
        this.state = {
            loggedIn: loggedIn,
            left: li,
            right: ri
        };
    }


    render() {
        const List = ({items}) => (
            <ul className="navbar-nav mr-auto">
                {
                    items.map((item, key) =>
                        <li key={key} className={item.active ? 'nav-item active' : 'nav-item'}>
                            <Link href={item.href}><a className="nav-link">{item.name}{item.active && <span className="sr-only">(current)</span>}</a></Link>
                        </li>
                    )
                }
            </ul>
        );

        return (
            <div className="row" style={{"marginLeft": "-30px", "marginRight": "-30px"}}>
                <div className="col-sm-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="/">VGB.com</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="navbar-collapse collapse" id="navbarSupportedContent">
                            <List items={this.state.left} />
                        </div>
                        <div className="text-right">
                            <List items={this.state.right} />
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