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
            data: [],
        };
        this.changeAttendance     = this.changeAttendance.bind(this);
        this.changeHomework     = this.changeHomework.bind(this);
        this.changeNote     = this.changeNote.bind(this);

    }

    changeAttendance(id){
        let data = this.props.list;
        let value = !data[id].attendance_lesson_status;
        this.props.updateData(id, value, 'attendance_lesson_status');
    }

    changeHomework(id){
        let data = this.props.list;
        let value = !data[id].attendance_homework_status;
        this.props.updateData(id, value, 'attendance_homework_status');
    }

    changeNote(e, index){
        let note = e.target.value;
        this.props.updateData(index, note,'note');
    }


    render() {
        return (
            <Modal
                bsSize="large"
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{"Danh sách buổi " + this.props.index + " - Lớp " + this.props.class.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>Tên học viên</th>
                                {/*<th>Email</th>*/}
                                <th style={{textAlign: "center"}}>Có mặt</th>
                                <th style={{textAlign: "center"}}>Bài tập</th>
                                <th style={{textAlign: "center"}}>Ghi chú</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.isLoadingLessonDetailModal ?
                                <tr>
                                    <td colSpan={5}><Loading/></td>
                                </tr>
                                :
                                this.props.list.length > 0 ?

                                    this.props.list.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.name}</td>
                                                {/*<td>{item.email}</td>*/}
                                                <td style={{textAlign: "center"}}>
                                                    <CheckBoxMaterial
                                                        label=""
                                                        name="active"
                                                        checked={Boolean(item.attendance_lesson_status)}
                                                        onChange={() => {return this.changeAttendance(index);}}
                                                    />
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <CheckBoxMaterial
                                                        label=""
                                                        name="active"
                                                        checked={Boolean(item.attendance_homework_status)}
                                                        onChange={() => {return this.changeHomework(index);}}
                                                    />
                                                </td>
                                                <td><FormInputText label="Ghi chú"
                                                                   name={`${index}`}
                                                                   id={`${item.attendance_id}`}
                                                                   updateFormData={(e) => {return this.changeNote(e, index);}}
                                                                   value={item.note}
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
                        <div>

                        {this.props.isCommitting  ?
                            <button style={{float: 'right', width: "35%"}} className="btn btn-rose disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                            </button>
                            :


                            <button
                                disabled={!(this.props.list.length > 0) ||this.props.isLoadingLessonDetailModal}
                                style={{float: 'right', width: "20%"}}
                                className="btn btn-fill btn-rose "
                                type="button"
                                onClick={() =>  this.props.commitData(this.props.list, this.props.commitSuccess)}
                            > Lưu </button>

                        }</div>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}

LessonDetailModal.propTypes = {
    lessondata: PropTypes.array,
    list: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    isLoadingLessonDetailModal: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    commitSuccess: PropTypes.func.isRequired,
    commitData: PropTypes.func.isRequired,
    index: PropTypes.number,
    class: PropTypes.object,
};

export default (LessonDetailModal);
/**/