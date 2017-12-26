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

// Import actions here!!

class DashboardItContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onFromDateInputChange = this.onFromDateInputChange.bind(this);
        this.onToDateInputChange = this.onToDateInputChange.bind(this);
        this.state = {
            from: moment().subtract(7, 'days').format(DATETIME_VN_FORMAT),
            to: moment().format(DATETIME_VN_FORMAT)
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData(this.defaultFrom, this.defaultTo);
    }

    loadData() {
        const {from, to} = this.state;
        this.props.dashboardItActions
            .loadCountCardsByStaffDuration(this.props.user.id, from, to);
    }

    onFromDateInputChange(event) {
        this.setState({
            from: event.target.value
        });
        this.loadData();
    }

    onToDateInputChange(event) {
        this.setState({
            to: event.target.value
        });
        this.loadData();
    }

    render() {
        const {dateArray, pointByDate, cardsByDate, isLoading} = this.props;
        const {from, to} = this.state;
        return (

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">insert_chart</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">
                                Số lượng điểm và công việc theo ngày
                            </h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormInputDateTime
                                        format={DATETIME_VN_FORMAT}
                                        name="from"
                                        id="from"
                                        label="Từ ngày"
                                        value={from}
                                        updateFormData={this.onFromDateInputChange}/>
                                </div>
                                <div className="col-md-6">
                                    <FormInputDateTime
                                        name="to"
                                        format={DATETIME_VN_FORMAT}
                                        id="to"
                                        label="Tới ngày"
                                        value={to}
                                        updateFormData={this.onToDateInputChange}/>
                                </div>
                            </div>

                            {
                                isLoading ? <Loading/> : (
                                    <PointTaskBarchart
                                        label={dateArray}
                                        data={[pointByDate, cardsByDate]}
                                        id="barchar_task_and_point_by_date"/>
                                )
                            }

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
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
        dateArray: state.dashboard.it.dateArray,
        pointByDate: state.dashboard.it.pointByDate,
        cardsByDate: state.dashboard.it.cardsByDate,
        isLoading: state.dashboard.it.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardItActions: bindActionCreators(dashboardItActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardItContainer);