import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
//import { render } from 'react-dom';

//import RecentlyAdded from '../components/RecentlyAdded';
const RecentlyAdded = dynamic(() => import('../components/RecentlyAdded'));
const RecentlyClaimed = dynamic(() => import('../components/RecentlyClaimed'));

//import axios from 'axios';
//import useSWR from 'swr';

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    //const { query } = useRouter();
    //let res = GetBounty("Guillermo Rauch");
    //let data = res.data;

    //const { data, error } = useSWR(`/api/bounties/bounty`, fetcher);
    //const { data, error } = useSWR(`/api/bounties/bounty${query.author ? '?author=' + query.author : ''}`, fetcher);
    render() {
        return(
            <Layout>
                <div className="row">
                    <div className="col-sm-12">
                        <h2 style={{"textAlign": "center"}}>VideoGameBounties.com</h2>
                    </div>
                </div>

                <Carousel />

                <div className="row">
                    <div className="col-sm-12">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar, ex a bibendum placerat, nibh velit rhoncus velit, eu ullamcorper felis quam eu ligula. In tincidunt sit amet erat nec hendrerit. Donec eget tellus in dolor tristique eleifend. Cras vel vestibulum risus. Sed accumsan eget tellus semper vehicula. Integer condimentum tellus sed turpis fringilla consectetur. Phasellus id vestibulum ipsum. Phasellus pulvinar felis nec ex sodales condimentum. Morbi sed maximus nisi, vitae viverra enim. Nullam quis pretium orci, at vehicula risus. Nunc sit amet fringilla diam, nec maximus ligula.

                            Donec ac iaculis velit. Cras fermentum nisl eget tortor viverra iaculis. Duis iaculis nisl at tincidunt sollicitudin. Sed sollicitudin sem est. Fusce sed elit fermentum, porta nisi sed, tincidunt odio. Vestibulum aliquet, nulla in accumsan malesuada, turpis nibh accumsan risus, eget consequat sapien eros vel velit. Donec suscipit elit eu lorem luctus, ac ultrices purus volutpat. Donec eget lorem eros. Pellentesque cursus blandit vestibulum.

                            Sed fringilla, mauris et eleifend vulputate, purus sem sodales tortor, gravida imperdiet neque orci quis ex. Maecenas eget est non orci congue vestibulum. Quisque consectetur sapien nec erat lacinia, sit amet vehicula justo pulvinar. Maecenas eu pharetra nunc. Quisque pharetra at enim in tempus. Vivamus rhoncus luctus odio, vitae porta nisl pharetra vel. Vivamus ac nibh condimentum enim ullamcorper molestie et sit amet augue.

                            Sed nisl orci, condimentum non venenatis ut, vulputate in velit. Nulla et pellentesque libero. Pellentesque eget ultricies dolor, id convallis orci. Nam ultrices scelerisque fringilla. Integer ut velit aliquet, condimentum urna ac, sodales nisi. Sed maximus mattis nibh non vestibulum. Duis sed enim ut neque fringilla aliquam sit amet lobortis enim. Morbi nulla lacus, rutrum aliquam auctor at, convallis at quam. Nunc auctor, est sed aliquet mattis, lacus augue vehicula tortor, a efficitur nisi urna et dolor. Maecenas eu magna elementum, gravida nunc ut, eleifend magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas non porta nunc. Donec sit amet felis metus. Quisque eu mauris odio. In aliquam fringilla tortor et ullamcorper.

                            Aliquam iaculis facilisis iaculis. Mauris consectetur cursus bibendum. Pellentesque maximus, odio vulputate vulputate faucibus, nisi felis cursus turpis, quis ultricies justo lorem a libero. Nulla blandit blandit lacinia. Phasellus dapibus ut ex vitae volutpat. Nullam ornare magna in est pellentesque imperdiet. Vivamus ullamcorper elit quis lacus sagittis porttitor. Fusce semper leo non rhoncus dapibus.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <h4>Recently Added</h4>
                        <RecentlyAdded />
                    </div>
                    <div className="col-sm-6">
                        <h4>Recently Claimed</h4>
                        <RecentlyClaimed /> 
                    </div>
                </div>
                
            </Layout>
        );
    }
}

// Index.getInitialProps = async function(context){
//     let res = await GetBounty("Guillermo Rauch");
//     let data = await res;

//     /*return {
//         data: data,
//         added: [{'ID': '1', 'Title': 'Test1', 'CreatedDate': '2020-01-01', 'TotalAmount':'1'}, {'ID': '2','Title': 'Test2', 'CreatedDate': '2020-01-02', 'TotalAmount':'2'}],
//         claimed: [{'ID': '4','Title': 'Test4', 'CreatedDate': '2020-01-04', 'TotalAmount':'4'}, {'ID': '3','Title': 'Test3', 'CreatedDate': '2020-01-03', 'TotalAmount':'3'}]
//     };*/
//     return { data: data };
// };

export default Index;