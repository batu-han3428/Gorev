import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import './CreateTask.css';
import swal from 'sweetalert';
import { get, post } from '../helpers/api';



const CreateTask = (props) => {

    const [appointedPersonnel, setAppointedPersonnel] = useState("DEFAULT");
    const [expiryTime, setExpiryTime] = useState(new Date().toISOString().slice(0, 10));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [urgency, setUrgency] = useState(false);
    const [priority, setPriority] = useState(false);
    const [documentName, setDocumentName] = useState("");
    const [documentBase64, setDocumentBase64] = useState("");
    const [employees, setEmployees] = useState([]);
    
    useEffect(()=>{
        setExpiryTime(new Date().toISOString().slice(0, 10))
        get('User/GetEmployees/','CompanyId',props.User.companyId)
        .then(resp=>{
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
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split("base64,")[1]);
            reader.onerror = error => reject(error);
        });
    }

    const clearInputs = () =>{
        setAppointedPersonnel("DEFAULT");
        setExpiryTime(new Date().toISOString().slice(0, 10));
        setTitle("");
        setDescription("");
        setUrgency(false);
        setPriority(false);
        setDocumentName("");
        setDocumentBase64("");
    }

    const createTask = () =>{
        if(inputControl())
            swal("Başlık, Açıklama, Atama ve Bitiş Zamanı zorunludur!", "", "warning");
        else{
            let value = {
                userId: appointedPersonnel, 
                title:title, 
                description:description, 
                urgency: urgency, 
                priority:priority, 
                constituent: props.User.userId,
                completionTime:expiryTime,
                documentDTOs:null
            };
            if(documentBase64 !== "")
                value.documentDTOs = [{
                    name:documentName,
                    data:documentBase64
                }]

            post('Task/CreateTask',
                value,props.User.token)
            .then(resp=>{
                if(resp === 200){
                    swal("Kayıt Başarılı", "", "success");
                    clearInputs()
                }
                else if(resp === 400)
                    swal("Beklenmeyen Bir Hata Oluştu", "", "error");
                else if(resp === 403)
                    swal("Yetkiniz Yok", "", "error");
                else
                    swal(resp.data, "", "error");
            })
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
                                <form action="" onSubmit={(e)=>e.preventDefault()}>
                                    <h1 className="form-title">
                                    Görev
                                    </h1>
                                    <div className="form-fields">
                                        <div className="form-field">
                                            <select onChange={(e) => setAppointedPersonnel(e.target.value)} defaultValue={appointedPersonnel} className="form-select" aria-label="Default select example">
                                                <option value="DEFAULT">Personel Ata</option>
                                                {employees.length > 0 && employees.map((item, index)=>{
                                                    return(
                                                        <option key={index} value={item.id}>{item.employeeName}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-field">
                                            <input value={expiryTime} onChange={(e) => setExpiryTime(e.target.value)} type="date" id="start" name="trip-start"
                                            ></input>
                                        </div>
                                        <div className="form-field">
                                            <input value={title} onChange={(e)=>setTitle(e.target.value?e.target.value[0].toUpperCase()+e.target.value.substring(1):"")} type="text" placeholder="Başlık" required pattern="[a-zA-Z]+" title="Name can only contain letters."/>
                                        </div>
                                        <div className="form-field">
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Açıklama</label>
                                                <textarea value={description} onChange={(e)=>setDescription(e.target.value?e.target.value[0].toUpperCase()+e.target.value.substring(1):"")} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                            </div>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input checked={urgency} onChange={(e)=>setUrgency(e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Aciliyet</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input checked={priority} onChange={(e)=>setPriority(e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Öncelik</label>
                                        </div>
                                        <div className="mb-3">
                                            <input onChange={(e)=>{setDocumentName(e.target.files[0].name); getBase64(e.target.files[0]).then(x=>setDocumentBase64(x))}} className="form-control" type="file" id="formFile"/>
                                        </div>
                                    </div>
                                    <div className="form-buttons">
                                        <button onClick={createTask} type="button" className="button">Oluştur</button>
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