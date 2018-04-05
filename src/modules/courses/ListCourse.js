import React from 'react';
import PropTypes from 'prop-types';
import * as helper from "../../helpers/helper";
import {connect} from 'react-redux';
import * as coursesActions from './coursesActions';
import {bindActionCreators} from 'redux';
import ChangeOrderCourseModal from "./ChangeCourseOrderModal";

import {browserHistory} from "react-router";

import Avatar from '../../components/common/Avatar';

import Switch from 'react-bootstrap-switch';

function prefixDataPost(data) {
    if (data.length > 40) {
        data = [...data.slice(0, 40), ' . . .'];
    }
    return data;
}

class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showChangeOrderModal: false,
            course: {},
        };
        
        this.deleteCourse = this.deleteCourse.bind(this);
        this.openChangeOrderModal = this.openChangeOrderModal.bind(this);
        this.closeChangeOrderModal = this.closeChangeOrderModal.bind(this);
        this.changeOrderCourse = this.changeOrderCourse.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps",nextProps);
    // }

    

    deleteCourse(courseId) {
        this.props.deleteCourse(courseId);
    }

    openChangeOrderModal(course){
        this.setState({showChangeOrderModal: true, course});
    }

    closeChangeOrderModal(){
        this.setState({showChangeOrderModal: false});
    }

    changeOrderCourse(order){
        return this.props.coursesActions.changeOrderCourse(this.state.course,order,()=>this.setState({showChangeOrderModal: false}));
    }
    
    render() {
        return (
            <div className="row">
            <ChangeOrderCourseModal
                show={this.state.showChangeOrderModal}
                onHide={this.closeChangeOrderModal}
                changeOrderCourse={this.changeOrderCourse}
            />
                {this.props.courses.map((course, index) => {
                    return (
                        <div className="col-sm-6 col-md-6 col-lg-4" id="card-email-template" key={index}>
                            <div className="card card-chart">
                                <div className="card-header" data-background-color="white" style={{
                                    borderRadius: '10px'
                                }}>

                                    <a onClick={(e) => {
                                        browserHistory.push("/teaching/courses/edit/" + course.id + "");
                                        e.stopPropagation();
                                    }}>
                                        <div id="simpleBarChart" className="ct-chart"
                                             style={{
                                                 width: '100%',
                                                 background: 'url(' + course.image_url + ')',
                                                 backgroundSize: 'cover',
                                                 backgroundPosition: 'center',
                                                 height: '200px',
                                                 borderRadius: '10px',
                                                 position: "relative"
                                             }}
                                        >


                                            {/*<div style={{position: "absolute", right : 0, margin : 10}}>*/}
                                                {/*{post.category ?*/}
                                                {/*<button className="tag btn btn-xs btn-danger"*/}
                                                {/*style={{marginLeft: 15, borderRadius: 10}}*/}
                                                {/*onClick={(e) => {*/}
                                                {/*this.props.loadByCategories(post.category.id);*/}
                                                {/*e.stopPropagation();*/}
                                                {/*}}*/}
                                                {/*>*/}
                                                {/*{post.category ? post.category.name : 'Không có'}</button>*/}
                                                {/*: null*/}
                                                {/*}*/}

                                            {/*</div>*/}
                                        </div>
                                    </a>
                                </div>


                                <div className="card-content">
                                    <div className="card-action row" style={{height: 90}}>
                                        <div className="col-md-9">
                                            <h4 className="card-title">
                                                <a onClick={(e) => {
                                                    browserHistory.push("/teaching/courses/edit/" + course.id + "");
                                                    e.stopPropagation();
                                                }}>
                                                    <strong> {prefixDataPost(course.description)}</strong>
                                                </a>
                                                {course.order_number && <label>Thứ tự: {course.order_number}</label>}
                                            </h4>
                                        </div>

                                        <div className="col-md-3" style={{marginRight : -20, display : "flex" , flexDirection : "column" , justifyContent : "space-between" }}>
                                            <div className="dropdown" style={{position : "relative" , left : "23"}}>
                                                <a className="dropdown-toggle btn-more-dropdown" type="button"
                                                   data-toggle="dropdown">
                                                    <i className="material-icons">more_horiz</i>
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">
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
                                                                <i className="material-icons">control_point_duplicate</i>
                                                                Nhân đôi
                                                            </a>
                                                        </li>
                                                    }
                                                    <li className="more-dropdown-item">
                                                        <a onClick={(event) => {
                                                            event.stopPropagation(event);
                                                            return this.openChangeOrderModal(course);
                                                        }}>
                                                            <i className="material-icons">autorenew</i> Đổi thứ tự
                                                        </a>
                                                    </li>

                                                </ul>
                                            </div>
                                            
                                            <Switch
                                                onChange={(e) => {
                                                    return this.props.changeStatusCourse(index, course ,e);
                                                }}
                                                value={course.status}
                                                onText="Hiện" offText="Ẩn"
                                                bsSize="mini"
                                            />

                                        </div>
                                    </div>




                                    <div style={{display: "flex", justifyContent: "space-between", height: 40}}>


                                        <div style={{display: "flex", alignItems: "center"}}>
                                            {course.icon_url ?
                                                <Avatar size={40} url={course.icon_url}
                                                        style={{borderRadius: 6}}/> : null}
                                            <div>
                                                <strong>{course.name}</strong><br/>
                                                <p className="category"
                                                   style={{fontSize: 12}}>{course.duration + " buổi"}</p>
                                            </div>
                                        </div>


                                        <div style={{display: "flex", alignItems: "center", color: "#76b031"}}>
                                            {helper.dotNumber(course.price)}


                                        </div>

                                    </div>


                                </div>
                            </div>
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

