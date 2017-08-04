import React from 'react';
import Header from './common/Header';
import FormInputText from './common/FormInputText';
import FormInputSelect from './common/FormInputSelect';
import FormInputDate from './common/FormInputDate';
import Loading from './common/Loading';
import {MARITAL, LITERACY} from '../constants/constants';

class AddStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {name, email, age, address, homeland, phone, marital, literacy, role_id, start_company, username} = this.props.staffForm;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <Header header="Cập nhật thông tin nhân viên" title="Quản lý nhân sự" iconTitle="fa fa-edit"/>
                    {this.props.isLoadingStaff ? <Loading/> : (
                        <form role="form">
                            <FormInputText
                                placeholder="Nhập họ và tên"
                                label="Họ và tên"
                                name="name"
                                updateFormData={this.props.updateFormData}
                                value={name}
                            />
                            <FormInputText
                                placeholder="Nhập email (Tên đăng nhập)"
                                label="Email"
                                name="email"
                                updateFormData={this.props.updateFormData}
                                value={email}
                            />
                            <div className="form-group">
                                <label htmlFor="username">Nhập tên đăng nhập</label>
                                <input
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    placeholder="Nhập tên đăng nhập"
                                    value={username}
                                    onChange={this.props.updateFormData}
                                />
                            </div>
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
                                    defaultValue={role_id}
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
                                value={start_company}
                            />
                            <div style={{display: 'flex', width: '150px', justifyContent: 'space-between'}}>

                                    {this.props.isLoadingAddStaff ?
                                        (
                                            <button
                                                type="button"
                                                className="btn btn-success disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                            </button>
                                        )
                                        :
                                        (
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={this.props.addStaff}
                                            >
                                                Cập nhật
                                            </button>
                                        )}


                                    {this.props.isLoadingAddStaff ?
                                        (
                                            <button
                                                type="button"
                                                className="btn btn-danger disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin"/> Đang xóa
                                            </button>
                                        )
                                        :
                                        (
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={this.props.addStaff}
                                            >
                                                Xóa
                                            </button>
                                        )}
                            </div>
                        </form>
                    )
                    }

                </div>
            </div>
        );
    }
}

export default AddStaffComponent;
