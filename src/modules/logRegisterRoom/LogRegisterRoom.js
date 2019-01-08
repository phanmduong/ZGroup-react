import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "./logRegisterRoomStore";
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";

@observer
export default class LogRegisterRoom extends Component {
  componentWillMount() {
    this.loadData();
  }

  logType(type) {
    switch (type) {
      case "edit_register_room":
        return "Sửa đặt phòng";
      case "create_register_room":
        return "Tạo đặt phòng";
      default:
        return "";
    }
  }

  loadData = page => {
    store.currentPage = page;
    store.loadLogs();
  };

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h4 className="card-title">Lịch sử thao tác đặt phòng</h4>
          <div>
            {store.isLoading ? (
              <Loading />
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead className="text-rose">
                    <tr>
                      <th>Thao tác</th>
                      <th>Người thao tác</th>
                      <th>Trạng thái trước</th>
                      <th>Trạng thái sau</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.logs.map((log, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ minWidth: "120px" }}>
                            {this.logType(log.type)}
                          </td>
                          <td style={{ minWidth: "120px" }}>
                            {log.user ? log.user.name : ""}
                          </td>
                          <td>{log.before}</td>
                          <td>{log.after}</td>
                          <td style={{ minWidth: "150px" }}>
                            {log.created_at}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination
              currentPage={store.currentPage}
              totalPages={store.totalPages}
              loadDataPage={this.loadData}
            />
          </div>
        </div>
      </div>
    );
  }
}
