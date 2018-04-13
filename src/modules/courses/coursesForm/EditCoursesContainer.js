/**
 * Created by Nangbandem.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';

import * as coursesActions from '../coursesActions';
// import {NO_IMAGE}                       from '../../../constants/env';
import Loading from "../../../components/common/Loading";
import * as helper from '../../../helpers/helper';

// import {CirclePicker}                   from 'react-color';
import {Link, IndexLink} from 'react-router';

// const btn ={
//     width: "100%",
// };

class EditCoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.urlType = "/create";
        this.state = {
            openModal: false
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.uploadLogo = this.uploadLogo.bind(this);
        this.uploadCover = this.uploadCover.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.commitCourseData = this.commitCourseData.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.backToList = this.backToList.bind(this);

    }


    componentWillMount() {
        helper.setFormValidation('#form-course-create-edit');
        let id = this.props.params.courseId;
        this.urlType = "/teaching/courses/" + (id ? "edit/" + id : "create");
        if (id) this.props.coursesActions.loadOneCourse(id);
        else this.props.coursesActions.deleteData();
        this.props.coursesActions.loadAllTypes();
        this.props.coursesActions.loadAllCategories();
    }

    componentDidMount() {
        helper.setFormValidation('#form-course-create-edit');
    }

    //
    // componentWillReceiveProps(nextProps){
    //     console.log("nextProps", nextProps);
    // }

    backToList() {
        this.props.coursesActions.backToList();
    }


    updateFormData(e) {
        const feild = e.target.name;
        const value = e.target.value;
        this.props.coursesActions.updateData(feild, value);
    }

    updateEditor(content) {
        let data = {...this.props.data};
        data.detail = content;
        this.props.coursesActions.updateData(data);
    }

    uploadAvatar(event) {
        let file = event.target.files[0];
        if (helper.checkFileSize(file, 2))
            this.props.coursesActions.uploadAvatar(file);
    }

    uploadLogo(event) {
        let file = event.target.files[0];
        if (helper.checkFileSize(file, 2))
            this.props.coursesActions.uploadLogo(file);

    }

    uploadCover(event) {
        let file = event.target.files[0];
        if (helper.checkFileSize(file, 2))
            this.props.coursesActions.uploadCover(file);
    }

    changeColor(color) {
        let data = {...this.props.data};
        data.color = color.hex;
        this.props.coursesActions.updateData(data);
    }

    commitCourseData() {
        if (this.checkValidate())
            this.props.coursesActions.commitCourseData(this.props.data);

    }

    checkValidate() {

        if ($('#form-course-create-edit').valid()) {

            if (helper.isEmptyInput(this.props.data.icon_url)) {
                helper.showTypeNotification('Vui lòng chọn ảnh icon', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.data.image_url)) {
                helper.showTypeNotification('Vui lòng chọn ảnh đại điện', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.data.cover_url)) {
                helper.showTypeNotification('Vui lòng chọn cover', 'warning');
                return false;
            }
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <form role="form" id="form-course-create-edit">
                        <div className="col-md-12">
                            <div className="row">
                                {this.props.isLoading ? <Loading/> :
                                    <div className="content">
                                        <div className="col-md-12">
                                            <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
                                                <li className={this.props.location.pathname === `${this.urlType}` ? 'active' : ''}>
                                                    <IndexLink to={`${this.urlType}`}>
                                                         TỔNG QUAN &#160;

                                                        <div className="ripple-container"/>
                                                    </IndexLink>
                                                </li>
                                                <li className={this.props.location.pathname === `${this.urlType}/curriculum` ? 'active' : ''}>
                                                    <Link to={`${this.urlType}/curriculum`}>
                                                         GIÁO TRÌNH &#160;
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                <li className={this.props.location.pathname === `${this.urlType}/documents` ? 'active' : ''}>
                                                    <Link to={`${this.urlType}/documents`}>
                                                         TÀI LIỆU NGOÀI &#160;
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                <li className={this.props.location.pathname === `${this.urlType}/pixel` ? 'active' : ''}>
                                                    <Link to={`${this.urlType}/pixel`}>
                                                         PIXEL &#160;
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                <li className={this.props.location.pathname === `${this.urlType}/term` ? 'active' : ''}>
                                                    <Link to={`${this.urlType}/term`}>
                                                        <i className="material-icons">create</i> HỌC PHẦN &#160;
                                                        <div className="ripple-container"/>
                                                    </Link>
                                                </li>
                                                {/*<li className={this.props.location.pathname === `${this.urlType}/interested` ? 'active' : ''}>*/}
                                                {/*<Link>*/}
                                                {/*<i className="material-icons">flag</i> QUAN TÂM &#160;*/}
                                                {/*<div className="ripple-container"/>*/}
                                                {/*</Link>*/}
                                                {/*</li>*/}
                                            </ul>
                                        </div>
                                        <div>{this.props.children}</div>




                                    </div>
                                }

                            </div>
                        </div>
                    </form>
                </div>

            </div>
        );
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

