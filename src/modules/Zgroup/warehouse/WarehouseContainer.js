import React from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import * as warehouseAction from "./warehouseAction";
import PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import GoodList from "./GoodList";
import HistoryGoodComponent from "./HistoryGoodComponent";
import Pagination from "../../../components/common/Pagination";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from 'react-select';
import { Modal, Panel } from 'react-bootstrap';
import * as helper from "../../../helpers/helper";
import TooltipButton from '../../../components/common/TooltipButton';
class WarehouseContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            page: 1,
            id: 1,
            showLoadingModal: false,
            addModal: false,
            openFilter: false,
            goodId: '',
            data: {
                name: "",
                location: "",
            }
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadHistory = this.loadHistory.bind(this);
        this.loadGoodList = this.loadGoodList.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.openLoadingModal = this.openLoadingModal.bind(this);
        this.searchByGood = this.searchByGood.bind(this);
        this.changeDataGoodAll = this.changeDataGoodAll.bind(this);
    }

    componentWillMount() {
        this.props.warehouseAction.loadSummaryGoods(1, this.state.goodId);
        this.props.warehouseAction.loadAllGood();
        helper.setFormValidation('#form-payment');
    }

    openModal(id) {
        this.setState({ showModal: true, id: id });
        this.props.warehouseAction.loadHistoryGood(1, id);
    }
    searchByGood(e) {
        this.setState({ goodId: e.value });
        this.props.warehouseAction.loadSummaryGoods(1, e.value);
    }
    changeDataGoodAll() {
        let data = [];
        data = this.props.goodAll.map((pp) => {
            return {
                ...pp,
                value: pp.id,
                label: pp.name,
            };
        });
        data = [{
            value: 0,
            label: "Tất cả",
        }, ...data];
        return data;

    }
    closeModal() {
        this.setState({ showModal: false });
    }

    loadHistory(page, id) {
        this.props.warehouseAction.loadHistory(page, id);
    }

    loadGoodList(page) {
        this.setState({ page: page });
        this.props.warehouseAction.loadSummaryGoods(page);
    }

    openLoadingModal() {
        this.setState({ showLoadingModal: true });
        this.props.warehouseAction.loadAllSummaryGoods(this.exportExcel);
    }

    exportExcel(input) {
        if (!input || input.length == 0) {
            helper.showErrorMessage("Không có dữ liệu");
            this.setState({ showLoadingModal: false });
            return;
        }
        let wb = helper.newWorkBook();
        let data;
        let cols = [{ "wch": 5 }, { "wch": 50 }, { "wch": 20 }, { "wch": 20 }, { "wch": 20 },];//độ rộng cột

        data = input.map((item, index) => {
            let hnLeft = item.summary_warehouse[0].sum_quantity;
            let sgLeft = item.summary_warehouse[1].sum_quantity;
            /* eslint-disable */
            let res = {
                'STT': index + 1,
                'Tên sản phẩm': item.name,
                ['Tồn kho ' + item.summary_warehouse[0].name]: hnLeft,
                ['Tồn kho ' + item.summary_warehouse[1].name]: sgLeft,
                'Tổng tồn kho': hnLeft + sgLeft,
            };
            /* eslint-enable */
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Danh sách tồn kho', cols);
        //end điểm danh

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách tồn kho Zgroup');

        this.setState({ showLoadingModal: false });
        helper.showNotification("Xuất file thành công!");
    }

    updateFormAdd = (e) => {
        let { name, value } = e.target;
        let { data } = this.state;
        data = { ...data, [name]: value };
        this.setState({ data });
    }

    sumbitWarehouse = () => {
        this.setState({addModal: false});
        if ($('#form-add').valid()) {
            
            this.props.warehouseAction.createWarehouse(this.state.data,
                ()=> {
                    
                    this.props.warehouseAction.loadSummaryGoods(1, this.state.goodId);
                }
            );
        }
    }

    render() {
        let { data } = this.state;
        return (
            <div className="content">
                <HistoryGoodComponent
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    data={this.props.historyGood}
                    loadHistory={this.loadHistory}
                    paginator={this.props.historyPaginator}
                    id={this.state.id}
                />
                <Modal
                    show={this.state.showLoadingModal}
                    onHide={() => {
                    }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading /></Modal.Body>
                </Modal>
                <Modal
                    show={this.state.addModal}
                    onHide={() => {
                        this.setState({ addModal: false });
                    }}>
                    <Modal.Header>Thêm kho hàng</Modal.Header>
                    <Modal.Body>
                        <form role="form" id="form-add" onSubmit={(e) => e.preventDefault()}>
                            <FormInputText
                                name="name" type="text"
                                id="name"
                                label="Tên"
                                value={data.name}
                                updateFormData={this.updateFormAdd}
                                placeholder="Nhập"
                                required
                            />
                            <FormInputText
                                name="location" type="text"
                                id="location"
                                label="Vị trí"
                                value={data.location}
                                updateFormData={this.updateFormAdd}
                                placeholder="Nhập"
                                required
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-md-12"
                            style={{ display: "flex", flexFlow: "row-reverse" }}>
                            
                                <div>
                                    <button onClick={this.sumbitWarehouse}  className="btn btn-rose">Lưu</button>
                                    <button className="btn" onClick={()=>this.setState({addModal: false})} type="button">Hủy</button>
                                </div>
                            

                        </div>
                    </Modal.Footer>
                </Modal>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">

                                <div className="card-content">
                                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <div className="flex-row flex">
                                            <h4 className="card-title"><strong>Quản lý kho hàng</strong> </h4>

                                            <div style={{ marginLeft: 10 }}>
                                                <TooltipButton text="Thêm kho hàng" placement="top">
                                                    <button
                                                        className="btn btn-rose"
                                                        onClick={() => this.setState({ addModal: true })}
                                                        style={{
                                                            borderRadius: 30,
                                                            padding: "0px 11px",
                                                            margin: "-1px 10px",
                                                            minWidth: 25,
                                                            height: 25,
                                                            width: "55%",
                                                        }}
                                                    >
                                                        <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -12, marginTop: -10 }}
                                                        >add</i>
                                                    </button>
                                                </TooltipButton>
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
                                                        <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -12, marginTop: -10 }}
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
                                                        <label> Sản phẩm </label>
                                                        <ReactSelect
                                                            options={this.changeDataGoodAll()}
                                                            onChange={this.searchByGood}
                                                            value={this.state.goodId}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel>
                                    </div>

                                    {
                                        this.props.isLoading || this.props.isLoadingGoodAll ? <Loading /> :
                                            <div>
                                                <GoodList
                                                    data={this.props.goods}
                                                    openModal={this.openModal}
                                                />

                                                <div style={{
                                                    float: "right"
                                                }}>
                                                    <Pagination
                                                        totalPages={this.props.paginator ? this.props.paginator.total_pages :  0}
                                                        currentPage={this.state.page}
                                                        loadDataPage={this.loadGoodList}
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
        )
            ;
    }
}

WarehouseContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoadingGoodAll: PropTypes.bool.isRequired,
    goods: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
    warehouseAction: PropTypes.object.isRequired,
    historyGood: PropTypes.array.isRequired,
    historyPaginator: PropTypes.object.isRequired,
    goodAll: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.zWarehouse.isLoading,
        isLoadingGoodAll: state.zWarehouse.isLoadingGoodAll,
        goodAll: state.zWarehouse.goodAll,
        goods: state.zWarehouse.goods,
        paginator: state.zWarehouse.paginator,
        historyGood: state.zWarehouse.historyGood,
        historyPaginator: state.zWarehouse.historyPaginator,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        warehouseAction: bindActionCreators(warehouseAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseContainer);