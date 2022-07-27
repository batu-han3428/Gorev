import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import './CreateTask.css';
import swal from 'sweetalert';
import {get} from '../helpers/api';
import { post } from "jquery";


const CreateTask = (props) => {

    const [appointedPersonnel, setAppointedPersonnel] = useState("");
    const [expiryTime, setExpiryTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urgency, setUrgency] = useState(false);
    const [priority, setPriority] = useState(false);
    const [document, setDocument] = useState(null);
    const [employees, setEmployees] = useState([]);
    
    useEffect(()=>{
        get('User/GetEmployees/','CompanyId',props.User.companyId)
        .then(resp=>{
            console.log(resp)
          if(resp.data === "Beklenmeyen bir hata oluştu!")
            swal(resp.data, "", "error");
          else{
            setEmployees([...resp])
          }
        });
    },[])

  
    const inputControl = () => {
      if(title == "" || description == "" || appointedPersonnel == "" || expiryTime == "")
        return true;
      else
        return false;
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          return reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }
     
    //  {
    //     "userId": 0,
    //     "title": "string",
    //     "description": "string",
    //     "priority": true,
    //     "urgency": true,
    //     "constituent": 0,
    //     "completionTime": "2022-07-27T11:36:25.412Z",
    //     "documentDTOs": [
    //       {
    //         "name": "string",
    //         "data": "string"
    //       }
    //     ]
    //   }


    const createTask = () =>{
        if(inputControl())
            swal("Başlık, Açıklama, Atama ve Bitiş Zamanı zorunludur!", "", "warning");
        else{
            getBase64(document);
        


            // post('Task/CreateTask',
            //     {
            //         UserId: appointedPersonnel, 
            //         Title:title, 
            //         Description:description, 
            //         Urgency: urgency, 
            //         Priority:priority, 
            //         Constituent: props.User.companyId })
            // .then(resp=>{
        }

    }

    return(
        <main className="main-content border-radius-lg col-md-10 ms-auto" >  
            <div className="container-fluid py-4">
                <div className="row min-vh-80">
                    <div className="col-6 mx-auto">
                    <div className="card mt-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                            <h6 className="text-white text-capitalize ps-3">Görev Oluştur</h6>
                            <p className="mb-0 text-white ps-3">Personellerinize buradan görev oluştura bilirsiniz..
                            </p>
                        </div>
                        </div>
                        <div className="card-body">
                            <div className="register-form-container">
                                <form action="">
                                    <h1 className="form-title">
                                    Görev
                                    </h1>
                                    <div className="form-fields">
                                        <div className="form-field">
                                            <select onChange={(e) => setAppointedPersonnel(e.target.value)} defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example">
                                                <option value="DEFAULT">Personel Ata</option>
                                                {employees.length > 0 && employees.map((item, index)=>{
                                                    return(
                                                        <option key={index} value={item.id}>{item.employeeName}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-field">
                                            <input onChange={(e) => setExpiryTime(e.target.value)} type="date" id="start" name="trip-start"
                                            min="2018-01-01" max="2018-12-31"></input>
                                        </div>
                                        <div className="form-field">
                                            <input onChange={(e)=>setTitle(e.target.value?e.target.value[0].toUpperCase()+e.target.value.substring(1):"")} type="text" placeholder="Başlık" required pattern="[a-zA-Z]+" title="Name can only contain letters."/>
                                        </div>
                                        <div className="form-field">
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Açıklama</label>
                                                <textarea onChange={(e)=>setDescription(e.target.value?e.target.value[0].toUpperCase()+e.target.value.substring(1):"")} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input onChange={(e)=>setUrgency(e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Aciliyet</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input onChange={(e)=>setPriority(e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Öncelik</label>
                                        </div>
                                        <div className="mb-3">
                                            <input onChange={(e)=>setDocument(e.target.files[0])} className="form-control" type="file" id="formFile"/>
                                        </div>
                                    </div>
                                    <div className="form-buttons">
                                        <button className="button">Oluştur</button>
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
  
export default connect(mapStateToProps)(CreateTask);