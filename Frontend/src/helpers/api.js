import Axios from 'axios';

export const post = async (url, value, token = null) =>{
    try {
        var config = {
            headers: { 
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'     
            },
            'withCredentials':true  
          };

        return await (await Axios.post('https://localhost:7261/api/'+url, value, config)).data; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}

export const get = async (url, title, value, token = null) =>{
    try {
        var config = {
            headers: { 
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json'     
            }
          };

        return await (await Axios.get('https://localhost:7261/api/'+url+'?'+title+'='+value, config)).data; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}