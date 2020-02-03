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
            ddlStatus: "1",
            ddlOrderBy: "CreatedDate",
            orderByDesc: "DESC",
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
        this.setState({loaded: false});

        let state = this;

        let obj = {};
        obj.where = this.BuildWhere();
        obj.order = this.state.ddlOrderBy;
        obj.orderDesc = this.state.orderByDesc === "DESC";

        GetBounties(obj)
        .then(res => {
            state.setState({loaded: true, bountyList: res.data});
        })
        .catch(err =>{
            console.log(err);
            state.setState({loaded: true});
        });
        
    }

    BuildWhere(){
        let where = "1=1";
        if (this.state.selectedGame != null && this.state.selectedGame != {} && this.state.selectedGame.ID != undefined && this.state.selectedGame.ID != 'undefined') {
            where += " AND `GameID` = " + this.state.selectedGame.ID;
        }

        if (this.state.txtCreatedDate != null && this.state.txtCreatedDate != "") {
            where += " AND `CreatedDate` = " + this.state.selectedGame.ID;
        }

        if (this.state.txtBountyAmount != null && this.state.txtBountyAmount != "") {
            where += " AND `GameID` = " + this.state.txtBountyAmount;
        }

        if (this.state.txtSearch != null && this.state.txtSearch != "") {
            where += " AND `Title` LIKE '%" + this.state.txtSearch + "%' OR `BountyCondition` LIKE '%" + this.state.txtSearch + "%'";
        }

        if (this.state.ddlStatus != null && this.state.ddlStatus != "") {
            where += " AND `Status` = " + this.state.ddlStatus;
        }

        return where;
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
                            <select className="form-control" name="ddlStatus" defaultValue={this.state.ddlStatus} onChange={this.HandleInputChange}>
                                <option defaultValue value="1">Open</option>
                                <option value="2">Claimed</option>
                                <option value="3">Closed</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Bounty Amount</label>
                            <input type="text" className="form-control" name="txtBountyAmount" value={this.state.txtBountyAmount} onChange={this.HandleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Search</label>
                            <input type="text" className="form-control" name="txtSearch" value={this.state.txtSearch} onChange={this.HandleInputChange}  />
                        </div>
                        <div className="form-group">
                            <label>Order By</label>
                            <select className="form-control" name="ddlOrderBy" defaultValue={this.state.ddlOrderBy} onChange={this.HandleInputChange}>
                                <option defaultValue value="CreatedDate">Created Date</option>
                                <option value="GameID">Game</option>
                                <option value="Status">Status</option>
                                <option value="Amount">Bounty Amount</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <div className="radio">
                                <label>
                                    <input type="radio" name="orderByDesc" value="ASC" checked={this.state.orderByDesc === 'ASC'} onChange={this.HandleInputChange} />
                                    &nbsp;Ascending
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" name="orderByDesc" value="DESC" checked={this.state.orderByDesc === 'DESC'} onChange={this.HandleInputChange} />
                                    &nbsp;Descending
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="form-control" onClick={this.SearchBounties.bind(this)}>Search</button>
                        </div>
                    </div>
                    
                    {
                        this.state.loaded ?
                        <div className="col-sm-9">
                            <div className="row" style={{"marginLeft": "0px"}}>
                                <BountyList items={this.state.bountyList}/>
                            </div>
                        </div> : 
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