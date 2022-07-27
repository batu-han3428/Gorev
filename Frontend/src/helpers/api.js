import Axios from 'axios';

export const post = async (url, value) =>{
    try {
        return await (await Axios.post('https://localhost:7261/api/'+url, value,{ withCredentials: true })).data; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}

export const get = async (url, title, value) =>{
    try {
        return await (await Axios.get('https://localhost:7261/api/'+url+'?'+title+'='+value)).data; 
    }
    catch(err) {
        return {data:"Beklenmeyen bir hata oluştu!"}
    }
}