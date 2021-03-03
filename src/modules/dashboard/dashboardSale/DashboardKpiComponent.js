import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import filterStore from "./filterStore";
import setKpiStore from "./setKpiStore";
import cardRevenueStore from "./cardRevenueStore";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import DashboardKpiStore from "./DashboardKpiStore";
import CardKpi from "./CardKpi";
import ReactTable from "react-table-v6";
import Sort from "../../../components/common/ReactTable/Sort";
import {convertDotMoneyToK, dotNumber} from "../../../helpers/helper";
import SetKpiModal from "./SetKpiModal";

@observer
class DashboardKpiComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardKpiStore();
        this.state = {
            showModalKpi: false,
        };
        this.columns = [
            {
                // eslint-disable-next-line react/jsx-no-undef
                Header: '',
                sortable: false,
                accessor: 'avatar_url',
                Cell: props => props.value ? <img className="circle"
                                                  src={props.value} alt="" style={{height: 40, width: 40}}/> : <div/>, // Custom cell components!
                minWidth: 65,
                maxWidth: 65
            },
            {
                Header: <Sort title="Tên nhân viên"/>,
                accessor: 'name',
                Cell: props => <div onClick={() => filterStore.openLinkRegister({saler_id: props.original.id}, true)}>
                    <strong>{props.value}</strong></div>
            },
            {
                Header: <Sort title="Thành phố"/>,
                accessor: 'base.district.province.name',
                Cell: props => <div>{props.value}</div>
            },
            {
                Header: <Sort title="Cơ sở"/>,
                accessor: 'base.name',
                Cell: props => <div>{props.value}</div>
            },
            {
                Header: <Sort title="Tiến độ"/>,
                accessor: 'revenue',
                Cell: props => {
                    const value = props.original;
                    let percent = value.kpi ? value.revenue * 100 / value.kpi : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{convertDotMoneyToK(dotNumber(value.revenue)) + "/" + convertDotMoneyToK(dotNumber(value.kpi))}</h6>
                            <div className="progress progress-line-success progress-bar-table"
                                 style={{width: '100%!important'}}>
                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     style={{width: (percent) + '%'}}>
                                                <span
                                                    className="sr-only">{percent}%</span>
                                </div>
                            </div>
                        </div>

                    );
                }
            },
            {
                Header: <Sort title="Tỉ lệ chốt đơn"/>,
                accessor: 'total_paid_register',
                Cell: props => {
                    const value = props.original;
                    let percent = value.total_register ? value.total_paid_register * 100 / value.total_register : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.total_paid_register + "/" + value.total_register}</h6>
                            <div className="progress progress-line-success progress-bar-table"
                                 style={{width: '100%!important'}}>
                                <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     style={{width: (percent) + '%'}}>
                                                <span
                                                    className="sr-only">{percent}%</span>
                                </div>
                            </div>
                        </div>

                    );
                }
            },
            {
                sortable: false,
                Header: "",
                accessor: 'id',
                Cell: props => (<div className="flex flex-row flex-align-items-center">
                    <div
                        className="padding-vertical-10px padding-horizontal-20px white-light-round margin-right-10 btn-grey text-center font-weight-400 cursor-pointer"
                        style={{width: 120}}
                        onClick={() => filterStore.openLinkRegister({saler_id: props.value}, true)}
                    >Chi tiết đơn
                    </div>
                    <div
                        className="padding-vertical-10px padding-horizontal-20px white-light-round margin-right-10 btn-grey text-center font-weight-400 cursor-pointer"
                        style={{width: 120}}
                        onClick={() => this.openModalSetKpi(props.original, true)}
                    >Lịch sử KPI
                    </div>
                    <div
                        className="padding-vertical-10px padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                        style={{width: 120}}
                        onClick={() => this.openModalSetKpi(props.original)}
                    >Set KPI
                    </div>
                </div>),
                maxWidth: 400,
                width: 400
            },
        ];
    }

    componentDidMount() {
        this.load();
    }

    loadData = (filter) => {
        cardRevenueStore.analyticsRevenue(filter);
        this.store.analyticsKpi(filter);
    }

    openModalSetKpi = (saler, openHistoryPanel) => {
        const filter = {...filterStore.filter};

        let salerIds = [];
        if (saler.id) {
            salerIds = [saler.id];
        } else {
            salerIds = this.store.data.map((item) => item.id);
        }

        setKpiStore.selectedSaler = saler;
        setKpiStore.setKpi = {
            start_time: filter.start_time,
            end_time: filter.end_time,
            gen_id: filter.gen_id,
            user_ids: salerIds
        };
        setKpiStore.historyFilter = {
            start_time: filter.start_time,
            end_time: filter.end_time,
            user_ids: salerIds
        };
        setKpiStore.historyKpi({...setKpiStore.historyFilter, base_id: filterStore.base_id});
        setKpiStore.showModal = true;
        setKpiStore.openHistoryPanel = openHistoryPanel;
    }

    load = () => {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.store.analyticsKpi(filter);
    }


    render() {
        let {isLoading, data, totalKpi} = this.store;
        data = [totalKpi, ...data];
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardKpi totalKpi={totalKpi.kpi} totalMoney={totalKpi.revenue} totalSaler={data.length - 1}/>
                {isLoading ? <Loading/> :
                    <div className="row">
                        <div className="col-md-12" style={{paddingLeft: 10, paddingRight: 10}}>
                            <ReactTable
                                data={data}
                                columns={this.columns}
                                previousText={'Trước'}
                                nextText={'Tiếp'}
                                noDataText={'Không có dữ liệu'}
                                pageText={"Trang"}
                                rowsText={"dòng"}
                                showPagination={false}
                                defaultPageSize={data.length}
                                defaultSorted={[
                                    {
                                        id: "revenue",
                                        desc: data.length > 2 && totalKpi.revenue > 0
                                    }
                                ]}
                            />
                        </div>
                    </div>
                }
                <SetKpiModal reload={this.load}/>
            </div>

        );
    }
}


export default DashboardKpiComponent;
