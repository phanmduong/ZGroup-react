import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import * as helper from '../../helpers/helper';
import {NO_AVATAR} from '../../constants/env';

let self;

class ListStaff extends React.Component {
    constructor(props, context) {
        super(props, context);
        self = this;
    }

    render() {
        let {staffs, roles, bases} = this.props;
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Danh sách nhân viên</h4>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th></th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Cơ sở</th>
                                    <th>Chức vụ</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {staffs.map(function (staff, index) {
                                    var avatar = helper.isEmptyInput(staff.avatar_url) ?
                                        NO_AVATAR : staff.avatar_url;
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img className="avatar-list-staff"
                                                     style={{
                                                         background: 'url(' + avatar + ') center center / cover',
                                                         display: 'inline-block'
                                                     }}
                                                />
                                            </td>
                                            <td>{staff.name}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.phone}</td>

                                            <td>
                                                {(bases !== null && bases.length > 0 &&
                                                    (<select className="form-control" value={staff.base_id}
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

                                                                    {!helper.isEmptyInput(base.name) && `${base.name}: ${base.address}`}
                                                                </option>);
                                                        })}
                                                    </select>))
                                                }
                                            </td>

                                            <td>
                                                {(roles !== null && roles !== undefined &&
                                                    (<select className="form-control" value={staff.role_id}
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
                                            <td>
                                                <ButtonGroupAction
                                                    delete={self.props.deleteStaff}
                                                    editUrl={`staff/${staff.id}/edit`}
                                                    object={staff}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

ListStaff.propTypes = {
    roles: PropTypes.array.isRequired,
    staffs: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
    changeRoleStaff: PropTypes.func.isRequired,
    changeBaseStaff: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
};

export default ListStaff;
