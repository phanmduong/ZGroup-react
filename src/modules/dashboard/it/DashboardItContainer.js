import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import PointTaskBarchart from "./PointTaskBarchart";
import * as dashboardItActions from "./dashboardItActions";
import Loading from "../../../components/common/Loading";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import {DATETIME_VN_FORMAT} from "../../../constants/constants";
import moment from "moment";
import {loadProjects, loadStaffs} from './dashboardItApi';
import Select from 'react-select';
import MemberReactSelectOption from "../../tasks/board/filter/MemberReactSelectOption";
import MemberReactSelectValue from "../../tasks/board/filter/MemberReactSelectValue";
import CardListModalContainer from "./CardListModalContainer";
import CardDetailModalContainer from "../../tasks/card/CardDetailModalContainer";
import {ProgressBar} from "react-bootstrap";
import Avatar from "../../../components/common/Avatar";

// Import actions here!!

class DashboardItContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onFromDateInputChange = this.onFromDateInputChange.bind(this);
        this.onToDateInputChange = this.onToDateInputChange.bind(this);
        this.state = {
            from: moment().subtract(7, 'days').format(DATETIME_VN_FORMAT),
            to: moment().format(DATETIME_VN_FORMAT),
            projects: [],
            staffs: [],
            isLoading: true,
            selectedProject: {},
            selectedStaff: {}
        };
        this.loadData = this.loadData.bind(this);
        this.projectSelectChange = this.projectSelectChange.bind(this);
        this.staffSelectChange = this.staffSelectChange.bind(this);
        this.openCardsModal = this.openCardsModal.bind(this);

    }

    componentWillMount() {
        const that = this;
        const loadProjectsPromise = new Promise((resolve => {
            loadProjects().then((res) => {
                that.setState({
                    projects: res.data.projects
                });
                resolve();
            });
        }));

        const loadStaffsPromise = new Promise((resolve => {
            loadStaffs().then((res) => {
                that.setState({
                    staffs: res.data.staffs
                });
                resolve();
            });
        }));

        Promise.all([loadProjectsPromise, loadStaffsPromise])
            .then(() => {
                this.loadData(this.state);
                this.setState({
                    isLoading: false
                });
            });
    }

    openCardsModal() {
        this.props.dashboardItActions.toggleShowCardsModal(true);
    }


    loadData(state) {
        const {from, to, selectedStaff, selectedProject} = state;
        this.props.dashboardItActions
            .loadCountCardsByStaffDuration(
                from, to,
                selectedProject ? selectedProject.value : "",
                selectedStaff ? selectedStaff.value : "");
    }

    projectSelectChange(option) {
        const state = {
            ...this.state,
            selectedProject: option
        };
        this.setState(state);
        this.loadData(state);
    }

    staffSelectChange(option) {
        const state = {
            ...this.state,
            selectedStaff: option
        };
        this.setState(state);
        this.loadData(state);
    }

    onFromDateInputChange(event) {
        this.setState({
            from: event.target.value
        });
        this.loadData(this.state);
    }

    onToDateInputChange(event) {
        this.setState({
            to: event.target.value
        });
        this.loadData(this.state);
    }

    render() {
        const {dateArray, pointByDate, cardsByDate, isLoading, staffs} = this.props;
        const {from, to, selectedStaff, selectedProject} = this.state;
        const maxPoint = Math.max.apply(Math, staffs.map((staff) => staff.total_points));
        const maxNumCard = Math.max.apply(Math, staffs.map((staff) => staff.num_cards));

        const totalPoint = pointByDate.reduce((total, point) => {
            return total + parseInt(point);
        }, 0);
        const totalCards = cardsByDate.reduce((total, cards) => {
            return total + parseInt(cards);
        }, 0);

        return (

            <div className="row">
                <div className="col-md-12">
                    <CardListModalContainer
                        to={to}
                        from={from}
                        projectId={selectedProject ? selectedProject.value : 0}
                        staffId={selectedStaff ? selectedStaff.value : 0}
                    />
                    <CardDetailModalContainer isProcess={false}/>
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <h4 className="card-title">
                                    <strong>Số lượng điểm và công việc theo ngày</strong>
                                </h4>
                                {
                                    this.state.isLoading ? <Loading/> : (
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4">
                                                <FormInputDateTime
                                                    format={DATETIME_VN_FORMAT}
                                                    name="from"
                                                    id="from"
                                                    label="Từ ngày"
                                                    value={from}
                                                    updateFormData={this.onFromDateInputChange}/>
                                            </div>
                                            <div className="col-md-6 col-lg-4">
                                                <FormInputDateTime
                                                    name="to"
                                                    format={DATETIME_VN_FORMAT}
                                                    id="to"
                                                    label="Tới ngày"
                                                    value={to}
                                                    updateFormData={this.onToDateInputChange}/>
                                            </div>
                                            <div className="col-md-6 col-lg-4"
                                                 style={{height: "91px", marginTop: "20px"}}>
                                                <label>Nhân viên</label>
                                                <Select
                                                    placeholder="Tên nhân viên "
                                                    style={{width: "100%"}}
                                                    value={this.state.selectedStaff}
                                                    name="staff"
                                                    valueComponent={MemberReactSelectValue}
                                                    optionComponent={MemberReactSelectOption}
                                                    options={this.state.staffs.map((s) => {
                                                        return {
                                                            value: s.id,
                                                            label: s.name,
                                                            avatar_url: s.avatar_url
                                                        };
                                                    })}
                                                    onChange={this.staffSelectChange}
                                                />
                                            </div>
                                            <div className="col-md-6 col-lg-4"
                                                 style={{height: "91px", marginTop: "20px"}}>
                                                <label>Dự án</label>
                                                <Select
                                                    placeholder="Tên dự án"
                                                    style={{width: "100%"}}
                                                    value={this.state.selectedProject}
                                                    name="project"
                                                    options={this.state.projects.map((p) => {
                                                        return {
                                                            value: p.id,
                                                            label: p.title,
                                                        };
                                                    })}
                                                    onChange={this.projectSelectChange}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <button className="btn btn-rose" onClick={this.openCardsModal}>
                                                    Xem danh sách công việc
                                                </button>
                                            </div>

                                            <div className="col-sm-12">
                                                {
                                                    isLoading ? <Loading/> : (
                                                        <div>
                                                            <div className="col-lg-4 col-md-4 col-sm-4">
                                                                <div className="card card-stats">
                                                                    <div className="card-header"
                                                                         style={{
                                                                             zIndex: 0
                                                                         }}
                                                                         data-background-color="rose">
                                                                        <i className="material-icons">fiber_manual_record</i>
                                                                    </div>
                                                                    <div className="card-content">
                                                                        <p className="category">Tổng số điểm</p>
                                                                        <h3 className="card-title">
                                                                            {totalPoint}
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-4">
                                                                <div className="card card-stats">
                                                                    <div className="card-header"
                                                                         style={{
                                                                             zIndex: 0
                                                                         }}
                                                                         data-background-color="green">
                                                                        <i className="material-icons">credit_card</i>
                                                                    </div>
                                                                    <div className="card-content">
                                                                        <p className="category">Tổng số thẻ</p>
                                                                        <h3 className="card-title">
                                                                            {totalCards}
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-4">
                                                                <div className="card card-stats">
                                                                    <div className="card-header"
                                                                         style={{
                                                                             zIndex: 0
                                                                         }}
                                                                         data-background-color="blue">
                                                                        <i className="material-icons">gps_not_fixed</i>
                                                                    </div>
                                                                    <div className="card-content">
                                                                        <p className="category">Trung bình</p>
                                                                        <h3 className="card-title">
                                                                            {(totalPoint / totalCards).toFixed(2)}
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <PointTaskBarchart
                                                                label={dateArray}
                                                                data={[pointByDate, cardsByDate]}
                                                                id="barchar_task_and_point_by_date"/>
                                                            <div className="col-sm-12">
                                                                <div className="table-responsive">
                                                                    <table className="table">
                                                                        <thead className="text-primary">
                                                                        <tr className="text-rose">
                                                                            <th>Tên nhân viên</th>
                                                                            <th>Thẻ</th>
                                                                            <th>Điểm</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {
                                                                            staffs && staffs.map((staff, index) => (
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        <Avatar
                                                                                            style={{display: "inline-block"}}
                                                                                            url={staff.avatar_url}
                                                                                            size="20"/>
                                                                                        <div style={{
                                                                                            position: "relative",
                                                                                            display: "inline-block",
                                                                                            top: -4
                                                                                        }}>
                                                                                            {staff.name}
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        {staff.num_cards} / {maxNumCard}
                                                                                        <ProgressBar
                                                                                            bsStyle="rose"
                                                                                            now={staff.num_cards * 100 / maxNumCard}
                                                                                            label={staff.num_cards * 100 / maxNumCard}/>
                                                                                    </td>
                                                                                    <td>
                                                                                        {staff.total_points} / {maxPoint}
                                                                                        <ProgressBar
                                                                                            bsStyle="rose"
                                                                                            now={staff.total_points * 100 / totalPoint}
                                                                                            label={staff.total_points * 100 / totalPoint}/>
                                                                                    </td>
                                                                                </tr>
                                                                            ))

                                                                        }

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </div>

                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardItContainer.propTypes = {
    dashboardItActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dateArray: PropTypes.array,
    pointByDate: PropTypes.array,
    cardsByDate: PropTypes.array,
    staffs: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
        dateArray: state.dashboard.it.dateArray,
        pointByDate: state.dashboard.it.pointByDate,
        cardsByDate: state.dashboard.it.cardsByDate,
        isLoading: state.dashboard.it.isLoading,
        staffs: state.dashboard.it.staffs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardItActions: bindActionCreators(dashboardItActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardItContainer);