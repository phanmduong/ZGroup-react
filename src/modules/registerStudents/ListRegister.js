import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import * as helper from '../../helpers/helper';

import {Link} from "react-router";

class ListRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th>Lớp</th>
                        <th>Gọi</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Mã thẻ</th>
                        <th>Saler</th>
                        <th>Chiến dịch</th>
                        <th>Học phí</th>
                        <th>Đăng kí</th>
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
                                    <Link to={`/info-student/${register.student_id}`}
                                          className="text-name-student-register">
                                        {register.name}
                                    </Link>
                                </td>
                                <td>
                                    <div id="register-email" data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.email}>{register.email}</div>
                                </td>
                                <td>{register.phone}</td>
                                <td>{register.code}</td>
                                <td>
                                    {
                                        register.saler ?
                                            (
                                                <button className="btn btn-xs btn-main"
                                                        style={{backgroundColor: '#' + register.saler.color}}
                                                        onClick={() => this.props.loadRegisterStudentBySaler(register.saler.id)}
                                                >
                                                    {helper.getShortName(register.saler.name)}
                                                    <div className="ripple-container"/>
                                                </button>
                                            )
                                            :
                                            (
                                                <div className="no-data">
                                                    Không có
                                                </div>
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
                                                <div className="no-data">
                                                    Không có
                                                </div>
                                            )
                                    }
                                </td>
                                <td>
                                    <h6>{register.paid_status ? helper.convertMoneyToK(register.money) + '/' + helper.convertMoneyToK(register.course_money) : 'Chưa nộp'}</h6>
                                    {register.paid_status &&
                                    <div className="progress progress-line-primary progress-bar-table">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="60"
                                             aria-valuemin="0"
                                             aria-valuemax="100"
                                             style={{width: register.money * 100 / register.course_money}}>
                                            <span className="sr-only">{register.money * 100 / register.course_money}% Complete</span>
                                        </div>
                                    </div>
                                    }
                                </td>
                                <td>
                                    <div data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.created_at}>
                                        {register.created_at.slice(8, 10) + '/' + register.created_at.slice(5, 7)}
                                    </div>
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        editUrl=""
                                        delete={this.props.deleteRegister}
                                        object={register}
                                        disabledDelete={Boolean(register.paid_status)}>
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
    loadRegisterStudentBySaler: PropTypes.func.isRequired,

};

export default ListRegister;