import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Modal} from "react-bootstrap";
import ReactSelect from "react-select";
import * as studentActions from "../studentActions";
import TimePicker from "../../../components/common/TimePicker";
import FormInputDate from "../../../components/common/FormInputDate";
import FormInputText from "../../../components/common/FormInputText";
import * as createRegisterActions from "../../registerStudents/createRegisterActions";
import {isEmpty} from "../../../helpers/entity/mobx";
import Loading from "../../../components/common/Loading";
import {showErrorNotification, showNotification, showWarningNotification} from "../../../helpers/helper";
import {createMockExam} from "../studentApi";

const defaultData = {
    id:-1,
    date: null,
    note: "Speaking () - Writing () - Listening () - Reading ()",
    score: null,
    time: null,
    type: null,
    user_id: null,
};
class CreateMockExamButtonModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            showModal: false,
            isLoading: false,
            data: {...defaultData},
        };
        this.state = this.initState;
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;
    }

    componentDidMount() {
        let {
            createRegisterActions,
            isLoadedCourses,
        } = this.props;
        if (!isLoadedCourses) createRegisterActions.loadCourses();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mockExam && nextProps.mockExam.id != this.state.data.id && nextProps.mockExam.id !== -1) {
            console.log('props change')
            this.setState({data: nextProps.mockExam, showModal: true});
        }
    }

    closeModal = () => {
        this.setState({showModal: false, data: {...defaultData}});
    };

    showModal = () => {
        this.setState({showModal: true, data: {...defaultData}});
    };

    updateForm = (e) => {
        let {name, value} = e.target;
        let data = this.state.data;
        data[name] = value;
        this.setState({data});
    }

    getCourses = (items) => {
        if (isEmpty(items)) return [];
        return items && items.map(item => {
            return {
                ...item,
                value: item.id,
                label: item.name,
                icon_url: item.icon_url,
            };
        });
    }

    saveMockExam = () => {
        let data = this.state.data;
        if (data.id == -1) data.id = null;
        data.user_id = this.studentId;
        let errs = [];
        // if (isEmpty(data.score)) {
        //     errs.push('Bạn chưa nhập điểm bài thi!');
        // }
        // if (isEmpty(data.type)) {
        //     errs.push('Bạn chưa nhập loại bài thi!');
        // }
        if (isEmpty(data.date)) {
            errs.push('Bạn chưa ngày thi!');
        }
        if (isEmpty(data.time)) {
            errs.push('Bạn chưa giờ thi!');
        }
        if (isEmpty(data.course_id)) {
            errs.push('Bạn chưa chọn môn thi!');
        }
        errs.forEach((e) => showErrorNotification(e));
        if (errs.length == 0) {
            showWarningNotification('Đang lưu...');
            this.setState({isSaving: true});
            createMockExam({
                ...data,
                date: `${data.date} ${data.time}`
            }).then(res => {
                if(res.data.status == 1){
                    showNotification('Lưu thành công.');
                    this.closeModal();
                    this.props.studentActions.loadStudentMockExams(this.studentId);
                }else {
                    showErrorNotification('Có lỗi xảy ra!');
                    this.setState({isSaving: false});
                }

            })
                .catch((e) => {
                    console.log(e)
                    showErrorNotification('Có lỗi xảy ra!');
                    this.setState({isSaving: false});

                })
            ;

        }
    }

    render() {
        let {isSaving, data} = this.state;
        let {isLoadingCourses} = this.props;
        let courses = this.getCourses(this.props.courses);
        return (
            <div className="">
                <button className={"btn btn-actions"} onClick={this.showModal}>
                    Thêm bài thi thử
                </button>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton={!isSaving} closeplaceholder="Đóng">
                        <Modal.Title><b>Bài thi thử</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isSaving ? <Loading/> : <div className="form-grey">

                            <label className="required-label">Môn thi</label>
                            <ReactSelect
                                value={data.course_id}
                                options={courses}
                                onChange={e => this.updateForm({target: {name: 'course_id', value: e ? e.id : e}})}
                                clearable={false}
                                placeholder="Chọn môn học"
                            />
                            <label className="required-label">Giờ</label>
                            <TimePicker
                                onChange={this.updateForm}
                                label=""
                                id="mock-exam-time"
                                name="time"
                                value={data.time}
                            />
                            <label className="required-label">Ngày</label>
                            <FormInputDate name="date"
                                           id="mock-exam-date"
                                           updateFormData={this.updateForm}
                                           value={data.date}
                            />
                            <label>Điểm thi</label>
                            <FormInputText name="score"
                                           value={data.score}
                                           placeholder="Nhập điểm"
                                           type="number"
                                           updateFormData={this.updateForm}
                            />
                            <label>Loại bài thi</label>
                            <FormInputText name="type"
                                           value={data.type}
                                           type="text"
                                           placeholder="Nhập loại bài thi"
                                           updateFormData={this.updateForm}
                            />
                            <label>Ghi chú</label>
                            <div className="form-group text-area-grey">
                                <textarea type="text" className="form-control"
                                          placeholder="Nhập ghi chú"
                                          name="note"
                                          value={data.note}
                                          onChange={this.updateForm}/>
                            </div>

                            <div className="flex">
                                <button type="button"
                                        disabled={isSaving}
                                        className="btn btn-white width-50-percent text-center"
                                        data-dismiss="modal"
                                        onClick={this.closeModal}>
                                    Hủy
                                </button>
                                <button type="button"
                                        className="btn btn-success width-50-percent text-center"
                                        disabled={isSaving || isLoadingCourses}
                                        style={{backgroundColor: '#2acc4c'}}
                                        onClick={this.saveMockExam}>
                                    Hoàn tất
                                </button>
                            </div>
                        </div>}
                    </Modal.Body>
                </Modal>
            </div>
        );

    }
}


function mapStateToProps(state) {
    return {
        student: state.infoStudent.student,
        isLoadedCourses: state.createRegister.isLoadedCourses,
        courses: state.createRegister.courses,
        isLoadingCourses: state.createRegister.isLoadingCourses,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch),
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMockExamButtonModal);