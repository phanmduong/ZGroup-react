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
            <div className="col-lg-12">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
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
                                        <td >{role.role_title}</td>
                                        <td >{role.num_tabs}</td>
                                        <td onClick={()=>self.editRole(role.id)}>
                                            <i className="fa fa-pencil"/></td>
                                    </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


ListRole.propTypes = {
    roles: PropTypes.array.isRequired,
};

export default ListRole;
