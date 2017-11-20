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

class LessonsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.updateFormData = this.updateFormData.bind(this);
        this.updateDetail       = this.updateDetail.bind(this);
        this.updateDetailContent       = this.updateDetailContent.bind(this);
        this.updateDetailTeacher       = this.updateDetailTeacher.bind(this);
        this.commitData       = this.commitData.bind(this);
    }

    componentWillMount() {
        console.log('lesson container will mount',this.props);
        let id = this.props.params.lessonId;
        if(id) this.props.lessonsActions.loadLessonData(id);
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
        //this.props.coursesActions.updateData(feild,value);
        this.props.lessonsActions.updateData(feild,value);
    }
    commitData(){
        this.props.lessonsActions.commitData(this.props.data);
    }

    render(){
        return (
            <div className="row">
                <form role="form" id="form-course-create-edit">

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
                                {
                                    this.props.data.course_id ?
                                    <FormInputText
                                        label="ID Môn học"
                                        required
                                        name="course_id"
                                        updateFormData={this.updateFormData}
                                        value={this.props.data.course_id}
                                    />
                                        :
                                    <div></div>
                                }
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
                                        <Link className="btn btn-rose" to="/manage/courses">
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
    coursesActions      : PropTypes.object.isRequired
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

