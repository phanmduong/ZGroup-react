import React from 'react';
import {browserHistory} from 'react-router';

let self;

class ListStaff extends React.Component {
    constructor(props, context) {
        super(props, context);
        self = this;
    }

    editStaff(staffId){
        browserHistory.push(`staff/${staffId}/edit`);
    }

    render() {
        let {staffs, roles, bases} = this.props;
        return (
            <div className="col-lg-12">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Cơ sở</th>
                            <th>Chức vụ</th>
                            <th>Sửa</th>
                        </tr>
                        </thead>
                        <tbody>
                        {staffs.map(function (staff, index) {
                            return (
                                <tr key={index}>
                                    <td>{staff.name}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.phone}</td>
                                    {(staff.base_id > 0) ?
                                        (
                                            <td>
                                                {(bases !== null && bases.length > 0 &&
                                                    (<select className="form-control" defaultValue={staff.base_id}
                                                             onChange={(event) => {
                                                                 self.props.changeBaseStaff(staff.id, event.target.value);
                                                             }}
                                                    >
                                                        {bases.map((base, key) => {
                                                            return (
                                                                <option
                                                                    key={key}
                                                                    value={base.id}
                                                                >
                                                                    {`${base.name}: ${base.address}`}
                                                                </option>);
                                                        })}
                                                    </select>))
                                                }
                                            </td>
                                        )
                                        :
                                        (
                                            <td></td>
                                        )
                                    }
                                    <td>
                                        {(roles !== null && roles !== undefined &&
                                            (<select className="form-control" defaultValue={staff.role_id}
                                                     onChange={(event) => {
                                                         self.props.changeRoleStaff(staff.id, event.target.value);
                                                     }}>
                                                {roles.map((role, key) => {
                                                    return (
                                                        <option
                                                            key={key}
                                                            value={role.id}
                                                        >
                                                            {role.role_title}
                                                        </option>);
                                                })}
                                            </select>))
                                        }

                                    </td>
                                    <td className="icon-edit-staff" onClick={()=>self.editStaff(staff.id)}><i
                                        className="fa fa-pencil" aria-hidden="true"/></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListStaff;
