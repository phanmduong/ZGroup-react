import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";
import {STATUS_WORK, DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import moment from "moment/moment";
import * as helper from '../../helpers/helper';

class CardWork extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEditable: false,
            originCard: {}
        };
        this.type = {
            'personal': 'Cá nhân',
            'team': 'Nhóm',
            'person_project': 'Dự án riêng',
        };
    }

    render() {
        const {work, key, status, user} = this.props;
        let time = moment(work.deadline || "", [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
        let checkId = !checkUser(user.id, work.staffs);//user not belong to work
        return (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    return this.props.openInfoModal(work);
                }}
                key={key} id={key} data-order={key} className="card-content keetool-idcard">
                <div className="card keetool-card keetool-card-wrapper">
                    <div className="card-content keetool-card" style={{position: "relative"}}>
                        <div style={{position: "absolute", top: 10, right: 10}} hidden={(user.role != 2) && checkId}>
                            <div className="board-action keetool-card">
                                <div className="dropdown">
                                    <a className="dropdown-toggle btn-more-dropdown" type="button" data-toggle="dropdown"><i className="material-icons">more_horiz</i></a>
                                    <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">
                                        {/*<li className="more-dropdown-item" hidden={(status == STATUS_WORK[3].value) ? true : user.role != 2}>*/}
                                        {/*<Link*/}
                                        {/*onClick={(e)=>{e.stopPropagation();}}*/}
                                        {/*to={`/hr/job-assignment/edit/${work.id}`}>*/}
                                        {/*<i style={{fontSize: "16px"}}*/}
                                        {/*className="material-icons keetool-card">edit</i>*/}
                                        {/*Chỉnh sửa công việc*/}
                                        {/*</Link>*/}
                                        {/*</li>*/}
                                        {/*<li className="more-dropdown-item">*/}
                                        {/*<a onClick={()=>{return this.props.delete(work.id);}}>*/}
                                        {/*<i style={{fontSize: "16px"}}*/}
                                        {/*className="material-icons keetool-card">delete</i>*/}
                                        {/*Xóa công việc*/}
                                        {/*</a>*/}
                                        {/*</li>*/}
                                        <li className="more-dropdown-item"
                                            hidden={(status == STATUS_WORK[0].value) ? checkId : true}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.acceptWork(work.id, user.id);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">done_all</i>
                                                Chấp nhận
                                            </a>
                                        </li>

                                        <li className="more-dropdown-item" hidden={(status != STATUS_WORK[4].value)}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.acceptPay(work.id);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">local_atm</i>
                                                Chấp nhận chi tiền
                                            </a>
                                        </li>
                                        <li className="more-dropdown-item" hidden={(status == STATUS_WORK[0].value) ? checkId : true}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.change(work, STATUS_WORK[3].value);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">delete</i>
                                                Hủy
                                            </a>
                                        </li>
                                        <li className="more-dropdown-item" hidden={(status == "doing") ? checkId : true}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.openExtendModal(work);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">access_alarm</i>
                                                Xin gia hạn
                                            </a>
                                        </li>
                                        <li className="more-dropdown-item" hidden={(status == STATUS_WORK[1].value) ? checkId : true}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.openFinishModal(work);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">done</i>
                                                Hoàn thành
                                            </a>
                                        </li>
                                        <li className="more-dropdown-item" hidden={(status == STATUS_WORK[2].value) ? (user.role != 2) : true}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.revertWork(work);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">undo</i>
                                                Yêu cầu làm lại
                                            </a>
                                        </li>
                                        <li className="more-dropdown-item" hidden={(status == STATUS_WORK[2].value) ? (user.role != 2) : true}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.openModalRateWork(work.id);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">done</i>
                                                Đánh giá công việc
                                            </a>
                                        </li>
                                        <li className="more-dropdown-item"
                                            hidden={(status == STATUS_WORK[5].value) ? (user.role != 2) : true}>
                                            <a onClick={(e) => {
                                                e.stopPropagation();
                                                return this.props.unArchiveWork(work, STATUS_WORK[2].value);
                                            }}>
                                                <i style={{fontSize: "16px"}}
                                                   className="material-icons keetool-card">unarchive</i>
                                                Khôi phục công việc
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="card-title keetool-card"
                             style={{paddingRight: "25px", lineHeight: "18px", fontWeight: 600}}>
                            {work.name}
                        </div>

                        <div className="keetool-card" style={{padding: "2px 0", display: "flex"}}>
                            <Avatar className="keetool-card" size={25}
                                    url={helper.validateLinkImage(work.payer.avatar_url)}/>
                            {work.payer.name}
                        </div>


                        <div className="keetool-card">
                            {this.type[work.type]} / {work.bonus_value + " " + (work.currency.name || "")}
                        </div>

                        <div className="keetool-card" style={{marginTop: "5px"}}>
                            {
                                work.staffs && work.staffs.length > 0 && (
                                    <div className="keetool-card"
                                         style={{display: "flex", flexWrap: "wrap", flexDirection: "row-reverse"}}>
                                        {
                                            (work.staffs && work.staffs.length > 5) &&
                                            <div key={-1} className="keetool-card" style={{padding: "2px 0"}}>
                                                <div style={{
                                                    width: "25px",
                                                    marginRight: "5px",
                                                    height: "25px",
                                                    lineHeight: "25px",
                                                    textAlign: "center",
                                                    backgroundColor: "#d9d9d9",
                                                    borderRadius: "4px"
                                                }}>
                                                    <i className="material-icons">add</i>
                                                </div>
                                            </div>
                                        }
                                        {work.staffs.slice(0, Math.min(work.staffs.length, 4)).map((staff) => {
                                            return (
                                                <div key={staff.id} className="keetool-card" style={{padding: "2px 0"}}>
                                                    <Avatar className="keetool-card" size={25}
                                                            url={helper.validateLinkImage(staff.avatar_url)}/>
                                                </div>
                                            );
                                        })}


                                    </div>
                                )
                            }
                        </div>

                        {work.deadline && (
                            <div className="keetool-card">
                                <small className="keetool-card">Deadline: {time}</small>
                            </div>)}
                    </div>
                </div>


            </div>
        );
    }
}

function checkUser(id, arr) {
    let check = false;
    arr.forEach((obj) => {
        if (obj.id == id) {
            check = true;
        }
    });
    return check;
}

CardWork.propTypes = {
    change: PropTypes.func,
    delete: PropTypes.func,
    acceptWork: PropTypes.func,
    acceptPay: PropTypes.func,
    doneWork: PropTypes.func,
    revertWork: PropTypes.func,
    archiveWork: PropTypes.func,
    openInfoModal: PropTypes.func,
    openExtendModal: PropTypes.func,
    openFinishModal: PropTypes.func,
    openModalRateWork: PropTypes.func,
    work: PropTypes.object,
    user: PropTypes.object,
    key: PropTypes.number,
    status: PropTypes.string,
    unArchiveWork: PropTypes.func.isRequired,
};

export default CardWork;