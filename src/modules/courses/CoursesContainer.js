import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ListCourse from './ListCourse';
import * as coursesActions from './coursesActions';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
// import _                        from 'lodash';
import * as helper from '../../helpers/helper';
import Pagination from "../../components/common/Pagination";
import CreateCourseOverlay from "./overlays/CreateCourseOverlay";
import EmptyData from "../../components/common/EmptyData";

class CoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
            error: true,
            query: "",
            page: 1,
            paginator: {
                current_page: 1,
                limit: 5,
                total_pages: 1,
                total_count: 1
            }
        };
        this.loadCourses = this.loadCourses.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.courseSearchChange = this.courseSearchChange.bind(this);
        this.changeStatusCourse = this.changeStatusCourse.bind(this);
        this.duplicateCourse = this.duplicateCourse.bind(this);
    }

    componentWillMount() {
        this.props.coursesActions.loadCourses();
        setTimeout(() => {
            this.props.coursesActions.loadAllTypes();
            this.props.coursesActions.loadAllCategories();
        }, 2000);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({paginator: nextProps.paginator});

    }

    loadCourses(page = 1) {
        this.setState({page});
        this.props.coursesActions.loadCourses(page);
        console.log("khai code đầu năm");
    }

    deleteCourse(course) {
        if (this.props.user.role != 2) {
            helper.showTypeNotification("Bạn không có quyền xóa khóa học này!", "info");
            return;
        }
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa môn học này không?", () => {
            this.props.coursesActions.deleteCourse(course, () => {
                return this.props.coursesActions.loadCourses(this.state.page);
            });
        });
    }


    courseSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
    }

    onSearchCourses = () => {
        this.props.coursesActions.loadCourses(
            this.state.page,
            this.state.query,
        );
    }


    changeStatusCourse(index, course, e) {
        this.props.coursesActions.changeStatusCourse(index, course);
        e.stopPropagation();
    }

    updateCourse = (course) => {
        this.props.coursesActions.commitCourseData(course, () => {
            this.onSearchCourses();
        });
    }

    duplicateCourse(data) {
        helper.confirm('warning', 'Duplicate', "Bạn có muốn duplicate môn học này không?", () => {
            this.props.coursesActions.duplicateCourse(data, () => {
                return this.props.coursesActions.loadCourses(this.state.page);
            });
        });
    }

    render() {

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="flex flex-space-between">
                        <div className="flex  flex-wrap tool-bar-register">
                            <CreateCourseOverlay
                                btnText="Thêm môn học mới"
                                className="btn button-green btn-icon"
                                btnStyle={{padding: "12px 15px", height: 42, margin: '10px 10px 0 0', borderRadius: 5}}
                            />
                            <Search
                                onChange={this.courseSearchChange}
                                value={this.state.query}
                                placeholder="Tìm môn học theo tên"
                                className="white-seacrh margin-right-5 min-width-200-px form-group-none-padding"
                                onSearch={this.onSearchCourses}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {this.props.nani && <div className="col-md-12">
                            <div className="card" mask="purple">
                                <img className="img-absolute"/>

                                <div className="card-content">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="flex-row flex">
                                                <h2 className="card-title">
                                                    <strong>Quản lý môn học</strong>
                                                </h2>
                                            </div>
                                            <div/>
                                            <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                                                <Search
                                                    onChange={this.courseSearchChange}
                                                    value={this.state.query}
                                                    placeholder="Tìm kiếm môn học"
                                                    className="round-white-seacrh"
                                                    onSearch={this.onSearchCourses}
                                                />
                                                <CreateCourseOverlay className="btn btn-white btn-round btn-icon"/>
                                            </div>
                                        </div>
                                    </div>
                                    {/*to="/teaching/courses/create"*/}

                                </div>
                            </div>
                        </div>}


                        {this.props.isLoading ? <Loading/> :
                            (
                                this.props.coursesList && this.props.coursesList.length > 0 ? <ListCourse
                                        courses={this.props.coursesList}
                                        isDuplicating={this.props.isDuplicating}
                                        deleteCourse={this.deleteCourse}
                                        changeStatusCourse={this.changeStatusCourse}
                                        duplicateCourse={this.duplicateCourse}
                                        updateCourse={this.updateCourse}
                                        query={this.state.query}
                                    />
                                    :
                                    <div className="col-md-12">
                                        <EmptyData title={"Không có dữ liệu môn học"}/>
                                    </div>
                            )

                        }

                        <br/>
                        {
                            this.props.coursesList && this.props.coursesList.length > 0 &&
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả
                                    từ {this.props.paginator.total_count ? (this.props.paginator.current_page - 1) * this.props.paginator.limit + 1 : 0}
                                    - {this.props.paginator.current_page < this.props.paginator.total_pages ? this.props.paginator.current_page * this.props.paginator.limit : this.props.paginator.total_count}/{this.props.paginator.total_count}</b><br/>
                                <Pagination
                                    totalPages={this.props.paginator.total_pages}
                                    currentPage={this.props.paginator.current_page}
                                    loadDataPage={this.loadCourses || 0}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

CoursesContainer.propTypes = {
    coursesActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    coursesList: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isDeleting: PropTypes.bool,
    isDuplicating: PropTypes.bool,

};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        error: state.courses.error,
        coursesList: state.courses.coursesList,
        paginator: state.courses.paginator,
        isDeleting: state.courses.isDeleting,
        isDuplicating: state.courses.isDuplicating,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
