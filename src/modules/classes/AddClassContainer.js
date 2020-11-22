/**
 * Created by phanmduong on 9/11/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as classActions from './classActions';
import Loading from '../../components/common/Loading';
import FormInputText from '../../components/common/FormInputText';
import Select from 'react-select';
import FormInputDate from '../../components/common/FormInputDate';
import SelectDropdown from '../../components/common/Select';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import ItemReactSelect from '../../components/common/ItemReactSelect';
import {TYPE_CLASSES} from "../../constants/constants";
import SelectTeacher from "./SelectTeacher";
import TooltipButton from "../../components/common/TooltipButton";
import CreateScheduleModal from "./schedule/CreateScheduleModal";
import moment from "moment";

class AddClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            optionsSelectGen: [],
            optionsSelectCourse: [],
            optionsSelectStaff: [],
            optionsSelectSchedule: [],
            optionsSelectRoom: [],
            teachers: [],
            showScheduleModal: false
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changeGen = this.changeGen.bind(this);
        this.changeCourse = this.changeCourse.bind(this);
        this.changeTeacher = this.changeTeacher.bind(this);
        this.changeTeachAssis = this.changeTeachAssis.bind(this);
        this.changeSchedule = this.changeSchedule.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.changeType = this.changeType.bind(this);
        this.createClass = this.createClass.bind(this);
        this.editClass = this.editClass.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        if (this.props.edit) {
            this.props.classActions.updateFormCreateClass({...this.props.classData});
        } else {
            let current=new Date().toISOString().slice(0, 10);
            this.props.classActions.updateFormCreateClass({
                datestart: current,
                date_end: current,
                enroll_end_date: current,
                enroll_start_date: current,
            });
        }
        this.props.classActions.infoCreateClass();
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.isLoadingInfoCreateClass && !nextProps.isLoadingInfoCreateClass) {
            let dataGens = [];
            nextProps.infoCreateClass.gens.forEach(gen => {
                dataGens.push({
                    ...gen, ...{
                        value: gen.id,
                        label: "Khóa " + gen.name
                    }
                });
            });
            let dataCourses = [];
            nextProps.infoCreateClass.courses.forEach(course => {
                dataCourses.push({
                    ...course, ...{
                        value: course.id,
                        label: course.name
                    }
                });
            });
            let dataStaffs = [];
            nextProps.infoCreateClass.staffs.forEach(staff => {
                dataStaffs.push({
                    ...staff, ...{
                        value: staff.id,
                        label: staff.name
                    }
                });
            });
            let dataSchedules = [];
            nextProps.infoCreateClass.schedules.forEach(schedule => {
                dataSchedules.push({
                    ...schedule, ...{
                        value: schedule.id,
                        label: schedule.name
                    }
                });
            });
            let dataRoomBefore = {};
            let dataRooms = [];
            nextProps.infoCreateClass.rooms.forEach(room => {
                if (dataRoomBefore.base_id !== room.base_id) {
                    dataRooms.push({
                        key: room.id,
                        value: room.base + ` (${room.address})`,
                        disable: true
                    });
                }
                dataRoomBefore = room;
                dataRooms.push({
                    ...room, ...{
                        key: room.id,
                        value: room.base + ": " + room.name
                    }
                });
            });
            this.setState({
                optionsSelectGen: dataGens,
                optionsSelectCourse: dataCourses,
                optionsSelectStaff: dataStaffs,
                optionsSelectSchedule: dataSchedules,
                optionsSelectRoom: dataRooms,
            });
        }
    }

    changeGen(value) {
        let classData = {...this.props.class};
        // let {enroll_start_date, enroll_end_date } = classData;
        classData.gen_id = value && value.id ? value.id : '';
        // if(isEmptyInput(enroll_start_date) && isEmptyInput(enroll_end_date)){
        classData.enroll_start_date = value.start_time;
        classData.enroll_end_date = value.end_time;
        // }
        this.props.classActions.updateFormCreateClass(classData);
    }

    changeCourse(value) {
        let classData = {...this.props.class};
        classData.course_id = value && value.id ? value.id : '';
        if (value && !classData.id) {
            let {duration} = value;
            classData.date_end = moment(classData.datestart).add(duration, 'days').toISOString();
        }
        this.props.classActions.updateFormCreateClass(classData);
    }

    changeTeacher(value, key) {
        if (!helper.isEmptyInput(key)) {
            let classData = {...this.props.class};
            if (value) {
                classData.teachers = classData.teachers.map((teacher, index) => {
                    if (index === key) {
                        return value.id;
                    } else {
                        return teacher;
                    }
                });
            } else {
                let data = [];
                classData.teachers.map((teacher, index) => {
                    if (index !== key) {
                        data.push(teacher);
                    }
                });
                classData.teachers = data;
            }
            this.props.classActions.updateFormCreateClass(classData);
        } else {
            let classData = {...this.props.class};
            classData.teacher_id = value && value.id ? value.id : '';
            this.props.classActions.updateFormCreateClass(classData);
        }
    }

    changeTeachAssis(value, key) {
        if (!helper.isEmptyInput(key)) {
            let classData = {...this.props.class};
            if (value) {
                classData.teaching_assistants = classData.teaching_assistants.map((teacher, index) => {
                    if (index === key) {
                        return value.id;
                    } else {
                        return teacher;
                    }
                });
            } else {
                let data = [];
                classData.teaching_assistants.map((teacher, index) => {
                    if (index !== key) {
                        data.push(teacher);
                    }
                });
                classData.teaching_assistants = data;
            }
            this.props.classActions.updateFormCreateClass(classData);
        } else {
            let classData = {...this.props.class};
            classData.teacher_assis_id = value && value.id ? value.id : '';
            this.props.classActions.updateFormCreateClass(classData);
        }
    }

    getSelectTeacher(options, teacher_id, teachers, value) {
        let data = [];
        options.map((option) => {
            if (option.id !== teacher_id && ((teachers && teachers.indexOf(option.id) < 0) || teachers === undefined || teachers === null)) {
                data.push(option);
            }
            if (option.id === value) {
                data.push(option);
            }
        });
        return data;
    }

    changeSchedule(value) {
        let classData = {...this.props.class};
        classData.schedule_id = value && value.id ? value.id : '';
        this.props.classActions.updateFormCreateClass(classData);
    }

    changeType(value) {
        let classData = {...this.props.class};
        classData.type = value && value.value ? value.value : '';
        this.props.classActions.updateFormCreateClass(classData);
    }

    changeRoom(value) {
        let classData = {...this.props.class};
        classData.room_id = value;
        this.props.classActions.updateFormCreateClass(classData);
    }


    updateFormData(event) {
        const field = event.target.name;
        let classData = {...this.props.class};
        classData[field] = event.target.value;
        if (classData[field] !== this.props.class[field]) {
            this.props.classActions.updateFormCreateClass(classData);
        }
    }

    checkValidate() {
        let { course_id, schedule_id, datestart, room_id, type} = this.props.class;
        helper.setFormValidation("#form-add-class");
        if ($("#form-add-class").valid()) {
            if (helper.isEmptyInput(datestart)) {
                helper.showTypeNotification("Vui lòng chọn ngày khai giảng", "warning");
                return false;
            }
            if (helper.isEmptyInput(room_id)) {
                helper.showTypeNotification("Vui lòng chọn phòng học", "warning");
                return false;
            }
            if (helper.isEmptyInput(schedule_id)) {
                helper.showTypeNotification("Vui lòng chọn lịch học", "warning");
                return false;
            }
            if (helper.isEmptyInput(course_id)) {
                helper.showTypeNotification("Vui lòng chọn môn học", "warning");
                return false;
            }
            // if (helper.isEmptyInput(study_time)) {
            //     helper.showTypeNotification("Vui lòng giờ học", "warning");
            //     return false;
            // }
            if (helper.isEmptyInput(type)) {
                helper.showTypeNotification("Vui lòng chọn thể loại lớp", "warning");
                return false;
            }
            return true;
        }
        return false;
    }

    createClass() {
        if (this.checkValidate()) {
            this.props.classActions.createClass(this.props.class, this.props.closeModal);
        }
    }

    editClass() {
        if (this.checkValidate()) {
            this.props.classActions.editClass(this.props.class, this.props.closeModal);
        }
    }

    onCloseScheduleModal = (schedule = null) => {
        this.setState({showScheduleModal: false});
        if (schedule) {
            console.log(schedule);
            this.props.classActions.addSchedule(schedule);
            this.setState({
                optionsSelectSchedule: [...this.state.optionsSelectSchedule, {
                    ...schedule,
                    label: schedule.name,
                    value: schedule.id,
                }],
            });
            this.changeSchedule(schedule);
        }
    };

    onOpenScheduleModal = () => {
        this.setState({showScheduleModal: true});
    };

    render() {
        console.log({...this.props.class});
        if (this.props.isLoadingInfoCreateClass) {
            return <Loading/>;
        } else {
            let {
                name, link_drive, description, target, regis_target, teachers, study_time, gen_id, course_id, teacher_assis_id, teaching_assistants, teacher_id, schedule_id,
                datestart, date_end, enroll_start_date, enroll_end_date, room_id, type
            } = {...this.props.class};
            return (
                <div className="">
                    <form id="form-add-class" className="form-grey" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <label className="required-label">Chọn môn</label>
                        <Select
                            name="form-field-name"
                            value={course_id}
                            options={this.state.optionsSelectCourse}
                            onChange={this.changeCourse}
                            placeholder="Chọn môn học"
                            className="form-grey-select"
                            optionRenderer={(option) => {
                                return (
                                    <ItemReactSelect label={option.label} url={option.icon_url}/>
                                );
                            }}
                            valueRenderer={(option) => {
                                return (
                                    <ItemReactSelect label={option.label} url={option.icon_url}/>
                                );
                            }}
                        />
                        <label className="required-label">Chọn phòng học</label>
                        <SelectDropdown
                            options={this.state.optionsSelectRoom}
                            onChange={(value) => this.changeRoom(value)}
                            defaultMessage="Chọn phòng học"
                            value={room_id}
                            isPaddingLeft
                            className="form-grey-select"
                        />
                        <label className="required-label">Tên lớp học</label>
                        <FormInputText

                            name="name"
                            updateFormData={this.updateFormData}
                            value={name}
                            required
                            type="text"
                        />
                        <label>Mô tả ngắn</label>
                        <FormInputText
                            label=""
                            name="description"
                            updateFormData={this.updateFormData}
                            value={description}
                            type="text"
                        />
                        <label className="required-label">Số học viên tối đa</label>
                        <FormInputText
                            label=""
                            name="target"
                            updateFormData={(event) => {
                                if (!isNaN(Number(event.target.value))) {
                                    this.updateFormData(event);
                                }
                            }}
                            value={target}
                            required
                            type="text"
                        />
                        <label className="required-label">Số đăng kí tối đa</label>
                        <FormInputText
                            label=""
                            name="regis_target"
                            updateFormData={(event) => {
                                if (!isNaN(Number(event.target.value))) {
                                    this.updateFormData(event);
                                }
                            }}
                            value={regis_target}
                            required
                            type="text"
                        />
                        <label className="required-label">Lịch học</label>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{width: "100%"}}
                            >
                                <Select
                                    name="form-field-name"
                                    value={schedule_id}
                                    options={this.state.optionsSelectSchedule}
                                    onChange={this.changeSchedule}
                                    placeholder="Chọn lịch học"
                                    clearable={false}
                                />
                            </div>
                            <TooltipButton text="Thêm lịch học" placement="top">
                                <div onClick={this.onOpenScheduleModal}
                                     className="btn btn-rose btn-round btn-xs button-add none-margin">
                                    <strong>+</strong>
                                </div>
                            </TooltipButton>
                        </div>
                        <label>Ngày khai giảng</label>
                        <FormInputDate
                            label=""
                            name="datestart"
                            updateFormData={(event)=> {
                                let classData = {...this.props.class};
                                if (classData.course_id && !classData.id) {
                                    let currentClass  = this.state.optionsSelectCourse.filter(cl=>cl.id == classData.course_id)[0];
                                    if(currentClass){
                                        let {duration} = currentClass;
                                        console.log(duration,moment(event.target.value).add(duration, 'days').toISOString());
                                        classData.date_end = moment(event.target.value).add(duration, 'days').toISOString();
                                    }

                                }
                                classData.datestart = event.target.value;
                                this.props.classActions.updateFormCreateClass(classData);
                            }}
                            value={datestart ? datestart.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                            id="form-date-datestart"
                        />
                        <label>Ngày bế giảng (dự kiến)</label>
                        <FormInputDate
                            label=""
                            name="date_end"
                            updateFormData={this.updateFormData}
                            value={date_end ? date_end.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                            id="form-date-date-end"
                        />
                        <div className="form-group">
                            <label className="label-control">Chọn khóa (không bắt buộc)</label>
                            <Select
                                name="form-field-name"
                                value={gen_id}
                                options={this.state.optionsSelectGen}
                                onChange={this.changeGen}
                                placeholder="Chọn khóa học"
                            />
                        </div>

                        <label>Bắt đầu tuyển sinh từ</label>
                        <FormInputDate
                            label=""
                            name="enroll_start_date"
                            updateFormData={this.updateFormData}
                            value={enroll_start_date ? enroll_start_date.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                            id="form-enroll-date-start"
                        />
                        <label>Kết thúc tuyển sinh sau</label>
                        <FormInputDate
                            label=""
                            name="enroll_end_date"
                            updateFormData={this.updateFormData}
                            value={enroll_end_date ? enroll_end_date.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                            id="form-enroll-date-end"
                        />

                        <label className="label-control required-label">Thể loại lớp</label>
                        <Select
                            name="form-field-name"
                            value={type}
                            options={TYPE_CLASSES}
                            onChange={this.changeType}
                            placeholder="Chọn thể loại"
                        />
                        <label>Link Driver</label>
                        <FormInputText
                            label=""
                            name="link_drive"
                            updateFormData={this.updateFormData}
                            value={link_drive}
                            type="text"
                        />
                        <label>Giờ học</label>
                        <FormInputText
                            label=""
                            name="study_time"
                            updateFormData={(event) => {
                                this.updateFormData(event);
                            }}
                            value={study_time}
                            // required
                            type="text"
                        />

                        <div className="row">
                            <div className="col-md-6">
                                {/*<div className="flex-align-items-center flex flex-space-between">*/}
                                {/*    <label>{teachers && teachers.length > 0 ? "Giảng viên 1" : "Giảng viên"}*/}
                                {/*        <TooltipButton text="Thêm lịch học" placement="top">*/}
                                {/*            <div onClick={this.onOpenScheduleModal}*/}
                                {/*                 className="btn btn-rose btn-round btn-xs button-add none-margin" style={{transform: 'scale(0.6)'}}>*/}
                                {/*                <strong>+</strong>*/}
                                {/*            </div>*/}
                                {/*        </TooltipButton>*/}
                                {/*    </label>*/}

                                {/*</div>*/}

                                <SelectTeacher
                                    optionsSelectStaff={this.getSelectTeacher(this.state.optionsSelectStaff, teacher_id, teachers, teacher_id)}
                                    // label={teachers && teachers.length > 0 ? "Giảng viên 1" : "Giảng viên"}
                                    placeholder={teachers && teachers.length > 0 ? "giảng viên 1" : "giảng viên"}
                                    label={<label
                                        className="flex flex-align-items-center margin-bottom-10">{teachers && teachers.length > 0 ? "Giảng viên 1" : "Giảng viên"}
                                        <TooltipButton text="Thêm giảng viên" placement="top">
                                            <div onClick={() => {
                                                let classData = {...this.props.class};
                                                classData.teachers = classData.teachers ? classData.teachers.concat("") : [""];
                                                this.props.classActions.updateFormCreateClass(classData);
                                            }}
                                                 className="btn btn-rose btn-round btn-xs none-margin" style={{
                                                transform: 'scale(0.7)',
                                                "padding": "0px 8px",
                                                "fontSize": "16px"
                                            }}>
                                                <strong>+</strong>
                                            </div>
                                        </TooltipButton>
                                    </label>}
                                    value={teacher_id}
                                    onChange={(value) => this.changeTeacher(value)}
                                />
                                {teachers && teachers.map((teach, index) => {
                                    return (
                                        <SelectTeacher
                                            key={'SelectTeacher2-'+index}
                                            optionsSelectStaff={this.getSelectTeacher(this.state.optionsSelectStaff, teacher_id, teachers, teach)}
                                            label={"Giảng viên " + (index + 2)}
                                            value={teach}
                                            onChange={(value) => this.changeTeacher(value, index)}
                                        />
                                    );
                                })}
                                {/*<TooltipButton text="Thêm giảng viên" placement="top">*/}

                                {/*    <button type="button"*/}
                                {/*            className="btn btn-rose btn-sm"*/}
                                {/*            onClick={() => {*/}
                                {/*                let classData = {...this.props.class};*/}
                                {/*                classData.teachers = classData.teachers ? classData.teachers.concat("") : [""];*/}
                                {/*                this.props.classActions.updateFormCreateClass(classData);*/}
                                {/*            }}*/}
                                {/*    >*/}
                                {/*        <i className="material-icons">control_point</i></button>*/}
                                {/*</TooltipButton>*/}
                            </div>
                            <div className="col-md-6">
                                <SelectTeacher
                                    optionsSelectStaff={this.getSelectTeacher(this.state.optionsSelectStaff, teacher_assis_id, teaching_assistants, teacher_assis_id)}
                                    // label={teaching_assistants && teaching_assistants.length > 0 ? "Trợ giảng 1" : "Trợ giảng"}
                                    placeholder={teachers && teachers.length > 0 ? "trợ giảng 1" : "trợ giảng"}

                                    label={<label className="flex flex-align-items-center margin-bottom-10">
                                        {teaching_assistants && teaching_assistants.length > 0 ? "Trợ giảng 1" : "Trợ giảng"}
                                        <TooltipButton text="Thêm trợ giảng" placement="top">
                                            <div
                                                onClick={() => {
                                                    let classData = {...this.props.class};
                                                    classData.teaching_assistants = classData.teaching_assistants ? classData.teaching_assistants.concat("") : [""];
                                                    this.props.classActions.updateFormCreateClass(classData);
                                                }}
                                                className="btn btn-rose btn-round btn-xs none-margin" style={{
                                                transform: 'scale(0.7)',
                                                "padding": "0px 8px",
                                                "fontSize": "16px"
                                            }}>
                                                <strong>+</strong>
                                            </div>
                                        </TooltipButton>
                                    </label>}
                                    value={teacher_assis_id}
                                    onChange={(value) => this.changeTeachAssis(value)}
                                />
                                {teaching_assistants && teaching_assistants.map((teach, index) => {
                                    return (
                                        <SelectTeacher
                                            key={'SelectTeacher-' + index}
                                            optionsSelectStaff={this.getSelectTeacher(this.state.optionsSelectStaff, teacher_assis_id, teaching_assistants, teach)}
                                            label={"Trợ giảng " + (index + 2)}
                                            value={teach}
                                            onChange={(value) => this.changeTeachAssis(value, index)}
                                        />
                                    );
                                })}
                                {/*<button type="button"*/}
                                {/*        className="btn btn-rose btn-sm"*/}
                                {/*        onClick={() => {*/}
                                {/*            let classData = {...this.props.class};*/}
                                {/*            classData.teaching_assistants = classData.teaching_assistants ? classData.teaching_assistants.concat("") : [""];*/}
                                {/*            this.props.classActions.updateFormCreateClass(classData);*/}
                                {/*        }}*/}
                                {/*>*/}
                                {/*    <i className="material-icons">control_point</i></button>*/}
                            </div>
                        </div>
                        <div className="flex flex-end margin-top-10">
                            <button
                                className="btn btn-white"
                                onClick={this.props.closeModal}
                            >
                                Hủy
                            </button>
                            {this.props.isStoringClass ?
                                (
                                    <button
                                        className="btn button-green disabled"
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        {this.props.edit ? ' Đang sửa' : ' Đang tạo'}
                                    </button>
                                )
                                :
                                (
                                    <button
                                        className="btn button-green"
                                        onClick={this.props.edit ? this.editClass : this.createClass}
                                    >
                                        {this.props.edit ? 'Sửa' : 'Tạo'}
                                    </button>
                                )
                            }
                        </div>
                    </form>
                    {this.state.showScheduleModal &&
                    <CreateScheduleModal showScheduleModal={this.state.showScheduleModal}
                                         onCloseScheduleModal={this.onCloseScheduleModal}/>}

                </div>
            );
        }
    }
}

AddClassContainer.propTypes = {
    isStoringClass: PropTypes.bool.isRequired,
    isLoadingInfoCreateClass: PropTypes.bool.isRequired,
    class: PropTypes.object.isRequired,
    infoCreateClass: PropTypes.object.isRequired,
    classActions: PropTypes.object.isRequired,
    edit: PropTypes.bool,
    closeModal: PropTypes.func,
    classData: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isStoringClass: state.classes.isStoringClass,
        isLoadingInfoCreateClass: state.classes.isLoadingInfoCreateClass,
        class: state.classes.editClass,
        infoCreateClass: state.classes.infoCreateClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClassContainer);
