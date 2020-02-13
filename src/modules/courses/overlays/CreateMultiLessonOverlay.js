import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import {bindActionCreators} from "redux";
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";
import * as coursesActions from '../coursesActions';

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
        this.setState({lesson: res});
    };

    componentDidMount() {
        helper.setFormValidation('#form-multi-lesson');
    }

    submit = (e) => {
        const {
            course
        } = this.props;
        e.stopPropagation();
        if ($('#form-multi-lesson').valid()) {
            helper.confirm("warning", "Tạo nhiều buổi", "Bạn có chắc chắn muốn tạo " + this.state.lesson.number_lesson +" buổi học?",
                 ()=> {
                    this.props.coursesActions.createMultiLesson(this.state.lesson, course.id, () => {
                        this.close();
                    });
                });

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

    render() {
        const {
            className,
            isLoading, isCommittingMultiLesson
        } = this.props;
        const {
            lesson
        } = this.state;

        return (

            <div style={{position: "relative"}}>
                <div className={className}
                     ref="target" onClick={this.toggle}>
                    Thêm nhiều buổi học
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
                        {!isCommittingMultiLesson && !isLoading &&
                        <form role="form" id="form-multi-lesson">

                            <div>
                                <label>Số buổi học</label>
                                <FormInputText
                                    name="number_lesson"
                                    placeholder="Số buổi học"
                                    required
                                    type="number"
                                    value={lesson.number_lesson}
                                    updateFormData={this.updateFormData}
                                />
                            </div>
                        </form>

                        }
                        {isCommittingMultiLesson && <Loading/>}
                        {!(isCommittingMultiLesson || isLoading) &&
                        <div className="flex">
                            <button type="button"
                                    disabled={isCommittingMultiLesson || isLoading}
                                    className="btn btn-white width-50-percent text-center"
                                    data-dismiss="modal"
                                    onClick={this.close}>Hủy
                            </button>
                            <button type="button"
                                    className="btn btn-success width-50-percent text-center"
                                    disabled={isCommittingMultiLesson || isLoading}
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
        isCommittingMultiLesson: state.courses.isCommittingMultiLesson,
        course: state.courses.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLessonOverlay);
