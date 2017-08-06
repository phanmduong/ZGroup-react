import React from 'react';
import {browserHistory} from 'react-router';

let self;

class ListRole extends React.Component {
    constructor(props, context) {
        super(props, context);
        self = this;
    }

    editStaff(staffId) {
        browserHistory.push(`staff/${staffId}/edit`);
    }

    render() {
        let {roles} = this.props;
        return (
            <div className="col-lg-12 table-manage-staff">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                        <tr>
                            <th className="cell-center">Chức vụ</th>
                            <th className="cell-center">Số quyền</th>
                            <th className="cell-center">Xóa</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            roles.map((role, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{role.role_title}</td>
                                        <td className="cell-center">{role.num_tabs}</td>
                                        <td className="icon-cell-table" onClick={() => self.props.deleteRole(role.id)}>
                                            <i className="fa fa-trash" aria-hidden="true"/></td>
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

export default ListRole;
