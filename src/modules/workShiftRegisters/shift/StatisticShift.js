import React from 'react';
import PropTypes from 'prop-types';
import {getHoursTime, convertSecondToTime, avatarEmpty} from "../../../helpers/helper";
import {NO_AVATAR} from '../../../constants/env';

class StatisticShift extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const maxTime = getHoursTime(convertSecondToTime(this.props.maxTotalTime));
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Họ và tên</th>
                        <th>Số ca làm việc</th>
                        <th>Tổng thời gian làm việc</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.statisticShift.map((user, index) => {
                                let avatar = avatarEmpty(user.avatar_url) ?
                                    NO_AVATAR : user.avatar_url;
                                const time = getHoursTime(convertSecondToTime(user.total_time));
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
                                        <td>{user.name}</td>
                                        <td>
                                            <h6>{user.total_shift + "/" + this.props.maxTotalShift}</h6>
                                            <div
                                                className="progress progress-line-success progress-bar-table full-width">
                                                <div className="progress-bar progress-bar-success" role="progressbar"
                                                     aria-valuenow="60"
                                                     aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style={{width: user.total_shift * 100 / this.props.maxTotalShift + "%"}}>
                                                <span
                                                    className="sr-only">{user.total_shift * 100 / this.props.maxTotalShift}%</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h6>{time + "H/" + maxTime + "H"}</h6>
                                            <div
                                                className="progress progress-line-success progress-bar-table full-width">
                                                <div className="progress-bar progress-bar-success" role="progressbar"
                                                     aria-valuenow="60"
                                                     aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style={{width: time * 100 / maxTime + "%"}}>
                                                <span
                                                    className="sr-only">{time * 100 / maxTime}%</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

StatisticShift.propTypes = {
    maxTotalShift: PropTypes.number.isRequired,
    maxTotalTime: PropTypes.number.isRequired,
    statisticShift: PropTypes.array.isRequired,
};

export default StatisticShift;
