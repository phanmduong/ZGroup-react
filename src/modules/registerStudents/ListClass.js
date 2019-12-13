import React from 'react';
import PropTypes from 'prop-types';

class ListClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        console.log(this.props);
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th>Tên</th>
                        <th>Thời gian</th>
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
                                    <td>{classItem.study_time}
                                    {classItem.base && <div>{classItem.base.name + ' ' + classItem.base.address}</div>}
                                    </td>

                                    <td>
                                        <h6>{classItem.total_paid + "/" + classItem.target}</h6>
                                        <div className="progress progress-line-success progress-bar-table">
                                            <div className="progress-bar progress-bar-success" role="progressbar"
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
        );
    }
}

ListClass.propTypes = {
    classes: PropTypes.array.isRequired,
    confirmChangeClass: PropTypes.func.isRequired,
    isChangingClass: PropTypes.bool.isRequired,
};

export default ListClass;