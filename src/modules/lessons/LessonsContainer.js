import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as lessonsActions from './lessonsActions';
import { linkUploadImageEditor } from '../../constants/constants';
import ReactEditor from '../../components/common/ReactEditor';
import FormInputText from '../../components/common/FormInputText';
import { Link } from 'react-router';
import Loading from "../../components/common/Loading";
import ImageUploader from "../../components/common/ImageUploader";
import * as helper from '../../helpers/helper';
import { NO_IMAGE } from "../../constants/env";
import ReactSelect from 'react-select';

let courseid;
class LessonsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};
        this.urlType = "create";
        this.updateFormData = this.updateFormData.bind(this);
        this.updateDetail = this.updateDetail.bind(this);
        this.updateDetailContent = this.updateDetailContent.bind(this);
        this.updateDetailTeacher = this.updateDetailTeacher.bind(this);
        this.commitData = this.commitData.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.uploadLessonIcon = this.uploadLessonIcon.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-lesson-create-edit');
        let id = this.props.params.lessonId;
        courseid = this.props.params.courseId;
        if (id) {
            this.props.lessonsActions.loadLessonData(id);
            this.urlType = "edit";

        } else this.props.lessonsActions.clearData(courseid);
        this.props.lessonsActions.loadTerms(courseid);
    }

    componentDidMount() {
        helper.setFormValidation('#form-lesson-create-edit');
    }

    componentWillReceiveProps(nextProps) {
        if (this.urlType == "create" && this.props.terms.length != nextProps.terms.length) {
            this.props.lessonsActions.updateData("term_id", nextProps.terms[0].id);
        } else if (this.urlType == "edit" && this.props.terms.length != nextProps.terms.length && !nextProps.data.term_id) {

            this.props.lessonsActions.updateData("term_id", nextProps.terms[0].id);
        }
    }

    updateDetail(content) {
        this.props.lessonsActions.updateData('detail', content);
    }
    updateDetailContent(content) {
        this.props.lessonsActions.updateData('detail_content', content);
    }
    updateDetailTeacher(content) {
        this.props.lessonsActions.updateData('detail_teacher', content);
    }

    updateFormData(e) {
        const feild = e.target.name;
        const value = e.target.value;
        this.props.lessonsActions.updateData(feild, value);
    }
    commitData() {
        if (this.checkValidate())
            if (this.urlType == "create") this.props.lessonsActions.createLesson(this.props.data, courseid);
            else this.props.lessonsActions.editLesson(this.props.data);
    }

    checkValidate() {
        if ($('#form-lesson-create-edit').valid()) {
            if (helper.isEmptyInput(this.props.data.image_url) || this.props.data.image_url == NO_IMAGE) {
                helper.showWarningNotification("Vui lòng chọn ảnh");
                return false;
            }

            if (helper.isEmptyInput(this.props.data.term_id)) {
                if (this.props.terms.length <= 0)
                    helper.showWarningNotification("Vui lòng tạo học phần");
                else
                    helper.showWarningNotification("Vui lòng chọn học phần");
                return false;
            }
            return true;
        }
        return false;
    }

    uploadLessonIcon(url) {

        this.props.lessonsActions.uploadLessonIcon(url);
    }


    render() {
        let { terms } = this.props;
        return (
            <div className="row">
                <form role="form" id="form-lesson-create-edit">

                    <div className="col-md-8">
                        <div className="">
                            {/*<div className="card">*/}
                            {/*<div className="card-header card-header-icon" data-background-color="rose"><i*/}
                            {/*className="material-icons">bookmark</i></div>*/}
                            {/*<div className="card-content">*/}
                            {/*<h4 className="card-title">Chi tiết khoá học</h4>*/}
                            {/*{this.props.isLoading ? <Loading/> :*/}
                            {/*<ReactEditor*/}
                            {/*urlPost={linkUploadImageEditor()}*/}
                            {/*fileField="image"*/}
                            {/*name="detail"*/}
                            {/*updateEditor={this.updateDetail}*/}
                            {/*value={this.props.data.detail ? `<div>${this.props.data.detail}</div>` : ""}*/}
                            {/*/>*/}
                            {/*}*/}

                            {/*</div>*/}

                            {/*</div>*/}
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Nội dung giáo trình</strong>
                                        </h4>
                                        <br />
                                        {this.props.isLoading ? <Loading /> :
                                            <ReactEditor
                                                urlPost={linkUploadImageEditor()}
                                                fileField="image"
                                                name="detail_content"
                                                updateEditor={this.updateDetailContent}
                                                value={this.props.data.detail_content ? `<div>${this.props.data.detail_content}</div>` : ""}
                                            />
                                        }
                                    </div>
                                </div>

                            </div>
                            {/*<div className="card">*/}
                            {/*<div className="card-header card-header-icon" data-background-color="rose"><i*/}
                            {/*className="material-icons">bookmark</i></div>*/}
                            {/*<div className="card-content">*/}
                            {/*<h4 className="card-title">Chi tiết giảng viên</h4>*/}
                            {/*{this.props.isLoading ? <Loading/> :*/}
                            {/*<ReactEditor*/}
                            {/*urlPost={linkUploadImageEditor()}*/}
                            {/*fileField="image"*/}
                            {/*name="detail_teacher"*/}
                            {/*updateEditor={this.updateDetailTeacher}*/}
                            {/*value={this.props.data.detail_teacher ? `<div>${this.props.data.detail_teacher}</div>` : ""}*/}

                            {/*/>*/}
                            {/*}*/}

                            {/*</div>*/}

                            {/*</div>*/}
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-content">
                                <h4 className="card-title"><strong>Thông tin</strong></h4>
                                <div className="row">

                                    <div className="col-md-12">

                                        <ImageUploader
                                            handleFileUpload={this.uploadLessonIcon}
                                            tooltipText="Chọn ảnh icon"
                                            image_url={this.props.data.image_url}
                                            image_size={2}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label="Tên buổi học"
                                            required
                                            name="name"
                                            updateFormData={this.updateFormData}
                                            value={this.props.data.name}
                                            disabled={this.props.isLoading}
                                        /></div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label="Thứ tự"
                                            required
                                            name="order"
                                            type="number"
                                            updateFormData={this.updateFormData}
                                            value={this.props.data.order}
                                            disabled={this.props.isLoading}
                                        /></div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label="Mô tả ngắn"
                                            required
                                            name="description"
                                            updateFormData={this.updateFormData}
                                            value={this.props.data.description}
                                            disabled={this.props.isLoading}
                                        /></div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label="Link Google Slide"
                                            name="detail_teacher"
                                            updateFormData={this.updateFormData}
                                            value={this.props.data.detail_teacher}
                                            disabled={this.props.isLoading}
                                        /></div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label="Link audio"
                                            name="audio_url"
                                            updateFormData={this.updateFormData}
                                            value={this.props.data.audio_url}
                                            disabled={this.props.isLoading}
                                        /></div>
                                    <div className="col-md-12">
                                        <FormInputText
                                            label="Link video"
                                            name="video_url"
                                            updateFormData={this.updateFormData}
                                            value={this.props.data.video_url}
                                            disabled={this.props.isLoading}

                                        /></div>

                                    <div className="col-md-12">
                                        <label>Chọn học phần</label>
                                        <ReactSelect
                                            disabled={this.props.isLoading}
                                            className=""
                                            options={getTerm(terms)}
                                            onChange={(e) => {
                                                if (e)
                                                    return this.updateFormData({
                                                        target: {
                                                            name: "term_id",
                                                            value: e.id
                                                        }
                                                    });
                                            }}
                                            value={this.props.data.term_id || ""}
                                            name="term_id"
                                        />
                                    </div>

                                </div>



                                {this.props.isCommitting ?
                                    <button className="btn btn-rose btn-fill disabled" type="button">
                                        <i className="fa fa-spinner fa-spin" /> Đang tải lên
                                    </button>
                                    :

                                    <div>
                                        <button
                                            className="btn btn-fill btn-rose"
                                            type="button"
                                            onClick={this.commitData}
                                            disabled={this.props.isLoading}
                                        > Lưu </button>
                                        <Link className="btn" to={`/teaching/courses/edit/${this.props.data.course_id}/curriculum`}
                                            disabled={this.props.isLoading}>
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
    isLoading: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool,
    isUploadingLessonIcon: PropTypes.bool,
    data: PropTypes.object,
    lessonsActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    terms: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.lessons.isLoading,
        isUploadingLessonIcon: state.lessons.isUploadingLessonIcon,
        isCommitting: state.lessons.isCommitting,
        data: state.lessons.data,
        terms: state.lessons.terms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        lessonsActions: bindActionCreators(lessonsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonsContainer);

function getTerm(arr) {
    let res = arr.map(e => {
        return { ...e, value: e.id, label: e.name };
    });
    return res;
}