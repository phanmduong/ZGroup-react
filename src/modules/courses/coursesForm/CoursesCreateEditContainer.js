/**
 * Created by Nangbandem.
 */
import React                            from 'react';
import {connect}                        from 'react-redux';
import PropTypes                        from 'prop-types';
import {bindActionCreators}             from 'redux';
import ReactEditor                      from '../../../components/common/ReactEditor';
import  * as coursesActions             from '../coursesActions';
import FormInputText                    from '../../../components/common/FormInputText';
import {NO_IMAGE}                       from '../../../constants/env';
import TabCourse                        from "../TabCourse";
import Loading                          from "../../../components/common/Loading";
import * as helper                      from '../../../helpers/helper';
import {linkUploadImageEditor}          from '../../../constants/constants';
import {CirclePicker}                   from 'react-color';



class CreateEditCoursesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
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
        //this.props.coursesActions.deleteData();
        console.log('will mount',this.props);
        let id = this.props.params.courseId;
        if(id) this.props.coursesActions.loadOneCourse(id);
        else this.props.coursesActions.deleteData();
    }
    componentDidMount() {
        helper.setFormValidation('#form-course-create-edit');
    }

    componentWillReceiveProps(nextProps){
        console.log('next props', nextProps);
        //if(!nextProps.data) nextProps = this.state;
        //this.setState(nextProps.data);
    }


    backToList(){
        this.props.coursesActions.backToList();
    }


    updateFormData(e){
        const   feild   = e.target.name;
        const   value   = e.target.value;
        this.props.coursesActions.updateData(feild,value);
        //let     data    = this.state;
        //data[feild]     = value;
        //this.setState(data);

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
            <div className="row">
                <form role="form" id="form-course-create-edit">
                <div className="col-md-12">
                        <div className="row">
                            {this.props.isLoading ? <Loading/> :
                            <div name='content'>
                                <div className="col-md-8">
                                <div className="card">

                                        <TabCourse url="/manage/courses/create/general"/>

                                    <div className="card-content">
                                        {
                                            <div>
                                                <div className="row">

                                                    <div className="col-md-12">
                                                        <FormInputText
                                                            label="Tên môn học"
                                                            required
                                                            name="name"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.name}
                                                        /></div>

                                                    <div className="col-md-6">
                                                        <FormInputText
                                                        label="Thời lượng"
                                                        required
                                                        name="duration"
                                                        updateFormData={this.updateFormData}
                                                        value={this.props.data.duration}
                                                        /></div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                            label="Giá"
                                                            required
                                                            name="price"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.price}
                                                        />
                                                    </div>

                                                    <div className="col-md-12">
                                                        <FormInputText
                                                            label="Mô tả ngắn"
                                                            required
                                                            name="description"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.description}
                                                        /></div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                        label="Link tải phần mềm trên Windows"
                                                        required
                                                        name="linkwindow"
                                                        updateFormData={this.updateFormData}
                                                        value={this.props.data.linkwindow}
                                                        /></div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                            label="Link hướng dẫn trên Windows"
                                                            required
                                                            name="window_how_install"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.window_how_install}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                        label="Link tải phần mềm trên Mac"
                                                        required
                                                        name="linkmac"
                                                        updateFormData={this.updateFormData}
                                                        value={this.props.data.linkmac}
                                                        /></div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                            label="Link hướng dẫn trên Mac"
                                                            required
                                                            name="mac_how_install"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.mac_how_install}
                                                        />
                                                    </div>

                                                </div>

                                                {this.props.isCommitting ?
                                                    <button className="btn btn-rose btn-fill disabled" type="button">
                                                        <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                                    </button>
                                                    :
                                                    ( this.props.commitSuccess ?

                                                                <button
                                                                    className="btn btn-fill btn-rose"
                                                                    type="button"
                                                                    onClick={this.commitCourseData}
                                                                > Lưu </button>
                                                        :

                                                            <button
                                                                className="btn btn-fill btn-rose"
                                                                type="button"
                                                                onClick={this.commitCourseData}
                                                            > Lưu </button>
                                                    )
                                                }
                                         </div>
                                        }
                                    </div>

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
        );
    }
}

CreateEditCoursesContainer.propTypes = {
    isLoading           : PropTypes.bool.isRequired,
    data                : PropTypes.object,
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
        commitSuccess       : state.courses.commitSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditCoursesContainer);
