/**
 * Created by phanmduong on 9/3/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import Loading from '../../components/common/Loading';
import * as dashboardActions from './dashboardActions';
import DashboardComponent from './DashboardComponent';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormInputDate from "../../components/common/FormInputDate";
import * as helper from '../../helpers/helper';

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            selectBaseId: 0,
            gens: [],
            bases: [],
            filter: {
                startTime: '',
                endTime: '',
            }
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadInitDashboard = this.loadInitDashboard.bind(this);
        this.updateFormFilter = this.updateFormFilter.bind(this);
    }

    componentWillMount() {
        this.props.dashboardActions.loadGensData();
        this.props.dashboardActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingGens !== this.props.isLoadingGens && !nextProps.isLoadingGens) {
            this.setState({
                gens: this.getGens(nextProps.gens),
                selectGenId: nextProps.currentGen.id
            });
        }
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                bases: this.getBases(nextProps.bases),
            });
        }
    }

    loadStudyPackRegisters = (search = '', filter = '', page = 1) => {
        this.props.dashboardActions.loadStudyPackRegister(this.state.selectGenId, this.state.selectBaseId, search, filter, page);
    }

    getGens(gens) {
        return gens.map(function (gen) {
            return {
                key: gen.id,
                value: 'Khóa ' + gen.name
            };
        });
    }

    getBases(bases) {
        let baseData = bases.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        this.setState({selectBaseId: 0});
        return [{
            key: 0,
            value: 'Tất cả'
        }, ...baseData];
    }

    loadInitDashboard() {
        this.loadDashboard(this.state.selectGenId, this.state.selectBaseId);
    }

    loadDashboard(genId, baseId, startTime, endTime) {
        if (genId <= 0) return;
        if (baseId === 0) {
            this.props.dashboardActions.loadDashboardData(genId, '', startTime, endTime);
        }
        else {
            this.props.dashboardActions.loadDashboardData(genId, baseId, startTime, endTime);
        }
    }

    onChangeGen(value) {
        this.setState({selectGenId: value});
        this.loadDashboard(value, this.state.selectBaseId);
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.loadDashboard(this.state.selectGenId, value);
    }

    updateFormFilter(event) {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;

        if (!helper.isEmptyInput(filter.startTime) && !helper.isEmptyInput(filter.endTime)) {
            this.loadDashboard(this.state.selectGenId, this.state.selectBaseId, filter.startTime, filter.endTime);
        }
        this.setState({filter: filter});
    }

    render() {
        return (
            <div>

                {this.props.isLoadingGens || this.props.isLoadingBases ? <Loading/> :
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={this.state.gens}
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-info btn-rose btn-round"
                                            style={{width: "100%"}}
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
                                            <div className="card-content">
                                                <div className="tab-content">
                                                    <h4 className="card-title">
                                                        <strong>Bộ lọc</strong>
                                                    </h4>
                                                    <br/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Từ ngày"
                                                            name="startTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-start-time"
                                                            value={this.state.filter.startTime}
                                                            maxDate={this.state.filter.endTime}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Đến ngày"
                                                            name="endTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-end-time"
                                                            value={this.state.filter.endTime}
                                                            minDate={this.state.filter.startTime}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                            <DashboardComponent
                                {...this.props}
                                loadDashboard={this.loadInitDashboard}
                                loadStudyPackRegisters={this.loadStudyPackRegisters}
                            />
                        </div>
                    )
                }
            </div>
        )
            ;
    }
}

DashboardContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    dashboardActions: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    currentGen: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    studyPack: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        gens: state.dashboardStudyPack.gens,
        isLoadingGens: state.dashboardStudyPack.isLoadingGens,
        currentGen: state.dashboardStudyPack.currentGen,
        bases: state.dashboardStudyPack.bases,
        isLoadingBases: state.dashboardStudyPack.isLoadingBases,
        isLoading: state.dashboardStudyPack.isLoading,
        dashboard: state.dashboardStudyPack.dashboard,
        studyPack: state.dashboardStudyPack.studyPack,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
