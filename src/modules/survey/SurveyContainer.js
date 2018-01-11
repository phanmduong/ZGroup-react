import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AddSurveyModal from "./AddSurveyModal";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import Loading from "../../components/common/Loading";
import * as surveyActions from "./surveyActions";
import {Link} from "react-router";

class SurveyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false
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
                                                        <tbody>
                                                        {
                                                            (this.props.surveys && this.props.surveys.length > 0) &&
                                                            this.props.surveys.map((survey) => {
                                                                return (
                                                                    <tr key={survey.id}>
                                                                        <td>
                                                                            <Link to={"/survey/" + survey.id}>
                                                                                {survey.name}
                                                                            </Link>
                                                                        </td>
                                                                        <td>{survey.staff ? survey.staff.name : ""}</td>
                                                                        <td>
                                                                            <ButtonGroupAction
                                                                                disabledEdit={true}
                                                                                delete={() => {
                                                                                    // return this.deletePixel(pixel.id);
                                                                                }}
                                                                                object={survey}
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                );

                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
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