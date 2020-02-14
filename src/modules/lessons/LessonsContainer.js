import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as lessonsActions from './lessonsActions';
import {linkUploadImageEditor} from '../../constants/constants';
import ReactEditor from '../../components/common/ReactEditor';
import FormInputText from '../../components/common/FormInputText';
import {Link} from 'react-router';
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';
import {NO_IMAGE} from "../../constants/env";
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
        let {terms, data} = this.props;
        let {course} = data;
        return (
            <div>
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
                                                         }}/>
                                                </div>
                                                <div
                                                    className="text-white flex flex-col flex-justify-content-center text-center margintop-10">
                                                    {course &&
                                                    <Link
                                                        className="text-white"
                                                        style={{fontSize: 18}}
                                                        to={"/teaching/courses/edit/" + course.id}>{course.name}</Link>
                                                    }
                                                </div>

                                                <h4 className="card-title  margintop-10">Buổi {data.order}</h4>

                                                <div
                                                    className="text-white flex flex-col flex-justify-content-center text-center">
                                                    <div>{data.name}</div>
                                                </div>
                                                <div
                                                    className="text-white flex flex-col flex-justify-content-center text-center">
                                                    <div>{data.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="margintop-10">
                                            {this.props.isLoading ? <Loading/> :
                                                <form className="form-modal" id="form-lesson-create-edit">
                                                    <div>
                                                        <label>Tên buổi học</label>
                                                        <FormInputText
                                                            required
                                                            name="name"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.name}
                                                            disabled={this.props.isLoading}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label>Thứ tự</label>
                                                        <FormInputText
                                                            required
                                                            name="order"
                                                            type="number"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.order}
                                                            disabled={this.props.isLoading}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label>Mô tả ngắn</label>
                                                        <FormInputText
                                                            required
                                                            name="description"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.description}
                                                            disabled={this.props.isLoading}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label>Link Google Slide</label>
                                                        <FormInputText
                                                            name="detail_teacher"
                                                            updateFormData={this.updateFormData}
                                                            value={this.props.data.detail_teacher}
                                                            disabled={this.props.isLoading}
                                                        /></div>
                                                    <div>

                                                        <label>Học phần</label>
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
                                                    <div>
                                                        <label>Nội dung buổi học</label>
                                                        <br/>

                                                        <ReactEditor
                                                            urlPost={linkUploadImageEditor()}
                                                            fileField="image"
                                                            name="detail_content"
                                                            updateEditor={this.updateDetailContent}
                                                            value={this.props.data.detail_content ? `<div>${this.props.data.detail_content}</div>` : ""}
                                                        />

                                                    </div>
                                                    <div className="flex flex-end">
                                                        {this.props.isCommitting ?
                                                            <button className="btn btn-success btn-fill disabled"
                                                                    type="button">
                                                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                                                            </button>
                                                            :

                                                            <div>
                                                                <button
                                                                    className="btn btn-fill btn-success"
                                                                    type="button"
                                                                    onClick={this.commitData}
                                                                    disabled={this.props.isLoading}
                                                                > Lưu
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                </form>
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
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
        return {...e, value: e.id, label: e.name};
    });
    return res;
}