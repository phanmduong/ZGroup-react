/**
 * Created by phanmduong on 12/8/17.
 */
import React from 'react';
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import StatisticTeacher from "./StatisticTeacher";
import StatisticSalesMarketing from "./StatisticSalesMarketing";
import _ from "lodash";
import PropTypes from 'prop-types';

class StatisticAttendanceStaffs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        };
    }

    componentWillMount() {
        this.props.loadStatistic();
    }

    convertDataSalesMarketing() {
        let salesMarketings = helper.groupBy(this.props.salesMarketings, item => item.user.id, ['staff_id', "attendances"]);
        this.salesMarketings = this.convertData(salesMarketings);
    }

    convertDataTeachers() {
        let teachers = [];
        let teaching_assistants = [];
        this.props.teachers.map(function (item) {
            if (item.teacher) {
                item.type = "Giảng viên";
                item.user = item.teacher;
                item.check_in = item.teacher_check_in;
                item.check_out = item.teacher_check_out;
                teachers.push(item);
            }

            if (item.teaching_assistant) {
                item.user = item.teaching_assistant;
                item.type = "Trợ giảng";
                item.check_in = item.ta_check_in;
                item.check_out = item.ta_check_out;
                teaching_assistants.push(item);
            }
        });
        teachers = helper.groupBy(teachers, item => item.teacher.id, ['staff_id', "attendances"]);
        teaching_assistants = helper.groupBy(teaching_assistants, item => item.teaching_assistant.id, ['staff_id', "attendances"]);
        teaching_assistants.map(function (item) {
            let data = teachers.filter(teacher => teacher.staff_id === item.staff_id);
            if (data.length > 0) {
                data[0].attendances = [...data[0].attendances, ...item.attendances];
            } else {
                teachers.push(item);
            }
        });
        teachers = _.sortBy(teachers, (item) => Number(item.staff_id));
        this.teachers = this.convertData(teachers);
    }

    convertData(data) {
        return data.map((item) => {
            let total_attendance = 0;
            let total_delinquent = 0;
            let total_lawful = 0;
            item.attendances = item.attendances.map((attendance) => {
                let message = null;
                let isDelinquent = false;
                if (attendance.check_in) {
                    let rangeTimeCheckIn = helper.convertTimeToSecond(attendance.check_in.created_at.substr(0, 5)) -
                        helper.convertTimeToSecond(attendance.start_time);
                    if (rangeTimeCheckIn > 60) {
                        message = 'check in muộn ' + (rangeTimeCheckIn / 60) + ' phút';
                        isDelinquent = true;
                    }
                } else {
                    message = "không check in";
                    isDelinquent = true;
                }

                if (attendance.check_out) {
                    let rangeTimeCheckOut = helper.convertTimeToSecond(attendance.start_time) -
                        helper.convertTimeToSecond(attendance.check_out.created_at.substr(0, 5));
                    if (rangeTimeCheckOut > 60) {
                        message = message ? message + ", " : "";
                        message += 'check out sớm ' + (rangeTimeCheckOut / 60) + ' phút';
                        isDelinquent = true;
                    }
                } else {
                    message = message ? message + ", " : "";
                    message += "không check out";
                    isDelinquent = true;
                }

                if (isDelinquent) {
                    total_delinquent++;
                } else {
                    total_lawful++;
                }

                if (attendance.check_in || attendance.check_out) {
                    total_attendance++;
                }
                attendance.message = message;
                return attendance;
            });
            item.total_attendance = total_attendance;
            item.total_lawful = total_lawful;
            item.total_delinquent = total_delinquent;
            return item;
        });
    }

    render() {
        if (this.props.isLoading) {
            return (<Loading/>);
        } else {
            this.convertDataSalesMarketing();
            this.convertDataTeachers();
            return (
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header card-header-tabs" data-background-color="rose">
                                    <div className="nav-tabs-navigation">
                                        <div className="nav-tabs-wrapper">
                                            <ul className="nav nav-tabs" data-tabs="tabs">
                                                <li className={this.state.tab === 1 ? "active" : ""}>
                                                    <a onClick={() => this.setState({tab: 1})}>
                                                        Giảng viên
                                                        <div className="ripple-container"/>
                                                    </a>
                                                </li>
                                                <li className={this.state.tab === 2 ? "active" : ""}>
                                                    <a onClick={() => this.setState({tab: 2})}>
                                                        Sales & Marketing
                                                        <div className="ripple-container"/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <div className="tab-content">
                                        <div className="row">
                                            {
                                                this.state.tab === 1 &&
                                                <StatisticTeacher
                                                    teachers={this.teachers}
                                                />
                                            }
                                            {
                                                this.state.tab === 2 &&
                                                <StatisticSalesMarketing
                                                    salesMarketings={this.salesMarketings}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

StatisticAttendanceStaffs.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    teachers: PropTypes.array.isRequired,
    salesMarketings: PropTypes.array.isRequired,
    loadStatistic: PropTypes.func.isRequired,
};

export default (StatisticAttendanceStaffs);
