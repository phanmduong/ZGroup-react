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

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            selectBaseId: 0,
            gens: [],
            bases: []
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadInitDashboard = this.loadInitDashboard.bind(this);
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

    loadDashboard(genId, baseId) {
        if (genId <= 0) return;
        if (baseId === 0) {
            this.props.dashboardActions.loadDashboardData(genId);
        }
        else {
            this.props.dashboardActions.loadDashboardData(genId, baseId);
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
                                        disableRound
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        disableRound
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                            </div>
                            <DashboardComponent
                                {...this.props}
                                loadDashboard={this.loadInitDashboard}
                            />

                        </div>
                    )
                }
            </div>
        )
            ;
    }
}

function mapStateToProps(state) {
    return {
        gens: state.dashboard.gens,
        isLoadingGens: state.dashboard.isLoadingGens,
        currentGen: state.dashboard.currentGen,
        bases: state.dashboard.bases,
        isLoadingBases: state.dashboard.isLoadingBases,
        isLoading: state.dashboard.isLoading,
        dashboard: state.dashboard.dashboard,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
