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
                            {this.props.isLoadingLessonDetailModal ?
                                <tr><Loading/></tr>
                                :
                                 this.props.list.length !=0 ?

                                        this.props.list.map((item, index)=>{
                                            return(
                                                <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        <CheckBoxMaterial
                                                            label=""
                                                            name="active"
                                                            checked={Boolean(item.attendance_status)}
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
}

export default (LessonDetailModal);
/**/