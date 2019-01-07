import React from "react";
import Loading from "../../components/common/Loading";
// import PropTypes from "prop-types";
import store from "./statisticsStore";
import {observer} from "mobx-react/index";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import Pagination from "../../components/common/Pagination";
import * as helper from "../../helpers/helper";

import {loadRegistersApi} from "./statisticsApis";
import * as XLSX from "xlsx";
import moment from "moment/moment";


function getDay(d) {
    if (d) {
        d = moment(d);
        return d.format('dd') + ", " + d.format('L');
    }
    return "Chưa có";
}

function getTime(start, end) {
    if (!(start && end)) {
        return "Chưa có";
    }
    start = moment(start) || "Chưa có";
    end = moment(end) || "Chưa có";
    return start.format("HH:mm") + "-" + end.format("HH:mm");
}


@observer
class ListRegisters extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    async exportRegistersResultExcel() {
        store.isExporting = true;
        const res = await loadRegistersApi(
            -1,
            store.registerPage,
            store.selectedBaseId,
            store.selectedRoomTypeId,
            store.selectedRoomId,
            store.start_time_form,
            store.end_time_form,
        );
        const wsData = res.data.room_service_registers;
        const field = [];
        field[0] = "Khách hàng";
        field[1] = "Số điện thoại";
        field[2] = "Thời gian bắt đầu";
        field[3] = "Thời gian kết thúc";
        field[4] = "Ngày tạo";
        field[5] = "Số lượng khách";
        field[6] = "Phòng";
        const datas = wsData.map(data => {
            let tmp = [];
            tmp[0] = data.user.name;
            tmp[1] = data.user.phone || "Chưa có";
            tmp[2] = data.start_time || "Chưa có";
            tmp[3] = data.end_time || "Chưa có";
            tmp[4] = data.created_at || "Chưa có";
            tmp[5] = (data.number_person) || "Chưa có";
            tmp[6] = (data.room && data.room.name) || "Không có";
            return tmp;
        });
        const tmpWsData = [field, ...datas];
        const ws = XLSX.utils.aoa_to_sheet(tmpWsData);
        const sheetName = "Danh sách đăng kí đặt phòng";
        let workbook = {
            SheetNames: [],
            Sheets: {},
        };
        workbook.SheetNames.push(sheetName);
        workbook.Sheets[sheetName] = ws;
        helper.saveWorkBookToExcel(workbook, "Danh sách đăng kí đặt phòng");
        store.isExporting = false;
    }


    render() {
        const Export = <Tooltip id="tooltip">Xuất excel</Tooltip>;

        // console.log(store.totalRegisterPages,"ssssss");


        return (
            <div>

                <div className="card">
                    {store.isLoadingRegisters ? <Loading/> :
                        <div className="card-content">
                            <div className="tab-content">
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{display: "flex"}}>
                                        <h4 className="card-title">
                                            <strong>Danh sách đăng kí</strong>
                                        </h4>
                                    </div>
                                    <div>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={Export}
                                        >
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin "
                                                onClick={this.exportRegistersResultExcel}
                                            >
                                                <i className="material-icons"
                                                   style={{margin: "0px -4px", top: 0}}
                                                >
                                                    file_download
                                                </i>
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                                {/*<Search*/}
                                {/*onChange={this.registersSearchChange}*/}
                                {/*value={this.state.query}*/}
                                {/*placeholder="Nhập tên khách hàng, email hoặc số điện thoại"*/}
                                {/*/>*/}

                                <table className="table table-hover">
                                    <thead className="text-rose">
                                    <tr>
                                        <th>Ngày tạo</th>
                                        <th>Ngày diễn ra</th>
                                        <th>Giờ</th>
                                        <th>Khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Số lượng khách</th>
                                        <th>Phòng</th>
                                        <th>Các yêu cầu khác</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {store.registers.map((register) => {
                                        let className;
                                        switch (register.status) {
                                            case "view" : {
                                                className = "warning";
                                                break;
                                            }
                                            case "done" : {
                                                className = "success";
                                                break;
                                            }
                                            case "cancel" : {
                                                className = "danger";
                                                break;
                                            }
                                            case "seed" : {
                                                className = "active";
                                                break;
                                            }
                                        }
                                        return (
                                            <tr key={register.id} className={className}>
                                                <td>{
                                                    register.created_at
                                                }</td>
                                                <td>{
                                                    getDay(
                                                        register.start_time
                                                    )
                                                }</td>
                                                <td>{getTime(register.start_time, register.end_time)}</td>
                                                <td style={{width: "300px"}}>
                                                    <a className="text-name-student-register">
                                                        {register.user && register.user.name}
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={"tel:" + register.phone}
                                                       className="text-name-student-register"
                                                    >
                                                        {register.user && register.user.phone
                                                            ? helper.formatPhone(register.user.phone) : "Chưa có"}
                                                    </a>
                                                </td>

                                                <td>{register.number_person || "Chưa có"}</td>
                                                <td>{register.room && register.room.name}</td>
                                                <td>{register.note || "Chưa có"}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>

                                <Pagination
                                    totalPages={store.totalRegisterPages}
                                    currentPage={store.registerPage}
                                    loadDataPage={(registerPage) => store.loadRegisters(registerPage)}
                                />
                            </div>
                        </div>}
                </div>
            </div>
        );
    }
}

ListRegisters.propTypes = {};


export default ListRegisters;


