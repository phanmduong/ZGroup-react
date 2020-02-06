/**
 * Created by Nangbandem.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import * as coursesActions from '../coursesActions';
import Loading from "../../../components/common/Loading";
import * as helper from '../../../helpers/helper';

import {Link, IndexLink, browserHistory} from 'react-router';
import {dotNumber} from "../../../helpers/helper";
import {CirclePicker} from "react-color";
import {Modal} from "react-bootstrap";
import CoursesCreateEditGeneral from "./CoursesCreateEditGeneral";
import CreateCurriculumOverlay from "../overlays/CreateLessonOverlay";
import CreateTermOverlay from "../overlays/CreateTermOverlay";
import CreateDocumentOverlay from "../overlays/CreateDocumentOverlay";

// const btn ={
//     width: "100%",
// };

class EditCoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.urlType = "/teaching/courses/edit/" + props.params.courseId;
        this.state = {
            openModalEdit: false
        };
    }


    componentWillMount() {
        let id = this.props.params.courseId;
        this.props.coursesActions.loadOneCourse(id);
        this.props.coursesActions.loadAllTypes();
        this.props.coursesActions.loadAllCategories();
    }

    closeModalEdit = () => {
        this.setState({openModalEdit: false});
    }

    openModalCreateExam = () => {
        this.props.coursesActions.toggleModalExam();
        console.log(`${this.urlType}/exam-template`);
        browserHistory.push(`${this.urlType}/exam-template`);
    }

    render() {
        const {data: course} = this.props
        return (
            <div className="margintop-10">
                <div className={"card"}>
                    <div className={"card-content"}>
                        {this.props.isLoading ? <Loading/> :
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card" mask="blue">
                                        <div className="card-content flex flex-col">
                                            <div className="flex flex-justify-content-center">
                                                <div className="img father"
                                                     style={{
                                                         backgroundImage: `url(${helper.validateLinkImage(course.icon_url)})`
                                                     }}>
                                                </div>
                                            </div>

                                            <h4 className="card-title  margintop-10">{course.name}</h4>

                                            <h6 className="category text-gray text-email"
                                                style={{textTransform: "none!important"}}>
                                                {course.description}

                                            </h6>
                                            <h6 className="category text-gray text-email">
                                                <span>{dotNumber(course.price)}đ</span>
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="card detail-wrap">
                                        <div className="card-content">
                                            <div className="detail-wrap">
                                                <p>Loại khóa
                                                    học<strong>{course.type ? course.type.name : "Chưa có"}</strong></p>
                                                <p>URL p/mềm (MAC) <strong><a href={course.linkmac}
                                                                              target="_blank">{course.linkmac || "Chưa có"}</a></strong>
                                                </p>
                                                <p>URL p/mềm (WINDOWS) <strong><a href={course.linkwindow}

                                                                                  target="_blank">{course.linkwindow || "Chưa có"}</a></strong>
                                                </p>
                                                <p>H/dẫn cài p/mềm
                                                    MAC <strong><a href={course.mac_how_install}
                                                                   target="_blank">{course.mac_how_install || "Chưa có"}</a></strong>
                                                </p>
                                                <p>H/dẫn cài p/mềm
                                                    WINDOWS <strong><a href={course.window_how_install}
                                                                       target="_blank">{course.window_how_install || "Chưa có"}</a></strong>
                                                </p>
                                                <p>URL Back image <strong><a href={course.back_image}
                                                                             target="_blank">{course.back_image || "Chưa có"}</a></strong>
                                                </p>
                                                <p>URL Front image <strong><a href={course.front_image}
                                                                              target="_blank">{course.front_image || "Chưa có"}</a></strong>
                                                </p>
                                                <p>Category<strong>{course.categories && course.categories.length > 0 ? course.categories[0].name : "Chưa có"}</strong>
                                                </p>
                                                <p>Landing Page URL<strong>{course.work || "Chưa có"}</strong></p>
                                            </div>
                                            <button className="btn width-100"
                                                    onClick={() => {
                                                        this.setState({openModalEdit: true})
                                                    }}
                                            >Sửa thông tin
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="tab-content"><h4 className="card-title"><strong>Chọn
                                            màu</strong>
                                        </h4></div>
                                        <br/>
                                        <CirclePicker width="100%"
                                                      color={course.color ? course.color : ""}
                                                      disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="flex flex-wrap" style={{marginTop: 5}}>
                                        <CreateCurriculumOverlay className="btn btn-silver"/>
                                        <CreateTermOverlay className="btn btn-silver"/>
                                        <CreateDocumentOverlay className="btn btn-silver"/>
                                        <div className="btn btn-silver"
                                             ref="target"
                                             onClick={this.openModalCreateExam}
                                        >
                                            Thêm bài kiểm tra
                                        </div>
                                    </div>
                                    <div className="margintop-10">
                                        <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                                            <li className={this.props.location.pathname === `${this.urlType}` ? 'active' : ''}>
                                                <IndexLink to={`${this.urlType}`}>
                                                    Chương trình học &#160;
                                                    <div className="ripple-container"/>
                                                </IndexLink>
                                            </li>
                                            <li className={this.props.location.pathname === `${this.urlType}/exam-template` ? 'active' : ''}>
                                                <Link to={`${this.urlType}/exam-template`}>
                                                    Bài kiểm tra &#160;
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                            <li className={this.props.location.pathname === `${this.urlType}/documents` ? 'active' : ''}>
                                                <Link to={`${this.urlType}/documents`}>
                                                    Tài liệu &#160;
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                            {/*<li className={this.props.location.pathname === `${this.urlType}/pixel` ? 'active' : ''}>*/}
                                            {/*    <Link to={`${this.urlType}/pixel`}>*/}
                                            {/*        Nhận xét &#160;*/}
                                            {/*        <div className="ripple-container"/>*/}
                                            {/*    </Link>*/}
                                            {/*</li>*/}
                                        </ul>
                                        {/*<div>{this.props.children}</div>*/}
                                    </div>
                                </div>
                                <Modal show={this.state.openModalEdit} bsSize="large">
                                    <Modal.Header closeButton
                                                  onHide={this.closeModalEdit}
                                                  closeLabel="Đóng">
                                        <Modal.Title>Sửa môn học</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{padding: 0}}>
                                        {this.state.openModalEdit &&
                                        <CoursesCreateEditGeneral closeModalEdit={this.closeModalEdit}/>}
                                    </Modal.Body>
                                </Modal>
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
        // return (<div>12</div>)
    }
}

EditCoursesContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    link: PropTypes.object,
    isUpdatingAvatar: PropTypes.bool,
    updateAvatarError: PropTypes.bool,
    isUpdatingLogo: PropTypes.bool,
    updateLogoError: PropTypes.bool,
    isUpdatingCover: PropTypes.bool,
    updateCoverError: PropTypes.bool,
    isCommitting: PropTypes.bool,
    commitSuccess: PropTypes.bool,
    coursesActions: PropTypes.object.isRequired,
    location: PropTypes.object,
    params: PropTypes.object,
    children: PropTypes.element,
    types: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        data: state.courses.data,
        isUpdatingAvatar: state.courses.isUpdatingAvatar,
        updateAvatarError: state.courses.updateAvatarError,
        isUpdatingLogo: state.courses.isUpdatingLogo,
        updateLogoError: state.courses.updateLogoError,
        isUpdatingCover: state.courses.isUpdatingCover,
        updateCoverError: state.courses.updateCoverError,
        isCommitting: state.courses.isCommitting,
        commitSuccess: state.courses.commitSuccess,
        link: state.courses.link,
        types: state.courses.types,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCoursesContainer);

