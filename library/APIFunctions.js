//import { useRouter } from 'next/router';
//import useSWR from 'swr';
import axios from 'axios';
import config from './config';

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

    //let res = await axios.get('http://localhost:3001/api/bounties/bounty', {params: {'bountyId': bountyId}});
    //let { data } = res.data;
    //return data;
    return axios.get(config.api_url + '/api/bounties/bounty', {params: {'bountyId': bountyId}});
}

export async function GetRecentlyAdded(){
    //let res = await axios.get('http://localhost:3001/api/bounties/recentlyadded');
    //let { data } = res.data;
    //return data;
    return axios.get(config.api_url + '/api/bounties/recentlyadded');
}

export async function GetRecentlyClaimed(){
    //let res = await axios.get('http://localhost:3001/api/bounties/recentlyclaimed');
    //let { data } = res.data;
    //return data;
    return axios.get(config.api_url + '/api/bounties/recentlyclaimed');
}

export async function GetFeatured(){
    //let res = await axios.get('http://localhost:3001/api/bounties/featured');
    //let { data } = res.data;
    //return data;
    return axios.get(config.api_url + '/api/bounties/featured');
}

// export default function APIFunctions() {
    
// }