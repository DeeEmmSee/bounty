import { GetFeatured as FeaturedFunc} from '../library/APIFunctions';

class Carousel extends React.Component {
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

        FeaturedFunc()
        .then(res => {
            ra.setState((state) => { return {items: res.data, loaded: true} });
        })
        .catch(err => {
            console.log(err);
            ra.setState({loaded: true});
        });
    }
    render() {
        // const latestBounties = this.state.items.map((bounty, key) =>
        // <tr style={{cursor: 'pointer'}} key={key}>
        //         <td><Link href={'/bounties/bounty/' + bounty.ID}><a>{bounty.Title}</a></Link></td>
        //         <td><Link href={'/bounties/bounty/' + bounty.ID}><a>${bounty.TotalAmount}</a></Link></td>
        //         <td><Link href={'/bounties/bounty/' + bounty.ID}><a>{bounty.CreatedDate}</a></Link></td>
        //     </tr>
        // );

       const tableStruct = (
            this.state.items.length > 0 ? 
             <div className="row">
                <div className="col-sm-12">
                    <div>
                        Carousel
                    </div>
                </div>
             </div>
             : null
        );
        
        return (
            <div>
               { this.state.loaded ? tableStruct : <span>Loading...</span> }
             </div>
        );
    }
}

export default Carousel;