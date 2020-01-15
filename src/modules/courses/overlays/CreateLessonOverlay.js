import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";
import * as coursesActions from '../coursesActions';
import ImageUploader from "../../../components/common/ImageUploader";
import ReactSelect from "react-select";

// import TooltipButton from "../../../components/common/TooltipButton";


class CreateLessonOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            lesson: {}
        };
        this.state = {...this.initState};
    }

    updateFormData = (event) => {
        let {name, value} = event.target;
        let res = {...this.state.lesson};
        res[name] = value;
        this.setState({lesson: res})
    };

    selectedTerm = (e) => {
        let lesson = {...this.state.lesson};
        lesson["term_id"] = e ? e.value : null;
        this.setState({lesson});
    };

    uploadLessonIcon(url) {
        let lesson = {...this.state.lesson};
        lesson["image_url"] = url;
        this.setState({lesson});
    }

    // checkValidate = () => {
    //     let errors = [];
    //     const {course} = this.props;
    //     if (helper.isEmptyInput(course.name)) {
    //         errors.push('Bạn cần nhập tên!');
    //     }
    //     if (helper.isEmptyInput(course.description)) {
    //         errors.push('Bạn cần nhập mô tả ngắn!');
    //     }
    //     if (helper.isEmptyInput(course.price)) {
    //         errors.push('Bạn cần nhập giá!');
    //     }
    //     if (helper.isEmptyInput(course.duration)) {
    //         errors.push('Bạn cần nhập số buổi!');
    //     }
    //
    //     errors.forEach((e) => helper.showErrorNotification(e));
    //
    //     return !errors.length;
    // };

    componentDidMount() {
        helper.setFormValidation('#form-lesson');
    }

    submit = (e) => {
        const {
            course
        } = this.props;
        e.stopPropagation();
        if ($('#form-lesson').valid()) {
            this.props.coursesActions.createLesson(this.state.lesson, course.id, () => {
                this.close();
            })
        }
        // if (this.checkValidate()) {
        //     this.props.coursesActions.commitCourseData(this.props.course, () => {
        //         this.close();
        //         this.props.coursesActions.loadCourses();
        //     });
        // }
    };


    toggle = () => {
        this.setState({show: !this.state.show});
    };


    close = () => {
        this.setState(this.initState);
    };

    getSelectTerm = (course) => {
        return course.terms.map((item) => {
            return {
                value: item.id,
                label: item.name,
            }
        });
    }

    render() {
        const {
            className, course,
            isLoading, isCommittingLesson
        } = this.props;
        const {
            lesson
        } = this.state;

        return (

            <div style={{position: "relative"}}>
                <div className={className}
                     ref="target" onClick={this.toggle}>
                    Thêm buổi học
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" style={{width: 300, marginTop: 10}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                            <div><b>Tạo mới</b></div>
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a'}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        {isLoading && <Loading/>}
                        {!isCommittingLesson && !isLoading &&
                        <form role="form" id="form-lesson">

                            <div>
                                <label>Tên buổi học</label>
                                <FormInputText
                                    name="name"
                                    placeholder="Tên môn học"
                                    required
                                    value={lesson.name}
                                    updateFormData={this.updateFormData}
                                />
                            </div>
                            <div>
                                <label>Thứ tự</label>
                                <FormInputText
                                    placeholder="Thứ tự"
                                    required
                                    type="number"
                                    name="order"
                                    updateFormData={this.updateFormData}
                                    value={lesson.order}
                                />
                            </div>
                            <div>
                                <label>Mô tả ngắn</label>
                                <FormInputText
                                    placeholder="Mô tả ngắn"
                                    required
                                    name="description"
                                    updateFormData={this.updateFormData}
                                    value={lesson.description}
                                />
                            </div>
                            <div>
                                <label>Học phần</label>
                                <ReactSelect
                                    options={this.getSelectTerm(course)}
                                    onChange={this.selectedTerm}
                                    value={lesson.term_id}
                                    placeholder="Chọn học phần"
                                /></div>
                            <div className="panel panel-default">
                                <div className="panel-heading" role="tab"
                                     id="headingTwo">
                                    <a className="collapsed" role="button"
                                       data-toggle="collapse"
                                       data-parent="#accordion"
                                       href="#collapseTwo" aria-expanded="false"
                                       aria-controls="collapseTwo">
                                        <h4 className="panel-title">
                                            Mở rộng
                                            <i className="material-icons">arrow_drop_down</i>
                                        </h4>
                                    </a>
                                </div>
                                <div id="collapseTwo"
                                     className="panel-collapse collapse"
                                     role="tabpanel"
                                     aria-labelledby="headingTwo"
                                     aria-expanded="false"
                                     style={{height: '0px'}}>
                                    <div className="panel-body">

                                        <div>
                                            <label>Ảnh icon</label>
                                            <ImageUploader
                                                handleFileUpload={this.uploadLessonIcon}
                                                tooltipText="Chọn ảnh icon"
                                                image_url={lesson.image_url}
                                                image_size={2}
                                            />
                                        </div>
                                        <div>
                                            <label>Link Google Slide</label>
                                            <FormInputText
                                                placeholder="Link Google Slide"
                                                name="detail_teacher"
                                                updateFormData={this.updateFormData}
                                                value={lesson.detail_teacher}
                                            />
                                        </div>
                                        <div>
                                            <label>Link audio</label>
                                            <FormInputText
                                                placeholder="Link audio"
                                                name="audio_url"
                                                updateFormData={this.updateFormData}
                                                value={lesson.audio_url}
                                            />
                                        </div>
                                        <div>
                                            <label>Link video</label>
                                            <FormInputText
                                                placeholder="Link video"
                                                name="video_url"
                                                updateFormData={this.updateFormData}
                                                value={lesson.video_url}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        }
                        {isCommittingLesson && <Loading/>}
                        {!(isCommittingLesson || isLoading) &&
                        <div className="flex">
                            <button type="button"
                                    disabled={isCommittingLesson || isLoading}
                                    className="btn btn-white width-50-percent text-center"
                                    data-dismiss="modal"
                                    onClick={this.close}>Hủy
                            </button>
                            <button type="button"
                                    className="btn btn-success width-50-percent text-center"
                                    disabled={isCommittingLesson || isLoading}
                                    style={{backgroundColor: '#2acc4c'}}
                                    onClick={(e) => this.submit(e)}>
                                Hoàn tất
                            </button>
                        </div>}

                    </div>
                </Overlay>
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        isCommittingLesson: state.courses.isCommittingLesson,
        course: state.courses.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLessonOverlay);
