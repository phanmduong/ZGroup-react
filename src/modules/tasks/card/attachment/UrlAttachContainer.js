import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from "../../../../components/common/FormInputText";
import {addUrl} from "../../taskApi";
import Loading from "../../../../components/common/Loading";
import * as taskActions from '../../taskActions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {showNotification} from "../../../../helpers/helper";

class UrlAttachContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.state = {
            url: "",
            isUploading: false
        };
        this.submit = this.submit.bind(this);
        this.onEnterKeyPress = this.onEnterKeyPress.bind(this);
    }

    updateFormData(event) {
        this.setState({
            url: event.target.value
        });
    }

    submit() {
        this.setState({
            isUploading: true
        });
        addUrl(this.props.card.id, this.state.url)
            .then((res) => {
                this.setState({
                    isUploading: false,
                    url: ""
                });
                showNotification("Đính kèm liên kết thành công");
                this.props.taskActions.addUrlSuccess(res.data, this.props.addToComment);
            });
    }

    onEnterKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            this.submit();
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isUploading ? <Loading/> : (
                        <div>
                            <FormInputText
                                onKeyPress={this.onEnterKeyPress}
                                label="Đính kèm liên kết"
                                value={this.state.url}
                                updateFormData={this.updateFormData}
                                name="url"/>
                            <button className="btn btn-rose" onClick={this.submit}>Lưu</button>
                        </div>
                    )
                }
            </div>
        );
    }
}

UrlAttachContainer.propTypes = {
    card: PropTypes.object.isRequired,
    addToComment: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired
};


function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlAttachContainer);