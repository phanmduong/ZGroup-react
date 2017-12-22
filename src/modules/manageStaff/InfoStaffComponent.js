/**
 * Created by nangbandem.
 */
import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {NO_AVATAR} from '../../constants/env';


class InfoStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        let {name, email, role_id, base_id, department_id} = this.props.staffForm;
        let roleSelect = this.props.roles.filter(function (roleData) {
            return role_id == roleData.id;
        })[0];
        if (roleSelect === undefined || roleSelect === null) {
            roleSelect = {};
        }
        let avatar = helper.avatarEmpty(this.props.staffForm.avatar_url) ?
            NO_AVATAR : this.props.staffForm.avatar_url;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            {(this.props.isLoadingStaff ) ? <Loading/> :
                                <form id="form-add-staff" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <div className="card card-profile">
                                        <div className="card-avatar">
                                            <a className="content-avatar">
                                                <div className="img"
                                                     style={{
                                                         background: 'url(' + avatar + ') center center / cover',
                                                         width: '130px',
                                                         height: '130px'
                                                     }}
                                                />
                                            </a>
                                        </div>
                                        <div className="card-content"><h3>Thông tin nhân viên: {name}</h3></div>
                                    </div>
                                    <div className="card-content">
                                        <FormInputText
                                            label="Email"
                                            name="email"
                                            updateFormData={()=>{}}
                                            value={email}
                                            disabled
                                            type="email"
                                        />
                                        <div className="form-group">
                                            <label>Cơ sở</label>
                                            <select className="form-control"
                                                    value={base_id}
                                                    onChange={()=>{}}
                                                    name="base_id"
                                                    disabled
                                            >
                                                {this.props.bases !== null && this.props.bases !== undefined &&
                                                this.props.bases.map((base, key) => {
                                                    return (
                                                        <option
                                                            key={key}
                                                            value={base.id}
                                                        >

                                                            {!helper.isEmptyInput(base.name) && `${base.name}: ${base.address}`}
                                                        </option>);
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Chức vụ trong công ty</label>
                                            <select
                                                className="form-control"
                                                value={role_id}
                                                onChange={()=>{}}
                                                name="role_id"
                                                disabled
                                            >
                                                {this.props.roles !== null && this.props.roles !== undefined &&
                                                this.props.roles.map((item, key) => {
                                                    return (
                                                        <option
                                                            key={key}
                                                            value={item.id}
                                                        >
                                                            {item.role_title}
                                                        </option>);
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Bộ phận</label>
                                            <select
                                                className="form-control"
                                                value={department_id}
                                                onChange={()=>{}}
                                                name="department_id"
                                                disabled
                                            >
                                                {this.props.departments !== null && this.props.departments !== undefined &&
                                                this.props.departments.map((item, key) => {
                                                    return (
                                                        <option
                                                            key={key}
                                                            value={item.id}
                                                        >
                                                            {item.name}
                                                        </option>);
                                                })}
                                            </select>
                                        </div>
                                        {
                                            this.props.roles && (this.props.role == 2) ?

                                                <div>
                                                    <FormInputText
                                                        label="Lương cơ bản"
                                                        name="salary"
                                                        value={0}
                                                        disabled
                                                        type="text"
                                                        //updateFormData={()=>{}}
                                                    />
                                                    < FormInputText
                                                        label="Lương doanh thu"
                                                        name="salary_revenue"
                                                        value={0}
                                                        disabled
                                                        type="text"
                                                        //updateFormData={()=>{}}
                                                    />
                                                    <FormInputText
                                                        label="Lương phụ cấp"
                                                        name="salary_allowance"
                                                        value={0}
                                                        disabled
                                                        type="text"
                                                        //updateFormData={()=>{}}
                                                    />
                                                </div>
                                                :
                                                <div></div>
                                        }

                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

InfoStaffComponent.propTypes = {
    staffForm: PropTypes.object.isRequired,
    updateFormData: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired,
    addStaff: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    isLoadingAddStaff: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
    isLoadingStaff: PropTypes.bool.isRequired,
    isLoadingRoles: PropTypes.bool.isRequired,
    isResettingPassword: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
    departments: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};

export default InfoStaffComponent;
