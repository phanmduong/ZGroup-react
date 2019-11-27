import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as studentActions from './studentActions';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import FormInputText from '../../components/common/FormInputText';
import ChangePassword from "./ChangePassword";
import {GENDER} from "../../constants/constants";
import FormInputDate from "../../components/common/FormInputDate";
import ReactSelect from "react-select";
import * as createRegisterActions from "../registerStudents/createRegisterActions";
import {isEmptyInput} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import TooltipButton from "../../components/common/TooltipButton";
import RegistersContainer from "./registers/RegistersContainer";
import HistoryCallContainer from "./historyCalls/HistoryCallContainer";
import ProgressContainer from "./progress/ProgressContainer";
import HistoryCollectMoneyContainer from "./historyCollectMoney/HistoryCollectMoneyContainer";
import LogsContainer from "./logsStudent/LogsContainer";
import CallRegisterOverlay from "./overlays/CallRegisterOverlay";
import ExtraRegisterOverlay from "./overlays/ExtraRegisterOverlay";
import PurchaseRegisterOverlay from "./overlays/PurchaseRegisterOverlay";
import CreateRegisterOverlay from "./overlays/CreateRegisterOverlay";


class InfoStudentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

        this.openModalChangePassword = this.openModalChangePassword.bind(this);
        this.path = '';
        this.editInfoStudent = this.editInfoStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.closeModalChangePassword = this.closeModalChangePassword.bind(this);
        this.state = {
            showModal: false,
            student: {},
            showModalChangePassword: false,
            showModalViewImage: false,
            imageUrl: '',
            currentRoute: {
                path: `/sales/info-student/${this.studentId}`, text: 'Đăng kí',
                component: <RegistersContainer studentId={this.studentId}/>
            },
        };
        this.routes = [
            {
                path: `/sales/info-student/${this.studentId}`, text: 'Đăng kí',
                component: <RegistersContainer studentId={this.studentId}/>
            },
            {
                path: `/sales/info-student/${this.studentId}/history-calls`, text: 'Cuộc gọi',
                component: <HistoryCallContainer studentId={this.studentId}/>
            },
            {
                path: `/sales/info-student/${this.studentId}/progress`,
                text: 'Học tập',
                component: <ProgressContainer studentId={this.studentId}/>
            },
            {
                path: `/sales/info-student/${this.studentId}/history-collect-money`,
                text: 'Nộp tiền',
                component: <HistoryCollectMoneyContainer studentId={this.studentId}/>
            },
            {
                path: `/sales/info-student/${this.studentId}/logs`,
                text: 'Lịch sử web',
                component: <LogsContainer studentId={this.studentId}/>
            },
        ];
    }

    componentWillMount() {
        this.props.studentActions.loadInfoStudent(this.studentId);
        this.props.createRegisterActions.loadAllProvinces();
    }

    componentDidUpdate() {
        helper.setFormValidation('#form-edit-student');
    }

    getRouteItem(route, index) {
        const changeRoute = () => {
            history.pushState({}, "modal", route.path);
            this.setState({currentRoute: route});
        };

        return index == 0 ? (
            <li key={index} className={this.path === route.path ? 'active' : ''}>
                <a onClick={changeRoute}>
                    {route.text}
                </a>
            </li>
        ) : (
            <li key={index} className={this.path === route.path ? 'active' : ''}>
                <a onClick={changeRoute}>
                    {route.text}
                </a>
            </li>
        );
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

    handleFileUpload(image) {
        const that = this;
        let input = document.createElement("input");
        input.type = "file";
        input.value = "";
        input.accept = ".jpg,.png,.gif";
        input.onchange = (e) => {
            let file = e.target.files[0];
            that.props.studentActions.uploadImage(file, that.studentId, image);
        };
        input.click();

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

    // getChildren = () => {
    //     let route = this.routes.filter(r => r.path == window.location.pathname)[0];
    //     return route ? route.component : <RegistersContainer studentId={this.studentId}/>;
    // };

    render() {
        this.path = window.location.pathname;
        const dfImg = 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1574666760MlUiLSRqIIs92wd.png';
        // let gender = GENDER.filter((item) => item.value == this.props.student.gender)[0];
        return (
            <div className={this.props.location ? "card" : ''}>
                <div className={this.props.location ? "card-content" : ''}>
                    <div className="row">

                        <div className="col-md-4">
                            {this.props.isLoadingStudent && <Loading/>}
                            {!this.props.isLoadingStudent &&
                            <div>
                                <div className="card" mask="blue">
                                    <div className="card-content flex flex-col">


                                        <div className="flex flex-justify-content-center">
                                            <TooltipButton text="Thay ảnh đại diện" placement="top">
                                                <div className="img father"
                                                     onClick={() => this.handleFileUpload('avatar_url')}
                                                     style={{
                                                         backgroundImage: `url(${helper.validateLinkImage(this.props.student.avatar_url)})`
                                                     }}>
                                                    <div className="son"><i className="material-icons">
                                                        photo_camera
                                                    </i></div>
                                                </div>
                                            </TooltipButton>
                                        </div>


                                        <h4 className="card-title">{this.props.student.name}</h4>
                                        <h6 className="category text-gray text-email">
                                            {this.props.student.email}&nbsp;&nbsp;&nbsp;
                                            <span>{this.props.student.phone}</span>
                                        </h6>
                                    </div>
                                </div>
                                <div className="card detail-wrap">
                                    <div className="card-content">
                                        <div className="detail-wrap">
                                            <p>Ngày sinh<strong>{this.props.student.dob}</strong></p>
                                            <p>Địa chỉ<strong>{this.props.student.address}</strong></p>
                                            <p>Phụ huynh<strong>N/A</strong></p>
                                            <p>Nơi làm việc<strong>{this.props.student.work}</strong></p>
                                        </div>
                                        {this.props.isEditingStudent ?
                                            (
                                                <button
                                                    className="btn width-100 disabled"
                                                >
                                                    <i className="fa fa-spinner fa-spin"/> Đang sửa
                                                </button>
                                            )
                                            :
                                            <button className="btn width-100"
                                                    onClick={this.openModal}
                                            >Sửa thông tin
                                            </button>
                                        }
                                    </div>
                                </div>
                                <div className="card source-card">
                                    <div className="card-content">
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
                                </div>


                            </div>
                            }
                            {!this.props.isLoadingStudent &&

                            <div>
                                <div className="card" mask="transparent">
                                    <img className="img-user"
                                        // onClick={() => this.openModalImageView(this.props.student.image1)}
                                         onClick={() => this.handleFileUpload('image1')}
                                         src={helper.validateLinkImage(this.props.student.image1, dfImg)}/>
                                    {/*</div>*/}

                                    {/*<div className="card" mask="transparent">*/}
                                    <img className="img-user"
                                        // onClick={() => this.openModalImageView(this.props.student.image2)}
                                         onClick={() => this.handleFileUpload('image2')}
                                         src={helper.validateLinkImage(this.props.student.image2, dfImg)}/>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="col-md-8">
                            <div className="row">

                                {!this.props.isLoadingStudent &&
                                <div className="col-md-12">
                                    <ul className="timeline timeline-simple time-line-register">
                                        <li className="timeline-inverted">
                                            <div className={"timeline-badge success"}>
                                                {/*<i className="material-icons">phone</i>*/}
                                            </div>
                                            <div className="timeline-panel">
                                                <div className="timeline-heading">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <CallRegisterOverlay
                                                                studentId={this.props.student.id}
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <CreateRegisterOverlay
                                                                studentId={this.props.student.id}
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <PurchaseRegisterOverlay
                                                                studentId={this.props.student.id}
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <ExtraRegisterOverlay
                                                                openModalChangePassword={this.openModalChangePassword}
                                                                studentId={this.props.student.id}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="timeline-body">
                                                    <ul className="nav nav-pills nav-pills-gradient" data-tabs="tabs">
                                                        {this.routes.map((route, index) => {
                                                            return this.getRouteItem(route, index);
                                                        })}
                                                    </ul>
                                                </div>

                                            </div>

                                        </li>


                                    </ul>


                                </div>}
                                {!this.props.isLoadingStudent &&
                                <div className="col-md-12">
                                    <div className="card" mask="transparent">

                                        {this.routes.map((route) => {
                                            return route.path == this.state.currentRoute.path ?
                                                route.component : <div/>;

                                        })}
                                    </div>
                                </div>}

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
