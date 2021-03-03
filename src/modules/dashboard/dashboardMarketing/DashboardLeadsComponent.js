import React from 'react';
import {observer} from 'mobx-react';
import {store} from "./DashBoardMarketingStore";
import BarChartFilterDate from '../BarChartFilterDate';

import moment from "moment";
import {DATE_FORMAT, DATE_FORMAT_SQL, DATE_VN_FORMAT} from "../../../constants/constants";
import {checkColor, dotNumber} from "../../../helpers/helper";
import DashboardLeadFilter from "./DashboardLeadFilter";
import * as baseActions from "../../../actions/baseActions";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import setLeadKpiStore from "./setLeadKpiStore";
import SetLeadKpiModal from "./SetLeadKpiModal";
import ExpenseCampaignMarketing from "./ExpenseCampaignMarketing";
import ExpenseSourceMarketing from "./ExpenseSourceMarketing";
import {Bar} from "react-chartjs-2";
import {URL} from "../../../constants/env";

const optionsBarMoney = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += `${dotNumber(tooltipItem.value)}đ`;
                return label;
            }
        }
    },
    legend: {
        display: true,
        position: "bottom"
    }
};
const optionsBarLead = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += `${dotNumber(tooltipItem.value)}`;
                return label;
            }
        }
    },
    legend: {
        display: true,
        position: "bottom"
    }
};
const optionsStackedBarLead = {
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {

                let label = data.datasets[tooltipItem.datasetIndex].label || '';
                let value = tooltipItem.value;
                let sumVal = Object.entries(data.datasets).reduce((s, [, val]) => {
                    let item = Object.entries(val.data[tooltipItem.index])[0];
                    let hidden = item && item[1] && item[1].hidden;
                    return s + (hidden ? 0 : val.data[tooltipItem.index]);
                }, 0);
                let percentage = Math.floor(value / sumVal * 100);

                if (label) {
                    label += ': ';
                }
                label += `${dotNumber(value)} (${percentage}%)`;
                return label;
            }
        }
    },
    legend: {
        display: true,
        position: "bottom"
    }
};

