import React from 'react';
import * as helper from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";
import {Modal} from "react-bootstrap";
import PropTypes from 'prop-types';

class StatisticTeacher extends React.Component {
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

    openModal(staff, filter) {
        let attendances = filter ? staff.attendances.filter(item => item[filter]) : staff.attendances;
        this.setState({
            showModal: true,
            staff: {
                ...staff,
                attendances,
                user: staff.attendances[0].user
            }
        });
    }


    render() {
        return (
            <div>
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th/>
                                <th>Họ tên</th>
                                <th>Đi làm</th>
                                <th>Đúng luật</th>
                                <th>Bỏ làm</th>
                                <th>Checkin muộn</th>
                                <th>Checkout sớm</th>
                                <th>Không checkin</th>
                                <th>Không checkout</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.teachers.map((item, index) => {
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
                                        <td>
                                            <button
                                                className="btn btn-success btn-xs min-width-80-px"
                                                onClick={() => this.openModal(item, 'attendance')}
                                            >
                                                {item.total_attendance}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-xs min-width-80-px"
                                                onClick={() => this.openModal(item, 'isLawful')}
                                            >
                                                {item.total_lawful}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-xs min-width-80-px"
                                                onClick={() => this.openModal(item, 'isNotWork')}
                                            >
                                                {item.total_not_work}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-info btn-xs min-width-80-px"
                                                onClick={() => this.openModal(item, 'isCheckinLate')}
                                            >
                                                {item.total_checkin_late}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-info btn-xs min-width-80-px"
                                                onClick={() => this.openModal(item, 'isCheckoutEarly')}
                                            >
                                                {item.total_checkout_early}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-xs min-width-80-px"
                                                onClick={() => this.openModal(item, 'isNotCheckin')}
                                            >
                                                {item.total_not_checkin}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-xs min-width-80-px"
                                                onClick={() => this.openModal(item, 'isNotCheckout')}
                                            >
                                                {item.total_not_checkout}
                                            </button>
                                        </td>
                                        <td className="text-align-right">
                                            <button className="btn btn-rose"
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
                {this.state.staff &&
                <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>Chi tiết điểm danh {this.state.staff.user.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th>Ngày</th>
                                    <th/>
                                    <th>Lớp</th>
                                    <th>Thời gian</th>
                                    <th />
                                    <th>Checkin lúc</th>
                                    <th />
                                    <th>Checkout lúc</th>
                                    <th>Lỗi vi phạm</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.staff.attendances.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.time}</td>
                                            <td>
                                                <div className="avatar-list-staff"
                                                     style={{
                                                         background: 'url(' + item.course_avatar_url + ') center center / cover',
                                                         display: 'inline-block'
                                                     }}
                                                />
                                            </td>
                                            <td>{item.class_name}</td>
                                            <td>{item.start_time + " - " + item.end_time}</td>
                                            <td>
                                                {item.check_in ?
                                                    <i className="material-icons text-success">arrow_downward</i> : ''
                                                }
                                            </td>
                                            <td>
                                                {item.check_in ? item.check_in.created_at : ''}
                                            </td>
                                            <td>{item.check_out ?
                                                <i className="material-icons text-danger">arrow_upward</i> : ""}</td>
                                            <td>
                                                {item.check_out ? item.check_out.created_at : ""}
                                            </td>
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

StatisticTeacher.propTypes = {
    teachers: PropTypes.array.isRequired,
};

export default StatisticTeacher;
