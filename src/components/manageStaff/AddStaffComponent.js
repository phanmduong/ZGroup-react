import React from 'react';
import Header from '../common/Header';
import FormInputText from '../common/FormInputText';
import FormInputSelect from '../common/FormInputSelect';
import FormInputDate from '../common/FormInputDate';
import {MARITAL, LITERACY} from '../../constants/constants';
import toastr from 'toastr';

class AddStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isValidName: false,
            isValidEmail: false,
            isValidUsername: false,

        };
        this.checkValidate = this.checkValidate.bind(this);
    }

    checkValidate() {
        let {name, email, username} = this.props.staffForm;
        let isValidate = false;
        if (name === null || name === undefined || name.trim().length <= 0) {
            this.setState({
                isValidName: true,
            });
            isValidate = true;
        }
        if (email === null || email === undefined || email.trim().length <= 0) {
            this.setState({
                isValidEmail: true,
            });
            isValidate = true;
        }

        if (username === null || username === undefined || username.trim().length <= 0) {
            this.setState({
                isValidUsername: true,
            });
            isValidate = true;
        }

        if (!isValidate) {
            this.setState({
                isValidName: false,
                isValidEmail: false,
                isValidUsername: false,
            });
            this.props.addStaff();
        } else {
            toastr.error('Kiểm tra thông tin');
        }
    }

    render() {
        let {name, email, age, address, homeland, phone, marital, literacy, role, start_company, username} = this.props.staffForm;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <Header header="Thêm nhân viên" title="Quản lý nhân sự" iconTitle="fa fa-edit"/>
                    <form role="form">
                        <FormInputText
                            placeholder="Nhập họ và tên"
                            label="Họ và tên"
                            name="name"
                            updateFormData={this.props.updateFormData}
                            value={name}
                            notiValidate="Vui lòng nhập họ và tên"
                            isValidate={this.state.isValidName}
                        />
                        <FormInputText
                            placeholder="Nhập email"
                            label="Email"
                            name="email"
                            updateFormData={this.props.updateFormData}
                            value={email}
                            notiValidate="Vui lòng nhập email"
                            isValidate={this.state.isValidEmail}
                        />
                        <FormInputText
                            placeholder="Nhập tên đăng nhập"
                            label="Tên đăng nhập"
                            name="username"
                            updateFormData={this.props.updateFormData}
                            value={username}
                            notiValidate="Vui lòng nhập tên đăng nhập"
                            isValidate={this.state.isValidUsername}
                        />
                        <FormInputText
                            placeholder="Nhập tuổi"
                            label="Tuổi"
                            name="age"
                            updateFormData={this.props.updateFormData}
                            value={age}
                        />
                        <FormInputText
                            placeholder="Nhập địa chỉ"
                            label="Địa chỉ"
                            name="address"
                            updateFormData={this.props.updateFormData}
                            value={address}
                        />
                        <FormInputText
                            placeholder="Nhập số điện thoại"
                            label="Điện thoại"
                            name="phone"
                            updateFormData={this.props.updateFormData}
                            value={phone}
                        />
                        <FormInputSelect
                            data={MARITAL}
                            label="Tình trạng hôn nhân"
                            updateFormData={this.props.updateFormData}
                            name="marital"
                            value={marital}
                        />
                        <FormInputText
                            placeholder="Nhập quê quán"
                            label="Quê quán"
                            name="homeland"
                            updateFormData={this.props.updateFormData}
                            value={homeland}
                        />
                        <FormInputSelect
                            data={LITERACY}
                            label="Trình độ học vấn"
                            name="literacy"
                            updateFormData={this.props.updateFormData}
                            value={literacy}
                        />
                        <div className="form-group">
                            <label>Chức vụ trong công ty</label>
                            <select
                                className="form-control"
                                value={role}
                                onChange={this.props.updateFormData}
                                name="role"
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
                        <FormInputDate
                            placeholder="Nhập ngày hoạt động"
                            label="Hoạt đông trong công ty từ"
                            name="start_company"
                            updateFormData={this.props.updateFormData}
                            value={start_company.slice(0, 10)}
                        />

                        <div className="container-button-group-staff">
                            {this.props.isLoadingAddStaff ?
                                (
                                    <button
                                        type="button"
                                        className="btn btn-danger disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang thêm nhân viên
                                    </button>
                                )
                                :
                                (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={this.checkValidate}
                                    >
                                        Thêm nhân viên
                                    </button>
                                )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddStaffComponent;
