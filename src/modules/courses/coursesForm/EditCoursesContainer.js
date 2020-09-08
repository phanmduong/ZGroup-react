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
import {dotNumber} from '../../../helpers/helper';

import {browserHistory, IndexLink, Link} from 'react-router';
import {Modal} from "react-bootstrap";
import CoursesCreateEditGeneral from "./CoursesCreateEditGeneral";

const styleNavPills = {
    borderRadius: 5, textTransform: 'none', margin: 0, padding: '10px 20px'
};

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
    };

    openModalCreateExam = () => {
        this.props.coursesActions.toggleModalExam();
        console.log(`${this.urlType}/exam-template`);
        browserHistory.push(`${this.urlType}/exam-template`);
    };

    render() {
        const {data: course} = this.props;
        return (
            <div className="margin-top-10">
                {/*<div className={"card"}>*/}
                {/*    <div className={"card-content"}>*/}
                {this.props.isLoadingCourse ? <Loading/> :
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card none-margin radius-5" mask="blue">
                                <div className="card-content flex flex-col">
                                    <div className="flex flex-justify-content-center">
                                        <div className="img father"
                                             style={{
                                                 backgroundImage: `url(${helper.validateLinkImage(course.icon_url)})`
                                             }}/>
                                    </div>

                                    <h4 className="card-title  margin-top-10">{course.name}</h4>

                                    <div
                                        className="text-white flex flex-col flex-justify-content-center text-center">
                                        <div>{course.description}</div>
                                    </div>

                                    <h6 className="category text-gray text-email">
                                        <span>{dotNumber(course.price)}đ</span>
                                    </h6>
                                </div>
                            </div>
                            <div className="margin-bottom-10"/>
                            <div className="card radius-5 none-margin">
                                <div className="card-content">
                                    <div className="detail-wrap">
                                        {course.type && <p>Loại khóa
                                            học<strong>{course.type ? course.type.name : "Chưa có"}</strong></p>}
                                        {course.linkmac && <p>URL p/mềm (MAC) <strong><a href={course.linkmac}
                                                                      target="_blank">{course.linkmac || "Chưa có"}</a></strong>
                                        </p>}
                                        {course.linkwindow && <p>URL p/mềm (WINDOWS) <strong><a href={course.linkwindow}

                                                                          target="_blank">{course.linkwindow || "Chưa có"}</a></strong>
                                        </p>}
                                        {course.mac_how_install && <p>H/dẫn cài p/mềm
                                            MAC <strong><a href={course.mac_how_install}
                                                           target="_blank">{course.mac_how_install || "Chưa có"}</a></strong>
                                        </p>}
                                        {course.window_how_install && <p>H/dẫn cài p/mềm
                                            WINDOWS <strong><a href={course.window_how_install}
                                                               target="_blank">{course.window_how_install || "Chưa có"}</a></strong>
                                        </p>}
                                        {course.back_image && <p>URL Back image <strong><a href={course.back_image}
                                                                     target="_blank">{course.back_image || "Chưa có"}</a></strong>
                                        </p>}
                                        {course.front_image &&<p>URL Front image <strong><a href={course.front_image}
                                                                      target="_blank">{course.front_image || "Chưa có"}</a></strong>
                                        </p>}
                                        {course.categories && course.categories.length > 0 && <p>Category<strong>{course.categories && course.categories.length > 0 ? course.categories[0].name : "Chưa có"}</strong>
                                        </p>}

                                    </div>
                                    <div className="margin-bottom-10"/>
                                    <button className="btn button-green radius-5 width-100 none-margin"
                                            onClick={() => {
                                                this.setState({openModalEdit: true});
                                            }}
                                    >Sửa thông tin
                                    </button>
                                </div>
                            </div>
                            {/*<div className="card-content">*/}
                            {/*    <div className="tab-content"><h4 className="card-title"><strong>Màu khóa học</strong>*/}
                            {/*    </h4></div>*/}
                            {/*    <br/>*/}
                            {/*    <CirclePicker width="100%"*/}
                            {/*                  color={course.color ? course.color : ""}*/}
                            {/*                  disabled*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </div>
                        <div className="col-md-8">

                            <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                                <li className={this.props.location.pathname === `${this.urlType}` ? 'active' : ''}>
                                    <IndexLink to={`${this.urlType}`} style={styleNavPills}>
                                        Chương trình học &#160;
                                        <div className="ripple-container"/>
                                    </IndexLink>
                                </li>
                                <li className={this.props.location.pathname === `${this.urlType}/exam-template` ? 'active' : ''}>
                                    <Link to={`${this.urlType}/exam-template`} style={styleNavPills}>
                                        Bài kiểm tra &#160;
                                        <div className="ripple-container"/>
                                    </Link>
                                </li>
                                <li className={this.props.location.pathname === `${this.urlType}/documents` ? 'active' : ''}>
                                    <Link to={`${this.urlType}/documents`} style={styleNavPills}>
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
                            {this.props.children}

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

                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
        // return (<div>12</div>)
    }
}

EditCoursesContainer.propTypes = {
    isLoadingCourse: PropTypes.bool.isRequired,
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
        isLoadingCourse: state.courses.isLoadingCourse,
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

