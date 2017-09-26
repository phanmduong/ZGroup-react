import React from 'react';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
// import PropTypes from 'prop-types';

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
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
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
                                    <td>{subscribers.created_at}</td>
                                    <td>{subscribers.updated_at}</td>
                                    <td><ButtonGroupAction
                                    /></td>
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


export default ListSubscribers;
