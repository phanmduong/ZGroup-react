import React from 'react';
import FormInputText from '../common/FormInputText';
import FormInputSelect from '../common/FormInputSelect';
import FormInputDate from '../common/FormInputDate';
import Loading from '../common/Loading';
import {MARITAL, LITERACY} from '../../constants/constants';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class EditStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.checkValidate = this.checkValidate.bind(this);
    }


    checkValidate() {
        if ($('#form-edit-staff').valid()) {
            this.props.editStaff();
        }
    }

    render() {
        let {name, email, age, address, homeland, phone, marital, literacy, role_id, start_company, username} = this.props.staffForm;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <form id="form-edit-staff" onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">contacts</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Cập nhật thông tin nhân viên</h4>
                                    {this.props.isLoadingStaff ? <Loading/> : (
                                        <div>
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
                                                disabled
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
                                                    value={role_id}
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
                                                value={helper.isEmptyInput(start_company) ? start_company : start_company.slice(0, 10)}
                                                id="form-date-start-company"
                                            />

                                            <div>
                                                {this.props.isLoadingUpdateStaff ?
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
                                                            onClick={this.checkValidate}
                                                        >
                                                            Cập nhật
                                                        </button>
                                                    )}


                                                {this.props.isLoadingDeleteStaff ?
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
                                                            onClick={this.props.deleteStaff}
                                                        >
                                                            Xóa
                                                        </button>
                                                    )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditStaffComponent.propTypes = {
    staffForm: PropTypes.object.isRequired,
    updateFormData: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
    editStaff: PropTypes.func.isRequired,
    isLoadingDeleteStaff: PropTypes.bool.isRequired,
    isLoadingUpdateStaff: PropTypes.bool.isRequired,
    isLoadingStaff: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
};

export default EditStaffComponent;
