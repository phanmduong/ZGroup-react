/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import * as studentActions from './studentActions';
import * as helper from '../../helpers/helper';
// import {NO_AVATAR, PROTOCOL} from '../../constants/env';
import {Modal} from 'react-bootstrap';
import FormInputText from '../../components/common/FormInputText';
import ChangePassword from "./ChangePassword";
import {GENDER} from "../../constants/constants";
import FormInputDate from "../../components/common/FormInputDate";
import ReactSelect from "react-select";
import * as createRegisterActions from "../registerStudents/createRegisterActions";
import {isEmptyInput} from "../../helpers/helper";
import Loading from "../../components/common/Loading";

class InfoStudentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.studentId = this.props.params.studentId;
        this.path = '';
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.editInfoStudent = this.editInfoStudent.bind(this);
        this.openModalChangePassword = this.openModalChangePassword.bind(this);
        this.closeModalChangePassword = this.closeModalChangePassword.bind(this);
        this.state = {
            showModal: false,
            student: {},
            showModalChangePassword: false,
            showModalViewImage: false,
            imageUrl: ''
        };
    }

    componentWillMount() {
        this.props.studentActions.loadInfoStudent(this.studentId);
        this.props.createRegisterActions.loadAllProvinces();
    }

    componentDidUpdate() {
        helper.setFormValidation('#form-edit-student');
    }

    updateFormData(event) {
        const field = event.target.name;
        let student = {...this.state.student};
        student[field] = event.target.value;
        this.setState(
            {
                student: student
            }
        );
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState(
            {
                showModal: true,
                student: this.props.student
            }
        );
    }

    editInfoStudent() {
        if ($('#form-edit-student').valid()) {
            this.props.studentActions.editInfoStudent(this.state.student, this.closeModal);
        }
    }

    closeModalChangePassword() {
        this.setState({showModalChangePassword: false});
    }

    openModalChangePassword() {
        this.setState({showModalChangePassword: true});
    }

    openModalImageView = (imageUrl) => {
        this.setState({
            showModalViewImage: true,
            imageUrl: imageUrl
        });
    };

    handleFileUpload(event, image) {
        let file = event.target.files[0];
        this.props.studentActions.uploadImage(file, this.studentId, image);
    }

    updateGender = (e) => {
        let student = {...this.state.student};
        student["gender"] = e.value;
        this.setState(
            {
                student: student
            }
        );
    };

    updateAddress = (e) => {
        let student = {...this.state.student};
        student["address"] = e.value;
        this.setState(
            {
                student: student
            }
        );
    };

    getDataAddress = () => {
        if (!this.props.provinces || this.props.provinces.length <= 0) return;
        let address = [];

        this.props.provinces.forEach((province) => {
            province.districts.forEach((district) => {
                address = [...address, {
                    value: `${district.type} ${district.name}, ${province.type} ${province.name}`,
                    label: `${district.type} ${district.name}, ${province.type} ${province.name}`,
                }];
            });

        });

        if (!isEmptyInput(this.state.student.address)) {
            address = [...address, {
                value: this.state.student.address,
                label: this.state.student.address,
            }];
        }

        return address;
    };

    render() {
        this.path = this.props.location.pathname;
        // let gender = GENDER.filter((item) => item.value == this.props.student.gender)[0];
        return (
            <div>
                {this.props.isLoadingStudent && <Loading/>}
                {!this.props.isLoadingStudent && <div className="row">
                    <div className="col-md-12">

                        <div className="card" mask="gradient">
                            <div className="card-content">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="flex flex-wrap">
                                            <div style={{marginRight: 20}}>
                                                <div className="img"
                                                     style={{
                                                         backgroundImage: `url(${helper.validateLinkImage(this.props.student.avatar_url)})`
                                                     }}
                                                />

                                            </div>
                                            <div>
                                                <h4 className="card-title">{this.props.student.name}</h4>
                                                <h6 className="category text-gray text-email">
                                                    {this.props.student.email}&nbsp;&nbsp;&nbsp;
                                                    <span>{this.props.student.phone}</span>
                                                </h6>
                                                {this.props.isEditingStudent ?
                                                    (
                                                        <button
                                                            className="btn btn-white btn-register-action disabled"
                                                        >
                                                            <i className="fa fa-spinner fa-spin"/> Đang sửa
                                                        </button>
                                                    )
                                                    :
                                                    <button className="btn btn-white btn-register-action"
                                                            onClick={this.openModal}
                                                    >Sửa
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="source-wrap">
                                            <div className="source-name">Nguồn</div>
                                            <div className="source-value">N/A</div>
                                        </div>
                                        <div className="source-wrap">
                                            <div className="source-name">Kênh</div>
                                            <div className="source-value">N/A</div>
                                        </div>
                                        <div className="source-wrap">
                                            <div className="source-name">Người nhập</div>
                                            <div className="source-value">N/A</div>
                                        </div>
                                        <div className="source-wrap">
                                            <div className="source-name">P.I.C</div>
                                            <div className="source-value">N/A</div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="detail-wrap">
                                            <p>Ngày sinh<strong>{this.props.student.dob}</strong></p>
                                            <p>Địa chỉ<strong>{this.props.student.address}</strong></p>
                                            <p>Tên phụ huynh<strong>N/A</strong></p>
                                            <p>Nơi làm việc<strong>{this.props.student.work}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className="row">
                    {!this.props.isLoadingStudent &&
                    <div className="col-md-12">
                        <ul className="nav nav-pills nav-pills-gradient" data-tabs="tabs">
                            <li className={this.path === `/sales/info-student/${this.studentId}` ? 'active' : ''}>
                                <IndexLink to={`/sales/info-student/${this.studentId}`}>
                                    Đăng kí
                                </IndexLink>
                            </li>
                            <li className={this.path === `/sales/info-student/${this.studentId}/history-calls` ? 'active' : ''}>
                                <Link to={`/sales/info-student/${this.studentId}/history-calls`}>
                                    Cuộc gọi
                                </Link>
                            </li>
                            <li className={this.path === `/sales/info-student/${this.studentId}/progress` ? 'active' : ''}>
                                <Link to={`/sales/info-student/${this.studentId}/progress`}>
                                    Học tập
                                </Link>
                            </li>
                            <li className={this.path === `/sales/info-student/${this.studentId}/history-collect-money` ? 'active' : ''}>
                                <Link to={`/sales/info-student/${this.studentId}/history-collect-money`}>
                                    Nộp tiền
                                </Link>
                            </li>
                            <li className={this.path === `/sales/info-student/${this.studentId}/logs` ? 'active' : ''}>
                                <Link to={`/sales/info-student/${this.studentId}/logs`}>
                                    Lịch sử web
                                </Link>
                            </li>
                        </ul>

                    </div>}
                    <div className="col-md-8">

                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            {!this.props.isLoadingStudent &&

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title"><strong>Ảnh xác thực</strong></h4>
                                            <br/>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div
                                                        className="flex flex-col flex-align-items-center flex-justify-content-center">
                                                        <img style={{height: 'auto', width: '100%'}}
                                                             onClick={() => this.openModalImageView(this.props.student.image1)}
                                                             src={helper.validateLinkImage(this.props.student.image1)}/>
                                                        <button className="btn btn-rose btn-round">
                                                            Ảnh 1
                                                            <input type="file"
                                                                   accept=".jpg,.png,.gif"
                                                                   onChange={(event) => this.handleFileUpload(event, 'image1')}
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
                                                    </div>

                                                </div>
                                                <div className="col-sm-6">
                                                    <div
                                                        className="flex flex-col flex-align-items-center flex-justify-content-center">
                                                        <img style={{height: 'auto', width: '100%'}}
                                                             onClick={() => this.openModalImageView(this.props.student.image2)}
                                                             src={helper.validateLinkImage(this.props.student.image2)}/>
                                                        <button className="btn btn-rose btn-round">
                                                            Ảnh 2
                                                            <input type="file"
                                                                   accept=".jpg,.png,.gif"
                                                                   onChange={(event) => this.handleFileUpload(event, 'image2')}
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            }
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <button className="btn btn-rose btn-main"
                                                onClick={this.openModalChangePassword}
                                        >
                                            Thay đổi mật khẩu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <Modal show={this.state.showModalChangePassword}>
                    <Modal.Header closeButton={!this.props.isChangingPassword}
                                  onHide={this.props.isChangingPassword ? '' : this.closeModalChangePassword}
                                  closeLabel="Đóng">
                        <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ChangePassword
                            studentId={this.studentId}
                            closeModal={this.closeModalChangePassword}
                        />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalViewImage}>
                    <Modal.Header closeButton
                                  onHide={() => {
                                      this.setState({showModalViewImage: false});
                                  }}
                                  closeLabel="Đóng">
                        <Modal.Title>Ảnh</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img style={{height: 'auto', width: '100%'}}
                             src={helper.validateLinkImage(this.state.imageUrl)}/>
                        <div className="flex flex-col flex-align-items-center flex-justify-content-center">
                            <button className="btn btn-rose"
                                    onClick={() => {
                                        this.setState({showModalViewImage: false});
                                    }}
                            > Thoát
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chỉnh sửa thông tin học viên</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-edit-student" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <FormInputText
                                label="Họ và tên"
                                name="name"
                                updateFormData={this.updateFormData}
                                value={this.state.student.name}
                                type="text"
                            />
                            <FormInputText
                                label="Email"
                                name="email"
                                updateFormData={this.updateFormData}
                                value={this.state.student.email}
                                required={true}
                                type="email"
                            />
                            <FormInputText
                                label="Số điện thoại"
                                name="phone"
                                value={this.state.student.phone}
                                type="text"
                                updateFormData={this.updateFormData}
                            />
                            <ReactSelect
                                value={this.state.student.gender}
                                options={GENDER}
                                onChange={this.updateGender}
                                placeholder="Chọn giới tính"
                            />
                            <FormInputDate
                                label="Chọn ngày sinh"
                                value={this.state.student.dob}
                                updateFormData={this.updateFormData}
                                id="form-change-dob"
                                name="dob"
                            />
                            <ReactSelect
                                value={this.state.student.address}
                                options={this.getDataAddress()}
                                onChange={this.updateAddress}
                                placeholder="Địa chỉ"
                            />
                            <FormInputText
                                name="university"
                                label="Trường học"
                                value={this.state.student.university}
                                updateFormData={this.updateFormData}
                            />
                            <FormInputText
                                name="work"
                                label="Nơi làm việc"
                                value={this.state.student.work}
                                updateFormData={this.updateFormData}
                            />
                            <FormInputText
                                name="how_know"
                                label="Lý do biết đến"
                                value={this.state.student.how_know}
                                updateFormData={this.updateFormData}
                            />
                            <FormInputText
                                name="facebook"
                                label="Link Facebook"
                                value={this.state.student.facebook}
                                updateFormData={this.updateFormData}
                            />
                            <div className="form-group">
                                <label className="label-control">Mô tả</label>
                                <textarea
                                    type="text"
                                    rows={5}
                                    className="form-control"
                                    value={
                                        this.state.student.description ? this.state.student.description : ""
                                    }
                                    name="description"
                                    onChange={this.updateFormData}
                                />
                                <span className="material-input"/>
                            </div>
                            {this.props.isEditingStudent ?
                                (
                                    <button
                                        className="btn btn-fill btn-rose disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                )
                                :
                                <button className="btn btn-rose"
                                        onClick={this.editInfoStudent}
                                > Cập nhật
                                </button>
                            }

                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}


InfoStudentContainer.contextTypes = {
    router: PropTypes.object
};

InfoStudentContainer.propTypes = {
    student: PropTypes.object.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingStudent: PropTypes.bool.isRequired,
    isEditingStudent: PropTypes.bool.isRequired,
    isChangingPassword: PropTypes.bool.isRequired,
    children: PropTypes.element,
    pathname: PropTypes.string,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
        isLoadingStudent: state.infoStudent.isLoadingStudent,
        isEditingStudent: state.infoStudent.isEditingStudent,
        isChangingPassword: state.infoStudent.isChangingPassword,
        provinces: state.createRegister.provinces
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStudentContainer);
