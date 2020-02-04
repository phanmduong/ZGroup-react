import React from 'react';
import Switch from 'react-bootstrap-switch';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import StatusesOverlay from "../infoStudent/overlays/StatusesOverlay";

class ListClass extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.statusRef = 'classes';
    }

    typeClass(type) {
        switch (type) {
            case 'active':
                return 'Hoạt động';
            case 'waiting':
                return 'Chờ';
            default:
                return 'Chưa xét';
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="table-responsive table-split">
                    <table className="table"  cellSpacing="0">
                        <thead className="text-rose">
                        <tr>
                            <th/>
                            <th>Tên</th>
                            <th>Ngày khai giảng</th>
                            <th>Thời gian học</th>
                            <th>Khóa</th>
                            <th>Giảng viên</th>
                            <th>Trợ giảng</th>
                            <th>Trạng thái</th>
                            <th>Trạng thái</th>
                            <th>Loại</th>
                            <th>Nộp tiền</th>
                            <th>Học viên</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.classes.map((classItem) => {
                                let color = classItem.total_register  >= classItem.regis_target ? 'success' : '';

                                return (
                                    <tr key={classItem.id} className={color}>
                                        <td>
                                            <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                    data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                    data-placement="right"
                                                    data-original-title={classItem.name}>
                                                <img src={classItem.course ? classItem.course.icon_url : ''} alt=""/>
                                            </button>
                                        </td>
                                        <td><Link to={`/teaching/class/${classItem.id}`}>{classItem.name}</Link></td>
                                        <td>{classItem.datestart}</td>
                                        <td>{classItem.study_time}</td>
                                        <td className="text-center">{classItem.gen ? classItem.gen.name : ''}</td>
                                        <td>
                                            {
                                                classItem.teacher ?
                                                    (
                                                        <Link className="btn btn-sm btn-main"
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

                                        </td>
                                        <td>
                                            {
                                                classItem.teacher_assistant ?
                                                    (
                                                        <Link className="btn btn-sm btn-main"
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
                                        <td>
                                            <StatusesOverlay
                                                data={classItem.classStatus}
                                                refId={classItem.id}
                                                statusRef={this.statusRef}
                                                className="btn status-overlay btn-xs"
                                            />
                                        </td>
                                        <td>
                                            {this.typeClass(classItem.type)}
                                        </td>
                                        <td>
                                            <h6>{classItem.total_paid + "/" + classItem.total_register}</h6>
                                            <div className="progress progress-line-success progress-bar-table">
                                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                                                     aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style={{width: (classItem.total_paid * 100 / classItem.total_register) + '%', maxWidth:'100%'}}>
                                                <span
                                                    className="sr-only">{classItem.total_paid * 100 / classItem.total_register}%</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h6>{classItem.total_register + "/" + classItem.regis_target}</h6>
                                            <div className="progress progress-line-success progress-bar-table">
                                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                                                     aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style={{width: (classItem.total_register * 100 / classItem.regis_target) + '%', maxWidth:'100%'}}>
                                                <span
                                                    className="sr-only">{classItem.total_register * 100 / classItem.regis_target}%</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <ButtonGroupAction
                                                disabledDelete={!classItem.is_delete_class}
                                                delete={this.props.deleteClass}
                                                object={classItem}
                                                edit={(classData) => this.props.openModalClass(classData, true)}
                                            >
                                                {
                                                    classItem.is_duplicate &&
                                                    <a data-toggle="tooltip" title="Duplicate"
                                                       type="button"
                                                       onClick={() => this.props.duplicateClass(classItem)}
                                                       rel="tooltip">
                                                        <i className="material-icons">control_point_duplicate</i>
                                                    </a>
                                                }

                                            </ButtonGroupAction>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
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