import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AddSurveyModalContainer from "./AddSurveyModalContainer";
import Loading from "../../components/common/Loading";
import * as surveyActions from "./surveyActions";
import SurveyItem from "./SurveyItem";
import Pagination from "../../components/common/Pagination";
import SurveyDisplayModalContainer from "./SurveyDisplayModalContainer";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import * as helper from "../../helpers/helper";
import moment from "moment/moment";
import XLSX from 'xlsx';
import {saveWorkBookToExcel} from "../../helpers/helper";
import {sheetFromArrayOfArrays} from "../../helpers/helper";

class SurveyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false
        };
        this.handleActiveSwitch = this.handleActiveSwitch.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadSurveys = this.loadSurveys.bind(this);
        this.editSurvey = this.editSurvey.bind(this);
        this.showDisplayModal = this.showDisplayModal.bind(this);
        this.exportSurveyResultExcel = this.exportSurveyResultExcel.bind(this);
    }

    componentWillMount() {
        this.props.surveyActions.loadSurveys();
    }

    loadSurveys(page) {
        this.props.surveyActions.loadSurveys(page);
    }

    showDisplayModal(survey) {
        this.props.surveyActions.updateSurveyFormData({...survey});
        this.props.surveyActions.showSurveyDisplaySettingModal(true);
    }

    handleActiveSwitch(survey) {
        const newSurvey = {...survey};
        if (Number(newSurvey.active) === 0) {
            newSurvey.active = 1;
        } else {
            newSurvey.active = 0;
        }

        this.props.surveyActions.updateSurveyList(newSurvey);
        this.props.surveyActions.saveSurvey(newSurvey, null, false);
    }

    openModal() {
        this.props.surveyActions.updateSurveyFormData({});
        this.props.surveyActions.toggleEditSurveyModal(true);
    }

    editSurvey(survey) {
        this.props.surveyActions.toggleEditSurveyModal(true);
        this.props.surveyActions.updateSurveyFormData(survey);
    }

    exportSurveyResultExcel() {
        const ws_data = [
            ["S", "h", "e", "e", "t", "J", "S"],
            [1, 2, 3, 4, 5]
        ];
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        const sheetName = "Kết quả Survey";
        let workbook = {
            SheetNames: [],
            Sheets: {}
        };
        workbook.SheetNames.push(sheetName);
        workbook.Sheets[sheetName] = ws;
        saveWorkBookToExcel(workbook, "test");
        /* the saveAs call downloads a file on the local machine */
        // saveAs(new Blob([wbout],{type:"application/octet-stream"}), "test.xlsx");
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }


    render() {

        return (
            <div className="content">
                <AddSurveyModalContainer/>
                <SurveyDisplayModalContainer/>
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
                                                                <SurveyItem
                                                                    exportSurvey={this.exportSurveyResultExcel}
                                                                    showSurveyDisplayModal={this.showDisplayModal}
                                                                    handleSwitch={this.handleActiveSwitch}
                                                                    editSurvey={this.editSurvey}
                                                                    key={survey.id}
                                                                    survey={survey}/>
                                                            );

                                                        })
                                                    }
                                                </div>
                                            )
                                    }
                                    <Pagination
                                        currentPage={this.props.paginator.current_page || 0}
                                        totalPages={this.props.paginator.total_pages || 0}
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