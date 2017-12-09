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

    componentWillReceiveProps() {
        //let newdata = nextProps.list;
        //if(Array.isArray(newdata))
        //this.setState({data: newdata});
    }

    changeAttendance(id){
        let data = this.props.list;
        data[id].attendance_lesson_status= !data[id].attendance_lesson_status;
        //this.setState({data: data});
        this.props.updateData(data);
    }

    changeHomework(id){
        let data = this.props.list;
        data[id].attendance_homework_status= !data[id].attendance_homework_status;
        //this.setState({data: data});
        this.props.updateData(data);
    }

    changeNote(e){
        let note = e.target.value;
        let id = e.target.name;
        let data = this.props.list;
        data[id].note = note;
        //this.setState({data: data});
        this.props.updateData(data);
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
                                this.props.list.length > 0 ?

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
                                                                   updateFormData={(e) => {return this.changeNote(e);}}
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
                        {this.props.isCommitting ?
                            <button className="btn btn-rose btn-round disabled" type="button">
                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
                            </button>
                            :


                            <button
                                className="btn btn-fill btn-rose"
                                type="button"
                                onClick={() => {return this.props.commitData(this.props.list)}}
                            > Lưu </button>

                        }
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}

LessonDetailModal.PropTypes = {
    lessondata: PropTypes.array,
    list: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func,
}

export default (LessonDetailModal);
/**/