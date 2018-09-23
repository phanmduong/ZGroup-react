import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";

class ListNotification extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (
            <div className="table-responsive">
                <table id="good-table" className="table">
                    <thead>
                    <tr className="text-rose">
                        <th>Tên</th>
                        <th>Tiêu đề</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.notificationTypes.map((notificationType) => {
                            return (
                                <tr key={notificationType.id}>
                                    <td>
                                        {notificationType.name}
                                    </td>
                                    <td>{notificationType.description}</td>
                                    <td>
                                        <ButtonGroupAction
                                            delete={this.props.deleteNotificationType}
                                            object={notificationType}
                                            edit={()=>this.props.openModal(notificationType)}
                                        />
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

ListNotification.propTypes = {
    notificationTypes: PropTypes.array.isRequired,
    deleteNotificationType: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default ListNotification;