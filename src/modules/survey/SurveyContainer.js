import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AddSurveyModal from "./AddSurveyModal";
import Loading from "../../components/common/Loading";
import * as surveyActions from "./surveyActions";
import SurveyItem from "./SurveyItem";
import Pagination from "../../components/common/Pagination";

class SurveyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadSurveys = this.loadSurveys.bind(this);
    }

    componentWillMount() {
        this.props.surveyActions.loadSurveys();
    }

    loadSurveys(page) {
        this.props.surveyActions.loadSurveys(page);
    }

    openModal() {
        this.setState({
            showModal: true
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }


    render() {

        return (
            <div className="content">
                <AddSurveyModal
                    showModal={this.state.showModal}
                    closeModal={this.closeModal}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">assignment</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Quản lý khảo sát</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-3">
                                                <a className="btn btn-rose" onClick={this.openModal}>
                                                    Thêm khảo sát
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.props.isLoading ?
                                            <Loading/> : (
                                                <div className="row">
                                                    {
                                                        (this.props.surveys && this.props.surveys.length > 0) &&
                                                        this.props.surveys.map((survey) => {
                                                            return (
                                                                <SurveyItem survey={survey}/>
                                                            );

                                                        })
                                                    }
                                                </div>
                                            )
                                    }
                                    <Pagination
                                        currentPage={this.props.paginator.current_page}
                                        totalPages={this.props.paginator.total_pages}
                                        loadDataPage={this.loadSurveys}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SurveyContainer.propTypes = {
    surveys: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    paginator: PropTypes.object.isRequired,
    surveyActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        surveys: state.survey.surveys,
        paginator: state.survey.paginator,
        isLoading: state.survey.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);