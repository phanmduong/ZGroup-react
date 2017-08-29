import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import * as helper from '../../helpers/helper';

// import {Link} from "react-router";

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
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Mã thẻ</th>
                        <th>Saler</th>
                        <th>Chiến dịch</th>
                        <th>Học phí</th>
                        <th>Lớp</th>
                        <th>Đăng kí</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.registers.map((register) => {
                        let btn = '';
                        let titleCall = 'Chưa gọi';
                        if (register.call_status === 'success') {
                            btn = ' btn-success';
                            titleCall = 'Gọi thành công';
                        }
                        else if (register.call_status === 'failed') {
                            btn = ' btn-danger';
                            titleCall = 'Gọi thất bại';
                        } else if (register.call_status === 'calling') {
                            btn = ' btn-info';
                            titleCall = 'Đang gọi';
                        }
                        return (
                            <tr key={register.id}>
                                <td>
                                    <button className={"btn btn-round btn-fab btn-fab-mini text-white" + btn}
                                            data-toggle="tooltip" title="" type="button" rel="tooltip"
                                            onClick={() => this.props.viewCall(register)}
                                            data-original-title={titleCall}><i className="material-icons">phone</i>
                                    </button>
                                </td>
                                <td>{register.name}</td>
                                <td>
                                    <div style={{width: '100px', wordBreak: 'break-all'}} data-toggle="tooltip" title=""
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
                                                        style={{backgroundColor: '#' + register.saler.color}}>
                                                    {register.saler.name}
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
                                                        style={{backgroundColor: '#' + register.campaign.color}}>
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
                                <td>{register.class.name}</td>
                                <td>{register.created_at}</td>
                                <td>
                                    <ButtonGroupAction
                                        editUrl=""
                                        delete={this.props.deleteRegister}
                                        object={register}
                                        disabledDelete={Boolean(register.paid_status)}
                                    />
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
    deleteRegister: PropTypes.func.isRequired,

};

export default ListRegister;