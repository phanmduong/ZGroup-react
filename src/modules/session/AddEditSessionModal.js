import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import *as sessionAction from "./sessionAction";
import Select from "react-select";
import FormInputDate from '../../components/common/FormInputDate';
import {TIME_FORMAT_H_M} from "../../constants/constants";
// import Loading from "../../components/common/Loading";
// import * as helper from '../../helpers/helper';

class AddEditSessionModal extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state  ={
            gen: {
                day:'',
                hour:''
            },
        };

    }

    render(){

        return(
            <Modal show={this.props.addEditSessionModal}
                   onHide={() => this.props.sessionAction.toggleSessionModal()}
            >
                <a onClick={() => this.props.sessionAction.toggleSessionModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Quản lý suất chiếu </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="row">
                                <div className="col-md-6"><br/>
                                    <label className="label-control">Tên phim</label>
                                    <Select
                                        disabled={false}
                                        value=""
                                        options=""
                                        onChange=""
                                    />
                                </div>
                                <div className="col-md-6"><br/>
                                    <label className="label-control">Phòng</label>
                                    <Select
                                        disabled={false}
                                        value=""
                                        options=""
                                        onChange=""
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"><br/>
                                    <FormInputDate
                                        label="Ngày chiếu"
                                        name="day"
                                        updateFormData=""
                                        value={this.state.gen.day}
                                        id="form-start-day"
                                    />
                                </div>
                                <div className="col-md-6"><br/>
                                    <FormInputDate
                                        label="Giờ chiếu"
                                        name="hour"
                                        updateFormData=""
                                        value={this.state.gen.hour}
                                        id="form-start-hour"
                                        format={TIME_FORMAT_H_M}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Chất lượng film</label>
                                <input type="text"
                                       name="bank_name"
                                       className="form-control"
                                       value=""
                                       onChange=""/>
                                <span className="material-input"/>
                            </div>
                            <div style={{textAlign: "right"}}>
                                <button rel="tooltip" data-placement="top"
                                        title=""
                                        data-original-title="Remove item"
                                        type="button"
                                        className="btn btn-rose"
                                        data-dismiss="modal"
                                >
                                    <i className="material-icons">check</i> Duyệt
                                </button>
                                &ensp;
                                <button rel="tooltip" data-placement="toxp"
                                        title=""
                                        data-original-title="Remove item"
                                        type="button"
                                        className="btn"
                                        data-dismiss="modal"
                                        onClick={() => this.props.sessionAction.toggleSessionModal()}
                                >
                                    <i className="material-icons">close</i> Huỷ
                                </button>
                                &emsp;
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
AddEditSessionModal.propTypes = {
    addEditSessionModal: PropTypes.bool.isRequired,
    sessionAction: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
        addEditSessionModal: state.session.addEditSessionModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators( sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditSessionModal);