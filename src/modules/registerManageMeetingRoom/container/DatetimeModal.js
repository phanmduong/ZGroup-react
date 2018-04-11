import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import {DATETIME_FORMAT_SQL} from "../../../constants/constants";
import FormInputDateTime from "../../../components/common/FormInputDateTime";

class DatetimeModal extends React.Component {
    constructor(context, props) {
        super(context, props);
        this.updateOfficialTime = this.updateOfficialTime.bind(this);
        this.closeDatetimeModal = this.closeDatetimeModal.bind(this);
    }

    closeDatetimeModal() {
        this.props.registerManageMeetingRoomAction.closeDatetimeModal();
    }

    updateOfficialTime(event) {
        const field = event.target.name;
        let register = {...this.props.register};
        register[field] = event.target.value;
        this.props.registerManageMeetingRoomAction.updateRegister(register);
    }

    saveOfficialTime(e) {
        this.props.registerManageMeetingRoomAction.saveOfficialTime(this.closeDatetimeModal);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.isOpenDatetimeModal}
                    bsStyle="primary"
                    onHide={this.closeDatetimeModal}
                >
                    <Modal.Header/>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-6">
                                <FormInputDateTime
                                    format={DATETIME_FORMAT_SQL}
                                    name="official_start_time"
                                    id="official_start_time"
                                    label="Từ ngày"
                                    value={this.props.register.official_start_time}
                                    updateFormData={this.updateOfficialTime}
                                    maxDate={this.props.register.official_end_time}
                                />
                            </div>
                            <div className="col-md-6">

                                <FormInputDateTime
                                    format={DATETIME_FORMAT_SQL}
                                    name="official_end_time"
                                    id="official_end_time"
                                    label="Đến ngày"
                                    value={this.props.register.official_end_time}
                                    updateFormData={this.updateOfficialTime}
                                    minDate={this.props.register.official_start_time}
                                />
                            </div>
                        </div>
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            {this.props.isChangingOfficialTime ?
                                (
                                    <button className="btn btn-fill btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin disabled"/>
                                        {' Đang sửa'}
                                    </button>
                                )
                                :
                                (
                                    <button className="btn btn-fill btn-rose" type="button"
                                            onClick={(e) => {
                                                this.saveOfficialTime(e);
                                            }}>
                                        <i className="material-icons">save</i>
                                        {' Lưu'}
                                    </button>
                                )
                            }

                            <Button
                                data-dismiss="modal"
                                onClick={() => {
                                    this.closeDatetimeModal();
                                }}>
                                <i className="material-icons">close</i>
                                Hủy
                            </Button>
                        </div>

                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

DatetimeModal.propTypes = {
    register: PropTypes.object.isRequired,
    isOpenDatetimeModal: PropTypes.bool.isRequired,
    isChangingOfficialTime: PropTypes.bool.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isOpenDatetimeModal: state.registerManageMeetingRoom.isOpenDatetimeModal,
        register: state.registerManageMeetingRoom.register,
        isChangingOfficialTime: state.registerManageMeetingRoom.isChangingOfficialTime,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageMeetingRoomAction: bindActionCreators(
            registerManageMeetingRoomAction,
            dispatch,
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    DatetimeModal
);
