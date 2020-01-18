import React from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as coursesActions from '../coursesActions';
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import {Modal} from 'react-bootstrap';
import FormInputText from '../../../components/common/FormInputText';
import * as helper from '../../../helpers/helper';
import {isEmptyInput} from '../../../helpers/helper';
import ImageUploader from "../../../components/common/ImageUploader";
import ReactSelect from "react-select";

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
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation('#form-exam-template');
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

    onSave = () => {
        if (this.checkValidate()) {
            this.props.coursesActions.createExamTemplate({...this.state.data, course_id: this.props.course.id}, () => {
                this.closeModal();
            });
        }
    };

    render() {
        const {data} = this.state;
        const {isStoringExam} = this.props;
        return (
            <div>


                <div className="table-responsive">

                    <table id="datatables"
                           className="table white-table table-striped table-no-bordered table-hover"
                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                        <tbody>
                        {this.props.course.exam_templates.map((template) => {
                            return (
                                <tr key={template.id}>
                                    <td><strong>{template.title}</strong></td>
                                    <td>{template.description}</td>
                                    <td>Hệ số {template.weight}</td>
                                    <td style={{width: 50}}>
                                        <ButtonGroupAction
                                            edit={() => {
                                                return this.openModal(template);
                                            }}
                                            delete={() => {
                                                // return this.deleteLink(template.id);
                                            }}
                                            object={template}
                                        />
                                    </td>
                                </tr>
                            );

                        })}
                        </tbody>
                    </table>
                </div>
                <Modal show={this.props.modalExam} onHide={this.closeModal} bsSize="large">
                    <Modal.Header closeButton>
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
                                        <ReactSelect
                                            // options={this.getSelectTerm(course)}
                                            // onChange={this.selectedTerm}
                                            // value={lesson.term_id}
                                            placeholder="Chọn nhóm bài test"
                                        /></div>
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
                                <i className="fa fa-spinner fa-spin" style={{fontSize: 16, marginRight: 5}}></i>}
                                {isStoringExam ? "Đang lưu" : "Lưu"}
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
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

