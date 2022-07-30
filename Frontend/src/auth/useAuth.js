import { decodeToken } from "../util/tokenUtil";
import {getCookie} from '../helpers/cookie';
import Axios from 'axios';


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
  var config = {
    headers: { 
      'Authorization': `Bearer ${cookie.value}`, 
      'Content-Type': 'application/json'     
    },
    'withCredentials':true  
  };

  return Axios.delete('https://localhost:7261/api/User/Logout',config)
  .then(resp =>{
    return resp.data
  });  
  // document.cookie = "name=AccessToken; expires=Sun, 1 May 2020 10:00:00 UTC;";
  // let cookie = getCookie("AccessToken");
  // console.log(cookie)
}