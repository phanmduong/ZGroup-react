/**
 * Created by Kiyoshitaro on 04/05/18.
 */

import React, {Component} from "react";
import {observer} from "mobx-react";
import {connect} from "react-redux";
import Loading from "../../components/common/Loading";
import Calendar from "../../components/common/Calendar";
import store from "./ScheduleTeachingStore";
import PropTypes from 'prop-types';
import ClassContainer from "./ClassContainer";
import Select from "./Select";
import ReactSelect from "react-select";
import DateRangePicker from "../../components/common/DateTimePicker";
import ItemReactSelect from "../../components/common/ItemReactSelect";


@observer
class ScheduleClassContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        store.loadGens();
        // store.loadClasses();
        store.loadBases();
    }

    onChangeFilter = (field, value) => {
        console.log(field, value)
        if (store.isLoading) return;
        store.filter[field] = value;
        store.loadClasses();
    }


    changeDateRangePicker = (start_time, end_time) => {
        if (store.isLoading) return;
        store.start_time = start_time;
        store.end_time = end_time;
        store.filter = {...store.filter, start_time, end_time, gen_id: 0};
    };

    onChangeProvince = (o) => {
        console.log(o);
    }

    render() {
        let {filter} = store;
        let classes = [];
        store.classes && store.classes.map(_class => {
            if (_class.lessons) {
                const tmp = _class.lessons.map(lesson => {
                    return {
                        title: _class.name,
                        teacher_name: _class.teacher && _class.teacher.name,
                        class_id: _class.id,
                        start: lesson.time + " " + lesson.start_time,
                        end: lesson.time + " " + lesson.end_time,
                        // color: "#ff4444",
                        color: _class.course && _class.course.color,
                        overlay: 1,
                    };
                });
                classes = [...classes, ...tmp];
            }
        });

        let provinces = this.props.provinces ? this.props.provinces.map((province) => {
            return {id: province.id, key: province.id, value: province.name};
        }) : [];
        provinces = [{id: null, key: 0, value: "T.cả t.phố"}, ...provinces];
        return (
            <div>
                {store.isLoadingClasses || store.isLoadingGens || store.isLoadingBases ? <Loading/>
                    : (
                        <div>
                            <div className="row gutter-20">
                                <div className="col-md-3">
                                    <DateRangePicker
                                        className="background-white padding-vertical-10px cursor-pointer margin-top-10 radius-5"
                                        start={filter.start_time} end={filter.end_time}
                                        style={{padding: '5px 10px 5px 20px', lineHeight: '31px'}}
                                        onChange={this.changeDateRangePicker}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Select
                                        options={store.gensData}
                                        onChange={val => this.onChangeFilter('gen_id', val)}
                                        // onChange={(e) => {
                                        //     store.onChangeFilter('gen_id', e);
                                        //     store.loadRegisters();
                                        // }}
                                        value={filter.gen_id}
                                        defaultMessage="Chọn giai đoạn"
                                        name="gen_id"
                                        wrapClassName="react-select-white-light-round radius-5"
                                        className="btn btn-white"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Select
                                        defaultMessage="Chọn cơ sở"
                                        options={store.basesData}
                                        value={filter.base_id}
                                        onChange={val => this.onChangeFilter('base_id', val)}
                                        name="base_id"
                                        wrapClassName="react-select-white-light-round  radius-5"
                                        className="btn btn-white"
                                    />
                                </div>

                                <div className="col-md-3">
                                    <ReactSelect.Async
                                        loadOptions={(p1, p2) => store.searchCourses(p1, p2)}
                                        loadingPlaceholder="Đang tải..."
                                        className="react-select-white-light-round cursor-pointer margin-top-10 radius-5"
                                        placeholder="Chọn môn học"
                                        searchPromptText="Không có dữ liệu"
                                        onChange={obj => this.onChangeFilter('course_id', obj ? obj.id : obj)}
                                        value={filter.class_id}
                                        menuContainerStyle={{zIndex: 4}}
                                        style={{paddingTop: 4, paddingBottom: 4}}
                                        id="select-async-course"
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                    />
                                </div>

                            </div>
                            <div className="row gutter-20">
                                <div className="col-md-3">
                                    <Select
                                        defaultMessage="Chọn thành phố"
                                        options={provinces}
                                        value={filter.province_id}
                                        onChange={val => this.onChangeFilter('province_id', val)}
                                        name="province_id"
                                        wrapClassName="react-select-white-light-round radius-5"
                                        className="btn btn-white"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <Select
                                        defaultMessage="Chọn trạng thái"
                                        options={store.classStatuses}
                                        value={filter.class_type}
                                        onChange={val => this.onChangeFilter('class_type', val)}
                                        name="class_type"
                                        wrapClassName="react-select-white-light-round radius-5"
                                        className="btn btn-white"
                                    />
                                </div>

                                <div className="col-md-3">
                                    <ReactSelect.Async
                                        loadOptions={(p1, p2) => store.loadStaffs(p1, p2,'teacher')}
                                        loadingPlaceholder="Đang tải..."
                                        className="react-select-white-light-round cursor-pointer margin-top-10 radius-5"
                                        placeholder="Giảng viên/ trợ giảng"
                                        searchPromptText="Không có dữ liệu"
                                        onChange={obj => this.onChangeFilter('teacher_id', obj ? obj.id : obj)}
                                        value={filter.teacher_id}
                                        menuContainerStyle={{zIndex: 4}}
                                        style={{paddingTop: 4, padddingBottom: 4}}
                                        id="select-async-teacher"
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label}
                                                                 url={option.avatar_url}/>
                                            );
                                        }}
                                    />
                                </div>

                            </div>
                            <div className="card">
                                <div className="card-content">
                                    <Calendar
                                        id={"classes-schedule-calender"}
                                        calendarEvents={classes}
                                        onClick={(value) => {
                                            // console.log(store.class_id,value.class_id, "schedule");
                                            // store.class_id = value.class_id;
                                            store.isShowClassModal = true;
                                            store.loadClass(value.class_id);
                                        }}
                                        disabled
                                        // onClickDay={day => {
                                        //     self.openModalBooking(day, room);
                                        // }}
                                    />
                                </div>
                            </div>
                        </div>
                    )

                }
                <ClassContainer/>
            </div>
        );
    }
}

ScheduleClassContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user,
        provinces: state.global.provinces,
    };
}

export default connect(mapStateToProps)(ScheduleClassContainer);
