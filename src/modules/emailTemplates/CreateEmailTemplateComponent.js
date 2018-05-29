import React from 'react';
import FormInputText from '../../components/common/FormInputText';
import {linkUploadImageEditor} from '../../constants/constants';
import ReactEditor from '../../components/common/ReactEditor';
import * as helper from '../../helpers/helper';
import {NO_IMAGE} from '../../constants/env';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";

class CreateEmailTemplateComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        helper.setFormValidation('#form-email-template');
    }

    render() {
        let {name, content, thumbnailUrl} = this.props.emailTemplate;
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <h4 className="card-title">
                                        <strong>Tạo form</strong>
                                    </h4>
                                    {this.props.isLoadingEmailTemplate ? <Loading/> :
                                        <form role="form"
                                              id="form-email-template">
                                            <FormInputText
                                                label="Tên email template"
                                                required
                                                name="name"
                                                updateFormData={this.props.updateEmailTemplateData}
                                                value={name}
                                            />
                                            <ReactEditor
                                                urlPost={linkUploadImageEditor()}
                                                fileField="image"
                                                updateEditor={this.props.updateEditor}
                                                value={content}
                                            />
                                            {this.props.isSaving ?
                                                (
                                                    <button className="btn btn-fill btn-rose disabled"
                                                            type="button">
                                                        <i className="fa fa-spinner fa-spin"/>
                                                        {this.props.route.type === 'edit' ? ' Đang lưu template' : ' Đang tạo template'}
                                                    </button>
                                                )
                                                :
                                                (
                                                    <button
                                                        className="btn btn-fill btn-rose"
                                                        type="button"
                                                        onClick={this.props.saveEmailTemplate}
                                                    >
                                                        {this.props.route.type === 'edit' ? 'Lưu' : 'Tạo'}
                                                    </button>
                                                )

                                            }
                                        </form>
                                    }
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <h4 className="card-title">
                                        <strong>Thông tin về template</strong>
                                    </h4>
                                    <br/>
                                    <img
                                        src={helper.isEmptyInput(thumbnailUrl) ?
                                            NO_IMAGE : thumbnailUrl
                                        }/>
                                    {this.props.isUpdatingThumbnail ?
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
                    </div>
                </div>
            </div>
        );
    }
}

CreateEmailTemplateComponent.propTypes = {
    emailTemplate: PropTypes.object.isRequired,
    isUpdatingThumbnail: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isLoadingEmailTemplate: PropTypes.bool.isRequired,
    emailTemplatesActions: PropTypes.object.isRequired,
    updateEmailTemplateData: PropTypes.func.isRequired,
    updateEditor: PropTypes.func.isRequired,
    handleFileUpload: PropTypes.func.isRequired,
    saveEmailTemplate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};

export default CreateEmailTemplateComponent;
