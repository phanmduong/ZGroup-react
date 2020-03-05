import React from 'react';
import {observer} from 'mobx-react';
import {store} from "./DashBoardMarketingStore";
import BarChartFilterDate from '../BarChartFilterDate';

import moment from "moment";
import {DATE_FORMAT, DATE_FORMAT_SQL} from "../../../constants/constants";
import {dotNumber, isEmptyInput} from "../../../helpers/helper";
import DashboardLeadFilter from "./DashboardLeadFilter";
import * as baseActions from "../../../actions/baseActions";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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

    checkColor = (color) => {
        return isEmptyInput(color) ? '#eeeeee' : color;
    }

    formatDates = (dates) => {
        return dates && dates.map((date) => {
            return moment(date, DATE_FORMAT_SQL).format(DATE_FORMAT);
        });
    };

    statusLabels = ()=>{
        return store.data.analytics.leadStatuses.map(obj=>{
            let color = this.checkColor( obj.color);
            return {
                label: obj.name,
                backgroundColor: color,
                borderColor: color,
            };
        });
    }
    sourceLabels = ()=>{
        return store.data.analytics.leadSources.map(obj=>{
            let color = this.checkColor( obj.color);
            return {
                label: obj.name,
                backgroundColor: color,
                borderColor: color,
            };
        });
    }
    campaignLabels = ()=>{
        return store.data.analytics.leadCampaigns.map(obj=>{
            let color = this.checkColor( `#${obj.color}`);
            return {
                label: obj.name,
                backgroundColor: color,
                borderColor: color,
            };
        });
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
                {/*                <h4 className="card-title">*/}
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
                                <h4 className="card-title">
                                    <strong>Số Lead mới theo ngày tạo</strong>
                                </h4>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={[store.data.analytics.leadsCountByDates, store.data.analytics.leadsReachedCountByDates]}
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
                                <h4 className="card-title">
                                    <strong>Số Lead chuyển đổi (Lead to Deal)</strong>
                                </h4>
                                <br/>
                                <br/>
                                <BarChartFilterDate
                                    isLoading={isLoading}
                                    dates={this.formatDates(store.data.analytics.dates)}
                                    data={[store.data.analytics.leadsComebackCountByDates, store.data.analytics.leadsComebackTwiceCountByDates]}
                                    id="barchar_lead_transfer_by_date"
                                    dateFormat={DATE_FORMAT}
                                    optionsBar={optionsBarLead}
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
                                <h4 className="card-title">
                                    <strong>Tỉ lệ Lead theo trạng thái</strong>
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
                                <h4 className="card-title">
                                    <strong>Tỉ lệ Lead theo nguồn</strong>
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
                                <h4 className="card-title">
                                    <strong>Tỉ lệ Lead theo chiến dịch</strong>
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
