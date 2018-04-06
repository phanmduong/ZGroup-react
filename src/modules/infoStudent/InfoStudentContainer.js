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
import {NO_AVATAR, PROTOCOL} from '../../constants/env';
import Loading from '../../components/common/Loading';
import {Modal} from 'react-bootstrap';
import FormInputText from '../../components/common/FormInputText';
import ChangePassword from "./ChangePassword";

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
            showModalChangePassword: false
        };
    }

    componentWillMount() {
        this.props.studentActions.loadInfoStudent(this.studentId);
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

    render() {
        this.path = this.props.location.pathname;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
                            <li className={this.path === `/sales/info-student/${this.studentId}` ? 'active' : ''}>
                                <IndexLink to={`/sales/info-student/${this.studentId}`}>
                                    <i className="material-icons">add_box</i> Đăng kí  &#160;

                                    <div className="ripple-container"/>
                                </IndexLink>
                            </li>
                            <li className={this.path === `/sales/info-student/${this.studentId}/history-calls` ? 'active' : ''}>
                                <Link to={`/sales/info-student/${this.studentId}/history-calls`}>
                                    <i className="material-icons">smartphone</i> Cuộc gọi  &#160;
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.path === `/sales/info-student/${this.studentId}/progress` ? 'active' : ''}>
                                <Link to={`/sales/info-student/${this.studentId}/progress`}>
                                    <i className="material-icons">create</i> Học tập  &#160;
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className={this.path === `/sales/info-student/${this.studentId}/care` ? 'active' : ''}>
                                <Link to={`/sales/info-student/${this.studentId}/care`}>
                                    <i className="material-icons">flag</i> Quan tâm  &#160;
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                        </ul>
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <br/><br/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-profile">
                                    <div className="card-avatar">
                                        <a>
                                            <img className="img"
                                                 src={helper.isEmptyInput(this.props.student.avatar_url) ?
                                                     NO_AVATAR : PROTOCOL + this.props.student.avatar_url
                                                 }/>
                                        </a>
                                    </div>
                                    {this.props.isLoadingStudent ? <Loading/>
                                        :
                                        <div className="card-content">
                                            <h4 className="card-title">{this.props.student.name}</h4>
                                            <h6 className="category text-gray text-email">{this.props.student.email}</h6>
                                            <p className="description">{this.props.student.phone}</p>
                                            {this.props.isEditingStudent ?
                                                (
                                                    <button
                                                        className="btn btn-fill btn-rose disabled"
                                                    >
                                                        <i className="fa fa-spinner fa-spin"/> Đang sửa
                                                    </button>
                                                )
                                                :
                                                <button className="btn btn-rose"
                                                        onClick={this.openModal}
                                                >Sửa
                                                </button>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title"><strong>Thay đổi mật khẩu</strong></h4>
                                            <br/>
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
};

function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
        isLoadingStudent: state.infoStudent.isLoadingStudent,
        isEditingStudent: state.infoStudent.isEditingStudent,
        isChangingPassword: state.infoStudent.isChangingPassword,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStudentContainer);
