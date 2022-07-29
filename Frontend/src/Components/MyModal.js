import React from 'react';
import {connect} from 'react-redux';





const MyModal = (props) => {
    return(
        <div className="modal fade" data-bs-backdrop="static" id="TaskDetail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"></h5>
                        <button type="button"  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      
                    </div>
                    <div className="modal-footer">
                        <button  type="button" className="btn btn-primary">İndir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect()(MyModal);