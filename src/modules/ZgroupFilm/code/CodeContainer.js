import React from 'react';
//import TooltipButton from "../../../components/common/TooltipButton";
import Search from "../../../components/common/Search";
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import CodeComponent from "./CodeComponent";
import AddEditCodeModal from "./AddEditCodeModal";
import {connect} from "react-redux";
import * as codeAction from "./codeAction";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import ShowCodeModal from "./ShowCodeModal";
import {Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import * as helper from "../../../helpers/helper";

class CodeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.timeOut = null;
        this.state = {
            query: '',
        };
        this.descriptionSearchChange = this.descriptionSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.showLoadingModal = this.showLoadingModal.bind(this);
        this.closeLoadingModal = this.closeLoadingModal.bind(this);
    }

    componentWillMount() {
        this.props.codeAction.getCode(1, 20);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddEditCode !== this.props.isAddEditCode && !nextProps.isAddEditCode) {
            this.props.codeAction.getCode(1, 20);
        }
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.codeAction.getCode(page, 20);
    }

    descriptionSearchChange(value) {
        this.setState({
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.codeAction.getCode(1, 20, value);
            }.bind(this),
            500
        );
    }

    showLoadingModal() {
        this.props.codeAction.getAllCode(
            this.closeLoadingModal
        );
    }

    closeLoadingModal() {

        let json = this.props.excel;
        if (!json || json.length === 0) {
            helper.showErrorNotification("Không có dữ liệu");
            return;
        }
        let cols = [{"wch": 3}, {"wch": 7}, {"wch": 30}, {"wch": 10}, {"wch": 6}, {"wch": 6}, {"wch": 6}, {"wch": 6}, {"wch": 11}, {"wch": 11},{"wch": 31},{"wch": 31}];//độ rộng cột
        //begin điểm danh
        json = this.props.excel.map((item, index) => {
            if (item) {
                let aa = "";
                let bb = "";
                let a = item.codes.filter((code) => code.status === 0);
                let b = item.codes.filter((code) => code.status === 1);
                a && a.map((code) => {
                       aa += code.code + "; ";
                });
                b && b.map((code) => {
                    bb += code.code + "; ";
                });
                let res = {
                    'STT': index + 1,
                    'Tên': item.name,
                    'Ý nghĩa': item.description,
                    'Giảm giá': item.value + " VNĐ",
                    'Số lượng': item.number,
                    "Sử dụng": b.length,
                    "Còn lại": a.length,
                    'Ký tự': item.length,
                    'Áp dụng': item.start_date,
                    'Kết thúc': item.end_date,
                    'Danh sách chưa dùng': aa || " ",
                    'Danh sách đã dùng': bb || " ",
                    //'Danh sách mã giảm giá': item.saler ? item.saler.name : "Không có",
                };
                /* eslint-enable */
                return res;
            }
        });
        let wb = helper.newWorkBook();
        helper.appendJsonToWorkBook(json, wb, 'Danh sách', cols, []);
        helper.saveWorkBookToExcel(wb,
            'Danh sách mã giảm giá'
        );
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        //const Filter = <Tooltip id="tooltip">Lọc</Tooltip>;
        const Export = <Tooltip id="tooltip">Xuất thành file excel</Tooltip>;
        const Add = <Tooltip id="tooltip">Thêm mã giảm giá</Tooltip>;
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">

                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div style={{display: "flex"}}>
                                <h4 className="card-title">
                                    <strong>Danh sách tất cả mã giảm giá</strong>
                                </h4>
                                <div>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={Add}
                                    >
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={() => {
                                                this.props.codeAction.openModal();
                                                this.props.codeAction.handleCodeModal({});
                                            }}>

                                            <strong>+</strong>
                                        </button>
                                    </OverlayTrigger>
                                </div>
                                {/*<div>*/}
                                {/*<OverlayTrigger*/}
                                {/*placement="top"*/}
                                {/*overlay={Filter}*/}
                                {/*>*/}
                                {/*<button*/}
                                {/*//onClick={this.openFilterPanel}*/}
                                {/*className="btn btn-primary btn-round btn-xs button-add none-margin "*/}
                                {/*disabled={*/}
                                {/*this.props.isLoadingCode*/}
                                {/*}*/}

                                {/*>*/}
                                {/*<i className="material-icons"*/}
                                {/*style={{margin: "0px -4px", top: 0}}*/}
                                {/*>filter_list</i>*/}
                                {/*</button>*/}
                                {/*</OverlayTrigger>*/}
                                {/*</div>*/}
                            </div>
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={Export}
                                >
                                    <button
                                        onClick={this.showLoadingModal}
                                        className="btn btn-primary btn-round btn-xs button-add none-margin "
                                        disabled={
                                            this.props.isLoadingCode
                                        }

                                    >
                                        <i className="material-icons"
                                           style={{margin: "0px -4px", top: 0}}
                                        >file_download</i>
                                    </button>
                                </OverlayTrigger>
                            </div>
                        </div>


                        <Search
                            onChange={this.descriptionSearchChange}
                            value={this.state.query}
                            placeholder="Nhập ý nghĩa để tìm kiếm"
                        />
                        <br/>

                    </div>
                    <div>
                        {
                            this.props.isLoadingCode ? <Loading/> :
                                <CodeComponent
                                    code={this.props.code}/>
                        }


                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {first}
                                    - {end}/{this.props.totalCount}</b><br/>
                                <Pagination
                                    totalPages={this.props.totalPages}
                                    currentPage={this.props.currentPage}
                                    loadDataPage={this.loadOrders}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.props.isLoadingExcel}
                    onHide={() => {
                    }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading/></Modal.Body>
                </Modal>
                <ShowCodeModal/>
                <AddEditCodeModal/>
            </div>
        );
    }
}

CodeContainer.propTypes = {
    isLoadingCode: PropTypes.bool.isRequired,
    isAddEditCode: PropTypes.bool.isRequired,
    isLoadingExcel: PropTypes.bool.isRequired,
    codeAction: PropTypes.object.isRequired,
    code: PropTypes.array.isRequired,
    excel: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
};

function mapStateToProps(state) {
    return {
        isLoadingCode: state.code.isLoadingCode,
        code: state.code.code,
        isAddEditCode: state.code.isAddEditCode,
        totalCount: state.code.totalCount,
        totalPages: state.code.totalPages,
        currentPage: state.code.currentPage,
        limit: state.code.limit,
        excel: state.code.excel,
        isLoadingExcel: state.code.isLoadingExcel,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        codeAction: bindActionCreators(codeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeContainer);