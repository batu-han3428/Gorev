import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {onLogin} from '../auth/useAuth';
import {connect} from 'react-redux';
import { loginuser, logoutuser } from '../action/user';


const ConfirmLayout = (props) => {
  useEffect(()=>{
    let result = onLogin("ConfirmToken");
    if(result !== false)
        props.dispatch(loginuser(result));
  },[])
  return (
    <>
      <Outlet />
    </>
  );
};

export default connect()(ConfirmLayout);