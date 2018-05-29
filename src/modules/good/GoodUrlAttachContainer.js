import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addUrl} from "./goodApi";
import {showNotification} from "../../helpers/helper";
import FormInputText from "../../components/common/FormInputText";
import Loading from "../../components/common/Loading";
import * as goodActions from '../good/goodActions';


class GoodUrlAttachContainer extends React.Component {
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
        addUrl(this.state.url)
            .then((res) => {
                this.setState({
                    isUploading: false,
                    url: ""
                });
                showNotification("Đính kèm liên kết thành công");
                this.props.goodActions.addUrlSuccess(res.data);
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

GoodUrlAttachContainer.propTypes = {
    goodActions: PropTypes.object.isRequired
};


function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodUrlAttachContainer);