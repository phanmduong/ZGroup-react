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
import SetCourseKpiModal from "./SetCourseKpiModal";
import SetKpiModal from "./SetKpiModal";
import setCourseKpiStore from "./setCourseKpiStore";
import setKpiStore from "./setKpiStore";

const optionsBarEnroll = {
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                    label += ': ';
                }
                label += `${dotNumber(Number.parseInt(tooltipItem.value))} lượt`;
                return label;
            }
        }
    },
    legend: {
        display: true,
        position: "bottom"
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            }
        }]
    }
};

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
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            }
        }]
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
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            }
        }]
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
        this.loadDataRegister();
    }

    loadDataRegister = () => {
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

    openModalSetCourseTarget = () => {
        const filter = {...filterStore.filter};

        setCourseKpiStore.setKpi = {
            start_time: filter.start_time,
            end_time: filter.end_time,
            gen_id: filter.gen_id,
        };

        setCourseKpiStore.showModal = true;
    }

    openModalSetSaleTarget = () => {
        const filter = {...filterStore.filter};

        setKpiStore.setKpi = {
            start_time: filter.start_time,
            end_time: filter.end_time,
            gen_id: filter.gen_id,
        };
        setKpiStore.historyFilter = {
            start_time: filter.start_time,
            end_time: filter.end_time,
        };
        setKpiStore.showModal = true;
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
                    <div className="row">
                        <div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Số lượng đăng kí </strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.registers_by_date, data.paid_by_date]}
                                                optionsBar={optionsBarRegister}
                                                fileNameDownload={"số lượng đăng kí "}
                                                labels={[
                                                    {
                                                        label: "Đơn đăng kí",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                        fill: false,
                                                    },
                                                    {
                                                        label: "Đơn đã nộp tiền",
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
                                            <strong>Doanh thu </strong>
                                            <div
                                                className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                                style={{fontSize: 12}}
                                                onClick={() => this.openModalSetSaleTarget()}
                                            >Đặt mục tiêu
                                            </div>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.money_by_date, data.sale_target_by_date]}
                                                optionsBar={optionsBarMoney}
                                                fileNameDownload={"doanh thu "}
                                                labels={[
                                                    {
                                                        label: "Doanh thu",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        fill: false,
                                                    }, {
                                                        label: "Mục tiêu",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
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
                                            <strong>Enrollment</strong>
                                            <div
                                                className="margin-left-10 padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                                                style={{fontSize: 12}}
                                                onClick={() => this.openModalSetCourseTarget()}
                                            >Đặt mục tiêu
                                            </div>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.paid_by_date, data.course_target_by_date]}
                                                optionsBar={optionsBarEnroll}
                                                fileNameDownload={"Enrollment"}
                                                labels={[
                                                    {
                                                        label: "Enrollment",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        fill: false,
                                                    }, {
                                                        label: "Mục tiêu",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                        fill: false,
                                                    }]}
                                            />

                                        }
                                        <br/>

                                    </div>
                                </div>

                            </div>
                        </div>
                        {/*<div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>*/}
                        {/*    <div className="card margin-bottom-20 margin-top-0">*/}
                        {/*        <div className="card-content text-align-left">*/}
                        {/*            <div className="tab-content">*/}
                        {/*                <h4 className="card-title">*/}
                        {/*                    <strong>Tỉ lệ học viên mới - cũ</strong>*/}
                        {/*                </h4>*/}
                        {/*                {*/}
                        {/*                    data.dates && data.dates.length > 0 &&*/}
                        {/*                    <BarChartFilterDate*/}
                        {/*                        isLoading={isLoading}*/}
                        {/*                        dates={this.formatDates(data.dates)}*/}
                        {/*                        dateFormat={DATE_FORMAT}*/}
                        {/*                        data={[data.old_register_by_date, data.new_register_by_date]}*/}
                        {/*                        optionsBar={optionsBarStackRegister}*/}
                        {/*                        fileNameDownload={'tỉ lệ học viên mới - cũ'}*/}
                        {/*                        labels={[*/}
                        {/*                            {*/}
                        {/*                                label: "Đơn từ học viên cũ",*/}
                        {/*                                backgroundColor: '#ffaa00',*/}
                        {/*                                borderColor: '#ffaa00',*/}
                        {/*                            },*/}
                        {/*                            {*/}
                        {/*                                label: "Đơn từ học viên mới",*/}
                        {/*                                backgroundColor: '#4caa00',*/}
                        {/*                                borderColor: '#4caa00',*/}
                        {/*                            }]}*/}
                        {/*                    />*/}

                        {/*                }*/}
                        {/*                <br/>*/}

                        {/*            </div>*/}
                        {/*        </div>*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>New Deal - Retention Deal</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.new_retention_register_by_date, data.retention_register_by_date]}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'New Deal - Retention Deal'}
                                                labels={[
                                                    {
                                                        label: "New Deal",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                        fill: false,
                                                    },
                                                    {
                                                        label: "Retention Deal",
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
                                        <h4 className="card-title">
                                            <strong>New Enrollment - Retention Enrollment</strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={[data.paid_new_retention_register_by_date, data.paid_retention_register_by_date]}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={'New Enrollment - Retention Enrollment'}
                                                labels={[
                                                    {
                                                        label: "New Enrollment",
                                                        backgroundColor: '#ffaa00',
                                                        borderColor: '#ffaa00',
                                                        fill: false,
                                                    },
                                                    {
                                                        label: "Retention Enrollment",
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
                                        <h4 className="card-title">
                                            <strong>New Deal - Retention Deal theo chương trình học</strong>
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
                                                        fill: false,
                                                        data: data.programs.map((program) => program.total_new_register)
                                                    },
                                                    {
                                                        label: "Đơn retention",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        fill: false,
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
                        <div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>New Enrollment - Retention Enrollment theo chương trình học</strong>
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
                                                        fill: false,
                                                        data: data.programs.map((program) => program.total_paid_new_register)
                                                    },
                                                    {
                                                        label: "Đơn retention",
                                                        backgroundColor: '#4caa00',
                                                        borderColor: '#4caa00',
                                                        fill: false,
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
                        <div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>
                            <div className="card margin-bottom-20 margin-top-0">
                                <div className="card-content text-align-left">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Tỉ lệ trạng thái </strong>
                                        </h4>
                                        {
                                            data.dates && data.dates.length > 0 &&
                                            <BarChartFilterDate
                                                isLoading={isLoading}
                                                dates={this.formatDates(data.dates)}
                                                dateFormat={DATE_FORMAT}
                                                data={data.statuses.map((status) => status.register_by_date).reverse()}
                                                optionsBar={optionsBarStackRegister}
                                                fileNameDownload={"tỉ lệ trạng thái "}
                                                labels={data.statuses.map((status) => ({
                                                    label: status.name,
                                                    backgroundColor: (status.color ? status.color : "#ddd"),
                                                    fill: false,
                                                    borderColor: (status.color ? status.color : "#ddd")
                                                })).reverse()}
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
                                                    fill: false,
                                                    borderColor: (source.color ? source.color : "#ddd")
                                                })).reverse()}
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
                                                    fill: false,
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
                <SetCourseKpiModal reload={this.loadDataRegister}/>
                <SetKpiModal reload={this.loadDataRegister}/>
            </div>

        );
    }
}


export default DashboardRegisterComponent;
