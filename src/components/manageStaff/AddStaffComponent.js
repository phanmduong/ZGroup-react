import React from 'react';
import FormInputText from '../common/FormInputText';
import FormInputSelect from '../common/FormInputSelect';
import FormInputDate from '../common/FormInputDate';
import {MARITAL, LITERACY} from '../../constants/constants';
import PropTypes from 'prop-types';

class AddStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    checkValidate() {
        if ($('#form-add-staff').valid()) {
            this.props.addStaff();
        }
    }

    render() {
        let {name, email, age, address, homeland, phone, marital, literacy, role, start_company, username} = this.props.staffForm;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <form id="form-add-staff" onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">contacts</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Thêm nhân viên</h4>

                                    <FormInputText
                                        label="Họ và tên"
                                        name="name"
                                        updateFormData={this.props.updateFormData}
                                        value={name}
                                        required={true}
                                        type="text"
                                    />
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
                                        updateFormData={this.props.updateFormData}
                                        value={username}
                                        required={true}
                                        type="text"
                                    />
                                    <FormInputText
                                        label="Tuổi"
                                        name="age"
                                        updateFormData={this.props.updateFormData}
                                        value={age}
                                        type="number"
                                    />
                                    <FormInputText
                                        label="Địa chỉ"
                                        name="address"
                                        updateFormData={this.props.updateFormData}
                                        value={address}
                                        type="text"
                                    />
                                    <FormInputText
                                        label="Số điện thoại"
                                        name="phone"
                                        updateFormData={this.props.updateFormData}
                                        value={phone}
                                        type="tel"
                                    />
                                    <FormInputSelect
                                        data={MARITAL}
                                        label="Tình trạng hôn nhân"
                                        updateFormData={this.props.updateFormData}
                                        name="marital"
                                        value={marital}
                                    />
                                    <FormInputText
                                        label="Quê quán"
                                        name="homeland"
                                        updateFormData={this.props.updateFormData}
                                        value={homeland}
                                        type="text"
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
                                        label="Hoạt đông trong công ty từ"
                                        name="start_company"
                                        updateFormData={this.props.updateFormData}
                                        value={start_company.slice(0, 10)}
                                        id="form-date-start-company"
                                    />

                                    {this.props.isLoadingAddStaff ?
                                        (
                                            <button
                                                className="btn btn-fill btn-rose disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin"/> Đang thêm nhân viên
                                            </button>
                                        )
                                        :
                                        (
                                            <button
                                                className="btn btn-fill btn-rose"
                                                onClick={() => this.checkValidate()}
                                            >
                                                Thêm nhân viên
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

AddStaffComponent.propTypes = {
    staffForm: PropTypes.object.isRequired,
    updateFormData: PropTypes.func.isRequired,
    addStaff: PropTypes.func.isRequired,
    isLoadingAddStaff: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
};

export default AddStaffComponent;
