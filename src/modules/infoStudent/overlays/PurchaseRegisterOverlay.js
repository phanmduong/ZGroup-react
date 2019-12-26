import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import FormInputDate from "../../../components/common/FormInputDate";
import * as studentActions from "../studentActions";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";

// import {showNotification} from "../../../../helpers/helper";

class PurchaseRegisterOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            isLoading: false,
            callStatus: 1,
            page: 1,
            note: '',
            appointmentPayment: '',
            dateTest: ''
        };
        this.state = this.initState;
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

    changeCallStatusStudent = () => {
        let {studentId} = this.props;
        let {callStatus, note, appointmentPayment, dateTest} = this.state;
        this.props.studentActions.changeCallStatusStudent(
            callStatus,
            studentId,
            note,
            appointmentPayment,
            dateTest,
            this.close
        );
    };

    render() {
        let {isChangingStatusCall} = this.props;
        return (

            <div style={{position: "relative"}} className="">
                <button className="btn btn-register-action" mask="money"
                        ref="target" onClick={this.toggle}
                        disabled={isChangingStatusCall || true}>
                    Học phí
                    <i className="material-icons">attach_money</i>

                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" mask="money" style={{
                        width: 300,
                        marginTop: 20
                    }}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <div><b>Cuộc gọi mới</b></div>
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {isChangingStatusCall ? <Loading/> :
                            <div>
                                <button type="button"
                                        className={
                                            "btn btn-success width-100 flex flex-space-between "
                                            + (this.state.callStatus == 0 ? "filter-white" : "")
                                        }
                                        onClick={() => this.changeCallStatus(1)}>
                                    Thành công
                                    <i className="material-icons">phone</i>
                                </button>
                                <button type="button"
                                        className={
                                            "btn btn-danger width-100 flex flex-space-between "
                                            + (this.state.callStatus == 1 ? "filter-white" : "")
                                        }
                                        onClick={() => this.changeCallStatus(0)}>
                                    Thất bại
                                    <i className="material-icons">call_end</i>
                                </button>
                                <div className="input-note-overlay">
                                <textarea type="text" className="form-control"
                                          placeholder="Ghi chú"
                                          value={this.state.note}
                                          onChange={(event) => this.setState({note: event.target.value})}/>
                                </div>
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
                            </div>

                        }
                        <div>
                            <button type="button"
                                    className="btn btn-success width-100 text-center"
                                    disabled={isChangingStatusCall}
                                    onClick={this.changeCallStatusStudent}>
                                Hoàn tất
                            </button>
                            <button type="button"
                                    disabled={isChangingStatusCall}
                                    className="btn btn-white width-100 text-center"
                                    data-dismiss="modal"
                                    onClick={this.close}>
                                Hủy
                            </button>
                        </div>
                    </div>
                </Overlay>
            </div>


        );
    }
}


PurchaseRegisterOverlay.propTypes = {
    historyCalls: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isChangingStatusCall: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseRegisterOverlay);
