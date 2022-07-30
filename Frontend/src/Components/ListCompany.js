import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import swal from 'sweetalert';
import { getnoquery } from '../helpers/api';
import $ from "jquery";
import DataTable from 'datatables';
import MyModal from './MyModal';
import { Modal } from 'bootstrap'
import { Link } from "react-router-dom";
import Axios from 'axios';


const ListCompany = (props) => {
    useEffect(()=>{
        getnoquery('Company/ListComapny/', props.User.token)
        .then(resp=>{        
            console.log(resp)  
          if(resp !== undefined && resp !== null && resp.length !== 0){
                let mytable = $('#myTable').DataTable({
                    "bDestroy": true,
                    data:[...resp],
                    columns: [
                        { "data": "id" },
                        { "data": "name" },
                        { "data": ""}
                    ],
                    "columnDefs": [
                        {
                          "targets": 2,
                          "render": function ( data, type, full, meta ) {
                            return '<button id="removeCompany" type="button" class="btn btn-outline-danger"><i class="fa fa-trash"></i></button>';
                          },
                        },
                      ] ,
                    rowId: 'Id'
                });

                $('#removeCompany').click(function(){
                    var td =  mytable.cell($(this).parents('td')).node();
                    console.log(td)
                    // post('Company/DeleteCompany',{Name:})
                    // .then(resp=>{
                    //   if(resp === 200){
                    //     let result = onLogin("AccessToken");
            
                });

            }else{
                $('#myTable').DataTable({
                    "bDestroy": true,
                    data:{},
                    columns: [
                        { "data": "id" },
                        { "data": "name" }
                    ]
                });
            }
        })
    },[])

   
    return(
        <main className="main-content border-radius-lg col-md-10 ms-auto" >  
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="mt-5 col-10 ">
                        <Link to="/createcompany"><button type="button" className="btn btn-outline-primary">Şirket Oluştur</button></Link>
                        <table id="myTable" className="display" style={{border:"1px solid grey"}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Şirket Adı</th>
                                    <th>Ayarlar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
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
  
export default connect(mapStateToProps)(ListCompany);