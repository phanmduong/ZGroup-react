import React from "react";
import {store} from "./store/RegisterListStore";
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
import RegisterActionsOverlay from "./overlays/RegisterActionsOverlay";
import MarketingCampaignRegisterOverlay from "./overlays/MarketingCampaignRegisterOverlay";
import MarketingCampaignRegisterStore from "./store/MarketingCampaignRegisterStore";

@observer
class RegisterList extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.campaignStore = new MarketingCampaignRegisterStore();

    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    onClickButtonChangeFilter = (name, value) => {
        console.log('list', name, value);
        if (isEmpty(value)) value = {};
        store.filter[name] = {...value, value: value.id, label: value.name};
        store.filter[name + '_id'] = value.id;
        store.loadRegisters();
    };

    onMouseOverRow = (id, state) => {
        let tooltip_id = `#row-tooltip-${id}`;
        $(tooltip_id).tooltip({
            trigger: 'manual',
            tooltipClass: "tooltip-register-list-row"
        }).data('bs.tooltip')
            .tip()
            .addClass('tooltip-register-list-row');
        $(tooltip_id).tooltip(state);
    };

    render() {
        return (
            <div className="table-sticky-head table-split" radius="five">
                <table id="datatables"
                       className="table table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead>
                    <tr>

                        <th/>
                        <th/>
                        <th>Họ tên</th>
                        <th>Môn học</th>
                        <th>Lớp học</th>
                        <th>Saler</th>
                        <th>Source</th>
                        <th>Campaign</th>
                        <th>Trạng thái</th>
                        <th>Học phí</th>
                        <th>Thời gian</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {store.registers.map((register, index) => {
                        // let color = ['', 'success', 'warning', 'danger', 'info', 'gray'][register.status];

                        let btnCallClass = '';
                        if (register.tele_call) {
                            btnCallClass = REGISTER_CALL_STATUS_CLASS_NAMES[register.tele_call.call_status];
                        }

                        return (
                            <tr key={register.id} className={`cursor-pointer`}
                                onMouseEnter={() => this.onMouseOverRow(register.id, 'show')}
                                onMouseLeave={() => this.onMouseOverRow(register.id, 'hide')}
                            >
                                <td style={{minWidth: 40}}>
                                    <ToggleStar
                                        value={register.bookmark}
                                        isLoading={store.isChangingBookmark}
                                        onChange={value => store.changeMarkRegister(index, value)}
                                        style={{fontSize: 20}}
                                    />
                                </td>
                                <td>
                                    {register.tele_call &&
                                    <TooltipButton text={register.tele_call.call_status_text} placement="top">
                                        <div className="container-call-status">
                                            <button
                                                className={"btn btn-round btn-xs " + btnCallClass}
                                                // onClick={() => this.props.viewCall(register)}
                                            >
                                                <i className="material-icons">phone</i>
                                                {/*{register.tele_call.call_status !== 'calling' && (register.time_to_reach + 'h')}*/}

                                            </button>
                                        </div>
                                    </TooltipButton>}
                                </td>
                                <td>
                                    {register.student && <div>
                                        <div className="flex flex-align-items-center">
                                            <StudyProgressTooltip
                                                openModalRegisterDetail={openModalRegisterDetail}
                                                register={register}
                                            />

                                        </div>
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
                                <td>
                                    <div>

                                        {register.course && <div>
                                            <a href={`/teaching/courses/edit/${register.course.id}`} target="_blank"
                                               className="text-name-student-register">
                                                <TooltipButton text="Môn học" placement="top"><b>
                                                    {register.course.name}
                                                </b></TooltipButton>
                                            </a>
                                        </div>}
                                    </div>
                                </td>
                                <td>

                                    <div>
                                        {register.studyClass && <div>
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
                                    <div
                                        data-toggle="tooltip"
                                        title={
                                            {
                                                0: 'Chưa đóng tiền',
                                                1: 'Đã nộp tiền',
                                                2: 'Danh sách chờ',
                                                3: 'Bảo lưu',
                                                4: 'Học lại',
                                                5: 'Đã học xong',
                                                6: 'Đã hoàn tiền',
                                            }[register.status]
                                        }
                                        type="button"
                                        rel="tooltip"
                                        id={`row-tooltip-${register.id}`}
                                    >
                                        {
                                            register.saler ?
                                                (
                                                    <a className="btn btn-xs btn-main none-margin width-100"
                                                       style={{backgroundColor: '#' + register.saler.color}}
                                                       onClick={() => this.onClickButtonChangeFilter("saler", register.saler)}
                                                    >
                                                        {helper.getShortName(register.saler.name)}
                                                        <div className="ripple-container"/>
                                                    </a>
                                                )
                                                :
                                                (
                                                    <a className="btn btn-xs btn-main none-margin width-100"
                                                       onClick={() => this.onClickButtonChangeFilter("saler", store.defaultEmptySelectObject)}
                                                    >
                                                        No saler
                                                        <div className="ripple-container"/>
                                                    </a>
                                                )

                                        }
                                    </div>
                                </td>
                                <td><SourceOverlay
                                    className="btn btn-main btn-xs none-margin source-value width-100"
                                    student={register}
                                /></td>
                                <td>
                                {/*{*/}
                                {/*    register.marketing_campaign ?*/}
                                {/*        (*/}
                                {/*            <button className="btn btn-xs btn-main none-margin width-100"*/}
                                {/*                    style={{backgroundColor: '#' + register.marketing_campaign.color}}*/}
                                {/*                    onClick={() => this.onClickButtonChangeFilter("campaign", register.marketing_campaign)}*/}

                                {/*            >*/}
                                {/*                {register.marketing_campaign.name}*/}
                                {/*                <div className="ripple-container"/>*/}
                                {/*            </button>*/}
                                {/*        )*/}
                                {/*        :*/}
                                {/*        (*/}
                                {/*            <button className="btn btn-xs btn-main none-margin width-100"*/}
                                {/*                    onClick={() => this.onClickButtonChangeFilter("campaign", store.defaultEmptySelectObject)}*/}
                                {/*            >*/}
                                {/*                No campaign*/}
                                {/*                <div className="ripple-container"/>*/}
                                {/*            </button>*/}
                                {/*        )*/}
                                {/*}*/}
                                <MarketingCampaignRegisterOverlay
                                    register={register}
                                    store={this.campaignStore}
                                    updateInfoRegister={store.changeCampaignRegister}
                                    className="btn btn-xs source-value width-100 bold"
                                />
                                </td>
                                <td>
                                    <StatusesOverlay
                                        data={register.register_status}
                                        refId={register.id}
                                        statusRef="registers"
                                        className="btn btn-xs source-value width-100 bold"
                                    />
                                </td>
                                <td>
                                    {
                                        register.paid_status ?
                                            <TooltipButton text={register.note || 'Chưa có note'} placement="top">
                                                <div
                                                    className="btn btn-xs btn-main none-margin main-background-color width-100">
                                                    {helper.dotNumber(register.money)} vnd
                                                </div>
                                            </TooltipButton>
                                            :
                                            <div>{register.tele_call &&
                                            <TooltipButton
                                                text={`Hẹn nộp ${register.tele_call.appointment_payment_date}`}
                                                placement="top">
                                                <div className="width-100">
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
                                    <div data-toggle="tooltip" title=""
                                         type="button" rel="tooltip"
                                         data-original-title={register.created_at}>
                                        {register.created_at}
                                    </div>
                                </td>
                                <td>
                                    <RegisterActionsOverlay
                                        openModalRefund={() => this.showModalRefund({...register})}
                                        register={{...register}}
                                        reload={() => store.loadRegisters()}
                                    />
                                </td>


                                {/*<td>*/}
                                {/*    {register.coupon && <div className="btn btn-xs btn-main none-margin">*/}
                                {/*        {register.coupon}*/}
                                {/*    </div>}*/}

                                {/*    {register.coupons && register.coupons.map((coupon, key_coupon) => {*/}
                                {/*        return (<div key={key_coupon} className="btn btn-xs btn-main none-margin"*/}
                                {/*                     style={{background: coupon.color}}>*/}
                                {/*            {coupon.name}*/}
                                {/*        </div>);*/}
                                {/*    })}*/}

                                {/*</td>*/}
                                {/*<td/>*/}
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