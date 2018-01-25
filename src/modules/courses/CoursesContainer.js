import React                    from 'react';
import {connect}                from 'react-redux';
import PropTypes                from 'prop-types';
import ListCourse               from './ListCourse';
import * as coursesActions      from './coursesActions';
import {bindActionCreators}     from 'redux';
import {Link}                   from 'react-router';
import Loading                  from "../../components/common/Loading";
import Search                   from "../../components/common/Search";
import _                        from 'lodash';
import * as helper              from '../../helpers/helper';

class CoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading   : false,
            error       : true,
            query       : "",
            page        : 1,
            paginator   :{
                current_page : 1,
                limit: 5,
                total_pages: 1,
                total_count: 1
            }
        };
        this.loadCourses                    = this.loadCourses.bind(this);
        this.deleteCourse                   = this.deleteCourse.bind(this);
        this.courseSearchChange             = this.courseSearchChange.bind(this);
        this.changeStatusCourse             = this.changeStatusCourse.bind(this);
        this.duplicateCourse                = this.duplicateCourse.bind(this);
    }

    componentWillMount() {
        this.props.coursesActions.loadCourses();
    }

    componentWillReceiveProps(nextProps){
        this.setState({paginator: nextProps.paginator});

    }

    loadCourses(page = 1) {
        this.setState({page});
        this.props.coursesActions.loadCourses(page);
    }

    deleteCourse(course) {
        helper.confirm('error', 'Xóa', "Bạn có muốn xóa môn học này không?", () => {
            this.props.coursesActions.deleteCourse(course, ()=>{
                return this.props.coursesActions.loadCourses(this.state.page);
            });
        });
    }


    courseSearchChange(value) {
        this.setState({
            page    : 1,
            query   : value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.coursesActions.loadCourses(1, value);
        }.bind(this), 500);
    }

    changeStatusCourse(index,course,e){
        this.props.coursesActions.changeStatusCourse(index,course);
        e.stopPropagation();
    }

    duplicateCourse(data){
        helper.confirm('warning', 'Duplicate', "Bạn có muốn duplicate môn học này không?", () => {
            this.props.coursesActions.duplicateCourse(data, ()=>{
                return this.props.coursesActions.loadCourses(this.state.page);
            });
        });
    }

    render() {

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">assignment</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Quản lý môn học</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-3">
                                                <Link className="btn btn-rose" to="/teaching/courses/create">
                                                    Thêm Môn Học
                                                </Link>
                                            </div>
                                            <Search
                                                className="col-md-9"
                                                placeholder="Tìm kiếm môn học"
                                                value={this.state.query}
                                                onChange={this.courseSearchChange}
                                            />
                                        </div>
                                    </div>

                                    {this.props.isLoading ? <Loading/> :
                                        <ListCourse
                                            courses={this.props.coursesList}
                                            isDuplicating={this.props.isDuplicating}
                                            deleteCourse={this.deleteCourse}
                                            changeStatusCourse={this.changeStatusCourse}
                                            duplicateCourse={this.duplicateCourse}
                                        />
                                    }
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.paginator.total_pages + 1).map(page => {

                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => {
                                                            this.loadCourses(page);
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => {
                                                            this.loadCourses(page);
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CoursesContainer.propTypes = {
    coursesActions  : PropTypes.object.isRequired,
    isLoading       : PropTypes.bool.isRequired,
    error           : PropTypes.bool.isRequired,
    coursesList     : PropTypes.array.isRequired,
    paginator       : PropTypes.object.isRequired,
    isDeleting      : PropTypes.bool,
    isDuplicating   : PropTypes.bool,

};

function mapStateToProps(state) {
    console.log(state.courses,"AAAAAAAA");
    return {
        isLoading   : state.courses.isLoading,
        error       : state.courses.error,
        coursesList : state.courses.coursesList,
        paginator   : state.courses.paginator,
        isDeleting  : state.courses.isDeleting,
        isDuplicating  : state.courses.isDuplicating,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);
