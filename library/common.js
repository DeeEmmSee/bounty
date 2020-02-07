import Cookies from 'universal-cookie';
import config from './config';

export function IsLoggedIn() {
    let cookieData = GetCookieData();
    return cookieData.token !== undefined && cookieData.token !== 'undefined' && cookieData.userId !== undefined && cookieData.userId !== 'undefined';
}

export function GetCookieData() {
    const cookies = new Cookies();
    let token = cookies.get(config.vgb_token);
    let userId  = cookies.get(config.vgb_user);
    
    return {"token": token, "userId": userId};
}

export function SaveCookie(token, userId) {
    const cookies = new Cookies();
    let curDate = new Date();
    curDate.setDate(curDate.getDate() + 1);

    cookies.set(config.vgb_token, token, { "expires": curDate });
    cookies.set(config.vgb_user, userId, { "expires": curDate });
}

export function RemoveCookies() {
    const cookies = new Cookies();

    cookies.remove(config.vgb_token);
    cookies.remove(config.vgb_user);
}

export function ToReadableDateString(dateIn){
    if (dateIn === null || dateIn === undefined) {
        return "";
    }
    else {
        let newDate = new Date(dateIn);
        //return newDate.toLocaleString();
        return newDate.toUTCString();
    }
}

export function GetDBDate() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

export function GetStatus(statusID){
    if (statusID === 1) {
        return "Open";
    }
    else if (statusID === 2) {
        return "Claimed";
    }
    else if (statusID === 3) {
        return "Closed";
    }
    else {
        return "";
    }
}