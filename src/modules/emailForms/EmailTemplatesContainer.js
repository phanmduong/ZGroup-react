/**
 * Created by phanmduong on 8/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import Loading from '../../components/common/Loading';
import ListTemplate from './ListTemplate';
import _ from 'lodash';
import * as emailFormsActions from './emailFormsActions';
import Search from "../../components/common/Search";

class EmailTemplatesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            heightIframe: 0,
            isLoadingIframe: true,
            selectedTemplate: {}
        };
        this.timeOut = null;
        this.templatesSearchChange = this.templatesSearchChange.bind(this);
        this.chooseTemplate = this.chooseTemplate.bind(this);
        this.resizeIframe = this.resizeIframe.bind(this);
    }

    componentWillMount() {
        this.loadTemplates();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isPreSaving !== this.props.isPreSaving && !nextProps.isPreSaving && nextProps.emailForm.template) {
            this.setState({
                selectedTemplate: {
                    ...this.state.selectedTemplate,
                    id: nextProps.emailForm.template.id,

                },
                isLoadingIframe: false,
            });
        }
    }

    templatesSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.emailFormsActions.loadTemplates(this.state.page, this.state.query);
        }.bind(this), 500);
    }

    loadTemplates(page = 1) {
        this.setState({page});
        this.props.emailFormsActions.loadTemplates(page, this.state.query);
    }

    chooseTemplate(template) {
        this.setState({
            selectedTemplate: template,
            isLoadingIframe: true,
            heightIframe: '0px'
        });
        this.props.emailFormsActions.chooseTemplate(template);
    }

    resizeIframe() {
        let heightIframe = "2000px";
        if (process.env.NODE_ENV === 'production') {
            heightIframe = document.getElementById("iframe-template").contentWindow.document.body.scrollHeight + 40 + 'px';
        }

        this.setState({
            heightIframe: heightIframe,
            isLoadingIframe: false
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-4">
                            <div className="col-md-12">
                                <Search
                                    onChange={this.templatesSearchChange}
                                    value={this.state.query}
                                    placeholder="Tìm kiếm template"
                                />
                            </div>
                            <div className="col-md-12">
                                {this.props.isLoadingTemplates ? <Loading/> :
                                    <ListTemplate
                                        onClickItem={this.chooseTemplate}
                                        templates={this.props.templates}
                                        selectedTemplate={this.state.selectedTemplate}
                                    />}
                            </div>
                        </div>
                        <div className="col-xs-8">
                            {(this.state.isLoadingIframe || (this.props.isLoadingTemplates && ( this.state.selectedTemplate.id === undefined ||
                                this.state.selectedTemplate.id === null))) && <Loading/>}
                            {
                                this.props.emailForm.id ?
                                    (
                                    this.state.selectedTemplate.id ?
                                        (
                                            <iframe
                                                src={`/email-form-view/${this.props.emailForm.id}/${this.state.selectedTemplate.id}`}
                                                id="iframe-template"
                                                frameBorder="0"
                                                style={{
                                                    overflow: "hidden", height: this.state.heightIframe,
                                                    width: "100%",
                                                    border: !this.state.isLoadingIframe ? "solid 20px #f4f4f4" : ""
                                                }}
                                                height={this.state.heightIframe}
                                                width="100%"
                                                scrolling="no"
                                                onLoad={this.resizeIframe}

                                            />
                                        )
                                        :
                                        (
                                            !this.state.isLoadingIframe &&
                                            (this.state.selectedTemplate.id === undefined || this.state.selectedTemplate.id === null) &&
                                            <div className="flex-row-center flex-justify-content-center">
                                                <h4>Vui lòng chọn template</h4>
                                            </div>
                                        )
                                ) : (
                                    <div/>
                                )

                            }
                        </div>
                    </div>
                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(this.state.page) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <a onClick={() => this.loadTemplates(page)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadTemplates(page)}>{page}</a>
                                        </li>
                                    );
                                }

                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

EmailTemplatesContainer.propTypes = {
    templates: PropTypes.array.isRequired,
    isLoadingTemplates: PropTypes.bool.isRequired,
    isPreSaving: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    emailFormsActions: PropTypes.object.isRequired,
    emailForm: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        templates: state.emailForms.emailTemplates.templates,
        isLoadingTemplates: state.emailForms.emailTemplates.isLoading,
        error: state.emailForms.emailTemplates.error,
        totalPages: state.emailForms.emailTemplates.totalPages,
        currentPage: state.emailForms.emailTemplates.currentPage,
        emailForm: state.emailForms.emailForm,
        isPreSaving: state.emailForms.isPreSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailFormsActions: bindActionCreators(emailFormsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplatesContainer);
