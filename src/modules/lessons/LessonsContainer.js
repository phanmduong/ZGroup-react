import React                            from 'react';
import PropTypes                        from 'prop-types';
import {bindActionCreators}             from 'redux';
import {connect}                        from 'react-redux';
import  * as lessonsActions             from './lessonsActions';
import {linkUploadImageEditor}          from '../../constants/constants';
import ReactEditor                      from '../../components/common/ReactEditor';
import FormInputText                    from '../../components/common/FormInputText';
import {Link}                           from 'react-router';
import Loading                          from "../../components/common/Loading";
import * as helper                      from '../../helpers/helper';
//let courseid;
class LessonsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.urlType = "create";
        this.updateFormData = this.updateFormData.bind(this);
        this.updateDetail       = this.updateDetail.bind(this);
        this.updateDetailContent       = this.updateDetailContent.bind(this);
        this.updateDetailTeacher       = this.updateDetailTeacher.bind(this);
        this.commitData       = this.commitData.bind(this);
        this.checkValidate      = this.checkValidate.bind(this);
    }

    componentWillMount() {
        //console.log('lesson container will mount',this.props);
        helper.setFormValidation('#form-lesson-create-edit');
        let id = this.props.params.lessonId;
        //courseid = this.props.params.courseId;
        //console.log('props',this.props);
        if(id) {
            this.props.lessonsActions.loadLessonData(id);
            this.urlType = "edit";

        } else this.props.lessonsActions.clearData(this.props.data.course_id);
    }

    updateDetail(content){
        this.props.lessonsActions.updateData('detail',content);
    }
    updateDetailContent(content){
        this.props.lessonsActions.updateData('detail_content',content);
    }
    updateDetailTeacher(content){
        this.props.lessonsActions.updateData('detail_teacher',content);
    }

    updateFormData(e){
        const   feild   = e.target.name;
        const   value   = e.target.value;
        this.props.lessonsActions.updateData(feild,value);
    }
    commitData(){
        //console.log('props',this.props);
        if(this.checkValidate())
        if(this.urlType=="create") this.props.lessonsActions.createLesson(this.props.data);
        else this.props.lessonsActions.editLesson(this.props.data);
    }

    checkValidate() {
        if ($('#form-lesson-create-edit').valid()) {
            return true;
        }
        return false;
    }

    render(){
        return (
            <div className="row">
                <form role="form" id="form-lesson-create-edit">

                    <div className="col-md-8">


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
                                            updateEditor={this.updateDetail}
                                            value={this.props.data.detail}
                                        />
                                    }

                                </div>

                            </div>
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose"><i
                                    className="material-icons">bookmark</i></div>
                                <div className="card-content">
                                    <h4 className="card-title">Nội dung khoá học</h4>
                                    {this.props.isLoading ? <Loading/> :
                                        <ReactEditor
                                            urlPost={linkUploadImageEditor()}
                                            fileField="image"
                                            name="detail_content"
                                            updateEditor={this.updateDetailContent}
                                            value={this.props.data.detail_content}
                                        />
                                    }

                                </div>

                            </div>
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose"><i
                                    className="material-icons">bookmark</i></div>
                                <div className="card-content">
                                    <h4 className="card-title">Chi tiết giảng viên</h4>
                                    {this.props.isLoading ? <Loading/> :
                                        <ReactEditor
                                            urlPost={linkUploadImageEditor()}
                                            fileField="image"
                                            name="detail_teacher"
                                            updateEditor={this.updateDetailTeacher}
                                            value={this.props.data.detail_teacher}
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
                            <div className="card-content">
                                <h4 className="card-title">Thông tin về form </h4>
                                <FormInputText
                                    label="Tên buổi học"
                                    required
                                    name="name"
                                    updateFormData={this.updateFormData}
                                    value={this.props.data.name}
                                />
                                <FormInputText
                                    label="Thứ tự"
                                    required
                                    name="order"
                                    updateFormData={this.updateFormData}
                                    value={this.props.data.order}
                                />
                                <FormInputText
                                    label="Mô tả ngắn"
                                    required
                                    name="description"
                                    updateFormData={this.updateFormData}
                                    value={this.props.data.description}
                                />

                                {this.props.isCommitting ?
                                    <button className="btn btn-rose btn-fill disabled" type="button">
                                        <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                    </button>
                                    :

                                    <div>
                                        <button
                                        className="btn btn-fill btn-rose"
                                        type="button"
                                        onClick={this.commitData}
                                        > Lưu </button>
                                        <Link className="btn btn-rose" to={`/manage/courses/edit/${this.props.data.course_id}/curriculum`}>
                                        Huỷ
                                        </Link>
                                    </div>
                                }


                            </div>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}


LessonsContainer.propTypes = {
    isLoading           : PropTypes.bool.isRequired,
    isCommitting        : PropTypes.bool,
    data                : PropTypes.object,
    lessonsActions      : PropTypes.object.isRequired,
    params              : PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading           : state.lessons.isLoading,
        isCommitting        : state.lessons.isCommitting,
        data                : state.lessons.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        lessonsActions: bindActionCreators(lessonsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonsContainer);

