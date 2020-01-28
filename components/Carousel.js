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
    GoToBounty(bountyID){
        window.location.href = '/bounties/bounty/' + bountyID
    }
    render() {
        // const latestBounties = this.state.items.map((bounty, key) =>
        // <tr style={{cursor: 'pointer'}} key={key}>
        //         <td><Link href={'/bounties/bounty/' + bounty.ID}><a>{bounty.Title}</a></Link></td>
        //         <td><Link href={'/bounties/bounty/' + bounty.ID}><a>${bounty.TotalAmount}</a></Link></td>
        //         <td><Link href={'/bounties/bounty/' + bounty.ID}><a>{bounty.CreatedDate}</a></Link></td>
        //     </tr>
        // );

        const carouselIndicators = this.state.items.map((bounty, key) =>
            <li data-target="#myCarousel" data-slide-to={key} className={{'active' : key === 0}}></li>
        );

        const carouselInner = this.state.items.map((bounty, key) =>
            <div className={key === 0 ? 'carousel-item active' : 'carousel-item'} onClick={this.GoToBounty(bounty.ID)} style={{"cursor": "pointer"}}>
                <img src={bounty.Image} alt="Los Angeles" />
                <div className="carousel-caption">
                    <h3>{bounty.Title}</h3>
                    <p>{bounty.BountyCondition}</p>
                    <p>Current Bounty: ${bounty.TotalAmount}</p>
                </div>
            </div>
        );

        const tableStruct = (
            this.state.items.length > 0 ? 
             <div className="row">
                <div className="col-sm-12">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ul>
                            {carouselIndicators}
                        </ul>
                        <div className="carousel-inner">
                            {carouselInner}
                        </div>
                        <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
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