import React from 'react';
import PropTypes from 'prop-types';
import * as registerActions from "./registerActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import {Link} from 'react-router';

class ListClass extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: ''
        };
    }

    onChangeSearch = (query) => {
        let {registerId} = this.props;
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.setState({value: query});
        this.timeOut = setTimeout(function () {
            this.props.registerActions.loadClasses(registerId, query);
        }.bind(this), 500);

    };

    render() {
        return (
            <div>
                <Search value={this.state.value}
                        className="gray-search" onChange={this.onChangeSearch} placeholder="Tìm kiếm"/>
                {this.props.isLoadingClasses ?
                    <Loading/>
                    : <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>Tên</th>
                                <th>Thời gian</th>
                                <th>Giảng viên</th>
                                <th>Trợ giảng</th>
                                <th>Trạng thái</th>
                                <th>Học viên đã nộp tiền</th>
                                <th>Học viên đã đăng kí</th>
                                <th>Đổi lớp</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.classes.map((classItem, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{classItem.name}</td>
                                            <td>

                                                <div>Thời gian học: {classItem.study_time}</div>
                                                <div>Ngày khai giảng: {classItem.datestart}</div>
                                                {classItem.base &&
                                                <div>{classItem.room &&
                                                (classItem.room.name + ' - ')}  {classItem.base.name + ' ' + classItem.base.address}</div>}

                                            </td>
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
                                                {
                                                    (
                                                        classItem.status === 1 ? 'Mở' : 'Đóng'
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <h6>{classItem.total_paid + "/" + classItem.target}</h6>
                                                <div className="progress progress-line-success progress-bar-table">
                                                    <div className="progress-bar progress-bar-success"
                                                         role="progressbar"
                                                         aria-valuenow="60"
                                                         aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width: classItem.total_paid * 100 / classItem.target}}>
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
                                                         style={{width: classItem.total_register * 100 / classItem.regis_target}}>
                                                <span
                                                    className="sr-only">{classItem.total_register * 100 / classItem.regis_target}%</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {this.props.isChangingClass ?
                                                    (
                                                        <button
                                                            className="btn btn-fill btn-rose disabled"
                                                        >
                                                            <i className="fa fa-spinner fa-spin"/> Đang thay đổi
                                                        </button>
                                                    )
                                                    :
                                                    (
                                                        <button
                                                            className="btn btn-fill btn-rose"
                                                            onClick={() => {
                                                                this.props.confirmChangeClass(classItem);
                                                            }}
                                                        >
                                                            Đổi
                                                        </button>
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
                }
            </div>
        );
    }
}

ListClass.propTypes = {
    classes: PropTypes.array.isRequired,
    confirmChangeClass: PropTypes.func.isRequired,
    isChangingClass: PropTypes.bool.isRequired,
};


function mapStateToProps(state) {
    return {
        isLoadingClasses: state.registerStudents.isLoadingClasses,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerActions: bindActionCreators(registerActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListClass);
