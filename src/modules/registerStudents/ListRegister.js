import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import * as helper from '../../helpers/helper';
import {Link} from "react-router";
import TooltipButton from "../../components/common/TooltipButton";
import ToggleStar from "../../components/common/ToggleStar";
import StudyProgressTooltip from "./StudyProgressTooltip";

class ListRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {

        return (
            <div className="table-responsive">
                <table id="datatables"
                       className="table table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th>Đánh dấu</th>
                        <th>Lớp</th>
                        <th>Gọi</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {this.props.genId == 0 && <th>Khóa</th>}
                        <th>Mã thẻ</th>
                        <th>Saler</th>
                        <th>Chiến dịch</th>
                        <th>Học phí</th>
                        <th>Mã ưu đãi</th>
                        <th>Đăng kí</th>
                        <th>Hẹn nộp</th>
                        <th>Hẹn test</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.registers.map((register) => {
                        let btn = '';
                        let titleCall = 'Chưa gọi - Còn ' + register.time_to_reach + 'h';
                        if (register.call_status === 'success') {
                            btn = ' btn-success';
                            titleCall = 'Gọi thành công trong vòng ' + register.time_to_reach + 'h';
                        } else if (register.call_status === 'failed') {
                            btn = ' btn-danger';
                            titleCall = 'Gọi thất bại - Còn ' + register.time_to_reach + 'h';
                        } else if (register.call_status === 'calling') {
                            btn = ' btn-info';
                            titleCall = 'Đang gọi';
                        }

                        let color = "";
                        switch (register.status) {
                            case 1:
                                color = "success";
                                break;
                            case 2:
                                color = "warning";
                                break;
                            case 3:
                                color = "danger";
                                break;
                            case 4:
                                color = "info";
                                break;
                            case 5:
                                color = "gray";
                                break;
                        }

                        return (
                            <tr key={register.id} className={color}>
                                <td>
                                    <ToggleStar
                                        value={register.bookmark == 1}
                                        isLoading={this.props.isChangingBookmark}
                                        onChange={value => this.props.changeMarkRegister(register.id, value)}
                                    />
                                </td>
                                <td>
                                    <div className="container-dot-bottom-right">
                                        <button className="btn btn-round btn-fab btn-fab-mini text-white"
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                data-placement="right"
                                                data-original-title={register.class.name}>
                                            <img src={register.course_avatar_url} alt=""/>
                                        </button>
                                        <div className="dot-bottom-right"
                                             data-toggle="tooltip" title="" type="button" rel="tooltip"
                                             data-placement="right"
                                             data-original-title={'Học lần ' + register.study_time}>
                                            {register.study_time}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="container-call-status">
                                        <button className={"btn btn-round " + btn + " full-width padding-left-right-10"}
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                onClick={() => this.props.viewCall(register)}
                                                data-original-title={titleCall}>
                                            <i className="material-icons">
                                                phone
                                            </i> {register.call_status !== 'calling' && (register.time_to_reach + 'h')}
                                        </button>

                                    </div>
                                </td>
                                <td>
                                    <StudyProgressTooltip
                                        register={register}
                                    />
                                </td>
                                <td>
                                    <div id="register-email" data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.email}>{register.email}</div>
                                </td>
                                <td><a href={"tel:" + register.phone} className="text-name-student-register">
                                    {helper.formatPhone(register.phone)}
                                </a>
                                </td>
                                {this.props.genId == 0 && <th>{register.gen_name}</th>}
                                <td>{register.code}</td>
                                <td>
                                    {
                                        register.saler ?
                                            (
                                                <Link className="btn btn-xs btn-main"
                                                      style={{backgroundColor: '#' + register.saler.color}}
                                                      to={`/sales/registerlist/${register.saler.id}`}
                                                >
                                                    {helper.getShortName(register.saler.name)}
                                                    <div className="ripple-container"/>
                                                </Link>
                                            )
                                            :
                                            (
                                                <Link className="btn btn-xs btn-main no-data"
                                                      to={`/sales/registerlist/-1`}
                                                >
                                                    Không có
                                                    <div className="ripple-container"/>
                                                </Link>
                                            )

                                    }

                                </td>
                                <td>
                                    {
                                        register.campaign ?
                                            (
                                                <button className="btn btn-xs btn-main"
                                                        style={{backgroundColor: '#' + register.campaign.color}}
                                                        onClick={() => this.props.loadRegisterStudentByCampaign(register.campaign.id)}
                                                >
                                                    {register.campaign.name}
                                                    <div className="ripple-container"/>
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="btn btn-xs btn-main no-data"
                                                        onClick={() => this.props.loadRegisterStudentByCampaign('-1')}
                                                >
                                                    Không có
                                                    <div className="ripple-container"/>
                                                </button>
                                            )
                                    }
                                </td>
                                <td className="text-center">
                                    {
                                        register.paid_status ?

                                            <div className="btn btn-xs btn-main main-background-color"
                                                 data-toggle="tooltip" title=""
                                                 type="button" rel="tooltip"
                                                 data-original-title={register.note}>
                                                {helper.dotNumber(register.money)} vnd
                                            </div>
                                            : 'Chưa nộp'
                                    }
                                </td>
                                <td>{register.coupon}</td>
                                <td>
                                    <div data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.created_at}>
                                        {register.created_at}
                                    </div>
                                </td>
                                <td>
                                    <TooltipButton text={register.appointment_payment_date} placement="top">
                                        <div>
                                            {register.appointment_payment}
                                        </div>
                                    </TooltipButton>
                                </td>
                                <td>
                                    <TooltipButton text={register.date_test_date} placement="top">
                                        <div>
                                            {register.date_test}
                                        </div>
                                    </TooltipButton>
                                </td>
                                <td>
                                    <ButtonGroupAction
                                        disabledEdit={!(register.editable && register.paid_status)}
                                        edit={(obj) => {
                                            return this.props.openModalChangeInfoStudent(obj);
                                        }}
                                        delete={this.props.deleteRegister}
                                        object={register}
                                        disabledDelete={!register.is_delete}>
                                        <div className={"flex"}>
                                            {
                                                register.status <= 4 &&
                                                <TooltipButton text={register.status == 3 ? "Học lại" : "Đổi lớp"}
                                                               placement={"top"}>
                                                    <a onClick={() => this.props.openModalChangeClass(register.id, (register.status == 3 || register.status == 2))}
                                                       type="button"
                                                    >
                                                        <i className="material-icons">{register.status == 3 ? "restore" : "swap_vertical_circle"}</i>
                                                    </a>
                                                </TooltipButton>

                                            }
                                            {
                                                register.status == 1 &&
                                                <a data-toggle="tooltip" title="Bảo lưu"
                                                   onClick={() => this.props.changeStatusPause(register)}
                                                   type="button"
                                                   rel="tooltip">
                                                    <i className="material-icons">highlight_off</i>
                                                </a>
                                            }
                                            {
                                                !register.has_in_lead &&
                                                <TooltipButton text={"Thêm vào lead"}
                                                               placement={"top"}>
                                                    <a onClick={() => this.props.addMyLead(register.student_id)}
                                                       type="button"
                                                    >
                                                        <i className="material-icons">add</i>
                                                    </a>
                                                </TooltipButton>

                                            }
                                        </div>
                                    </ButtonGroupAction>
                                </td>
                            </tr>);
                    })}

                    </tbody>
                </table>
            </div>
        );
    }
}

ListRegister.propTypes = {
    registers: PropTypes.array.isRequired,
    viewCall: PropTypes.func.isRequired,
    addMyLead: PropTypes.func.isRequired,
    openModalChangeClass: PropTypes.func.isRequired,
    deleteRegister: PropTypes.func.isRequired,
    loadRegisterStudentByCampaign: PropTypes.func.isRequired,
    loadRegisterStudentBySaler: PropTypes.func,
    openModalChangeInfoStudent: PropTypes.func,
    changeStatusPause: PropTypes.func,
    genId: PropTypes.number,
    isChangingBookmark: PropTypes.bool,
};

export default ListRegister;