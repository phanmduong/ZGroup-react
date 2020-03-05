import React from 'react';
import Checkbox from '../../components/common/Checkbox';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import moment from 'moment';
import {TIME_FORMAT_H_M, FULLTIME_FORMAT} from '../../constants/constants';
import PropTypes from 'prop-types';

class ListShiftSession extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive table-split">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Ca làm việc</th>
                        <th>Thời điểm bắt đầu</th>
                        <th>Thời điểm kết thúc</th>
                        <th>Kích hoạt</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.workShiftSessions && this.props.workShiftSessions.map((shiftSession, index) => {
                        return (
                            <tr key={index}>
                                <td>{shiftSession.name}</td>
                                <td>{moment(shiftSession.start_time, FULLTIME_FORMAT).format(TIME_FORMAT_H_M)}</td>
                                <td>{moment(shiftSession.end_time, FULLTIME_FORMAT).format(TIME_FORMAT_H_M)}</td>
                                <td>
                                    <Checkbox
                                        name="optionsCheckboxes"
                                        checked={shiftSession.active === 1}
                                        disabled
                                    />
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        edit={this.props.openModalStore}
                                        object={shiftSession}
                                        delete={this.props.deleteShiftSession}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListShiftSession.propTypes = {
    workShiftSessions: PropTypes.array.isRequired,
    openModalStore: PropTypes.func.isRequired,
    deleteShiftSession: PropTypes.func.isRequired,
};

export default ListShiftSession;
