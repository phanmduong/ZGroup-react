import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-bootstrap-switch';
import _ from 'lodash';

class ListClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let classes = this.props.classes;
        classes  = _.orderBy(classes, item=> {
                if (item.room) {
                    return item.room.base_id;
                } else {
                    return 0;
                }
            }
        , ['asc']);

        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Tên</th>
                        <th>Cơ sở</th>
                        <th>Học viên đã nộp tiền</th>
                        <th>Học viên đã đăng kí</th>
                        <th>Thời gian học</th>
                        <th>Ngày khai giảng</th>
                        <th>Trạng thái lớp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        classes.map((classItem) => {
                            let course = classItem.course || {};
                            return (
                                <tr key={classItem.id}>
                                    <td>
                                        <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                data-placement="right"
                                                data-original-title={classItem.name}>
                                            <img src={course.icon_url} alt=""/>
                                        </button>
                                    </td>
                                    <td>
                                        <a className="color-text-main" onClick={() => this.props.openModalClass(classItem)}>{classItem.name}</a>
                                    </td>
                                    <td>
                                        {
                                            classItem.room && <div style={{minWidth: '50px'}}>{classItem.room.base}</div>
                                        }
                                    </td>
                                    <td>
                                        <h6>{classItem.total_paid + "/" + classItem.target}</h6>
                                        <div className="progress progress-line-success progress-bar-table">
                                            <div className="progress-bar progress-bar-success" role="progressbar"
                                                 aria-valuenow="60"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style={{width: classItem.total_paid * 100 / classItem.target+'%'}}>
                                                <span
                                                    className="sr-only">{classItem.total_paid * 100 / classItem.target}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6>{classItem.total_register + "/" + classItem.regis_target}</h6>
                                        <div className="progress progress-line-danger progress-bar-table">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="60"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style={{width: classItem.total_register * 100 / classItem.regis_target+'%'}}>
                                                <span
                                                    className="sr-only">{classItem.total_register * 100 / classItem.regis_target}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{classItem.study_time}</td>
                                    <td>{classItem.datestart}</td>
                                    <td>
                                        {classItem.edit_status ?
                                            (<Switch
                                                    genId={classItem.id}
                                                    onChange={() => {
                                                        this.props.changeClassStatus(classItem.id);
                                                    }}
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
    user: PropTypes.object.isRequired,
    changeClassStatus: PropTypes.func.isRequired,
    openModalClass: PropTypes.func.isRequired,
};

export default ListClass;