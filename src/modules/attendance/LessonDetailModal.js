import React from 'react';
import {Modal} from 'react-bootstrap';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import CheckBoxMaterial from '../../components/common/CheckBoxMaterial';
import FormInputText from "../../components/common/FormInputText";

class LessonDetailModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            note: [],
        };
        this.noteChange = this.noteChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let note = nextProps.list.map((item) => {
            return item.note ? item.note : '';
        });
        this.setState({
            note: note
        });
    }

    noteChange(e, attid) {
        const id = e.target.name;
        const value = e.target.value;
        const attendance_id = attid;
        let note = {...this.state.note};
        note[id] = value;
        this.setState({
            note: note
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.takeNote(value, attendance_id);
        }.bind(this), 1000);
    }

    render() {
        return (
            <Modal
                bsSize="large"
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{"Danh sách buổi học lớp " + this.props.class.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>Tên học viên</th>
                                <th>Email</th>
                                <th style={{textAlign: "center"}}>Có mặt</th>
                                <th style={{textAlign: "center"}}>Bài tập</th>
                                <th style={{textAlign: "center"}}>Ghi chú</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.isLoadingLessonDetailModal ?
                                <tr>
                                    <td colSpan={4}><Loading/></td>
                                </tr>
                                :
                                this.props.list.length != 0 ?

                                    this.props.list.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td style={{textAlign: "center"}}>
                                                    <CheckBoxMaterial
                                                        label=""
                                                        name="active"
                                                        checked={Boolean(item.attendance_lesson_status)}
                                                        onChange={() => {
                                                            return this.props.takeAttendance(item.attendance_id, index);
                                                        }}
                                                    />
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <CheckBoxMaterial
                                                        label=""
                                                        name="active"
                                                        checked={Boolean(item.attendance_homework_status)}
                                                        onChange={() => {
                                                            return this.props.takeAttendanceHomework(item.attendance_id, index);
                                                        }}
                                                    />
                                                </td>
                                                <td><FormInputText label="Ghi chú"
                                                                   name={`${index}`}
                                                                   id={`${item.attendance_id}`}
                                                                   updateFormData={(e) => {
                                                                       this.noteChange(e, item.attendance_id)
                                                                   }}
                                                                   value={this.state.note[index]}
                                                /></td>
                                            </tr>
                                        );
                                    })

                                    :
                                    <tr>
                                        <td colSpan={4}><h5>Chưa thể điểm danh</h5></td>
                                    </tr>
                            }

                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}

LessonDetailModal.PropTypes = {
    lessondata: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func,
}

export default (LessonDetailModal);
/**/