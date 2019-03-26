import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {CirclePicker} from 'react-color';
import {NO_AVATAR} from '../../constants/env';


class AddStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    checkValidate() {
        if ($('#form-add-staff').valid()) {
            this.props.addStaff();
        }
    }

    showKPIValues(value) {
        if (value) {
            const regexNumber = new RegExp(/\B(?=([0-9]{3})+(?![0-9]))/, 'g');
            return value.replace(regexNumber, ".").replace(/,/g, ", ");
        } else {
            return "";
        }

    }

    render() {

        let {
            name, email, role_id, username,
            color, base_id, department_id,
            salary_allowance,
            kpis,
            bank_number,
            salary
        }
            = this.props.staffForm;

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
                    <div className="col-md-8">
                        <div className="card">
                            {(this.props.isLoadingStaff) ? <Loading/> :
                                <form id="form-add-staff" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    {/*<div className="card-header card-header-icon" data-background-color="rose">*/}
                                    {/*<i className="material-icons">contacts</i>*/}
                                    {/*</div>*/}
                                    <div className="card-content">
                                        <h4 className="card-title">
                                            {this.props.type === 'edit' ? 'Thay đổi thông tin nhân viên' : 'Thêm nhân viên'}
                                        </h4>
                                        <FormInputText
                                            label="Email"
                                            name="email"
                                            updateFormData={this.props.updateFormData}
                                            value={email}
                                            required={true}
                                            type="email"
                                        />
                                        <FormInputText
                                            label="Tên đăng nhập"
                                            name="username"
                                            value={username}
                                            required={true}
                                            type="text"
                                            updateFormData={this.props.updateFormData}
                                        />
                                        <div className="form-group">
                                            <label>Cơ sở</label>
                                            <select className="form-control"
                                                    value={base_id}
                                                    onChange={this.props.updateFormData}
                                                    name="base_id"
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
                                                onChange={this.props.updateFormData}
                                                name="role_id"
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
                                                onChange={this.props.updateFormData}
                                                name="department_id"
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
                                        <FormInputText
                                            label="KPIs (vd: 3000000,4000000,5000000)"
                                            name="kpis"
                                            value={kpis}
                                            //required={true}
                                            type="text"
                                            updateFormData={this.props.updateFormData}
                                        />
                                        <div>{this.showKPIValues(kpis)}</div>
                                        {

                                            this.props.roles && (this.props.role == 2) ?
                                                <div>
                                                    <FormInputText
                                                        label="Lương cơ bản"
                                                        name="salary"
                                                        value={salary}
                                                        //required={true}
                                                        type="number"
                                                        updateFormData={this.props.updateFormData}
                                                    />
                                                    {/*< FormInputText*/}
                                                    {/*label="Lương doanh thu"*/}
                                                    {/*name="salary_revenue"*/}
                                                    {/*value={salary_revenue}*/}
                                                    {/*//required={true}*/}
                                                    {/*type="number"*/}
                                                    {/*updateFormData={this.props.updateFormData}*/}
                                                    {/*/>*/}
                                                    <FormInputText
                                                        label="Phụ cấp"
                                                        name="salary_allowance"
                                                        value={salary_allowance}
                                                        //required={true}
                                                        type="number"
                                                        updateFormData={this.props.updateFormData}
                                                    />
                                                    <FormInputText
                                                        label="Số tài khoản ngân hàng"
                                                        name="bank_number"
                                                        value={bank_number}
                                                        type="text"
                                                        updateFormData={this.props.updateFormData}
                                                    />
                                                </div>
                                                :
                                                <div/>
                                        }

                                        {this.props.isLoadingAddStaff ?
                                            (
                                                <div className="col-md-12">
                                                    <button
                                                        className="btn btn-fill btn-rose disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/>
                                                        {this.props.type === 'edit' ? ' Đang cập nhật' : ' Đang thêm'}
                                                    </button>
                                                </div>
                                            )
                                            :
                                            (
                                                <button
                                                    className="btn btn-fill btn-rose"
                                                    onClick={() => this.checkValidate()}
                                                >
                                                    {this.props.type === 'edit' ? 'Cập nhật' : 'Thêm'}
                                                </button>
                                            )
                                        }
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-profile" style={{marginTop: '25px'}}>
                                    <div className="card-avatar" style={{margin: '30px auto 0'}}>
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
                                    <div className="card-content">
                                        <h6 className="category text-gray">
                                            {helper.isEmptyInput(roleSelect.role_title) ? 'Đây là chức vụ' : roleSelect.role_title}
                                        </h6>
                                        <h4 className="card-title">
                                            {helper.isEmptyInput(name) ? 'Đây là tên' : name}</h4>
                                        <p className="description">
                                            Bấm nút phía dưới để chọn ảnh đại diện
                                        </p>
                                        {(this.props.isChangingAvatar) ?
                                            (
                                                <button className="btn btn-rose btn-round disabled">
                                                    Đang tải lên
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="btn btn-rose btn-round">
                                                    Chọn ảnh
                                                    <input type="file"
                                                           accept=".jpg,.png,.gif"
                                                           onChange={this.props.handleFileUpload}
                                                           style={{
                                                               cursor: 'pointer',
                                                               opacity: "0.0",
                                                               position: "absolute",
                                                               top: 0,
                                                               left: 0,
                                                               bottom: 0,
                                                               right: 0,
                                                               width: "100%",
                                                               height: "100%"
                                                           }}
                                                    />
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    {/*<div className="card-header card-header-icon" data-background-color="rose">*/}
                                    {/*<i className="material-icons">contacts</i>*/}
                                    {/*</div>*/}
                                    <div className="card-content">
                                        <h4 className="card-title">Chọn màu</h4>
                                        <CirclePicker width="100%"
                                                      color={color}
                                                      onChangeComplete={this.props.changeColor}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    {/*<div className="card-header card-header-icon" data-background-color="rose">*/}
                                    {/*<i className="material-icons">contacts</i>*/}
                                    {/*</div>*/}
                                    <div className="card-content">
                                        <h4 className="card-title">Thay đổi mật khẩu</h4>
                                        {this.props.isResettingPassword ?
                                            (
                                                <button className="btn btn-rose btn-main disabled">
                                                    <i className="fa fa-spinner fa-spin"/> Đang khôi phục mật khẩu
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="btn btn-rose btn-main"
                                                        onClick={this.props.resetPassword}
                                                >
                                                    Khôi phục mật khẩu
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddStaffComponent.propTypes = {
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
    role: PropTypes.number,
};

export default AddStaffComponent;
