import React from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';



class ListRole extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    editRole(roleId) {
        browserHistory.push(`/hr/role/${roleId}/edit`);
    }

    render() {
        let {roles} = this.props;
        return (
            <div >
                <div className="table-responsive table-split">
                    <table className="table">
                        <thead className="text-rose">
                        <tr>
                            <th>Chức vụ</th>
                            <th>Số quyền</th>
                            {!this.props.disableActions && <th>Sửa</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            roles.map((role, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{role.role_title}</td>
                                        <td>{role.num_tabs}</td>
                                        <td>
                                            {!this.props.disableActions && <ButtonGroupAction
                                                delete={this.props.deleteRole}
                                                // editUrl={`/hr/role/${role.id}/edit`}
                                                edit={this.props.openModalEdit}
                                                object={role.id}
                                            />}
                                        </td>
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
    deleteRole: PropTypes.func.isRequired,
    openModalEdit: PropTypes.func.isRequired,
    disableActions: PropTypes.bool.isRequired,
};

export default ListRole;
