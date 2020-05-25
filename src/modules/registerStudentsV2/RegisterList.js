import React from "react";
import {store} from "./RegisterListStore";
import ToggleStar from "../../components/common/ToggleStar";
import {observer} from "mobx-react";
import {REGISTER_CALL_STATUS_CLASS_NAMES} from "../../constants/constants";
import TooltipButton from "../../components/common/TooltipButton";
import StudyProgressTooltip from "./StudyProgressTooltip";
import * as helper from "../../helpers/helper";
import {openModalRegisterDetail} from "../globalModal/globalModalActions";
import SourceOverlay from "../infoStudent/overlays/SourceOverlay";
import StatusesOverlay from "../infoStudent/overlays/StatusesOverlay";
import {isEmpty} from "../../helpers/entity/mobx";

@observer
class RegisterList extends React.Component {


    constructor(props, context) {
        super(props, context);

    }

    onClickButtonChangeFilter = (name,value) => {
        console.log('list',name,value);
        if(isEmpty(value)) value = {};
        store.filter[name] = {...value, value:value.id, label:value.name};
        store.filter[name + '_id'] = value.id;
        store.loadRegisters();
    };

    render() {
        return (
            <div className="table-responsive table-split">
                <table id="datatables"
                       className="table table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead>
                    <tr>
                        <th>Đánh dấu</th>

                        <th>Lớp</th>
                        <th>Gọi</th>
                        <th>Họ tên</th>
                        <th>Khóa</th>
                        <th>Mã đăng kí</th>
                        <th>Saler</th>
                        <th>Học phí</th>
                        <th>Trạng thái</th>
                        <th>Mã ưu đãi</th>
                        <th>Đăng kí</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {store.registers.map((register, index) => {
                        let color = ['', 'success', 'warning', 'danger', 'info', 'gray'][register.status];

                        let btn = '';
                        if (register.tele_call) {
                            btn = REGISTER_CALL_STATUS_CLASS_NAMES[register.tele_call.call_status];
                        }

                        return (
                            <tr key={register.id} className={color}>
                                <td>
                                    <ToggleStar
                                        value={register.bookmark}
                                        isLoading={store.isChangingBookmark}
                                        onChange={value => store.changeMarkRegister(index, value)}
                                    />
                                </td>
                                <td>
                                    <div>

                                        {register.studyClass && <div>
                                            <a href={`/teaching/courses/edit/${register.course.id}`} target="_blank"
                                               className="text-name-student-register">
                                                <TooltipButton text="Môn học" placement="top"><b>
                                                    {register.course.name}
                                                </b></TooltipButton>
                                            </a>
                                        </div>}
                                        {register.course && <div>
                                            <a href={`/teaching/class/${register.studyClass.id}`} target="_blank"
                                               className="text-name-student-register">
                                                <TooltipButton text="Lớp học" placement="top"><b>
                                                    {register.studyClass.name}
                                                </b></TooltipButton></a>
                                        </div>}
                                    </div>
                                    {/*<div className="container-dot-bottom-right">*/}
                                    {/*    {register.studyClass &&*/}
                                    {/*    <button className="btn btn-round btn-fab btn-fab-mini text-white">*/}
                                    {/*        {register.course && register.course.icon_url &&*/}
                                    {/*        <TooltipButton text={register.studyClass.name} placement="top">*/}
                                    {/*            <img src={register.course.icon_url} alt=""/>*/}
                                    {/*        </TooltipButton>}*/}
                                    {/*    </button>}*/}
                                    {/*</div>*/}
                                </td>

                                <td>
                                    {register.tele_call &&
                                    <TooltipButton text={register.tele_call.call_status_text} placement="top">
                                        <div className="container-call-status">

                                            <button
                                                className={"btn btn-round " + btn + " full-width padding-left-right-10"}
                                                // onClick={() => this.props.viewCall(register)}
                                            >

                                                <i className="material-icons">phone</i>
                                                {register.tele_call.call_status !== 'calling' && (register.time_to_reach + 'h')}

                                            </button>
                                        </div>
                                    </TooltipButton>}
                                </td>
                                <td>
                                    {register.student && <div>
                                        <StudyProgressTooltip
                                            openModalRegisterDetail={openModalRegisterDetail}
                                            register={register}
                                        />
                                        {/*<div id="register-email" data-toggle="tooltip" title=""*/}
                                        {/*     type="button" rel="tooltip"*/}
                                        {/*     data-original-title={register.email}>*/}
                                        {/*    {register.email}</div>*/}
                                        <a href={"tel:" + register.student.phone}
                                           className="text-phone-student-register">
                                            {helper.formatPhone(register.student.phone)}
                                        </a>
                                    </div>}

                                </td>
                                <td>{register.gen && register.gen.name}</td>

                                <td>{register.code}</td>
                                <td>
                                    <div className="flex flex-col">
                                        {
                                            register.saler ?
                                                (
                                                    <a className="btn btn-xs btn-main"
                                                       style={{backgroundColor: '#' + register.saler.color}}
                                                       onClick={() => this.onClickButtonChangeFilter("saler", register.saler)}
                                                    >
                                                        {helper.getShortName(register.saler.name)}
                                                        <div className="ripple-container"/>
                                                    </a>
                                                )
                                                :
                                                (
                                                    <a className="btn btn-xs btn-main"
                                                       onClick={() => this.onClickButtonChangeFilter("saler", store.defaultEmptySelectObject)}
                                                    >
                                                        No saler
                                                        <div className="ripple-container"/>
                                                    </a>
                                                )

                                        }
                                        {
                                            register.marketing_campaign ?
                                                (
                                                    <button className="btn btn-xs btn-main"
                                                            style={{backgroundColor: '#' + register.marketing_campaign.color}}
                                                            onClick={() => this.onClickButtonChangeFilter("campaign", register.marketing_campaign)}

                                                    >
                                                        {register.marketing_campaign.name}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                )
                                                :
                                                (
                                                    <button className="btn btn-xs btn-main"
                                                            onClick={() => this.onClickButtonChangeFilter("campaign",  store.defaultEmptySelectObject)}
                                                    >
                                                        Không có
                                                        <div className="ripple-container"/>
                                                    </button>
                                                )
                                        }


                                        <SourceOverlay
                                            className="btn-xs width-100 padding-vertical-10px source-value  margin-bottom-10"
                                            student={register}
                                        />


                                    </div>
                                </td>
                                <td>
                                    {
                                        register.paid_status ?
                                            <TooltipButton text={register.note} placement="top">
                                                <div className="btn btn-xs btn-main main-background-color">
                                                    {helper.dotNumber(register.money)} vnd
                                                </div>
                                            </TooltipButton>
                                            :
                                            <div>{register.tele_call &&
                                            <TooltipButton
                                                text={`Hẹn nộp ${register.tele_call.appointment_payment_date}`}
                                                placement="top">
                                                <div className="margin-bottom-10">
                                                    {
                                                        register.tele_call.appointment_payment ?
                                                            register.tele_call.appointment_payment :
                                                            'Chưa nộp'
                                                    }
                                                </div>
                                            </TooltipButton>}</div>
                                    }
                                </td>
                                <td>
                                    <StatusesOverlay
                                        data={register.register_status}
                                        refId={register.id}
                                        statusRef="registers"
                                        className="status-overlay margin-bottom-10"
                                    />
                                </td>
                                <td>
                                    {register.coupon && <div className="btn btn-xs btn-main">
                                        {register.coupon}
                                    </div>}

                                    {register.coupons && register.coupons.map((coupon, key_coupon) => {
                                        return (<div key={key_coupon} className="btn btn-xs btn-main"
                                                     style={{background: coupon.color}}>
                                            {coupon.name}
                                        </div>);
                                    })}

                                </td>
                                <td>
                                    <div data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.created_at}>
                                        {register.created_at}
                                    </div>
                                </td>
                                <td/>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default RegisterList;