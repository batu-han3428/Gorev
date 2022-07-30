import React,{useEffect, useState} from "react";
import { Navigate } from 'react-router-dom';
import { onLogout} from '../auth/useAuth';
import { logoutuser } from '../action/user';
import {connect} from 'react-redux';


const Logout = (props) => {
    
    const [data, setData] = useState(0);
  
    useEffect(()=>{
        props.dispatch(logoutuser()); 
        let result = onLogout();
        result.then(x=> setData(x))
    },[])

  return (
      <>
      {data === 200 && <Navigate to="/signin" />}
      </>
    )
}

export default connect()(Logout);