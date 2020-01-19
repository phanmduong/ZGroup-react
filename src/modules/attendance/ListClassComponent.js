import React from 'react';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {Link} from 'react-router';
import TooltipButton from '../../components/common/TooltipButton';

class ListClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (

            <div className="table-responsive table-split">

                {!this.props.isLoading && this.props.classes ?
                    <div>
                        {(this.props.classes && this.props.classes.length === 0) ?
                            <h3>Không tìm thấy kết quả</h3>
                            :
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th/>
                                    <th>Tên</th>
                                    <th>Giảng viên</th>
                                    <th>Trợ giảng</th>
                                    <th>Thời gian học</th>
                                    <th>Trạng thái lớp</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.classes.map((classItem) => {
                                    return (
                                        <tr key={classItem.id}>
                                            <td>
                                                <button
                                                    className="btn btn-round btn-fab btn-fab-mini text-white"
                                                    data-toggle="tooltip" title="" type="button"
                                                    rel="tooltip"
                                                    data-placement="right"
                                                    data-original-title={classItem.name}>
                                                    <img src={classItem.course.icon_url} alt=""/>
                                                </button>
                                            </td>
                                            <td>
                                                <a onClick={() => {}}>{classItem.name}</a>
                                            </td>
                                            <td>
                                                {
                                                    classItem.teacher ?
                                                        (
                                                            <button className="btn btn-xs btn-main"
                                                                    style={{backgroundColor: '#' + classItem.teacher.color}}
                                                                    onClick={() => {
                                                                        return this.props.searchByTeacher(1, "", classItem.teacher.id);
                                                                    }}
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
                                            <td>{classItem.study_time}</td>
                                            <td>{classItem.status === 1 ? 'Mở' : 'Đóng'}</td>
                                            <td>

                                                <TooltipButton text="Điểm danh" placement="top">
                                                    <Link className="btn btn-rose none-margin button-round "
                                                          style={{color: 'white'}}
                                                          type="button"
                                                          to={'/teaching/attendance/' + classItem.id}
                                                    ><i className="material-icons"
                                                        style={{left: 1}}>how_to_reg</i></Link>
                                                </TooltipButton>
                                            </td>
                                        </tr>
                                    );
                                })}

                                </tbody>
                            </table>
                        }
                    </div>
                    :
                    <Loading/>
                }

            </div>

        );
    }

}

ListClassComponent.propTypes = {
    classes: PropTypes.array,
    isLoading: PropTypes.bool,
    searchByTeacher: PropTypes.func,
};


export default (ListClassComponent);
