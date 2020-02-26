import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import CardRevenue from "./CardRevenue";
import filterStore from "./filterStore";
import cardRevenueStore from "./cardRevenueStore";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import DashboardCourseStore from "./DashboardCourseStore";
import ReactTable from "react-table-v6";
import {dotNumber} from "../../../helpers/helper";
import Sort from "../../../components/common/ReactTable/Sort";


const columns = [
    {
        // eslint-disable-next-line react/jsx-no-undef
        Header: '',
        sortable: false,
        accessor: 'icon_url',
        Cell: props => props.value ? <img className="circle"
                                          src={props.value} alt="" style={{height: 40, width: 40}}/> : <div/>, // Custom cell components!
        minWidth: 65,
        maxWidth: 65
    },
    {
        Header: <Sort title="Tên môn"/>,
        accessor: 'name',
        Cell: props => <div><strong>{props.value}</strong></div>
    },
    {
        Header: <Sort title='Số lớp tuyển sinh'/>,
        accessor: 'total_class.total_class_full',
        Cell: props => {
            const value = props.original.total_class
            let percent = value.total ? value.total_class_full * 100 / value.total : 0;
            percent = percent >= 100 ? 100 : percent;
            return (
                <div style={{width: '100%'}}>
                    <h6>{value.total_class_full + "/" + value.total}</h6>
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

            )
        }
    },
    {
        Header: <Sort title="Doanh thu"/>,
        accessor: 'revenue',
        Cell: props => {
            const value = props.value;
            let percent = props.original.total_revenue ? value * 100 / props.original.total_revenue : 0;
            percent = percent >= 100 ? 100 : percent;
            return (
                <div style={{width: '100%'}}>
                    <h6><strong>{dotNumber(props.value)}đ</strong></h6>
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

            )
        }
    },
    {
        Header: <Sort title="Enrolled"/>,
        accessor: 'target.total_paid_register',
        Cell: props => {
            const value = props.original.target;
            let percent = value.total_target ? value.total_paid_register * 100 / value.total_target : 0;
            percent = percent >= 100 ? 100 : percent;
            return (
                <div style={{width: '100%'}}>
                    <h6>{value.total_paid_register + "/" + value.total_target}</h6>
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

            )
        }
    },
    {
        Header: <Sort title="Đăng kí"/>,
        accessor: 'register_target.total_register',
        Cell: props => {
            const value = props.original.register_target;
            let percent = value.total_register_target ? value.total_register * 100 / value.total_register_target : 0;
            percent = percent >= 100 ? 100 : percent;
            return (
                <div style={{width: '100%'}}>
                    <h6>{value.total_register + "/" + value.total_register_target}</h6>
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

            )
        }
    },
    {
        sortable: false,
        Header: "",
        accessor: 'id',
        Cell: props => <div
            className="padding-vertical-10px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer"
            onClick={() => {
                window.open("/teaching/courses/edit/" + props.value, "_blank");
            }}
        >Xem chi tiết</div>
    },


]


@observer
class DashboardCourseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardCourseStore();
    }

    componentDidMount() {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.store.loadCourses(filter);
    }

    loadData = (filter) => {
        cardRevenueStore.analyticsRevenue(filter);
        this.store.loadCourses(filter);
    }

    render() {
        let {isLoading, courses, totalCourse} = this.store;
        courses = [totalCourse, ...courses];
        courses = courses.map((course) => {
            return {
                ...course,
                total_revenue: totalCourse.revenue
            }
        })
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardRevenue/>
                {isLoading ? <Loading/> :
                    <div className="row gutter-20">
                        <div className="col-md-12">
                            <ReactTable
                                data={courses}
                                columns={columns}
                                previousText={'Trước'}
                                nextText={'Tiếp'}
                                noDataText={'Không có dữ liệu'}
                                pageText={"Trang"}
                                rowsText={"dòng"}
                                showPagination={false}
                                defaultPageSize={courses.length + 1}
                                defaultSorted={[
                                    {
                                        id: "revenue",
                                        desc: true
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


export default DashboardCourseComponent;
