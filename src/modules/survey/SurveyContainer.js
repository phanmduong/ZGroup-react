import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AddSurveyModal from "./AddSurveyModal";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import Loading from "../../components/common/Loading";
import * as surveyActions from "./surveyActions";

// Import actions here!!

class SurveyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false
            // paginator   :{
            //     current_page : 1,
            //     limit: 5,
            //     total_pages: 1,
            //     total_count: 1
            // }
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.props.surveyActions.loadSurveys();
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
                                    <h4 className="card-title">Quản lý môn học</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-3">
                                                <a className="btn btn-rose" onClick={this.openModal}>
                                                    Thêm Môn Học
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-striped table-no-bordered table-hover"
                                               cellSpacing="0" width="100%" style={{width: "100%"}}>
                                            <thead className="text-rose">
                                            <tr>
                                                <th>Tên survey</th>
                                                <th>Người tạo</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>

                                            {
                                                this.props.isLoading ?
                                                    <Loading/> : (
                                                        <tbody>
                                                        {(this.props.surveys && this.props.surveys.length > 0) &&
                                                        this.props.surveys.map((survey) => {
                                                            return (
                                                                <tr key={survey.id}>
                                                                    <td>{survey.name}</td>
                                                                    <td>{survey.staff.name}</td>
                                                                    <td>
                                                                        <ButtonGroupAction
                                                                            edit={() => {
                                                                                // return this.openModalEditPixel(survey);
                                                                            }}
                                                                            delete={() => {
                                                                                // return this.deletePixel(pixel.id);
                                                                            }}
                                                                            object={survey}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            );

                                                        })}
                                                        </tbody>
                                                    )
                                            }
                                            {/*<ul className="pagination pagination-primary">*/}
                                                {/*{_.range(1, this.props.paginator.total_pages + 1).map(page => {*/}

                                                    {/*if (Number(this.state.page) === page) {*/}
                                                        {/*return (*/}
                                                            {/*<li key={page} className="active">*/}
                                                                {/*<a onClick={() => {*/}
                                                                    {/*this.loadCourses(page);*/}
                                                                {/*}}>{page}</a>*/}
                                                            {/*</li>*/}
                                                        {/*);*/}
                                                    {/*} else {*/}
                                                        {/*return (*/}
                                                            {/*<li key={page}>*/}
                                                                {/*<a onClick={() => {*/}
                                                                    {/*this.loadCourses(page);*/}
                                                                {/*}}>{page}</a>*/}
                                                            {/*</li>*/}
                                                        {/*);*/}
                                                    {/*}*/}
                                                {/*})}*/}
                                            {/*</ul>*/}
                                        </table>
                                    </div>
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
    surveyActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        surveys: state.survey.surveys,
        isLoading: state.survey.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        surveyActions: bindActionCreators(surveyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);