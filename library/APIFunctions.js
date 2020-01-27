//import { useRouter } from 'next/router';
//import useSWR from 'swr';
import axios from 'axios';

export async function GetBounty(author){
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

    return await axios.get('http://localhost:3000/api/bounties/bounty')
    .then(function (res){
        return res.data;
    })
    .catch(function(err){
        console.log(err);
        return err;
    });
}

export async function GetRecentlyAdded(author){
    return await axios.get('http://localhost:3000/api/bounties/recentlyadded')
    .then(function (res){
        return res.data;
    })
    .catch(function(err){
        console.log(err);
        return err;
    });
}

export async function GetRecentlyClaimed(author){
    return await axios.get('http://localhost:3000/api/bounties/recentlyclaimed')
    .then(function (res){
        return res.data;
    })
    .catch(function(err){
        console.log(err);
        return err;
    });
}

export async function GetFeatured(author){
    return await axios.get('http://localhost:3000/api/bounties/featured')
    .then(function (res){
        return res.data;
    })
    .catch(function(err){
        console.log(err);
        return err;
    });
}

export default function APIFunctions() {
    
}