import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import * as helper from '../../helpers/helper';

import {Link} from "react-router";
import TooltipButton from "../../components/common/TooltipButton";

class ListRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {

        return (
            <div className="table-responsive">
                <table id="datatables"
                       className="table table-striped table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th>Lớp</th>
                        <th>Gọi</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {this.props.genId == 0 && <th>Khóa</th>}
                        <th>Mã thẻ</th>
                        <th>Saler</th>
                        <th>Chiến dịch</th>
                        <th>Học phí</th>
                        <th>Mã ưu đãi</th>
                        <th>Đăng kí</th>
                        <th>Hẹn nộp</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.registers.map((register) => {
                        let btn = '';
                        let titleCall = 'Chưa gọi - Còn ' + register.time_to_reach + 'h';
                        if (register.call_status === 'success') {
                            btn = ' btn-success';
                            titleCall = 'Gọi thành công trong vòng ' + register.time_to_reach + 'h';
                        }
                        else if (register.call_status === 'failed') {
                            btn = ' btn-danger';
                            titleCall = 'Gọi thất bại - Còn ' + register.time_to_reach + 'h';
                        } else if (register.call_status === 'calling') {
                            btn = ' btn-info';
                            titleCall = 'Đang gọi';
                        }
                        return (
                            <tr key={register.id}>
                                <td>
                                    <div className="container-dot-bottom-right">
                                        <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                data-placement="right"
                                                data-original-title={register.class.name}>
                                            <img src={register.course_avatar_url} alt=""/>
                                        </button>
                                        <div className="dot-bottom-right"
                                             data-toggle="tooltip" title="" type="button" rel="tooltip"
                                             data-placement="right"
                                             data-original-title={'Học lần ' + register.study_time}>
                                            {register.study_time}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="container-call-status">
                                        <button className={"btn btn-round " + btn + " full-width padding-left-right-10"}
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                onClick={() => this.props.viewCall(register)}
                                                data-original-title={titleCall}>
                                            <i className="material-icons">
                                                phone
                                            </i> {register.call_status !== 'calling' && (register.time_to_reach + 'h')}
                                        </button>

                                    </div>
                                </td>
                                <td>
                                    <Link to={`/sales/info-student/${register.student_id}`}
                                          className="text-name-student-register">
                                        {register.name}
                                    </Link>
                                </td>
                                <td>
                                    <div id="register-email" data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.email}>{register.email}</div>
                                </td>
                                <td><a href={"tel:" + register.phone} className="text-name-student-register">
                                    {helper.formatPhone(register.phone)}
                                </a>
                                </td>
                                {this.props.genId == 0 && <th>{register.gen_name}</th>}
                                <td>{register.code}</td>
                                <td>
                                    {
                                        register.saler ?
                                            (
                                                <Link className="btn btn-xs btn-main"
                                                      style={{backgroundColor: '#' + register.saler.color}}
                                                      to={`/sales/registerlist/${register.saler.id}`}
                                                >
                                                    {helper.getShortName(register.saler.name)}
                                                    <div className="ripple-container"/>
                                                </Link>
                                            )
                                            :
                                            (
                                                <Link className="btn btn-xs btn-main no-data"
                                                      to={`/sales/registerlist/-1`}
                                                >
                                                    Không có
                                                    <div className="ripple-container"/>
                                                </Link>
                                            )

                                    }

                                </td>
                                <td>
                                    {
                                        register.campaign ?
                                            (
                                                <button className="btn btn-xs btn-main"
                                                        style={{backgroundColor: '#' + register.campaign.color}}
                                                        onClick={() => this.props.loadRegisterStudentByCampaign(register.campaign.id)}
                                                >
                                                    {register.campaign.name}
                                                    <div className="ripple-container"/>
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="btn btn-xs btn-main no-data"
                                                        onClick={() => this.props.loadRegisterStudentByCampaign('-1')}
                                                >
                                                    Không có
                                                    <div className="ripple-container"/>
                                                </button>
                                            )
                                    }
                                </td>
                                <td className="text-center">
                                    {
                                        register.paid_status ?

                                            <div className="btn btn-xs btn-main main-background-color"
                                                 data-toggle="tooltip" title=""
                                                 type="button" rel="tooltip"
                                                 data-original-title={register.note}>
                                                {helper.dotNumber(register.money)} vnd
                                            </div>
                                            : 'Chưa nộp'
                                    }
                                </td>
                                <td>{register.coupon}</td>
                                <td>
                                    <div data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.created_at}>
                                        {register.created_at}
                                    </div>
                                </td>
                                <td>
                                    <TooltipButton text={register.appointment_payment_date} placement="top">
                                        <div>
                                            {register.appointment_payment}
                                        </div>
                                    </TooltipButton>
                                </td>
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
                            </tr>);
                    })}

                    </tbody>
                </table>
            </div>
        );
    }
}

ListRegister.propTypes = {
    registers: PropTypes.array.isRequired,
    viewCall: PropTypes.func.isRequired,
    openModalChangeClass: PropTypes.func.isRequired,
    deleteRegister: PropTypes.func.isRequired,
    loadRegisterStudentByCampaign: PropTypes.func.isRequired,
    loadRegisterStudentBySaler: PropTypes.func,
    openModalChangeInfoStudent: PropTypes.func,
    genId: PropTypes.number,
};

export default ListRegister;