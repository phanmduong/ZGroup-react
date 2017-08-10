import React from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

let self;

class ListRole extends React.Component {
    constructor(props, context) {
        super(props, context);
        self = this;
    }

    editRole(roleId) {
        browserHistory.push(`role/${roleId}/edit`);
    }

    render() {
        let {roles} = this.props;
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Danh sách chức vụ</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th>Chức vụ</th>
                                    <th>Số quyền</th>
                                    <th>Sửa</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    roles.map((role, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{role.role_title}</td>
                                                <td>{role.num_tabs}</td>
                                                <td onClick={() => self.editRole(role.id)}>
                                                    <i className="fa fa-pencil"/></td>
                                            </tr>);
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ListRole.propTypes = {
    roles: PropTypes.array.isRequired,
};

export default ListRole;
