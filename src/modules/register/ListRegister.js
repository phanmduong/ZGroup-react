import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";

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
                        <th></th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Mã thẻ</th>
                        <th>Saler</th>
                        <th>Chiến dịch</th>
                        <th>Học phí</th>
                        <th>Lớp</th>
                        <th>Đăng kí</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <button className="btn btn-success btn-round btn-fab btn-fab-mini text-white"
                                    data-toggle="tooltip" title="" type="button" rel="tooltip"
                                    data-original-title="Đã gọi"><i className="material-icons">phone</i>
                            </button>
                        </td>
                        <td>Cao Anh Quan</td>
                        <td>aquancva@gmail.com</td>
                        <td>0978086530</td>
                        <td>CM02468</td>
                        <td>
                            <button className="btn btn-danger btn-xs btn-main">Yến Nhi
                                <div className="ripple-container">
                                </div>
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-warning btn-xs btn-main">Inbox
                                <div className="ripple-container">
                                </div>
                            </button>
                        </td>
                        <td>
                            <h6>750k/1000k</h6>
                            <div className="progress progress-line-primary progress-bar-table">
                                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                                     aria-valuemax="100" style={{width: "30%"}}>
                                    <span className="sr-only">60% Complete</span>
                                </div>
                            </div>
                        </td>
                        <td>Ps 26.1</td>
                        <td>2017-08-15 21:59:17</td>
                        <td>
                            <ButtonGroupAction editUrl="" delete={() => "hello"}/>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

ListRegister.propTypes = {
    registers: PropTypes.array.isRequired
};

export default ListRegister;