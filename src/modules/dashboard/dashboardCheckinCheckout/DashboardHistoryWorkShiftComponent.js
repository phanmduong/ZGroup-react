import React from 'react';
import {observer} from 'mobx-react';
import Filter from "./Filter";
import filterStore from "./filterStore";
import Loading from "../../../components/common/Loading";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import {getValueFromKey} from "../../../helpers/entity/object";
import TooltipButton from "../../../components/common/TooltipButton";
import DashboardHistoryWorkShiftStore from "./DashboardHistoryWorkShiftStore";
import _ from 'lodash';

@observer
class DashboardHistoryWorkShiftComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardHistoryWorkShiftStore();
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
        const {isLoading, work_shifts} = this.store;
        return (
            <div>
                <Filter loadData={this.loadData}/>
                {
                    isLoading ? <Loading/> :
                        <div>
                            {work_shifts.map((item) => {
                                return (
                                    <div>
                                        <div className="bold" style={{fontSize: 18}}>{item.date}</div>
                                        <div className="table-responsive table-split" style={{marginTop: 10}}>
                                            <table className="table" cellSpacing="0">
                                                <tbody>
                                                {
                                                    _.orderBy(item.users, [function (item) {
                                                        return getValueFromKey(item, "base.id");
                                                    }]).map((employee) => {


                                                        return (
                                                            <tr key={employee.id}>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-round btn-fab btn-fab-mini text-white">
                                                                        <img
                                                                            src={getValueFromKey(employee, "avatar_url")}
                                                                            alt=""/>
                                                                    </button>
                                                                </td>

                                                                <td>

                                                                    <strong> {employee.name}</strong>

                                                                </td>
                                                                <td>
                                                                    <div>
                                                                        {getValueFromKey(employee, "base.name") + " : " + getValueFromKey(employee, "base.address")}</div>
                                                                </td>
                                                                <td>
                                                                    <div
                                                                        className="flex-align-items-center flex flex-row"
                                                                        style={{width: 400, flexWrap: 'wrap'}}>
                                                                        {_.orderBy(employee.work_shifts, ["id"]).map((shift) => {
                                                                            let title = (shift.check_in_time ? shift.check_in_time : '00:00') + " - " + (shift.check_out_time ? shift.check_out_time : '00:00');

                                                                            title += " : " + (shift.status != "none" ? shift.status == "accepted" ? "Đúng giờ" : "Vi phạm" : "Chưa diễn ra");

                                                                            return (
                                                                                <TooltipButton placement={"top"}
                                                                                               text={title}>
                                                                                    <div
                                                                                        className={"btn btn-xs btn-main"}
                                                                                        style={{
                                                                                            backgroundColor: shift.status != "none" ? shift.status == "accepted" ? "#32CA41" : "#FC0000" : "#none",
                                                                                            marginLeft: 5
                                                                                        }}>{shift.name}
                                                                                    </div>
                                                                                </TooltipButton>
                                                                            );
                                                                        })}
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


export default DashboardHistoryWorkShiftComponent;
