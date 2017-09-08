import React from 'react';
import Switch from 'react-bootstrap-switch';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import TooltipButton from '../../components/common/TooltipButton';
import {Link} from 'react-router';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';

class ListClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Tên</th>
                        <th>Ngày khai giảng</th>
                        <th>Thời gian học</th>
                        <th>Khóa</th>
                        <th>Giảng viên</th>
                        <th>Trợ giảng</th>
                        <th>Trạng thái tuyển sinh</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.classes.map((classItem) => {
                            return (
                                <tr>
                                    <td>
                                        <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                data-placement="right"
                                                data-original-title={classItem.name}>
                                            <img src={classItem.course ? classItem.course.icon_url : ''} alt=""/>
                                        </button>
                                    </td>
                                    <td>{classItem.name}</td>
                                    <td>{classItem.datestart}</td>
                                    <td>{classItem.study_time}</td>
                                    <td className="text-center">{classItem.gen ? classItem.gen.name : ''}</td>
                                    <td>
                                        {
                                            classItem.teacher ?
                                                (
                                                    <button className="btn btn-xs btn-main"
                                                            style={{backgroundColor: '#' + classItem.teacher.color}}
                                                    >
                                                        {helper.getShortName(classItem.teacher.name)}
                                                        <div className="ripple-container"/>
                                                    </button>
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
                                                    <button className="btn btn-xs btn-main"
                                                            style={{backgroundColor: '#' + classItem.teacher_assistant.color}}
                                                    >
                                                        {helper.getShortName(classItem.teacher_assistant.name)}
                                                        <div className="ripple-container"/>
                                                    </button>
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
                                    <td>
                                        <ButtonGroupAction
                                            disabledDelete={classItem.is_delete}
                                        >
                                            <a data-toggle="tooltip" title="Duplicate"
                                               type="button"
                                               rel="tooltip">
                                                <i className="material-icons">content_copy</i>
                                            </a>
                                        </ButtonGroupAction>
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
};

export default ListClass;