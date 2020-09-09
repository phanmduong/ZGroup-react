import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {NO_AVATAR} from '../../constants/env';
import TooltipButton from "../../components/common/TooltipButton";
import * as globalModalActions from "../globalModal/globalModalActions";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";

class ListStaff extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showOverlay: [],
        };
    }

    openModalStaffDetail = (staffId) => {
        globalModalActions.openModalStaffDetail(staffId);
    }


    toggleOverlay = (key) => {
        let showOverlay = [...this.props.staffs].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };
    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    render() {
        let {staffs, roles, bases, departments} = this.props;
        return (
            <div className="col-md-12">
                <div className="table-sticky-head table-split" radius="five">
                    <table className="table">
                        <thead>
                        <tr>
                            <th/>
                            <th/>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Cơ sở</th>
                            <th>Chức vụ</th>
                            <th>Phòng ban</th>
                            {!this.props.disableActions && <th/>}
                        </tr>
                        </thead>
                        <tbody>
                        {staffs.map((staff, index) => {
                            let avatar = helper.avatarEmpty(staff.avatar_url)
                                ? NO_AVATAR
                                : staff.avatar_url;
                            let size = 20;
                            return (
                                <tr key={index}>
                                    <td style={{width: 50}}>
                                        <TooltipButton text={staff.role == 2 ? "Admin" : "Nhân viên"} placement="top">
                                            <div onClick={() => this.props.setAdmin(staff)}>
                                                {staff.role == 2 ?
                                                    <img style={{width: size, height: size, cursor: "pointer"}}
                                                         src="https://d1j8r0kxyu9tj8.cloudfront.net/files/1581669178CMRmRKD3gJa9Tk6.png"/>
                                                    :
                                                    <img style={{width: size, height: size, cursor: "pointer"}}
                                                         src="https://d1j8r0kxyu9tj8.cloudfront.net/files/1581669131WNpAkjzN0ooaKgK.png"/>

                                                }
                                            </div>
                                        </TooltipButton>

                                    </td>
                                    <td>
                                        <div
                                            className="avatar-list-staff"
                                            style={{
                                                background: 'url(' + avatar + ') center center / cover',
                                                display: 'inline-block'
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <a
                                            onClick={() => this.openModalStaffDetail(staff.id)}
                                        >{staff.name}</a>
                                    </td>
                                    <td>{staff.email}</td>
                                    <td>{staff.phone}</td>
                                    <td>
                                        {bases !== null &&
                                        bases.length > 0 && (
                                            <select
                                                disabled={this.props.disableActions}
                                                className="form-control padding-right-30 min-width-150-px height-26px"
                                                color="white"
                                                value={staff.base_id}
                                                onChange={(event) => {
                                                    this.props.changeBaseStaff(
                                                        staff.id,
                                                        event.target.value
                                                    );
                                                }}>
                                                <option disabled value="0" selected hidden>Chọn cơ sở</option>

                                                {bases.map((base, key) => {
                                                    return (
                                                        <option key={key} value={base.id} disabled={base.id == 0}>
                                                            {!helper.isEmptyInput(base.name) &&
                                                            `${base.name}: ${base.address}`}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        )}

                                    </td>
                                    <td>
                                        {roles !== null &&
                                        roles !== undefined && (
                                            <select
                                                disabled={this.props.disableActions}
                                                className="form-control height-26px"
                                                color="white"
                                                value={staff.role_id}
                                                placeholder="Chọn chức vụ"
                                                onChange={(event) => {
                                                    this.props.changeRoleStaff(
                                                        staff.id,
                                                        event.target.value
                                                    );
                                                }}>
                                                <option disabled value="0" selected hidden>Chọn chức vụ</option>
                                                {roles.map((role, key) => {
                                                    return (
                                                        <option key={key} value={role.id} disabled={role.id == 0}>
                                                            {role.role_title}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        )}
                                        {/*<StaffRoleOverlay*/}
                                        {/*    className="btn-actions none-margin width-100  min-width-150-px"*/}
                                        {/*    staff={staff}*/}

                                        {/*/>*/}
                                    </td>
                                    <td>
                                        {departments !== null &&
                                        departments !== undefined && (
                                            <select
                                                disabled={this.props.disableActions}
                                                className="form-control height-26px"
                                                color="white"
                                                placeholder="Chọn bộ phận"
                                                value={staff.department_id}
                                                onChange={(event) => {
                                                    this.props.changeDepartmentStaff(
                                                        staff.id,
                                                        event.target.value
                                                    );
                                                }}>
                                                <option disabled value="0" selected hidden>Chọn bộ phận</option>

                                                {departments.map((department, key) => {
                                                    return (
                                                        <option key={key} value={department.id}
                                                                disabled={department.id == 0}>
                                                            {department.name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        )}
                                    </td>

                                    {!this.props.disableActions && (
                                        <td>
                                            <div style={{position: "relative"}}
                                                 className="cursor-pointer" mask="table-btn-action">
                                                <div ref={'target' + staff.id}
                                                     onClick={() => this.toggleOverlay(staff.id)}
                                                     className="flex flex-justify-content-center cursor-pointer">
                                                    <i className="material-icons">more_horiz</i>
                                                </div>
                                                <Overlay
                                                    rootClose={true}
                                                    show={this.state.showOverlay[staff.id]}
                                                    onHide={() => this.closeOverlay(staff.id)}
                                                    placement="bottom"
                                                    container={() => ReactDOM.findDOMNode(this.refs['target' + staff.id]).parentElement}
                                                    target={() => ReactDOM.findDOMNode(this.refs['target' + staff.id])}>
                                                    <div className="kt-overlay overlay-container"
                                                         mask="table-btn-action" style={{
                                                        width: 150,
                                                        marginTop: 10,
                                                        left: -115,
                                                    }} onClick={() => this.closeOverlay(staff.id)}>
                                                        <button type="button"
                                                                className="btn btn-white width-100"
                                                                onClick={() => {
                                                                    window.open(`/hr/staff/${staff.id}?edit=true`);
                                                                }}>
                                                            Sửa thông tin
                                                        </button>
                                                        <button type="button"
                                                                className="btn btn-white width-100"
                                                                onClick={() => this.props.deleteStaff(staff)}>
                                                            Xóa nhân viên
                                                        </button>

                                                    </div>
                                                </Overlay>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ListStaff.propTypes = {
    roles: PropTypes.array.isRequired,
    staffs: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
    departments: PropTypes.array.isRequired,
    changeRoleStaff: PropTypes.func.isRequired,
    changeBaseStaff: PropTypes.func.isRequired,
    changeDepartmentStaff: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
    disableActions: PropTypes.bool.isRequired,
    titleList: PropTypes.string.isRequired
};

export default ListStaff;
