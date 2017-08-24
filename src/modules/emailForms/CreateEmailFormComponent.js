import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import {LINK_UPLOAD_IMAGE_EDITOR} from '../../constants/constants';
import ReactEditor from '../../components/common/ReactEditor';
import * as helper from '../../helpers/helper';
import {NO_IMAGE} from '../../constants/env';
import EmailTemplatesContainer from './EmailTemplatesContainer';
import PropTypes from 'prop-types';

class CreateEmailFormComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        helper.setFormValidation('#form-email-form');
    }

    render() {
        let {title, name, subtitle, template, logoUrl, content, footer} = this.props.emailForm;
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
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose"><i
                                        className="material-icons">bookmark</i></div>
                                    <div className="card-content">
                                        <h4 className="card-title">Content</h4>
                                        <ReactEditor
                                            urlPost={LINK_UPLOAD_IMAGE_EDITOR}
                                            fileField="image"
                                            updateEditor={this.props.updateEditorContent}
                                            value={content}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose"><i
                                        className="material-icons">bookmark</i></div>
                                    <div className="card-content">
                                        <h4 className="card-title">Footer</h4>
                                        <ReactEditor
                                            urlPost={LINK_UPLOAD_IMAGE_EDITOR}
                                            fileField="image"
                                            updateEditor={this.props.updateEditorFooter}
                                            value={footer}
                                        />
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
                                        <button className="btn btn-rose btn-round disabled" type="button">
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
                                <div className="form-group">
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <label>Loại template</label>
                                        <button type="button" className="btn btn-rose btn-sm"
                                                data-toggle="modal"
                                                data-target="#chooseTemplateModal"
                                        >
                                            <i className="material-icons">control_point</i>
                                        </button>
                                    </div>
                                </div>
                                <div className="modal fade" id="chooseTemplateModal" role="dialog"
                                     aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-hidden="true">
                                                    <i className="material-icons">clear</i>
                                                </button>
                                                <h4 className="modal-title">Chọn template</h4>
                                            </div>
                                            <div className="modal-body">
                                                <EmailTemplatesContainer/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <img
                                    src={template.thumbnail_url}/>
                                <p>{template.name}</p>
                                {this.props.isPreSaving ?
                                    (
                                        <button className="btn btn-fill btn-default"
                                                type="button">
                                            <i className="fa fa-spinner fa-spin disabled"/> Đang tạo form
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            className="btn btn-fill btn-default"
                                            type="button"
                                            onClick={this.props.preSaveEmailForm}
                                        >
                                            Xem thử
                                        </button>
                                    )

                                }
                                {this.props.isSaving ?
                                    (
                                        <button className="btn btn-fill btn-rose"
                                                type="button">
                                            <i className="fa fa-spinner fa-spin disabled"/> Đang tạo form
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            className="btn btn-fill btn-rose"
                                            type="button"
                                            onClick={this.props.saveEmailForm}
                                        >
                                            Tạo
                                        </button>
                                    )

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateEmailFormComponent.propTypes = {
    emailForm: PropTypes.object.isRequired,
    isUpdatingLogo: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isPreSaving: PropTypes.bool.isRequired,
    emailFormsActions: PropTypes.object.isRequired,
    updateEmailFormData: PropTypes.func.isRequired,
    updateEditorContent: PropTypes.func.isRequired,
    updateEditorFooter: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    preSaveEmailForm: PropTypes.func.isRequired,
    saveEmailForm: PropTypes.func.isRequired,
};

export default CreateEmailFormComponent;
