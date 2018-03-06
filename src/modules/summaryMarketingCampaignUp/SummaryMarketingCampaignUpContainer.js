import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import * as summaryMarketingCampaignActions from './summaryMarketingCampaignActions';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import Chart from "./SummaryMaketingCampaignComponent";
import * as helper from '../../helpers/helper';
import {Panel} from 'react-bootstrap';
import FormInputDate from '../../components/common/FormInputDate';
import moment from "moment/moment";
import {DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import SelectMonthBox from "../../components/common/SelectMonthBox";


class SummaryMarketingCampaignUpContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectBaseId: 0,
            bases: [],
            isShowMonthBox: false,
            openFilterPanel: false,
            time: {
                startTime: '',
                endTime: '',
            },
            month: {year: 0, month: 0},
        };
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadSummary = this.loadSummary.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
        this.handleClickMonthBox = this.handleClickMonthBox.bind(this);
        this.handleAMonthChange = this.handleAMonthChange.bind(this);
        this.handleAMonthDismiss = this.handleAMonthDismiss.bind(this);
    }

    componentWillMount() {
        this.props.summaryMarketingCampaignActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                bases: this.getBases(nextProps.bases),
            });
        }
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

    handleClickMonthBox() {
        this.setState({isShowMonthBox: true});
    }

    handleAMonthChange(value) {
        let startTime = value.year + "-" + value.month + "-01";
        let endTime;
        if (value.month !== 12) {
            endTime = value.year + "-" + (value.month + 1) + "-01";
        }
        else endTime = value.year + 1 + "-01" + "-01";
        this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(
            this.state.selectBaseId,
            startTime,
            endTime,
            () => this.setState({month: value}),
        );
        let time = {...this.state.time};
        time["startTime"] = startTime;
        time["endTime"] = endTime;
        this.setState({time: time});
        this.handleAMonthDismiss();
    }

    handleAMonthDismiss() {
        this.setState({isShowMonthBox: false});
    }


    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(value);
    }

    loadSummary() {
        this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(this.state.selectBaseId);
    }

    openFilterPanel() {
        let newstatus = !this.state.openFilterPanel;
        this.setState({openFilterPanel: newstatus, isShowMonthBox: false});
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.setState({time: time, month: {year: 0, month: 0}});
            this.props.summaryMarketingCampaignActions.loadSummaryMarketingCampaignData(
                this.state.selectBaseId,
                time.startTime,
                time.endTime
            );
        } else {
            this.setState({time: time, month: {year: 0, month: 0}});
        }
    }

    exportExcel() {
        let wb = helper.newWorkBook();
        let cols = [{"wch": 5}, {"wch": 22}, {"wch": 10},];//độ rộng cột
        let summary = helper.groupBy(this.props.summary, item => item.campaign.id, ["campaign_id", "registers"]);
        summary.forEach((obj) => {
            let sum = 0;
            let json = obj.registers.map((item, index) => {
                sum += item.total_registers;
                let res = {
                    "STT": index + 1,
                    "Saler": item.saler.name,
                    "Số lượng": item.total_registers,
                };
                return res;
            });
            json = [...json, {
                "STT": "",
                "Saler": "Tổng",
                "Số lượng": sum,
            }];
            helper.appendJsonToWorkBook(json, wb, obj.registers[0].campaign.name, cols, []);
        });
        let basename = this.state.bases.filter(obj => (obj.key == this.state.selectBaseId));
        let startTime = moment(this.state.time.startTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let endTime = moment(this.state.time.endTime, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
        let empt1 = helper.isEmptyInput(this.state.time.startTime);
        let empt2 = helper.isEmptyInput(this.state.time.endTime);
        helper.saveWorkBookToExcel(wb, "Tổng kết chiến dịch "
            + (basename[0] ? (" - " + basename[0].value) : "")
            + ((empt1 || empt2) ? '' :
                    (' - ' + startTime + ' - ' + endTime)
            )
        );
    }


    render() {
        return (
            <div>
                {this.props.isLoadingBases ? <Loading/> :
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">

                                    <SelectMonthBox
                                        theme="light"
                                        isHide={this.state.openFilterPanel}
                                        value={this.state.month}
                                        onChange={this.handleAMonthChange}
                                        isAuto={false}
                                        isShowMonthBox={this.state.isShowMonthBox}
                                        openBox={this.handleClickMonthBox}
                                        closeBox={this.handleAMonthDismiss}
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
                                <div className="col-sm-2 col-xs-5">

                                    {
                                        this.state.isShowMonthBox ?
                                            <button
                                                style={{width: '100%'}}
                                                className="btn btn-info btn-rose disabled"
                                            >
                                                <i className="material-icons disabled">filter_list</i>
                                                Lọc
                                            </button>
                                            :
                                            <button
                                                style={{width: '100%'}}
                                                onClick={this.openFilterPanel}
                                                className="btn btn-info btn-rose "
                                            >
                                                <i className="material-icons">filter_list</i>
                                                Lọc
                                            </button>
                                    }
                                </div>

                                <div className="col-sm-3 col-xs-5">
                                    <button className="btn btn-fill btn-rose"
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
                                            <div className="card-header card-header-icon" data-background-color="rose">
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
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

SummaryMarketingCampaignUpContainer.propTypes = {
    summaryMarketingCampaignActions: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    summary: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingGens: state.summaryMarketingCampaignUp.isLoadingGens,
        bases: state.summaryMarketingCampaignUp.bases,
        summary: state.summaryMarketingCampaignUp.summary,
        isLoadingBases: state.summaryMarketingCampaignUp.isLoadingBases,
        isLoading: state.summaryMarketingCampaignUp.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summaryMarketingCampaignActions: bindActionCreators(summaryMarketingCampaignActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryMarketingCampaignUpContainer);
