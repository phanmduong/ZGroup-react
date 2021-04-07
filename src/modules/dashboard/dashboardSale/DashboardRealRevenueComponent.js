import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import filterStore from "./filterStore";
import cardRevenueStore from "./cardRevenueStore";
import {DATE_FORMAT, DATE_FORMAT_SQL} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import BarChartFilterDate from "../BarChartFilterDate";
import moment from "moment";
import {dotNumber} from "../../../helpers/helper";
import DashboardRealRevenueStore from "./DashboardRealRevenueStore";
import CardRealRevenue from "./CardRealRevenue";

const optionsBarMoney = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += `${dotNumber(Math.round(tooltipItem.value))}đ`;
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
class DashboardRealRevenueComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardRealRevenueStore();
    }

    componentDidMount() {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.store.analyticsRegister(filter);
    }

    loadData = (filter) => {
        cardRevenueStore.analyticsRevenue(filter);
        this.store.analyticsRegister(filter);
    }

    formatDates = (dates) => {
        return dates && dates.map((date) => {
            return moment(date, DATE_FORMAT_SQL).format(DATE_FORMAT);
        });
    }

    render() {
        const {isLoading, data} = this.store;
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardRealRevenue store={this.store}/>
                {isLoading ? <Loading/> :
                    <div className="row">
                        <div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title flex flex-align-items-center">
                                            <strong>Doanh thu thực</strong>
                                            <div
                                                className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                                style={{fontSize: 12}}
                                                onClick={() => filterStore.openLinkRegister()}
                                            >Xem chi tiết
                                            </div>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.real_money_by_date]}
                                                optionsBar={optionsBarMoney}
                                                fileNameDownload={"doanh thu thực theo ngày"}
                                                labels={[
                                                    {
                                                        label: "Doanh thu",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        fill: false,

                                                    }]}
                                            />

                                        }
                                        <br/>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title flex flex-align-items-center">
                                            <strong>Doanh thu</strong>
                                            <div
                                                className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                                style={{fontSize: 12}}
                                                onClick={() => filterStore.openLinkRegister()}
                                            >Xem chi tiết
                                            </div>
                                        </h4>

                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.money_by_date]}
                                                optionsBar={optionsBarMoney}
                                                fileNameDownload={"doanh thu theo ngày"}
                                                labels={[
                                                    {
                                                        label: "Doanh thu",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        fill: false,

                                                    }]}
                                            />

                                        }
                                        <br/>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                }

            </div>

        );
    }
}


export default DashboardRealRevenueComponent;
