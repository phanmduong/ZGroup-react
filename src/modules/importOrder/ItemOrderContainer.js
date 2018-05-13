import React from "react";
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as importOrderActions from "./importOrderActions";
import Loading from "../../components/common/Loading";
import ImportItemOrderList from "./ImportItemOrderList";
import PropTypes from "prop-types";
import Pagination from "../../components/common/Pagination";

import { Panel, Modal } from "react-bootstrap";
import ReactSelect from 'react-select';
import InfoImportOrder from "./InfoImportOrder";
import TooltipButton from '../../components/common/TooltipButton';
import {
    newWorkBook,
    appendArrayToWorkBook,
    saveWorkBookToExcel,
    renderExcelColumnArray,
    confirm,
    showErrorMessage,
} from "../../helpers/helper";
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL } from "../../constants/constants";


class ItemOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            openFilter: false,
            companyId: null,
            showInfoModal: false,
            showLoadingModal: false,
        };
        this.loadHistoryImportOrder = this.loadHistoryImportOrder.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        //this.loadImportOrders = this.loadImportOrders.bind(this);
        this.changeDataCompanies = this.changeDataCompanies.bind(this);
        this.searchByCompany = this.searchByCompany.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
    }

    componentWillMount() {
        this.props.importOrderActions.loadAllImportOrder(1);
        this.props.importOrderActions.loadAllCompanies();
        this.props.importOrderActions.loadAllOrder();
    }

    // loadImportOrders(page) {
    //     console.log(page);
    //     this.setState({page: page});
    //     this.props.importOrderActions.loadAllImportOrder(page);
    // }

    changeStatus(id) {
        // this.props.importOrderActions.changeStatusImportOrder(id, () => {
        //     success();
        //
        //     this.props.importOrderActions.loadAllImportOrder(this.props.paginator.current_page);
        // });
        helper.confirm('success', 'Đồng ý', "Bạn muốn xác nhận yêu cầu này không?", () => {
            this.props.importOrderActions.changeStatusImportOrder(id, () => {
                this.props.importOrderActions.loadAllImportOrder(this.props.paginator.current_page);
            });
        });
    }

    changeDataCompanies() {
        let data = [];
        data = this.props.companies.map((pp) => {
            return {
                ...pp,
                value: pp.id,
                label: pp.name,
            };
        });
        return data;
    }

    loadHistoryImportOrder(page, id) {
        this.props.importOrderActions.loadHistoryImportOrder(page, id);
    }

    searchByCompany(e) {
        if (!e) {
            this.setState({companyId: null});
            this.props.importOrderActions.loadAllImportOrder(1);
            return;
        }
        this.setState({companyId: e.value});
        this.props.importOrderActions.loadAllImportOrder(1, e.value);
    }

    openInfoModal(id) {
        this.setState({showInfoModal: true});
        this.props.importOrderActions.loadImportOrder(id);
    }

    closeInfoModal() {
        this.setState({showInfoModal: false});

    openLoadingModal = () => {
        this.setState({ showLoadingModal: true });
        this.props.importOrderActions.loadAllImportOrderNoPaging(this.exportExcel);
    }

    exportExcel = (input) => {
        if(!input ||  input.length == 0) {
            showErrorMessage("Không có dữ liệu");
            return;
        }
        let wb = newWorkBook();
        let data = [];
        let cols = renderExcelColumnArray([15, 15, 25, 25, 15, 20]);//độ rộng cột  
        let merges = [];
        merges.push(
            { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } },
            { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        );

        input.forEach((e, od) => {
            data = [];
            const head = ['STT', 'Tên', 'Mã', 'Giá', 'Số lượng', 'Số lượng nhập'];
            if (e.goods && e.goods.length > 0)
                data = e.goods.map((item, index) => {

                    /* eslint-disable */
                    let res = [
                        index + 1,
                        item.good ? item.good.name : "Không có",
                        item.good ? item.good.code : "Không có",
                        item.price ? item.price : '0',
                        item.quantity ? item.quantity : '0',
                        item.imported_quantity ? item.imported_quantity : '0',
                    ];
                    /* eslint-enable */
                    return res;
                });
            let time = moment(e.created_at.date || {}, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);

            const info = [
                ['Thông tin', 'Đối tác', 'Người tạo', 'Mã nhập hàng', 'Ngày tạo', 'Trạng thái'],
                ['',
                    e.company ? e.company.name : "Không tên",
                    e.staff ? e.staff.name : 'Không tên',
                    e.command_code ? e.command_code : "Không có",
                    time,
                    (e.status && e.status > 2) ? "Đã duyệt" : "Chưa duyệt",],
                    ['Danh sách sản phẩm'],
            ];

            data = [...info, head, ...data];

            appendArrayToWorkBook(data, wb, e.command_code ? e.command_code : "Tab " + (od + 1), cols, null , merges);
        });

        //xuất file
        saveWorkBookToExcel(wb, 'Danh sách nhập hàng');

        this.setState({ showLoadingModal: false });
    }
    render() {
        
        return (
            <div>
                <Modal
                    show={this.state.showLoadingModal}
                    onHide={() => { }}>
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading /></Modal.Body>
                </Modal>
                <div className="content">
                    <InfoImportOrder
                        show={this.state.showInfoModal}
                        onHide={this.closeInfoModal}
                        data={this.props.importOrder}
                        itemOrders={this.props.itemOrders}
                    />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card">

                                    <div className="card-content">
                                        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <div className="flex-row flex">
                                                <h4 className="card-title"><strong>Nhập hàng</strong></h4>
                                                <div>
                                                    <Link to="/business/import-order/item/create" className="btn btn-rose btn-round btn-xs button-add none-margin">
                                                        <strong>+</strong>
                                                    </Link>

                                                </div>
                                                <div>
                                                    <TooltipButton text="Lọc" placement="top">
                                                        <button
                                                            className="btn btn-rose"
                                                            onClick={() => this.setState({ openFilter: !this.state.openFilter })}
                                                            style={{
                                                                borderRadius: 30,
                                                                padding: "0px 11px",
                                                                margin: "-1px 10px",
                                                                minWidth: 25,
                                                                height: 25,
                                                                width: "55%",
                                                            }}
                                                        >
                                                            <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -11, marginTop: -10 }}
                                                            >filter_list</i>
                                                        </button>
                                                    </TooltipButton>
                                                </div>
                                            </div>
                                            <div className="flex-end">
                                                <div>
                                                    <TooltipButton text="Xuất thành file excel" placement="top">
                                                        <button
                                                            className="btn btn-rose"
                                                            onClick={this.openLoadingModal}
                                                            style={{
                                                                borderRadius: 30,
                                                                padding: "0px 11px",
                                                                margin: "-1px 10px",
                                                                minWidth: 25,
                                                                height: 25,
                                                                width: "55%",
                                                            }}
                                                        >
                                                            <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -11, marginTop: -10 }}
                                                            >file_download</i>
                                                        </button>
                                                    </TooltipButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Panel collapsible expanded={this.state.openFilter}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="col-md-4">
                                                            <label> Công ty </label>
                                                            <ReactSelect
                                                                options={this.changeDataCompanies()}
                                                                onChange={this.searchByCompany}
                                                                value={this.state.companyId}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Panel>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {
                                                    this.props.isLoadingItemOrder ? <Loading /> :
                                                        <div>
                                                            <ImportItemOrderList
                                                                data={this.props.importOrders}
                                                                page={this.state.page}
                                                                loadImportOrder={this.loadImportOrder}
                                                                changeStatus={this.changeStatus}
                                                                loadHistoryImportOrder={this.loadHistoryImportOrder}
                                                                historyImportOrder={this.props.historyImportOrder}
                                                                paginator={this.props.paginator_history}
                                                                openInfoModal={this.openInfoModal}

                                                            />
                                                            <div>
                                                                <Pagination
                                                                    totalPages={this.props.paginator.total_pages}
                                                                    currentPage={this.props.paginator.current_page}
                                                                    loadDataPage={this.props.importOrderActions.loadAllImportOrder}
                                                                />
                                                            </div>
                                                        </div>
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ItemOrderContainer.propTypes = {
    isLoadingItemOrder: PropTypes.bool,
    importOrders: PropTypes.array,
    paginator: PropTypes.object,
    historyImportOrder: PropTypes.array,
    paginator_history: PropTypes.object,
    importOrderActions: PropTypes.object,
    companies: PropTypes.array,
    importOrder: PropTypes.object,
    itemOrders: PropTypes.arr,
};

function mapStateToProps(state) {
    return {
        isLoadingItemOrder: state.importOrder.isLoadingItemOrder,
        importOrders: state.importOrder.importOrders,
        paginator: state.importOrder.paginator,
        paginator_history: state.importOrder.paginator_history,
        historyImportOrder: state.importOrder.historyImportOrder,
        companies: state.importOrder.companies,
        importOrder: state.importOrder.importOrder,
        itemOrders: state.importOrder.itemOrders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importOrderActions: bindActionCreators(importOrderActions, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemOrderContainer);
