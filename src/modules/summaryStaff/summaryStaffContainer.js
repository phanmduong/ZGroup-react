import React from "react";
import * as summaryStaffActions from "./summaryStaffActions";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import {Panel} from 'react-bootstrap';
import SummaryStaffbyWork from './summaryStaffbyWork';
import SummaryStaffbyDepartment from "./summaryStaffbyDepartment";
import PropTypes from 'prop-types';
class summaryStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openFilter: false,
            value: "",
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
        this.props.summaryStaffActions.loadSummaryStaffWork(year);

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
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="label-control">Nhập năm</label>
                                                                <form onSubmit={e => {
                                                                    e.preventDefault();
                                                                    if (this.state.value.trim() != "") this.load(this.state.value);
                                                                }
                                                                }
                                                                >

                                                                    <input type="type" value={this.state.value}
                                                                           className="form-control"
                                                                           onChange={(e) => {
                                                                               this.setState({value: e.target.value});
                                                                           }}/>

                                                                    <button className="btn btn-danger" type="submit">
                                                                        Filter
                                                                    </button>


                                                                </form>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Panel>
                                <SummaryStaffbyWork
                                    staff_work ={this.props.staff_work}
                                />
                                <SummaryStaffbyDepartment
                                    staff_department={this.props.staff_department}
                                />


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
    summaryStaffActions:  PropTypes.object.isRequired,
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