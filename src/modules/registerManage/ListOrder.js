import React from 'react';
// import ItemOrder from './ItemOrder';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import * as helper from '../../helpers/helper';

// import {Link} from "react-router";
import {Modal} from 'react-bootstrap';
import CallModal from "./CallModal";
import {REGISTER_STATUS} from "../../constants/constants";


class ListOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpenModal: false,
            register: {},
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(register) {
        this.setState({isOpenModal: true, register: register});
    }

    closeModal() {
        this.setState({isOpenModal: false});
    }

    render() {
        console.log(this.props.registers, "XXXXXXXX");
        return (
            <div className="table-responsive">
                {
                    this.props.isLoading ? <Loading/> :
                        (
                            <table className="table table-hover">
                                <thead className="text-rose">
                                <tr>
                                    <th/>
                                    <th>Mã đăng ký</th>
                                    <th>Tên gói</th>
                                    <th>Tên gói người dùng</th>
                                    <th>Khách hàng</th>
                                    <th>Gọi</th>
                                    <th>Số điện thoại</th>
                                    <th>Thời gian thuê</th>
                                    <th>Trạng thái</th>
                                    <th>Giá tiền</th>
                                    <th>Tiền đã trả</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.registers.map((register) => {
                                    // let btn = '';
                                    // let titleCall = 'Chưa gọi - Còn ' + register.time_to_reach + 'h';
                                    // if (register.call_status === 'success') {
                                    //     btn = ' btn-success';
                                    //     titleCall = 'Gọi thành công trong vòng ' + register.time_to_reach + 'h';
                                    // }
                                    // else if (register.call_status === 'failed') {
                                    //     btn = ' btn-danger';
                                    //     titleCall = 'Gọi thất bại - Còn ' + register.time_to_reach + 'h';
                                    // } else if (register.call_status === 'calling') {
                                    //     btn = ' btn-info';
                                    //     titleCall = 'Đang gọi';
                                    // }
                                    return (
                                        <tr key={register.id}>
                                            <td>
                                                <div className="container-dot-bottom-right">
                                                    <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                            data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                            data-placement="right"
                                                        // data-original-title={register.class.name}
                                                    >
                                                        <img
                                                            src={"http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"}
                                                            alt=""/>
                                                    </button>


                                                    {/*<div className="dot-bottom-right"*/}
                                                    {/*data-toggle="tooltip" title="" type="button" rel="tooltip"*/}
                                                    {/*data-placement="right"*/}
                                                    {/*data-original-title={'Học lần ' + register.study_time}>*/}
                                                    {/*{register.study_time}*/}
                                                    {/*</div>*/}


                                                </div>
                                            </td>


                                            {/*<td>*/}
                                            {/*<Link to={`/teaching/info-student/${register.student_id}`}*/}
                                            {/*className="text-name-student-register">*/}
                                            {/*{register.user.name}*/}
                                            {/*</Link>*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*<div id="register-email" data-toggle="tooltip" title=""*/}
                                            {/*type="button" rel="tooltip"*/}
                                            {/*data-original-title={register.email}>{register.email}</div>*/}
                                            {/*</td>*/}
                                            {/*<td><a href={"tel:" + register.phone}*/}
                                            {/*className="text-name-student-register">*/}
                                            {/*{helper.formatPhone(register.phone)}*/}
                                            {/*</a>*/}
                                            {/*</td>*/}
                                            <td>
                                                {register.code || "Chưa có"}
                                            </td>
                                            <td>{register.subscription.subscription_kind_name}</td>
                                            <td>{register.subscription.user_pack_name}</td>
                                            <td>
                                                <a className="text-name-student-register">
                                                    {register.user.name}
                                                </a>
                                            </td>


                                            <td>

                                                <div className="container-call-status">
                                                    <button
                                                        className={"btn btn-round btn-danger" + " full-width padding-left-right-10"}
                                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                        onClick={() => this.openModal(register)}
                                                    >
                                                        <i className="material-icons">
                                                            phone
                                                        </i> {'4h'}
                                                        {/*{register.call_status !== 'calling' && (register.time_to_reach + 'h')}*/}
                                                    </button>
                                                </div>
                                            </td>


                                            <td><a href={"tel:" + register.phone}
                                                   className="text-name-student-register">
                                                {register.user.phone ? helper.formatPhone(register.user.phone) : "Chưa có"}
                                            </a>
                                            </td>
                                            <td>
                                                {register.subscription.hours}
                                            </td>
                                            <td>
                                                {
                                                    register.status !== "" ?
                                                        (
                                                            <button className="btn btn-xs btn-main"
                                                                    style={{backgroundColor: '#' + "5BBD2B"}}
                                                                    // style={{backgroundColor: '#' + register.campaign.color}}
                                                            >
                                                                {REGISTER_STATUS.filter(status => status.value === register.status)[0].label}
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        )
                                                        :
                                                        (
                                                            <button className="btn btn-xs btn-main no-data">
                                                                Chưa có trạng thái
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        )
                                                }
                                            </td>
                                            <td className="text-center">
                                                {helper.dotNumber(register.subscription.price)}đ
                                            </td>
                                            <td>{helper.dotNumber(register.money)}đ</td>
                                            <td>
                                                <ButtonGroupAction
                                                    disabledEdit={!(register.editable && register.paid_status)}
                                                    edit={(obj) => {
                                                        return this.props.openModalChangeInfoStudent(obj);
                                                    }}
                                                    delete={this.props.deleteRegister}
                                                    object={register}
                                                    disabledDelete={!register.is_delete}>
                                                    <a data-toggle="tooltip" title="Đổi lớp"
                                                       onClick={() => this.props.openModalChangeClass(register.id)}
                                                       type="button"
                                                       rel="tooltip">
                                                        <i className="material-icons">swap_vertical_circle</i>
                                                    </a>
                                                </ButtonGroupAction>
                                            </td>
                                        </tr>
                                    );
                                })}

                                </tbody>


                                {/*<tbody>*/}
                                {/*{*/}
                                {/*this.props.registers.map((register, index) => {*/}
                                {/*return (*/}
                                {/*<ItemOrder register={register} key={index}*/}
                                {/*/>*/}
                                {/*);*/}
                                {/*})*/}
                                {/*}*/}
                                {/*</tbody>*/}


                            </table>




                            // <table id="datatables"
                            // className="table table-striped table-no-bordered table-hover"
                            // cellSpacing="0" width="100%" style={{width: "100%"}}>
                            // <thead className="text-rose">
                            // <tr>
                            // <th>Lớp</th>
                            // <th>Gọi</th>
                            // <th>Họ tên</th>
                            // <th>Email</th>
                            // <th>Phone</th>
                            // <th>Mã thẻ</th>
                            // <th>Saler</th>
                            // <th>Chiến dịch</th>
                            // <th>Học phí</th>
                            // <th>Đăng kí</th>
                            // <th/>
                            // </tr>
                            // </thead>
                            // <tbody>
                            // {this.props.registers.map((register) => {
                            //     let btn = '';
                            //     let titleCall = 'Chưa gọi - Còn ' + register.time_to_reach + 'h';
                            //     if (register.call_status === 'success') {
                            //         btn = ' btn-success';
                            //         titleCall = 'Gọi thành công trong vòng ' + register.time_to_reach + 'h';
                            //     }
                            //     else if (register.call_status === 'failed') {
                            //         btn = ' btn-danger';
                            //         titleCall = 'Gọi thất bại - Còn ' + register.time_to_reach + 'h';
                            //     } else if (register.call_status === 'calling') {
                            //         btn = ' btn-info';
                            //         titleCall = 'Đang gọi';
                            //     }
                            //     return (
                            //         <tr key={register.id}>
                            //             <td>
                            //                 <div className="container-dot-bottom-right">
                            //                     <button className="btn btn-round btn-fab btn-fab-mini text-white"
                            //                             data-toggle="tooltip" title="" type="button" rel="tooltip"
                            //                             data-placement="right"
                            //                             data-original-title={register.class.name}>
                            //                         <img src={register.course_avatar_url} alt=""/>
                            //                     </button>
                            //                     <div className="dot-bottom-right"
                            //                          data-toggle="tooltip" title="" type="button" rel="tooltip"
                            //                          data-placement="right"
                            //                          data-original-title={'Học lần ' + register.study_time}>
                            //                         {register.study_time}
                            //                     </div>
                            //                 </div>
                            //             </td>
                            //             <td>
                            //                 <div className="container-call-status">
                            //                     <button className={"btn btn-round " + btn + " full-width padding-left-right-10"}
                            //                             data-toggle="tooltip" title="" type="button" rel="tooltip"
                            //                             onClick={() => this.props.viewCall(register)}
                            //                             data-original-title={titleCall}>
                            //                         <i className="material-icons">
                            //                             phone
                            //                         </i> {register.call_status !== 'calling' && (register.time_to_reach + 'h')}
                            //                     </button>
                            //
                            //                 </div>
                            //             </td>
                            //             <td>
                            //                 <Link to={`/teaching/info-student/${register.student_id}`}
                            //                       className="text-name-student-register">
                            //                     {register.name}
                            //                 </Link>
                            //             </td>
                            //             <td>
                            //                 <div id="register-email" data-toggle="tooltip" title=""
                            //                      type="button" rel="tooltip"
                            //                      data-original-title={register.email}>{register.email}</div>
                            //             </td>
                            //             <td><a href={"tel:" + register.phone} className="text-name-student-register">
                            //                 {helper.formatPhone(register.phone)}
                            //             </a>
                            //             </td>
                            //             <td>{register.code}</td>
                            //             <td>
                            //                 {
                            //                     register.saler ?
                            //                         (
                            //                             <Link className="btn btn-xs btn-main"
                            //                                   style={{backgroundColor: '#' + register.saler.color}}
                            //                                   to={`/teaching/registerlist/${register.saler.id}`}
                            //                             >
                            //                                 {helper.getShortName(register.saler.name)}
                            //                                 <div className="ripple-container"/>
                            //                             </Link>
                            //                         )
                            //                         :
                            //                         (
                            //                             <Link className="btn btn-xs btn-main no-data"
                            //                                   to={`/teaching/registerlist/-1`}
                            //                             >
                            //                                 Không có
                            //                                 <div className="ripple-container"/>
                            //                             </Link>
                            //                         )
                            //
                            //                 }
                            //
                            //             </td>
                            //             <td>
                            //                 {
                            //                     register.campaign ?
                            //                         (
                            //                             <button className="btn btn-xs btn-main"
                            //                                     style={{backgroundColor: '#' + register.campaign.color}}
                            //                                     onClick={() => this.props.loadRegisterStudentByCampaign(register.campaign.id)}
                            //                             >
                            //                                 {register.campaign.name}
                            //                                 <div className="ripple-container"/>
                            //                             </button>
                            //                         )
                            //                         :
                            //                         (
                            //                             <button className="btn btn-xs btn-main no-data"
                            //                                     onClick={() => this.props.loadRegisterStudentByCampaign('-1')}
                            //                             >
                            //                                 Không có
                            //                                 <div className="ripple-container"/>
                            //                             </button>
                            //                         )
                            //                 }
                            //             </td>
                            //             <td className="text-center">
                            //                 {
                            //                     register.paid_status ?
                            //
                            //                         <div className="btn btn-xs btn-main main-background-color"
                            //                              data-toggle="tooltip" title=""
                            //                              type="button" rel="tooltip"
                            //                              data-original-title={register.note}>
                            //                             {helper.dotNumber(register.money)} vnd
                            //                         </div>
                            //                         : 'Chưa nộp'
                            //                 }
                            //             </td>
                            //             <td>
                            //                 <div data-toggle="tooltip" title=""
                            //                      type="button" rel="tooltip"
                            //                      data-original-title={register.created_at}>
                            //                     {register.created_at}
                            //                 </div>
                            //             </td>
                            //             <td>
                            //                 <ButtonGroupAction
                            //                     disabledEdit={!(register.editable && register.paid_status)}
                            //                     edit={(obj) => {
                            //                         return this.props.openModalChangeInfoStudent(obj);
                            //                     }}
                            //                     delete={this.props.deleteRegister}
                            //                     object={register}
                            //                     disabledDelete={!register.is_delete}>
                            //                     <a data-toggle="tooltip" title="Đổi lớp"
                            //                        onClick={() => this.props.openModalChangeClass(register.id)}
                            //                        type="button"
                            //                        rel="tooltip">
                            //                         <i className="material-icons">swap_vertical_circle</i>
                            //                     </a>
                            //                 </ButtonGroupAction>
                            //             </td>
                            //         </tr>);
                            // })}
                            //
                            // </tbody>
                            // </table>
                        )
                }

                <Modal show={this.state.isOpenModal} bsSize="lg" bsStyle="primary" onHide={this.closeModal}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <CallModal
                            register={this.state.register}
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
};


export default ListOrder;
