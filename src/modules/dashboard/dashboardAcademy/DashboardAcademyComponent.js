import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import CardAcademy from "./CardAcademy";
import filterStore from "./filterStore";
import {DATE_FORMAT_SQL, STATUS_REFS} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import DashboardAcademyStore from "./DashboardAcademyStore";
import ReactTable from "react-table-v6";
import Sort from "../../../components/common/ReactTable/Sort";
import TooltipButton from "../../../components/common/TooltipButton";
import {removeObservable} from "../../../helpers/entity/mobx";
import {
    appendJsonToWorkBook,
    getShortName,
    isEmptyInput,
    newWorkBook,
    saveWorkBookToExcel
} from "../../../helpers/helper";
import StatusesOverlay from "../../infoStudent/overlays/StatusesOverlay";


@observer
class DashboardAcademyComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardAcademyStore();
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
                Header: <Sort title="Buổi học"/>,
                accessor: 'teaching_progress',
                Cell: props => {
                    const value = props.original.teaching_progress;
                    let percent = value.total_lesson ? value.passed_lesson * 100 / value.total_lesson : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.passed_lesson + "/" + value.total_lesson}</h6>
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
                Header: <Sort title="Học viên"/>,
                accessor: 'target.current_target',
                Cell: props => {
                    const value = props.original.target;
                    let percent = value.target ? value.current_target * 100 / value.target : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.current_target + "/" + value.target}</h6>
                            <div className="progress progress-bar-table"
                                 style={{width: '100%!important'}}>
                                <div className="progress-bar" role="progressbar" aria-valuenow="60"
                                     aria-valuemin="0"
                                     aria-valuemax="100"
                                     style={{width: (percent) + '%'}}>
                                </div>
                            </div>
                        </div>

                    );
                }
            },
            {
                Header: <Sort title="Số bài kiểm tra"/>,
                accessor: 'exam_progress',
                Cell: props => {
                    const value = props.original.exam_progress;
                    let percent = value.total_exam ? value.passed_exam * 100 / value.total_exam : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.passed_exam + "/" + value.total_exam}</h6>
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
                Header: <Sort title="Số nhận xét"/>,
                accessor: 'lesson_event_comment_progress',
                Cell: props => {
                    const value = props.original.lesson_event_comment_progress;
                    let percent = value.total_event ? value.passed_event * 100 / value.total_event : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.passed_event + "/" + value.total_event}</h6>
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
                Header: <Sort title="Buổi dạy thay"/>,
                accessor: 'teaching_replace_count',
                Cell: props => {
                    const value = props.original.teaching_replace_count;
                    let percent = value.total_lesson ? value.replace_count * 100 / value.total_lesson : 0;
                    percent = percent >= 100 ? 100 : percent;
                    return (
                        <div style={{width: '100%'}}>
                            <h6>{value.replace_count + "/" + value.total_lesson}</h6>
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
                Header: <Sort title="Giảng viên"/>,
                accessor: 'teacher',
                minWidth: 120,
                Cell: props => {
                    let teacher = props.value;
                    return (  <div className="width-100">
                        {
                            teacher ?
                                (
                                    <button className="btn btn-xs btn-main"
                                            style={{backgroundColor: '#' + teacher.color}}
                                    >{getShortName(teacher.name)}</button>
                                )
                                :
                                (
                                    <div className="no-data text-center">
                                        Không có
                                    </div>
                                )

                        }

                    </div>);
                }
            },
            {
                Header: <Sort title="Trợ giảng"/>,
                accessor: 'teacher_assistant',
                minWidth: 120,
                Cell: props => {
                    let teacher = props.value;
                    return (  <div className="width-100">
                        {
                            teacher ?
                                (
                                    <button className="btn btn-xs btn-main"
                                            style={{backgroundColor: '#' + teacher.color}}
                                    >{getShortName(teacher.name)}</button>
                                )
                                :
                                (
                                    <div className="no-data text-center">
                                        Không có
                                    </div>
                                )

                        }

                    </div>);
                }
            },
            {
                Header: <Sort title="T.Thái"/>,
                accessor: 'id',
                // className:'min-width-120-px',
                // headerClassName:'min-width-120-px',
                // resizable:false,
                minWidth: 130,

                style:{
                    overflow:'visible'
                },
                Cell: props => (<StatusesOverlay
                    data={props.original.class_status}
                    refId={props.original.id}
                    statusRef={STATUS_REFS["classes"]}
                    className="btn status-overlay btn-xs width-100"
                    styleOverlay={{
                        marginLeft:-220,marginTop: 25
                    }}
                />)
            },

        ];
    }

    componentDidMount() {
        filterStore.loadData();
        this.loadClasses();
    }

    loadData = (filter) => {
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

    downloadData = ()=>{
        let classes = removeObservable(this.store.classes);
        let json = classes.map((item, index) => {
            if (item) {
                /* eslint-disable */
                let res = {
                    'STT': index + 1,
                    'Tên lớp': item.name,
                    'Môn học': isEmptyInput(item.course) ?  "Không có" : item.course.name,
                    'Cơ sở': isEmptyInput(item.base) ?  "Không có" : item.base.name,
                    'Enrolled': `${item.target.current_target}/${item.target.target}`,
                    'Đăng kí': `${item.register_target.current_target}/${item.register_target.target}`,
                    'Lịch học': item.schedule ? item.schedule.name : "Không có",
                    'Khai giảng': item.datestart,
                    'Trạng thái': item.value === 1 ? 'Bật': 'Tắt',

                };
                /* eslint-enable */
                return res;
            }
        });
        let wb = newWorkBook();
        appendJsonToWorkBook(json, wb, 'Danh sách lớp học', [], []);
        saveWorkBookToExcel(wb, 'Danh sách lớp học');
    }

    render() {
        const {isLoading, classes, currentTab} = this.store;
        return (
            <div>
                <Filter loadData={this.loadData}/>
                <CardAcademy/>
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
                            <li style={{float:'right'}} onClick={this.downloadData}>
                                <TooltipButton text="Tải xuống" placement="top">
                                    <div style={{"display":"flex","alignItems":"center","alignContent":"center","justifyContent":"center","height":"44px", cursor:'pointer'}}>
                                        <i className="material-icons" style={{padding: 0}}>
                                            cloud_download
                                        </i>
                                    </div>
                                </TooltipButton>
                            </li>
                        </ul>
                    </div>
                </div>
                {(isLoading || filterStore.isLoading) && <Loading/>}
                {!(isLoading || filterStore.isLoading) &&
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


export default DashboardAcademyComponent;
