import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import './MyModal.css';
import { Modal } from 'bootstrap';
import $ from 'jquery';


const MyModal = (props) => {

    const [assigned, setAssigned] = useState("");
    const [completionTime, setCompletionTime] = useState("");
    const [constituent, setConstituent] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [priority, setPriority] = useState("");
    const [title, setTitle] = useState("");
    const [urgency, setUrgency] = useState("");
    const [documentName, setDocumentName] = useState("");
    const [documentData, setDocumentData] = useState("");



    useEffect(()=>{

        if(props.Modal.length > 0){
            setTitle(props.Modal[0].title);
            setAssigned(props.Modal[0].assigned);
            setCompletionTime(props.Modal[0].completionTime);
            setConstituent(props.Modal[0].constituent);
            setDescription(props.Modal[0].description);
            setPriority(props.Modal[0].priority);
            setUrgency(props.Modal[0].urgency);

            if(props.Modal[0].documentViewModels.length > 0){
                setDocumentName(props.Modal[0].documentViewModels[0].name)
                setDocumentData(props.Modal[0].documentViewModels[0].data)

                document.getElementById('dowload-file').href = "data:application/text/x-uri;base64,"+props.Modal[0].documentViewModels[0].data;

            }
        }
       
    },[props])

    const modalHide = () =>{
        var myModalEl = document.getElementById('TaskDetail');
        var modal = Modal.getInstance(myModalEl)
        $("#TaskDetail").removeClass("in");
        $(".modal-backdrop").remove();
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '');
        modal.hide();
    }

    return(
        <div className="modal fade"  id="TaskDetail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"></h5>
                        <i style={{cursor:"pointer", fontSize:"25px"}} onClick={()=>modalHide()} className="fas fa-window-close"></i>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="content">
                                <div className="add-new-note">
                                    <div className="new-note">
                                        <h5 align="center" name="head-of-note" className="new-text">{title}</h5>           
                                    </div>                                   
                                </div>
                                <div className="new-note-detail">
                                    <div className='header-note-detail'>
                                        <div className="persons">
                                            <div className='persons-assigned'>
                                                <i className="fas fa-male"></i>     
                                                <span className="deadline-text">    Atanan Kişi</span>
                                                <div className="deadline-date-time"> 
                                                    <span>{assigned}</span>
                                                </div>
                                            </div>
                                            <div className='persons-constituent'>
                                                <i className="fas fa-male"></i>        
                                                <span className="deadline-text">    Atayan Kişi</span>
                                                <div className="deadline-date-time"> 
                                                    <span>{constituent}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="deadline">
                                            <i className="far fa-calendar-alt"></i>        
                                            <span className="deadline-text">Görevin Bitiş Tarihi</span>
                                            <div className="deadline-date-time">                            
                                                <input onChange={(e) => setCompletionTime(e.target.value)} onKeyDown={(e)=>{return false}} value={new Date(`${completionTime !== ""?completionTime:"2011-04-11T10:20:30Z"}`).toISOString().slice(0, 10)} type="date" name="date" className="time-input" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="note-situation">
                                        <div className="form-check form-switch" style={{margin:"10px"}}>
                                            <input checked={urgency} onChange={(e)=>setUrgency(e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Aciliyet</label>
                                        </div>
                                        <div style={{margin:"10px"}} className="form-check form-switch">
                                            <input checked={priority} onChange={(e)=>setPriority(e.target.checked)} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Öncelik</label>
                                        </div>
                                    </div>    
                                    <div className="comment-note">
                                        <div className="comment">
                                            <i style={{marginLeft:"27px"}} className="far fa-comment-dots"></i>
                                            <span>  Açıklama</span>
                                            <div className="comment-area">
                                                <textarea disabled defaultValue={description} className="comment-textarea"></textarea>
                                            </div>
                                        </div>
                                    </div>       
                                    <div className="upload-file">
                                        <div className="upload">
                                            <i className="far fa-file"></i>
                                            <span>File</span>
                                        </div>
                                        <div id='fileDowload'>
                                            <a id='dowload-file' href="" download={documentName}>{documentName}</a>
                                        </div>
                                    </div>                                                           
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (store) =>{     
    return {
        Modal:store.modalBilgileri || null
    }
  }
  
export default connect(mapStateToProps)(MyModal);