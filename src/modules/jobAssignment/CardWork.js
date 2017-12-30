import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";
import {Link} from "react-router";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
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
            'personal':'Cá nhân',
            'team':'Nhóm',
            'person_project':'Dự án riêng',
        };
        this.bonus_type = {
            'coin':'Coin',
            'vnd':'VNĐ',

        };
    }

    render() {
        const {work, key, status, user} = this.props;
        let time = moment(work.deadline || "" , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
            return (
                <div
                    onClick={(e)=>{e.stopPropagation();return this.props.openModal(work);}}
                    key={key} id={key} data-order={key}
                    className="card-content keetool-idcard">

                    <div className="card keetool-card keetool-card-wrapper">
                        <div className="card-content keetool-card" style={{position: "relative"}}>
                            <div style={{position: "absolute", top: 10, right: 10}}>
                                <div className="board-action keetool-card">
                                    <div className="dropdown">
                                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                                           data-toggle="dropdown">
                                            <i className="material-icons">more_horiz</i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">
                                            <li className="more-dropdown-item">
                                                <Link
                                                    onClick={(e)=>{e.stopPropagation();}}
                                                    to={`/hr/job-assignment/edit/${work.id}`}>
                                                    <i style={{fontSize: "16px"}}
                                                       className="material-icons keetool-card">edit</i>
                                                    Chỉnh sửa công việc
                                                </Link>
                                            </li>
                                            {/*<li className="more-dropdown-item">*/}
                                                {/*<a onClick={()=>{return this.props.delete(work.id);}}>*/}
                                                    {/*<i style={{fontSize: "16px"}}*/}
                                                       {/*className="material-icons keetool-card">delete</i>*/}
                                                    {/*Xóa công việc*/}
                                                {/*</a>*/}
                                            {/*</li>*/}
                                            <li className="more-dropdown-item" hidden={(status == "pending") ? (!checkUser(user.id, work.staffs)) : true}>
                                                <a onClick={(e)=>{e.stopPropagation();return this.props.acceptWork(work.id, user.id);}}>
                                                    <i style={{fontSize: "16px"}}
                                                       className="material-icons keetool-card">done_all</i>
                                                    Chấp nhận
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item" hidden={!(status == "pending")}>
                                                <a onClick={(e)=>{e.stopPropagation();return this.props.change(work, "cancel");}}>
                                                    <i style={{fontSize: "16px"}}
                                                       className="material-icons keetool-card">delete</i>
                                                    Hủy
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item" hidden={!(status == "doing")}>
                                                <a onClick={(e)=>{e.stopPropagation();}}>
                                                    <i style={{fontSize: "16px"}}
                                                       className="material-icons keetool-card">access_alarm</i>
                                                    Xin gia hạn
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item" hidden={!(status == "doing")}>
                                                <a onClick={(e)=>{e.stopPropagation();}}>
                                                    <i style={{fontSize: "16px"}}
                                                       className="material-icons keetool-card">done</i>
                                                    Hoàn thành
                                                </a>
                                            </li>
                                            <li className="more-dropdown-item" hidden={!(status == "done")}>
                                                <a onClick={(e)=>{e.stopPropagation();}}>
                                                    <i style={{fontSize: "16px"}}
                                                       className="material-icons keetool-card">undo</i>
                                                    Yêu cầu làm lại
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="card-title keetool-card" style={{paddingRight: "25px",lineHeight: "18px",fontWeight: 600}}>
                                {work.name}
                            </div>
                            <div className="keetool-card">{this.type[work.type]} / {work.bonus_value + " "+ this.bonus_type[work.bonus_type]}</div>
                            <div className="keetool-card"></div>

                            <div className="keetool-card" style={{marginTop: "5px"}}>
                                {
                                    work.staffs && work.staffs.length > 0 && (
                                        <div className="keetool-card"
                                             style={{display: "flex", flexWrap: "wrap", flexDirection: "row-reverse"}}>
                                            {work.staffs.map((staff) => {
                                                return (
                                                    <div key={staff.id} className="keetool-card" style={{padding: "2px 0"}}>
                                                        <Avatar className="keetool-card"
                                                                url={helper.validateLinkImage(staff.avatar_url)}
                                                                size={25}/>
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

function checkUser(id,arr) {
    let check = false;
    arr.forEach((obj)=>{
        if (obj.id == id) {
            check = true;
        }
    });
    return check;
}

CardWork.propTypes = {
    delete: PropTypes.func,
    acceptWork: PropTypes.func,
    openModal: PropTypes.func,
    work: PropTypes.object,
    key: PropTypes.number,
    status: PropTypes.string,
};

export default CardWork;