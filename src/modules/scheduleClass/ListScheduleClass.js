import React from 'react';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import PropTypes from 'prop-types';

class ListScheduleClass extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="text-rose">
                    <tr>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Ca học</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.scheduleClasses.map(scheduleClass => {
                        return (
                            <tr key={scheduleClass.id}>
                                <td>{scheduleClass.name}</td>
                                <td>{scheduleClass.description}</td>
                                {//eslint-disable-next-line
                                }<td dangerouslySetInnerHTML={{__html: scheduleClass.sessions_str}}/>
                                <td>
                                    <ButtonGroupAction
                                        delete={this.props.deleteScheduleClass}
                                        object={scheduleClass}
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

ListScheduleClass.propTypes = {
    deleteScheduleClass: PropTypes.func.isRequired,
    scheduleClasses: PropTypes.array.isRequired,
    onClickEdit: PropTypes.func.isRequired,
};


export default ListScheduleClass;
