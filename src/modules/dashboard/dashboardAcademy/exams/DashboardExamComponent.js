import React from 'react';
import {observer} from 'mobx-react';
import FilterExam from "./FilterExam";
import filterExamStore from "./filterExamStore";
import CardAcademy from "../CardAcademy";
import Loading from "../../../../components/common/Loading";
import DashboardExamStore from "./DashboardExamStore";
import {NO_AVATAR} from "../../../../constants/env";
import EmptyData from "../../../../components/common/EmptyData";
import {openModalRegisterDetail} from "../../../globalModal/globalModalActions";
import MNABarChart from "./MNABarChart";
import {
    appendJsonToWorkBook,
    avatarEmpty,
    meanOfArray,
    medianOfArray,
    modeOfArray,
    newWorkBook,
    saveWorkBookToExcel
} from "../../../../helpers/helper";
import TooltipButton from "../../../../components/common/TooltipButton";
import {removeObservable} from "../../../../helpers/entity/mobx";

const labels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'];


@observer
class DashboardExamComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardExamStore();
    }

    componentDidMount() {
        filterExamStore.loadData();
    }

    loadData = (filter) => {
        this.store.loadAnalytic(filter);
    }
    getScore = (analytic, template) => {
        const analyticTemplate = analytic.filter((item) => template.exam_template_id == item.exam_template_id);

        let scores = [];


        analyticTemplate.forEach((item) => {
            item.user_exams.forEach((user_exam) => {
                scores = [...scores, {...user_exam, 'class': item.class}];
            });
        });

        return scores.sort((a, b) => b.score - a.score);

    }
    getGroupScore = (analytic, group) => {
        const analyticTemplate = analytic.filter((item) => item.group_exam_id == group.id);
        let scores = [];
        analyticTemplate.forEach((item) => {
            item.user_exams.forEach((user_exam) => {
                if (user_exam.score !== null) scores = [...scores, {...user_exam, 'class': item.class}];
            });
        });
        return scores.sort((a, b) => b.score - a.score);
    }
    getGroupStudent = (analytic, group) => {
        const analyticTemplate = analytic.filter((item) => item.group_exam_id == group.id);
        let students = [];
        let student_ids = [];
        analyticTemplate.forEach((item) => {
            item.user_exams.forEach((user_exam) => {
                if (student_ids.indexOf(user_exam.user_id) < 0) {
                    students = [...students, {...user_exam.user, 'class': item.class}];
                    student_ids.push(user_exam.user_id);
                }
            });
        });
        return students;

    }
    getGroupExamAnalyticsMna = (scores, templates) => {
        let class_ids = [];
        let classes = [];
        scores.forEach((o) => {
            if (class_ids.indexOf(o.class.id) < 0) {
                classes.push(o.class);
                class_ids.push(o.class.id);
            }
        });
        let labels = classes.map(c => c.name);
        let data = templates.map(t => {
            return {
                id: t.id,
                name: t.title,
                data: []
            };
        });
        classes.forEach(c => {
            data.forEach(t => {
                let min = 10, max = -1, sum = 0, count = 0;
                scores.forEach(score => {
                    if (score.class.id == c.id && score.exam_id == t.id) {
                        if (score.score || score.score == 0) {
                            sum += score.score;
                            count++;
                            min = Math.min(score.score, min);
                            max = Math.max(score.score, max);
                        }
                    }
                });
                let avg = sum / count;
                if (min == 10 || max == -1) {
                    min = -1, max = -1, sum = 0, count = 0;
                }
                t.data.push({
                    meta: `${t.name}: ${min}-${max}`,
                    exam_id: t.id,
                    value: max,
                    range: max - min,
                    max,
                    min,
                    avg
                });
            });

        });

        return {
            labels,
            data
        };
    }
    getClassesStatistic = (analytic_exam, group) => {
        let class_ids = [];
        let classes = [];
        let scores = this.getGroupScore(analytic_exam, group);
        scores.forEach((o) => {
            if (class_ids.indexOf(o.class.id) < 0) {
                classes.push(o.class);
                class_ids.push(o.class.id);
            }
        });

        classes = classes.map(c => {
            let values = [], exam_ids = [];
            let min = 10, max = 0;
            scores.forEach(score => {
                if (score.class.id == c.id) {
                    if (score.score || score.score == 0) {
                        values.push(score.score);
                        min = Math.min(score.score, min);
                        max = Math.max(score.score, max);
                        if (exam_ids.indexOf(score.exam_id) < 0) {
                            exam_ids.push(score.exam_id);
                        }
                    }
                }
            });
            let modes = modeOfArray(values);
            // console.log('modes',modes,values)
            let mode = `${modes.frequency} lần: (${modes.modes.join(', ')})`;
            // let mode = 'test';
            return {
                ...c, min, max,
                exam_count: exam_ids.length,
                mean: meanOfArray(values),
                median: medianOfArray(values),
                mode,
            };

        });

        return classes;
    }

    getAnalytics = (scores) => {

        let class_ids = [];
        let classes = [];
        scores.forEach((o) => {
            if (class_ids.indexOf(o.class.id) < 0) {
                classes.push(o.class);
                class_ids.push(o.class.id);
            }
        });

        let res = classes.map(c => {
            let data = labels.map((item, index) => {
                return scores.filter(score => {

                    if (index == 0) {
                        return score.score >= index && score.score <= index + 1 && score.class.id == c.id;
                    } else {
                        return score.score > index && score.score <= index + 1 && score.class.id == c.id;
                    }
                }).length;

            });
            return {
                label: c.name,
                name: c.name,
                color: '#c50000',
                data
            };
        });

        return res;
    };

    getGroupExams = () => {
        let groupExamIds = [], groupExams = [];
        let {analytic_exam} = this.store;
        analytic_exam.forEach(itm => {
            if (groupExamIds.indexOf(itm.group_exam_id) == -1) {
                groupExamIds.push(itm.group_exam_id);
                groupExams.push(itm.group_exam);
            }
        });
        return [...groupExams, {id: null, name: 'Không có nhóm'}];
    }

    downloadData = () => {
        let wb = newWorkBook();
        let analytic_exam = removeObservable(this.store.analytic_exam);
        let course = filterExamStore.coursesData.filter(c => c.id == filterExamStore.filter.course_id)[0];
        console.log('analytic_exam', analytic_exam)
        let classes = [];
        analytic_exam.forEach(ae => {
            let cindex = classes.findIndex(c => c.id == ae.class.id);
            if (cindex < 0) {
                classes.push({
                    ...ae.class,
                    students: []
                });
                cindex = classes.length - 1;
            }
            ae.user_exams.forEach(ue => {
                let index = classes[cindex].students.findIndex(s => s.id == ue.user.id);
                if (index < 0) {
                    classes[cindex].students.push({
                        ...ue.user,
                        scores: {}
                    });
                    index = classes[cindex].students.length - 1;
                }
                classes[cindex].students[index].scores[`${ae.group_exam.name} - ${ae.title}`] = ue.score;
            });
        });
        classes.forEach(c => {
            // c.students.forEach(s => {
            //     let ordered = {};
            //     Object.keys(s.scores).sort().forEach(function (key) {
            //         ordered[key] = s.scores[key];
            //     });
            //     s.scores = ordered;
            // });
            let json = c.students.map((item, index) => {
                if (item) {
                    /* eslint-disable */
                    let res = {
                        'STT': index + 1,
                        'Họ tên': item.name,
                        ...item.scores
                    };

                    /* eslint-enable */
                    return res;
                }
            });
            appendJsonToWorkBook(json, wb, `Bảng điểm lớp ${c.name}`, [], []);

        });


        saveWorkBookToExcel(wb, `Bảng điểm môn ${course.name}`);
    }

    render() {
        let {course_id, class_id} = filterExamStore.filter;
        let {isLoading, analytic_exam} = this.store;
        let groupExams = this.getGroupExams();
        const emptyTitle = (course_id || class_id) ? "Không có dữ liệu" : "Chọn môn học hoặc lớp để xem thống kê bài kiểm tra";

        return (
            <div>
                <FilterExam loadData={this.loadData}/>
                <CardAcademy/>
                {analytic_exam.length > 0 &&
                <ul className="nav nav-pills nav-pills-dark margin-top-10" data-tabs="tabs">
                    <li style={{float: 'right'}} onClick={this.downloadData}>
                        <TooltipButton text="Tải xuống" placement="top">
                            <div
                                className="flex flex-align-items-center flex-align-items-center flex-justify-content-center cursor-pointer"
                                style={{"height": "44px"}}>
                                <i className="material-icons" style={{padding: 0}}>
                                    cloud_download
                                </i>
                            </div>
                        </TooltipButton>
                    </li>
                </ul>}
                <div className="row gutter-20 margin-top-20">
                    <div className="col-md-12">
                        {(isLoading || filterExamStore.isLoading) && <Loading/>}
                        {!(isLoading || filterExamStore.isLoading) && analytic_exam.length == 0 &&
                        <EmptyData title={emptyTitle}/>}
                        {!(isLoading || filterExamStore.isLoading) && groupExams.map((group, key_group) => {
                            let templates = analytic_exam.filter((template) => template.group_exam_id == group.id);
                            let groupScores = this.getGroupScore(analytic_exam, group);
                            let groupStudents = this.getGroupStudent(analytic_exam, group);
                            let classesStatistic = this.getClassesStatistic(analytic_exam, group);
                            let analyticsMna = this.getGroupExamAnalyticsMna(groupScores, templates);
                            console.log(group.id, 'analyticsMna', analyticsMna);
                            if (templates.length && groupScores.length) return (
                                <div className="card" key={key_group}>
                                    <div className="card-content">
                                        <div className="flex flex-row flex-align-items-center" style={{
                                            fontSize: 30,
                                            marginBottom: 40,
                                            marginTop: 30,
                                            fontWeight: 'bold',
                                        }}>{group.name}</div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h6 className="margin-bottom-20">
                                                    <strong>Bảng điểm chi tiết
                                                        ({groupStudents.length})</strong>
                                                </h6>
                                                <div style={{width: '97%'}}>
                                                    <div style={{height: 500, overflowY: 'scroll'}}
                                                         className="smooth-scroll-y tableFixHead">
                                                        <table
                                                            className="table table-responsive white-table table-striped table-no-bordered table-hover"
                                                            cellSpacing="0" width="100%"
                                                            style={{width: "100%"}}>
                                                            <thead>
                                                            <tr>
                                                                <th/>
                                                                <th>Học viên</th>
                                                                <th>Lớp</th>
                                                                {templates.map((t, key_th) => {
                                                                    return (<th key={key_th}>{t.title}</th>);
                                                                })}
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {groupStudents.map((item, index) => {
                                                                let avatar = avatarEmpty(item.avatar_url) ?
                                                                    NO_AVATAR : item.avatar_url;
                                                                return (
                                                                    <tr key={`${item.id}-${index}`}>
                                                                        <td>
                                                                            <div style={{
                                                                                background: "url('" + avatar + "') center center / cover",
                                                                                display: 'inline-block',
                                                                                width: '30px',
                                                                                height: '30px',
                                                                                borderRadius: '50%',
                                                                                verticalAlign: 'middle'
                                                                            }}
                                                                            />
                                                                        </td>
                                                                        <td onClick={() => openModalRegisterDetail(`/sales/info-student/${item.id}`)}>
                                                                            <strong>{item.name}</strong>
                                                                        </td>
                                                                        <td><a style={{color: 'black'}}
                                                                               href={`/teaching/class/${item.class.id}`}
                                                                               target="_blank"><strong>{item.class.name}</strong></a>
                                                                        </td>
                                                                        {templates.map(t => {
                                                                            let userExam = groupScores.filter(gs => gs.class.id == item.class.id && t.id == gs.exam_id && gs.user_id == item.id)[0];
                                                                            return (
                                                                                <td>{userExam ? userExam.score : '-'}</td>);
                                                                        })}
                                                                    </tr>
                                                                );
                                                            })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="margin-top-30">
                                            <div className="col-md-12">
                                                <div>Phân tích phổ điểm</div>
                                                <MNABarChart
                                                    label={analyticsMna.labels}
                                                    data={analyticsMna.data}
                                                    id={`barchart-mna-analytics-exam-${group.id}`}
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                {/*<div>Danh sách học viên({scores.length})</div>*/}
                                                <div style={{width: '97%'}}>
                                                    <div style={{height: 500, overflowY: 'scroll'}}
                                                         className="smooth-scroll-y">
                                                        <table
                                                            id={`data-tables-mna`}
                                                            className="table table-responsive white-table table-striped table-no-bordered table-hover"
                                                            cellSpacing="0" width="100%"
                                                            style={{width: "100%"}}>
                                                            <thead>
                                                            <tr>
                                                                <th>Lớp</th>
                                                                <th>Số bài kiểm tra</th>
                                                                <th>Min</th>
                                                                <th>Max</th>
                                                                <th>Mean</th>
                                                                <th>Mode</th>
                                                                <th>Median</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {classesStatistic.map((item, key_tr) => {
                                                                return (
                                                                    <tr key={`${item.id}-${key_tr}`}>
                                                                        <td><a style={{color: 'black'}}
                                                                               href={`/teaching/class/${item.id}`}
                                                                               target="_blank"><strong>{item.name}</strong></a>
                                                                        </td>
                                                                        <td>{item.exam_count}</td>
                                                                        <td>{item.min}</td>
                                                                        <td>{item.max}</td>
                                                                        <td>{item.mean}</td>
                                                                        <td>{item.mode}</td>
                                                                        <td>{item.median}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*{templates.map((template, key_temp) => {*/}
                                            {/*    const scores = this.getScore(analytic_exam, template);*/}
                                            {/*    const analyticsMna = this.getGroupExamAnalyticsMna(scores);*/}
                                            {/*    // console.log('temp :' + template.id, scores);*/}
                                            {/*    return (*/}
                                            {/*        <div key={key_temp}>*/}
                                            {/*            <div className="margin-bottom-20"><h6>*/}
                                            {/*                <strong>Tổng quan {template.title}</strong>*/}
                                            {/*            </h6></div>*/}
                                            {/*            <div className="row">*/}
                                            {/*                <div className="col-md-6">*/}
                                            {/*                    /!*<div>Phân tích phổ điểm</div>*!/*/}
                                            {/*                    <MNABarChart*/}
                                            {/*                        label={analyticsMna.labels}*/}
                                            {/*                        data={analyticsMna.data}*/}
                                            {/*                        id={`barchart-mna-analytics-exam-${key_group}-${key_temp}-${template.group_exam_id}-${template.exam_template_id}`}*/}
                                            {/*                    />*/}
                                            {/*                </div>*/}
                                            {/*                <div className="col-md-6">*/}
                                            {/*                    /!*<div>Danh sách học viên({scores.length})</div>*!/*/}
                                            {/*                    <div style={{width: '97%'}}>*/}
                                            {/*                        <div style={{height: 500, overflowY: 'scroll'}}*/}
                                            {/*                             className="smooth-scroll-y">*/}
                                            {/*                            <table*/}
                                            {/*                                id={`data-tables-${key_group}-${key_temp}`}*/}
                                            {/*                                className="table table-responsive white-table table-striped table-no-bordered table-hover"*/}
                                            {/*                                cellSpacing="0" width="100%"*/}
                                            {/*                                style={{width: "100%"}}>*/}
                                            {/*                                <thead>*/}
                                            {/*                                <tr>*/}
                                            {/*                                    <th>Lớp</th>*/}
                                            {/*                                    <th>Số bài kiểm tra</th>*/}
                                            {/*                                    <th>Min</th>*/}
                                            {/*                                    <th>Max</th>*/}
                                            {/*                                    <th>Mean</th>*/}
                                            {/*                                    <th>Mode</th>*/}
                                            {/*                                    <th>Median</th>*/}
                                            {/*                                </tr>*/}
                                            {/*                                </thead>*/}
                                            {/*                                <tbody>*/}
                                            {/*                                {classesStatistic.map((item, key_tr) => {*/}
                                            {/*                                    return (*/}
                                            {/*                                        <tr key={`${item.id}-${key_tr}`}>*/}
                                            {/*                                            <td><a style={{color: 'black'}}*/}
                                            {/*                                                   href={`/teaching/class/${item.id}`}*/}
                                            {/*                                                   target="_blank"><strong>{item.name}</strong></a>*/}
                                            {/*                                            </td>*/}
                                            {/*                                            <td>{item.exam_count}</td>*/}
                                            {/*                                            <td>{item.min}</td>*/}
                                            {/*                                            <td>{item.max}</td>*/}
                                            {/*                                            <td>{item.mean}</td>*/}
                                            {/*                                            <td>{item.mode}</td>*/}
                                            {/*                                            <td>{item.median}</td>*/}
                                            {/*                                        </tr>*/}
                                            {/*                                    );*/}
                                            {/*                                })}*/}
                                            {/*                                </tbody>*/}
                                            {/*                            </table>*/}
                                            {/*                        </div>*/}
                                            {/*                    </div>*/}
                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*    );*/}
                                            {/*})}*/}
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardExamComponent;
