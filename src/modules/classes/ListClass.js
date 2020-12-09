import React from 'react';
import Switch from 'react-bootstrap-switch';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import StatusesOverlay from "../infoStudent/overlays/StatusesOverlay";
import {STATUS_REFS, TYPE_CLASSES_OBJECT} from "../../constants/constants";
import EmptyData from "../../components/common/EmptyData";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import * as helper from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";

class ListClass extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.statusRef = STATUS_REFS.classes;
        this.state = {
            showOverlay: [],

        };
    }

    typeClass(type) {
        // switch (type) {
        //     case 'active':
        //         return 'Hoạt động';
        //     case 'waiting':
        //         return 'Chờ';
        //     default:
        //         return 'Chưa xét';
        // }
        return TYPE_CLASSES_OBJECT[type] || '';
    }


    toggleOverlay = (key) => {
        let showOverlay = [...this.props.classes].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };

    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    render() {
        if (!this.props.classes || this.props.classes.length == 0) {
            return (<EmptyData/>);
        }
        return (

            <div radius="five" className="table-sticky-head table-split">
                <table
                    className="table">

                    {/*<div className="table-responsive table-split">*/}
                    {/*    <table className="table"  cellSpacing="0">*/}
                    <thead>
                    <tr>
                        <th/>
                        <th>Tên lớp học</th>
                        {/*<th>Môn học</th>*/}
                        <th>Giờ học</th>
                        <th>Khai giảng</th>
                        <th>Số đăng kí</th>
                        <th>Đã đóng h.phí</th>
                        <th>Đ.kí mới</th>
                        <th>Giảng viên</th>
                        <th>Trợ giảng</th>
                        <th>Trạng thái</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.classes.map((classItem) => {
                            let color = classItem.total_register >= classItem.regis_target ? 'success' : '';

                            let classCourse = classItem.course ? {
                                ...classItem.course,
                                name: `Môn học: ${classItem.course.name}`,
                                editUrl: `/teaching/courses/edit/${classItem.course.id}`,
                            } : {
                                name :'Chưa có môn học',
                                icon_url :'',
                                editUrl :'#',
                            };
                            return (
                                <tr key={classItem.id} className={color}>
                                    <td>
                                        <TooltipButton text={classCourse.name} placement="top">
                                            <Link to={classCourse.editUrl} target="_blank" className="btn btn-round btn-fab btn-fab-mini text-white">
                                                <img src={classCourse.icon_url} alt=""/>
                                            </Link>

                                        </TooltipButton>
                                    </td>
                                    <td><Link to={`/teaching/class/${classItem.id}`}
                                              target="_blank">{classItem.name}</Link></td>
                                    {/*<td>{classItem.course ? <Link to={`/teaching/courses/edit/${classItem.course.id}`}*/}
                                    {/*          target="_blank">{classItem.course.name}</Link> : 'Chưa có'}</td>*/}
                                    <td>{classItem.study_time}</td>
                                    <td>{classItem.datestart}</td>
                                    <td>
                                        <h6>{classItem.total_register + "/" + classItem.regis_target}</h6>
                                        <div className="progress progress-line-success progress-bar-table">
                                            <div className="progress-bar progress-bar-success" role="progressbar"
                                                 aria-valuenow="60"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style={{
                                                     width: (classItem.total_register * 100 / classItem.regis_target) + '%',
                                                     maxWidth: '100%'
                                                 }}>
                                                <span
                                                    className="sr-only">{classItem.total_register * 100 / classItem.regis_target}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6>{classItem.total_paid + "/" + classItem.target}</h6>
                                        <div className="progress progress-line-success progress-bar-table">
                                            <div className="progress-bar progress-bar-success" role="progressbar"
                                                 aria-valuenow="60"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style={{
                                                     width: (classItem.total_paid * 100 / classItem.target) + '%',
                                                     maxWidth: '100%'
                                                 }}>
                                                <span
                                                    className="sr-only">{classItem.total_paid * 100 / classItem.target}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        {classItem.edit_status ?
                                            (<Switch
                                                    genId={classItem.id}
                                                    onChange={() => {
                                                        this.props.changeClassStatus(classItem);
                                                    }}
                                                    onColor="success"
                                                    bsSize="mini"
                                                    onText="Bật" offText="Tắt"
                                                    value={(classItem.status === 1)}/>
                                            )
                                            :
                                            (
                                                classItem.status === 1 ? 'Mở' : 'Đóng'
                                            )
                                        }
                                    </td>
                                    <td className="text-center">
                                        {
                                            classItem.teacher ?
                                                (
                                                    <Link className="btn btn-xs btn-main text-center width-100 none-margin"
                                                          style={{backgroundColor: '#' + classItem.teacher.color}}
                                                          to={"/teaching/classes/" + classItem.teacher.id}
                                                    >
                                                        {helper.getShortName(classItem.teacher.name)}
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                )
                                                :
                                                (
                                                    <div className="no-data">
                                                        Không có
                                                    </div>
                                                )

                                        }

                                        {
                                            classItem.teachers && classItem.teachers.map((teacher) => {
                                                let itmClassName = `btn btn-xs btn-main text-center width-100  none-margin-bottom margin-top-10`;
                                                return (
                                                    <Link className={itmClassName}
                                                          style={{backgroundColor: '#' + teacher.color}}
                                                          to={"/teaching/classes/" + teacher.id}
                                                    >
                                                        {helper.getShortName(teacher.name)}
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                );
                                            })
                                        }
                                    </td>
                                    <td className="text-center">
                                        {
                                            classItem.teacher_assistant ?
                                                (
                                                    <Link className="btn btn-xs btn-main text-center width-100  none-margin"
                                                          style={{backgroundColor: '#' + classItem.teacher_assistant.color}}
                                                          to={"/teaching/classes/" + classItem.teacher_assistant.id}
                                                    >
                                                        {helper.getShortName(classItem.teacher_assistant.name)}
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                )
                                                :
                                                (
                                                    <div className="no-data">
                                                        Không có
                                                    </div>
                                                )
                                        }
                                        {
                                            classItem.teaching_assistants && classItem.teaching_assistants.map((teacher) => {
                                                let itmClassName = `btn btn-xs btn-main text-center width-100 none-margin-bottom margin-top-10 `;
                                                return (
                                                    <Link className={itmClassName}
                                                          style={{backgroundColor: '#' + teacher.color}}
                                                          to={"/teaching/classes/" + teacher.id}
                                                    >
                                                        {helper.getShortName(teacher.name)}
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                );
                                            })
                                        }
                                    </td>
                                    <td>
                                        <StatusesOverlay
                                            data={classItem.classStatus}
                                            refId={classItem.id}
                                            statusRef={this.statusRef}
                                            className="btn status-overlay btn-xs"
                                        />
                                    </td>
                                    {/*<td className="text-center">{classItem.gen ? classItem.gen.name : ''}</td>*/}


                                    {/*<td>*/}
                                    {/*    {this.typeClass(classItem.type)}*/}
                                    {/*</td>*/}

                                    <td>
                                        <div style={{position: "relative"}}
                                             className="cursor-pointer" mask="table-btn-action">
                                            <div ref={'target' + classItem.id}
                                                 onClick={() => this.toggleOverlay(classItem.id)}
                                                 className="flex flex-justify-content-center cursor-pointer">
                                                <i className="material-icons">more_horiz</i>
                                            </div>
                                            <Overlay
                                                rootClose={true}
                                                show={this.state.showOverlay[classItem.id]}
                                                onHide={() => this.closeOverlay(classItem.id)}
                                                placement="bottom"
                                                container={() => ReactDOM.findDOMNode(this.refs['target' + classItem.id]).parentElement}
                                                target={() => ReactDOM.findDOMNode(this.refs['target' + classItem.id])}>
                                                <div className="kt-overlay overlay-container"
                                                     mask="table-btn-action" style={{
                                                    width: 150,
                                                    marginTop: 10,
                                                    left: -115,
                                                }} onClick={() => this.closeOverlay(classItem.id)}>
                                                    <button type="button"
                                                            className="btn btn-white width-100"
                                                            onClick={() => this.props.openModalClass(classItem, true)}>
                                                        Sửa thông tin
                                                    </button>
                                                    {
                                                        classItem.is_duplicate && <button type="button"
                                                                                          className="btn btn-white width-100"
                                                                                          onClick={() => this.props.duplicateClass(classItem)}
                                                        >
                                                            Nhân đôi
                                                        </button>}
                                                    {classItem.is_delete_class && <button type="button"
                                                                                          className="btn btn-white width-100"
                                                                                          onClick={() => this.props.deleteClass(classItem)}>
                                                        Xóa
                                                    </button>}
                                                </div>
                                            </Overlay>
                                        </div>
                                        {/*<ButtonGroupAction*/}
                                        {/*    disabledDelete={!classItem.is_delete_class}*/}
                                        {/*    delete={this.props.deleteClass}*/}
                                        {/*    object={classItem}*/}
                                        {/*    edit={(classData) => this.props.openModalClass(classData, true)}*/}
                                        {/*>*/}
                                        {/*    {*/}
                                        {/*        classItem.is_duplicate &&*/}
                                        {/*        <a data-toggle="tooltip" title="Duplicate"*/}
                                        {/*           type="button"*/}
                                        {/*           onClick={() => this.props.duplicateClass(classItem)}*/}
                                        {/*           rel="tooltip">*/}
                                        {/*            <i className="material-icons">control_point_duplicate</i>*/}
                                        {/*        </a>*/}
                                        {/*    }*/}

                                        {/*</ButtonGroupAction>*/}
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>

        );
    }
}

ListClass.propTypes = {
    classes: PropTypes.array.isRequired,
    deleteClass: PropTypes.func.isRequired,
    duplicateClass: PropTypes.func.isRequired,
    changeClassStatus: PropTypes.func.isRequired,
    openModalClass: PropTypes.func.isRequired,
};

export default ListClass;
