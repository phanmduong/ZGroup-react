/**
 * Created by phanmduong on 9/21/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as classActions from '../../classActions';
import Loading from '../../../../components/common/Loading';
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
                    {/*<h3>*/}
                    {/*    <strong>Thông tin lớp học {classData.name}</strong>*/}
                    {/*</h3>*/}
                    {/*<p>Lớp được tạo lúc <strong>*/}
                    {/*    <small>{classData.created_at}</small>*/}
                    {/*</strong></p>*/}
                    {/*<div className="flex flex-wrap">*/}
                    {/*    {*/}
                    {/*        classData.teacher &&*/}
                    {/*        <TooltipButton text="Giảng viên"*/}
                    {/*                       placement="top"*/}
                    {/*        >*/}
                    {/*            <button className="btn btn-sm"*/}
                    {/*                    style={{background: '#' + classData.teacher.color}}>*/}
                    {/*                {classData.teacher.name}*/}
                    {/*                <div className="ripple-container"/>*/}
                    {/*            </button>*/}
                    {/*        </TooltipButton>*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*        classData.teacher_assistant &&*/}
                    {/*        <TooltipButton text="Trơ giảng"*/}
                    {/*                       placement="top"*/}
                    {/*        >*/}
                    {/*            <button className="btn btn-sm"*/}
                    {/*                    style={{background: '#' + classData.teacher_assistant.color}}>*/}
                    {/*                {classData.teacher_assistant.name}*/}
                    {/*                <div className="ripple-container"/>*/}
                    {/*            </button>*/}
                    {/*        </TooltipButton>*/}
                    {/*    }*/}
                    {/*    <button*/}
                    {/*        onClick={this.openModalTeachers}*/}
                    {/*        className="btn btn-xs btn-rose btn-simple">*/}
                    {/*        Xem thêm*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div>
                        {/*<h4><strong>Danh sách học viên </strong></h4>*/}
                        {/*<div className="row">*/}
                        {/*    <div className="col-sm-4">*/}
                        {/*        <div className={"flex"}>*/}
                        {/*            <div*/}
                        {/*                style={{*/}
                        {/*                    background: '#ffffff',*/}
                        {/*                    border: 'solid 1px',*/}
                        {/*                    height: '15px',*/}
                        {/*                    width: '30px',*/}
                        {/*                    margin: '3px 10px'*/}
                        {/*                }}/>*/}
                        {/*            < p> Chưa đóng tiền</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-sm-4">*/}
                        {/*        <div className={"flex"}>*/}
                        {/*            <div style={{*/}
                        {/*                background: '#dff0d8',*/}
                        {/*                height: '15px',*/}
                        {/*                width: '30px',*/}
                        {/*                margin: '3px 10px'*/}
                        {/*            }}/>*/}
                        {/*            <p>Đã nộp tiền</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-sm-4">*/}
                        {/*        <div className={"flex"}>*/}
                        {/*            <div*/}
                        {/*                style={{*/}
                        {/*                    background: '#fcf8e3',*/}
                        {/*                    height: '15px',*/}
                        {/*                    width: '30px',*/}
                        {/*                    margin: '3px 10px'*/}
                        {/*                }}/>*/}
                        {/*            <p>Danh sách chờ</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-sm-4">*/}
                        {/*        <div className={"flex"}>*/}
                        {/*            <div style={{*/}
                        {/*                background: '#f2dede',*/}
                        {/*                height: '15px',*/}
                        {/*                width: '30px',*/}
                        {/*                margin: '3px 10px'*/}
                        {/*            }}/>*/}
                        {/*            <p> Đang bảo lưu</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-sm-4">*/}
                        {/*        <div className={"flex"}>*/}
                        {/*            <div style={{*/}
                        {/*                background: '#daedf7',*/}
                        {/*                height: '15px',*/}
                        {/*                width: '30px',*/}
                        {/*                margin: '3px 10px'*/}
                        {/*            }}/>*/}
                        {/*            <p>Đang học lại</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-sm-4">*/}
                        {/*        <div className={"flex"}>*/}
                        {/*            <div style={{*/}
                        {/*                background: '#8c8c8c',*/}
                        {/*                height: '15px',*/}
                        {/*                width: '30px',*/}
                        {/*                margin: '3px 10px'*/}
                        {/*            }}/>*/}
                        {/*            <p>Đã học xong</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}


                        <div className="table-responsive table-split">
                            <table className="table" cellSpacing="0" id="list_register">
                                {/*<thead className="text-rose">*/}
                                {/*<tr>*/}
                                {/*    <th>ID</th>*/}
                                {/*    <th>Họ tên</th>*/}
                                {/*    <th>Tình trạng học</th>*/}
                                {/*    <th>Bài tập</th>*/}
                                {/*    <th>Mã học viên</th>*/}
                                {/*    <th>Học phí</th>*/}
                                {/*    <th>Bằng</th>*/}
                                {/*    <th>Thiết bị</th>*/}
                                {/*</tr>*/}
                                {/*</thead>*/}
                                <tbody>
                                {_.reverse(_.sortBy(classData.registers, 'total_attendances')).map((register) => {
                                    let avatar = helper.avatarEmpty(register.student.avatar_url) ?
                                        NO_AVATAR : register.student.avatar_url;
                                    let color = "";
                                    switch (register.status) {
                                        case 1:
                                            color = "success";
                                            break;
                                        case 2:
                                            color = "warning";
                                            break;
                                        case 3:
                                            color = "danger";
                                            break;
                                        case 4:
                                            color = "info";
                                            break;
                                        case 5:
                                            color = "gray";
                                            break;
                                    }
                                    return (
                                        <tr key={register.id} className={color}>
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
                                            <td><a href={`/sales/info-student/${register.student.id}`}
                                                   className="text-name-student-register">
                                                {register.student.name}
                                            </a></td>
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
                                                <h6>{register.total_weigh_topic_register}/{register.total_weigh_topic}</h6>
                                                <div
                                                    className="progress progress-line-success progress-bar-table width-100">
                                                    <div className="progress-bar progress-bar-success"
                                                         role="progressbar"
                                                         aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width: (100 * register.total_weigh_topic_register / register.total_weigh_topic) + '%'}}
                                                    >
                                                        <span
                                                            className="sr-only">{(100 * register.total_weigh_topic_register / register.total_weigh_topic)}%</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {
                                                    register.code &&
                                                    <TooltipButton
                                                        text={register.received_id_card ? "Đã nhận thẻ" : "Chưa nhận thẻ"}
                                                        placement="top"
                                                    >

                                                        <button
                                                            className={(register.received_id_card ? "btn btn-xs btn-rose" : "btn btn-xs") + " min-width-100-px"}>
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
                                                            text={register.note || 'Không có note'}
                                                            placement="top"
                                                        >
                                                            <button
                                                                className="btn btn-xs btn-rose min-width-100-px"
                                                            >
                                                                {helper.dotNumber(register.money)} vnd
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        </TooltipButton>
                                                        :
                                                        <button className="btn btn-xs min-width-100-px">
                                                            Chưa nộp
                                                        </button>


                                                }
                                            </td>
                                            <td>
                                                {
                                                    register.certificate || "Chưa xét"
                                                }
                                            </td>
                                            <td>
                                                <div style={{display: "flex"}}>
                                                    {
                                                        register.student.devices && register.student.devices.map((dv, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <TooltipButton
                                                                        text={"Name: " + dv.name + " Os: " + dv.os + " Device_id: " + dv.device_id}
                                                                        placement="top"
                                                                    >
                                                                        {
                                                                            (dv.os.toLowerCase().search("pple") !== -1) || (dv.os.toLowerCase().search("ios") !== -1) ?

                                                                                <img
                                                                                    style={{
                                                                                        height: 24,
                                                                                        width: 24,
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                    src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1528267590z7F1mpbo0YspRmU.png"
                                                                                    alt=""/>

                                                                                :
                                                                                <i className="material-icons"
                                                                                   style={{cursor: "pointer"}}>
                                                                                    android
                                                                                </i>

                                                                        }
                                                                    </TooltipButton>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>

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
    classActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
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
