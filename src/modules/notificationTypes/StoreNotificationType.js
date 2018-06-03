import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import {CirclePicker} from "react-color";
import {linkUploadImageEditor, TYPE_NOTI} from "../../constants/constants";
import ReactEditor from "../../components/common/ReactEditor";
import * as notificationTypeActions from "./notificationTypeActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {isEmptyInput, setFormValidation, showTypeNotification} from "../../helpers/helper";
import Checkbox from "../../components/common/Checkbox";

class StoreNotificationType extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            notificationType: this.props.notificationType
        };
        this.changeColor = this.changeColor.bind(this);
        this.changeType = this.changeType.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
        this.storeNotificationType = this.storeNotificationType.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.notificationType != this.props.notificationType) {
            this.setState({notificationType: nextProps.notificationType});
        }
    }

    changeColor(color) {
        let notificationType = {...this.state.notificationType};
        notificationType.color = color.hex;
        this.setState({notificationType});
    }

    changeType(event, item) {
        if (event.target.checked) {
            const type = this.state.notificationType.type ? this.state.notificationType.type + ',' + item.value : item.value;
            this.setState({
                notificationType: {
                    ...this.state.notificationType,
                    type: type
                }
            });
        } else {
            let type = this.state.notificationType.type ? this.state.notificationType.type.split(',') : [];
            type = type.filter((value) => value != item.value);
            this.setState({
                notificationType: {
                    ...this.state.notificationType,
                    type: type.toString()
                }
            });
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        let notificationType = {...this.state.notificationType};
        notificationType[field] = event.target.value;
        this.setState({notificationType});
    }

    updateEditor(value) {
        let notificationType = {...this.state.notificationType};
        notificationType.content_template = value;
        this.setState({notificationType});
    }

    storeNotificationType() {
        setFormValidation("#form-store-notification-type");
        if ($('#form-store-notification-type').valid()) {
            if (isEmptyInput(this.state.notificationType.type)) {
                showTypeNotification("Vui lòng chọn loại thông báo", "warning");
            } else {
                this.props.notificationTypeActions.storeNotificationType(this.state.notificationType, this.props.closeModal);
            }
        }
    }

    render() {
        return (
            <div>
                <form id="form-store-notification-type">
                    <FormInputText
                        label="Tên"
                        name="name"
                        updateFormData={this.updateFormData}
                        value={this.state.notificationType.name}
                        required={true}
                    />
                    <FormInputText
                        label="Thông báo ngắn"
                        name="description"
                        updateFormData={this.updateFormData}
                        value={this.state.notificationType.description}
                        required={true}
                    />
                    <div className="form-group">
                        <label className="label-control">Loại thông báo</label>
                        <div className="row">
                            {
                                TYPE_NOTI.map((item, index) => {
                                    let type = this.state.notificationType.type ? this.state.notificationType.type.split(',') : [];
                                    const checked = type.indexOf(item.value) >= 0;
                                    return (
                                        <div className="col-md-3" key={index}>
                                            <Checkbox checked={checked} label={item.label} checkBoxLeft
                                                      onChange={(event) => this.changeType(event, item)}/>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    </div>
                    <div className="form-group">
                        <label className="label-control">Chọn màu</label>
                        <div style={{paddingTop: '10px'}}>
                            <CirclePicker width="100%"
                                          color={this.state.notificationType.color ? this.state.notificationType.color : ''}
                                          onChangeComplete={this.changeColor}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label-control">Nội dung thông báo</label>
                        <ReactEditor
                            urlPost={linkUploadImageEditor()}
                            fileField="image"
                            updateEditor={this.updateEditor}
                            value={this.state.notificationType.content_template ? this.state.notificationType.content_template : ''}/>
                    </div>
                </form>
                {this.props.isStoring ?
                    (
                        <button className="btn btn-fill btn-rose disabled" type="button">
                            <i className="fa fa-spinner fa-spin"/> Đang lưu
                        </button>
                    )
                    :
                    (
                        <button className="btn btn-fill btn-rose"
                                type="button" onClick={() => this.storeNotificationType()}>Lưu
                        </button>
                    )
                }
            </div>

        );
    }
}

StoreNotificationType.propTypes = {
    notificationTypeActions: PropTypes.object.isRequired,
    isStoring: PropTypes.bool.isRequired,
    notificationType: PropTypes.object,
    closeModal: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isStoring: state.notificationType.isStoring
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notificationTypeActions: bindActionCreators(notificationTypeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreNotificationType);

