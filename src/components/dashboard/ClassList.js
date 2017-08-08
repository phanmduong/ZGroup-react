import React from 'react';
import Switch from 'react-bootstrap-switch';
import PropTypes from 'prop-types';

const ClassList = ({classes}) => {
    return (
        <div className="panel-body">
            <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                    <thead>
                    <tr>
                        <th/>
                        <th>Lớp</th>
                        <th>Cơ sở</th>
                        <th>Học viên đã nộp tiền</th>
                        <th>Số người đăng kí</th>
                        <th>Thời gian học</th>
                        <th>Ngày khai giảng</th>
                        <th>Trạng thái lớp</th>
                        <th>Kích hoạt</th>
                    </tr>
                    </thead>
                    <tbody>
                    {classes.map(function (classes, index) {
                        return (
                            <tr key={index}>
                                <td><img src={classes.avatar_url}
                                         style={{width: "40px", height: "40px", borderRadius: "25px"}}/></td>
                                <td>{classes.name}</td>
                                <td>{classes.name}</td>
                                <td>
                                    <div>{classes.total_paid + "/" + classes.paid_target}</div>
                                    <div className="progress" style={{height: "5px"}}>
                                        <div className="progress-bar progress-bar-success" role="progressbar"
                                             style={{width: (classes.total_paid / classes.paid_target) * 100 + "%"}}/>
                                    </div>
                                </td>
                                <td>
                                    <div>{classes.total_registers + "/" + classes.register_target}</div>
                                    <div className="progress" style={{height: "5px"}}>
                                        <div className="progress-bar progress-bar-info" role="progressbar"
                                             style={{width: (classes.total_registers / classes.register_target) * 100 + "%"}}/>
                                    </div>
                                </td>
                                <td>{classes.study_time}</td>
                                <td>{classes.datestart}</td>
                                <td><Switch bsSize="mini" onText="Bật" offText="Tắt" value={(classes.status !== 0)}/>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-xs btn-success">Kích hoạt</button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ClassList.propTypes = {
    classes: PropTypes.array.isRequired

};


export default ClassList;
