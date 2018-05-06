import React from 'react';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import PropTypes from 'prop-types';

class ListStudySession extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="text-rose">
                    <tr>
                        <th>Ngày trong tuần</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.studySessions.map(studySession => {
                        return (
                            <tr key={studySession.id}>
                                <td>{studySession.weekday}</td>
                                <td>{studySession.start_time}</td>
                                <td>{studySession.end_time}</td>
                                <td>
                                    <ButtonGroupAction
                                        delete={this.props.deleteStudySession}
                                        object={studySession}
                                        editUrl=""
                                        edit={this.props.onClickEdit}
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

ListStudySession.propTypes = {
    deleteStudySession: PropTypes.func.isRequired,
    studySessions: PropTypes.array.isRequired,
    onClickEdit: PropTypes.func.isRequired,
};


export default ListStudySession;
