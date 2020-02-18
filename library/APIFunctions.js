//import { useRouter } from 'next/router';
//import useSWR from 'swr';
import axios from 'axios';
import config from './config';

class APIFunctions {
    constructor(token){
        this.instance = axios.create({
                            baseURL: config.api_url,
                            timeout: 5000,
                            headers: {'Authorization': 'Bearer ' + token}
                        });
        
    }

    GetBounty = async function(bountyId){
        return this.instance.get('/api/bounties/bounty', {params: {'bountyId': bountyId}});
    };
    
    GetBounties = async function(obj, limit){
        return this.instance.post('/api/bounties/bounties?limit=' + limit, obj);
    };

    GetFeatured = async function(limit){
        return this.instance.get('/api/bounties/featured?limit=' + limit);
    };

    GetRecentlyAdded = async function(limit){
        return this.instance.get('/api/bounties/recentlyadded?limit=' + limit);
    };
    
    GetRecentlyClaimed = async function(limit){
        return this.instance.get('/api/bounties/recentlyclaimed?limit=' + limit);
    };

    RegisterUser = async function(obj){
        return this.instance.post('/api/users/user', obj);
    };
    
    Login = async function(obj){
        return this.instance.post('/api/auth/login', obj);
    };
    
    GetGameList = async function(){
        return this.instance.get('/api/games/all');
    };
    
    SaveNewBounty = async function(obj){
        return this.instance.post('/api/bounties/bounty', obj);
    };
    
    SaveNewBountyContribution = async function(obj){
        return this.instance.post('/api/bounties/bountycontribution', obj);
    };
    
    GetUser = async function(userId){
        return this.instance.post('/api/users/user', {params: {'userId': userId}});
    };
    
    SaveNewAttempt = async function(obj){
        return this.instance.post('/api/bounties/bountyattempt', obj);
    };
    
    GetBountyAttemptsByBounty = async function(bountyId){
        return this.instance.get('/api/bounties/bountyattempt',  {params: {'type': 'bounty', 'id': bountyId}});
    };
    
    GetBountyAttemptsByUser = async function(userID){
        return this.instance.get('/api/bounties/bountyattempt',  {params: {'type': 'user', 'id': userID}});
    };
    
    GetBountyContributionsByBounty = async function(bountyId){
        return this.instance.get('/api/bounties/bountycontribution',  {params: {'type': 'bounty', 'id': bountyId}});
    };
    
    GetBountyContributionsByUser = async function(userID){
        return this.instance.get('/api/bounties/bountycontribution',  {params: {'type': 'user', 'id': userID}});
    };
    
    SetBountyContributionAsPaid = async function(ID, bountyID){
        return this.instance.patch('/api/bounties/bountycontribution',  {'id': ID, 'bountyID': bountyID});
    };
    
    UpdateBountyAttempt = async function(ID, statusID, bountyID){
        return this.instance.patch('/api/bounties/bountyattempt',  {'id': ID, 'statusID': statusID, 'bountyID': bountyID});
    };
    
    GetProfileStats = async function(userID) {
        return this.instance.get('/api/bounties/profilestats',  {params: {'id': userID}});
    };
}

// APIFunctions.GetBounty = async function(bountyId){
//     return axios.get('/api/bounties/bounty', {params: {'bountyId': bountyId}});
// }

// APIFunctions.GetBounties = async function(obj, limit){
//     return axios.post('/api/bounties/bounties?limit=' + limit, obj);
// }

// APIFunctions.GetRecentlyAdded = async function(limit){
//     return axios.get('/api/bounties/recentlyadded?limit=' + limit);
// }

// APIFunctions.GetRecentlyClaimed = async function(limit){
//     return axios.get('/api/bounties/recentlyclaimed?limit=' + limit);
// }

// APIFunctions.GetFeatured = async function(limit){
//     return axios.get('/api/bounties/featured?limit=' + limit);
// }

// APIFunctions.RegisterUser = async function(obj){
//     return axios.post('/api/users/user', obj);
// }

// APIFunctions.Login = async function(obj){
//     return axios.post('/api/auth/login', obj);
// }

// APIFunctions.GetGameList = async function(){
//     return axios.get('/api/games/all');
// }

// APIFunctions.SaveNewBounty = async function(obj){
//     return axios.post('/api/bounties/bounty', obj);
// }

// APIFunctions.SaveNewBountyContribution = async function(obj){
//     return axios.post('/api/bounties/bountycontribution', obj);
// }

// APIFunctions.GetUser = async function(userId){
//     return axios.post('/api/users/user', {params: {'userId': userId}});
// }

