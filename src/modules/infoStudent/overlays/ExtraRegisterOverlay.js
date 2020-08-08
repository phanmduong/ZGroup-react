import React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as studentActions from "../studentActions";
import {bindActionCreators} from "redux";
import * as registerActions from "../../registerStudents/registerActions";
import * as helper from "../../../helpers/helper";
import {showErrorNotification, showNotification, showWarningNotification} from "../../../helpers/helper";
import ListClass from "../../registerStudents/ListClass";
import {Modal, Overlay} from 'react-bootstrap';
import {deleteRegisterStudent} from "../../registerStudents/registerStudentsApi";

// import {showNotification} from "../../../../helpers/helper";

class ExtraRegisterOverlay extends React.Component {
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

    addMyLead = (userID) => {
        let {registerActions, reload} = this.props;
        registerActions.uploadDistributionLead(userID, reload ? reload : () => {
        });
    };

    changeStatusPause = (register) => {
        helper.confirm('warning', 'Bảo lưu', `Bạn có muốn cho học viên ${register.name} của lớp ${register.class.name}  thực hiện bảo lưu không?`, () => {
            this.props.registerActions.changeStatusPause(register.id);
        });
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
        this.props.registerActions.confirmChangeClass(this.state.selectRegisterId, classData.id, this.closeModalChangeClass);
    };
    deleteRegisterStudent = (register) => {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa đăng kí này không?", () => {
            if (this.refs.extraRegisterOverlay) this.setState({isLoading: true});
            showWarningNotification('Đang xóa');
            deleteRegisterStudent(register.id).then(res => {
                if (res.data.status === 1) {
                    showNotification(res.data.data.message);
                    this.props.studentActions.loadRegisters(this.studentId);
                } else {
                    showErrorNotification(res.data.data.message);
                }
            })
                .catch(() => {
                    showErrorNotification("Có lỗi xảy ra");
                }).finally(() => {
                if (this.refs.extraRegisterOverlay) this.setState({isLoading: false});
                this.props.reload();
            });
        });
    };

    printNotiInvoice = (register) => {
        window.open("/noti-invoice/" + register.id, "_blank");
    };

    printInvoice = (register) => {
        window.open("/invoice/" + register.id, "_blank");
    };

    render() {
        let {isChangingStatusCall, register} = this.props;
        // let {isLoading} = this.state;
        let refundable = register && register.money > 0 ;
        if(register)console.log(refundable, this.props.openModalRefund,register.money ,register.total_lesson_done,register.total_lesson);
        return (

            <div style={{position: "relative"}} className="" ref="extraRegisterOverlay">
                <button className="btn btn-actions" mask="extra"
                        ref="target" onClick={this.toggle}
                        disabled={isChangingStatusCall}>

                    <i className="material-icons">arrow_drop_down</i>

                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" mask="extra" style={{
                        width: 150,
                        marginTop: 10,
                        left: 0,
                        // right:0
                    }}>
                        {this.props.openModalRefund && register && refundable &&
                        <button type="button"
                                className="btn btn-white width-100"
                                onClick={this.props.openModalRefund}>
                            Hoàn lại học phí
                        </button>}
                        {this.props.openModalChangePassword &&
                        <button type="button"
                                className="btn btn-white width-100"
                                disabled={isChangingStatusCall}
                                onClick={this.props.openModalChangePassword}>
                            Thay đổi mật khẩu
                        </button>}
                        {register && //register.status < 3 &&
                        <button type="button"
                                className="btn btn-white width-100"
                                onClick={() => this.openModalChangeClass(register.id)}>
                            Đổi lớp
                        </button>
                        }
                        {/*{register && register.status <= 4 &&*/}
                        {/*<button type="button"*/}
                        {/*        className="btn btn-white width-100"*/}
                        {/*        onClick={() => this.openModalChangeClass(register.id*/}
                        {/*            // , (register.status == 3 || register.status == 2)*/}
                        {/*        )}>*/}
                        {/*    {register.status == 3 ? "Học lại" : "Đổi lớp"}*/}
                        {/*</button>*/}
                        {/*}*/}

                        {/*{register && register.status == 1 &&*/}
                        {/*<button type="button"*/}
                        {/*        className="btn btn-white width-100"*/}
                        {/*        onClick={() => this.changeStatusPause(register)}>*/}
                        {/*    Bảo lưu*/}
                        {/*</button>*/}
                        {/*}*/}
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

                        {/*{register && !register.has_in_lead &&*/}
                        {/*<button type="button"*/}
                        {/*        className="btn btn-white width-100 "*/}
                        {/*        onClick={() => this.addMyLead(studentId)}>*/}
                        {/*    Thêm vào lead*/}
                        {/*</button>*/}
                        {/*}*/}


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
            </div>


        );
    }
}


ExtraRegisterOverlay.propTypes = {
    historyCalls: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isChangingStatusCall: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        classes: state.registerStudents.classes,
        historyCalls: state.infoStudent.historyCalls,
        isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
        isLoadingClasses: state.registerStudents.isLoadingClasses,
        isChangingClass: state.registerStudents.isChangingClass,
        isChangingStatusCall: state.infoStudent.isChangingStatusCall,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),
        registerActions: bindActionCreators(registerActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtraRegisterOverlay);
