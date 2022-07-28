import { decodeToken } from "../util/tokenUtil";
import {getCookie} from '../helpers/cookie';



export const onLogin = (cookieName = null) => {

  let cookie = getCookie(cookieName);
 
  if(cookie.key !== '' && cookie.value !== undefined){
    var auth = decodeToken(cookie.value);
    let exp = new Date(auth.exp * 1000);

    if(exp < new(Date)){
      return false;
    }
   
    return {
      token:cookie.value,
      name:auth.name,
      roles:[...auth.roles],
      isAuthenticated:auth.isAuthenticated,
      exp:exp,
      mail:auth.mail,
      companyId:auth.companyId,
      userId:auth.userId
    };
  }
  return false;
};

export const onLogout = () => {
  let cookie = getCookie("AccessToken");
  document.cookie = `AccessToken = ${cookie.value}; expires = Mon, 1 Jan 2000 00:00:00 GMT`;
}