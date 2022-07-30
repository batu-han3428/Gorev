import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import './CreateTask.css';
import swal from 'sweetalert';
import { get, post } from '../helpers/api';
import { Link, useLocation, useNavigate   } from 'react-router-dom';


const CreateCompany = (props) => {

    const [companyName, setCompanyName] = useState("");


    const navigate = useNavigate();


    const createCompany = () =>{
        console.log("dada")
        if(companyName !== ""){
            post('Company/CreateCompany/',{Name:companyName},props.User.token)
            .then(resp=>{
                if(resp === 200){
                    swal("Kayıt Başarılı!", "", "success");
                    clearInputs();
                }
                else
                    swal("Beklenmeyen bir hata oluştu!", "", "error");
            })
        }

    }
    const clearInputs = () =>{
        setCompanyName("");
    }
    return(
        <main className="main-content border-radius-lg col-md-10 ms-auto" >  
            <div className="container-fluid py-4">
                <div className="row min-vh-80">
                    <div className="col-6 mx-auto">
                        <button onClick={()=>navigate(-1)} type="button" className="btn btn-outline-primary">Geri</button>
                    <div className="card mt-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                            <h6 className="text-white text-capitalize ps-3">Şirket Oluştur</h6>
                            <p className="mb-0 text-white ps-3">Buradan şirket oluştura bilirsiniz..
                            </p>
                        </div>
                        </div>
                        <div className="card-body">
                            <div className="register-form-container">
                                <form action="" onSubmit={(e)=>e.preventDefault()}>
                                    <h1 className="form-title">
                                    Şirket
                                    </h1>
                                    <div className="form-fields">
                                        <div className="form-field">
                                            <input value={companyName} onChange={(e)=>setCompanyName(e.target.value?e.target.value[0].toUpperCase()+e.target.value.substring(1):"")} type="text" placeholder="Şirket Adı" required pattern="[a-zA-Z]+"/>
                                        </div>                                    
                                    </div>
                                    <div className="form-buttons">
                                        <button onClick={createCompany} type="button" className="button">Oluştur</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>            
            </div>
        </main>
    );
}

const mapStateToProps = (store) =>{     
    return {
        User:store.userBilgileri || null
    }
  }
  
export default connect(mapStateToProps)(CreateCompany);