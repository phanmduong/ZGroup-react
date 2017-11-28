/**
 * Created by Nangbandem.
 */
import React                            from 'react';
import {connect}                        from 'react-redux';
import PropTypes                        from 'prop-types';
import {bindActionCreators}             from 'redux';
import ReactEditor                      from '../../../components/common/ReactEditor';
import  * as coursesActions             from '../coursesActions';
import {NO_IMAGE}                       from '../../../constants/env';
import Loading                          from "../../../components/common/Loading";
import * as helper                      from '../../../helpers/helper';
import {linkUploadImageEditor}          from '../../../constants/constants';
import {CirclePicker}                   from 'react-color';
import {Link, IndexLink}                from 'react-router';
class CreateEditCoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.urlType = "/create";
        this.state ={
            openModal : false
        };
        this.updateFormData     = this.updateFormData.bind(this);
        this.uploadAvatar       = this.uploadAvatar.bind(this);
        this.uploadLogo         = this.uploadLogo.bind(this);
        this.uploadCover        = this.uploadCover.bind(this);
        this.changeColor        = this.changeColor.bind(this);
        this.commitCourseData   = this.commitCourseData.bind(this);
        this.updateEditor       = this.updateEditor.bind(this);
        this.checkValidate      = this.checkValidate.bind(this);
        this.backToList         = this.backToList.bind(this);

    }


    componentWillMount() {
        helper.setFormValidation('#form-course-create-edit');
        //console.log('will mount',this.props);
        let id = this.props.params.courseId;
        this.urlType ="/manage/courses/" + (id ? "edit/" + id : "create");
        if(id) this.props.coursesActions.loadOneCourse(id);
        else this.props.coursesActions.deleteData();
    }
    componentDidMount() {
        helper.setFormValidation('#form-course-create-edit');
    }

    componentWillReceiveProps(nextProps){
        console.log('next props', nextProps);
    }


    backToList(){
        this.props.coursesActions.backToList();
    }


    updateFormData(e){
        const   feild   = e.target.name;
        const   value   = e.target.value;
        this.props.coursesActions.updateData(feild,value);
    }

    updateEditor(content){
        this.props.coursesActions.updateData('detail', content);
    }

    uploadAvatar(event){
        let file = event.target.files[0];
        this.props.coursesActions.uploadAvatar(file);
    }
    uploadLogo(event){
        let file = event.target.files[0];
        this.props.coursesActions.uploadLogo(file);

    }
    uploadCover(event){
        let file = event.target.files[0];
        this.props.coursesActions.uploadCover(file);
    }

    changeColor(color){
        let data    = this.state;
        data.color  = color.hex;
        //this.setState(data);
        this.props.coursesActions.updateData('color', color.hex);
    }

    commitCourseData(){
        if(this.checkValidate())
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
                            <div name="content">
                                <div className="col-md-8">
                                <div className="card">

                                    <div className="card-header card-header-tabs" data-background-color="rose">
                                        <div className="nav-tabs-navigation">
                                            <div className="nav-tabs-wrapper">
                                                <ul className="nav nav-tabs" data-tabs="tabs">
                                                    <li className={this.props.location.pathname === `${this.urlType}` ? 'active' : ''}>
                                                        <IndexLink to={`${this.urlType}`}>
                                                            <i className="material-icons">account_circle</i> TỔNG QUAN

                                                            <div className="ripple-container" />
                                                        </IndexLink>
                                                    </li>
                                                    <li className={this.props.location.pathname === `${this.urlType}/curriculum` ? 'active' : ''}>
                                                        <Link to={`${this.urlType}/curriculum`}>
                                                            <i className="material-icons">smartphone</i> GIÁO TRÌNH
                                                            <div className="ripple-container" />
                                                        </Link>
                                                    </li>
                                                    <li className={this.props.location.pathname === `${this.urlType}/documents` ? 'active' : ''}>
                                                        <Link to={`${this.urlType}/documents`}>
                                                            <i className="material-icons">add_box</i> TÀI LIỆU NGOÀI
                                                            <div className="ripple-container" />
                                                        </Link>
                                                    </li>
                                                    <li className={this.props.location.pathname === `${this.urlType}/studying` ? 'active' : ''}>
                                                        <Link>
                                                            <i className="material-icons">create</i> HỌC TẬP
                                                            <div className="ripple-container" />
                                                        </Link>
                                                    </li>
                                                    <li className={this.props.location.pathname === `${this.urlType}/interested` ? 'active' : ''}>
                                                        <Link>
                                                            <i className="material-icons">flag</i> QUAN TÂM
                                                            <div className="ripple-container" />
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>{this.props.children}</div>

                                </div>

                                 <div className="">
                                     <div className="card">
                                         <div className="card-header card-header-icon" data-background-color="rose"><i
                                             className="material-icons">bookmark</i></div>
                                         <div className="card-content">
                                             <h4 className="card-title">Chi tiết khoá học</h4>
                                             {this.props.isLoading ? <Loading/> :
                                                 <ReactEditor
                                                     urlPost={linkUploadImageEditor()}
                                                     fileField="image"
                                                     name="detail"
                                                     updateEditor={this.updateEditor}

                                                     value={this.props.data.detail ? this.props.data.detail : ""}
                                                 />
                                             }

                                         </div>

                                     </div>
                                 </div>
                             </div>
                                <div className="col-md-4">
                                <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">announcement</i>
                                </div>
                                <div className="card-content"><h4 className="card-title">Thông tin về form </h4>


                                <img src = {helper.isEmptyInput(this.props.data.icon_url) ? NO_IMAGE : this.props.data.icon_url} />
                            { this.props.isUpdatingLogo ?
                                (
                                <button className="btn btn-rose btn-round disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                </button>
                                )
                                :
                                (
                                <button className="btn btn-fill btn-rose" type="button">
                                Chọn ảnh icon
                                <input type="file"
                                accept=".jpg,.png,.gif"
                                onChange={this.uploadLogo}
                                style={{
                                cursor: 'pointer',
                                opacity: "0.0",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: "100%",
                                height: "100%"
                                }}
                                />
                                </button>
                                )
                            }
                                <img src = {helper.isEmptyInput(this.props.data.image_url) ? NO_IMAGE : this.props.data.image_url} />
                            { this.props.isUpdatingAvatar ?
                                (
                                <button className="btn btn-rose btn-round disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                </button>
                                )
                                :
                                (
                                <button className="btn btn-fill btn-rose" type="button">
                                Chọn ảnh đại diện
                                <input type="file"
                                accept=".jpg,.png,.gif"
                                onChange={this.uploadAvatar}
                                style={{
                                cursor: 'pointer',
                                opacity: "0.0",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: "100%",
                                height: "100%"
                            }}
                                />
                                </button>
                                )
                            }
                                <img src = {helper.isEmptyInput(this.props.data.cover_url) ? NO_IMAGE : this.props.data.cover_url} />
                            { this.props.isUpdatingCover ?
                                (
                                <button className="btn btn-rose btn-round disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                </button>
                                )
                                :
                                (
                                <button className="btn btn-fill btn-rose" type="button">
                                Chọn cover
                                <input type="file"
                                accept=".jpg,.png,.gif"
                                onChange={this.uploadCover}
                                style={{
                                cursor: 'pointer',
                                opacity: "0.0",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: "100%",
                                height: "100%"
                            }}
                                />
                                </button>
                                )
                            }

                                <div className="card-content">
                                <h4 className="card-title">Chọn màu</h4>
                                <CirclePicker width="100%"
                                color={this.props.data.color}
                                onChangeComplete={this.changeColor}
                                />
                                </div>

                            {this.props.isCommitting ?
                                <button className="btn btn-rose btn-round disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                </button>
                                :


                                <button
                                className="btn btn-fill btn-rose"
                                type="button"
                                onClick={this.commitCourseData}
                                > Lưu </button>

                            }


                                </div>
                                </div>
                                </div>
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
    isLoading           : PropTypes.bool.isRequired,
    data                : PropTypes.object,
    link                : PropTypes.object,
    isUpdatingAvatar    : PropTypes.bool,
    updateAvatarError   : PropTypes.bool,
    isUpdatingLogo      : PropTypes.bool,
    updateLogoError     : PropTypes.bool,
    isUpdatingCover     : PropTypes.bool,
    updateCoverError    : PropTypes.bool,
    isCommitting        : PropTypes.bool,
    commitSuccess       : PropTypes.bool,
    coursesActions      : PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading           : state.courses.isLoading,
        data                : state.courses.data,
        isUpdatingAvatar    : state.courses.isUpdatingAvatar,
        updateAvatarError   : state.courses.updateAvatarError,
        isUpdatingLogo      : state.courses.isUpdatingLogo,
        updateLogoError     : state.courses.updateLogoError,
        isUpdatingCover     : state.courses.isUpdatingCover,
        updateCoverError    : state.courses.updateCoverError,
        isCommitting        : state.courses.isCommitting,
        commitSuccess       : state.courses.commitSuccess,
        link                : state.courses.link,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCoursesContainer);
