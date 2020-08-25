import React from 'react';
import {observer} from 'mobx-react';
import FilterExam from "./FilterClassLessonEvent";
import filterClassLessonEventStore from "./filterClassLessonEventStore";
import Loading from "../../../../components/common/Loading";
import DashboardClassLessonEventStore from "./DashboardClassLessonEventStore";
import EmptyData from "../../../../components/common/EmptyData";
import Sort from "../../../../components/common/ReactTable/Sort";
import {DATE_FORMAT_SQL, LESSON_EVENT_TYPES_ARRAY, LESSON_EVENT_TYPES_OBJECT} from "../../../../constants/constants";
import ReactTable from "react-table-v6";
import MNABarChart from "./MNABarChart";
import {generateMonthsArray, meanOfArray, medianOfArray, modeOfArray} from "../../../../helpers/helper";
import moment from 'moment';

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
                                 style={{width: (data.total_done * 100 / data.total) + "%", backgroundColor}} />

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

    getClassAnalyticsMnaEvents = (studyClass) => {
        let months = generateMonthsArray(studyClass.class_lesson.filter(cl => cl.time).map(cl => cl.time), DATE_FORMAT_SQL);
        let max_student = 0,  mna_data = {};
        let labels = months;
        let data = LESSON_EVENT_TYPES_ARRAY.map(m => {
            return {
                id: m,
                name: LESSON_EVENT_TYPES_OBJECT[m].name,
                data: []
            };
        });

        months.forEach((month) => {
            data.forEach(t => {

                let min = 9999, max = -1, student_event_count = {}, type = t.id;
                studyClass.class_lesson.forEach(cl => {
                    if (month == moment(cl.time, DATE_FORMAT_SQL).format('MM/YYYY')) {
                        cl.class_lesson_event.forEach(cle => {
                            if (cle.lesson_event && cle.lesson_event.event_type == type) {
                                cle.student_class_lesson_event.forEach(scle => {
                                    if (!student_event_count[scle.student_id]) {
                                        student_event_count[scle.student_id] = 0;
                                    }
                                    if (scle.status == 'done') {
                                        student_event_count[scle.student_id]++;
                                    }
                                });

                            }
                        });
                    }
                });
                Object.entries(student_event_count).forEach(entry => {
                    let val = student_event_count[entry[0]];
                    min = Math.min(min, val);
                    max = Math.max(max, val);
                });
                if (Object.entries(student_event_count).length == 0) {
                    min = 0;
                    max = 0;
                }
                max_student = Math.max(Object.entries(student_event_count).length, max_student);
                t.data.push({meta: `${t.name}: ${min}-${max}`, value: max, range: max - min, max, min});
            });

        });
        LESSON_EVENT_TYPES_ARRAY.map(type => {
            let student_event_count = {}, event_count = 0;
            studyClass.class_lesson.forEach(cl => {
                cl.class_lesson_event.forEach(cle => {
                    if (cle.lesson_event && cle.lesson_event.event_type == type) {
                        event_count++;
                        cle.student_class_lesson_event.forEach(scle => {
                            if (!student_event_count[scle.student_id]) {
                                student_event_count[scle.student_id] = 0;
                            }
                            if (scle.status == 'done') {
                                student_event_count[scle.student_id]++;
                            }
                        });

                    }
                });
            });
            let counts = [], min = 9999, max = -1;
            Object.entries(student_event_count).forEach(entry => {
                let val = student_event_count[entry[0]];
                counts.push(val);
                min = Math.min(min, val);
                max = Math.max(max, val);
            });
            if (Object.entries(student_event_count).length == 0) {
                min = 0;
                max = 0;
            }
            let modes = modeOfArray(counts);
            let mode = `${modes.frequency} lần: (${modes.modes.join(', ')})`;

            mna_data[type] ={
                min, max,
                count: event_count,
                mean: meanOfArray(counts),
                median: medianOfArray(counts),
                mode,
            };
        });

        return {
            labels,
            data,
            max_student,
            mna_data,
        };
    }

    getClassTableData = (studyClass) => {
        let res = [];
        studyClass.class_lesson.forEach(class_lesson => {
            if (class_lesson.lesson && class_lesson.lesson.lesson_event) {
                class_lesson.lesson.lesson_event.forEach(lesson_event => {
                    let total_done = 0;
                    let class_lesson_events = class_lesson.class_lesson_event.filter(cle =>
                        cle.lesson_event_id == lesson_event.id
                    );
                    class_lesson_events.forEach(class_lesson_event => {
                        if (class_lesson_event.student_class_lesson_event)
                            total_done += class_lesson_event.student_class_lesson_event.filter(scle =>
                                scle.status == 'done'
                            ).length;
                    });
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
        console.log(classes);
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
                        let analyticsMna = this.getClassAnalyticsMnaEvents(studyClass);
                        // console.log('tableData', tableData)
                        if (tableData.length)
                            return (
                                <div className="col-md-12" key={key_class}>
                                    <div className="card">
                                        <div className="card-content">
                                            <h4 className="card-title">
                                                <strong>Lớp {studyClass.name}</strong>
                                            </h4>

                                            <MNABarChart
                                                label={analyticsMna.labels}
                                                data={analyticsMna.data}
                                                high={analyticsMna.max_student}
                                                id={`barchart-mna-nalytics-event-${key_class}`}
                                            />
                                            <div><strong>Tổng quan họat động</strong></div>
                                            <div className="table-responsive">
                                                <table
                                                    className="table white-table table-striped table-no-bordered table-hover">
                                                    <thead className="text-rose">
                                                    <tr>

                                                        <th>Hoạt động</th>
                                                        <th>Số hoạt động</th>
                                                        <th>Min</th>
                                                        <th>Max</th>
                                                        <th>Mean</th>
                                                        <th>Mode</th>
                                                        <th>Median</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {LESSON_EVENT_TYPES_ARRAY.map(key => {
                                                        let item = analyticsMna.mna_data[key];
                                                        return (
                                                            <tr>
                                                                <td key={key}>
                                                                    {LESSON_EVENT_TYPES_OBJECT[key].name}
                                                                </td>
                                                                <td>{item.count}</td>
                                                                <td>{item.min}</td>
                                                                <td>{item.max}</td>
                                                                <td>{item.mean}</td>
                                                                <td>{item.mode}</td>
                                                                <td>{item.median}</td>
                                                            </tr>
                                                        );
                                                    })}

                                                    <td />

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div><strong>Chi tiết họat động</strong></div>
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
