import React from 'react';
import PropTypes from 'prop-types';
import * as helper from "../../helpers/helper";
import {connect} from 'react-redux';
import * as coursesActions from './coursesActions';
import {bindActionCreators} from 'redux';
import initialState from '../../reducers/initialState';

import {browserHistory} from "react-router";


class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.editCourse = this.editCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps",nextProps);
    // }

    editCourse(course) {
        this.props.coursesActions.loadCourses(course);
        initialState.coursesForm.data = course;
    }

    deleteCourse(courseId) {
        this.props.deleteCourse(courseId.id);
    }

    render() {
        return (
            <div className="row">
                {this.props.courses.map((course, index) => {
                    return (
                        <div className="col-sm-6 col-md-6 col-md-4 col-lg-3" key={index}>
                            <a className=" btn btn-default btn-lg row"
                               style={{
                                   width: '100%',
                                   background: 'white',
                                   color: 'rgb(69, 90, 100)',
                                   textAlign: 'left',
                                   padding: 0
                               }}
                               onClick={(e) => {
                                   browserHistory.push("/teaching/courses/edit/" + course.id + "");
                                   e.stopPropagation();
                               }}
                            >


                                <div style={{
                                    backgroundImage: 'url(' + course.image_url + ')',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center',
                                    paddingBottom: '70%'
                                }}/>






                                <div style={{
                                    fontSize: 12,
                                    marginTop: 10,
                                    padding: '5px 10px',
                                    whiteSpace: "pre-line",
                                    textTransform: "none",
                                    height : 130,
                                }}>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <strong> {course.name || "Chưa có tên"}</strong>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="dropdown"
                                                 style={{right: "10px"}}>
                                                <a className="dropdown-toggle btn-more-dropdown" type="button"
                                                   data-toggle="dropdown">
                                                    <i className="material-icons">more_horiz</i>
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu" >
                                                    <li className="more-dropdown-item">
                                                        <a onClick={() => {
                                                            event.stopPropagation(event);
                                                            browserHistory.push("/teaching/courses/edit/" + course.id + "");
                                                        }}>
                                                            <i className="material-icons">edit</i> Sửa
                                                        </a>

                                                    </li>
                                                    <li className="more-dropdown-item">
                                                        <a onClick={(event) => {
                                                            event.stopPropagation(event);
                                                            this.deleteCourse(course.id);
                                                        }}>
                                                            <i className="material-icons">delete</i> Xóa
                                                        </a>
                                                    </li>
                                                    {
                                                        !this.props.isDuplicating &&
                                                        <li className="more-dropdown-item">
                                                            <a onClick={(e) => {
                                                                e.stopPropagation(event);
                                                                return this.props.duplicateCourse(course);
                                                            }}>
                                                                <i className="material-icons">control_point_duplicate</i> Nhân đôi
                                                            </a>
                                                        </li>
                                                    }

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div><label>{course.duration + " buổi"} </label></div>
                                    <div><p>{course.description}</p></div>
                                </div>





                                <div >
                                    <div style={{
                                        height: 1,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        background:  course.color || "#B5B5B5",
                                        borderBottom: '1px',
                                    }}/>
                                    <div style={{
                                        color: course.color,
                                        fontSize: 13,
                                        display : "flex",
                                        alignItems : "center",
                                        flexDirection: "row-reverse",
                                        height : 30,
                                        bottom: 10,
                                        margin : 10,
                                    }}>
                                        {helper.dotNumber(course.price)}
                                    </div>
                                </div>

                            </a>
                        </div>


                    );
                })}
            </div>
        );
    }
}


ListCourse.propTypes = {
    courses: PropTypes.array.isRequired,
    coursesActions: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func,
    changeStatusCourse: PropTypes.func,
    duplicateCourse: PropTypes.func,
    isDuplicating: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        data: state.coursesCreateEdit.data,

    };
}


function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);

