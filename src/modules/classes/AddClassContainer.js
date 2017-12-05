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


class AddClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            optionsSelectGen: [],
            optionsSelectCourse: [],
            optionsSelectStaff: [],
            optionsSelectSchedule: [],
            optionsSelectRoom: [],
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

    componentWillMount() {
        if (this.props.edit) {
            this.props.classActions.updateFormCreateClass({...this.props.classData});
        } else {
            this.props.classActions.updateFormCreateClass({
                datestart: new Date().toISOString().slice(0, 10)
            });
        }
        this.props.classActions.infoCreateClass();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.isLoadingInfoCreateClass !== this.props.isLoadingInfoCreateClass && !nextProps.isLoadingInfoCreateClass) {
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
        classData.gen_id = value && value.id ? value.id : '';
        this.props.classActions.updateFormCreateClass(classData);
    }

    changeCourse(value) {
        let classData = {...this.props.class};
        classData.course_id = value && value.id ? value.id : '';
        this.props.classActions.updateFormCreateClass(classData);
    }

    changeTeacher(value) {
        let classData = {...this.props.class};
        classData.teacher_id = value && value.id ? value.id : '';
        this.props.classActions.updateFormCreateClass(classData);
    }

    changeTeachAssis(value) {
        let classData = {...this.props.class};
        classData.teacher_assis_id = value && value.id ? value.id : '';
        this.props.classActions.updateFormCreateClass(classData);
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
        let {gen_id, course_id, schedule_id, datestart, room_id, type} = this.props.class;
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
            if (helper.isEmptyInput(gen_id)) {
                helper.showTypeNotification("Vui lòng chọn khóa học", "warning");
                return false;
            }
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

    render() {
        if (this.props.isLoadingInfoCreateClass) {
            return <Loading/>;
        } else {
            let {name, description, target, regis_target, study_time, gen_id, course_id, teacher_assis_id, teacher_id, schedule_id, datestart, room_id, type} = this.props.class;
            return (
                <div>
                    <form id="form-add-class" onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <FormInputText
                            label="Tên lớp"
                            name="name"
                            updateFormData={this.updateFormData}
                            value={name}
                            required={true}
                            type="text"
                        />
                        <FormInputText
                            label="Mô tả"
                            name="description"
                            updateFormData={this.updateFormData}
                            value={description}
                            type="text"
                        />
                        <FormInputText
                            label="Chỉ tiêu nộp tiền"
                            name="target"
                            updateFormData={(event) => {
                                if (!isNaN(Number(event.target.value))) {
                                    this.updateFormData(event);
                                }
                            }}
                            value={target}
                            required={true}
                            type="text"
                        />
                        <FormInputText
                            label="Chỉ tiêu đăng kí"
                            name="regis_target"
                            updateFormData={(event) => {
                                if (!isNaN(Number(event.target.value))) {
                                    this.updateFormData(event);
                                }
                            }}
                            value={regis_target}
                            required={true}
                            type="text"
                        />
                        <FormInputText
                            label="Giờ học"
                            name="study_time"
                            updateFormData={(event) => {
                                this.updateFormData(event);
                            }}
                            value={study_time}
                            required={true}
                            type="text"
                        />
                        <FormInputDate
                            label="Ngày khai giảng"
                            name="datestart"
                            updateFormData={this.updateFormData}
                            value={datestart ? datestart.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                            id="form-date-datestart"
                        />
                        <SelectDropdown
                            options={this.state.optionsSelectRoom}
                            onChange={(value) => this.changeRoom(value)}
                            defaultMessage={"Chọn phòng học"}
                            value={room_id}
                            isPaddingLeft
                        />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="label-control">Lịch học</label>
                                    <Select
                                        name="form-field-name"
                                        value={schedule_id}
                                        options={this.state.optionsSelectSchedule}
                                        onChange={this.changeSchedule}
                                        placeholder="Chọn lịch học"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="label-control">Thể loại lớp</label>
                                    <Select
                                        name="form-field-name"
                                        value={type}
                                        options={TYPE_CLASSES}
                                        onChange={this.changeType}
                                        placeholder="Chọn thể loại"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="label-control">Môn học</label>
                                    <Select
                                        name="form-field-name"
                                        value={course_id}
                                        options={this.state.optionsSelectCourse}
                                        onChange={this.changeCourse}
                                        placeholder="Chọn môn học"
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
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="label-control">Khóa học</label>
                                    <Select
                                        name="form-field-name"
                                        value={gen_id}
                                        options={this.state.optionsSelectGen}
                                        onChange={this.changeGen}
                                        placeholder="Chọn khóa học"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="label-control">Giảng viên</label>
                                    <Select
                                        name="form-field-name"
                                        value={teacher_id}
                                        options={this.state.optionsSelectStaff}
                                        onChange={this.changeTeacher}
                                        placeholder="Chọn giảng viên"
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="label-control">Trợ giảng</label>
                                    <Select
                                        name="form-field-name"
                                        value={teacher_assis_id}
                                        options={this.state.optionsSelectStaff}
                                        onChange={this.changeTeachAssis}
                                        optionRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                            );
                                        }}
                                        valueRenderer={(option) => {
                                            return (
                                                <ItemReactSelect label={option.label} url={option.avatar_url}/>
                                            );
                                        }}
                                        placeholder="Chọn trợ giảng"
                                    />
                                </div>
                            </div>
                        </div>
                        {this.props.isStoringClass ?
                            (
                                <button
                                    className="btn btn-fill btn-rose disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/>
                                    {this.props.edit ? ' Đang cập nhật' : ' Đang thêm'}
                                </button>
                            )
                            :
                            (
                                <button
                                    className="btn btn-fill btn-rose"
                                    onClick={this.props.edit ? this.editClass : this.createClass}
                                >
                                    {this.props.edit ? 'Cập nhật' : 'Thêm'}
                                </button>
                            )
                        }
                    </form>
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
        class: state.classes.class,
        infoCreateClass: state.classes.infoCreateClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClassContainer);
