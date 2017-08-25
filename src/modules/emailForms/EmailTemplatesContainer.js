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
            query: ""
        };
        this.timeOut = null;
        this.templatesSearchChange = this.templatesSearchChange.bind(this);
        this.chooseTemplate = this.chooseTemplate.bind(this);
    }

    componentWillMount() {
        this.loadTemplates();
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

    chooseTemplate(template){
        this.props.emailFormsActions.chooseTemplate(template);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
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
                                    templates={this.props.templates}/>}
                        </div>
                    </div>
                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(this.props.currentPage) === page) {
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
    error: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    emailFormsActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        templates: state.emailForms.emailTemplates.templates,
        isLoadingTemplates: state.emailForms.emailTemplates.isLoading,
        error: state.emailForms.emailTemplates.error,
        totalPages: state.emailForms.emailTemplates.totalPages,
        currentPage: state.emailForms.emailTemplates.currentPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailFormsActions: bindActionCreators(emailFormsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplatesContainer);
