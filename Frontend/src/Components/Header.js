import {connect} from 'react-redux';
import React, { useEffect } from "react";
import { Link  } from 'react-router-dom';


const Header = (props) => {
    return(
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
        <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
            <img src={require("../img/logo-ct.png")} className="navbar-brand-img h-100" alt="main_logo" />
            <span className="ms-1 font-weight-bold text-white">Material Dashboard 2</span>
        </a>
        </div>


<hr className="horizontal light mt-0 mb-2"/>

<div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
  <ul className="navbar-nav">
  {props.User.isAuthenticated === true && props.User.roles.indexOf("Yönetici") !== -1?
  <li className="nav-item">
    <Link className="nav-link text-white" to="/createtask">
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">task</i>
        </div>
        <span className="nav-link-text ms-1">Görev Oluştur</span>
    </Link>
  </li>:<></>
  }

<li className="nav-item">
<a className="nav-link text-white " href="./dashboard.html">
  
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">dashboard</i>
    </div>
  
  <span className="nav-link-text ms-1">Dashboard</span>
</a>
</li>


<li className="nav-item">
<a className="nav-link text-white " href="./tables.html">
  
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">table_view</i>
    </div>
  
  <span className="nav-link-text ms-1">Tables</span>
</a>
</li>


<li className="nav-item">
<a className="nav-link text-white " href="./billing.html">
  
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">receipt_long</i>
    </div>
  
  <span className="nav-link-text ms-1">Billing</span>
</a>
</li>


<li className="nav-item">
<a className="nav-link text-white " href="./virtual-reality.html">
  
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">view_in_ar</i>
    </div>
  
  <span className="nav-link-text ms-1">Virtual Reality</span>
</a>
</li>


<li className="nav-item">
<a className="nav-link text-white " href="./rtl.html">
  
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
    </div>
  
  <span className="nav-link-text ms-1">RTL</span>
</a>
</li>


<li className="nav-item">
<a className="nav-link text-white " href="./notifications.html">
  
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">notifications</i>
    </div>
  
  <span className="nav-link-text ms-1">Notifications</span>
</a>
</li>


  <li className="nav-item mt-3">
    <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
  </li>

{props.User.isAuthenticated &&
  <li className="nav-item">
    <a className="nav-link text-white " href="./profile.html">
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">person</i>
        </div>
       <span className="nav-link-text ms-1">Profile</span>
    </a>
  </li>
}
{props.User.isAuthenticated ||
    <li className="nav-item">
        <Link className="nav-link text-white" to="/signin">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">login</i>
                </div>
            <span className="nav-link-text ms-1">Sign In</span>
        </Link>
    </li>
}

{props.User.isAuthenticated ||
<li className="nav-item">
  <Link className="nav-link text-white" to="/signup">
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">assignment</i>
    </div>
  <span className="nav-link-text ms-1">Sign Up</span>
  </Link>
</li>
}

{props.User.isAuthenticated &&
  <li className="nav-item">
    <Link className="nav-link text-white" to="/logout">
        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
          <i className="material-icons opacity-10">logout</i>
        </div>
      <span className="nav-link-text ms-1">Log Out</span>
    </Link>
  </li>
}
        

      
    
  </ul>
</div>

<div className="sidenav-footer position-absolute w-100 bottom-0 ">
  <div className="mx-3">
    <a className="btn bg-gradient-primary mt-4 w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Upgrade to pro</a>
  </div>
  
</div>

        </aside>
    );
}

const mapStateToProps = (store) =>{     
    return {
        User:store.userBilgileri || null
    }
}
  
export default connect(mapStateToProps)(Header);