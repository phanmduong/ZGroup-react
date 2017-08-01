import React from 'react';

class ListStaff extends React.Component {
    constructor(props, context) {
        super(props, context);
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
                                                    (<select className="form-control" value={staff.base_id}>
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
                                        {(roles !== null && roles.length > 0 &&
                                            (<select className="form-control" value={staff.role_id}>
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
