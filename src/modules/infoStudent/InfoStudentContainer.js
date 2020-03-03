import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as studentActions from './studentActions';
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import FormInputText from '../../components/common/FormInputText';
import ChangePassword from "./ChangePassword";
import {GENDER, STATUS_REFS} from "../../constants/constants";
import FormInputDate from "../../components/common/FormInputDate";
import ReactSelect from "react-select";
import * as createRegisterActions from "../registerStudents/createRegisterActions";
import Loading from "../../components/common/Loading";
import TooltipButton from "../../components/common/TooltipButton";
import RegistersContainer from "./registers/RegistersContainer";
import HistoryCallContainer from "./historyCalls/HistoryCallContainer";
import ProgressContainer from "./progress/ProgressContainer";
import HistoryCollectMoneyContainer from "./historyCollectMoney/HistoryCollectMoneyContainer";
import HistoryCareContainer from "./logsStudent/HistoryCareContainer";
import SourceOverlay from "./overlays/SourceOverlay";
import MarketingCampaignOverlay from "./overlays/MarketingCampaignOverlay";
import StarInput from "../../components/common/StarInput";
import * as leadActions from "../lead/leadActions";
import PicOverlay from "./overlays/PicOverlay";
import StatusesOverlay from "./overlays/StatusesOverlay";
import {isEmptyInput} from "../../helpers/helper";


class InfoStudentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;
        this.path = window.location.pathname;

        this.editInfoStudent = this.editInfoStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.closeModalChangePassword = this.closeModalChangePassword.bind(this);
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
                text: 'Lịch sử chăm sóc',
                component: <HistoryCareContainer studentId={this.studentId}/>
            },
        ];
        this.state = {
            showModal: false,
            student: {},
            showModalChangePassword: false,
            showModalViewImage: false,
            imageUrl: '',
            currentRoute: this.routes.filter(r => r.path == this.path)[0] || {},
        };
        this.statusRef = STATUS_REFS.leads;

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
            // window.history.pushState({}, "modal", route.path);
            this.path = route.path;
            this.setState({currentRoute: route});

        };


        return (<li key={index} className={this.path === route.path ? 'active' : ''}>
            <a onClick={changeRoute}>
                {route.text}
            </a>
        </li>)
            ;
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

    openModalChangePassword = () => {
        this.setState({showModalChangePassword: true});
    };

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

        if (!helper.isEmptyInput(this.state.student.address)) {
            address = [...address, {
                value: this.state.student.address,
                label: this.state.student.address,
            }];
        }

        return address;
    };

    changeRateStudent = (rate) => {
        helper.confirm('warning',
            "Xác nhận đổi rate?", '',
            () => this.props.leadActions.changeLeadRate({
                id: this.studentId,
                rate
            }));
    };

    render() {


        const dfImg = 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1574666760MlUiLSRqIIs92wd.png';
        // let gender = GENDER.filter((item) => item.value == student.gender)[0];
        let {student, studentActions, location} = this.props;
        return (
            <div className={location ? "card" : ''}>
                <div className={location ? "card-content" : ''}>
                    <div className="row">
                        {this.props.isLoadingStudent && <Loading/>}
                        <div className="col-md-4">

                            {!this.props.isLoadingStudent &&
                            <div>
                                <div className="card" mask="blue">
                                    <div className="card-content flex flex-col">
                                        <div className="flex flex-justify-content-center">
                                            <TooltipButton text="Thay ảnh đại diện" placement="top">
                                                <div className="img father"
                                                     onClick={() => this.handleFileUpload('avatar_url')}
                                                     style={{
                                                         backgroundImage: `url(${helper.validateLinkImage(student.avatar_url)})`
                                                     }}>
                                                    <div className="son"><i className="material-icons">
                                                        photo_camera
                                                    </i></div>
                                                </div>
                                            </TooltipButton>
                                        </div>

                                        <div className="flex flex-row-center flex-justify-content-center margin-top-10">
                                            <StarInput
                                                value={student.rate}
                                                maxStar={5}
                                                onChange={this.changeRateStudent}
                                                disable={this.props.isEditing}
                                            />
                                        </div>

                                        <h4 className="card-title">{student.name}</h4>

                                        <h6 className="category text-gray text-email">
                                            {student.email}

                                        </h6>
                                        <h6 className="category text-gray text-email">
                                            <span>{student.phone}</span>

                                        </h6>

                                        {!isEmptyInput(student.city) &&
                                        <h6 className="category text-gray text-center color-white none-margin font-weight-400">
                                            <span>TP. {student.city}</span>

                                        </h6>}

                                    </div>
                                </div>
                                <div className="card detail-wrap">
                                    <div className="card-content">
                                        <div className="detail-wrap">
                                            {student.dob &&<p>Ngày sinh<strong>{student.dob || "Chưa có"}</strong></p>}
                                            {student.age && <p>Tuổi<strong>{student.age || "Chưa có"}</strong></p>}
                                            {student.address &&<p>Địa chỉ<strong>{student.address || "Chưa có"}</strong></p>}
                                            {student.father_name &&<p>Phụ huynh<strong>{student.father_name || "Chưa có"}</strong></p>}
                                            {student.work &&<p>Nơi làm việc<strong>{student.work || "Chưa có"}</strong></p>}
                                            {GENDER[student.gender] &&<p>Giới
                                                tính<strong>{GENDER[student.gender] == null ? "Khác" : GENDER[student.gender].name}</strong>
                                            </p>}
                                            {student.university &&<p>Trường học<strong>{student.university || "Chưa có"}</strong></p>}
                                            {student.description &&<p>Mô tả<strong>{student.description || "Chưa có"}</strong></p>}
                                            {student.facebook &&<p>Facebook<strong>{student.facebook || "Chưa có"}</strong></p>}
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

                                            <SourceOverlay
                                                className="source-value"
                                                student={student}
                                            />

                                        </div>

                                        <div className="source-wrap">
                                            <div className="source-name">Chiến dịch</div>
                                            {/*<div className="source-value">N/A</div>*/}
                                            <MarketingCampaignOverlay
                                                student={student}
                                                className="source-value"
                                                updateInfoStudent={studentActions.updateInfoStudent}
                                            />
                                        </div>
                                        {student.imported_by && <div className="source-wrap">
                                            <div className="source-name">Import bởi</div>
                                            <div className="source-value"  style={{background:`#${student.imported_by.color}`}}>{student.imported_by.name}</div>
                                        </div>}
                                        {!isEmptyInput(student.imported_at) && <div className="source-wrap">
                                            <div className="source-name">Import lúc</div>
                                            <div className="source-value"  style={{background:`#${student.imported_by.color}`}}>{student.imported_at}</div>
                                        </div>}
                                        <div className="source-wrap">
                                            <div className="source-name">P.I.C</div>
                                            {/*<div className="source-value">Chưa có</div>*/}
                                            <PicOverlay
                                                student={student}
                                                className="source-value"
                                            />
                                        </div>
                                        <div className="source-wrap">
                                            <div className="source-name">Trạng thái</div>
                                            <StatusesOverlay
                                                data={student.lead_status}
                                                refId={student.id}
                                                statusRef={this.statusRef}
                                                className="source-value"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            }
                            {!this.props.isLoadingStudent &&

                            <div>
                                <div className="card" mask="transparent">
                                    <img className="img-user"
                                        // onClick={() => this.openModalImageView(student.image1)}
                                         onClick={() => this.handleFileUpload('image1')}
                                         src={helper.validateLinkImage(student.image1, dfImg)}/>
                                    {/*</div>*/}

                                    {/*<div className="card" mask="transparent">*/}
                                    <img className="img-user"
                                        // onClick={() => this.openModalImageView(student.image2)}
                                         onClick={() => this.handleFileUpload('image2')}
                                         src={helper.validateLinkImage(student.image2, dfImg)}/>
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
                                            <div className={"timeline-badge warning"}>
                                                <i className="material-icons">star</i>
                                            </div>
                                            <div className="timeline-panel">
                                                <div
                                                    // className="timeline-heading"
                                                >
                                                    <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                                                        {this.routes.map((route, index) => {
                                                            return this.getRouteItem(route, index);
                                                        })}
                                                    </ul>
                                                </div>
                                                {/*<div className="timeline-body">*/}
                                                {/*    <div className="flex flex-wrap">*/}
                                                        {/*<CallRegisterOverlay*/}
                                                        {/*    studentId={student.id}*/}
                                                        {/*/>*/}
                                                        {/*<CreateRegisterOverlay*/}
                                                        {/*    className="btn btn-actions"*/}
                                                        {/*/>*/}
                                                        {/*<CreateCouponOverlay*/}
                                                        {/*    className="btn btn-actions"*/}
                                                        {/*/>*/}
                                                        {/*<CreateRegisterHistoryCareOverlay*/}
                                                        {/*    className="btn btn-actions"*/}
                                                        {/*/>*/}
                                                        {/*<ExtraRegisterOverlay*/}
                                                        {/*    openModalChangePassword={this.openModalChangePassword}*/}
                                                        {/*    studentId={student.id}*/}
                                                        {/*/>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}

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
                                    name="father_name"
                                    label="Tên phụ huynh"
                                    placeholder="Tên phụ huynh"
                                    value={this.state.student.father_name}
                                    updateFormData={this.updateFormData}
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
        isEditing: state.lead.isEditing,
        isLoadingStudent: state.infoStudent.isLoadingStudent,
        isEditingStudent: state.infoStudent.isEditingStudent,
        isChangingPassword: state.infoStudent.isChangingPassword,
        provinces: state.createRegister.provinces
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),
        leadActions: bindActionCreators(leadActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStudentContainer);
