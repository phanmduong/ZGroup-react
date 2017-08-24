import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import Loading from '../../components/common/Loading';
import {MARITAL, LITERACY} from '../../constants/constants';
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

    render() {
        let {name, email, age, address, homeland, phone, marital, literacy, role_id, start_company, username, color} = this.props.staffForm;
        let roleSelect = this.props.roles.filter(function (roleData) {
            return role_id == roleData.id;
        })[0];
        if (roleSelect === undefined || roleSelect === null) {
            roleSelect = {};
        }
        let avatar = helper.isEmptyInput(this.props.staffForm.avatar_url) ?
            NO_AVATAR : this.props.staffForm.avatar_url;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            {(this.props.isLoadingStaff ) ? <Loading/> :
                                <form id="form-add-staff" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">contacts</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">
                                            {this.props.type === 'edit' ? 'Thay đổi thông tin nhân viên' : 'Thêm nhân viên'}
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
                                                    <i className="fa fa-spinner fa-spin"/>
                                                    {this.props.type === 'edit' ? ' Đang cập nhật' : ' Đang thêm'}
                                                </button>
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
                                <div className="card card-profile">
                                    <div className="card-avatar">
                                        <a className="content-avatar">
                                            <img className="img"
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
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">contacts</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Chọn màu</h4>
                                        <CirclePicker width="100%"
                                                      color={color}
                                                      onChangeComplete={this.props.changeColor}
                                        />
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
    handleFileUpload: PropTypes.func.isRequired,
    isLoadingAddStaff: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
    isLoadingStaff: PropTypes.bool.isRequired,
    isLoadingRoles: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};

export default AddStaffComponent;
