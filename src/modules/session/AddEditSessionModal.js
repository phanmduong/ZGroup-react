import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import {connect} from "react-redux";
import *as sessionAction from "./sessionAction";
import Select from "react-select";
import FormInputDate from '../../components/common/FormInputDate';
import {TIME_FORMAT_H_M} from "../../constants/constants";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";

class AddEditSessionModal extends React.Component{
    constructor(props, context){
        super(props, context);
        this.updateSession = this.updateSession.bind(this);
        this.submit = this.submit.bind(this);
        this.changTemplateTypes = this.changTemplateTypes.bind(this);
        this.changTemplateTypes2 = this.changTemplateTypes2.bind(this);
    }
    updateSession(e){
        const field = e.target.name;
        let session = {
            ...this.props.sessionModal,
            [field]: e.target.value
        };
        this.props.sessionAction.handleSessionModal(session);
    }
    changTemplateTypes(value){
        let session = {
            ...this.props.sessionModal,
            film_id: value ? value.value : '',
        };
        this.props.sessionAction.handleSessionModal(session);
    }
    changTemplateTypes2(value){
        let session = {
            ...this.props.sessionModal,
            room_id: value ? value.value : '',
        };
        this.props.sessionAction.handleSessionModal(session);
    }
    submit(){
        const session = this.props.sessionModal;
        if (
            helper.isEmptyInput(session.film_id)
            ||helper.isEmptyInput(session.film_quality)
            ||helper.isEmptyInput(session.room_id)
            ||helper.isEmptyInput(session.start_time)
            ||helper.isEmptyInput(session.start_date)

        ){
            if(helper.isEmptyInput(session.film_id)) helper.showErrorNotification("Bạn cần chọn tên film");
            if(helper.isEmptyInput(session.film_quality)) helper.showErrorNotification("Bạn cần nhập chất lượng film");
            if(helper.isEmptyInput(session.room_id)) helper.showErrorNotification("Bạn cần chọn phòng chiếu");
            if(helper.isEmptyInput(session.start_time)) helper.showErrorNotification("Bạn cần chọn ngày chiếu");
            if(helper.isEmptyInput(session.start_date)) helper.showErrorNotification("Bạn cần chọn giờ chiếu");
        }
        else {
            if (session.id){
                this.props.sessionAction.editSession(session);
            }
            else this.props.sessionAction.saveSession(session);
        }
    }
    render(){
        let session = this.props.sessionModal;
        return(
            <Modal show={this.props.addEditSessionModal}
                   onHide={() => {
                       helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật", () => {
                           this.props.sessionAction.toggleSessionModal();
                       });

                   }}
            >
                <a onClick={() => this.props.sessionAction.toggleSessionModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Quản lý suất chiếu </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <div>
                            <div className="row">
                                <div className="col-md-6"><br/>
                                    <label className="label-control">Tên phim</label>
                                    <Select
                                        disabled={false}
                                        value={session.film_id || ''}
                                        options={this.props.allFilms.map  ((film) => {
                                            return {
                                                ...film,
                                                value: film.id,
                                                label: film.name
                                            };
                                        })}
                                        onChange={this.changTemplateTypes}

                                    />
                                </div>
                                <div className="col-md-6"><br/>
                                    <label className="label-control">Phòng</label>
                                    <Select
                                        // disabled={false}
                                        value={session.room_id || ''}
                                        options={[
                                            {
                                                value: 1,
                                                label: "Phòng 1"
                                            },
                                        ]}
                                        onChange={this.changTemplateTypes2}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"><br/>
                                    <FormInputDate
                                        label="Ngày chiếu"
                                        name="start_date"
                                        updateFormData={this.updateSession}
                                        value={session.start_date || ''}
                                        id="form-start-day"
                                    />
                                </div>
                                <div className="col-md-6"><br/>
                                    <FormInputDate
                                        label="Giờ chiếu"
                                        name="start_time"
                                        updateFormData={this.updateSession}
                                        value={session.start_time || ''}
                                        id="form-start-hour"
                                        format={TIME_FORMAT_H_M}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Chất lượng film</label>
                                <input type="text"
                                       name="film_quality"
                                       className="form-control"
                                       value={session.film_quality || ''}
                                       onChange={this.updateSession}/>
                                <span className="material-input"/>
                            </div>
                            {
                                this.props.isSavingSession ? <Loading/> :(
                                    <div style={{textAlign: "right"}}>
                                        <button rel="tooltip" data-placement="top"
                                                title=""
                                                data-original-title="Remove item"
                                                type="button"
                                                className="btn btn-rose"
                                                data-dismiss="modal"
                                                onClick={this.submit}
                                        >
                                            <i className="material-icons">check</i> Xác Nhận
                                        </button>
                                        &ensp;
                                        <button rel="tooltip" data-placement="top"
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
                                    )

                            }

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
AddEditSessionModal.propTypes = {
    addEditSessionModal: PropTypes.bool.isRequired,
    isSavingSession: PropTypes.bool.isRequired,
    sessionAction: PropTypes.object.isRequired,
    sessionModal: PropTypes.object.isRequired,
    allFilms: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
    return {
        addEditSessionModal: state.session.addEditSessionModal,
        isSavingSession: state.session.isSavingSession,
        sessionModal: state.session.sessionModal,
        allFilms: state.session.allFilms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators( sessionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditSessionModal);