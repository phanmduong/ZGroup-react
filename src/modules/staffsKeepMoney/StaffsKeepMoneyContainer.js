import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as staffKeepMoneyActions from './staffKeepMoneyActions';
import {avatarEmpty, dotNumber} from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import {Modal} from "react-bootstrap";
import HistoryTransaction from "./HistoryTransaction";
import * as helper from "../../helpers/helper";

class StaffsKeepMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            showModalHistoryTransactionStaff: false,
            selectStaff: ""
        };
        this.closeModalHistoryTransactionStaff = this.closeModalHistoryTransactionStaff.bind(this);
        this.showModalHistoryTransactionStaff = this.showModalHistoryTransactionStaff.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    loadData(page = 1) {
        this.setState({page});
        this.props.staffKeepMoneyActions.loadStaffsKeepMoney(page);
    }

    closeModalHistoryTransactionStaff() {
        this.setState({showModalHistoryTransactionStaff: false});
    }

    showModalHistoryTransactionStaff(staff) {
        this.setState({showModalHistoryTransactionStaff: true, selectStaff: staff});
    }

    render() {
        return (
            <div>
                {this.props.isLoading ? <div></div> :
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div className="card-content text-align-left">
                                    <p className="category">Tổng tiền</p>
                                    <h3 className="card-title">{dotNumber(this.props.totalMoney)}đ</h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">list</i>
                                        <a href="#list-keep-money">Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div className="card-content text-align-left">
                                    <p className="category">Số nhân viên đang giữ tiền</p>
                                    <h3 className="card-title">{dotNumber(this.props.totalCount)}</h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">list</i>
                                        <a href="#list-keep-money">Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="card" id="list-keep-money">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Danh sách nhân viên giữ tiền</h4>
                        {this.props.isLoading ?
                            <Loading/>
                            :
                            <div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="text-rose">
                                        <tr>
                                            <th/>
                                            <th>Nhân viên</th>
                                            <th>Email</th>
                                            <th>Số điện thoại</th>
                                            <th className="text-center">Số tiền đang giữ</th>
                                            <th/>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.staffs.map((staff) => {
                                                const avatar = !avatarEmpty(staff.avatar_url) ?
                                                    staff.avatar_url : NO_AVATAR;
                                                return (
                                                    <tr key={staff.id}>
                                                        <td>
                                                            <div className="avatar-list-staff"
                                                                 style={{
                                                                     background: 'url(' + avatar + ') center center / cover',
                                                                     display: 'inline-block'
                                                                 }}
                                                            />
                                                        </td>
                                                        <td>{staff.name}</td>
                                                        <td>
                                                            {staff.email}
                                                        </td>
                                                        <td>{staff.phone}</td>
                                                        <td className="text-align-right">{dotNumber(staff.money)}đ</td>
                                                        <td>
                                                            <button className="btn btn-rose btn-sm"
                                                                    onClick={() => this.showModalHistoryTransactionStaff(staff)}
                                                            >Chi tiết
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                        <Pagination
                            totalPages={this.props.totalPages}
                            currentPage={this.state.page}
                            loadDataPage={(page) => this.loadData(page)}
                        />
                    </div>
                </div>
                <Modal show={this.state.showModalHistoryTransactionStaff}
                       onHide={this.closeModalHistoryTransactionStaff} bsSize="large">
                    <Modal.Header closeButton>
                        {
                            this.state.selectStaff.id &&
                            <div className="flex flex-row-center">
                                <div
                                    style={{
                                        background: 'url(' + (avatarEmpty(this.state.selectStaff.avatar_url) ?
                                            NO_AVATAR : this.state.selectStaff.avatar_url) + ') center center / cover',
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%'
                                    }}
                                />
                                <div className="flex flex-col margin-left-20">
                                    <div className="font-size-1_5em">
                                        <strong>{this.state.selectStaff.name}</strong></div>
                                    <div
                                        className="font-weight-400">{dotNumber(this.state.selectStaff.money)}đ
                                    </div>
                                </div>
                            </div>

                        }
                    </Modal.Header>
                    <Modal.Body>
                        <HistoryTransaction staff={this.state.selectStaff}/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

StaffsKeepMoneyContainer.propTypes = {};

function mapStateToProps(state) {
    return {
        isLoading: state.staffKeepMoney.isLoading,
        staffs: state.staffKeepMoney.staffs,
        totalPages: state.staffKeepMoney.totalPages,
        totalMoney: state.staffKeepMoney.totalMoney,
        totalCount: state.staffKeepMoney.totalCount,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffKeepMoneyActions: bindActionCreators(staffKeepMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffsKeepMoneyContainer);