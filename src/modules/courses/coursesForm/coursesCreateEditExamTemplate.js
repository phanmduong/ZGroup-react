import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import {Modal, Overlay} from 'react-bootstrap';
import FormInputText from '../../../components/common/FormInputText';
import * as helper from '../../../helpers/helper';
import {isEmptyInput} from '../../../helpers/helper';
import ImageUploader from "../../../components/common/ImageUploader";
import ReactSelect from "react-select";
import SelectGroupExamOverlay from "../overlays/SelectGroupExamOverlay";
import {confirm} from "../../../helpers/helper";
import TooltipButton from "../../../components/common/TooltipButton";
import AnalyticExamModal from "./AnalyticExamModal";
import EmptyData from "../../../components/common/EmptyData";
import * as ReactDOM from "react-dom";

const DEADLINE = Array.from(Array(45).keys()).map((item) => {
    return {
        value: item + 1,
        label: item + 1 + " ngày",
    };
});

class coursesCreateEditExamTemplate extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            openModal: false,
            currentLink: 0,
            data: {},
            selectedGroupExam: null,
            showOverlay: [],

        }
        ;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation('#form-exam-template');
        this.props.coursesActions.getClassesByCourse(this.props.course.id);
    }


    openModal(exam) {
        this.setState({data: exam});
        this.props.coursesActions.toggleModalExam();
    }

    closeModal() {
        this.props.coursesActions.toggleModalExam();
        //this.props.coursesActions.loadOneCourse(this.props.data.id);
    }

    checkValidate() {

        if ($('#form-exam-template').valid()) {
            return true;
        }
        return false;
    }

    updateFormData = (event) => {
        let {name, value} = event.target;
        let data = {...this.state.data};
        data[name] = value;
        this.setState({data: data});
    };

    uploadAvatar = (url) => {
        let data = {...this.state.data};
        data["avatar_url"] = url;
        this.setState({data});
    };

    getSelectLesson = (course) => {
        return course.lessons.map((item) => {
            return {
                value: item.id,
                label: item.name,
            };
        });
    };

    onSelected = (e, key) => {
        let data = {...this.state.data};
        data[key] = e ? e.value : null;
        this.setState({data});
    };

    onChangeDeadline = (e, template) => {
        const value = e ? e.value : null;
        template.deadline = value;
        this.props.coursesActions.editExamTemplate(template);
    };

    duplicate = (template) => {
        this.props.coursesActions.duplicateExamTemplate(template);
    };

    onChangeLesson = (e, template) => {
        const value = e ? e.value : null;
        template.lesson_id = value;
        this.props.coursesActions.editExamTemplate(template);
    };

    onSelectedGroup = (group_id) => {
        let data = {...this.state.data};
        data["group_exam_id"] = group_id;
        this.setState({data});
    };

    onSave = () => {
        if (this.checkValidate()) {
            if (isEmptyInput(this.state.data.id)) {
                this.props.coursesActions.createExamTemplate({
                    ...this.state.data,
                    course_id: this.props.course.id
                }, () => {
                    this.closeModal();
                });
            } else {
                this.props.coursesActions.editExamTemplate(this.state.data, () => {
                    this.closeModal();
                });
            }
        }
    }

    onDelete = (template) => {
        confirm("error", "Xoá", "Bạn có chắc chắn muốn xoá", () => {
            this.props.coursesActions.deleteExamTemplate(template.id);
        });
    }

    toggleOverlay = (key) => {
        let showOverlay = [...this.props.course.exam_templates].map(() => false);
        showOverlay[key] = true;
        this.setState({showOverlay});
    };
    closeOverlay = (key) => {
        let showOverlay = this.state.showOverlay;
        showOverlay[key] = false;
        this.setState({showOverlay});
    };

    renderItem = (template) => {
        return (
            <div className="flex flex-row tr background-white" key={template.id}>
                <div className="td" style={{width: '15%'}}><strong>{template.title}</strong></div>
                <div className="td" style={{width: '10%'}}>{template.description}</div>
                <div className="td" style={{width: '10%'}}>Hệ số {template.weight}</div>
                <div className="td" style={{width: '30%'}}>
                    <TooltipButton text={"Chọn buổi diễn ra"} placement="top">
                        <ReactSelect
                            options={this.getSelectLesson(this.props.course)}
                            onChange={(e) => this.onChangeLesson(e, {...template})}
                            value={template.lesson_id}
                            placeholder="Buổi diễn ra"
                        />
                    </TooltipButton>
                </div>
                <div className="td" style={{width: '30%'}}>
                    <TooltipButton text={"Chọn hạn chót"} placement="top">
                        <ReactSelect
                            options={DEADLINE}
                            onChange={(e) => this.onChangeDeadline(e, {...template})}
                            value={template.deadline}
                            placeholder="Hạn chót"
                        />
                    </TooltipButton>
                </div>
                <div className="td" style={{width: '50px'}}>
                    <div style={{position: "relative"}}
                         className="cursor-pointer" mask="table-btn-action">
                        <div ref={'target' + template.id} onClick={() => this.toggleOverlay(template.id)}
                             className="flex flex-justify-content-center cursor-pointer">
                            <i className="material-icons">more_horiz</i>
                        </div>
                        <Overlay
                            rootClose={true}
                            show={this.state.showOverlay[template.id]}
                            onHide={() => this.closeOverlay(template.id)}
                            placement="bottom"
                            container={() => ReactDOM.findDOMNode(this.refs['target' + template.id]).parentElement}
                            target={() => ReactDOM.findDOMNode(this.refs['target' + template.id])}>
                            <div className="kt-overlay overlay-container"
                                 mask="table-btn-action" style={{
                                width: 150,
                                marginTop: 10,
                                left: -115,
                            }} onClick={() => this.closeOverlay(template.id)}>
                                <button type="button"
                                        className="btn btn-white width-100"
                                        onClick={() => this.openModal(template)}>
                                    Sửa bài kiểm tra
                                </button>
                                <button type="button"
                                        className="btn btn-white width-100"
                                        onClick={() => this.duplicate(template)}>
                                    Nhân đôi
                                </button>

                                <button type="button"
                                        className="btn btn-white width-100"
                                        onClick={() => this.onDelete(template)}>
                                    Xóa
                                </button>
                            </div>
                        </Overlay>
                    </div>

                </div>
            </div>

        );
    }

    analyticExam = (group_exam) => {
        this.props.coursesActions.getAnalyticExam(this.props.course.id);
        this.props.coursesActions.toggleModalAnalyticExam();
        this.setState({selectedGroupExam: group_exam});
    }

    openModalCreateExam = () => {
        this.props.coursesActions.toggleModalExam();
    }

    render() {
        const {data} = this.state;
        const {isStoringExam} = this.props;
        return (
            <div>
                <div className="flex flex-wrap" style={{marginTop: 10}}>
                    <div className="btn button-green none-margin"
                         ref="target"
                         onClick={this.openModalCreateExam}
                         style={{padding:'12px 15px'}}
                    >
                        <span className="material-icons">add_circle</span>&nbsp;&nbsp;&nbsp;&nbsp;Thêm bài kiểm tra
                    </div>
                </div>
                {
                    (!this.props.course.exam_templates || this.props.course.exam_templates.filter((template) => isEmptyInput(template.group_exam_id)).length == 0) &&
                    (!this.props.course.group_exams || this.props.course.group_exams.length == 0) &&
                    <EmptyData/>
                }
                {
                    this.props.course.exam_templates && this.props.course.exam_templates.filter((template) => isEmptyInput(template.group_exam_id)).length > 0 &&

                    <div>

                        <div className="flex flex-row flex-align-items-center" style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginTop: 30,
                            marginBottom: 10,
                        }}>Không có nhóm
                            <TooltipButton text={"Thống kê"} placement={"top"}>
                                <div onClick={() => this.analyticExam()}
                                     style={{marginLeft: 15, fontWeight: 300, cursor: 'pointer'}}><i
                                    style={{fontSize: 28}} className="material-icons">
                                    assessment
                                </i></div>
                            </TooltipButton>

                        </div>
                        <div className="div-table">
                            {
                                this.props.course.exam_templates && this.props.course.exam_templates.filter((template) => isEmptyInput(template.group_exam_id))
                                    .map((template) => {
                                            return this.renderItem(template);
                                        }
                                    )
                            }
                        </div>
                    </div>
                }
                {this.props.course.group_exams && this.props.course.group_exams.length > 0 && this.props.course.group_exams.map((group) => {
                    return (
                        <div>
                            <div className="flex flex-row flex-align-items-center" style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                marginTop: 10,
                                marginBottom: 10,
                            }}>{group.name}
                                <TooltipButton text={"Thống kê"} placement={"top"}>
                                    <div onClick={() => this.analyticExam(group)}
                                         style={{marginLeft: 15, fontWeight: 300, cursor: 'pointer'}}><i
                                        style={{fontSize: 28}} className="material-icons">
                                        assessment
                                    </i></div>
                                </TooltipButton>

                            </div>
                            <div className="div-table">
                                {this.props.course.exam_templates && this.props.course.exam_templates.filter((template) => template.group_exam_id == group.id)
                                    .map((template) => {
                                        return this.renderItem(template);
                                    })}
                            </div>
                        </div>
                    );
                })}

                <Modal show={this.props.modalExam} bsSize="large">
                    <Modal.Header>
                        <div className="title">{isEmptyInput(data.id) ? "Tạo mẫu bài test" : "Sửa mẫu bài test"}</div>
                        <div style={{textAlign: 'center'}}>Môn {this.props.course.name}</div>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-exam-template" className="form-modal" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div>
                                        <label>Nhóm bài test</label>
                                        <SelectGroupExamOverlay className="btn-overlay-select"
                                                                value={data.group_exam_id}
                                                                onChange={this.onSelectedGroup}/>
                                    </div>
                                    <div>
                                        <label>Tên bài test</label>
                                        <FormInputText
                                            placeholder="Tên bài test"
                                            name="title"
                                            required
                                            updateFormData={this.updateFormData}
                                            value={data.title}
                                        />
                                    </div>
                                    <div>
                                        <label>Trọng số</label>
                                        <FormInputText
                                            placeholder="Trọng số"
                                            required
                                            type="number"
                                            name="weight"
                                            updateFormData={this.updateFormData}
                                            value={data.weight}
                                        />
                                    </div>
                                    <div>
                                        <label>Mô tả</label>
                                        <FormInputText
                                            placeholder="Mô tả"
                                            name="description"
                                            updateFormData={this.updateFormData}
                                            value={data.description}
                                        />
                                    </div>
                                    <div>
                                        <label>Hạn chót</label>
                                        <ReactSelect
                                            options={DEADLINE}
                                            onChange={(e) => this.onSelected(e, "deadline")}
                                            value={data.deadline}
                                            placeholder="Chọn hạn chót"
                                        /></div>
                                    <div>
                                        <label>Diễn ra vào buổi</label>
                                        <ReactSelect
                                            options={this.getSelectLesson(this.props.course)}
                                            onChange={(e) => this.onSelected(e, "lesson_id")}
                                            value={data.lesson_id}
                                            placeholder="Chọn buổi diễn ra"
                                        /></div>

                                </div>
                                <div className="col-md-4">
                                    <div>
                                        <label>Ảnh đại diện</label>
                                        <ImageUploader
                                            handleFileUpload={this.uploadAvatar}
                                            tooltipText="Chọn ảnh đại diện"
                                            image_url={data.avatar_url}
                                            image_size={2}
                                        />
                                    </div>
                                </div>

                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="footer">
                            <div className={"button-default min-width-100-px" + (isStoringExam ? " disabled " : "")}
                                 onClick={() => !isStoringExam && this.closeModal()}>
                                Hủy
                            </div>
                            <div className={"button-green min-width-100-px" + (isStoringExam ? " disabled " : "")}
                                 onClick={() => !isStoringExam && this.onSave()}>
                                {isStoringExam &&
                                <i className="fa fa-spinner fa-spin" style={{fontSize: 16, marginRight: 5}}/>}
                                {isStoringExam ? "Đang lưu" : "Lưu"}
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>

                <AnalyticExamModal groupExam={this.state.selectedGroupExam}
                                   courseId={this.props.course.id}/>
            </div>
        );
    }

}

coursesCreateEditExamTemplate.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isStoringExam: PropTypes.bool.isRequired,
    modalExam: PropTypes.bool.isRequired,
    course: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.courses.isLoading,
        isStoringExam: state.courses.isStoringExam,
        course: state.courses.data,
        modalExam: state.courses.modalExam,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        coursesActions: bindActionCreators(coursesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(coursesCreateEditExamTemplate);

