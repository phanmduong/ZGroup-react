import React from 'react';
import * as helper from '../../helpers/helper';
import {NO_AVATAR} from '../../constants/env';
import {TIME_FORMAT_H_M, FULLTIME_FORMAT} from '../../constants/constants';
import PropTypes from 'prop-types';

class ListShiftPick extends React.Component {
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
                        <th>Người trực</th>
                        <th>Ca trực</th>
                        <th>Tuần</th>
                        <th>Trang thái</th>
                        <th>Thời gian</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.shiftPicks.map((shiftPicks, index) => {
                        let avatar = shiftPicks.user && !helper.avatarEmpty(shiftPicks.user.avatar_url) ?
                            shiftPicks.user.avatar_url : NO_AVATAR;
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
                                <td>{shiftPicks.user ? shiftPicks.user.name : ''}</td>
                                <td>
                                    {shiftPicks.shift_pick.start_time ?
                                        (
                                            shiftPicks.shift_pick.name + ": " +
                                            helper.formatTime(shiftPicks.shift_pick.start_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], TIME_FORMAT_H_M) +
                                            ' - ' + helper.formatTime(shiftPicks.shift_pick.end_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], TIME_FORMAT_H_M)
                                        )
                                        : "Đã xóa"
                                    }
                                </td>
                                <td>{shiftPicks.shift_pick.week}</td>
                                <td>{
                                    (shiftPicks.shift_pick.status === 1 ?
                                            (
                                                <div className="text-success"><b>Đăng kí</b></div>
                                            )
                                            :
                                            (
                                                <div className="text-danger"><b>Hủy</b></div>
                                            )
                                    )
                                }</td>

                                <td>{shiftPicks.shift_pick.created_at}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListShiftPick.propTypes = {
    shiftPicks: PropTypes.array.isRequired
};

export default ListShiftPick;
