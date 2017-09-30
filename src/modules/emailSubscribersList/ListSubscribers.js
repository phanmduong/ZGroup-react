import React from 'react';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';

import PropTypes from 'prop-types';

class ListSubscribers extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th>Email</th>
                        <th>Tên</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.subscribers.map((subscribers, index) => {
                            return (
                                <tr key={index}>
                                    <td>{subscribers.email}</td>
                                    <td>{subscribers.name}</td>
                                    <td>
                                        <ButtonGroupAction
                                            delete={this.props.deleteSubscriber}
                                            object={subscribers.id}
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

ListSubscribers.propTypes = {
    deleteSubscriber: PropTypes.func.isRequired,
    subscribers: PropTypes.array.isRequired
};

export default ListSubscribers;
