import React from 'react';
import {observer} from 'mobx-react';
import FilterExam from "./FilterClassLessonEvent";
import filterClassLessonEventStore from "./filterClassLessonEventStore";
import Loading from "../../../../components/common/Loading";
import DashboardClassLessonEventStore from "./DashboardClassLessonEventStore";
import EmptyData from "../../../../components/common/EmptyData";
import Sort from "../../../../components/common/ReactTable/Sort";
import {LESSON_EVENT_TYPES_OBJECT} from "../../../../constants/constants";
import ReactTable from "react-table-v6";

@observer
class DashboardClassLessonEventComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardClassLessonEventStore();
        this.columns = [
            {
                Header: <Sort title="Thứ tự"/>,
                accessor: 'order',
                Cell: props => (<div style={{}}>{props.value}</div>),
                minWidth: 65,
                maxWidth: 65
            },
            {
                Header: <Sort title="Tên buổi"/>,
                accessor: 'name',
                Cell: props => (<div style={{}}>{props.value}</div>)
            },
            {
                Header: <Sort title="Loại hoạt động"/>,
                accessor: 'event_type',
                Cell: props => (<div style={{}}>{LESSON_EVENT_TYPES_OBJECT[props.value].name}</div>)
            },
            {
                Header: <Sort title="Tỷ lệ thực hiện"/>,
                accessor: 'total',
                Cell: props => {
                    let data = props.original;
                    let backgroundColor = LESSON_EVENT_TYPES_OBJECT[data.event_type].progress_bar_color;
                    return (<div style={{
                        "display": "flex",
                        "alignItems": "center",
                        "justifyContent": "space-between",
                        "width": "100%"
                    }}>
                        <div className="progress" style={{
                            "width": "90%",
                            "marginBottom": "0px",
                            "marginRight": "11px",
                            backgroundColor: backgroundColor + '1A'
                        }}>
                            <div className="progress-bar"
                                 role="progressbar"
                                 aria-valuemin="0" aria-valuemax="100"
                                 style={{width: (data.total_done * 100 / data.total) + "%", backgroundColor}}>
                            </div>

                        </div>
                        <div>{`${data.total_done}/${data.total}`}</div>
                    </div>);
                }
            },
        ];
    }

    componentDidMount() {
        filterClassLessonEventStore.loadData();
        // this.store.loadAnalytic({
        //     // class_id:3647,
        //     course_id: 19,
        // });
    }

    loadData = (filter) => {
        this.store.loadAnalytic(filter);
    }

    getClassTableData = (studyClass) => {
        let res = [];
        studyClass.class_lesson.forEach(class_lesson => {
            if (class_lesson.lesson.lesson_event) {
                class_lesson.lesson.lesson_event.forEach(lesson_event => {
                    let total_done = class_lesson.class_lesson_event.filter(cle =>
                        cle.lesson_event_id == lesson_event.id
                    ).length;
                    let total = studyClass.target.target;
                    res.push({
                        order: class_lesson.lesson.order,
                        name: class_lesson.lesson.name,
                        event_type: lesson_event.event_type,
                        lesson_id: lesson_event.lesson_id,
                        total_done, total,

                    });
                });

            }
        });
        return res;
    }

    render() {
        let {course_id, class_id} = filterClassLessonEventStore.filter;
        let {isLoading, classes} = this.store;
        const emptyTitle = (course_id || class_id) ? "Không có dữ liệu" : "Chọn môn học hoặc lớp để xem thống kê";
        // console.log(classes);
        return (
            <div>
                <FilterExam loadData={this.loadData}/>
                <div className="row gutter-20 margin-top-20">
                    <div className="col-md-12">
                        {(isLoading || filterClassLessonEventStore.isLoading) && <Loading/>}
                        {!(isLoading || filterClassLessonEventStore.isLoading) && classes.length == 0 &&
                        <EmptyData title={emptyTitle}/>}
                    </div>
                    {!(isLoading || filterClassLessonEventStore.isLoading) &&
                    classes.map((studyClass, key_class) => {
                        let tableData = this.getClassTableData(studyClass);
                        // console.log('tableData', tableData)
                        if(tableData.length)
                            return (
                            <div className="col-md-12" key={key_class}>
                                <div className="card">
                                    <div className="card-content">
                                        <h4 className="card-title">
                                            <strong>Lớp {studyClass.name}</strong>
                                        </h4>
                                            <ReactTable
                                                data={tableData}
                                                columns={this.columns}
                                                previousText={'Trước'}
                                                nextText={'Tiếp'}
                                                noDataText={'Không có dữ liệu'}
                                                pageText={"Trang"}
                                                rowsText={"dòng"}
                                                // showPagination={false}
                                                // defaultPageSize={tableData.length}
                                                showPagination={true}
                                                defaultPageSize={10}
                                                defaultSorted={[
                                                    {
                                                        id: "order",
                                                        desc: false
                                                    }
                                                ]}
                                            />

                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
}

export default DashboardClassLessonEventComponent;
