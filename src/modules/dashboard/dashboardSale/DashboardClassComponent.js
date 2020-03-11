import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import CardRevenue from "./CardRevenue";
import filterStore from "./filterStore";
import cardRevenueStore from "./cardRevenueStore";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import DashboardClassStore from "./DashboardClassStore";
import ReactTable from "react-table-v6";
import Switch from "react-bootstrap-switch";
import Sort from "../../../components/common/ReactTable/Sort";


@observer
class DashboardClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardClassStore();
        this.columns = [
            {
                Header: '',
                sortable: false,
                accessor: 'course.icon_url',
                Cell: props => (<img className="circle"
                                     src={props.value} alt="" style={{height: 40, width: 40}}/>), // Custom cell components!
                minWidth: 65,
                maxWidth: 65
            },
            {
                Header: <Sort title="Tên lớp"/>,
                accessor: 'name',
                Cell: props => (<div style={{color: 'red', cursor: "pointer"}} onClick={() => {
                    window.open("/teaching/class/" + props.original.id, "_blank");
                }}>{props.value}</div>)
            },
            {
                Header: <Sort title="Môn học"/>,
                accessor: 'course.name',
                Cell: props => (<div style={{cursor: "pointer"}} onClick={() => {
                    window.open("/teaching/courses/edit/" + props.original.course.id, "_blank");
                }}><strong>{props.value}</strong></div>)
            },
            {
                Header: <Sort title="Cơ sở"/>,
                accessor: 'base.name',
                Cell: props => <div>{props.value}</div>
            },
            {
                Header: <Sort title="Enrolled"/>,
                accessor: 'target.current_target',
                Cell: props => {
                    const value = props.original.target;
                    let percent = value.target ? value.current_target * 100 / value.target : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.current_target + "/" + value.target}</h6>
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
                Header: <Sort title="Đăng kí"/>,
                accessor: 'register_target.current_target',
                Cell: props => {
                    const value = props.original.register_target;
                    let percent = value.target ? value.current_target * 100 / value.target : 0;
                    percent = percent > 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.current_target + "/" + value.target}</h6>
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
                Header: <Sort title="Lịch học"/>,
                accessor: 'schedule',
                Cell: props => <div>{props.value ? props.value.name : "Không có"}</div>
            },
            {
                Header: <Sort title="Khai giảng"/>,
                accessor: 'datestart',
            },
            {
                Header: <Sort title="T.Thái"/>,
                accessor: 'status',
                Cell: props => (<Switch
                    bsSize="mini"
                    onColor={"success"}
                    onText="Bật" offText="Tắt"

                    onChange={() => {
                        this.store.changeClassStatus(props.original.id)
                    }}
                    value={(props.value === 1)}/>)
            },

        ];
    }

    componentDidMount() {
        this.loadClasses();
    }

    loadData = (filter) => {
        cardRevenueStore.analyticsRevenue(filter);
        this.store.loadClasses(filter);
    }

    loadClasses = () => {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.store.loadClasses(filter);
    }

    onChangeTab = (tab) => {
        this.store.currentTab = tab;
        this.loadClasses();
    }

    render() {
        const {isLoading, classes, currentTab} = this.store;
        return (
            <div>
                <Filter loadData={this.loadData} disabledCampaign disabledSource/>
                <CardRevenue/>
                <div className="row gutter-20 margin-bottom-20">
                    <div className="col-md-12">
                        <ul className="nav nav-pills nav-pills-dark margin-top-10" data-tabs="tabs">
                            <li className={currentTab == "registering" ? "active" : ""}
                                onClick={() => this.onChangeTab("registering")}>
                                <a>Đang tuyển sinh</a>
                            </li>
                            <li className={currentTab != "registering" ? "active" : ""}
                                onClick={() => this.onChangeTab("studying")}>
                                <a>Đang học</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {isLoading ? <Loading/> :
                    <div className="row gutter-20">
                        <div className="col-md-12">
                            <ReactTable
                                data={classes}
                                columns={this.columns}
                                previousText={'Trước'}
                                nextText={'Tiếp'}
                                noDataText={'Không có dữ liệu'}
                                pageText={"Trang"}
                                rowsText={"dòng"}
                                showPagination={false}
                                defaultPageSize={classes.length}
                                defaultSorted={[
                                    {
                                        id: "name",
                                        desc: false
                                    }
                                ]}
                            />
                        </div>
                    </div>
                }
            </div>

        );
    }
}


export default DashboardClassComponent;
