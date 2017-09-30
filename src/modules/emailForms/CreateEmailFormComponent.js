import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import {linkUploadImageEditor} from '../../constants/constants';
import ReactEditor from '../../components/common/ReactEditor';
import * as helper from '../../helpers/helper';
import {NO_IMAGE} from '../../constants/env';
import EmailTemplatesContainer from './EmailTemplatesContainer';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {Modal} from 'react-bootstrap';

class CreateEmailFormComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            showModalSendMail: false,
            emailSend: {}
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModalSendMail = this.closeModalSendMail.bind(this);
        this.openModalSendMail = this.openModalSendMail.bind(this);
        this.updateEmailForm = this.updateEmailForm.bind(this);
        this.sendMail = this.sendMail.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation('#form-email-form');
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.props.preSaveEmailForm();
        this.setState({showModal: true});
    }

    closeModalSendMail() {
        this.setState({showModalSendMail: false});
    }

    openModalSendMail() {
        this.setState({
            showModalSendMail: true,
            emailSend: {}
        });
    }

    updateEmailForm(event) {
        const field = event.target.name;
        let data = {...this.state.emailSend};
        data[field] = event.target.value;
        this.setState({
            emailSend: data
        });
    }

    sendMail() {
        helper.setFormValidation('#form-email-send');
        if ($('#form-email-send').valid()) {
            this.props.sendMail(this.state.emailSend.email);
        }
    }

    render() {
        let {title, name, subtitle, template, logoUrl, content, footer, avatarUrl, titleButton, linkButton} = this.props.emailForm;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose"><i
                                        className="material-icons">bookmark</i></div>
                                    <div className="card-content">
                                        <h4 className="card-title">Tạo form</h4>
                                        {this.props.isLoadingEmailForm ? <Loading/> :
                                            <form role="form"
                                                  id="form-email-form">
                                                <FormInputText
                                                    label="Tên email form"
                                                    required
                                                    name="name"
                                                    updateFormData={this.props.updateEmailFormData}
                                                    value={name}
                                                />
                                                <FormInputText
                                                    label="Tiêu đề"
                                                    required
                                                    name="title"
                                                    updateFormData={this.props.updateEmailFormData}
                                                    value={title}
                                                />
                                                <FormInputText
                                                    label="Tiêu đề nhỏ"
                                                    required
                                                    name="subtitle"
                                                    updateFormData={this.props.updateEmailFormData}
                                                    value={subtitle}
                                                />
                                                <FormInputText
                                                    label="Tiêu đề button"
                                                    required
                                                    name="titleButton"
                                                    updateFormData={this.props.updateEmailFormData}
                                                    value={titleButton}
                                                />
                                                <FormInputText
                                                    label="Link button"
                                                    required
                                                    name="linkButton"
                                                    updateFormData={this.props.updateEmailFormData}
                                                    value={linkButton}
                                                />
                                            </form>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose"><i
                                        className="material-icons">bookmark</i></div>
                                    <div className="card-content">
                                        <h4 className="card-title">Content</h4>
                                        {this.props.isLoadingEmailForm ? <Loading/> :
                                            <ReactEditor
                                                urlPost={linkUploadImageEditor()}
                                                fileField="image"
                                                updateEditor={this.props.updateEditorContent}
                                                value={content}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose"><i
                                        className="material-icons">bookmark</i></div>
                                    <div className="card-content">
                                        <h4 className="card-title">Footer</h4>
                                        {this.props.isLoadingEmailForm ? <Loading/> :
                                            <ReactEditor
                                                urlPost={linkUploadImageEditor()}
                                                fileField="image"
                                                updateEditor={this.props.updateEditorFooter}
                                                value={footer}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">announcement</i>
                            </div>
                            <div className="card-content"><h4 className="card-title">Thông tin về form </h4>
                                <img
                                    src={helper.isEmptyInput(logoUrl) ?
                                        NO_IMAGE : logoUrl
                                    }/>
                                {this.props.isUpdatingLogo ?
                                    (
                                        <button className="btn btn-rose btn-round disabled"
                                                type="button">
                                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-fill btn-rose" type="button">
                                            Chọn logo
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
                                <img
                                    src={helper.isEmptyInput(avatarUrl) ?
                                        NO_IMAGE : avatarUrl
                                    }/>
                                {this.props.isUpdatingAvatar ?
                                    (
                                        <button className="btn btn-rose btn-round disabled" type="button">
                                            <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-fill btn-rose" type="button">
                                            Chọn ảnh đại diện
                                            <input type="file"
                                                   accept=".jpg,.png,.gif"
                                                   onChange={this.props.handleFileUploadAvatar}
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
                                <div className="form-group">
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <label>Loại template</label>
                                        <button type="button" className="btn btn-rose btn-sm"
                                                onClick={this.openModal}
                                        >
                                            <i className="material-icons">control_point</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card card-chart" id="card-email-template">
                                    <div className="card-header" data-background-color="white">
                                        <div id="simpleBarChart" className="ct-chart"
                                             style={{
                                                 background: 'url(' + template.thumbnail_url + ')',
                                             }}
                                        />
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">{template.name}</h4>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-fill btn-default"
                                    type="button"
                                    onClick={this.openModalSendMail}
                                >
                                    Gửi thử
                                </button>
                                {this.props.isSaving ?
                                    (
                                        <button className="btn btn-fill btn-rose disabled"
                                                type="button">
                                            <i className="fa fa-spinner fa-spin"/>
                                            {this.props.route.type === 'edit' ? 'Đang lưu form' : 'Đang tạo form'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            className="btn btn-fill btn-rose"
                                            type="button"
                                            onClick={this.props.saveEmailForm}
                                        >
                                            {this.props.route.type === 'edit' ? 'Lưu' : 'Tạo'}
                                        </button>
                                    )

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showModal} bsSize="large" onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chọn template</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EmailTemplatesContainer/>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalSendMail} onHide={this.closeModalSendMail}>
                    <Modal.Header closeButton>
                        <Modal.Title>Gửi mail thử</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form role="form"
                              id="form-email-send">
                            <FormInputText
                                label="Email"
                                required
                                name="email"
                                updateFormData={this.updateEmailForm}
                                value={this.state.emailSend.email}
                            />
                            {
                                this.props.isSendingMail ?
                                    (
                                        <button
                                            className="btn btn-fill btn-default"
                                            type="button"
                                        >
                                            <i className="fa fa-spinner fa-spin"/> Đang gửi
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            className="btn btn-fill btn-default"
                                            type="button"
                                            onClick={this.sendMail}
                                        >
                                            Gửi
                                        </button>
                                    )
                            }
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

CreateEmailFormComponent.propTypes = {
    emailForm: PropTypes.object.isRequired,
    isUpdatingLogo: PropTypes.bool.isRequired,
    isUpdatingAvatar: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isPreSaving: PropTypes.bool.isRequired,
    isSendingMail: PropTypes.bool.isRequired,
    isLoadingEmailForm: PropTypes.bool.isRequired,
    emailFormsActions: PropTypes.object.isRequired,
    updateEmailFormData: PropTypes.func.isRequired,
    updateEditorContent: PropTypes.func.isRequired,
    updateEditorFooter: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    handleFileUploadAvatar: PropTypes.func.isRequired,
    preSaveEmailForm: PropTypes.func.isRequired,
    saveEmailForm: PropTypes.func.isRequired,
    sendMail: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

export default CreateEmailFormComponent;
