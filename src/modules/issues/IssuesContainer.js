import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "./issueStore";
import CreateIssue from "./CreateIssue";
import { getShortName } from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import { observable } from "mobx";
import Pagination from "../../components/common/Pagination";
import { STATUS_ISSUE } from "../../constants/constants";
import { Modal } from "react-bootstrap";

@observer
export default class IssuesContainer extends Component {
    constructor(props) {
        super(props);
        this.searchChange = this.searchChange.bind(this);
    }

    componentWillMount() {
        store.loadIssues();
    }


    @observable showModalCreate = false;

    loadDataPage(page) {
        store.currentPage = page;
        store.loadIssues(this.search, this.status, page);
    }

    searchChange(value) {
        this.search = value;
        store.currentPage = 1;
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                store.loadIssues(this.search, this.status, store.currentPage);
            }.bind(this),
            500
        );
    }

    renderStatus(status) {
        const statusIssue = STATUS_ISSUE[status];
        return (
            <button
                className="btn btn-xs btn-main"
                style={{
                    backgroundColor: statusIssue.color
                }}>
                {statusIssue.label}
            </button>
        );
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <div className="flex-row flex">
                            <h5 className="card-title">
                                <strong>Báo cáo hệ thống</strong>
                            </h5>
                            <div className="dropdown">
                                <button
                                    className="btn btn-primary btn-round btn-xs button-add none-margin"
                                    onClick={() => (this.showModalCreate = true)}>
                                    <strong>+</strong>
                                </button>
                            </div>
                        </div>

                        <Search onChange={this.searchChange} value={this.search} placeholder="Tìm kiếm" />
                        {store.isLoading ? (
                            <Loading />
                        ) : (
                                <div className="table-responsive">
                                    <table
                                        className="table table-striped table-no-bordered table-hover"
                                        cellSpacing="0"
                                        width="100%"
                                        style={{ width: "100%" }}>
                                        <thead className="text-rose">
                                            <tr>
                                                <th>Báo cáo</th>
                                                <th>Mô tả</th>
                                                <th>Người báo</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {store.issues.map(issue => {
                                                return (
                                                    <tr key={issue.id}>
                                                        <td>{issue.title}</td>
                                                        <td>{issue.description}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-xs btn-main"
                                                                style={{
                                                                    backgroundColor: "#" + issue.color
                                                                }}>
                                                                {getShortName(issue.name)}
                                                            </button>
                                                        </td>
                                                        <td>{this.renderStatus(issue.status)}</td>
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
                            loadDataPage={this.loadDataPage}
                        />
                    </div>
                </div>

                <Modal
                    id="create-issue-modal"
                    show={this.showModalCreate}
                    onHide={() => {
                        this.showModalCreate = false;
                    }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tạo báo cáo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateIssue />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