// APIFunctions.SaveNewAttempt = async function(obj){
//     return axios.post('/api/bounties/bountyattempt', obj);
// }

// APIFunctions.GetBountyAttemptsByBounty = async function(bountyId){
//     return axios.get('/api/bounties/bountyattempt',  {params: {'type': 'bounty', 'id': bountyId}});
// }

// APIFunctions.GetBountyAttemptsByUser = async function(userID){
//     return axios.get('/api/bounties/bountyattempt',  {params: {'type': 'user', 'id': userID}});
// }

// APIFunctions.GetBountyContributionsByBounty = async function(bountyId){
//     return axios.get('/api/bounties/bountycontribution',  {params: {'type': 'bounty', 'id': bountyId}});
// }

// APIFunctions.GetBountyContributionsByUser = async function(userID){
//     return axios.get('/api/bounties/bountycontribution',  {params: {'type': 'user', 'id': userID}});
// }

// APIFunctions.SetBountyContributionAsPaid = async function(ID, bountyID){
//     return axios.patch('/api/bounties/bountycontribution',  {'id': ID, 'bountyID': bountyID});
// }

// APIFunctions.UpdateBountyAttempt = async function(ID, statusID, bountyID){
//     return axios.patch('/api/bounties/bountyattempt',  {'id': ID, 'statusID': statusID, 'bountyID': bountyID});
// }

// APIFunctions.GetProfileStats = async function(userID) {
//     return axios.get('/api/bounties/profilestats',  {params: {'id': userID}});
// }

export default APIFunctions;

// export async function GetBounty(bountyId){
//     return axios.get(config.api_url + '/api/bounties/bounty', {params: {'bountyId': bountyId}});
// }

// export async function GetBounties(obj, limit){
//     return axios.post(config.api_url + '/api/bounties/bounties?limit=' + limit, obj);
// }

// export async function GetRecentlyAdded(limit){
//     return axios.get(config.api_url + '/api/bounties/recentlyadded?limit=' + limit);
// }

// export async function GetRecentlyClaimed(limit){
//     return axios.get(config.api_url + '/api/bounties/recentlyclaimed?limit=' + limit);
// }

// export async function GetFeatured(limit){
//     return axios.get(config.api_url + '/api/bounties/featured?limit=' + limit);
// }

// export async function RegisterUser(obj){
//     return axios.post(config.api_url + '/api/users/user', obj);
// }

// export async function Login(obj){
//     return axios.post(config.api_url + '/api/auth/login', obj);
// }

// export async function GetGameList(){
//     return axios.get(config.api_url + '/api/games/all');
// }

// export async function SaveNewBounty(obj){
//     return axios.post(config.api_url + '/api/bounties/bounty', obj);
// }

// export async function SaveNewBountyContribution(obj){
//     return axios.post(config.api_url + '/api/bounties/bountycontribution', obj);
// }

// export async function GetUser(userId){
//     return axios.post(config.api_url + '/api/users/user', {params: {'userId': userId}});
// }

// export async function SaveNewAttempt(obj){
//     return axios.post(config.api_url + '/api/bounties/bountyattempt', obj);
// }

// export async function GetBountyAttemptsByBounty(bountyId){
//     return axios.get(config.api_url + '/api/bounties/bountyattempt',  {params: {'type': 'bounty', 'id': bountyId}});
// }

// export async function GetBountyAttemptsByUser(userID){
//     return axios.get(config.api_url + '/api/bounties/bountyattempt',  {params: {'type': 'user', 'id': userID}});
// }

// export async function GetBountyContributionsByBounty(bountyId){
//     return axios.get(config.api_url + '/api/bounties/bountycontribution',  {params: {'type': 'bounty', 'id': bountyId}});
// }

// export async function GetBountyContributionsByUser(userID){
//     return axios.get(config.api_url + '/api/bounties/bountycontribution',  {params: {'type': 'user', 'id': userID}});
// }

// export async function SetBountyContributionAsPaid(ID, bountyID){
//     return axios.patch(config.api_url + '/api/bounties/bountycontribution',  {'id': ID, 'bountyID': bountyID});
// }

// export async function UpdateBountyAttempt(ID, statusID, bountyID){
//     return axios.patch(config.api_url + '/api/bounties/bountyattempt',  {'id': ID, 'statusID': statusID, 'bountyID': bountyID});
// }

// export async function GetProfileStats(userID) {
//     return axios.get(config.api_url + '/api/bounties/profilestats',  {params: {'id': userID}});
// }