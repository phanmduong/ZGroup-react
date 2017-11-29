import React                        from 'react';
import {Modal}                      from 'react-bootstrap';
import Loading                      from '../../components/common/Loading';
import PropTypes                    from 'prop-types';
import Switch from 'react-bootstrap-switch';
import Checkbox from '../../components/common/Checkbox';
class LessonDetailModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }


    render(){
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
            >
                <Modal.Header closeButton>
                    <div className="row">
                        <button
                            className="btn btn-round btn-fab btn-fab-mini text-white col-md-3"
                            data-toggle="tooltip" title="" type="button"
                            rel="tooltip"
                            data-placement="right"
                            data-original-title={this.props.class.name}
                            style={{width: "100px",height: "100px"}}>
                            <img src={this.props.class ? this.props.class.course.icon_url : ""} style={{width: "100px",height: "100px"}} alt=""/>
                        </button>
                        <h3 className="col-md-9">{ "Danh sách buổi học lớp " +  this.props.class.name}</h3>
                    </div>




                </Modal.Header>
                <Modal.Body>

                    <div className="table-responsive">
                        <table className="table" style={{textAlign:"center"}}>
                            <thead className="text-rose">
                            <tr>
                                <th style={{textAlign:"center"}}>Tên học viên</th>
                                <th style={{textAlign:"center"}}>Email</th>
                                <th style={{textAlign:"center"}}>Có mặt</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                 this.props.list.length !=0 ?

                                        this.props.list.map((item, index)=>{
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td><div className="checkbox">
                                                        <Checkbox
                                                            label=""
                                                            name="active"
                                                            checked={Boolean(item.attendance_status)}
                                                            onChange={() => {return this.props.takeAttendance(this.props.class.id, this.props.selectedLessonId, item.id, index);}}
                                                        /></div>
                                                    </td>
                                                </tr>
                                            );
                                        })

                                    :
                                    <h5>Chưa thể điểm danh</h5>
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
}

export default (LessonDetailModal);
/**/