import dynamic from 'next/dynamic';
import { GetBounty } from '../library/APIFunctions';
//import { render } from 'react-dom';

//import RecentlyAdded from '../components/RecentlyAdded';
const RecentlyAdded = dynamic(() => import('../components/RecentlyAdded'));
const RecentlyClaimed = dynamic(() => import('../components/RecentlyClaimed'));

//import axios from 'axios';
//import useSWR from 'swr';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.recentlyAdded = props.added;
        this.recentlyClaimed = props.claimed;
    }
    //const { query } = useRouter();
    //let res = GetBounty("Guillermo Rauch");
    //let data = res.data;

    //const { data, error } = useSWR(`/api/bounties/bounty`, fetcher);
    //const { data, error } = useSWR(`/api/bounties/bounty${query.author ? '?author=' + query.author : ''}`, fetcher);
    render() {
        return(
            <main>
                <div>Test123</div>
                <div>{this.props.data.quote}</div>
                <div>
                    <h4>Recently Added</h4>
                    <RecentlyAdded />
                </div>
                <div>
                    <h4>Recently Claimed</h4>
                    <RecentlyClaimed /> 
                </div>
            </main>
        );
    }
}

Index.getInitialProps = async function(context){
    let res = await GetBounty("Guillermo Rauch");
    let data = await res;

    /*return {
        data: data,
        added: [{'ID': '1', 'Title': 'Test1', 'CreatedDate': '2020-01-01', 'TotalAmount':'1'}, {'ID': '2','Title': 'Test2', 'CreatedDate': '2020-01-02', 'TotalAmount':'2'}],
        claimed: [{'ID': '4','Title': 'Test4', 'CreatedDate': '2020-01-04', 'TotalAmount':'4'}, {'ID': '3','Title': 'Test3', 'CreatedDate': '2020-01-03', 'TotalAmount':'3'}]
    };*/
    return { data: data };
};

export default Index;