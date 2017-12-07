import React                        from 'react';
import {Modal}                      from 'react-bootstrap';
import Loading                      from '../../components/common/Loading';
import PropTypes                    from 'prop-types';
import CheckBoxMaterial             from '../../components/common/CheckBoxMaterial';
class LessonDetailModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }


    render(){
        return (
            <Modal
                size="modal-lg"
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton style={{paddingLeft :  "50px", paddingTop: "50px"}}>
                    <div className="row">
                        <button
                            className="btn btn-round btn-fab btn-fab-mini text-white col-md-3"
                            data-toggle="tooltip" title="" type="button"
                            rel="tooltip"
                            data-placement="right"
                            data-original-title={this.props.class.name}
                            style={{width: "80px",height: "80px"}}>
                            <img src={this.props.class ? this.props.class.course.icon_url : ""} style={{width: "80px",height: "80px"}} alt=""/>
                        </button>
                        <h3 className="col-md-9">{ "Danh sách buổi học lớp " +  this.props.class.name}</h3>
                    </div>




                </Modal.Header>
                <Modal.Body>

                    <div className="table-responsive">
                        <table className="table" >
                            <thead className="text-rose">
                            <tr>
                                <th >Tên học viên</th>
                                <th >Email</th>
                                <th style={{textAlign:"center"}}>Có mặt</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.isLoadingLessonDetailModal ?
                                <tr><td colSpan={3}><Loading/></td></tr>
                                :
                                 this.props.list.length !=0 ?

                                        this.props.list.map((item, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td style={{textAlign:"center"}}>
                                                        <CheckBoxMaterial
                                                            label=""
                                                            name="active"
                                                            checked={Boolean(item.attendance_lesson_status)}
                                                            onChange={() => {return this.props.takeAttendance(this.props.class.id, this.props.selectedLessonId, item.id, index);}}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })

                                    :
                                    <tr> <h5>Chưa thể điểm danh</h5></tr>
                            }

                            </tbody>
                        </table>
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}

LessonDetailModal.PropTypes ={
    lessondata: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func,
}

export default (LessonDetailModal);
/**/