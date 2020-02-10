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

    return axios.get(config.api_url + '/api/bounties/bounty', {params: {'bountyId': bountyId}});
}

export async function GetBounties(obj, limit){
    //let res = await axios.get('http://localhost:3001/api/bounties/recentlyadded');
    //let { data } = res.data;
    //return data;
    return axios.post(config.api_url + '/api/bounties/bounties?limit=' + limit, obj);
}

export async function GetRecentlyAdded(limit){
    return axios.get(config.api_url + '/api/bounties/recentlyadded?limit=' + limit);
}

export async function GetRecentlyClaimed(limit){
    return axios.get(config.api_url + '/api/bounties/recentlyclaimed?limit=' + limit);
}

export async function GetFeatured(limit){
    return axios.get(config.api_url + '/api/bounties/featured?limit=' + limit);
}

export async function RegisterUser(obj){
    return axios.post(config.api_url + '/api/users/user', obj);
}

export async function Login(obj){
    return axios.post(config.api_url + '/api/auth/login', obj);
}

export async function GetGameList(){
    return axios.get(config.api_url + '/api/games/all');
}

export async function SaveNewBounty(obj){
    return axios.post(config.api_url + '/api/bounties/bounty', obj);
}

export async function SaveNewBountyContribution(obj){
    return axios.post(config.api_url + '/api/bounties/bountycontribution', obj);
}

export async function GetUser(userId){
    return axios.post(config.api_url + '/api/users/user', {params: {'userId': userId}});
}

export async function SaveNewAttempt(obj){
    return axios.post(config.api_url + '/api/bounties/bountyattempt', obj);
}

export async function GetBountyAttemptsByBounty(bountyId){
    return axios.get(config.api_url + '/api/bounties/bountyattempt',  {params: {'type': 'bounty', 'id': bountyId}});
}

export async function GetBountyAttemptsByUser(userID){
    return axios.get(config.api_url + '/api/bounties/bountyattempt',  {params: {'type': 'user', 'id': userID}});
}
// export default function APIFunctions() {
    
// }