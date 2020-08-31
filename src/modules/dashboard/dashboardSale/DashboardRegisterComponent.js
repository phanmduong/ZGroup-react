import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import CardRevenue from "./CardRevenue";
import filterStore from "./filterStore";
import cardRevenueStore from "./cardRevenueStore";
import {DATE_FORMAT, DATE_FORMAT_SQL} from "../../../constants/constants";
import DashboardRegisterStore from "./DashboardRegisterStore";
import Loading from "../../../components/common/Loading";
import BarChartFilterDate from "../BarChartFilterDate";
import moment from "moment";
import {dotNumber} from "../../../helpers/helper";
import BarChart2 from "../BarChart2";

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

const optionsBarRegister = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += `${dotNumber(tooltipItem.value)} đơn`;
                return label;
            }
        }
    },
    legend: {
        display: true,
        position: "bottom"
    }
};

const optionsBarStackRegister = {
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
                label += `${dotNumber(tooltipItem.value)} đơn`;
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
class DashboardRegisterComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardRegisterStore();
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
        console.log(data);
        if (!isLoading && data.campaigns) {
            console.log();
        }
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardRevenue/>
                {isLoading ? <Loading/> :
                    <div className="row gutter-20">
                        <div className="col-md-12">
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Số lượng đăng kí theo ngày</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.registers_by_date, data.paid_by_date]}
                                                optionsBar={optionsBarRegister}
                                                fileNameDownload={"số lượng đăng kí theo ngày"}
                                                labels={[
                                                    {
                                                        label: "Đơn đăng kí",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                    },
                                                    {
                                                        label: "Đơn đã nộp tiền",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                    }]}
                                            />
                                        }
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
                                            <strong>Doanh thu theo ngày</strong>
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
                                                    }]}
                                            />

                                        }
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
                                            <strong>Tỉ lệ học viên mới - cũ</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.old_register_by_date, data.new_register_by_date]}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'tỉ lệ học viên mới - cũ'}
                                                labels={[
                                                    {
                                                        label: "Đơn từ học viên cũ",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                    },
                                                    {
                                                        label: "Đơn từ học viên mới",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                    }]}
                                            />

                                        }
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
                                            <strong>Tỉ lệ học viên new - retention</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.new_retention_register_by_date, data.retention_register_by_date]}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'tỉ lệ học viên new - retention'}
                                                labels={[
                                                    {
                                                        label: "Đơn new",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                    },
                                                    {
                                                        label: "Đơn retention",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                    }]}
                                            />

                                        }
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
                                            <strong>Tỉ lệ học viên new - retention</strong>
                                        </h4>
                                        {
                                            data.programs && data.programs.length > 0 &&
                                            <BarChart2
                                                isLoading={isLoading}
                                                labels={data.programs.map((program) => program.name)}
                                                datasets={[
                                                    {
                                                        label: "Đơn new",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                        data: data.programs.map((program) => program.total_new_register)
                                                    },
                                                    {
                                                        label: "Đơn retention",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        data: data.programs.map((program) => program.total_retention_register)
                                                    }
                                                ]
                                                }
                                                optionsBar={optionsBarStackRegister}
                                            />

                                        }
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
                                            <strong>Tỉ lệ học viên nộp tiền new - retention</strong>
                                        </h4>
                                        {
                                            data.programs && data.programs.length > 0 &&
                                            <BarChart2
                                                isLoading={isLoading}
                                                labels={data.programs.map((program) => program.name)}
                                                datasets={[
                                                    {
                                                        label: "Đơn new",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                        data: data.programs.map((program) => program.total_paid_new_register)
                                                    },
                                                    {
                                                        label: "Đơn retention",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        data: data.programs.map((program) => program.total_paid_retention_register)
                                                    }
                                                ]
                                                }
                                                optionsBar={optionsBarStackRegister}
                                            />

                                        }
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
                                            <strong>Tỉ lệ học viên new - retention</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.new_retention_register_by_date, data.retention_register_by_date]}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'tỉ lệ học viên new - retention'}
                                                labels={[
                                                    {
                                                        label: "Đơn new",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                    },
                                                    {
                                                        label: "Đơn retention",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                    }]}
                                            />

                                        }
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
                                            <strong>Tỉ lệ học viên nộp tiền new - retention</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.paid_new_retention_register_by_date, data.paid_retention_register_by_date]}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'tỉ lệ học viên new - retention'}
                                                labels={[
                                                    {
                                                        label: "Đơn new",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                    },
                                                    {
                                                        label: "Đơn retention",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                    }]}
                                            />

                                        }
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
                                            <strong>Tỉ lệ trạng thái theo ngày</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={data.statuses.map((status) => status.register_by_date).reverse()}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={"tỉ lệ trạng thái theo ngày"}
                                                labels={data.statuses.map((status) => ({
                                                    label: status.name,
                                                    backgroundColor: (status.color ? status.color : "#ddd"),
                                                    borderColor: (status.color ? status.color : "#ddd")
                                                })).reverse()}
                                            />

                                        }
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
                                            <strong>Tỉ lệ đăng kí theo nguồn</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={data.sources.map((source) => source.register_by_date).reverse()}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'tỉ lệ đăng kí theo nguồn'}
                                                labels={data.sources.map((source) => ({
                                                    label: source.name,
                                                    backgroundColor: (source.color ? source.color : "#ddd"),
                                                    borderColor: (source.color ? source.color : "#ddd")
                                                })).reverse()}
                                            />

                                        }
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
                                            <strong>Tỉ lệ đăng kí theo chiến dịch</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={data.campaigns.map((campaign) => campaign.register_by_date).reverse()}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'tỉ lệ đăng kí theo chiến dịch'}
                                                labels={data.campaigns.map((campaign) => ({
                                                    label: campaign.name,
                                                    backgroundColor: (campaign.color ? "#" + campaign.color : "#ddd"),
                                                    borderColor: (campaign.color ? "#" + campaign.color : "#ddd")
                                                })).reverse()}
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


export default DashboardRegisterComponent;
