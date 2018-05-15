import React from 'react';
import PropTypes from 'prop-types';

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
                        <th>Mẫu</th>
                        <th>Người tạo</th>
                        <th>Ngày tạo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.historyNotifications && this.props.historyNotifications.map((notificationType) => {
                            return (
                                <tr key={notificationType.id}>
                                    <td>
                                        {notificationType.name}
                                    </td>
                                    <td>{notificationType.creator ? notificationType.creator.name : ''}</td>
                                    <td>{notificationType.notification_type ? notificationType.notification_type.name : ''}</td>
                                    <td>{notificationType.created_at}</td>
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
    historyNotifications: PropTypes.array.isRequired,
};

export default ListNotification;