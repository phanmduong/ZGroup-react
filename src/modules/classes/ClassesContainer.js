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
import * as helper from '../../helpers/helper';
import {Modal} from 'react-bootstrap';
import AddClassContainer from './AddClassContainer';
import Select from './SelectGen';
import Pagination from "../../components/common/Pagination";

class ClassesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModalClass: false,
            classSelected: {},
            editClass: false,
            gens: [],
            courses: [],
            selectGenId: '',
            courseId: '',
            openLoadingModal: false,
        };
        this.search = {
            teacherId: ''
        };
        this.timeOut = null;
        this.loadClasses = this.loadClasses.bind(this);
        this.classesSearchChange = this.classesSearchChange.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.duplicateClass = this.duplicateClass.bind(this);
        this.changeClassStatus = this.changeClassStatus.bind(this);
        this.closeModalClass = this.closeModalClass.bind(this);
        this.openModalClass = this.openModalClass.bind(this);
        this.changeGens = this.changeGens.bind(this);
        this.beginExportExcel = this.beginExportExcel.bind(this);
    }

    componentWillMount() {
        if (this.props.params.teacherId) {
            this.search.teacherId = this.props.params.teacherId;
        }
        this.props.classActions.loadCourses();
        this.props.classActions.loadGensData(() => {
            this.props.classActions.loadClasses({
                page: 1, teacherId: this.search.teacherId, selectGenId: this.state.selectGenId,
                selectedBaseId: this.props.selectedBaseId,
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoadingGens && this.props.isLoadingGens) {
            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens);
            this.setState({
                gens: [{id: 0, name: 'Tất cả'}, ...gens],
                selectGenId: 0,
            });
        }
        if (!nextProps.isLoadingCourses && this.props.isLoadingCourses) {
            let courses = _.sortBy(nextProps.courses, [function (o) {
                return parseInt(o.name);
            }]);
            courses = _.reverse(courses);
            this.setState({
                courses: [{id: 0, name: 'Tất cả'}, ...courses],
                courseId: '',
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
          if(data.length == 0){ helper.showErrorNotification("Khóa hiện tại chưa có dữ liệu")}
          else {
              let wb = helper.newWorkBook();
              helper.appendJsonToWorkBook(data, wb, 'Danh sách lớp');
              helper.saveWorkBookToExcel(wb, 'Danh sách lớp');
          }
          this.setState({openLoadingModal: false});
        }*/
        if (nextProps.params.teacherId !== this.props.params.teacherId) {
            this.search.teacherId = nextProps.params.teacherId;
            this.setState({
                query: ''
            });
            this.loadClasses(1, '');
        }
        if (nextProps.selectedBaseId !== this.props.selectedBaseId) {
            this.setState({
                selectedBaseId: nextProps.selectedBaseId,
                baseId: nextProps.selectedBaseId,
            });
            this.props.classActions.loadClasses({
                ...this.state,
                search: this.state.query,
                page: this.state.page,
                teacherId: this.search.teacherId,
                selectGenId: this.state.selectGenId,
                selectedBaseId: nextProps.selectedBaseId,
                baseId: nextProps.selectedBaseId,
            });
        }
    }

    classesSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.loadClasses({
                page: 1,
                query: value,
            });
        }.bind(this), 500);
    }

    loadClasses(page = 1, query = this.state.query) {
        this.setState({page});
        this.props.classActions.loadClasses({
            ...this.state,
            search: query,
            page,
            teacherId: this.search.teacherId,
            selectGenId: this.state.selectGenId,
            selectedBaseId: this.props.selectedBaseId
        });
    }

    deleteClass(classData) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa lớp " + classData.name + " không?", () => {
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
                teacher_id: classData.teacher ? classData.teacher.id : '',
                schedule_id: classData.schedule_id,
                type: classData.type,
                status: classData.status,
                datestart: classData.datestart_en,
                date_end: classData.date_end,
                enroll_start_date: classData.enroll_start_date,
                enroll_end_date: classData.enroll_end_date,
                room_id: classData.room ? classData.room.id : '',
                teachers: classData.teachers,
                teaching_assistants: classData.teaching_assistants,
            };
        }
        this.setState({
            showModalClass: true,
            classSelected: classData,
            editClass: editClass
        });
    }


    changeGens(value) {
        this.setState({
            page: 1,
            selectGenId: value
        });
        this.props.classActions.loadClasses({
            ...this.state,
            search: this.state.query, page: 1, teacherId: this.search.teacherId, genId: value
        });
    }

    changeCourses = (value) => {
        this.setState({
            page: 1,
            courseId: value
        });
        this.props.classActions.loadClasses({
            ...this.state,
            search: this.state.query, page: 1, teacherId: this.search.teacherId, courseId: value
        });
    };

    beginExportExcel() {
        /*if(this.state.selectGenId == 11 || this.state.selectGenId == '')
            helper.showErrorNotification('Vui lòng chọn một khóa.');
        else{
            this.setState({openLoadingModal: true});
            this.props.classActions.loadExcelData(this.state.selectGenId);
        }*/
    }

    render() {
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

                {(this.props.isLoadingGens || this.props.isLoading) && <Loading/>}


                {!this.props.isLoadingGens && !this.props.isLoading && <div className="card" mask="purple">
                    <img className="img-absolute"/>

                    <div className="card-content">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Danh sách lớp học</strong>
                                    </h4>
                                </div>
                                <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                                    <Search
                                        onChange={this.classesSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm lớp học"
                                        className="round-white-seacrh"
                                    />
                                    <Select
                                        options={this.state.gens}
                                        onChange={this.changeGens}
                                        value={this.state.selectGenId}
                                        defaultMessage="Chọn khóa học"
                                        name="gens"
                                    />
                                    <Select
                                        options={this.state.courses}
                                        onChange={this.changeCourses}
                                        value={this.state.courseId}
                                        defaultMessage="Chọn môn học"
                                        name="courses"
                                        style={{width: 150}}
                                    />
                                    <button
                                        className="btn btn-white btn-round btn-icon"
                                        type="button" onClick={() => {
                                        this.openModalClass();
                                    }}>
                                        Thêm lớp học&nbsp;&nbsp;<i className="material-icons">
                                        add
                                    </i>
                                    </button>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>}


                {(!this.props.isLoading && !this.props.isLoadingGens) &&
                <ListClass
                        classes={this.props.classes}
                        deleteClass={this.deleteClass}
                        duplicateClass={this.duplicateClass}
                        changeClassStatus={this.changeClassStatus}
                        openModalClass={this.openModalClass}
                    />}

                <br/>

                {(!this.props.isLoading && !this.props.isLoadingGens) &&
                <div
                    style={{textAlign: 'right', paddingTop: 20}}>

                    <b style={{marginRight: '15px'}}>
                        Hiển thị kêt quả
                        từ {this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0}
                        - {this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount}/{this.props.totalCount}</b><br/>
                    <Pagination
                        totalPages={this.props.totalPages}
                        currentPage={this.props.currentPage}
                        loadDataPage={this.loadClasses || 0}
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
        selectedBaseId: state.global.selectedBaseId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContainer);
