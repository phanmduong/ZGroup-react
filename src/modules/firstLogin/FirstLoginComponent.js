import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import Loading from '../../components/common/Loading';
import {MARITAL, LITERACY} from '../../constants/constants';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {CirclePicker} from 'react-color';
import {NO_AVATAR} from '../../constants/env';
import {Modal} from 'react-bootstrap';

class FirstLoginComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.editProfile  = this.editProfile.bind(this);
    }

    checkValidate() {
        if ($('#form-edit-profile').valid()) {
            let {marital, literacy,avatar_url,color} = this.props.profile;
            let default_avt_url = "http://d1j8r0kxyu9tj8.cloudfront.net/user.png";
            if (helper.isEmptyInput(marital) || marital == 0){
                helper.showErrorNotification("Vui lòng chọn tình trạng hôn nhân");
                return false;
            }
            if (helper.isEmptyInput(literacy) || literacy == 0){
                helper.showErrorNotification("Vui lòng chọn trình độ học vấn");
                return false;
            }
            if (helper.isEmptyInput(avatar_url) || default_avt_url == avatar_url){
                helper.showErrorNotification("Vui lòng chọn ảnh đại diện");
                return false;
            }
            if (helper.isEmptyInput(color) || color == 0){
                helper.showErrorNotification("Vui lòng chọn màu sắc");
                return false;
            }
            return true;
        }
        return false;
    }

    editProfile(){
        if(this.checkValidate())
            this.props.editProfile();
    }

    render() {
        let {name, email, age, address, homeland, phone, marital, literacy, username, color, avatar_url, current_role} = this.props.profile;
        let avatar = helper.avatarEmpty(avatar_url) ?
            NO_AVATAR : avatar_url;
        return (


                <Modal
                    show={!this.props.first_login && !this.props.updateSuccess}
                    bsSize="large"
                >
                    <Modal.Header>
                        <Modal.Title>Thêm thông tin cá nhân</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    {(this.props.isLoadingProfile ) ? <Loading/> :
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
                                                    required={true}
                                                />
                                                <FormInputText
                                                    label="Địa chỉ"
                                                    name="address"
                                                    updateFormData={this.props.updateFormData}
                                                    value={address}
                                                    type="text"
                                                    required={true}
                                                />
                                                <FormInputText
                                                    label="Số điện thoại"
                                                    name="phone"
                                                    updateFormData={this.props.updateFormData}
                                                    value={phone}
                                                    type="tel"
                                                    required={true}
                                                />
                                                <FormInputSelect
                                                    data={MARITAL}
                                                    label="Tình trạng hôn nhân"
                                                    updateFormData={this.props.updateFormData}
                                                    name="marital"
                                                    value={marital}
                                                    required={true}
                                                />
                                                <FormInputText
                                                    label="Quê quán"
                                                    name="homeland"
                                                    updateFormData={this.props.updateFormData}
                                                    value={homeland}
                                                    type="text"
                                                    required={true}
                                                />
                                                <FormInputSelect
                                                    data={LITERACY}
                                                    label="Trình độ học vấn"
                                                    name="literacy"
                                                    updateFormData={this.props.updateFormData}
                                                    value={literacy}
                                                    required={true}
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
                                                            onClick={() => this.editProfile()}
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
                                                             background: 'url(' + avatar + ') center center / cover',
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
                    </Modal.Body>
                </Modal>


        );
    }
}

FirstLoginComponent.propTypes = {
    profile: PropTypes.object.isRequired,
    editProfile: PropTypes.func.isRequired,
    isLoadingProfile: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
    first_login: PropTypes.number.isRequired,
    updateSuccess: PropTypes.bool.isRequired,
    updateFormData: PropTypes.func.isRequired,
    changeColor: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
};

export default FirstLoginComponent;
