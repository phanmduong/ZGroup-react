import React, {Component} from "react";
import {observer} from "mobx-react";
import {connect} from "react-redux";
import Loading from "../../components/common/Loading";
import Calendar from "../../components/common/Calendar";
import store from "./ScheduleTeachingStore";
import PropTypes from 'prop-types';
// import ClassContainer from "./ClassContainer";
import Select from "./Select";
import ReactSelect from "react-select";
import DateRangePicker from "../../components/common/DateTimePicker";
import ItemReactSelect from "../../components/common/ItemReactSelect";
import moment from "moment";


@observer
class ScheduleClassContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // store.loadGens();
        store.filter.province_id = this.props.user.city || '';
        // store.loadBases();
        store.loadClasses();
        store.loadRooms();
        store.loadCourses();
    }

    onChangeFilter = (field, value) => {
        console.log(field, value);
        if (store.isLoading) return;

        switch (field) {
            case 'base_id': {
                store.filter.province_id = null;
                store.filter.room_id = null;
                break;
            }
            case 'province_id': {
                store.filter.base_id = null;
                store.filter.room_id = null;
                break;
            }
            case 'room_id': {
                store.filter.province_id = null;
                store.filter.base_id = null;
                break;
            }
        }
        store.filter[field] = value;
        // store.filter.type = 'active';
        store.loadClasses();
    }


    changeDateRangePicker = (start_time, end_time) => {
        console.log(start_time, end_time);
        if (store.isLoading) return;
        // store.filter.start_time = start_time;
        // store.filter.end_time = end_time;
        store.filter = {
            ...store.filter, start_time, end_time,
            // gen_id: -1
        };
        store.loadClasses();
    };

    // onChangeGenFilter = (gen_id) => {
    //
    //     let gen = store.gensData.filter(g=>g.id==gen_id)[0];
    //     if(gen){
    //         store.filter = {...store.filter, start_time:gen.start_time, end_time:gen.end_time, gen_id};
    //         store.loadClasses();
    //
    //     }
    // }

    getProvinces = () => {
        let provinces = this.props.provinces ? this.props.provinces.map((province) => {
            return {id: province.id, key: province.id, value: province.name};
        }) : [];
        provinces = [{id: '', key: '', value: "T.cả t.phố"}, ...provinces];
        return provinces;
    }
    getBases = () => {
        let bases = this.props.bases ? this.props.bases.map((province) => {
            return {id: province.id, key: province.id, value: province.name};
        }) : [];
        bases = [{id: '', key: '', value: "T.cả cơ sở"}, ...bases];
        return bases;
    }
    getRooms = () => {
        let rooms = store.roomsData.map(r => {
            let base = this.props.bases.filter(b => b.id == r.base_id)[0];
            let name = `${r.name}${base ? `- ${base.name}` : ''}`;
            return {
                ...r,
                name,
                value: name,
            };
        });
        return rooms;
    }

    render() {
        console.log(this.props)
        let {filter} = store;
        let classes = [];
        let currentDate = filter.start_time;
        store.classes && store.classes.map(_class => {
            if (_class.lessons) {
                const tmp = _class.lessons.map(lesson => {
                    let lesson_end = moment(lesson.time + " " + lesson.end_time, 'hh:mm:ss YYYY-MM-DD');
                    if (currentDate.isBefore(lesson_end)) currentDate = lesson_end;
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


        currentDate = new Date(currentDate.toISOString());


        let showContents = store.isLoadingClasses || store.isLoadingBases || store.isLoadingCourses;
        let rooms = this.getRooms();
        let provinces = this.getProvinces();
        let bases = this.getBases();
        console.log(rooms)
        return (
            <div>

                <div className="container-fluid">
                    {!showContents && <div className="row gutter-20">
                        <div className="col-md-3">
                            <DateRangePicker
                                className="background-white padding-vertical-10px cursor-pointer margin-top-10 radius-5"
                                start={filter.start_time} end={filter.end_time}
                                style={{padding: '5px 10px 5px 20px', lineHeight: '31px'}}
                                onChange={this.changeDateRangePicker}
                            />
                        </div>
                        {/*<div className="col-md-3">*/}
                        {/*    <Select*/}
                        {/*        options={store.gensData}*/}
                        {/*        onChange={val => this.onChangeGenFilter(val)}*/}
                        {/*        value={filter.gen_id}*/}
                        {/*        defaultMessage="Chọn giai đoạn"*/}
                        {/*        name="gen_id"*/}
                        {/*        wrapClassName="react-select-white-light-round radius-5"*/}
                        {/*        className="btn btn-white"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="col-md-3">
                            <Select
                                defaultMessage="Chọn môn học"
                                options={store.getCourses}
                                value={filter.course_id}
                                onChange={val => this.onChangeFilter('course_id', val)}
                                name="type"
                                wrapClassName="react-select-white-light-round radius-5"
                                className="btn btn-white"
                            />
                        </div>
                        <div className="col-md-3">
                            <ReactSelect.Async
                                loadOptions={(p1, p2) => store.searchCourses(p1, p2)}
                                loadingPlaceholder="Đang tải..."
                                className="react-select-white-light-round cursor-pointer margin-top-10 radius-5"
                                placeholder="Chọn lớp học"
                                searchPromptText="Không có dữ liệu"
                                onChange={obj => this.onChangeFilter('course_id', obj ? obj.id : obj)}
                                value={filter.class_id}
                                menuContainerStyle={{zIndex: 5}}
                                style={{paddingTop: 4, paddingBottom: 3.5}}
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
                        <div className="col-md-3">
                            <ReactSelect.Async
                                loadOptions={(p1, p2) => store.loadStaffs(p1, p2, 'teacher')}
                                loadingPlaceholder="Đang tải..."
                                className="react-select-white-light-round cursor-pointer margin-top-10 radius-5"
                                placeholder="Giảng viên/ trợ giảng"
                                searchPromptText="Không có dữ liệu"
                                onChange={obj => this.onChangeFilter('teacher_id', obj ? obj.id : obj)}
                                value={filter.teacher_id}
                                menuContainerStyle={{zIndex: 5}}
                                style={{paddingTop: 4, paddingBottom: 3.5}}
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



                    </div>}
                    {!showContents && <div className="row gutter-20">
                        <div className="col-md-3">
                            <Select
                                defaultMessage="Chọn trạng thái"
                                options={store.classStatuses}
                                value={filter.type}
                                onChange={val => this.onChangeFilter('type', val)}
                                name="type"
                                wrapClassName="react-select-white-light-round radius-5"
                                className="btn btn-white"
                            />
                        </div>
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
                                defaultMessage="Chọn cơ sở"
                                options={bases}
                                value={filter.base_id}
                                onChange={val => this.onChangeFilter('base_id', val)}
                                name="base_id"
                                wrapClassName="react-select-white-light-round  radius-5"
                                className="btn btn-white"
                            />
                        </div>
                        <div className="col-md-3">
                            <Select
                                defaultMessage="Chọn phòng"
                                options={rooms}
                                value={filter.room_id}
                                onChange={val => this.onChangeFilter('room_id', val)}
                                name="room_id"
                                wrapClassName="react-select-white-light-round  radius-5"
                                className="btn btn-white"
                            />
                        </div>

                        {/*<div className="col-md-3"/>*/}


                    </div>}
                    {showContents ? <Loading/>
                        :
                        <div className="row gutter-20">
                            <div className="col-md-12">
                                <div className="card margin-top-10">
                                    <div className="card-content">
                                        <Calendar
                                            id="classes-schedule-calender"
                                            calendarEvents={classes}
                                            onClick={(value) => {
                                                // console.log(store.class_id,value.class_id, "schedule");
                                                // store.class_id = value.class_id;
                                                window.open(`https://${window.location.hostname}/class/${value.class_id}`, "_blank");
                                                // store.isShowClassModal = true;
                                                // store.loadClass(value.class_id);
                                            }}
                                            currentDate={currentDate}
                                            disabled
                                            // onClickDay={day => {
                                            //     self.openModalBooking(day, room);
                                            // }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    }
                </div>


                {/*<ClassContainer/>*/}
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
        bases: state.global.bases,
        rooms: state.global,

    };
}

export default connect(mapStateToProps)(ScheduleClassContainer);
