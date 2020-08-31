import React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as studentActions from "../../infoStudent/studentActions";
import {bindActionCreators} from "redux";
import * as registerActions from "../../registerStudents/registerActions";
import {
    confirm,
    dotNumber,
    showErrorNotification,
    showNotification,
    showWarningNotification
} from "../../../helpers/helper";
import ListClass from "../../registerStudents/ListClass";
import {Modal, Overlay} from 'react-bootstrap';
import {deleteRegisterStudent} from "../../registerStudents/registerStudentsApi";
import {DATE_VN_FORMAT} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import FormInputText from "../../../components/common/FormInputText";
import moment from 'moment';

// import {showNotification} from "../../../../helpers/helper";

class RegisterActionsOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            isLoading: false,
            isRefunding: false,
            showModalChangeClass: false,
            showModalRefund: false,
            callStatus: 1,
            page: 1,
            note: '',
            appointmentPayment: '',
            dateTest: '',
            // currentRegister: {}
        };
        this.state = this.initState;
    }

    toggle = () => {
        this.setState({show: !this.state.show,});
    };

    changeCallStatus = (callStatus) => {
        this.setState({callStatus});
    };

    close = () => {
        let {showModalChangeClass, showModalRefund} = this.state;
        this.setState({
            ...this.initState,
            showModalChangeClass,
            showModalRefund,

        });
    };

    changeCallStatusStudent = () => {
        if (this.props.register && this.props.register.student) {
            let {studentId} = this.props.register.student.id;
            let {callStatus, note, appointmentPayment, dateTest} = this.state;
            this.props.studentActions.changeCallStatusStudent(
                callStatus,
                studentId,
                note,
                appointmentPayment,
                dateTest,
                this.close
            );
        }
    };


    openModalChangeClass = (registerId) => {
        this.setState({
            showModalChangeClass: true,
            selectRegisterId: registerId
        });
        this.props.registerActions.loadClasses(registerId);
    };
    closeModalChangeClass = () => {
        if (this.props.isChangingClass) return;
        this.setState({showModalChangeClass: false});
    };

    confirmChangeClass = (classData) => {
        this.props.registerActions.confirmChangeClass(this.state.selectRegisterId, classData.id, () => {
            this.closeModalChangeClass();
            this.reload();
        });
    };
    deleteRegisterStudent = (register) => {
        confirm('error', 'Xóa', "Bạn có muốn xóa đăng kí này không?", () => {
            if (this.refs.RegisterActionsOverlay) this.setState({isLoading: true});
            showWarningNotification('Đang xóa');
            deleteRegisterStudent(register.id).then(res => {
                if (res.data.status === 1) {
                    showNotification(res.data.data.message);
                    this.reload();
                } else {
                    showErrorNotification(res.data.data.message);
                }
            })
                .catch(() => {
                    showErrorNotification("Có lỗi xảy ra");
                }).finally(() => {
                if (this.refs.RegisterActionsOverlay) this.setState({isLoading: false});
                this.reload();
            });
        });
    };

    printNotiInvoice = (register) => {
        window.open("/noti-invoice/" + register.id, "_blank");
    };

    printInvoice = (register) => {
        window.open("/invoice/" + register.id, "_blank");
    };

    showModalRefund = (currentRegister) => {
        if (!currentRegister) return;
        if (!currentRegister.studyClass) return;
        let {total_lesson, passed_lesson} = {...currentRegister.studyClass};
        currentRegister.refundValue = 0;
        if (total_lesson > 0 && passed_lesson) {
            currentRegister.refundValue = Math.round(currentRegister.money / total_lesson * (total_lesson - passed_lesson));
        }
        if (total_lesson === 0 || passed_lesson === 0) {
            currentRegister.refundValue = currentRegister.money;
        }

        this.setState({showModalRefund: true, currentRegister: {...currentRegister}});
    };

    closeModalRefund = () => {
        this.setState({showModalRefund: false});
    };
    updateRefundRegisterMoney = (event) => {
        const {name, value} = event.target;
        let currentRegister = {...this.state.currentRegister};
        if (name == "refundValue") {
            if (!isNaN(Number(value.toString().replace(/\./g, "")))) {
                currentRegister[name] = Number(value.toString().replace(/\./g, ""));
            }
        } else {
            currentRegister[name] = value;
        }
        this.setState({currentRegister});
        $('#form-collect-money').validate({
            rules: {money: 'required'},
            messages: {'money': 'Vui lòng nhập số tiền!'}
        });
    };
    refundStudent = (value) => {
        let {currentRegister} = this.state;
        if (currentRegister && currentRegister.student) {
            if (!value) {
                showErrorNotification('Bạn chưa nhập học phí hoàn lại!');
                return;
            }
            let now = new moment().format(DATE_VN_FORMAT);

            let data = {
                value,
                student_id: currentRegister.student.id,
                register_id: currentRegister.id,
                note: `\nHoàn số tiền (${dotNumber(value)}đ) ngày ${now}`
            };
            this.props.studentActions.refundStudent(data, () => {
                this.closeModalRefund();
                this.reload();
            });
        }
    };

    reload = () => {
        if (this.props.reload) {
            this.props.reload();
        }

    };

    render() {
        let {isChangingStatusCall, register, isRefunding} = this.props;
        let {currentRegister,} = this.state;
        let refundable = register && register.money > 0;
        return (

            <div style={{position: "relative"}} className="" mask="register-actions" ref="RegisterActionsOverlay">
                <div ref="target" onClick={this.toggle}
                     className="flex flex-justify-content-center white-light-round"
                     disabled={isChangingStatusCall}>

                    <i className="material-icons">more_horiz</i>

                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" mask="register-actions" style={{
                        width: 150,
                        marginTop: 10,
                        left: -115,
                        // right:0
                    }}>
                        {refundable &&
                        <button type="button"
                                className="btn btn-white width-100"
                                onClick={() => this.showModalRefund(this.props.register)}>
                            Hoàn lại học phí
                        </button>}
                        {register && register.status < 3 &&
                        <button type="button"
                                className="btn btn-white width-100"
                                onClick={() => this.openModalChangeClass(register.id)}>
                            Đổi lớp
                        </button>}
                        {register && register.is_delete &&
                        <button type="button"
                                className="btn btn-white width-100"
                                onClick={() => this.deleteRegisterStudent(register)}>
                            Xóa
                        </button>
                        }

                        {
                            register && register.status > 0 &&
                            <button type="button"
                                    className="btn btn-white width-100"
                                    onClick={() => this.printNotiInvoice(register)}>
                                Thông báo học phí
                            </button>
                        }

                        {
                            register && register.status > 0 &&
                            <button type="button"
                                    className="btn btn-white width-100"
                                    onClick={() => this.printInvoice(register)}>
                                In phiếu thu
                            </button>
                        }

                    </div>
                </Overlay>
                <Modal show={this.state.showModalChangeClass}
                       onHide={this.closeModalChangeClass}
                       bsSize="large"
                >
                    <Modal.Header closeButton={!this.props.isChangingClass}>
                        <Modal.Title>Thay đổi lớp đăng kí</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <ListClass
                            classes={this.props.classes}
                            registerId={this.state.selectRegisterId}
                            confirmChangeClass={this.confirmChangeClass}
                            isChangingClass={this.props.isChangingClass}
                        />

                    </Modal.Body>
                </Modal>
                {currentRegister &&
                <Modal show={this.state.showModalRefund}>
                    <Modal.Header closeButton={!this.props.isRefunding}
                                  onHide={this.props.isRefunding ? '' : this.closeModalRefund}
                                  closeLabel="Đóng">
                        <Modal.Title>
                            <h5 className="text-center" style={{marginTop: -10}}><b>Hoàn lại học phí</b></h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isRefunding ? <Loading/>
                            : <div style={{paddingLeft: 20}}>
                                <div className="flex flex-space-between">
                                    <div>Học viên:</div>
                                    <div><b>{currentRegister.name}</b></div>
                                </div>
                                {currentRegister.course && <div className="flex flex-space-between">
                                    <div>Môn học:</div>
                                    <div><b>{currentRegister.course.name}</b></div>
                                </div>}
                                {currentRegister.studyClass && <div className="flex flex-space-between">
                                    <div>Lớp:</div>
                                    <div><b>{currentRegister.studyClass.name}</b></div>
                                </div>}
                                <div className="flex flex-space-between">
                                    <div>Học phí đã đóng:</div>
                                    <div><b>{dotNumber(currentRegister.money)}đ</b></div>
                                </div>
                                {currentRegister.studyClass && <div className="flex flex-space-between">
                                    <div>Tiến trình lớp:</div>
                                    <div>
                                        <b>{currentRegister.studyClass.passed_lesson || 0}/{currentRegister.studyClass.total_lesson || 0} buổi</b>
                                    </div>
                                </div>}
                                <hr/>
                                <div className="flex flex-space-between flex-align-items-center">
                                    <div>Học phí hoàn lại:</div>

                                    <div className="form-grey">
                                        <FormInputText
                                            name="refundValue"
                                            placeholder="Số tiền"
                                            value={dotNumber(currentRegister.refundValue)}
                                            required
                                            type="text"
                                            updateFormData={this.updateRefundRegisterMoney}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-end flex-align-items-center">
                                    <div className="margin-right-20 cursor-pointer"
                                         onClick={this.props.isRefunding ? '' : this.closeModalRefund}>
                                        <b>Hủy</b>
                                    </div>
                                    <div className="btn btn-success radius-8"
                                         onClick={() => this.refundStudent(currentRegister.refundValue)}>
                                        Hoàn lại {dotNumber(currentRegister.refundValue)}đ
                                    </div>

                                </div>
                            </div>}
                    </Modal.Body>
                </Modal>}
            </div>


        );
    }
}


RegisterActionsOverlay.propTypes = {
    historyCalls: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isChangingStatusCall: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        historyCalls: state.infoStudent.historyCalls,
        isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
        isRefunding: state.infoStudent.isRefunding,
        isChangingStatusCall: state.infoStudent.isChangingStatusCall,
        classes: state.registerStudents.classes,
        isLoadingClasses: state.registerStudents.isLoadingClasses,
        isChangingClass: state.registerStudents.isChangingClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),
        registerActions: bindActionCreators(registerActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterActionsOverlay);
