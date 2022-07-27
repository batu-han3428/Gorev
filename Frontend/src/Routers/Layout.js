import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {onLogin, onLogout} from '../auth/useAuth';
import {connect} from 'react-redux';
import { loginuser, logoutuser } from '../action/user';
import Header from "../Components/Header";
import Main from "../Components/Main";


const Layout = (props) => {
  useEffect(()=>{
    let result = onLogin("AccessToken");
    if(result === false){
      onLogout();
      props.dispatch(logoutuser()); 
    }else{
      props.dispatch(loginuser(result)); 
    }
  },[])
  return (
    <>
      <Header />
      <Main />
      <Outlet />
    </>
  );
};

export default connect()(Layout);