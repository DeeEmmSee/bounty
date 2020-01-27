//import { useRouter } from 'next/router';
//import useSWR from 'swr';
import axios from 'axios';

export async function GetBounty(bountyId){
    //const { data, error } = useSWR(`/api/bounties/bounty${author ? '?author=' + author : ''}`, get);
    //const { data, error } = useSWR([`/api/bounties/bounty`, author], get);

    /*let req = {
        baseURL: 'http://localhost:3000',
        withCredentials: false,
        method: 'GET',
        url: '/api/bounties/bounty',
        params: {
            author: author
        }
    };

    return axios(req);
    .then(function (res){
        //console.log("success");
        console.log(res.data);
        return res.data;
    })
    .catch(function(err){
        console.log(err);
        return err;
    });*/

    let res = await axios.get('http://localhost:3001/api/bounties/bounty', {params: {'bountyId': bountyId}});
    let { data } = res.data;
    return data;
}

export async function GetRecentlyAdded(author){
    let res = await axios.get('http://localhost:3001/api/bounties/recentlyadded');
    let { data } = res.data;
    return data;
}

export async function GetRecentlyClaimed(author){
    let res = await axios.get('http://localhost:3001/api/bounties/recentlyclaimed');
    let { data } = res.data;
    return data;
}

export async function GetFeatured(author){
    let res = await axios.get('http://localhost:3001/api/bounties/featured');
    let { data } = res.data;
    return data;
}

// export default function APIFunctions() {
    
// }