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

const columns = [
    {
        Header: '',
        accessor: 'course.icon_url',
        Cell: props => <img className="circle"
                            src={props.value} alt="" style={{height: 40, width: 40}}/>, // Custom cell components!
        minWidth: 65,
        maxWidth: 65
    },
    {
        Header: 'Tên lớp',
        accessor: 'name',
        Cell: props => <div style={{color: 'red'}}>{props.value}</div>
    },
    {
        Header: 'Môn học',
        accessor: 'course.name',
        Cell: props => <div><strong>{props.value}</strong></div>
    },
    {
        Header: 'Cơ sở',
        accessor: 'base.name',
        Cell: props => <div>{props.value}</div>
    },
    {
        Header: 'Enrolled',
        accessor: 'target',
        Cell: props => {
            const value = props.value;
            let percent = value.current_target * 100 / value.target;
            percent = percent >= 100 ? 100 : percent;
            return (
                <div style={{width: '100%'}}>
                    <h6>{value.current_target + "/" + value.target}</h6>
                    <div className="progress progress-line-success progress-bar-table" style={{}}>
                        <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             style={{width: (percent) + '%'}}>
                                                <span
                                                    className="sr-only">{percent}%</span>
                        </div>
                    </div>
                </div>

            )
        }
    },
    {
        Header: 'Đã đăng kí',
        accessor: 'register_target',
        Cell: props => {
            const value = props.value;
            let percent = value.current_target * 100 / value.target;
            percent = percent > 100 ? 100 : percent;
            return (
                <div>
                    <h6>{value.current_target + "/" + value.target}</h6>
                    <div className="progress progress-line-success progress-bar-table">
                        <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                             aria-valuemin="0"
                             aria-valuemax="100"
                             style={{width: (percent) + '%'}}>
                                                <span
                                                    className="sr-only">{percent}%</span>
                        </div>
                    </div>
                </div>

            )
        }
    },
    {
        Header: 'Lịch học',
        accessor: 'schedule',
        Cell: props => <div>{props.value ? props.value.name : "Không có"}</div>
    },
    {
        Header: 'Khai giảng',
        accessor: 'datestart',
    },
    {
        Header: 'T.Thái',
        accessor: 'status',
        Cell: props => <div>{props.value == 1 ? "Mở" : "Đóng"}</div>
    },

]


@observer
class DashboardClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardClassStore();
    }

    componentDidMount() {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.store.loadClasses(filter);
    }

    loadData = (filter) => {
        cardRevenueStore.analyticsRevenue(filter);
        this.store.loadClasses(filter);
    }

    render() {
        const {isLoading, classes} = this.store;
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardRevenue/>
                {isLoading ? <Loading/> :
                    <div className="row gutter-20">
                        <div className="col-md-12">
                            <ReactTable
                                data={classes}
                                columns={columns}
                                previousText={'Trước'}
                                nextText={'Tiếp'}
                                noDataText={'Không có dữ liệu'}
                                pageText={"Trang"}
                                rowsText={"dòng"}
                                showPagination={false}
                                defaultPageSize={classes.length}
                            />
                        </div>
                    </div>
                }
            </div>

        );
    }
}


export default DashboardClassComponent;