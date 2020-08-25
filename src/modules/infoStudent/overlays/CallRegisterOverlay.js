import React from 'react';
import PropTypes from 'prop-types';
// import {Overlay} from "react-bootstrap";
import {Modal} from "react-bootstrap";
// import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import FormInputDate from "../../../components/common/FormInputDate";
import * as studentActions from "../studentActions";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL, STATUS_REFS} from "../../../constants/constants";
import moment from 'moment';
import {isEmpty} from "../../../helpers/entity/mobx";
import StatusesOverlay from "./StatusesOverlay";

// import {showNotification} from "../../../../helpers/helper";

class CallRegisterOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            showModal: false,
            isLoading: false,
            callStatus: 1,
            page: 1,
            note: '',
            appointmentPayment: '',
            dateTest: '',
            call_back_time: '',
            status_id: null,
        };
        this.state = this.initState;
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    toggle = () => {
        this.setState({show: !this.state.show});
    };

    changeCallStatus = (callStatus) => {
        this.setState({callStatus});
    };

    close = () => {
        this.setState(this.initState);
    };

    changeCallStatusStudent = (callStatus) => {
        let {student} = this.props;
        let {note, appointmentPayment, dateTest, status_id} = this.state;
        let call_back_time = (!isEmpty(this.state.call_back_time)) ? moment(this.state.call_back_time, DATETIME_FORMAT).format(DATETIME_FORMAT_SQL) : null;
        this.props.studentActions.changeCallStatusStudent(
            callStatus,
            student.id,
            note,
            appointmentPayment,
            dateTest,
            call_back_time,
            status_id,
            this.closeModal
        );
    };
    closeModal = () => {
        this.setState({showModal: false});
    };

    showModal = () => {
        this.setState({showModal: true});
    };

    render() {
        let {isChangingStatusCall, register,} = this.props;
        let style = {};
        let titleCall = 'Cuộc gọi mới';
        let textCall = 'Thêm cuộc gọi';
        if (register)
            if (register.call_status === 'success') {
                style.backgroundColor = '#4caf50';
                style.color = 'white';
                textCall = 'Gọi thành công';
                titleCall = 'Gọi thành công trong vòng ' + register.time_to_reach + 'h';
            } else if (register.call_status === 'failed') {
                style.backgroundColor = '#f44336';
                style.color = 'white';
                textCall = 'Gọi thất bại';
                titleCall = 'Gọi thất bại - Còn ' + register.time_to_reach + 'h';
            } else if (register.call_status === 'calling') {
                style.backgroundColor = '#ff9800';
                style.color = 'white';
                titleCall = 'Đang gọi';
                textCall = 'Đang gọi';
            } else {
                style.backgroundColor = '#F7F5F7';
                textCall = 'Chưa gọi';
                titleCall = 'Chưa gọi - Còn ' + register.time_to_reach + 'h';
            }

        return (
            <div style={{position: "relative"}} className="">
                <button className={"btn btn-actions"}
                        style={style}
                        onClick={this.showModal} mask="call"
                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                        data-original-title={titleCall}
                        disabled={isChangingStatusCall}>
                    {textCall}
                </button>
                {/*<Overlay*/}
                {/*    rootClose={true}*/}
                {/*    show={this.state.show}*/}
                {/*    onHide={this.close}*/}
                {/*    placement="bottom"*/}
                {/*    container={this}*/}
                {/*    target={() => ReactDOM.findDOMNode(this.refs.target)}>*/}
                {/*    <div className="kt-overlay overlay-container" style={{*/}
                {/*        width: 300,*/}
                {/*        top: 'unset',*/}
                {/*        marginTop: 10*/}
                {/*    }}>*/}
                {/*<div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>*/}
                {/*    <div><b>Cuộc gọi mới</b></div>*/}
                {/*    <button*/}
                {/*        onClick={this.close}*/}
                {/*        type="button" className="close"*/}
                {/*        style={{color: '#5a5a5a'}}>*/}
                {/*        <span aria-hidden="true">×</span>*/}
                {/*        <span className="sr-only">Close</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton={!isChangingStatusCall} closeplaceholder="Đóng">
                        <Modal.Title><b>Cuộc gọi mới</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {isChangingStatusCall ? <Loading/> :
                            <div className="form-grey">
                                <FormInputDate
                                    label="Hẹn nộp tiền"
                                    name="appointmentPayment"
                                    updateFormData={(event) => {
                                        this.setState({appointmentPayment: event.target.value});
                                    }}
                                    id="form-appointment_payment"
                                    value={this.state.appointmentPayment}
                                />
                                <FormInputDate
                                    label="Hẹn kiểm tra"
                                    name="dateTest"
                                    updateFormData={(event) => {
                                        this.setState({dateTest: event.target.value});
                                    }}
                                    id="form-date_test"
                                    value={this.state.dateTest}
                                />
                                <FormInputDateTime
                                    label="Hẹn gọi lại"
                                    name="call_back_time"
                                    updateFormData={(event) => {
                                        this.setState({call_back_time: event.target.value});
                                    }}
                                    id="form-call-back-time"
                                    value={this.state.call_back_time}
                                />
                                <label>Tag cuộc gọi</label>
                                <StatusesOverlay
                                    statusRef={STATUS_REFS.tele_calls}
                                    className="btn status-overlay width-100"
                                    styleWrapper={{padding: '10px 15px'}}
                                    styleOverlay={{
                                        marginTop: 25
                                    }}
                                    defaultText="No tag"
                                    viName="tag"
                                    onChange={(status) => {
                                        this.setState({status_id: status ? status.id : status});
                                    }}
                                />

                                <label>Ghi chú</label>
                                <div className="form-group text-area-grey">
                                <textarea type="text" className="form-control"
                                          placeholder="Nhập ghi chú"
                                          value={this.state.note}
                                          onChange={(event) => this.setState({note: event.target.value})}/>
                                </div>
                                <div>
                                    <div className="flex">
                                        <button type="button"
                                                className="btn btn-danger flex flex-space-between width-50-percent margin-right-10"
                                                onClick={() => this.changeCallStatusStudent(0)}>
                                            Thất bại
                                            <i className="material-icons">call_end</i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-success flex flex-space-between width-50-percent"
                                                style={{backgroundColor: '#2acc4c'}}
                                                onClick={() => this.changeCallStatusStudent(1)}>
                                            Thành công
                                            <i className="material-icons">phone</i>
                                        </button>
                                    </div>
                                    {/*<button type="button"*/}
                                    {/*        className="btn btn-success width-100 text-center"*/}
                                    {/*        disabled={isChangingStatusCall}*/}
                                    {/*        style={{backgroundColor:'#2acc4c'}}*/}
                                    {/*        onClick={this.changeCallStatusStudent}>*/}
                                    {/*    Hoàn tất*/}
                                    {/*</button>*/}
                                    <button type="button"
                                            disabled={isChangingStatusCall}
                                            className="btn btn-white width-100 text-center"
                                            data-dismiss="modal"
                                            onClick={this.close}>
                                        Hủy
                                    </button>
                                </div>
                            </div>

                        }

                    </Modal.Body>
                </Modal>
                {/*</div>*/}
                {/*</Overlay>*/}
            </div>


        );
    }
}


CallRegisterOverlay.propTypes = {
    historyCalls: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isChangingStatusCall: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
        historyCalls: state.infoStudent.historyCalls,
        isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
        isChangingStatusCall: state.infoStudent.isChangingStatusCall,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallRegisterOverlay);
