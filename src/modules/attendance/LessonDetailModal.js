import React                        from 'react';
import {Modal}                      from 'react-bootstrap';
import Loading                      from '../../components/common/Loading';
import * as helper                  from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import PropTypes                    from 'prop-types';
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
                                <th>Tên học viên</th>
                                <th>Email</th>
                                <th>Có mặt</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>

                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
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