@observer
class DashboardLeadsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: {}
        };
        // this.routePrefix = `/dashboard/marketing`;

        this.cardDatas = [
            {title: 'Số Lead mới', field: 'leadsCountByDates', url: ''},
            {title: 'Số Lead đã tiếp cận', field: 'leadsReachedCountByDates', url: ''},
            {title: 'Số Lead đã chuyển đổi', field: 'leadsComebackCountByDates', url: ''},
            {title: 'Số Lead quay lại', field: 'leadsComebackTwiceCountByDates', url: ''},
        ];
    }

    componentDidMount() {
        store.pathname = this.props.location.pathname;
        store.filter.choice_province_id = this.props.user.choice_province_id;
    }


    formatDates = (dates) => {
        return dates && dates.map((date) => {
            return moment(date, DATE_FORMAT_SQL).format(DATE_FORMAT);
        });
    };

    statusLabels = () => {
        return store.data.analytics.leadStatuses.map(obj => {
            let color = checkColor(obj.color);
            return {
                label: obj.name,
                backgroundColor: color,
                borderColor: color,
            };
        });
    };
    sourceLabels = () => {
        return store.data.analytics.leadSources.map(obj => {
            let color = checkColor(obj.color);
            return {
                label: obj.name,
                backgroundColor: color,
                borderColor: color,
            };
        });
    };
    campaignLabels = () => {
        return store.data.analytics.leadCampaigns.map(obj => {
            let color = checkColor(obj.color);
            return {
                label: obj.name,
                backgroundColor: color,
                borderColor: color,
            };
        });
    };
    picLabels = () => {
        return store.data.analytics.leadPics.map(obj => {
            let color = checkColor(obj.color);
            return {
                label: obj.name,
                backgroundColor: color,
                borderColor: color,
            };
        });
    };

    reloadData = () => {
        store.load();
    }


    openModalSetKpi = () => {
        const filter = {...store.filter};

        setLeadKpiStore.setKpi = {
            start_time: filter.start_time,
            end_time: filter.end_time,
            gen_id: filter.gen_id,
        };
        setLeadKpiStore.showModal = true;
        console.log("ok");
    }

    openLinkLead = () => {
        let link = `https://${URL}/lead/list?`;
        const filter = {...store.filter};
        const data = {
            startDate: filter.start_time.format('X'),
            endDate: filter.end_time.format('X'),
            creators: JSON.stringify([filter.imported_by]),
            pics: JSON.stringify([filter.carer_id]),
            provinces: JSON.stringify([filter.choice_province_id]),
            bases: JSON.stringify([filter.base_id]),
            sources: JSON.stringify([filter.source_id]),
            campaigns: JSON.stringify([filter.campaign_id]),
        };
        Object.keys(data).forEach((key) => {
            const value = data[key] ? data[key] : "";
            link += `&${key}=${value}`;
        });
        console.log(filter, data, link);
        window.open(link, "_blank");
    }

    render() {
        this.path = this.props.location.pathname;
        let {isLoading} = store;
        return (
            <div className="row gutter-20 margin-top-20">

                <DashboardLeadFilter/>
                {!isLoading &&
                this.cardDatas.map((card) => {
                    return (
                        <div className="col-md-3">
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <p className="category">{card.title}</p>
                                    <h3 className="card-title">{store.getSumArray(card.field) || 0}</h3>
                                    <div
                                        onClick={this.openLinkLead}
                                        className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                        Xem chi tiết
                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })
                }
                {/*{!isLoading &&*/}
                {/*<div className="col-md-12">*/}
                {/*    <div className="card margin-bottom-20 margin-top-0">*/}
                {/*        <div className="card-content text-align-left">*/}
                {/*            <div className="tab-content">*/}
                {/*                <h4 className="card-title flex flex-align-items-center">*/}
                {/*                    <strong>Phễu chuyển đổi</strong>*/}
                {/*                </h4>*/}
                {/*                <br/>*/}
                {/*                <br/>*/}
                {/*                {this.cardDatas.map((card, key) => {*/}
                {/*                    let val = store.getSumArray(card.field) || 0;*/}
                {/*                    let total = store.getSumArray('leadsCountByDates') || 0;*/}
                {/*                    return (*/}
                {/*                        <div className="margin-top-20 margin-bottom-20" key={key}>*/}
                {/*                            <div className="row">*/}
                {/*                                <div className="col-md-3">*/}
                {/*                                    <div className="text-align-left">*/}
                {/*                                        <div>{card.title}</div>*/}
                {/*                                        <h3 className="card-title">{val}</h3>*/}
                {/*                                        <div*/}
                {/*                                            className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">*/}
                {/*                                            Xem chi tiết*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                                <div className="col-md-9">*/}
                {/*                                    <div className="progress  progress-bar-dashboard-marketing">*/}
                {/*                                        <div className="progress-bar progress-bar-success"*/}
                {/*                                             role="progressbar"*/}
                {/*                                             aria-valuenow="60"*/}
                {/*                                             aria-valuemin="0"*/}
                {/*                                             aria-valuemax="100"*/}
                {/*                                             style={{*/}
                {/*                                                 width: Math.max(val / total * 100, 0.1) + '%',*/}
                {/*                                                 opacity: (1 - key / 5)*/}
                {/*                                             }}/>*/}
                {/*                                    </div>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}


                {/*                    );*/}
                {/*                })}*/}
                {/*                <br/>*/}

                {/*            </div>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>}*/}
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <div className="flex flex-row flex-space-between flex-align-items-center">
                                    <h4 className="card-title flex flex-align-items-center">
                                        <strong>Số Lead mới theo ngày tạo</strong>
                                        <div
                                            className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                            style={{fontSize: 12}}
                                            onClick={() => this.openLinkLead()}
                                        >Xem chi tiết
                                        </div>
                                    </h4>
                                    <div
                                        className="padding-vertical-10px padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{width: 120}}
                                        onClick={() => this.openModalSetKpi()}
                                    >Set KPI
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={[store.data.analytics.leadsCountByDates, store.data.analytics.leadsReachedCountByDates, store.data.analytics.leadKpiByDates]}
                                    dateFormat={DATE_FORMAT}
                                    id="barchar_lead_by_date"
                                    optionsBar={optionsBarLead}
                                    labels={[
                                        {
                                            label: "Số Lead mới",
                                            backgroundColor: '#ffaa00',
                                            borderColor: '#ffaa00',
                                        },
                                        {
                                            label: "Số Lead đã tiếp cận",
                                            backgroundColor: '#4caa00',
                                            borderColor: '#4caa00',
                                        },
                                        {
                                            label: "KPI",
                                            backgroundColor: '#0066aa',
                                            borderColor: '#0066aa',
                                        }]}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>


                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">
                                    <strong>Số Lead chuyển đổi (Lead to Deal)</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>

                                </h4>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={[store.data.analytics.leadsComebackCountByDates, store.data.analytics.leadsComebackTwiceCountByDates]}
                                    id="barchar_lead_transfer_by_date"
                                    dateFormat={DATE_FORMAT}
                                    optionsBar={optionsStackedBarLead}
                                    labels={[
                                        {
                                            label: "Số Lead đăng kí mới",
                                            backgroundColor: '#ffaa00',
                                            borderColor: '#ffaa00',
                                        },
                                        {
                                            label: "Số Lead tái đăng kí",
                                            backgroundColor: '#4caa00',
                                            borderColor: '#4caa00',
                                        }]}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">
                                    <strong>Tỉ lệ Lead theo trạng thái</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={store.data.analytics.leadsByStatuses}
                                    id="barchar_lead_by_obj"
                                    dateFormat={DATE_FORMAT}
                                    optionsBar={optionsStackedBarLead}
                                    labels={this.statusLabels()}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">

                                    <strong>Tỉ lệ Lead theo P.I.C</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={store.data.analytics.leadsByPics}
                                    id="barchar_lead_by_pic"
                                    dateFormat={DATE_FORMAT}
                                    optionsBar={optionsStackedBarLead}
                                    labels={this.picLabels()}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">
                                    <strong>Tỉ lệ Lead theo nguồn</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={store.data.analytics.leadsBySources}
                                    id="barchar_lead_by_source"
                                    dateFormat={DATE_FORMAT}
                                    optionsBar={optionsStackedBarLead}
                                    labels={this.sourceLabels()}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">
                                    <strong>Tỉ lệ Lead theo chiến dịch</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={store.data.analytics.leadsByCampaigns}
                                    id="barchar_lead_by_campaign"
                                    dateFormat={DATE_FORMAT}
                                    optionsBar={optionsStackedBarLead}
                                    labels={this.campaignLabels()}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">
                                    <strong>Chi phí chiến dịch marketing</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <div>
                                    {store.filter.start_time.format(DATE_VN_FORMAT)} - {store.filter.end_time.format(DATE_VN_FORMAT)}
                                </div>
                                <br/>
                                <ExpenseCampaignMarketing store={store}/>
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">

                                    <strong>Thống kê chi phí chiến dịch marketing</strong>

                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <div>
                                    {store.filter.start_time.format(DATE_VN_FORMAT)} - {store.filter.end_time.format(DATE_VN_FORMAT)}
                                </div>
                                <br/>
                                <Bar
                                    data={{
                                        datasets: store.expenseCampaigns.map((item) => {
                                            return {
                                                backgroundColor: "#" + item.color,
                                                borderColor: "#" + item.color,
                                                data: [item.total_expense],
                                                label: item.name
                                            };
                                        })
                                    }}
                                    options={optionsBarMoney}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">
                                    <strong>Chi phí nguồn marketing</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <div>
                                    {store.filter.start_time.format(DATE_VN_FORMAT)} - {store.filter.end_time.format(DATE_VN_FORMAT)}
                                </div>
                                <br/>
                                <ExpenseSourceMarketing store={store}/>
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-12">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <div className="tab-content">
                                <h4 className="card-title flex flex-align-items-center">

                                    <strong>Thống kê chi phí nguồn marketing</strong>
                                    <div
                                        className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                        style={{fontSize: 12}}
                                        onClick={() => this.openLinkLead()}
                                    >Xem chi tiết
                                    </div>
                                </h4>
                                <div>
                                    {store.filter.start_time.format(DATE_VN_FORMAT)} - {store.filter.end_time.format(DATE_VN_FORMAT)}
                                </div>
                                <br/>
                                <Bar
                                    data={{
                                        // labels: store.expenseSources.map((item) => item.name),
                                        datasets: store.expenseSources.map((item) => {
                                            return {
                                                backgroundColor: item.color,
                                                borderColor: item.color,
                                                data: [item.total_expense],
                                                label: item.name
                                            };
                                        })
                                    }}
                                    options={optionsBarMoney}
                                />
                                <br/>

                            </div>
                        </div>

                    </div>
                </div>

                <SetLeadKpiModal reload={this.reloadData}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        selectedBaseId: state.global.selectedBaseId,
        bases: state.global.bases,
        provinces: state.global.provinces,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseActions: bindActionCreators(baseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLeadsComponent);
