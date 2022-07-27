import { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, User, pageRoles} ) => {
  
  const [show, setShow] = useState(0);
  

  useEffect(()=>{
      if(pageRoles !== undefined && User.roles.length !== 0 && pageRoles.indexOf(...User.roles) !== -1){
        setShow(2);
      }else{
        setShow(1);
      }
  },[User])

  return (<>{show === 2 && children}{show === 1 && <Navigate to="/" />}</>);
};


const mapStateToProps = (store) =>{     
  return {
      User:store.userBilgileri || null
  }
}

export default connect(mapStateToProps)(PrivateRoute);