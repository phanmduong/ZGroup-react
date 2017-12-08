import React from 'react';
import * as helper from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";
import {Modal} from "react-bootstrap";
import PropTypes from 'prop-types';

class StatisticSalesMarketing extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            staff: null,
            showModal: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    openModal(staff) {
        this.setState({
            showModal: true,
            staff
        });
    }


    render() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Thống kê điểm danh Sales & Marketing</h4>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-rose">
                                    <tr>
                                        <th/>
                                        <th>Họ tên</th>
                                        <th>Đi làm</th>
                                        <th>Đúng luật</th>
                                        <th>Vi phạm</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.salesMarketings.map((item, index) => {
                                        let staff = item.attendances[0].user;
                                        let avatar = helper.avatarEmpty(staff.avatar_url) ?
                                            NO_AVATAR : staff.avatar_url;
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <div className="avatar-list-staff"
                                                         style={{
                                                             background: 'url(' + avatar + ') center center / cover',
                                                             display: 'inline-block'
                                                         }}
                                                    />
                                                </td>
                                                <td>{staff.name}</td>
                                                <td>{item.total_attendance}</td>
                                                <td>{item.total_lawful}</td>
                                                <td>{item.total_delinquent}</td>
                                                <td className="max-width-130-px text-align-right">
                                                    <button className="btn btn-rose max-width-130-px"
                                                            onClick={() => this.openModal(item)}>
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.staff &&
                <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết điểm danh {this.state.staff.attendances[0].user.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th>Ngày</th>
                                    <th>Ca</th>
                                    <th>Tuần</th>
                                    <th>Checkin lúc</th>
                                    <th>Checkout lúc</th>
                                    <th>Lỗi vi phạm</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.staff.attendances.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.name + `: ${item.start_time} - ${item.end_time}`}</td>
                                            <td>{item.week}</td>
                                            <td>{item.check_in ? item.check_in.created_at : ""}</td>
                                            <td>{item.check_out ? item.check_out.created_at : ""}</td>
                                            <td>{item.message}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
                }

            </div>

        );
    }
}

StatisticSalesMarketing.propTypes = {
    salesMarketings: PropTypes.array.isRequired,
};


export default StatisticSalesMarketing;
