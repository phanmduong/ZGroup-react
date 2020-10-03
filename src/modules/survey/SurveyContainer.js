import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import AddSurveyModalContainer from "./AddSurveyModalContainer";
import Loading from "../../components/common/Loading";
import * as surveyActions from "./surveyActions";
import Pagination from "../../components/common/Pagination";
import SurveyDisplayModalContainer from "./SurveyDisplayModalContainer";
import XLSX from 'xlsx';
import {confirm, saveWorkBookToExcel, showErrorNotification, showNotification} from "../../helpers/helper";
import {duplicateSurvey, loadSurveyResult} from "./surveyApi";
import UserSurveySummaryContainer from "./UserSurveySummaryContainer";
import SurveyOverviewContainer from "./SurveyOverviewContainer";
import Search from "../../components/common/Search";
import {Link} from "react-router";
import * as env from '../../constants/env';
import Switch from "react-bootstrap-switch";

class SurveyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            query: '',
            isDuplicating: false,
        };
        this.handleActiveSwitch = this.handleActiveSwitch.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadSurveys = this.loadSurveys.bind(this);
        this.editSurvey = this.editSurvey.bind(this);
        this.showDisplayModal = this.showDisplayModal.bind(this);
        this.exportSurveyResultExcel = this.exportSurveyResultExcel.bind(this);
        this.openSummarySurveyModal = this.openSummarySurveyModal.bind(this);
        this.openOverviewSurveyModal = this.openOverviewSurveyModal.bind(this);
    }

    componentWillMount() {
        this.props.surveyActions.loadSurveys();
    }

    openSummarySurveyModal(survey) {
        this.props.surveyActions.updateSurveyFormData(survey);
        this.props.surveyActions.toggleSummaryModal(true);
    }

    openOverviewSurveyModal(survey) {
        this.props.surveyActions.updateSurveyFormData(survey);
        this.props.surveyActions.toggleOverviewModal(true);
    }

    loadSurveys(page, query) {
        this.props.surveyActions.loadSurveys(page, query);
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


    async exportSurveyResultExcel(survey) {
        this.props.surveyActions.showGlobalLoading();
        const res = await loadSurveyResult(survey.id);
        this.props.surveyActions.hideGlobalLoading();
        const wsData = res.data.data.result;

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const sheetName = "Kết quả Survey";
        let workbook = {
            SheetNames: [],
            Sheets: {}
        };
        workbook.SheetNames.push(sheetName);
        workbook.Sheets[sheetName] = ws;
        saveWorkBookToExcel(workbook, survey.name);
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    onSearchChange = (value) => {
        this.setState({
            page: 1,
            query: value,
        });
    }

    onSearch = () => {
        this.loadSurveys(1, this.state.query);
    }

    duplicateSurvey = (survey) => {
        confirm('warning', 'Nhân bản Survey', 'Bạn có chắc muốn nhân bản Survey này?', () => {
            if (this.state.isDuplicating) return;
            // isDuplicating
            this.setState({isDuplicating: true});
            duplicateSurvey(survey).then((res) => {
                if (res.data.status == 1) {
                    showNotification("Nhân bản thành công!");
                    this.loadSurveys(1, this.state.query);
                }
            }).catch(() => {
                showErrorNotification("Có lỗi xảy ra!");
            }).finally(() => this.setState({isDuplicating: false}));
        });

    }

    render() {

        return (
            <div className="content">
                <AddSurveyModalContainer/>
                <SurveyDisplayModalContainer/>
                <UserSurveySummaryContainer/>
                <SurveyOverviewContainer/>
                <div className="flex flex-space-between">
                    <div className="flex  flex-wrap tool-bar-actions">
                        <button
                            className="btn button-green btn-icon"
                            style={{padding: "12px 15px", height: 42, margin: '10px 10px 0 0', borderRadius: 5}}
                            type="button" onClick={this.openModal}>
                                <span className="material-icons">
                                    add_circle
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;Tạo survey
                        </button>
                        <Search
                            onChange={this.onSearchChange}
                            value={this.state.query}
                            placeholder="Tìm kiếm Survey"
                            className="white-seacrh margin-right-10 min-width-200-px form-group-none-padding"
                            onSearch={this.onSearch}
                            disabled={this.props.isLoading}
                        />
                    </div>
                </div>
                {this.props.isLoading && <Loading/>}
                {!this.props.isLoading && <div radius="five" className="table-sticky-head table-split">
                    <table
                        className="table">

                        {/*<div className="table-responsive table-split">*/}
                        {/*    <table className="table"  cellSpacing="0">*/}
                        <thead>
                        <tr>
                            <th/>
                            <th>Tên Survey</th>
                            <th>Link Survey</th>
                            <th>Câu hỏi</th>
                            <th>Số lượt trả lời</th>
                            <th>Trạng thái</th>
                            <th>Ngày tạo</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (this.props.surveys && this.props.surveys.length > 0) &&
                            this.props.surveys.map((survey) => {
                                return (<tr>
                                    <td>
                                        <Link to={"survey/" + survey.id} target="_blank"
                                              className="btn btn-round btn-fab btn-fab-mini text-white">
                                            <img src={survey.image_url} alt=""/>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={"survey/" + survey.id} target="_blank">
                                            {survey.name
                                                ? survey.name.length > 20
                                                    ? survey.name.slice(0, 17) + "..."
                                                    : survey.name
                                                : "Chưa có tên"}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`${env.PROTOCOL}${env.URL}/survey/${survey.id}`}
                                              className="text-underline"
                                              target="_blank">
                                            {`${env.PROTOCOL}${env.URL}/survey/${survey.id}`}
                                        </Link>
                                    </td>
                                    <td>
                                        {survey.questions_count}
                                    </td>
                                    <td>
                                        {survey.take}
                                    </td>
                                    <td>
                                        <Switch
                                            onChange={() => this.props.handleActiveSwitch(survey)}
                                            bsSize="mini"
                                            onText="Hiện"
                                            offText="Ẩn"
                                            value={survey.active === 1}
                                        />
                                    </td>
                                    <td>
                                        {survey.created_at}
                                    </td>
                                    <td>
                                        <div className="dropdown dropleft">
                                            <div className="cursor-pointer"
                                                 type="button" data-toggle="dropdown">
                                                <i className="material-icons"
                                                   style={{fontSize: 22}}>more_horiz</i>
                                            </div>
                                            <ul className="dropdown-menu" style={{marginLeft: -125}}>
                                                <li>
                                                    <a onClick={() => this.openOverviewSurveyModal(survey)}>Xem thử
                                                        Survey</a>
                                                </li>
                                                <li>
                                                    <Link to={"survey/" + survey.id} target="_blank">
                                                        Sửa Survey
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a onClick={() => this.duplicateSurvey(survey)}>Nhân bản Survey</a>
                                                </li>
                                                <li>
                                                    <a onClick={() => this.openSummarySurveyModal(survey)}>Thống kê</a>
                                                </li>
                                                <li>
                                                    <a onClick={() => this.exportSurveyResultExcel(survey)}>Tải
                                                        xuống</a>
                                                </li>
                                                {/*<li>*/}
                                                {/*    <a onClick={() => {*/}
                                                {/*    }}>Xoá Survey</a>*/}
                                                {/*</li>*/}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                </div>}

                <Pagination
                    currentPage={this.props.paginator.current_page || 0}
                    totalPages={this.props.paginator.total_pages || 0}
                    loadDataPage={(page) => {
                        this.loadSurveys(page, this.state.query);
                    }}/>
                {/*<div className="container-fluid">*/}
                {/*    <div className="row">*/}
                {/*        <div className="col-md-12">*/}
                {/*            <div className="card">*/}
                {/*                <div className="card-content">*/}
                {/*                    <div className="tab-content">*/}
                {/*                        <div className="flex-row flex">*/}
                {/*                            <h5 className="card-title">*/}
                {/*                                <strong>Quản lý khảo sát</strong>*/}
                {/*                            </h5>*/}
                {/*                            <div className="dropdown">*/}
                {/*                                <button*/}
                {/*                                    className="btn btn-primary btn-round btn-xs button-add none-margin"*/}
                {/*                                    type="button" onClick={this.openModal}><strong>+</strong>*/}
                {/*                                </button>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        <br/>*/}
                {/*                        {*/}
                {/*                            this.props.isLoading ?*/}
                {/*                                <Loading/> : (*/}
                {/*                                    <div className="row">*/}
                {/*                                        {*/}
                {/*                                            (this.props.surveys && this.props.surveys.length > 0) &&*/}
                {/*                                            this.props.surveys.map((survey) => {*/}
                {/*                                                return (*/}
                {/*                                                    <SurveyItem*/}
                {/*                                                        summarySurvey={() => this.openSummarySurveyModal(survey)}*/}
                {/*                                                        overviewSurvey={() => this.openOverviewSurveyModal(survey)}*/}
                {/*                                                        exportSurvey={() => this.exportSurveyResultExcel(survey)}*/}
                {/*                                                        showSurveyDisplayModal={this.showDisplayModal}*/}
                {/*                                                        handleSwitch={this.handleActiveSwitch}*/}
                {/*                                                        editSurvey={this.editSurvey}*/}
                {/*                                                        key={survey.id}*/}
                {/*                                                        survey={survey || {staff: {}}}/>*/}
                {/*                                                );*/}

                {/*                                            })*/}
                {/*                                        }*/}
                {/*                                    </div>*/}
                {/*                                )*/}
                {/*                        }*/}
                {/*                        <Pagination*/}
                {/*                            currentPage={this.props.paginator.current_page || 0}*/}
                {/*                            totalPages={this.props.paginator.total_pages || 0}*/}
                {/*                            loadDataPage={this.loadSurveys}/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
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