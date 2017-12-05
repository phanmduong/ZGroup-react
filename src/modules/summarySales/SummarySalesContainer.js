/**
 * Created by phanmduong on 11/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import * as summarySalesActions from './summarySalesActions';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import SummarySalesComponent from "./SummarySalesComponent";
import * as helper from '../../helpers/helper';
import FormInputDate from '../../components/common/FormInputDate';
import { Panel} from 'react-bootstrap';
class SummarySalesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            selectBaseId: 0,
            gens: [],
            bases: [],
            time:{
                startTime: '',
                endTime: '',
            },
            openFilterPanel: false,
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadSummary = this.loadSummary.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
    }

    componentWillMount() {
        this.props.summarySalesActions.loadGensData();
        this.props.summarySalesActions.loadBasesData();
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

    onChangeGen(value) {
        this.setState({selectGenId: value});
        this.props.summarySalesActions.loadSummarySalesData(value, this.state.selectBaseId, this.state.time.startTime,this.state.time.endTime);
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.props.summarySalesActions.loadSummarySalesData(this.state.selectGenId, value, this.state.time.startTime,this.state.time.endTime);
    }

    loadSummary() {
        this.props.summarySalesActions.loadSummarySalesData(this.state.selectGenId, this.state.selectBaseId);
    }

    openFilterPanel(){
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.setState({time: time, page: 1});
            this.props.summarySalesActions.loadSummarySalesData(this.state.selectGenId, this.state.selectBaseId, time.startTime,time.endTime);
        } else {
            this.setState({time: time});
        }
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
                                <div className="col-sm-3 col-xs-5">
                                    <button
                                        onClick={this.openFilterPanel}
                                        className="btn btn-info btn-rose"
                                    >
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                            </div>
                            <Panel collapsible expanded={!this.state.openFilterPanel}>
                                <div className="col-md-3 col-xs-5">
                                    <FormInputDate
                                        label="Từ ngày"
                                        name="startTime"
                                        updateFormData={this.updateFormDate}
                                        id="form-start-time"
                                        value={this.state.time.startTime}
                                        maxDate={this.state.time.endTime}
                                    />
                                </div>
                                <div className="col-md-3 col-xs-5">
                                    <FormInputDate
                                        label="Đến ngày"
                                        name="endTime"
                                        updateFormData={this.updateFormDate}
                                        id="form-end-time"
                                        value={this.state.time.endTime}
                                        minDate={this.state.time.startTime}

                                    />
                                </div>
                            </Panel>
                            <SummarySalesComponent
                                {...this.props}
                                loadSummary={this.loadSummary}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

SummarySalesContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    summarySalesActions: PropTypes.object.isRequired,
    currentGen: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        gens: state.summarySales.gens,
        isLoadingGens: state.summarySales.isLoadingGens,
        currentGen: state.summarySales.currentGen,
        bases: state.summarySales.bases,
        summary: state.summarySales.summary,
        isLoadingBases: state.summarySales.isLoadingBases,
        isLoading: state.summarySales.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summarySalesActions: bindActionCreators(summarySalesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummarySalesContainer);
