import React                        from 'react';
import {Modal}                      from 'react-bootstrap';
import Loading                      from '../../components/common/Loading';
import * as helper                  from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import PropTypes                    from 'prop-types';
class ListLessonModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }


    render(){
        return (
            <Modal
                bsSize="large"
                show={this.props.show}
                onHide={this.props.onHide}

            >
                <Modal.Header closeButton style={{paddingLeft :  "50px", paddingTop: "50px"}}>
                    <div className="row" style={{paddingLeft :  "15px"}}>
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

                    <div className="row"><br/></div>
                    <div className="row">
                        <div className="col-md-3">{
                            this.props.class.teacher ?
                                (
                                    <TooltipButton text="Giảng viên"
                                        placement="top"
                                        >
                                        <button className="btn btn-sm"
                                        style={{backgroundColor: '#' + this.props.class.teacher.color , inlineSize: "-webkit-fill-available"}}>
                                        {helper.getShortName(this.props.class.teacher.name)}
                                        <div className="ripple-container"/>
                                        </button>
                                        </TooltipButton>
                                )
                                :
                                (
                                    <div className="no-data">
                                        Không có thông tin giảng viên
                                    </div>
                                )

                        }</div>

                        <div className="col-md-3">{
                            this.props.class.teacher_assistant ?
                                (
                                    <TooltipButton text="Trợ giảng"
                                                    placement="top">
                                        <button className="btn btn-sm"
                                            style={{backgroundColor: '#' + this.props.class.teacher_assistant.color, "inline-size": "-webkit-fill-available"}}>
                                            {helper.getShortName(this.props.class.teacher_assistant.name)}
                                            <div className="ripple-container"/>
                                        </button>
                                    </TooltipButton>
                                )
                                :
                                (
                                    <div className="no-data">
                                        Không có thông tin trợ giảng
                                    </div>
                                )

                        }</div>
                    </div>
                </Modal.Header>
                <Modal.Body style={{paddingLeft :  "50px"}}>
                    {
                        this.props.isLoadingLessonClassModal ?
                        <Loading/>
                        :
                        <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th >Thứ tự</th>
                                <th style={{textAlign:"center"}}>Tình trạng điểm danh</th>
                                <th/>
                            </tr>
                            </thead><tbody>
                        {this.props.lessondata.map((item, index)=>{
                        return (
                            <tr key={item.order}>
                                <td><h6>
                                    <strong>Buổi {item.order} </strong>
                                </h6></td>
                                <td width="65%" style={{textAlign:"center"}}>
                                    <h6>{item.attended_students + "/" + item.total_students}</h6>
                                    <div className="progress progress-line-success progress-bar-table" style={{width: "100%"}}>
                                        <div className="progress-bar progress-bar-success" role="progressbar"
                                             aria-valuenow="60"
                                             aria-valuemin="0"
                                             aria-valuemax="100"
                                             style={{width: item.attended_students * 100 / item.total_students+'%'}}>
                                      <span className="sr-only">{item.attended_students * 100 / item.total_students}%</span>
                                        </div>
                                    </div>
                                </td>

                                <td style={{textAlign:"center"}}>
                                    <button className="btn btn-fill btn-rose" type="button"
                                            style={{fontSize: "inherit"}}
                                            onClick={()=>{return this.props.openModalDetailLesson(index + 1);}}
                                    >Điểm danh</button>
                                </td>
                            </tr>
                        );
                        })}
                        </tbody></table>
                    </div>
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

ListLessonModal.PropTypes ={
    lessondata: PropTypes.array,
    show: PropTypes.bool,
    onHide: PropTypes.func,
}

export default (ListLessonModal);
/**/