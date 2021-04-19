import React from 'react';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import TooltipButton from '../../components/common/TooltipButton';

class ListRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive table-split table-hover table-sticky-head">
                <table className="table" cellSpacing="0" id="list_register">

            {/*<div className="table-responsive">*/}
            {/*    <table className="table">*/}
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Họ và tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Mã học viên</th>
                        <th>Lớp</th>
                        <th>Số tiền</th>
                        <th>Ngày nộp</th>
                        <th>Người thu</th>
                        <th>Chú thích</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.registers.map((register,key) => {
                        return (
                            <tr key={key}>
                                <td>
                                    <TooltipButton
                                        text={register.class.name}
                                        placement="top"
                                    >
                                        <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                data-original-title={register.class.name}>
                                            <img src={register.class.icon_url} alt=""/>
                                        </button>
                                    </TooltipButton>
                                </td>
                                <td>
                                    <a href="#"
                                          className="text-name-student-register">
                                        {register.student.name}
                                    </a>
                                </td>
                                <td>
                                    <TooltipButton
                                        text={register.student.email}
                                        placement="top"
                                    >
                                        <div id="register-email">{register.student.email}</div>
                                    </TooltipButton>
                                </td>
                                <td><a href={"tel:" + register.student.phone} className="text-name-student-register">
                                    {helper.formatPhone(register.student.phone)}
                                </a>
                                </td>
                                <td className="text-center">{register.code}</td>
                                <td>{register.class ? register.class.name : 'Không có'}</td>
                                <td className="text-center">
                                    {
                                        register.paid_status ?
                                            <button className="btn btn-xs btn-main main-background-color"
                                            >
                                                {helper.dotNumber(register.money)} vnd
                                                <div className="ripple-container"/>
                                            </button>
                                            : 'Chưa nộp'
                                    }
                                </td>
                                <td className="text-center">
                                    <TooltipButton
                                        text={register.paid_time_full}
                                        placement="top"
                                    >
                                        <div>
                                            {register.paid_time.slice(8, 10) + '/' + register.paid_time.slice(5, 7)}
                                        </div>
                                    </TooltipButton>
                                </td>
                                <td>
                                    {
                                        register.collector ?
                                            (
                                                <button className="btn btn-xs btn-main"
                                                        style={{backgroundColor: '#' + register.collector.color}}
                                                        onClick={() => this.props.loadHistoryCollectMoneyByCollector(register.collector.id)}
                                                >
                                                    {helper.getShortName(register.collector.name)}
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
                                    <TooltipButton
                                        text={register.note}
                                        placement="top"
                                    >
                                        <div id="register-email">{register.note}</div>
                                    </TooltipButton>
                                </td>
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
    loadHistoryCollectMoneyByCollector: PropTypes.func.isRequired,
};


export default ListRegister;
