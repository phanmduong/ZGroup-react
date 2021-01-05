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
import {isContainsDomain, isEmptyInput} from '../../../../helpers/helper';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import ListChangeClass from "./ListChangeClass";
import * as globalModalActions from "../../../globalModal/globalModalActions";
import EmptyData from "../../../../components/common/EmptyData";
import StatusesOverlay from "../../../infoStudent/overlays/StatusesOverlay";

class InfoClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openModal: false,
            showModalChangeClass: false,
            selectRegisterId: 0,

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

    deleteRegister = (register) => {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa đăng kí này không?", () => {
            this.props.classActions.deleteRegisterStudent(register.id);
        });
    };

    closeModalChangeClass = () => {
        this.setState({showModalChangeClass: false});
    };

    openModalChangeClass = (registerId) => {
        this.setState({
            showModalChangeClass: true,
            selectRegisterId: registerId
        });
        this.props.classActions.loadChangeClasses(registerId);
    };

    confirmChangeClass = (classData) => {
        this.props.classActions.confirmChangeClass(this.state.selectRegisterId, classData.id, this.props.params.classId, this.closeModalChangeClass);
    };

    onClickStudent = (student) => {
        let link = '/sales/info-student/' + student.id;
        globalModalActions.openModalRegisterDetail(link);
    }

    onMouseEnterRow = (id, state) => {
        let tooltip_id = `#row-tooltip-${id}`;
        $(tooltip_id).tooltip({
            trigger: 'manual',
            tooltipClass: "tooltip-register-list-row"
        }).data('bs.tooltip')
            .tip()
            .addClass('tooltip-register-list-row');
        $(tooltip_id).tooltip(state);
    };

    render() {
        if (this.props.isLoadingClass) {
            return (
                <Loading/>
            );
        } else {
            let classData = this.props.class;
            return (
                <div style={{marginTop: -5}}>
                    <Modal show={this.state.showModalChangeClass}
                           onHide={() => {
                               if (!this.props.isChangingClass)
                                   this.closeModalChangeClass();
                           }}
                           bsSize="large"
                    >
                        <Modal.Header closeButton={!this.props.isChangingClass}>
                            <Modal.Title>Thay đổi lớp đăng kí</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ListChangeClass
                                classes={this.props.changeClasses}
                                registerId={this.state.selectRegisterId}
                                confirmChangeClass={this.confirmChangeClass}
                                isChangingClass={this.props.isChangingClass}
                            />
                        </Modal.Body>
                    </Modal>
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

                        {classData.registers && classData.registers.length > 0 ?
                            <div className="table-sticky-head table-split table-hover" radius="five">
                                <table className="table" cellSpacing="0" id="list_register">
                                    <thead>
                                    <tr>
                                        {/*<th/>*/}
                                        <th>Họ tên</th>
                                        {/*<th>Mã học viên</th>*/}
                                        <th>ID học viên</th>
                                        <th>Điểm danh</th>
                                        {!isContainsDomain(['ieg']) && <th>Chứng chỉ</th>}
                                        {!isContainsDomain(['ieg']) && <th>Học phí</th>}
                                        <th>Trạng thái</th>
                                        {/*<th>Bài tập</th>*/}
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {_.reverse(_.sortBy(classData.registers, 'total_attendances')).map((register) => {
                                        // let avatar = helper.avatarEmpty(register.student.avatar_url) ?
                                        //     NO_AVATAR : register.student.avatar_url;

                                        return (
                                            <tr key={register.id}
                                                onMouseEnter={() => this.onMouseEnterRow(register.id, 'show')}
                                                onMouseLeave={() => this.onMouseEnterRow(register.id, 'hide')}
                                            >
                                                {/*<td>*/}
                                                {/*    <div style={{*/}
                                                {/*        background: "url('" + avatar + "') center center / cover",*/}
                                                {/*        display: 'inline-block',*/}
                                                {/*        width: '30px',*/}
                                                {/*        height: '30px',*/}
                                                {/*        borderRadius: '50%',*/}
                                                {/*        verticalAlign: 'middle'*/}
                                                {/*    }}*/}
                                                {/*    />*/}
                                                {/*</td>*/}
                                                <td><a onClick={() => this.onClickStudent(register.student)}
                                                       className="text-name-student-register white-space-no-wrap">
                                                    {register.student.name}
                                                    {!isEmptyInput(register.student) &&
                                                    (!isEmptyInput(register.student.image1) || !isEmptyInput(register.student.image2)) &&
                                                    <span><i className="material-icons margin-left-5" style={{
                                                        "color": "#32CA41",
                                                        "fontSize": "18px",
                                                        "marginBottom": "4px"
                                                    }}>
                                                    check_circle
                                                </i></span>}
                                                </a></td>
                                                <td>
                                                    {/*    {*/}
                                                    {/*    register.code &&*/}


                                                    {/*    <button*/}
                                                    {/*        className={(register.received_id_card ? "btn btn-xs btn-rose" : "btn btn-xs") + " min-width-100-px"}>*/}
                                                    {/*        {register.code}*/}
                                                    {/*        <div className="ripple-container"/>*/}
                                                    {/*    </button>*/}

                                                    {/*}*/}
                                                    {/*{register.code}*/}
                                                    {register.student && register.student.id}
                                                </td>
                                                <td>
                                                    <div
                                                        data-toggle="tooltip"
                                                        title={
                                                            {
                                                                0: 'Chưa đóng tiền',
                                                                1: 'Đã nộp tiền',
                                                                2: 'Danh sách chờ',
                                                                3: 'Bảo lưu',
                                                                4: 'Học lại',
                                                                5: 'Đã học xong',
                                                                6: 'Đã hoàn tiền',
                                                            }[register.status]
                                                        }
                                                        type="button"
                                                        rel="tooltip"
                                                        id={`row-tooltip-${register.id}`}
                                                    >
                                                        <h6>{register.total_attendances}/{register.attendances.length}</h6>
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
                                                    </div>
                                                </td>

                                                {!isContainsDomain(['ieg']) && <td>
                                                    {
                                                        register.certificate || "Chưa xét"
                                                    }


                                                </td>}
                                                {!isContainsDomain(['ieg']) && <td>
                                                    {
                                                        register.paid_status ?
                                                            <TooltipButton
                                                                text={register.note || 'Không có note'}
                                                                placement="top"
                                                            >
                                                                <button
                                                                    className="btn btn-xs button-green min-width-100-px"
                                                                >
                                                                    {helper.dotNumber(register.money)} vnd
                                                                    <div className="ripple-container"/>
                                                                </button>
                                                            </TooltipButton>
                                                            :
                                                            <button className="btn btn-xs min-width-100-px"
                                                                    style={{lineHeight: '20px'}}>
                                                                Chưa nộp
                                                            </button>


                                                    }
                                                </td>}
                                                {/*<td>*/}
                                                {/*    <h6>{register.total_weigh_topic_register}/{register.total_weigh_topic}</h6>*/}
                                                {/*    <div*/}
                                                {/*        className="progress progress-line-success progress-bar-table width-100">*/}
                                                {/*        <div className="progress-bar progress-bar-success"*/}
                                                {/*             role="progressbar"*/}
                                                {/*             aria-valuemin="0"*/}
                                                {/*             aria-valuemax="100"*/}
                                                {/*             style={{width: (100 * register.total_weigh_topic_register / register.total_weigh_topic) + '%'}}*/}
                                                {/*        >*/}
                                                {/*        <span*/}
                                                {/*            className="sr-only">{(100 * register.total_weigh_topic_register / register.total_weigh_topic)}%</span>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</td>*/}

                                                <td>
                                                    <StatusesOverlay
                                                        data={register.register_status}
                                                        refId={register.id}
                                                        statusRef="registers"
                                                        className="btn btn-xs source-value width-100 bold"
                                                        styleOverlay={{marginLeft: -180}}
                                                        styleButton={{lineHeight: '20px'}}
                                                    />
                                                </td>


                                                {/*<td>*/}
                                                {/*    <div style={{display: "flex"}}>*/}
                                                {/*        {*/}
                                                {/*            register.student.devices && register.student.devices.map((dv, index) => {*/}
                                                {/*                return (*/}
                                                {/*                    <div key={index}>*/}
                                                {/*                        <TooltipButton*/}
                                                {/*                            text={"Name: " + dv.name + " Os: " + dv.os + " Device_id: " + dv.device_id}*/}
                                                {/*                            placement="top"*/}
                                                {/*                        >*/}
                                                {/*                            {*/}
                                                {/*                                (dv.os.toLowerCase().search("pple") !== -1) || (dv.os.toLowerCase().search("ios") !== -1) ?*/}

                                                {/*                                    <img*/}
                                                {/*                                        style={{*/}
                                                {/*                                            height: 24,*/}
                                                {/*                                            width: 24,*/}
                                                {/*                                            cursor: "pointer"*/}
                                                {/*                                        }}*/}
                                                {/*                                        src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1528267590z7F1mpbo0YspRmU.png"*/}
                                                {/*                                        alt=""/>*/}

                                                {/*                                    :*/}
                                                {/*                                    <i className="material-icons"*/}
                                                {/*                                       style={{cursor: "pointer"}}>*/}
                                                {/*                                        android*/}
                                                {/*                                    </i>*/}

                                                {/*                            }*/}
                                                {/*                        </TooltipButton>*/}
                                                {/*                    </div>*/}
                                                {/*                );*/}
                                                {/*            })*/}
                                                {/*        }*/}
                                                {/*    </div>*/}

                                                {/*</td>*/}
                                                <td>
                                                    <div className="dropdown dropleft">
                                                        <div className="cursor-pointer"
                                                             type="button" data-toggle="dropdown">
                                                            <i className="material-icons"
                                                               style={{fontSize: 22}}>more_horiz</i>
                                                        </div>
                                                        <ul className="dropdown-menu" style={{marginLeft: -125}}>
                                                            {register.is_delete && <li>
                                                                <a onClick={this.deleteRegister}>Xoá học viên</a>
                                                            </li>}
                                                            {register.status <= 3 && <li>

                                                                <a onClick={() => this.openModalChangeClass(register.id)}
                                                                   type="button"
                                                                >
                                                                    Đổi lớp
                                                                </a>
                                                            </li>}
                                                            <li>
                                                                <a onClick={this.updateClassLesson}>Xem chi tiết</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    {/*<ButtonGroupAction*/}
                                                    {/*    disabledEdit={true}*/}
                                                    {/*    edit={() => {*/}
                                                    {/*        // return this.props.openModalChangeInfoStudent(obj);*/}
                                                    {/*    }}*/}
                                                    {/*    delete={this.deleteRegister}*/}
                                                    {/*    object={register}*/}
                                                    {/*    disabledDelete={!register.is_delete}>*/}
                                                    {/*    <div className={"flex"}>*/}
                                                    {/*        {*/}
                                                    {/*            register.status <= 4 &&*/}
                                                    {/*            <TooltipButton*/}
                                                    {/*                text={register.status == 3 ? "Học lại" : "Đổi lớp"}*/}
                                                    {/*                placement={"top"}>*/}
                                                    {/*                <a onClick={() => this.openModalChangeClass(register.id)}*/}
                                                    {/*                   type="button"*/}
                                                    {/*                >*/}
                                                    {/*                    Đổi lớp*/}
                                                    {/*                </a>*/}
                                                    {/*            </TooltipButton>*/}

                                                    {/*        }*/}
                                                    {/*    </div>*/}
                                                    {/*</ButtonGroupAction>*/}
                                                </td>

                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div> :

                            <EmptyData/>}

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
        isLoadingChangeClasses: state.classes.isLoadingChangeClasses,
        changeClasses: state.classes.changeClasses,
        isChangingClass: state.classes.isChangingClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoClassContainer);
