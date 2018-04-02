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
import * as helper from '../../helpers/helper';
import { Panel} from 'react-bootstrap';
import FormInputDate from '../../components/common/FormInputDate';
import moment from "moment/moment";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";

class SummaryMarketingCampaignContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            selectBaseId: 0,
            gens: [],
            bases: [],
            openFilterPanel: false,
            time:{
                startTime: '',
                endTime: '',
            },
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadSummary = this.loadSummary.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
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

    openFilterPanel(){
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus});
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.setState({time: time});
            this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(
                this.state.selectGenId,
                this.state.selectBaseId,
                time.startTime,
                time.endTime
            );
        } else {
            this.setState({time: time});
        }
    }

    exportExcel(){
        //console.log(this.props);
        let wb = helper.newWorkBook();
        let cols = [{ "wch": 5 },{ "wch": 22 },{ "wch": 10 },];//độ rộng cột
        let summary = helper.groupBy(this.props.summary, item => item.campaign.id, ["campaign_id", "registers"]);
        summary.forEach((obj)=>{
            let sum = 0;
            let json = obj.registers.map((item,index)=>{
                sum +=  item.total_registers;
                let res = {
                    "STT" : index + 1,
                    "Saler" : item.saler.name,
                    "Số lượng" : item.total_registers,
                };
                return res;
            });
            json = [...json, {
                "STT" : "",
                "Saler" : "Tổng",
                "Số lượng" : sum,
            }];
            helper.appendJsonToWorkBook(json,wb,obj.registers[0].campaign.name,cols,[]);
        });
        let basename = this.state.bases.filter(obj => (obj.key == this.state.selectBaseId));
        let genname = this.state.gens.filter(obj => (obj.key == this.state.selectGenId));
        let startTime = moment(this.state.time.startTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(this.state.time.endTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let empt1 =helper.isEmptyInput(this.state.time.startTime);
        let empt2 =helper.isEmptyInput(this.state.time.endTime);
        helper.saveWorkBookToExcel(wb, "Tổng kết chiến dịch "
            + (genname[0] ? (" - " + genname[0].value) : "")
            + (basename[0] ? (" - " + basename[0].value) : "")
            + ((empt1 || empt2) ? '' :
            (' - ' + startTime + ' - ' + endTime)
            )
        );
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
                                        // disableRound
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        // disableRound
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                <div className="col-sm-2 col-xs-5">
                                    <button
                                        style={{width: '100%'}}
                                        onClick={this.openFilterPanel}
                                        className="btn btn-info btn-rose btn-round"
                                    >
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <button className="btn btn-fill btn-rose btn-round" 
                                            onClick={this.exportExcel}
                                    >
                                        Xuất ra Excel
                                        <div className="ripple-container"/>
                                    </button>
                                </div>

                            </div>
                            <Panel collapsible expanded={this.state.openFilterPanel}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"  data-background-color="rose">
                                                <i className="material-icons">filter_list</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Bộ lọc
                                                    <small/>
                                                </h4>
                                                <div className="row">
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </Panel>
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
    currentGen: PropTypes.object.isRequired,
    summary: PropTypes.array.isRequired,
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
