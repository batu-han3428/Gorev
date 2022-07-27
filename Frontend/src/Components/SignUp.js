import React,{useState} from "react";
import {connect} from 'react-redux';
import swal from 'sweetalert';
import {post} from '../helpers/api';
import { Link } from 'react-router-dom';


const SignUp = (props) => {

  const [userName, setUserName] = useState("");
  const [userSurName, setuserSurName] = useState("");
  const [userMail, setuserMail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userRPassword, setuserRPassword] = useState("");
  const [validateEmail, setvalidateEmail] = useState(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [checkLength, setcheckLength] = useState(false);
  const [checkLowerCase, setcheckLowerCase] = useState(false);
  const [checkUpperCase, setcheckUpperCase] = useState(false);
  const [checkNumber, setcheckNumber] = useState(false);


  const inputControl = () => {
    if(userName == "" || userPassword == "" || userMail == "" || userRPassword == "" || userSurName == "")
      return true;
    else
      return false;
  }


  const passwordControl = () => {
    if(userPassword === userRPassword)
      return false;
    else
      return true;
  }


  const mailControl = () => {
    if(!validateEmail.test(String(userMail).toLowerCase()))
      return true;
    else
      return false;
  }


  const passwordValidation = (value) => {
    setcheckLength(value.length >= 8);
    setcheckLowerCase(/[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value));
    setcheckUpperCase(/[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value));
    setcheckNumber(/[0-9]/.test(value));
  }


  const clearInputs = () => {
    setUserName("");
    setuserSurName("");
    setuserMail("");
    setuserPassword("");
    setuserRPassword("");
    setcheckLength(false);
    setcheckLowerCase(false);
    setcheckUpperCase(false);
    setcheckNumber(false);
  }


  const register = () => {
    if(inputControl())
      swal("Tüm Alanlar Zorunludur!", "", "warning");
    else if(passwordControl())
      swal("Parolalar Eşleşmiyor!", "", "warning");
    else if(mailControl()){
      swal("Lütfen Geçerli Bir Mail Adresi Giriniz!", "", "warning");
    }
    else if(!checkLength || !checkLowerCase || !checkNumber || !checkUpperCase){
      swal("Lütfen Geçerli Bir Parola Giriniz!", "", "warning");
    }
    else{
      post('User/Register',{ Name: userName, Surname: userSurName, Email: userMail, Password: userPassword, userRoles: [
        {
          userId: 0,
          roleId: 3
        }
      ]})
      .then(resp=>{
        if(resp === 200){
          clearInputs();
          swal({title: "Üyeliğinizi Onaylamanız İçin Size Mail Gönderdik..",
          text: "",
          icon: "warning",
          dangerMode: true,});
        }else if(resp === 403){
          swal("Kullanıcı Zaten Kayıtlı!", "", "error");
        }else{
          swal(resp.data || "", "", "error");
        }
      })
    }
  }


    return(
        <>
        <div className="container position-sticky z-index-sticky top-0">
          <div className="row">
            <div className="col-12">
              {/* <!-- Navbar --> */}
              <nav className="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
                <div className="container-fluid ps-2 pe-0">
                  <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="../pages/dashboard.html">
                    Material Dashboard 2
                  </a>
                  <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon mt-2">
                      <span className="navbar-toggler-bar bar1"></span>
                      <span className="navbar-toggler-bar bar2"></span>
                      <span className="navbar-toggler-bar bar3"></span>
                    </span>
                  </button>
                  <div className="collapse navbar-collapse" id="navigation">
                    <ul className="navbar-nav mx-auto">
                      <li className="nav-item">
                        <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="../pages/dashboard.html">
                          <i className="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                          Dashboard
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link me-2" href="../pages/profile.html">
                          <i className="fa fa-user opacity-6 text-dark me-1"></i>
                          Profile
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link me-2" href="../pages/sign-up.html">
                          <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                          Sign Up
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link me-2" href="../pages/sign-in.html">
                          <i className="fas fa-key opacity-6 text-dark me-1"></i>
                          Sign In
                        </a>
                      </li>
                    </ul>
                    <ul className="navbar-nav d-lg-block d-none">
                      <li className="nav-item">
                        <a href="https://www.creative-tim.com/product/material-dashboard" className="btn btn-sm mb-0 me-1 bg-gradient-dark">Free download</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              {/* <!-- End Navbar --> */}
            </div>
          </div>
        </div>
        <main className="main-content  mt-0">
          <section>
            <div className="page-header min-vh-100">
              <div className="container">
                <div className="row">
                  <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                    <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center" 
                    style={{backgroundImage: `url(${require('../img/illustration-signup.jpg')})`, backgroundSize: "cover"}}>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                    <div className="card card-plain">
                      <div className="card-header">
                        <h4 className="font-weight-bolder">Sign Up</h4>
                        <p className="mb-0">Enter your email and password to register</p>
                      </div>
                      <div className="card-body">
                        <form role="form">
                          <div className="input-group input-group-outline mb-3">
                            <label className="form-label">Name</label>
                            <input value={userName} onChange={(e)=>setUserName(e.target.value?e.target.value[0].toUpperCase()+e.target.value.substring(1):"")} type="text" className="form-control"/>
                          </div>
                          <div className="input-group input-group-outline mb-3">
                            <label className="form-label">SurName</label>
                            <input value={userSurName} onChange={(e)=>setuserSurName(e.target.value?e.target.value[0].toUpperCase()+e.target.value.substring(1):"")} type="text" className="form-control"/>
                          </div>
                          <div className="input-group input-group-outline mb-3">
                            <label className="form-label">Email</label>
                            <input value={userMail} onChange={(e)=>setuserMail(e.target.value)} type="email" className="form-control"/>
                          </div>
                          <div className="input-group input-group-outline mb-3">
                            <label className="form-label">Password</label>
                            <input value={userPassword} onChange={(e)=>{setuserPassword(e.target.value); passwordValidation(e.target.value);}} type="password" className="form-control"/>
                          </div>
                          <div className="input-group input-group-outline mb-3">
                            <label className="form-label">Re-Password</label>
                            <input value={userRPassword} onChange={(e)=>setuserRPassword(e.target.value)} type="password" className="form-control"/>
                          </div>                       
                          <div className="text-center">
                            <button onClick={register} type="button" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0">Sign Up</button>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center pt-0 px-lg-2 px-1">
                        <p className="mb-2 text-sm mx-auto">
                          Already have an account?
                          <Link className="text-primary text-gradient font-weight-bold" to="/signin">Sign in</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        </>
    );
}

export default connect()(SignUp);