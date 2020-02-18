//import React from 'react';
import Link from 'next/link';
import {ToReadableDateString} from '../library/common';

class RecentlyAdded extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            loaded: false
        };

        this.GetBounties();
    }
    GetBounties(){
        this.state.loaded = false;
        let ra = this;

        this.props.api.GetRecentlyAdded()
        .then(res => {
            ra.setState((state) => { return {items: res.data, loaded: true} });
        })
        .catch(err => {
            console.log(err);
            ra.setState({loaded: true});
        });
    }
    GoToBounty(bountyId){
        window.location.href = '/bounties/' + bountyId;
    }
    render() {
        const latestBounties = this.state.items.map((bounty, key) =>
            <tr style={{cursor: 'pointer'}} key={key} onClick={this.GoToBounty.bind(this, bounty.ID)}>
                <td>{bounty.Title}</td>
                <td>${bounty.TotalAmount}</td>
                <td>{ToReadableDateString(bounty.CreatedDate)}</td>
            </tr>
        );

       const tableStruct = (
            this.state.items.length > 0 ? <table className="table table-striped table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>Bounty</th>
                        <th>Added On</th>
                    </tr>
                </thead>
                <tbody>
                    {latestBounties}
                </tbody>
            </table> : <span>No bounties available!</span>
        );
        
        return (
            <div>
               { this.state.loaded ? tableStruct : <span>Loading...</span> }
             </div>
        );
    }
}

export default RecentlyAdded;