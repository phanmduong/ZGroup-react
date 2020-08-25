/**
 * Created by Nangbandem.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
// import ReactEditor from '../../../components/common/ReactEditor';
import * as coursesActions from '../coursesActions';
// import {NO_IMAGE} from '../../../constants/env';
import Loading from "../../../components/common/Loading";
import * as helper from '../../../helpers/helper';
// import {linkUploadImageEditor} from '../../../constants/constants';
// import {CirclePicker} from 'react-color';
// import {Link, IndexLink}                from 'react-router';

// const btn = {
//     width: "100%",
// };

class CreateEditCoursesContainer extends React.Component {
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
                                {this.props.isLoadingCourse ? <Loading/> :
                                    <div className="content">
                                        <div className="col-md-12">


                                            <div>{this.props.children}</div>


                                            {/*<div className="">*/}
                                            {/*<div className="card">*/}
                                            {/*<div className="card-content">*/}
                                            {/*<div className="tab-content">*/}
                                            {/*<h4 className="card-title"><strong>Chi tiết khoá*/}
                                            {/*học</strong></h4><br/>*/}
                                            {/*{this.props.isLoading ? <Loading/> :*/}
                                            {/*<ReactEditor*/}
                                            {/*urlPost={linkUploadImageEditor()}*/}
                                            {/*fileField="image"*/}
                                            {/*name="detail"*/}
                                            {/*updateEditor={this.updateEditor}*/}
                                            {/*value={this.props.data.detail ? `<div>${this.props.data.detail}</div>` : ""}*/}
                                            {/*/>*/}
                                            {/*}*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                        </div>
                                        {/*<div className="col-md-4">*/}
                                        {/*<div className="card">*/}
                                        {/*<div className="card-content">*/}
                                        {/*<div className="tab-content">*/}
                                        {/*/!*<h4 className="card-title">*!/*/}
                                        {/*/!*<strong>Thông tin về form</strong>*!/*/}
                                        {/*/!*</h4>*!/*/}
                                        {/*</div>  */}
                                        {/*<br/>  */}
                                        {/*<img*/}
                                        {/*src={helper.isEmptyInput(this.props.data.icon_url) ? NO_IMAGE : this.props.data.icon_url}/>*/}
                                        {/*{this.props.isUpdatingLogo ?*/}
                                        {/*(*/}
                                        {/*<button className="btn btn-rose  disabled" type="button"*/}
                                        {/*style={btn}>*/}
                                        {/*<i className="fa fa-spinner fa-spin"/> Đang tải lên*/}
                                        {/*</button>*/}
                                        {/*)*/}
                                        {/*:*/}
                                        {/*(*/}
                                        {/*<button className="btn btn-fill btn-rose" type="button"*/}
                                        {/*style={btn}>*/}
                                        {/*Chọn ảnh icon*/}
                                        {/*<input type="file"*/}
                                        {/*accept=".jpg,.png,.gif"*/}
                                        {/*onChange={this.uploadLogo}*/}
                                        {/*style={{*/}
                                        {/*cursor: 'pointer',*/}
                                        {/*opacity: "0.0",*/}
                                        {/*position: "absolute",*/}
                                        {/*top: 0,*/}
                                        {/*left: 0,*/}
                                        {/*bottom: 0,*/}
                                        {/*right: 0,*/}
                                        {/*width: "100%",*/}
                                        {/*height: "100%"*/}
                                        {/*}}*/}
                                        {/*/>*/}
                                        {/*</button>*/}
                                        {/*)*/}
                                        {/*}*/}
                                        {/*<img*/}
                                        {/*src={helper.isEmptyInput(this.props.data.image_url) ? NO_IMAGE : this.props.data.image_url}/>*/}
                                        {/*{this.props.isUpdatingAvatar ?*/}
                                        {/*(*/}
                                        {/*<button className="btn btn-rose  disabled" type="button"*/}
                                        {/*style={btn}>*/}
                                        {/*<i className="fa fa-spinner fa-spin"/> Đang tải lên*/}
                                        {/*</button>*/}
                                        {/*)*/}
                                        {/*:*/}
                                        {/*(*/}
                                        {/*<button className="btn btn-fill btn-rose" type="button"*/}
                                        {/*style={btn}>*/}
                                        {/*Chọn ảnh đại diện*/}
                                        {/*<input type="file"*/}
                                        {/*accept=".jpg,.png,.gif"*/}
                                        {/*onChange={this.uploadAvatar}*/}
                                        {/*style={{*/}
                                        {/*cursor: 'pointer',*/}
                                        {/*opacity: "0.0",*/}
                                        {/*position: "absolute",*/}
                                        {/*top: 0,*/}
                                        {/*left: 0,*/}
                                        {/*bottom: 0,*/}
                                        {/*right: 0,*/}
                                        {/*width: "100%",*/}
                                        {/*height: "100%"*/}
                                        {/*}}*/}
                                        {/*/>*/}
                                        {/*</button>*/}
                                        {/*)*/}
                                        {/*}*/}
                                        {/*<img*/}
                                        {/*src={helper.isEmptyInput(this.props.data.cover_url) ? NO_IMAGE : this.props.data.cover_url}/>*/}
                                        {/*{this.props.isUpdatingCover ?*/}
                                        {/*(*/}
                                        {/*<button className="btn btn-rose  disabled" type="button"*/}
                                        {/*style={btn}>*/}
                                        {/*<i className="fa fa-spinner fa-spin"/> Đang tải lên*/}
                                        {/*</button>*/}
                                        {/*)*/}
                                        {/*:*/}
                                        {/*(*/}
                                        {/*<button className="btn btn-fill btn-rose" type="button"*/}
                                        {/*style={btn}>*/}
                                        {/*Chọn cover*/}
                                        {/*<input type="file"*/}
                                        {/*accept=".jpg,.png,.gif"*/}
                                        {/*onChange={this.uploadCover}*/}
                                        {/*style={{*/}
                                        {/*cursor: 'pointer',*/}
                                        {/*opacity: "0.0",*/}
                                        {/*position: "absolute",*/}
                                        {/*top: 0,*/}
                                        {/*left: 0,*/}
                                        {/*bottom: 0,*/}
                                        {/*right: 0,*/}
                                        {/*width: "100%",*/}
                                        {/*height: "100%"*/}
                                        {/*}}*/}
                                        {/*/>*/}
                                        {/*</button>*/}
                                        {/*)*/}
                                        {/*}*/}

                                        {/*<div className="card-content">*/}
                                        {/*<div className="tab-content"><h4 className="card-title"><strong>Chọn*/}
                                        {/*màu</strong></h4></div>*/}
                                        {/*<br/>*/}
                                        {/*<CirclePicker width="100%"*/}
                                        {/*color={this.props.data.color}*/}
                                        {/*onChangeComplete={this.changeColor}*/}
                                        {/*/>*/}
                                        {/*</div>*/}

                                        {/*{this.props.isCommitting ?*/}
                                        {/*<button className="btn btn-rose  disabled" type="button">*/}
                                        {/*<i className="fa fa-spinner fa-spin"/> Đang tải lên*/}
                                        {/*</button>*/}
                                        {/*:*/}


                                        {/*<button*/}
                                        {/*className="btn btn-fill btn-rose"*/}
                                        {/*type="button"*/}
                                        {/*onClick={this.commitCourseData}*/}
                                        {/*> Lưu </button>*/}

                                        {/*}*/}


                                        {/*</div>*/}
                                        {/*</div>*/}
                                        {/*</div>*/}
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

CreateEditCoursesContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCoursesContainer);

