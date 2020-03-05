import React from 'react';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import TooltipButton from '../../components/common/TooltipButton';
import {Link} from 'react-router';

class ListCall extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive table-split">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th>Người gọi</th>
                        <th>Khách hàng</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                        <th>Hẹn nộp</th>
                        <th>Thời gian gọi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.teleCalls.map((call) => {
                        return (
                            <tr key={call.id}>
                                <td>
                                    <Link className="btn btn-xs btn-main"
                                          style={{backgroundColor: '#' + call.caller.color}}
                                          to={"/marketing/telesalehistory/" + call.caller.id}
                                    >
                                        {helper.getShortName(call.caller.name)}
                                        <div className="ripple-container"/>
                                    </Link>
                                </td>
                                <td>
                                    <a href={`/sales/info-student/${call.student.id}`}
                                          className="text-name-student-register">
                                        {call.student.name}
                                    </a>
                                </td>
                                <td>
                                    <TooltipButton
                                        text={call.student.email}
                                        placement="top"
                                    >
                                        <div id="register-email">{call.student.email}</div>
                                    </TooltipButton>
                                </td>
                                <td><a href={"tel:" + call.student.phone} className="text-name-student-register">
                                    {helper.formatPhone(call.student.phone)}
                                </a>
                                </td>
                                <td>{
                                    (call.call_status === 'calling' ?
                                            (
                                                <div className="text-info"><b>Đang gọi</b></div>
                                            )
                                            :
                                            (
                                                call.call_status === 'success' ?
                                                    (
                                                        <div className="text-success"><b>Thành công</b></div>
                                                    )
                                                    :
                                                    (
                                                        <div className="text-danger"><b>Thất bại</b></div>
                                                    )

                                            )
                                    )
                                }</td>
                                <td>
                                    <TooltipButton
                                        text={call.note || ''}
                                        placement="top"
                                    >
                                        <div id="register-email">{call.note}</div>
                                    </TooltipButton>
                                </td>
                                <td>{call.appointment_payment}</td>
                                <td>{call.call_time}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListCall.propTypes = {
    teleCalls: PropTypes.array.isRequired,
};


export default ListCall;
