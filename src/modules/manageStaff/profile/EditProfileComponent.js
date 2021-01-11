import React from 'react';
import PropTypes from 'prop-types';
import {CirclePicker} from 'react-color';
import {
    avatarEmpty,
    isEmptyInput,
    setFormValidation,
    validateLinkImage
} from "../../../helpers/helper";
import {NO_AVATAR} from "../../../constants/env";
import FormInputText from "../../../components/common/FormInputText";
import TooltipButton from "../../../components/common/TooltipButton";
import {observer} from "mobx-react";

@observer
class EditProfileComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.store.profile
        };
    }

    checkValidate() {
        if ($('#form-edit-staff').valid()) {
            this.props.store.editStaff({
                ...this.state.profile,
                revenue:this.state.profile.salary
            });
        }
    }

    componentDidMount() {
        setFormValidation('#form-edit-staff');
    }

    handleFileUpload = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.value = "";
        input.accept = ".jpg,.png,.gif";
        input.onchange = (e) => {
            this.props.store.changeAvatar(e.target.files[0], (avatar_url) => {
                this.setState({profile: {...this.state.profile, avatar_url}});
            });
            // this.props.handleFileUpload(e);
        };
        input.click();

    };

    updateFormData = (event) => {
        const field = event.target.name;
        let staffForm = {...this.state.profile};
        if (staffForm[field] != event.target.value) {
            if (field === 'email') {
                if (isEmptyInput(staffForm['username']) || this.usernameEmpty) {
                    this.usernameEmpty = true;
                    staffForm['username'] = event.target.value;
                }
            }

            if (field === 'username') {
                this.usernameEmpty = false;
            }

            let value = event.target.value;

            staffForm[field] = value;

            this.setState({profile: staffForm});
        }
    }

    changeColor = (color) => {
        let staffForm = {...this.state.profile};
        staffForm.color = color.hex;
        this.setState({profile: staffForm});
    }

    render() {

        let {
            name, email, role_id, username,
            phone,
            color, base_id, department_id,
            salary_allowance,
            // kpis,
            avatar_url,
            weekly_working_hours,
            bank_number,
            bank_name_account,
            salary
        }
            = this.state.profile;
        const {isStoring, roles, bases, departments} = this.props.store;

        let roleSelect = roles.filter(function (roleData) {
            return role_id == roleData.id;
        })[0];
        if (isEmptyInput(roleSelect)) {
            roleSelect = {};
        }
        let avatar = avatarEmpty(avatar_url) ?
            NO_AVATAR : avatar_url;

        return (
            <div className={"card"}>
                <div className={"card-content"}>
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
                                                             backgroundImage: `url(${validateLinkImage(avatar)})`
                                                         }}>
                                                        <div className="son"><i className="material-icons">
                                                            photo_camera
                                                        </i></div>
                                                    </div>
                                                </TooltipButton>
                                            </div>

                                            <h4 className="card-title">{isEmptyInput(name) ? 'Đây là tên' : name}</h4>
                                            <span className="text-center color-white">
                                            {isEmptyInput(roleSelect.role_title) ? 'Đây là chức vụ' : roleSelect.role_title}
                                        </span>


                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-grey">
                                        <label className="margin-bottom-10">Chọn màu</label>
                                        <CirclePicker width="100%"
                                                      color={color}
                                                      onChangeComplete={this.changeColor}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">

                            <form id="form-edit-staff" onSubmit={(e) => {
                                e.preventDefault();
                            }} className="form-grey">

                                <label>Email *</label>
                                <FormInputText
                                    placeholder="Email"
                                    name="email"
                                    updateFormData={this.updateFormData}
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
                                    updateFormData={this.updateFormData}
                                />
                                <label>Họ và tên *</label>
                                <FormInputText
                                    placeholder="Họ và tên"
                                    name="name"
                                    value={name}
                                    required={true}
                                    type="text"
                                    updateFormData={this.updateFormData}
                                />
                                <label>Số điện thoại</label>
                                <FormInputText
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    value={phone}
                                    // required={true}
                                    type="text"
                                    updateFormData={this.updateFormData}
                                />
                                <div className="form-group">
                                    <label>Cơ sở</label>
                                    <select className="form-control"
                                            value={base_id}
                                            onChange={this.updateFormData}
                                            name="base_id"
                                    >
                                        {bases !== null && bases !== undefined &&
                                        bases.map((base, key) => {
                                            return (
                                                <option
                                                    key={key}
                                                    value={base.id}
                                                >

                                                    {!isEmptyInput(base.name) && `${base.name}: ${base.address}`}
                                                </option>);
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Chức vụ trong công ty</label>
                                    <select
                                        className="form-control"
                                        value={role_id}
                                        onChange={this.updateFormData}
                                        name="role_id"
                                    >
                                        {roles !== null && roles !== undefined &&
                                        roles.map((item, key) => {
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
                                        onChange={this.updateFormData}
                                        name="department_id"
                                    >
                                        {departments !== null && departments !== undefined &&
                                        departments.map((item, key) => {
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
                                {this.props.user.role >= 2 &&
                                <div>
                                    <label>Số giờ làm việc mỗi tuần</label>
                                    <FormInputText
                                        placeholder="Số giờ làm việc"
                                        name="weekly_working_hours"
                                        value={weekly_working_hours}
                                        //required={true}
                                        type="number"
                                        updateFormData={this.updateFormData}
                                    />
                                    <label>Lương cơ bản</label>
                                    <FormInputText
                                        placeholder="Lương cơ bản"
                                        name="salary"
                                        value={salary}
                                        //required={true}
                                        type="number"
                                        updateFormData={this.updateFormData}
                                    />
                                    <label>Phụ cấp</label>
                                    <FormInputText
                                        placeholder="Phụ cấp"
                                        name="salary_allowance"
                                        value={salary_allowance}
                                        //required={true}
                                        type="number"
                                        updateFormData={this.updateFormData}
                                    />
                                    <label>Tên tài khoản ngân hàng</label>
                                    <FormInputText
                                        placeholder="Tên tài khoản ngân hàng"
                                        name="bank_name_account"
                                        value={bank_name_account}
                                        type="text"
                                        updateFormData={this.updateFormData}
                                    />
                                    <label>Số tài khoản ngân hàng</label>
                                    <FormInputText
                                        placeholder="Số tài khoản ngân hàng"
                                        name="bank_number"
                                        value={bank_number}
                                        type="text"
                                        updateFormData={this.updateFormData}
                                    />
                                </div>
                                }

                                <div className="flex-end margin-top-10">
                                    {isStoring ?
                                        (

                                            <button
                                                className="btn button-green disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin"/>
                                                Đang cập nhật
                                            </button>

                                        )
                                        :
                                        (
                                            <button
                                                className="btn button-green"
                                                onClick={() => this.checkValidate()}
                                            >
                                                Cập nhật
                                            </button>
                                        )
                                    }
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

EditProfileComponent.propTypes = {
    store: PropTypes.object.isRequired,
};

export default EditProfileComponent;
