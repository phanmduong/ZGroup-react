import React from "react";
import Loading from "../../components/common/Loading";
import {avatarEmpty, dotNumber, formatPhone, round2} from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";
import {store} from "./dashboardStaffStore";
import {observer} from "mobx-react";
import ListClass from "./component/ListClass";
import TeachingSchedule from "./component/TeachingSchedule";
import WorkShifts from "./component/WorkShifts";
import Shifts from "./component/Shifts";
import RegisterChart from "./component/RegisterChart";
import ListRegister from "./component/ListRegister";

@observer
class DashboardStaffComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadDashboardStaff();
    }

    render() {
        if (store.isLoading) {
            return <Loading/>;
        } else {
            let avatar = avatarEmpty(store.user.avatar_url) ? NO_AVATAR : store.user.avatar_url;
            if (store.user) {
                return (
                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="flex flex-row-center">
                                            <div
                                                style={{
                                                    background: "url(" + avatar + ") center center / cover",
                                                    width: "100px",
                                                    height: "100px",
                                                    borderRadius: "50%"
                                                }}
                                            />
                                            <div className="flex flex-col margin-left-20">
                                                <div className="font-size-1_5em">
                                                    <strong>{store.user.name}</strong>
                                                </div>
                                                <div className="font-weight-400 margintop-10">
                                                    {store.user.email}
                                                </div>
                                                <div className="font-weight-400 margintop-10 ">
                                                    <a
                                                        className="text-primary"
                                                        href={"tel:" + store.user.phone}>
                                                        {formatPhone(store.user.phone)}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-content">
                                        {
                                            store.user.sales_kpi ?
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div
                                                            className="flex flex-col flex-justify-content-center"
                                                            style={{height: "100px"}}>
                                                            <div className="font-size-1_5em">
                                                                <strong>KPI hiện tại</strong>
                                                            </div>
                                                            <br/>
                                                            <div>{dotNumber(store.user.sales_money)}đ
                                                                / {dotNumber(store.user.sales_kpi)}đ
                                                                ({round2(store.user.sales_money * 100, store.user.sales_kpi)}%)
                                                            </div>
                                                            <div className="progress progress-line-primary">
                                                                <div className="progress-bar progress-bar-rose"
                                                                     role="progressbar" aria-valuenow="60"
                                                                     aria-valuemin="0" aria-valuemax="100"
                                                                     style={{width: (store.user.sales_money * 100 / store.user.sales_kpi) + "%"}}>
                                                                    <span
                                                                        className="sr-only">60% Complete</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div
                                                            className="flex flex-col flex-justify-content-center"
                                                            style={{height: "100px"}}>
                                                            <div className="font-size-1_5em">
                                                                <strong>Bộ phận</strong>
                                                            </div>
                                                            <div className="font-weight-400 margintop-10">
                                                                {store.user.department
                                                                    ? store.user.department.name
                                                                    : "Không có"}
                                                            </div>
                                                            <div className="font-weight-400 margintop-10">
                                                                <div className="text-primary">
                                                                    {store.user.base
                                                                        ? store.user.base.name
                                                                        : "Không có"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div
                                                            className="flex flex-col flex-justify-content-center"
                                                            style={{height: "100px"}}>
                                                            <div className="font-size-1_5em">
                                                                <strong>Chức vụ</strong>
                                                            </div>
                                                            <div className="font-weight-400 margintop-10">
                                                                {store.user.current_role
                                                                    ? store.user.current_role.role_title
                                                                    : "Không có"}
                                                            </div>
                                                            <div className="font-weight-400 margintop-10">
                                                                <div className="text-primary">
                                                                    {store.user.base
                                                                        ? store.user.base.name
                                                                        : "Không có"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                        {store.user.now_classes && store.user.has_now_classes && <TeachingSchedule/>}
                        {store.user.registers && store.user.has_registers && <ListRegister/>}
                        {store.user.classes && store.user.classes.length > 0 && <ListClass/>}
                        {store.user.work_shifts && store.user.has_work_shifts && <WorkShifts/>}
                        {store.user.shifts && store.user.has_shifts && <Shifts/>}
                        {store.user.registers_by_date && store.user.has_registers && <RegisterChart/>}
                    </div>
                );
            } else {
                return <h1>Có lỗi xảy ra</h1>;
            }
        }
    }
}

export default DashboardStaffComponent;
