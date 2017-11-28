/**
 * Created by phanmduong on 11/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import * as summaryMarketingCampaignActions from './summaryMarketingCampaignActions';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import Chart from "./SummaryMaketingCampaignComponent";

class SummaryMarketingCampaignContainer extends React.Component {
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
        this.loadSummary = this.loadSummary.bind(this);
    }

    componentWillMount() {
        this.props.summaryMarketingCampaignActions.loadGensData();
        this.props.summaryMarketingCampaignActions.loadBasesData();
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
        this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(value, this.state.selectBaseId);
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(this.state.selectGenId, value);
    }

    loadSummary() {
        this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(this.state.selectGenId, this.state.selectBaseId);
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
                            <Chart
                                {...this.props}
                                loadSummary={this.loadSummary}
                                genId={this.state.selectGenId}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

SummaryMarketingCampaignContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    summaryMarketingCampaignActions: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        gens: state.summaryMarketingCampaign.gens,
        isLoadingGens: state.summaryMarketingCampaign.isLoadingGens,
        currentGen: state.summaryMarketingCampaign.currentGen,
        bases: state.summaryMarketingCampaign.bases,
        summary: state.summaryMarketingCampaign.summary,
        isLoadingBases: state.summaryMarketingCampaign.isLoadingBases,
        isLoading: state.summaryMarketingCampaign.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summaryMarketingCampaignActions: bindActionCreators(summaryMarketingCampaignActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryMarketingCampaignContainer);
