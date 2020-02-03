import Layout from '../components/Layout';
import GameList from '../components/GameList';
import {GetBounties} from '../library/APIFunctions';
import {ToReadableDateString} from '../library/common';

class Bounties extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loaded: false,
            selectedGame: {},
            txtCreatedDate: "",
            txtBountyAmount: "",
            txtSearch: "",
            bountyList: []
        };

        this.HandleInputChange = this.HandleInputChange.bind(this);
        this.SearchBounties();
    }
    
    HandleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    SearchBounties() {
        let state = this;

        let obj = {};

        GetBounties(obj)
        .then(res => {
            state.setState({loaded: true, bountyList: res.data});
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
        
    }
    
    GameListCallback = game => {
        this.setState({selectedGame: game});
    }

    GoToBounty(bountyId){
        window.location.href = '/bounties/' + bountyId;
    }

    render() {
        const BountyList = ({items}) => (
            <div className="row" style={{"marginLeft": "0px"}}>
                {
                    items.map((bounty, key) =>
                    <div className="col-sm-3 bounty" key={key}>
                        <h3 style={{"textAlign": "center"}}>{bounty.Title}</h3>
                        <div>
                            Game: {bounty.Game.Name}
                        </div>
                        <div>
                            Bounty: ${bounty.TotalAmount} <br />
                            {bounty.Contributors.length} contributor{bounty.Contributors.length != 1 ? 's' : ''}
                        </div>
                        <div>
                            Created {ToReadableDateString(bounty.CreatedDate)}
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={this.GoToBounty.bind(this, bounty.ID)}>More Info</button>
                        </div>
                    </div>
                    )
                }
            </div>
        );

        return(
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>Bounty List</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-3" style={{"backgroundColor": "aquamarine", "padding": "15px"}}>
                        <h4>Filters</h4>
                        <div className="form-group">
                            <label>Game</label>
                            <GameList selectedCallback={this.GameListCallback}/>
                        </div>
                        <div className="form-group">
                            <label>Created Date</label>
                            <input type="text" className="form-control" name="txtCreatedDate" value={this.state.txtCreatedDate} onChange={this.HandleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <input type="text" className="form-control" name="txtStatus" value={this.state.txtStatus} onChange={this.HandleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Bounty Amount</label>
                            <input type="text" className="form-control" name="txtBountyAmount" value={this.state.txtBountyAmount} onChange={this.HandleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Search</label>
                            <input type="text" className="form-control" name="txtSearch" value={this.state.txtSearch}onChange={this.HandleInputChange}  />
                        </div>
                        <div className="form-group">
                            <button className="form-control" onClick={this.SearchBounties.bind(this)}>Search</button>
                        </div>
                    </div>
                    {
                        this.state.loaded && 
                        <div className="col-sm-9">
                            <div className="row" style={{"marginLeft": "0px"}}>
                                <BountyList items={this.state.bountyList}/>
                            </div>
                        </div>
                    }

                    {
                        !this.state.loaded && 
                        <div className="col-sm-9">
                            <div className="col-sm-12" style={{"textAlign": "center"}}>
                                <span>Loading...</span>
                            </div>
                        </div>
                    }
                                        
                </div>
                
            </Layout>
        );
    }
}

export default Bounties;