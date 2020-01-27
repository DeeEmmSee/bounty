//import React from 'react';
import Link from 'next/link';

class RecentlyClaimed extends React.Component {
    constructor(props){
        super(props);
        this.items = [];
        this.loaded = false;
        
        this.GetBounties();
    }

    GetBounties(){
        this.loaded = false;
        // TODO
        this.items = [{'ID': '4','Title': 'Test4', 'CreatedDate': '2020-01-04', 'TotalAmount':'4'}, {'ID': '3','Title': 'Test3', 'CreatedDate': '2020-01-03', 'TotalAmount':'3'}];
        this.loaded = true;
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

export default RecentlyClaimed;