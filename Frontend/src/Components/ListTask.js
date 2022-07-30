import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import swal from 'sweetalert';
import { get, post } from '../helpers/api';
import $ from "jquery";
import DataTable from 'datatables';
import MyModal from './MyModal';
import { Modal } from 'bootstrap'
import { insertdata } from '../action/modal';



const ListTask = (props) => {

    const [id, setId] = useState(0);

    useEffect(()=>{
        get('Task/ListTask/','UserId',props.User.userId, props.User.token)
        .then(resp=>{          
          if(resp !== undefined && resp !== null && resp.length !== 0){
                props.dispatch(insertdata([...resp]))
                console.log(resp)
                $('#myTable').DataTable({
                    "bDestroy": true,
                    data:[...resp],
                    columns: [
                        { "data": "assigned" },
                        { "data": "title" },
                        { "data": "urgency" },
                        { "data": "priority" }
                    ],
                    rowId: 'id',
                    rowCallback: function(row, data, index) {
                        if (data.priority === true) {
                        $("td:eq(3)", row).html('Öncelikli')
                        $("td:eq(3)", row).parent().css({       
                            "background-color":"rgb(244, 222, 53)",
                            "color":"white"                 
                            });
                        } 
                        
                        if (data.priority === false) {
                            $("td:eq(3)", row).html('Öncelikli Değil')
                        }
                        
                        if (data.urgency === true) {
                            $("td:eq(2)", row).html('Acil')
                            $("td:eq(3)", row).parent().css({       
                                "background-color":"rgb(247, 54, 54)",
                                "color":"white"                 
                                });
                        }

                        if (data.urgency === false) {
                            $("td:eq(2)", row).html('Acil Değil')
                        }

                        if (data.urgency === true && data.priority === true) {
                            $("td:eq(2)", row).html('Acil')
                            $("td:eq(3)", row).parent().css({       
                                "background-image":"linear-gradient(160deg, rgb(232, 64, 64) 10%, rgb(234, 217, 84) 70%)",
                                "color":"white"                 
                                });
                        }

                    }
                });
                $("#myTable tr").css('cursor', 'pointer');
                
                $('#myTable tbody').on('click', 'tr', function (event) {
                    event.stopPropagation();
                   
                    setId($(this)[0].id)
                  
                    let myModal = new Modal(document.getElementById('TaskDetail'));
                    myModal.show();
                 
                });
            }else{
                $('#myTable').DataTable({
                    "bDestroy": true,
                    data:{},
                    columns: [
                        { "data": "assigned" },
                        { "data": "title" },
                        { "data": "urgency" },
                        { "data": "priority" }
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
                        <table id="myTable" className="display" style={{border:"1px solid grey"}}>
                            <thead>
                                <tr>
                                    <th>Atanmış Personel</th>
                                    <th>Başlık</th>
                                    <th>Aciliyet</th>
                                    <th>Önceliyet</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>         
            </div>
            <MyModal  id={id}/>
        </main>
    );
}

const mapStateToProps = (store) =>{     
    return {
        User:store.userBilgileri || null
    }
  }
  
export default connect(mapStateToProps)(ListTask);