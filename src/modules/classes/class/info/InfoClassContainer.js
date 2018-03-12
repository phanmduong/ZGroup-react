/**
 * Created by phanmduong on 9/21/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as classActions from '../../classActions';
import Loading from '../../../../components/common/Loading';
import {Link} from "react-router";
import TooltipButton from '../../../../components/common/TooltipButton';
import {NO_AVATAR} from '../../../../constants/env';
import * as helper from '../../../../helpers/helper';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";

class InfoClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openModal: false
        };
        this.openModalTeachers = this.openModalTeachers.bind(this);
        this.closeModalTeachers = this.closeModalTeachers.bind(this);
    }

    openModalTeachers() {
        this.setState({openModal: true});
        this.props.classActions.loadTeachersClass(this.props.params.classId);
    }

    closeModalTeachers() {
        this.setState({openModal: false});
    }

    render() {
        if (this.props.isLoadingClass) {
            return (
                <Loading/>
            );
        } else {
            let classData = this.props.class;
            return (
                <div>
                    <h3>
                        <strong>Thông tin lớp học {classData.name}</strong>
                    </h3>
                    <p>Lớp được tạo lúc <strong>
                        <small>{classData.created_at}</small>
                    </strong></p>
                    <div className="flex flex-wrap">
                        {
                            classData.teacher &&
                            <TooltipButton text="Giảng viên"
                                           placement="top"
                            >
                                <button className="btn btn-sm"
                                        style={{background: '#' + classData.teacher.color}}>
                                    {classData.teacher.name}
                                    <div className="ripple-container"/>
                                </button>
                            </TooltipButton>
                        }
                        {
                            classData.teacher_assistant &&
                            <TooltipButton text="Trơ giảng"
                                           placement="top"
                            >
                                <button className="btn btn-sm"
                                        style={{background: '#' + classData.teacher_assistant.color}}>
                                    {classData.teacher_assistant.name}
                                    <div className="ripple-container"/>
                                </button>
                            </TooltipButton>
                        }
                        <button
                            onClick={this.openModalTeachers}
                            className="btn btn-xs btn-rose btn-simple">
                            Xem thêm
                        </button>
                    </div>
                    <div className="col-md-12">
                        <h4><strong>Danh sách học viên </strong></h4>
                        <div className="table-responsive">
                            <table className="table" id="list_register">
                                <thead className="text-rose">
                                <tr>
                                    <th>ID</th>
                                    <th>Họ tên</th>
                                    <th>Tình trạng học</th>
                                    <th>Mã học viên</th>
                                    <th>Học phí</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {_.reverse(_.sortBy(classData.registers, 'total_attendances')).map((register) => {
                                    let avatar = helper.avatarEmpty(register.student.avatar_url) ?
                                        NO_AVATAR : register.student.avatar_url;
                                    return (
                                        <tr key={register.id}>
                                            <td>
                                                <div style={{
                                                    background: "url('" + avatar + "') center center / cover",
                                                    display: 'inline-block',
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    verticalAlign: 'middle'
                                                }}
                                                />
                                            </td>
                                            <td><Link to={`/teaching/info-student/${register.student.id}`}
                                                      className="text-name-student-register">
                                                {register.student.name}
                                            </Link></td>
                                            <td><h6>{register.total_attendances}/{register.attendances.length}</h6>
                                                <div
                                                    className="progress progress-line-success progress-bar-table width-100">
                                                    <div className="progress-bar progress-bar-success"
                                                         role="progressbar"
                                                         aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width: (100 * register.total_attendances / register.attendances.length) + '%'}}
                                                    >
                                                        <span
                                                            className="sr-only">{(100 * register.total_attendances / register.attendances.length)}%</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    register.code &&
                                                    <TooltipButton
                                                        text={register.received_id_card ? "Đã nhận thẻ" : "Chưa nhận thẻ"}
                                                        placement="top"
                                                    >

                                                        <button
                                                            className={register.received_id_card ? "btn btn-xs btn-rose" : "btn btn-xs"}>
                                                            {register.code}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    </TooltipButton>
                                                }


                                            </td>
                                            <td className="text-center">
                                                {
                                                    register.paid_status ?
                                                        <TooltipButton
                                                            text={register.note}
                                                            placement="top"
                                                        >
                                                            <button
                                                                className="btn btn-xs btn-main main-background-color"
                                                            >
                                                                {helper.dotNumber(register.money)} vnd
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        </TooltipButton>
                                                        : 'Chưa nộp'
                                                }
                                            </td>

                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal
                        show={this.state.openModal}
                        onHide={this.closeModalTeachers}
                        bsSize="large"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Danh sách giảng viên và trợ giảng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.props.isLoadingTeachers ? <Loading/> :
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="text-rose">
                                                <tr>
                                                    <th/>
                                                    <th>Tên</th>
                                                    <th>Vị trí</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.props.teachers.map((teacher, index) => {
                                                        let avatar = helper.avatarEmpty(teacher.avatar_url) ?
                                                            NO_AVATAR : teacher.avatar_url;
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
                                                                <td>{teacher.name}</td>
                                                                <td>Giảng viên</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                {
                                                    this.props.teachingAssistants.map((teacher, index) => {
                                                        let avatar = helper.avatarEmpty(teacher.avatar_url) ?
                                                            NO_AVATAR : teacher.avatar_url;
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
                                                                <td>{teacher.name}</td>
                                                                <td>Trợ giảng</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                            }
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }

    }
}

InfoClassContainer.propTypes = {
    class: PropTypes.object.isRequired,
    isLoadingClass: PropTypes.bool.isRequired,
    isLoadingTeachers: PropTypes.bool.isRequired,
    teachers: PropTypes.array.isRequired,
    teachingAssistants: PropTypes.array.isRequired,

};

function mapStateToProps(state) {
    return {
        class: state.classes.class,
        isLoadingClass: state.classes.isLoadingClass,
        isLoadingTeachers: state.classes.isLoadingTeachers,
        teachers: state.classes.teachers,
        teachingAssistants: state.classes.teachingAssistants,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoClassContainer);
