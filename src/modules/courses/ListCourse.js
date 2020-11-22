import React from 'react';
import PropTypes from 'prop-types';
import * as helper from "../../helpers/helper";
import {connect} from 'react-redux';
import * as coursesActions from './coursesActions';
import {bindActionCreators} from 'redux';
import ChangeOrderCourseModal from "./ChangeCourseOrderModal";
import * as ReactDOM from "react-dom";
import Switch from 'react-bootstrap-switch';
import Link from "react-router/es/Link";
import {Modal, Overlay} from "react-bootstrap";
import CoursesCreateEditGeneral from "./coursesForm/CoursesCreateEditGeneral";
import ParentCourseOverlay from "./overlays/ParentCourseOverlay";
import {getParentCourses} from "./courseApi";

// function prefixDataPost(data) {
//     if (data.length > 40) {
//         data = [...data.slice(0, 40), ' . . .'];
//     }
//     return data;
// }

class ListCourse extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showChangeOrderModal: false,
            course: {},
            openModalEdit: false,
            parentCourses: [],
            showOverlay: [],
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps",nextProps);
    // }

    componentDidMount() {
        getParentCourses().then((res) => {
            this.setState({parentCourses: res.data.courses});
        });
    }

    updateParentCourse = (parentCourse, isEdit = false) => {
        let parentCourses = this.state.parentCourses;
        if (isEdit) {
            parentCourses = parentCourses.map((item) => {
                if (item.id == parentCourse.id) {
                    return {...parentCourse};
                } else {
                    return {...item};
                }
            });
        } else {
            parentCourses = [...parentCourses, parentCourse];
        }

        this.setState({parentCourses});
    };


    closeModalEdit = () => {
        this.setState({openModalEdit: false});
    };

    deleteCourse = (courseId) => {
        this.props.deleteCourse(courseId);
    };

    openChangeOrderModal = (course) => {
        this.setState({showChangeOrderModal: true, course});
    };

    closeChangeOrderModal = () => {
        this.setState({showChangeOrderModal: false});
    };

    changeOrderCourse = (order) => {
        return this.props.coursesActions.changeOrderCourse(
            this.state.course, order,
            () => {
                this.setState({showChangeOrderModal: false});
                this.props.coursesActions.loadCourses(this.props.paginator.current_page, this.props.query);
            }
        );
    };

    toggleOverlay = (key) => {
        let showOverlay = [...this.props.courses].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };

    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    render() {
        return (


            <div className="col-md-12">
                <ChangeOrderCourseModal
                    show={this.state.showChangeOrderModal}
                    onHide={this.closeChangeOrderModal}
                    changeOrderCourse={this.changeOrderCourse}
                />
                <div className="table-sticky-head table-split" radius="five">
                    <table className="table" cellSpacing="0">
                        <thead className="text-rose">
                        <tr>
                            <th/>
                            <th>Tên môn học</th>
                            <th>Mô tả</th>
                            <th>Trạng thái</th>
                            <th>Thời lượng</th>
                            <th>Học phí</th>
                            <th>Chương trình học</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.courses.map((course, index) => {
                                return (
                                    <tr key={course.id}>
                                        <td>
                                            <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                    data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                    data-placement="right"
                                                    data-original-title={course.name}>
                                                <img src={course.icon_url} alt=""/>
                                            </button>
                                        </td>

                                        <td>
                                            <Link to={"/teaching/courses/edit/" + course.id}>
                                                <strong data-toggle="tooltip"
                                                        title={course.description}> {course.name}</strong>
                                            </Link>
                                        </td>
                                        <td>
                                            {course.description}
                                        </td>
                                        <td>
                                            <div style={{
                                                height: '20px'
                                            }}>
                                                <Switch
                                                    onChange={(e) => {
                                                        return this.props.changeStatusCourse(index, course, e);
                                                    }}
                                                    value={course.status}
                                                    onText="Hiện" offText="Ẩn"
                                                    bsSize="mini"
                                                    onColor="success"
                                                />
                                            </div>
                                        </td>

                                        <td>{course.duration + " buổi"}</td>
                                        <td>{helper.dotNumber(course.price)}</td>
                                        <td>
                                            <ParentCourseOverlay
                                                className="btn status-overlay btn-xs"
                                                parentCourses={this.state.parentCourses}
                                                selectedParentId={course.parent_id}
                                                updateParentCourse={this.updateParentCourse}
                                                // onChange={(term) => this.selectedTerm(lesson, term)}
                                                onChange={(parentCourse) => {
                                                    const courseData = {...course};
                                                    courseData.parent_id = parentCourse ? parentCourse.id : '';
                                                    this.props.updateCourse(courseData);
                                                }}
                                                styleOverlay={{marginLeft: -155}}
                                                style={{width: '100%'}}
                                            />
                                        </td>
                                        <td>
                                            <div style={{position: "relative"}}
                                                 className="cursor-pointer" mask="table-btn-action">
                                                <div ref={'target' + index} onClick={() => this.toggleOverlay(index)}
                                                     className="flex flex-justify-content-center cursor-pointer">
                                                    <i className="material-icons">more_horiz</i>
                                                </div>
                                                <Overlay
                                                    rootClose={true}
                                                    show={this.state.showOverlay[index]}
                                                    onHide={() => this.closeOverlay(index)}
                                                    placement="bottom"
                                                    container={() => ReactDOM.findDOMNode(this.refs['target' + index]).parentElement}
                                                    target={() => ReactDOM.findDOMNode(this.refs['target' + index])}>
                                                    <div className="kt-overlay overlay-container"
                                                         mask="table-btn-action" style={{
                                                        width: 150,
                                                        marginTop: 10,
                                                        left: -115,
                                                    }} onClick={() => this.closeOverlay(index)}>
                                                        {this.props.user.role == 2 && <button type="button"
                                                                                              className="btn btn-white width-100"
                                                                                              onClick={() => {
                                                                                                  this.props.coursesActions.loadOneCourse(course.id);
                                                                                                  this.setState({openModalEdit: true});
                                                                                                  // browserHistory.push("/teaching/courses/edit/" + course.id + "");
                                                                                                  // e.stopPropagation();
                                                                                              }}>
                                                            Sửa thông tin
                                                        </button>}
                                                        <button type="button"
                                                                className="btn btn-white width-100"
                                                                onClick={() => this.props.duplicateCourse(course)}>
                                                            Nhân đôi
                                                        </button>
                                                        {this.props.user.role == 2 && <button type="button"
                                                                                              className="btn btn-white width-100"
                                                                                              onClick={() => this.deleteCourse(course.id)}>
                                                            Xóa
                                                        </button>}
                                                    </div>
                                                </Overlay>
                                            </div>
                                            {/*<div*/}
                                            {/*    className="flex flex-space-between flex-align-items-center flex-end">*/}

                                            {/*    <ButtonGroupAction*/}
                                            {/*        delete={() => this.deleteCourse(course.id)}*/}
                                            {/*        object={course}*/}
                                            {/*        disabledDelete={this.props.user.role != 2}*/}
                                            {/*        edit={() => {*/}
                                            {/*            this.props.coursesActions.loadOneCourse(course.id);*/}
                                            {/*            this.setState({openModalEdit: true});*/}
                                            {/*            // browserHistory.push("/teaching/courses/edit/" + course.id + "");*/}
                                            {/*            // e.stopPropagation();*/}
                                            {/*        }}*/}
                                            {/*    >*/}

                                            {/*        <a onClick={(e) => {*/}
                                            {/*            e.stopPropagation(event);*/}
                                            {/*            return this.props.duplicateCourse(course);*/}
                                            {/*        }} data-toggle="tooltip" title="Nhân đôi">*/}
                                            {/*            <i className="material-icons">control_point_duplicate</i>*/}

                                            {/*        </a>*/}

                                            {/*        /!*<a onClick={(event) => {*!/*/}
                                            {/*        /!*    event.stopPropagation(event);*!/*/}
                                            {/*        /!*    return this.openChangeOrderModal(course);*!/*/}
                                            {/*        /!*}} data-toggle="tooltip" title="Đổi thứ tự">*!/*/}
                                            {/*        /!*    <i className="material-icons">autorenew</i>*!/*/}
                                            {/*        /!*</a>*!/*/}
                                            {/*        /!*<a href={LINK_REGISTER_COURSE + "/" + course.id}*!/*/}
                                            {/*        /!*   target="_blank" title="Lấy link" data-toggle="tooltip">*!/*/}
                                            {/*        /!*    <i className="material-icons">link</i>*!/*/}
                                            {/*        /!*</a>*!/*/}
                                            {/*    </ButtonGroupAction>*/}
                                            {/*</div>*/}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <Modal show={this.state.openModalEdit} bsSize="large" onHide={this.closeModalEdit}>
                    <Modal.Header closeButton

                                  closeLabel="Đóng">
                        <Modal.Title>Sửa môn học</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding: 0}}>
                        {this.state.openModalEdit &&
                        <CoursesCreateEditGeneral closeModalEdit={this.closeModalEdit}/>}
                    </Modal.Body>
                </Modal>
            </div>
            // {this.props.courses.map((course, index) => {
            //     return (
            //         <div className="col-sm-6 col-md-6 col-lg-4" id="card-email-template" key={index}>
            //             <div className="card card-chart">
            //                 <div className="card-header" data-background-color="white" style={{
            //                     borderRadius: '10px'
            //                 }}>
            //
            //                     <a onClick={(e) => {
            //                         browserHistory.push("/teaching/courses/edit/" + course.id + "");
            //                         e.stopPropagation();
            //                     }}>
            //                         <div id="simpleBarChart" className="ct-chart"
            //                              style={{
            //                                  width: '100%',
            //                                  background: 'url(' + course.image_url + ')',
            //                                  backgroundSize: 'cover',
            //                                  backgroundPosition: 'center',
            //                                  height: '200px',
            //                                  borderRadius: '10px',
            //                                  position: "relative"
            //                              }}
            //                         >
            //
            //
            //                             {/*<div style={{position: "absolute", right : 0, margin : 10}}>*/}
            //                             {/*{post.category ?*/}
            //                             {/*<button className="tag btn btn-xs btn-danger"*/}
            //                             {/*style={{marginLeft: 15, borderRadius: 10}}*/}
            //                             {/*onClick={(e) => {*/}
            //                             {/*this.props.loadByCategories(post.category.id);*/}
            //                             {/*e.stopPropagation();*/}
            //                             {/*}}*/}
            //                             {/*>*/}
            //                             {/*{post.category ? post.category.name : 'Không có'}</button>*/}
            //                             {/*: null*/}
            //                             {/*}*/}
            //
            //                             {/*</div>*/}
            //                         </div>
            //                     </a>
            //                 </div>
            //
            //
            //                 <div className="card-content">
            //                     <div className="card-action">
            //                         <div>
            //                             <h4 className="card-title">
            //                                 <a onClick={(e) => {
            //                                     browserHistory.push("/teaching/courses/edit/" + course.id + "");
            //                                     e.stopPropagation();
            //                                 }}>
            //                                     <strong data-toggle="tooltip"
            //                                             title={course.description}> {course.name}</strong>
            //                                 </a>
            //                                 {/*{course.order_number && <label>Thứ tự: {course.order_number}</label>}*/}
            //
            //                             </h4>
            //                         </div>
            //
            //                         <div className="col-md-3" style={{
            //                             display: "flex",
            //                             flexDirection: "column",
            //                             justifyContent: "space-between"
            //                         }}>
            //                             <div className="dropdown" style={{position: "relative", left: "23"}}>
            //                                 <a className="dropdown-toggle btn-more-dropdown" type="button"
            //                                    data-toggle="dropdown">
            //                                     <i className="material-icons">more_horiz</i>
            //                                 </a>
            //                                 <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">
            //                                     <li className="more-dropdown-course">
            //                                         <a onClick={() => {
            //                                             event.stopPropagation(event);
            //                                             browserHistory.push("/teaching/courses/edit/" + course.id + "");
            //                                         }}>
            //                                             <i className="material-icons">edit</i> Sửa
            //                                         </a>
            //
            //                                     </li>
            //                                     <li className="more-dropdown-course">
            //                                         <a onClick={(event) => {
            //                                             event.stopPropagation(event);
            //                                             this.deleteCourse(course.id);
            //                                         }}>
            //                                             <i className="material-icons">delete</i> Xóa
            //                                         </a>
            //                                     </li>
            //                                     {
            //                                         !this.props.isDuplicating &&
            //                                         <li className="more-dropdown-course">
            //                                             <a onClick={(e) => {
            //                                                 e.stopPropagation(event);
            //                                                 return this.props.duplicateCourse(course);
            //                                             }}>
            //                                                 <i className="material-icons">control_point_duplicate</i>
            //                                                 Nhân đôi
            //                                             </a>
            //                                         </li>
            //                                     }
            //                                     <li className="more-dropdown-course">
            //                                         <a onClick={(event) => {
            //                                             event.stopPropagation(event);
            //                                             return this.openChangeOrderModal(course);
            //                                         }}>
            //                                             <i className="material-icons">autorenew</i> Đổi thứ tự
            //                                         </a>
            //                                     </li>
            //                                     <li className="more-dropdown-course">
            //                                         <a href={LINK_REGISTER_COURSE + "/" + course.id}
            //                                            target="_blank">
            //                                             <i className="material-icons">link</i> Lấy link
            //                                         </a>
            //                                     </li>
            //
            //                                 </ul>
            //                             </div>
            //
            //
            //                         </div>
            //                     </div>
            //
            //
            //                     <div style={{display: "flex", justifyContent: "space-between", height: 40}}>
            //
            //
            //                         <div style={{display: "flex", aligncourses: "center"}}>
            //                             {course.icon_url ?
            //                                 <Avatar size={40} url={course.icon_url}
            //                                         style={{borderRadius: 6}}/> : null}
            //                             <div>
            //                                 <strong>{helper.dotNumber(course.price)}</strong><br/>
            //                                 <p className="category"
            //                                    style={{fontSize: 12}}>{course.duration + " buổi"}</p>
            //                             </div>
            //                         </div>
            //
            //
            //                         {/*<div style={{ display: "flex", aligncourses: "center", color: "#76b031" }}>*/}
            //                         {/*{helper.dotNumber(course.price)}*/}
            //
            //
            //                         {/*</div>*/}
            //                         <div style={{
            //                             height: '20px'
            //                         }}>
            //                             <Switch
            //                                 onChange={(e) => {
            //                                     return this.props.changeStatusCourse(index, course, e);
            //                                 }}
            //                                 value={course.status}
            //                                 onText="Hiện" offText="Ẩn"
            //                                 bsSize="mini"
            //                             />
            //                         </div>
            //
            //                     </div>
            //
            //
            //                 </div>
            //             </div>
            //         </div>
            //
            //     );
            // })}


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
    query: PropTypes.string,
    paginator: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
    return {
        data: state.coursesCreateEdit.data,
        user: state.login.user,
        paginator: state.courses.paginator,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);

