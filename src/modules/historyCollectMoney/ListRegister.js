import React from 'react';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import TooltipButton from '../../components/common/TooltipButton';
import {Link} from 'react-router';

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
                        <th/>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Mã học viên</th>
                        <th>Số tiền</th>
                        <th>Ngày nộp</th>
                        <th>Người thu</th>
                        <th>Chú thích</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.registers.map((register) => {
                        return (
                            <tr key={register.id}>
                                <td>
                                    <TooltipButton
                                        text={register.class.name}
                                        placement='top'
                                    >
                                        <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                data-original-title={register.class.name}>
                                            <img src={register.class.icon_url} alt=""/>
                                        </button>
                                    </TooltipButton>
                                </td>
                                <td>
                                    <Link to={`/info-student/${register.student.id}`}
                                          className="text-name-student-register">
                                        {register.student.name}
                                    </Link>
                                </td>
                                <td>
                                    <TooltipButton
                                        text={register.student.email}
                                        placement='top'
                                    >
                                        <div id="register-email">{register.student.email}</div>
                                    </TooltipButton>
                                </td>
                                <td><a href={"tel:" + register.student.phone} className="text-name-student-register">
                                    {helper.formatPhone(register.student.phone)}
                                </a>
                                </td>
                                <td className="text-center">{register.code}</td>
                                <td>
                                    <h6>
                                        {
                                            register.paid_status ?
                                                <b className="text-money">{helper.convertMoneyToK(register.money) + '/' + helper.convertMoneyToK(register.course_money)}</b>
                                                : 'Chưa nộp'
                                        }
                                    </h6>
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
                                <td className="text-center">
                                    <TooltipButton
                                        text={register.paid_time_full}
                                        placement='top'
                                    >
                                        <div>
                                            {register.paid_time.slice(8, 10) + '/' + register.paid_time.slice(5, 7)}
                                        </div>
                                    </TooltipButton>
                                </td>
                                <td>
                                    {
                                        register.saler ?
                                            (
                                                <button className="btn btn-xs btn-main"
                                                        style={{backgroundColor: '#' + register.saler.color}}
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
                                <td>{register.note}</td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            </div>
        );
    }
}

ListRegister.propTypes = {
    registers: PropTypes.array.isRequired,
};


export default ListRegister;
