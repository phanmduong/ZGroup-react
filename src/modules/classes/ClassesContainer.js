/**
 * Created by phanmduong on 9/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import * as classActions from './classActions';
import ListClass from './ListClass';
import PropTypes from 'prop-types';
import {isEmptyInput,confirm} from '../../helpers/helper';
import {Modal, Panel} from 'react-bootstrap';
import AddClassContainer from './AddClassContainer';
import Pagination from "../../components/common/Pagination";
import ReactSelect from "react-select";
import {DATE_FORMAT_SQL, STATUS_REFS, TYPE_CLASSES} from "../../constants/constants";
import * as studentActions from "../infoStudent/studentActions";
import ItemReactSelect from "../../components/common/ItemReactSelect";
import {findUser} from "../registerStudentsV3/registerListApi";
import {NO_AVATAR} from "../../constants/env";
import DateRangePicker from "../../components/common/DateTimePicker";
import moment from "moment";

const defaultState = {
    page: 1,
    search: "",
    selectGenId: '',
    selectedBaseId: '',
    province_id: '',
    courseId: '',
    status: '',
    class_status: '',
    type: '',
    teacherId: '',
    enroll_start_time: moment().subtract(5, 'years'),
    enroll_end_time: moment().add(1,'months'),
    // lesson_start_time: moment().subtract(5, 'years'),
    // lesson_end_time: moment().add(1,'months'),
    start_time: moment().subtract(5, 'years'),
    end_time: moment().add(1,'months'),
};

class ClassesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            filter: {...defaultState,},
            gens: [],
            courses: [],
            bases: [],
            openLoadingModal: false,
            openFilterPanel: false,
            editClass: false,
            showModalClass: false,
            classSelected: {},
        };
        this.search = {
            teacherId: ''
        };
        this.statusRef = STATUS_REFS.classes;
        this.timeOut = null;
        this.deleteClass = this.deleteClass.bind(this);
        this.duplicateClass = this.duplicateClass.bind(this);
        this.changeClassStatus = this.changeClassStatus.bind(this);
        this.closeModalClass = this.closeModalClass.bind(this);
        this.openModalClass = this.openModalClass.bind(this);
        this.beginExportExcel = this.beginExportExcel.bind(this);
    }

    componentWillMount() {
        if (this.props.params.teacherId) {
            this.search.teacherId = this.props.params.teacherId;
        }
        this.setState({filter:{
                ...this.state.filter,
                province_id: this.props.user.city || '',
                // selectedBaseId: this.props.user.base_id
            }});
        this.props.classActions.loadCourses();
        this.props.classActions.loadGensData(() => {
            this.loadClasses({
                ...this.state.filter,
                page: 1, teacherId: this.search.teacherId,
                selectGenId: this.state.selectGenId,
                province_id: this.props.user.city || '',
                // selectedBaseId: this.props.user.base_id
            });
        });
        if (!this.props.isLoadedStatuses[this.statusRef])
            this.props.studentActions.loadStatuses(this.statusRef);

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingGens && this.props.isLoadingGens) {
            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]).map(o => {
                return {...o, value: o.id, label: o.name,};
            });
            gens = _.reverse(gens);
            this.setState({
                gens: [{value: '', label: 'Tất cả'}, ...gens],
                filter: {
                    ...this.state.filter,
                    selectGenId: '',
                }
            });
        }
        if (!nextProps.isLoadingCourses && this.props.isLoadingCourses) {
            let courses = _.sortBy(nextProps.courses, [function (o) {
                return parseInt(o.name);
            }]).map(o => {
                return {...o, value: o.id, label: o.name,};
            });
            courses = _.reverse(courses);
            this.setState({
                courses: [{value: '', label: 'Tất cả'}, ...courses],
                filter: {
                    ...this.state.filter, courseId: '',
                },
            });
        }
        /*if (!nextProps.isLoadingExcel && this.props.isLoadingExcel)
        {
          let data = nextProps.excel.map((obj)=>{
              let res = {
                  'Tên lớp': obj.name,
                  'Giảng viên': obj.teacher ? obj.teacher.name : "",
                  'Trợ giảng': obj.teaching_assistant ? obj.teaching_assistant.name : ""
              };
              return res;
          });
          if(data.length == 0){ showErrorNotification("Khóa hiện tại chưa có dữ liệu")}
          else {
              let wb = newWorkBook();
              appendJsonToWorkBook(data, wb, 'Danh sách lớp');
              saveWorkBookToExcel(wb, 'Danh sách lớp');
          }
          this.setState({openLoadingModal: false});
        }*/
        if (nextProps.params.teacherId !== this.props.params.teacherId) {
            this.search.teacherId = nextProps.params.teacherId;
            this.setState({
                filter: {
                    ...this.state.filter,
                    search: '',
                    page: 1
                }
            });
            this.loadClasses({
                ...this.state.filter,
                page: 1, search: ''
            });
        }
        // if (nextProps.selectedBaseId !== this.props.selectedBaseId) {
        //     this.setState({
        //
        //         filter: {
        //             ...this.state.filter, selectedBaseId: nextProps.selectedBaseId,
        //         },
        //     });
        //     this.props.classActions.loadClasses({
        //         ...this.state,
        //         search: this.state.search,
        //         page: this.state.page,
        //         teacherId: this.search.teacherId,
        //         selectGenId: this.state.selectGenId,
        //         selectedBaseId: nextProps.selectedBaseId,
        //     });
        // }
    }

    classesSearchChange = (value) => {
        this.setState({
            filter: {
                ...this.state.filter, page: 1,
                search: value,
            },

        });
    }

    onSearchClasses = () => {
        this.loadClasses(this.state.filter);
    }

    loadClasses = (filter) => {
        this.props.classActions.loadClasses({
            ...filter,
            enroll_start_time: moment(this.state.filter.enroll_start_time).format(DATE_FORMAT_SQL),
            enroll_end_time: moment(this.state.filter.enroll_end_time).format(DATE_FORMAT_SQL),
            // lesson_start_time: this.state.filter.lesson_start_time.format(DATE_FORMAT_SQL),
            // lesson_end_time: this.state.filter.lesson_end_time.format(DATE_FORMAT_SQL),
            start_time: moment(this.state.filter.start_time).format(DATE_FORMAT_SQL),
            end_time: moment(this.state.filter.end_time).format(DATE_FORMAT_SQL),
        });
        // this.props.classActions.loadClasses({
        //     ...this.state.filter,
        //     search: search,
        //     page,
        //     teacherId: this.search.teacherId,
        //     selectGenId: this.state.selectGenId,
        //     selectedBaseId: this.props.selectedBaseId
        // });
    }

    deleteClass(classData) {
        confirm('error', 'Xóa', "Bạn có muốn xóa lớp " + classData.name + " không?", () => {
            this.props.classActions.deleteClass(classData.id);
        });

    }

    duplicateClass(classData) {
        this.props.classActions.duplicateClass(classData.id);
    }

    changeClassStatus(classData) {
        this.props.classActions.changeClassStatus(classData.id);
    }

    closeModalClass() {
        this.setState({showModalClass: false});
    }

    openModalClass(classData = {}, editClass = false) {
        if (editClass) {
            classData = {
                id: classData.id,
                name: classData.name,
                description: classData.description,
                target: classData.target,
                link_drive: classData.link_drive,
                regis_target: classData.regis_target,
                study_time: classData.study_time,
                gen_id: classData.gen ? classData.gen.id : '',
                course_id: classData.course ? classData.course.id : '',
                teacher_assis_id: classData.teacher_assistant ? classData.teacher_assistant.id : '',
                teacherId: classData.teacher ? classData.teacher.id : '',
                teacher_id: classData.teacher ? classData.teacher.id : '',
                schedule_id: classData.schedule_id,
                type: classData.type,
                status: classData.status,
                datestart: classData.datestart_en,
                date_end: classData.date_end,
                enroll_start_date: classData.enroll_start_date,
                enroll_end_date: classData.enroll_end_date,
                room_id: classData.room ? classData.room.id : '',
                teachers: classData.teachers ? classData.teachers.map(t=>t.id) : [],
                teaching_assistants: classData.teaching_assistants ? classData.teaching_assistants.map(t=>t.id) : [],
            };
        }
        this.setState({
            showModalClass: true,
            classSelected: classData,
            editClass: editClass
        });
    }

    changeFilterSelect = (field, value) => {
        let filter= {
            ...this.state.filter,
            [field]: value ? value.value : '',
        };
        switch (field){
            case 'selectedBaseId':{
                filter.province_id = '';
                break;
            }
            case 'province_id':{
                filter.selectedBaseId = '';
                break;
            }
        }
        this.setState({
            filter
        });
        console.log(this.state.filter)
    }

    beginExportExcel() {
        /*if(this.state.selectGenId == 11 || this.state.selectGenId == '')
            showErrorNotification('Vui lòng chọn một khóa.');
        else{
            this.setState({openLoadingModal: true});
            this.props.classActions.loadExcelData(this.state.selectGenId);
        }*/
    }

    onChangePage = (page) => {
        let filter = {
            ...this.state.filter,
            page
        };
        this.setState(({
            filter
        }));
        this.loadClasses(filter);
    }

    resetFilters = () => {
        this.setState({filter: defaultState});
    }

    applyFilter = () => {
        // this.props.classActions.loadClasses(this.state.filter);
        this.loadClasses(this.state.filter);
    }
    getStatuses = () => {
        if (this.props.isLoadingStatuses) return [];
        return [
            {value: '', label: 'Tất cả'},
            ...this.props.statuses[this.statusRef].map(st => {
                return {...st, value: st.id, label: st.name};
            })
        ];
    }
    loadStaffs = (input, callback, field) => {
        if (isEmptyInput(this.timeOut)) this.timeOut = {};
        if (this.timeOut[field] !== null) {
            clearTimeout(this.timeOut[field]);
        }
        this.timeOut[field] = setTimeout(function () {
            findUser(input, true).then(res => {

                let data = [
                    {id: '', avatar_url: NO_AVATAR, name: 'Tất cả', label: 'Tất cả', value: 'Tất cả'},
                    // defaultEmptySelectObject,
                    ...res.data.map((staff) => {
                        return {
                            ...staff,
                            ...{
                                value: staff.id,
                                label: staff.name
                            }
                        };
                    })
                ];


                // this.data[field] = data;
                callback(null, {options: data, complete: true});
            });
        }.bind(this), 500);
    }

    getProvinces = () => {
        return [
            {id: '', value: '', label: "T.cả t.phố"},
            ...(this.props.provinces ? this.props.provinces.map((province) => {
                return {id: province.id, value: province.id, label: province.name};
            }) : [])
        ];
    }
    getBases = () => {
        return [
            {id: '', value: '', label: "T.cả cơ sở"},
            ...(this.props.bases ? this.props.bases.map((base) => {
                return {id: base.id, value: base.id, label: base.name};
            }) : [])
        ];
    }

    changeDateRangePicker = (field, start_time, end_time) => {
        if (this.props.isLoading) return;
        this.setState({
            filter:{
                ...this.state.filter,
                [`${field}start_time`]: start_time,
                [`${field}end_time`]: end_time,
            }
        });
    };

    render() {
        console.log(this.props);
        return (
            <div className="">
                <Modal
                    show={this.state.openLoadingModal}
                    onHide={() => {
                    }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading/></Modal.Body>
                </Modal>

                {!this.props.isLoadingGens &&
                <div>
                    <div className="flex flex-space-between">
                        <div className="flex  flex-wrap tool-bar-actions">

                            <button
                                className="btn button-green btn-icon"
                                style={{padding: "12px 15px", height: 42, margin: '10px 10px 0 0', borderRadius: 5}}
                                type="button" onClick={this.openModalClass}>
                                <span className="material-icons">
                                    add_circle
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;Thêm lớp học
                            </button>
                            <Search
                                onChange={this.classesSearchChange}
                                value={this.state.filter.search}
                                placeholder="Tìm kiếm lớp học"
                                className="white-seacrh margin-right-10 min-width-200-px form-group-none-padding"
                                onSearch={this.onSearchClasses}
                            />
                            <button
                                onClick={() => {
                                    this.setState({openFilterPanel: !this.state.openFilterPanel});
                                }}
                                className="btn btn-white btn-icon"
                                style={{padding: "12px 20px", height: 42, margin: '10px 10px 0 0'}}
                            ><span className="material-icons">filter_alt</span>&nbsp;&nbsp;&nbsp;&nbsp;Lọc
                            </button>


                        </div>
                    </div>
                </div>
                }
                <Panel collapsible className="none-margin" expanded={
                    this.state.openFilterPanel
                    &&
                    !(this.props.isLoading)
                }>
                    <div className="card-filter" style={{borderRadius: 5}}>

                        <div className="row">

                            <div className="col-md-4">
                                <label>Môn học/ chương trình học</label>
                                <ReactSelect
                                    options={this.state.courses}
                                    onChange={val => this.changeFilterSelect('courseId', val)}
                                    value={this.state.filter.courseId}
                                    defaultMessage="Chọn môn học"
                                    name="course"
                                    menuContainerStyle={{zIndex: 11}}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>Giai đoạn tuyển sinh</label>
                                <ReactSelect
                                    options={this.state.gens}
                                    onChange={val => this.changeFilterSelect('selectGenId', val)}
                                    value={this.state.filter.selectGenId}
                                    defaultMessage="Chọn giai đoạn"
                                    name="gen"
                                    menuContainerStyle={{zIndex: 11}}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>Trạng thái tuyển sinh của lớp</label>
                                <ReactSelect
                                    options={[
                                        {value: '', label: 'Tất cả'},
                                        {value: '1', label: 'Đang tuyển sinh'},
                                        {value: '0', label: 'Đang học'},
                                    ]}
                                    onChange={val => this.changeFilterSelect('status', val)}
                                    value={this.state.filter.status}
                                    defaultMessage="Chọn trạng thái"
                                    menuContainerStyle={{zIndex: 11}}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>Trạng thái lớp học</label>
                                <ReactSelect
                                    options={this.getStatuses()}
                                    onChange={val => this.changeFilterSelect('class_status', val)}
                                    value={this.state.filter.class_status}
                                    defaultMessage="Chọn trạng thái"
                                    menuContainerStyle={{zIndex: 11}}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>Thể loại lớp</label>
                                <ReactSelect
                                    options={[
                                        {value: '', label: 'Tất cả'},
                                        ...TYPE_CLASSES
                                    ]}
                                    onChange={val => this.changeFilterSelect('type', val)}
                                    value={this.state.filter.type}
                                    defaultMessage="Chọn thể loại"
                                    menuContainerStyle={{zIndex: 11}}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>Giảng viên/ trợ giảng</label>
                                <ReactSelect.Async
                                    loadOptions={(p1, p2) => this.loadStaffs(p1, p2, 'teacher')}
                                    loadingPlaceholder="Đang tải..."
                                    menuContainerStyle={{zIndex: 11}}
                                    placeholder="Giảng viên/ trợ giảng"
                                    searchPromptText="Không có dữ liệu"
                                    onChange={obj => this.changeFilterSelect('teacherId', obj)}
                                    value={this.state.filter.teacherId}
                                    // style={{paddingTop: 4, paddingBottom: 3.5}}
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
                            <div className="col-md-4">
                                <label>Thời gian tuyển sinh</label>
                                <DateRangePicker
                                    className="padding-vertical-10px cursor-pointer margin-top-10 radius-5"
                                    start={this.state.filter.enroll_start_time} end={this.state.filter.enroll_end_time}
                                    style={{padding: '5px 10px 5px 20px', lineHeight: '31px'}}
                                    onChange={(s, e) => this.changeDateRangePicker('enroll_', s, e)}
                                />
                            </div>
                            {/*<div className="col-md-4">*/}
                            {/*    <label>Thời gian học</label>*/}
                            {/*    <DateRangePicker*/}
                            {/*        className="padding-vertical-10px cursor-pointer margin-top-10 radius-5"*/}
                            {/*        start={this.state.filter.lesson_start_time} end={this.state.filter.lesson_end_time}*/}
                            {/*        style={{padding: '5px 10px 5px 20px', lineHeight: '31px'}}*/}
                            {/*        onChange={(s, e) => this.changeDateRangePicker('lesson_', s, e)}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            <div className="col-md-4">
                                <label>Tỉnh/thành phố</label>
                                <ReactSelect
                                    defaultMessage="Chọn thành phố"
                                    options={this.getProvinces()}
                                    value={this.state.filter.province_id}
                                    onChange={val => this.changeFilterSelect('province_id', val)}
                                    name="province_id"
                                    menuContainerStyle={{zIndex: 11}}
                                />
                            </div>

                            <div className="col-md-4">
                                <label>Khai giảng</label>
                                <DateRangePicker
                                    className="padding-vertical-10px cursor-pointer margin-top-10 radius-5"
                                    start={this.state.filter.start_time} end={this.state.filter.end_time}
                                    style={{padding: '5px 10px 5px 20px', lineHeight: '31px'}}
                                    onChange={(s, e) => this.changeDateRangePicker('', s, e)}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>Cơ sở</label>
                                <ReactSelect
                                    defaultMessage="Chọn cơ sở"
                                    options={this.getBases()}
                                    value={this.state.filter.selectedBaseId}
                                    onChange={val => this.changeFilterSelect('selectedBaseId', val)}
                                    name="selectedBaseId"
                                    menuContainerStyle={{zIndex: 11}}
                                />
                            </div>
                            <div className="col-xs-12">
                                <div className="flex flex-end">
                                    <div className="btn btn-white"
                                         onClick={this.resetFilters}
                                         style={{"margin-rigth": "5px",}} disabled={this.props.isLoading}
                                    >
                                        Xóa bộ lọc
                                    </div>
                                    {/*<div className="btn button-green"*/}
                                    {/*     onClick={this.copyShareUrl}>Sao chép đường dẫn*/}
                                    {/*</div>*/}
                                    <div className="btn button-green" disabled={this.props.isLoading}
                                         onClick={this.applyFilter}>Áp dụng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Panel>

                {(this.props.isLoadingGens || this.props.isLoading) && <Loading/>}

                {(!this.props.isLoading && !this.props.isLoadingGens) &&
                <ListClass
                    classes={this.props.classes}
                    deleteClass={this.deleteClass}
                    duplicateClass={this.duplicateClass}
                    changeClassStatus={this.changeClassStatus}
                    openModalClass={this.openModalClass}
                />}

                <br/>

                {(!this.props.isLoading && !this.props.isLoadingGens) && this.props.classes && this.props.classes.length > 0 &&
                <div
                    style={{textAlign: 'right', paddingTop: 20}}>

                    <b style={{marginRight: '15px'}}>
                        Hiển thị kêt quả
                        từ {this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0}
                        - {this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount}/{this.props.totalCount}</b><br/>
                    <Pagination
                        totalPages={this.props.totalPages}
                        currentPage={this.props.currentPage}
                        loadDataPage={this.onChangePage}
                    />

                </div>


                }

                <Modal
                    show={this.state.showModalClass}
                    onHide={this.closeModalClass}
                    // bsSize="lg"
                >
                    <Modal.Header closeButton>
                        <b>{this.state.editClass ? "Chỉnh sửa lớp " + this.state.classSelected.name : "Tạo lớp học"}</b>
                    </Modal.Header>
                    <Modal.Body>
                        <AddClassContainer
                            edit={this.state.editClass}
                            classData={this.state.classSelected}
                            closeModal={this.closeModalClass}
                        />
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

ClassesContainer.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    selectedBaseId: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    classes: PropTypes.array.isRequired,
    excel: PropTypes.array.isRequired,
    gens: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isCreateClass: PropTypes.bool,
    isLoadingGens: PropTypes.bool,
    isLoadingExcel: PropTypes.bool,
    classActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        provinces: state.global.provinces,
        bases: state.global.bases,
        currentPage: state.classes.currentPage,
        totalPages: state.classes.totalPages,
        totalCount: state.classes.totalCount,
        limit: state.classes.limit,
        classes: state.classes.classes,
        courses: state.classes.courses,
        isLoading: state.classes.isLoading,
        isLoadingCourses: state.classes.isLoadingCourses,
        isLoadingExcel: state.classes.isLoadingExcel,
        excel: state.classes.excel,
        isCreateClass: state.classes.isCreateClass,
        gens: state.classes.gens,
        isLoadingGens: state.classes.isLoadingGens,
        statuses: state.infoStudent.statuses,
        isLoadingStatuses: state.infoStudent.isLoadingStatuses,
        isLoadedStatuses: state.infoStudent.isLoadedStatuses,
        isLoadingBases: PropTypes.bool.isRequired,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContainer);
