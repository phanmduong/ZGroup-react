/**
 * Created by phanmduong on 8/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import Link from "react-router/es/Link";
import Search from "../../components/common/Search";
import Loading from "../../components/common/Loading";
import ListForm from './ListForms';
import * as emailFormsActions from './emailFormsActions';
import _ from 'lodash';
import * as helper from '../../helpers/helper';

class EmailFormsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: ""
        };
        this.timeOut = null;
        this.formsSearchChange = this.formsSearchChange.bind(this);
        this.deleteEmailForm = this.deleteEmailForm.bind(this);
        this.changeHideForm = this.changeHideForm.bind(this);
    }

    componentWillMount() {
        this.loadForms();
    }

    formsSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.emailFormsActions.loadForms(this.state.page, this.state.query);
        }.bind(this), 500);

    }

    loadForms(page = 1) {
        this.setState({page});
        this.props.emailFormsActions.loadForms(page, this.state.query);
    }

    deleteEmailForm(emailForm) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa email form này không?", () => {
            this.props.emailFormsActions.deleteEmailForm(emailForm.id);
        });
    }

    changeHideForm(emailFormId, hide) {
        this.props.emailFormsActions.changeHideForm(emailFormId, hide ? 0 : 1);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Email forms</strong>
                                    </h4>
                                    <div>
                                        <Link to="/email/email-form/create" className="btn btn-primary btn-round btn-xs button-add none-margin">
                                                <strong>+</strong>
                                        </Link>
                                    </div>
                                </div>
                                <Search
                                    onChange={this.formsSearchChange}
                                    value={this.state.query}
                                    placeholder="Tìm kiếm form"
                                />
                                <div className="row">
                                    {this.props.isLoadingForms ? <Loading/> :
                                    <ListForm
                                        forms={this.props.forms}
                                        deleteEmailForm={this.deleteEmailForm}
                                        changeHideForm={this.changeHideForm}
                                    />
                                    }
                                </div>
                                <div className="tab-content">
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.totalPages + 1).map(page => {
                                            if (Number(this.props.currentPage) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => this.loadForms(page)}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => this.loadForms(page)}>{page}</a>
                                                    </li>
                                                );
                                            }

                                        })}
                                    </ul>
                                </div>    
                            </div>    
                        </div>
                    </div>

                    <div className="card-content">
                        
                    </div>

                </div>
            </div>
        );
    }
}

EmailFormsContainer.propTypes = {
    forms: PropTypes.array.isRequired,
    isLoadingForms: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    emailFormsActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        forms: state.emailForms.forms,
        isLoadingForms: state.emailForms.isLoading,
        error: state.emailForms.error,
        totalPages: state.emailForms.totalPages,
        currentPage: state.emailForms.currentPage,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailFormsActions: bindActionCreators(emailFormsActions, dispatch)
    }
        ;
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormsContainer);
