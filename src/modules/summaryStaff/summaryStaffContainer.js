import React from "react";
import * as summaryStaffActions from "./summaryStaffActions";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import {Panel} from 'react-bootstrap';
import SummaryStaffbyWork from './summaryStaffbyWork';
import SummaryStaffbyDepartment from "./summaryStaffbyDepartment";
import PropTypes from 'prop-types';
import Select from './Select';

class summaryStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openFilter: false,
            value: "",
            year: 2018,
        };
        this.load = this.load.bind(this);

    }

    componentWillMount() {
        this.props.summaryStaffActions.loadSummaryStaffDepartment();
        this.props.summaryStaffActions.loadSummaryStaffWork();

    }

    load(year) {
        this.setState({openFilter: !this.state.openFilter});
        this.setState({value: ""});
        this.setState({year: year});
        this.props.summaryStaffActions.loadSummaryStaffWork(year);

    }

    getyear() {
        let data = [];
        let i = new Date().getFullYear();
        let x;
        for (x = i; x > i - 10; x--) {
            data = [...data, {id: x, name: x}];

        }
        return data;
    }

    render() {
        return (
            <div>
                {
                    this.props.isLoadingWork || this.props.isLoadingDepartment ?
                        <Loading/> : (
                            <div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <button className="btn btn-info btn-rose"
                                                onClick={() => this.setState({openFilter: !this.state.openFilter})}>
                                            <i className="material-icons">filter_list</i>
                                            Lọc
                                        </button>
                                    </div>
                                </div>
                                <Panel collapsible expanded={this.state.openFilter}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">filter_list</i>
                                                </div>
                                                <div className="card-content">
                                                    <h4 className="card-title">Bộ lọc
                                                        <small/>
                                                    </h4>
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <div className="form-group">
                                                                <label className="label-control">Chọn năm</label>
                                                                <Select
                                                                    value={this.state.year}
                                                                    options={this.getyear()}
                                                                    onChange={this.load}
                                                                    name="year"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Panel>

                                <div className="row">
                                    <div className="col-md-6">
                                        {/*<div className="col-sm-12">*/}
                                            <SummaryStaffbyWork
                                                staff_work={this.props.staff_work}
                                            />
                                        {/*</div>*/}
                                    </div>
                                    <div className="col-md-6">
                                        {/*<div className="col-sm-12">*/}
                                            <SummaryStaffbyDepartment
                                                staff_department={this.props.staff_department}
                                            />
                                        {/*</div>*/}
                                    </div>
                                </div>


                            </div>


                        )
                }
            </div>
        );
    }
}

summaryStaffContainer.PropTypes = {
    isLoadingWork: PropTypes.bool.isRequired,
    isLoadingDepartment: PropTypes.bool.isRequired,
    staff_work: PropTypes.array.isRequired,
    staff_department: PropTypes.array.isRequired,
    summaryStaffActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingWork: state.summaryStaff.isLoadingWork,
        isLoadingDepartment: state.summaryStaff.isLoadingDepartment,
        staff_work: state.summaryStaff.staff_work,
        staff_department: state.summaryStaff.staff_department,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summaryStaffActions: bindActionCreators(summaryStaffActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(summaryStaffContainer);