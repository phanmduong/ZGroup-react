import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import filterStore from "./filterStore";
import Loading from "../../../components/common/Loading";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import DashboardHistoryClassStore from "./DashboardHistoryClassStore";
import {getValueFromKey} from "../../../helpers/entity/object";
import TooltipButton from "../../../components/common/TooltipButton";
import {getShortName} from "../../../helpers/helper";


@observer
class DashboardHistoryClassComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardHistoryClassStore();
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        this.store.loadClasses(filter);
    }

    render() {
        const {isLoading, classes} = this.store;
        console.log(classes);
        return (
            <div>
                <Filter loadData={this.loadData}/>
                {
                    isLoading ? <Loading/> :
                        <div>
                            {classes.map((item) => {
                                return (
                                    <div>
                                        <div className="bold" style={{fontSize: 18}}>{item.date}</div>
                                        <div className="table-responsive table-split" style={{marginTop: 10}}>
                                            <table className="table" cellSpacing="0">
                                                <tbody>
                                                {
                                                    item.classes.map((itemClass) => {


                                                        return (
                                                            <tr key={itemClass.id}>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-round btn-fab btn-fab-mini text-white">
                                                                        <img
                                                                            src={getValueFromKey(itemClass, "course.icon_url")}
                                                                            alt=""/>
                                                                    </button>
                                                                </td>

                                                                <td>
                                                                    <a href={"/teaching/class/" + itemClass.id}
                                                                       target={"_blank"}>
                                                                        <TooltipButton placement={"top"}
                                                                                       text={getValueFromKey(itemClass, "course.name")}>
                                                                            <strong> {itemClass.name}</strong>
                                                                        </TooltipButton>

                                                                    </a>
                                                                </td>
                                                                <td>
                                                                    <div>{itemClass.study_time}</div>
                                                                </td>
                                                                <td>
                                                                    <TooltipButton placement={"top"}
                                                                                   text={getValueFromKey(itemClass, "base.name") + " : " + getValueFromKey(itemClass, "base.address")}>
                                                                        <div>Phòng
                                                                            học {getValueFromKey(itemClass, "room.name")}</div>
                                                                    </TooltipButton>
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className="flex flex-align-items-center flex-justify-content-center">
                                                                        <TooltipButton placement={"top"}
                                                                                       text={"Giảng viên"}>
                                                                            <div className={"btn btn-xs btn-main"}
                                                                                 style={{
                                                                                     backgroundColor: "#" + getValueFromKey(itemClass, "current_lesson.teacher.color"),
                                                                                     minWidth: 100
                                                                                 }}>
                                                                                {getValueFromKey(itemClass, "current_lesson.teacher.name")
                                                                                    ? getShortName(getValueFromKey(itemClass, "current_lesson.teacher.name")) : "Không có"}</div>
                                                                        </TooltipButton>
                                                                        <TooltipButton placement={"top"}
                                                                                       text={itemClass.teacherCheckInStatus != "none" ? itemClass.teacherCheckInStatus == "accepted" ? "Đúng giờ" : "Vi phạm" : "Chưa diễn ra"}>
                                                                            <div className={"btn btn-xs btn-main"}
                                                                                 style={{
                                                                                     backgroundColor: itemClass.teacherCheckInStatus != "none" ? itemClass.teacherCheckInStatus == "accepted" ? "#32CA41" : "#FC0000" : "#none",
                                                                                     marginLeft: 5
                                                                                 }}>
                                                                                {getValueFromKey(itemClass, "current_lesson.teacher.check_in")
                                                                                    ? getValueFromKey(itemClass, "current_lesson.teacher.check_in") : "00:00"}</div>
                                                                        </TooltipButton>
                                                                        <TooltipButton placement={"top"}
                                                                                       text={itemClass.teacherCheckOutStatus != "none" ? itemClass.teacherCheckOutStatus == "accepted" ? "Đúng giờ" : "Vi phạm" : "Chưa diễn ra"}>
                                                                            <div className={"btn btn-xs btn-main"}
                                                                                 style={{
                                                                                     backgroundColor: itemClass.teacherCheckOutStatus != "none" ? itemClass.teacherCheckOutStatus == "accepted" ? "#32CA41" : "#FC0000" : "#none",
                                                                                     marginLeft: 5
                                                                                 }}>
                                                                                {getValueFromKey(itemClass, "current_lesson.teacher.check_out")
                                                                                    ? getValueFromKey(itemClass, "current_lesson.teacher.check_out") : "00:00"}</div>
                                                                        </TooltipButton>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className="flex flex-align-items-center flex-justify-content-center">
                                                                        <TooltipButton placement={"top"}
                                                                                       text={"Trợ giảng"}>
                                                                            <div className={"btn btn-xs btn-main"}
                                                                                 style={{
                                                                                     backgroundColor: "#" + getValueFromKey(itemClass, "current_lesson.teaching_assistant.color"),
                                                                                     minWidth: 80
                                                                                 }}>
                                                                                {getValueFromKey(itemClass, "current_lesson.teaching_assistant.name") ?
                                                                                    getShortName(getValueFromKey(itemClass, "current_lesson.teaching_assistant.name")) : "Không có"}</div>
                                                                        </TooltipButton>
                                                                        <TooltipButton placement={"top"}
                                                                                       text={itemClass.taCheckInStatus != "none" ? itemClass.taCheckInStatus == "accepted" ? "Đúng giờ" : "Vi phạm" : "Chưa diễn ra"}>
                                                                            <div className={"btn btn-xs btn-main"}
                                                                                 style={{
                                                                                     backgroundColor: itemClass.taCheckInStatus != "none" ? itemClass.taCheckInStatus == "accepted" ? "#32CA41" : "#FC0000" : "#none",
                                                                                     marginLeft: 5
                                                                                 }}>
                                                                                {getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_in")
                                                                                    ? getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_in") : "00:00"}</div>
                                                                        </TooltipButton>
                                                                        <TooltipButton placement={"top"}
                                                                                       text={itemClass.taCheckOutStatus != "none" ? itemClass.taCheckOutStatus == "accepted" ? "Đúng giờ" : "Vi phạm" : "Chưa diễn ra"}>
                                                                            <div className={"btn btn-xs btn-main"}
                                                                                 style={{
                                                                                     backgroundColor: itemClass.taCheckOutStatus != "none" ? itemClass.taCheckOutStatus == "accepted" ? "#32CA41" : "#FC0000" : "#none",
                                                                                     marginLeft: 5
                                                                                 }}>
                                                                                {getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_out")
                                                                                    ? getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_out") : "00:00"}</div>
                                                                        </TooltipButton>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                }
            </div>

        );
    }
}


export default DashboardHistoryClassComponent;
