//import React from 'react';
import Link from 'next/link';
import { GetRecentlyAdded as RecentlyAddedFunc } from '../library/APIFunctions';

class RecentlyAdded extends React.Component {
    constructor(props){
        super(props);
        this.items = [];
        this.loaded = false;

        this.GetBounties();
        
    }
    GetBounties(){
        this.loaded = false;
        //this.items = [{'ID': '1', 'Title': 'Test1', 'CreatedDate': '2020-01-01', 'TotalAmount':'1'}, {'ID': '2','Title': 'Test2', 'CreatedDate': '2020-01-02', 'TotalAmount':'2'}];
        //this.loaded = true;

        RecentlyAddedFunc()
        .then(data => {
            this.items = data;
            this.loaded = true;
        })
        .catch(err => {
            console.log(err);
            this.loaded = true;
        })
    }
    render() {
        const latestBounties = this.items.map((bounty, key) =>
        <tr style={{cursor: 'pointer'}} key={key}>
                <td><Link href={'/bounties/bounty/' + bounty.ID}><a>{bounty.Title}</a></Link></td>
                <td><Link href={'/bounties/bounty/' + bounty.ID}><a>${bounty.TotalAmount}</a></Link></td>
                <td><Link href={'/bounties/bounty/' + bounty.ID}><a>{bounty.CreatedDate}</a></Link></td>
            </tr>
        );

       const tableStruct = (
            this.items.length > 0 ? <table className="table table-striped table-hover">
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
               { this.loaded ? tableStruct : <span>Loading...</span> }
             </div>
        );
    }
}

export default RecentlyAdded;