import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as emailCommentFBActions from "./emailCommentFBActions";
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import {utils} from "xlsx";

class EmailCommentFBContainers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            form: {
                post_id: "",
                token: ""
            }
        };
        this.updateEmailFormData = this.updateEmailFormData.bind(this);
        this.getEmailsComment = this.getEmailsComment.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isGetting !== this.props.isGetting && !nextProps.isGetting) {
            const wsData = nextProps.emails.map(item => [
                item.name ? item.name : "",
                item.email ? item.email : "",
            ]);

            const ws = utils.aoa_to_sheet([["Tên", "Email"], ...wsData]);

            const sheetName = "emails";
            let workbook = {
                SheetNames: [],
                Sheets: {},
            };
            workbook.SheetNames.push(sheetName);

            workbook.Sheets[sheetName] = ws;

            helper.saveWorkBookToExcel(workbook, "Danh sach emails - " + this.state.form.post_id);
        }
    }

    updateEmailFormData(event) {
        const field = event.target.name;
        let form = {...this.state.form};
        form[field] = event.target.value;
        this.setState({form: form});
    }

    getEmailsComment() {
        helper.setFormValidation("#form-email-comments-facebook");
        if ($("#form-email-comments-facebook").valid()) {
            this.props.emailCommentFBActions.getEmailCommentFB(this.state.form.post_id, this.state.form.token);
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <h4 className="card-title"><strong>Lấy email từ bài viết facebook</strong></h4>
                                    <form role="form"
                                          id="form-email-comments-facebook">
                                        <FormInputText
                                            label="ID bài viết"
                                            required
                                            name="post_id"
                                            updateFormData={this.updateEmailFormData}
                                            value={this.state.form.post_id}
                                        />
                                        <FormInputText
                                            label="Token"
                                            required
                                            name="token"
                                            updateFormData={this.updateEmailFormData}
                                            value={this.state.form.token}
                                        />
                                    </form>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isGetting ?
                    (
                        <button className="btn btn-fill btn-rose disabled"
                                type="button">
                            <i className="fa fa-spinner fa-spin"/>
                            Đang lấy
                        </button>
                    )
                    :
                    (
                        <button
                            className="btn btn-fill btn-rose"
                            type="button"
                            onClick={this.getEmailsComment}
                        >
                            Lấy email
                        </button>
                    )

                }
            </div>
        );
    }
}

EmailCommentFBContainers.propTypes = {
    isGetting: PropTypes.bool.isRequired,
    emails: PropTypes.array.isRequired,
    emailCommentFBActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isGetting: state.emailCommentFB.isGetting,
        emails: state.emailCommentFB.emails,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailCommentFBActions: bindActionCreators(emailCommentFBActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailCommentFBContainers);