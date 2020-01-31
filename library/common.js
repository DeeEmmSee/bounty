import Cookies from 'universal-cookie';
import config from './config';

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