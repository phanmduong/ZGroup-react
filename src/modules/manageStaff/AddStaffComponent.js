import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {CirclePicker} from 'react-color';
import {NO_AVATAR} from '../../constants/env';
import TooltipButton from "../../components/common/TooltipButton";



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

    handleFileUpload = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.value = "";
        input.accept = ".jpg,.png,.gif";
        input.onchange = (e) => {
            this.props.handleFileUpload(e);

        };
        input.click();

    };

    render() {

        let {
            name, email, role_id, username,
            phone,
            color, base_id, department_id,
            salary_allowance,
            // kpis,
            weekly_working_hours,
            bank_number,
            bank_name_account,
            salary
        }
            = this.props.staffForm;

        let roleSelect = this.props.roles.filter(function (roleData) {
            return role_id == roleData.id;
        })[0];
        if (helper.isEmptyInput(roleSelect)) {
            roleSelect = {};
        }
        let avatar = helper.avatarEmpty(this.props.staffForm.avatar_url) ?
            NO_AVATAR : this.props.staffForm.avatar_url;
        return (
            <div className={this.props.isModal ? '' : "card"}>
            <div className={this.props.isModal ? '' : "card-content"}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card" mask="blue">
                                    <div className="card-content flex flex-col">
                                        <div className="flex flex-justify-content-center">
                                            <TooltipButton text="Thay ảnh đại diện" placement="top">
                                                <div className="img father"
                                                     onClick={this.handleFileUpload}
                                                     style={{
                                                         backgroundImage: `url(${helper.validateLinkImage(avatar)})`
                                                     }}>
                                                    <div className="son"><i className="material-icons">
                                                        photo_camera
                                                    </i></div>
                                                </div>
                                            </TooltipButton>
                                        </div>

                                        <h4 className="card-title">{helper.isEmptyInput(name) ? 'Đây là tên' : name}</h4>
                                        <span className="text-center color-white">
                                            {helper.isEmptyInput(roleSelect.role_title) ? 'Đây là chức vụ' : roleSelect.role_title}
                                        </span>


                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-grey">
                                    <label className="margin-bottom-10">Chọn màu</label>
                                    <CirclePicker width="100%"
                                                  color={color}
                                                  onChangeComplete={this.props.changeColor}
                                    />
                                </div>
                            </div>
                            {this.props.route && this.props.route.type === 'edit' && <div className="col-md-12">
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
                            </div>}

                        </div>
                    </div>
                    <div className="col-md-8">

                        {(this.props.isLoadingStaff) ? <Loading/> :
                            <form id="form-add-staff" onSubmit={(e) => {
                                e.preventDefault();
                            }} className="form-grey">

                                <label>Email *</label>
                                <FormInputText
                                    placeholder="Email"
                                    name="email"
                                    updateFormData={this.props.updateFormData}
                                    value={email}
                                    required={true}
                                    type="email"
                                />
                                <label>Tên đăng nhập *</label>
                                <FormInputText
                                    placeholder="Tên đăng nhập"
                                    name="username"
                                    value={username}
                                    required={true}
                                    type="text"
                                    updateFormData={this.props.updateFormData}
                                />
                                <label>Họ và tên *</label>
                                <FormInputText
                                    placeholder="Họ và tên"
                                    name="name"
                                    value={name}
                                    required={true}
                                    type="text"
                                    updateFormData={this.props.updateFormData}
                                />
                                <label>Số điện thoại</label>
                                <FormInputText
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    value={phone}
                                    // required={true}
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
                                    <label>Phòng ban</label>
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
                                {/*<label>KPIs: </label>*/}
                                {/*<label>{this.showKPIValues(kpis)}</label>*/}
                                {/*<FormInputText*/}
                                {/*    placeholder="KPIs (vd: 3000000,4000000,5000000)"*/}
                                {/*    name="kpis"*/}
                                {/*    value={kpis}*/}
                                {/*    //required={true}*/}
                                {/*    type="text"*/}
                                {/*    updateFormData={this.props.updateFormData}*/}
                                {/*/>*/}
                                {
                                    this.props.roles && (this.props.role == 2) ?
                                        <div>
                                            <label>Số giờ làm việc mỗi tuần</label>
                                            <FormInputText
                                                placeholder="Số giờ làm việc"
                                                name="weekly_working_hours"
                                                value={weekly_working_hours}
                                                //required={true}
                                                type="number"
                                                updateFormData={this.props.updateFormData}
                                            />
                                            <label>Lương cơ bản</label>
                                            <FormInputText
                                                placeholder="Lương cơ bản"
                                                name="salary"
                                                value={salary}
                                                //required={true}
                                                type="number"
                                                updateFormData={this.props.updateFormData}
                                            />
                                            {/*< FormInputText*/}
                                            {/*placeholder="Lương doanh thu"*/}
                                            {/*name="salary_revenue"*/}
                                            {/*value={salary_revenue}*/}
                                            {/*//required={true}*/}
                                            {/*type="number"*/}
                                            {/*updateFormData={this.props.updateFormData}*/}
                                            {/*/>*/}
                                            <label>Phụ cấp</label>
                                            <FormInputText
                                                placeholder="Phụ cấp"
                                                name="salary_allowance"
                                                value={salary_allowance}
                                                //required={true}
                                                type="number"
                                                updateFormData={this.props.updateFormData}
                                            />
                                            <label>Tên tài khoản ngân hàng</label>
                                            <FormInputText
                                                placeholder="Tên tài khoản ngân hàng"
                                                name="bank_name_account"
                                                value={bank_name_account}
                                                type="text"
                                                updateFormData={this.props.updateFormData}
                                            />
                                            <label>Số tài khoản ngân hàng</label>
                                            <FormInputText
                                                placeholder="Số tài khoản ngân hàng"
                                                name="bank_number"
                                                value={bank_number}
                                                type="text"
                                                updateFormData={this.props.updateFormData}
                                            />
                                        </div>
                                        :
                                        <div/>
                                }
                                <div className="flex-end margin-top-10">
                                    {this.props.isLoadingAddStaff ?
                                        (

                                                <button
                                                    className="btn button-green disabled"
                                                >
                                                    <i className="fa fa-spinner fa-spin"/>
                                                    {this.props.type === 'edit' ? ' Đang cập nhật' : ' Đang thêm'}
                                                </button>

                                        )
                                        :
                                        (
                                            <button
                                                className="btn button-green"
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
    isModal: PropTypes.bool.isRequired,
    isResettingPassword: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
    departments: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    role: PropTypes.number,
};

export default AddStaffComponent;
