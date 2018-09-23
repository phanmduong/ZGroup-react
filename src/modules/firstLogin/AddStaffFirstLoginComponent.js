import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import Loading from '../../components/common/Loading';
import { MARITAL, LITERACY } from '../../constants/constants';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import { Modal } from 'react-bootstrap';

class AddStaffFirstLoginComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    checkValidate() {
        if ($('#form-add-staff').valid()) {
            this.props.addStaff();
        }
    }

    render() {
        let { name, email, age, address, homeland, phone, marital, literacy, role_id, username, base_id } = this.props.staffForm;
        let roleSelect = this.props.roles.filter(function (roleData) {
            return role_id == roleData.id;
        })[0];
        if (roleSelect === undefined || roleSelect === null) {
            roleSelect = {};
        }

        return (

            <div>
                <Modal
                    bsSize="large"
                    show={false}
                >


                    <div className="card">
                        {(this.props.isLoadingStaff) ? <Loading /> :
                            <form id="form-add-staff" onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <div className="card-content">
                                    <h4 className="card-title"><strong>
                                        {'Thêm thông tin nhân viên'}</strong>
                                    </h4>

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
                                        value={username}
                                        required={true}
                                        type="text"
                                        updateFormData={this.props.updateFormData}
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

                                    {this.props.isLoadingAddStaff ?
                                        (
                                            <button
                                                className="btn btn-fill btn-rose disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin" />
                                                {'Đang cập nhật'}
                                            </button>
                                        )
                                        :
                                        (
                                            <button
                                                className="btn btn-fill btn-rose"
                                                onClick={() => this.checkValidate()}
                                            >
                                                {'Cập nhật'}
                                            </button>
                                        )
                                    }
                                </div>
                            </form>
                        }
                    </div>

                </Modal>
            </div>
        );
    }
}

AddStaffFirstLoginComponent.propTypes = {
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
    type: PropTypes.string,
};

export default AddStaffFirstLoginComponent;
