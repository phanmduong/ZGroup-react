import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import Loading from '../../components/common/Loading';
import {MARITAL, LITERACY} from '../../constants/constants';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {CirclePicker} from 'react-color';



class AddStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    checkValidate() {
        if ($('#form-edit-profile').valid()) {
            this.props.editProfile();
        }
    }

    render() {
        const defaultUrl = "https://d1j8r0kxyu9tj8.cloudfront.net/images/1547828315z6g7GGcOkULNAc0.jpg";
        let {name, email, age, address, homeland, phone, marital, literacy, start_company, username, color, avatar_url, current_role} = this.props.profile;
        let avatar = helper.validateLinkImage(avatar_url, defaultUrl);

        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            {(this.props.isLoadingProfile) ? <Loading/> :
                                <form id="form-edit-profile" onSubmit={(e) => {
                                    e.preventDefault();
                                }}>
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">contacts</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">
                                            Chỉnh sửa thông tin cá nhân
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
                                            updateFormData={this.props.updateFormData}
                                            name="username"
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
                                        <FormInputDate
                                            label="Hoạt đông trong công ty từ"
                                            name="start_company"
                                            updateFormData={this.props.updateFormData}
                                            value={start_company.slice(0, 10)}
                                            id="form-date-start-company"
                                        />

                                        {this.props.isSaving ?
                                            (
                                                <button
                                                    className="btn btn-fill btn-rose disabled"
                                                >
                                                    <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                                </button>
                                            )
                                            :
                                            (
                                                <button
                                                    className="btn btn-fill btn-rose"
                                                    onClick={() => this.checkValidate()}
                                                >
                                                    Cập nhật
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
                                            <div className="img"
                                                 style={{
                                                     background: 'url(' + helper.validateLinkImage(avatar) + ') center center / cover',
                                                     width: '130px',
                                                     height: '130px'
                                                 }}
                                            />
                                        </a>
                                    </div>
                                    <div className="card-content">
                                        <h6 className="category text-gray">
                                            {helper.isEmptyInput(current_role.role_title) ? 'Đây là chức vụ' : current_role.role_title}
                                        </h6>
                                        <h4 className="card-title">
                                            {helper.isEmptyInput(name) ? 'Đây là tên' : name}</h4>
                                        <p className="description">
                                            Bấm nút phía dưới để thay đổi đại diện
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
                                                    Thay đổi
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
    profile: PropTypes.object.isRequired,
    editProfile: PropTypes.func.isRequired,
    isLoadingProfile: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
};

export default AddStaffComponent;
