import moment from "moment";
/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import * as helper from '../../../helpers/helper';
import {dotNumber, showErrorNotification} from '../../../helpers/helper';
import PropTypes from 'prop-types';
import CallRegisterOverlay from "../overlays/CallRegisterOverlay";
import ExtraRegisterOverlay from "../overlays/ExtraRegisterOverlay";
import ChangePassword from "../ChangePassword";
import {Modal} from 'react-bootstrap';
import MoneyRegisterOverlay from "../overlays/MoneyRegisterOverlay";
import StatusesOverlay from "../overlays/StatusesOverlay";
import SourceOverlay from "../overlays/SourceOverlay";
import CreateRegisterOverlay from "../overlays/CreateRegisterOverlay";
import CreateCouponOverlay from "../overlays/CreateCouponOverlay";
import EmptyData from "../../../components/common/EmptyData";
import FormInputText from "../../../components/common/FormInputText";
import {DATE_VN_FORMAT} from "../../../constants/constants";
import MarketingCampaignRegisterOverlay from "../../registerStudentsV3/overlays/MarketingCampaignRegisterOverlay";
import MarketingCampaignRegisterStore from "../../registerStudentsV3/store/MarketingCampaignRegisterStore";

class RegistersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentRegister: {},

        };
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;
        this.campaignStore = new MarketingCampaignRegisterStore();
    }

    componentWillMount() {
        this.props.studentActions.loadRegisters(this.studentId);
    }

    updateRefundRegisterMoney = (event) => {
        const {name, value} = event.target;
        console.log(name, value);
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

    closeModalChangePassword = () => {
        this.setState({showModalChangePassword: false});
    };

    closeModalRefund = () => {
        this.setState({showModalRefund: false});
    };

    showModalRefund = (currentRegister) => {
        let {total_lesson, total_lesson_done} = {...currentRegister};
        currentRegister.refundValue = 0;
        if (total_lesson > 0 && total_lesson_done) {
            currentRegister.refundValue = Math.round(currentRegister.money / total_lesson * (total_lesson - total_lesson_done));
        }
        if (total_lesson === 0 || total_lesson_done === 0) {
            currentRegister.refundValue = currentRegister.money;
        }
        this.setState({showModalRefund: true,currentRegister: {...currentRegister}});
    };

    openModalChangePassword = () => {
        this.setState({showModalChangePassword: true});
    };
    reload = () => {
        this.props.studentActions.loadRegisters(this.studentId);
    };

    refundStudent = (value) => {
        if(!value){
            showErrorNotification('Bạn chưa nhập học phí hoàn lại!');
            return ;
        }
            let {currentRegister} = this.state;
        let now = new moment().format(DATE_VN_FORMAT);

        let data = {
            value,
            student_id: currentRegister.student_id,
            register_id: currentRegister.id,
            note: `\nHoàn số tiền (${dotNumber(value)}đ) ngày ${now}`
        };
        this.props.studentActions.refundStudent(data, () => {
            this.closeModalRefund();
            this.reload();
        });
    };

    updateRegisterStudent = (register)=>{
        this.props.studentActions.setRegisterStudent(register);
    }

    render() {
        let {currentRegister} = this.state;
        let {isRefunding, student} = this.props;

        return (
            <div className="tab-pane active">


                {this.props.isLoadingRegisters ? <Loading/>
                    :
                    <ul className="timeline timeline-simple time-line-register">
                        <li className="timeline-inverted">
                            <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                <i className="material-icons">add</i>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <div className="flex flex-align-items-center margin-top-5">
                                        <CreateRegisterOverlay
                                            className="btn btn-actions"
                                            onSuccess={() => this.props.studentActions.loadRegisters(this.props.student.id)}
                                        />
                                        <CreateCouponOverlay
                                            className="btn btn-actions"
                                        />
                                        <ExtraRegisterOverlay
                                            openModalChangePassword={this.openModalChangePassword}
                                            studentId={student.id}
                                        />
                                    </div>
                                </div>
                                <div className="timeline-body margin-vertical-30"/>

                            </div>
                        </li>
                        {
                            this.props.registers && this.props.registers.length > 0 ? this.props.registers.map((register, index) => {

                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <div className="timeline-badge">
                                            <img className="circle" src={register.class.avatar_url} alt=""/>
                                        </div>
                                        <div className="timeline-panel">
                                            <div className="">
                                                <h4>
                                                    <a className="color-black" target="_blank"
                                                       href={`/teaching/class/${register.class.id}`}><b>{register.class.name}</b></a>
                                                </h4>
                                                <div className="timeline-heading">
                                                    <div className="flex-row-center flex-wrap">
                                                        {
                                                            register.saler ?
                                                                <button className="btn btn-xs"
                                                                        data-toggle="tooltip"
                                                                        rel="tooltip"
                                                                        data-original-title="Nhân viên sale"
                                                                        style={{backgroundColor: '#' + register.saler.color}}
                                                                >
                                                                    {helper.getShortName(register.saler.name)}
                                                                    <div className="ripple-container"/>
                                                                </button>
                                                                :
                                                                (
                                                                    <div className="btn btn-xs"
                                                                    >
                                                                        No saler
                                                                        <div className="ripple-container"/>
                                                                    </div>
                                                                )
                                                        }
                                                        {/*{*/}
                                                        {/*    register.campaign ?*/}
                                                        {/*        <button className="btn btn-xs"*/}
                                                        {/*                data-toggle="tooltip"*/}
                                                        {/*                rel="tooltip"*/}
                                                        {/*                data-original-title="Chiến dịch"*/}
                                                        {/*                style={{backgroundColor: '#' + register.campaign.color}}*/}
                                                        {/*        >*/}
                                                        {/*            {helper.getShortName(register.campaign.name)}*/}
                                                        {/*            <div className="ripple-container"/>*/}
                                                        {/*        </button>*/}
                                                        {/*        : (*/}
                                                        {/*            <button className="btn btn-xs">*/}
                                                        {/*                No campaign*/}
                                                        {/*                <div className="ripple-container"/>*/}
                                                        {/*            </button>*/}
                                                        {/*        )*/}
                                                        {/*}*/}
                                                        <MarketingCampaignRegisterOverlay
                                                            register={{...register, campaign_id: register.campaign ? register.campaign.id : null}}
                                                            store={this.campaignStore}
                                                            className="btn status-overlay btn-xs"
                                                            updateInfoRegister={this.updateRegisterStudent}
                                                        />
                                                        <SourceOverlay
                                                            className="btn status-overlay btn-xs"
                                                            student={register}
                                                        />
                                                        <StatusesOverlay
                                                            data={register.register_status || {}}
                                                            refId={register.id}
                                                            statusRef="registers"
                                                            className="btn status-overlay btn-xs"
                                                        />
                                                        {/*{*/}
                                                        {/*    register.paid_status ?*/}
                                                        {/*        (*/}
                                                        {/*            <button className="btn btn-xs btn-rose"*/}
                                                        {/*                    style={{width: '70px'}}*/}
                                                        {/*            >*/}
                                                        {/*                {register.money}*/}
                                                        {/*                <div className="ripple-container"/>*/}
                                                        {/*            </button>*/}
                                                        {/*        )*/}
                                                        {/*        :*/}
                                                        {/*        (*/}
                                                        {/*            <button className="btn btn-xs btn-rose"*/}
                                                        {/*            >*/}
                                                        {/*                Chưa đóng*/}
                                                        {/*                <div className="ripple-container"/>*/}
                                                        {/*            </button>*/}
                                                        {/*        )*/}
                                                        {/*}*/}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;Đăng kí {register.created_at_cal}
                                                </div>
                                                {register.paid_status && register.paid_time && <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;Đã nộp tiền {register.paid_time}
                                                </div>}
                                                {register.paid_status && register.actual_input_at && <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;Ngày thực nhận học phí {register.actual_input_at}
                                                </div>}
                                                {register.class.study_time && <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;{register.class.study_time}
                                                </div>}
                                                {register.class.base && <div className="flex-row-center">
                                                    <i className="material-icons">home</i>&nbsp; &nbsp;
                                                    {register.class.room && register.class.room + ' - '}
                                                    {register.class.base}
                                                </div>}
                                                {register.class.description && <div className="flex-row-center">
                                                    <i className="material-icons">date_range</i>&nbsp; &nbsp;{register.class.description}
                                                </div>}

                                                {register.code && <div className="flex-row-center">
                                                    <i className="material-icons">gradient</i>
                                                    &nbsp; &nbsp;Mã học viên {register.code}
                                                </div>}
                                                {register.note &&
                                                <div>
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">create</i>&nbsp; &nbsp;
                                                        <div
                                                            //eslint-disable-next-line
                                                            dangerouslySetInnerHTML={{__html: register.note.replace(/\n/g,"<br />")}}/>
                                                    </div>
                                                </div>
                                                }


                                                <div>
                                                    <div className="flex-row-center flex-align-items-center">
                                                        <i className="material-icons">book</i>&nbsp; &nbsp;{
                                                        register.received_book_at ?
                                                            `Đã nhận giáo trình ngày ${register.received_book_at}`
                                                            :
                                                            'Chưa nhận giáo trình'
                                                    }
                                                    </div>
                                                </div>


                                                {
                                                    register.class.teach &&
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">account_box
                                                        </i>&nbsp; &nbsp; Giảng viên: {register.class.teach.name}
                                                    </div>
                                                }
                                                {
                                                    register.class.assist &&
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">account_box
                                                        </i>&nbsp; &nbsp; Trợ giảng: {register.class.assist.name}
                                                    </div>
                                                }
                                                <div className="flex flex-wrap margin-vertical-30">
                                                    <CallRegisterOverlay
                                                        studentId={this.studentId}
                                                        register={register}
                                                    />

                                                    <MoneyRegisterOverlay
                                                        studentId={this.studentId}
                                                        register={register}
                                                        reload={this.reload}
                                                    />
                                                    <ExtraRegisterOverlay
                                                        openModalRefund={() => this.showModalRefund({...register})}
                                                        register={{...register}}
                                                        studentId={this.studentId}
                                                        reload={this.reload}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                );
                            }) : <EmptyData title={"Không có dữ liệu đăng kí học"}/>
                        }
                    </ul>
                }
                <Modal show={this.state.showModalChangePassword}>
                    <Modal.Header closeButton={!this.props.isChangingPassword}
                                  onHide={this.props.isChangingPassword ? '' : this.closeModalChangePassword}
                                  closeLabel="Đóng">
                        <Modal.Title>
                            <div className="text-center">Thay đổi mật khẩu</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ChangePassword
                            studentId={this.studentId}
                            closeModal={this.closeModalChangePassword}
                        />
                    </Modal.Body>
                </Modal>
                {currentRegister.class && <Modal show={this.state.showModalRefund}>
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
                                <div className="flex flex-space-between">
                                    <div>Môn học:</div>
                                    <div><b>{currentRegister.class.name}</b></div>
                                </div>
                                <div className="flex flex-space-between">
                                    <div>Lớp:</div>
                                    <div><b>{currentRegister.class.name}</b></div>
                                </div>
                                <div className="flex flex-space-between">
                                    <div>Học phí đã đóng:</div>
                                    <div><b>{dotNumber(currentRegister.money)}đ</b></div>
                                </div>
                                <div className="flex flex-space-between">
                                    <div>Tiến trình lớp:</div>
                                    <div><b>{currentRegister.total_lesson_done}/{currentRegister.total_lesson} buổi</b>
                                    </div>
                                </div>
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

RegistersContainer.propTypes = {
    registers: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingRegisters: PropTypes.bool.isRequired,
    isRefunding: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
        registers: state.infoStudent.registers,
        isChangingPassword: state.infoStudent.isChangingPassword,
        isLoadingRegisters: state.infoStudent.isLoadingRegisters,
        isRefunding: state.infoStudent.isRefunding,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistersContainer);
