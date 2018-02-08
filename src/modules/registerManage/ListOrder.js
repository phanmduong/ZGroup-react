import React from 'react';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';

// import {Link} from "react-router";
import {Modal} from 'react-bootstrap';
import CallModal from "./CallModal";
import {REGISTER_STATUS} from "../../constants/constants";
import TooltipButton from "../../components/common/TooltipButton";

import moment from "moment/moment";


class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpenModal: false,
            register: {},
            isOpenCallModal: false,
        };


        this.openCallModal = this.openCallModal.bind(this);
        this.closeCallModal = this.closeCallModal.bind(this);
    }

    openCallModal(register) {
        this.setState({isOpenCallModal: true, register: register});
    }

    closeCallModal() {
        this.setState({isOpenCallModal: false});
    }


    render() {
        // console.log(this.props.registers,"QQQQQQQQ");

        return (
            <div className="table-responsive">
                {
                    this.props.isLoading ? <Loading/> :
                        (
                            <table className="table table-hover">
                                <thead className="text-rose">
                                <tr>
                                    <th>Gọi</th>
                                    <th>Khách hàng</th>
                                    <th>Số điện thoại</th>
                                    <th>Mã đăng ký</th>
                                    <th>Saler</th>
                                    <th>Trạng thái</th>
                                    <th>Chiến dịch</th>
                                    <th>Giá tiền</th>
                                    <th>Tiền đã trả</th>
                                    <th>Đăng ký</th>
                                </tr>
                                </thead>
                                <tbody>

                                {this.props.registers.map((register) => {

                                    let btn = '';
                                    let titleCall = '';
                                    let expiredTime = Date.parse(moment(register.created_at, "HH:mm DD-MM-YYYY").add(1, 'days').format("HH:mm MM-DD-YYYY"));
                                    let firstCall = Date.parse(moment(register.teleCalls[0] && register.teleCalls[0].created_at, "HH:mm DD-MM-YYYY").format("HH:mm MM-DD-YYYY"));
                                    let presentTime = new Date();

                                    presentTime = Date.parse(presentTime);


                                    let call = register.teleCalls && register.teleCalls[register.teleCalls.length - 1];

                                    // console.log(expiredTime, Date.parse(register.teleCalls[0] && register.teleCalls[0].created_at),"sadasd");

                                    if (register.teleCalls.length > 0 && expiredTime > firstCall) {
                                        if (call.call_status === 1) {
                                            btn = ' btn-success';
                                            titleCall = 'Gọi thành công lúc ' + call.created_at;
                                        }
                                        else if (call.call_status === 0) {
                                            btn = ' btn-danger';
                                            titleCall = 'Gọi thất bại lúc ' + call.created_at;
                                        }
                                    }

                                    else {
                                        if (expiredTime >= presentTime) {
                                            btn = ' btn-default ';
                                            titleCall = ' Còn ' + Math.floor((expiredTime - presentTime) / 3600000) + ' h';
                                        }
                                        else {
                                            btn = ' btn-warning ';
                                            titleCall = ' Đã quá hạn ' + Math.floor((presentTime - expiredTime) / 3600000) + ' h';
                                        }
                                    }


                                    return (
                                        <tr key={register.id}>
                                            {/*<td>*/}
                                            {/*<div className="container-dot-bottom-right">*/}
                                            {/*<button className="btn btn-round btn-fab btn-fab-mini text-white"*/}
                                            {/*data-toggle="tooltip" title="" type="button" rel="tooltip"*/}
                                            {/*data-placement="right"*/}
                                            {/*// data-original-title={register.class.name}*/}
                                            {/*>*/}
                                            {/*<img*/}
                                            {/*src={register.subscription.user_pack.avatar_url}*/}
                                            {/*alt=""/>*/}
                                            {/*</button>*/}


                                            {/*<div className="dot-bottom-right"*/}
                                            {/*data-toggle="tooltip" title="" type="button" rel="tooltip"*/}
                                            {/*data-placement="right"*/}
                                            {/*data-original-title={'Học lần ' + register.study_time}>*/}
                                            {/*{register.study_time}*/}
                                            {/*</div>*/}


                                            {/*</div>*/}
                                            {/*</td>*/}
                                            <td>

                                                <div className="container-call-status">
                                                    <TooltipButton text={titleCall} placement="top">

                                                        <button
                                                            className={"btn btn-round " + btn + " full-width padding-left-right-10"}
                                                            onClick={() => this.openCallModal(register)}
                                                        >
                                                            <i className="material-icons">
                                                                phone
                                                            </i> {register.hour ? (register.hour + " h") : null}
                                                        </button>
                                                    </TooltipButton>
                                                </div>
                                            </td>
                                            <td>
                                                <a className="text-name-student-register">
                                                    {register.user.name}
                                                </a>
                                            </td>
                                            <td><a href={"tel:" + register.phone}
                                                   className="text-name-student-register">
                                                {register.user.phone ? helper.formatPhone(register.user.phone) : "Chưa có"}
                                            </a>
                                            </td>
                                            <td>
                                                {register.code || "Chưa có"}
                                            </td>
                                            <td>
                                                {register.staff ?
                                                    <a className="btn btn-xs btn-main"
                                                       onClick={(e) => {
                                                           this.props.filterByStaff(register.staff.id);
                                                           e.preventDefault();
                                                       }}
                                                       style={{backgroundColor: register.staff.color && register.staff.color}}
                                                    >{register.staff.name}
                                                    </a>
                                                    :
                                                    <a className="btn btn-xs btn-main disabled">Chưa có
                                                    </a>
                                                }
                                            </td>

                                            <td>
                                                {
                                                    register.status !== "" ?
                                                        (
                                                            <button
                                                                className={"btn btn-xs btn-main " + register.btnStatus}
                                                                style={{backgroundColor: '#' + "5BBD2B"}}
                                                            >
                                                                {REGISTER_STATUS.filter(status => status.value === register.status)[0].label}
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        )
                                                        :
                                                        (
                                                            <button className="btn btn-xs btn-main">
                                                                Chưa có
                                                            </button>
                                                        )
                                                }
                                            </td>

                                            <td>
                                                {register.campaign ?
                                                    <a className="btn btn-xs btn-main"
                                                       style={{backgroundColor: '#' + register.campaign.color}}
                                                       onClick={(e) => {
                                                           this.props.filterByCampaign(register.campaign.id);
                                                           e.preventDefault();
                                                       }}
                                                    >{register.campaign.name} {/*  deleete*/}
                                                    </a>
                                                    :
                                                    <a className="btn btn-xs btn-main disabled">Chưa có
                                                    </a>
                                                }
                                            </td>

                                            <td>
                                                {helper.dotNumber(register.subscription.price)}đ
                                            </td>
                                            <td>{helper.dotNumber(register.money)}đ</td>
                                            <td>{register.created_at}</td>

                                        </tr>
                                    );
                                })}

                                </tbody>


                            </table>

                        )
                }

                <Modal show={this.state.isOpenCallModal} bsStyle="primary" onHide={this.closeCallModal}>
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <CallModal
                            register={this.state.register}
                            closeCallModal={this.closeCallModal}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ListOrder.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    registers: PropTypes.array.isRequired,
    filterByCampaign: PropTypes.func.isRequired,
    filterByStaff: PropTypes.func.isRequired,
};


export default ListOrder;
