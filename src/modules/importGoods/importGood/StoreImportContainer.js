/**
 * Created by phanmduong on 10/30/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from '../../../components/common/FormInputText';
import Search from '../../../components/common/Search';
import Loading from '../../../components/common/Loading';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';
import * as importGoodActions from '../importGoodActions';
import ListGood from './ListGood';
import StoreGood from './StoreGood';
import EditGood from './EditGood';
import StoreSupplier from './StoreSupplier';
import AddGoodFile from './AddGoodFile';
import {Modal} from 'react-bootstrap';
import ReactSelect from 'react-select';
import TooltipButton from '../../../components/common/TooltipButton';
import * as importGoodsApi from '../importGoodsApi';
import {PAYMENT} from "../../../constants/constants";
import HistoryPaid from "./HistoryPaid";


class StoreImportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setTable = this.setTable.bind(this);
        this.table = null;
        this.state = {
            showModalStoreGood: false,
            showModalEditGood: false,
            showModalStoreSupplier: false,
            showModalAddGoodFile: false,
            showModalHistoryPaid: false,
            search: '',
            initTable: false,
            optionsSelectWarehouses: [],
            selectedGood: {}
        };
        this.closeModalHistoryPaid = this.closeModalHistoryPaid.bind(this);
        this.openModalHistoryPaid = this.openModalHistoryPaid.bind(this);
        this.closeModalStoreGood = this.closeModalStoreGood.bind(this);
        this.openModalStoreGood = this.openModalStoreGood.bind(this);
        this.closeModalEditGood = this.closeModalEditGood.bind(this);
        this.openModalEditGood = this.openModalEditGood.bind(this);
        this.closeModalStoreSupplier = this.closeModalStoreSupplier.bind(this);
        this.openModalStoreSupplier = this.openModalStoreSupplier.bind(this);
        this.closeModalAddGoodFile = this.closeModalAddGoodFile.bind(this);
        this.openModalAddGoodFile = this.openModalAddGoodFile.bind(this);
        this.storeGood = this.storeGood.bind(this);
        this.initTable = this.initTable.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.storeImportGood = this.storeImportGood.bind(this);
        this.changeOptionWarehouse = this.changeOptionWarehouse.bind(this);
        this.selectSupplier = this.selectSupplier.bind(this);
        this.loadSuppliers = this.loadSuppliers.bind(this);
        this.deleteGood = this.deleteGood.bind(this);
        this.editStore = this.editStore.bind(this);
        this.storeGoods = this.storeGoods.bind(this);
        this.changePayment = this.changePayment.bind(this);
    }

    componentWillMount() {
        this.props.importGoodActions.initDataImport();
        this.initTable();
        this.props.importGoodActions.getAllWarehouses();
        if (this.props.route.type === 'edit') {
            this.props.importGoodActions.loadImportGoodsOrder(this.props.params.importGoodId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingWarehouses !== this.props.isLoadingWarehouses && !nextProps.isLoadingWarehouses) {
            let warehouses = nextProps.warehouses.map((warehouse) => {
                return {
                    ...warehouse,
                    ...{
                        value: warehouse.id,
                        label: warehouse.name
                    }
                };
            });

            this.setState({
                optionsSelectWarehouses: warehouses
            });
        }
    }


    closeModalHistoryPaid() {
        this.setState({showModalHistoryPaid: false});
    }

    openModalHistoryPaid() {
        this.setState({showModalHistoryPaid: true});
    }

    setTable(table) {
        this.table = table;
    }

    closeModalStoreGood() {
        this.setState({showModalStoreGood: false});
    }

    openModalStoreGood() {
        this.setState({showModalStoreGood: true});
    }

    closeModalEditGood() {
        this.setState({showModalEditGood: false});
    }

    openModalEditGood(good) {
        this.setState({
            showModalEditGood: true,
            selectedGood: good
        });
    }

    closeModalStoreSupplier() {
        this.setState({showModalStoreSupplier: false});
    }

    openModalStoreSupplier() {
        this.setState({showModalStoreSupplier: true});
    }

    closeModalAddGoodFile() {
        this.setState({showModalAddGoodFile: false});
    }

    openModalAddGoodFile() {
        this.setState({showModalAddGoodFile: true});
    }

    changeOptionWarehouse(value) {
        let formImportGood = {...this.props.formImportGood};
        formImportGood['warehouse'] = value;
        this.props.importGoodActions.updateFormImportGood(formImportGood);
    }

    storeGoods(goods) {
        this.props.importGoodActions.updateFormImportGood({
            ...this.props.formImportGood,
            imported_goods: goods
        });

        this.initTable();
        this.closeModalAddGoodFile();
    }

    storeGood(good) {
        let isExistGood = this.props.formImportGood.imported_goods.filter((importGood) => {
            return importGood.id === good.id;
        })[0];

        if (isExistGood) {
            helper.showWarningNotification("Sản phẩm đã thêm vào phiếu nhập");
            return;
        }

        this.props.importGoodActions.updateFormImportGood({
            ...this.props.formImportGood,
            imported_goods: [...this.props.formImportGood.imported_goods, good]
        });

        this.initTable();
        this.closeModalStoreGood();
    }

    deleteGood(good) {
        helper.confirm('error', 'Xóa', "Bạn có muốn sản phẩm này không ?", () => {
            let imported_goods = this.props.formImportGood.imported_goods.filter((importGood) => {
                return importGood.id !== good.id;
            });

            this.props.importGoodActions.updateFormImportGood({
                ...this.props.formImportGood,
                imported_goods: imported_goods
            });

            this.initTable();
        });

    }

    editStore(good) {

        let imported_goods = this.props.formImportGood.imported_goods.map((importGood) => {
            if (importGood.id === good.id) {
                return {...good};
            } else {
                return {...importGood};
            }
        });

        this.props.importGoodActions.updateFormImportGood({
            ...this.props.formImportGood,
            imported_goods: imported_goods
        });

        this.initTable();

        this.closeModalEditGood();
    }

    initTable() {
        this.setState({initTable: true});
        setTimeout(() => {
            this.setState({initTable: false});
        }, 50);
    }

    updateFormData(event) {
        const field = event.target.name;
        let formImportGood = {...this.props.formImportGood};
        formImportGood[field] = event.target.value;
        this.props.importGoodActions.updateFormImportGood(formImportGood);
    }

    storeDataImportGood(status) {
        if (this.props.params.importGoodId) {
            this.props.importGoodActions.storeImportGood(this.props.formImportGood, status, this.props.params.importGoodId);
        } else {
            if (!helper.isEmptyInput(this.props.formImportGood.paid_money) && this.props.formImportGood.payment != 0 && (this.props.formImportGood.payment === null
                    || this.props.formImportGood.payment === undefined || this.props.formImportGood.payment === '')) {
                helper.showWarningNotification("Vui lòng chọn phương thức thanh toán");
                return;
            }
            if (this.props.formImportGood.warehouse && this.props.formImportGood.warehouse.id) {
                this.props.importGoodActions.storeImportGood(this.props.formImportGood, status);
            } else {
                helper.showWarningNotification("Vui lòng chọn kho hàng");
                return;
            }
        }
    }

    storeImportGood(status) {
        if (this.props.formImportGood.paid_money > this.totalMoney) {
            helper.confirm("warning", "Thanh toán vượt quá số tiền", "Xác nhận để tiếp tục", () => {
                this.storeDataImportGood(status);
            });
        } else {
            this.storeDataImportGood(status);
        }


    }

    selectSupplier(value) {
        let formImportGood = {...this.props.formImportGood};
        formImportGood['supplier'] = value;
        this.props.importGoodActions.updateFormImportGood(formImportGood);
    }

    loadSuppliers(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            importGoodsApi.loadSupplier(input).then(res => {
                let suppliers = res.data.data.suppliers.map((supplier) => {
                    return {
                        ...supplier,
                        ...{
                            value: supplier.id,
                            label: supplier.name + ` (${supplier.phone})`,
                        }
                    };
                });
                callback(null, {options: suppliers, complete: true});
            });
        }.bind(this), 500);
    }

    changePayment(value) {
        let payment = value && value.value ? value.value : "";
        let formImportGood = {...this.props.formImportGood};
        formImportGood.payment = payment;
        this.props.importGoodActions.updateFormImportGood(formImportGood);
    }

    render() {
        let totalMoney = 0;


        this.props.formImportGood.imported_goods.map((good) => {
            totalMoney += good.quantity * good.import_price;
        });

        this.totalMoney = totalMoney;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <button
                            className="btn btn-rose"
                            onClick={this.openModalStoreGood}
                        >
                            Thêm sản phẩm
                        </button>
                        <button
                            className="btn btn-rose"
                            onClick={this.openModalAddGoodFile}
                        >
                            Thêm từ excel
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose">
                                <i className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Chi tiết hàng nhập</h4>
                                <Search
                                    onChange={(value) => {
                                        this.table ? this.table.search(value).draw() : null;
                                        this.setState({search: value});
                                    }}
                                    value={this.state.search}
                                    placeholder="Nhập mã hoặc tên sản phẩm để tìm kiếm"
                                />
                                {this.props.isLoading || this.state.initTable ? <Loading/> :
                                    <ListGood
                                        importGoods={this.props.formImportGood.imported_goods}
                                        setTable={this.setTable}
                                        deleteGood={this.deleteGood}
                                        openModalEditGood={this.openModalEditGood}
                                        type={this.props.route.type}
                                    />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">announcement</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Thông tin</h4>
                                {
                                    this.props.isLoading ? <Loading/> :
                                        <div>
                                            <div>
                                                <h4><strong>Thông tin phiếu nhập</strong></h4>
                                                <FormInputText
                                                    label="Mã phiếu nhập"
                                                    name="code"
                                                    value={this.props.formImportGood.code}
                                                    placeholder="Hệ thống tự sinh"
                                                    updateFormData={this.updateFormData}
                                                />
                                                <div>
                                                    <label className="control-label">Kho hàng</label>
                                                    <ReactSelect
                                                        name="form-field-name"
                                                        value={this.props.formImportGood.warehouse}
                                                        options={this.state.optionsSelectWarehouses}
                                                        onChange={this.changeOptionWarehouse}
                                                        placeholder="Chọn kho hàng"
                                                        searchPromptText="Không có tìm thấy"
                                                        noResultsText="Không có dữ liệu"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="control-label">Nhà cung cấp
                                                        <TooltipButton text="Thêm nhà cung cấp" placement="top">
                                                            <button className="btn btn-round btn-sm btn-primary"
                                                                    style={{
                                                                        width: '20px',
                                                                        height: '20px',
                                                                        padding: '0',
                                                                        margin: '5px'
                                                                    }}
                                                                    onClick={this.openModalStoreSupplier}
                                                            >
                                                                <i className="material-icons">add</i>
                                                            </button>
                                                        </TooltipButton>
                                                    </label>
                                                    <ReactSelect.Async
                                                        loadOptions={this.loadSuppliers}
                                                        loadingPlaceholder="Đang tải..."
                                                        placeholder="Chọn nhà cung cấp"
                                                        searchPromptText="Không có dữ liệu"
                                                        onChange={this.selectSupplier}
                                                        value={this.props.formImportGood.supplier}
                                                    />
                                                </div>

                                                <FormInputText
                                                    label="Ghi chú"
                                                    name="note"
                                                    value={this.props.formImportGood.note}
                                                    updateFormData={this.updateFormData}
                                                />
                                            </div>
                                            {
                                                this.props.route.type ?
                                                    (
                                                        <div>
                                                            <h4>
                                                                <strong>Thông tin thanh toán </strong>
                                                            </h4>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    Tiền hàng
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    {helper.dotNumber(totalMoney)}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    Tiền thuế
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    0
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <b>Tổng cộng</b>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <b>{helper.dotNumber(totalMoney - this.props.formImportGood.scot)}</b>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <b>Thanh toán</b>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className="form-group label-floating none-margin">
                                                                        <input
                                                                            type="number"
                                                                            className="form-control none-padding"
                                                                            name="paid_money"
                                                                            value={this.props.formImportGood.paid_money}
                                                                            onChange={this.updateFormData}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <b>Nợ</b>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <b>
                                                                        {helper.dotNumber(totalMoney - this.props.formImportGood.scot - this.props.formImportGood.paid_money)}
                                                                    </b>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    Phương thức
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <ReactSelect
                                                                        name="form-field-name"
                                                                        value={this.props.formImportGood.payment}
                                                                        options={PAYMENT}
                                                                        onChange={this.changePayment}
                                                                        placeholder="Chọn phương thức"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    Ghi chú
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <div
                                                                        className="form-group label-floating none-margin">
                                                                        <input
                                                                            className="form-control none-padding"
                                                                            name="note_paid_money"
                                                                            onChange={this.updateFormData}
                                                                            value={this.props.formImportGood.note_paid_money}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <div>
                                                            <div className="flex flex-row flex-space-between">
                                                                <h4>
                                                                    <strong>Thông tin thanh toán </strong>
                                                                </h4>
                                                                <button
                                                                    className="btn btn-rose btn-xs btn-simple text-align-right"
                                                                    onClick={this.openModalHistoryPaid}
                                                                >
                                                                    Xem thêm <i
                                                                    className="material-icons">navigate_next</i>
                                                                </button>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <b>Tổng cộng</b>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <b>{helper.dotNumber(totalMoney)}
                                                                        đ</b>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <b>Đã thanh toán</b>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <b>{helper.dotNumber(this.props.formImportGood.paid_money)}
                                                                        đ</b>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    Nợ
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {helper.dotNumber(totalMoney - this.props.formImportGood.paid_money)}
                                                                    đ
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        {
                            !this.props.isLoading &&
                            <div className="card-footer">
                                <div className="float-right" style={{marginBottom: '20px'}}>

                                    {
                                        this.props.isStoring ?
                                            <button className="btn btn-sm btn-info disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin"/> Đang lưu tạm
                                            </button>
                                            :
                                            <button className="btn btn-sm btn-info"
                                                    onClick={() => this.storeImportGood("uncompleted")}
                                            >
                                                <i className="material-icons">save</i> Lưu tạm
                                            </button>
                                    }
                                    {
                                        this.props.isStoring ?
                                            <button className="btn btn-sm btn-success disabled"
                                            >
                                                <i className="fa fa-spinner fa-spin"/> Đang lưu
                                            </button>
                                            :
                                            <button className="btn btn-sm btn-success"
                                                    onClick={() => this.storeImportGood("completed")}
                                            >
                                                <i className="material-icons">save</i> Hoàn thành
                                            </button>
                                    }
                                </div>
                            </div>
                        }
                    </div>

                </div>
                <Modal show={this.state.showModalStoreGood} bsSize="large">
                    <Modal.Header closeButton onHide={this.closeModalStoreGood} closeLabel="Đóng">
                        <Modal.Title>Thêm sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StoreGood
                            storeGood={this.storeGood}
                            closeModal={this.closeModalStoreGood}
                        />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalEditGood} bsSize="large">
                    <Modal.Header closeButton onHide={this.closeModalEditGood} closeLabel="Đóng">
                        <Modal.Title>Sửa sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditGood
                            good={this.state.selectedGood}
                            editGood={this.editStore}
                            closeModal={this.closeModalEditGood}
                        />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalStoreSupplier}>
                    <Modal.Header closeButton onHide={this.closeModalStoreSupplier} closeLabel="Đóng">
                        <Modal.Title>Thêm nhà cung cấp</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StoreSupplier
                            closeModal={this.closeModalStoreSupplier}
                        />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalAddGoodFile} bsSize="lg">
                    <Modal.Header closeButton onHide={this.closeModalAddGoodFile} closeLabel="Đóng">
                        <Modal.Title>Nhập sản phẩm từ file</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.showModalAddGoodFile &&
                            <AddGoodFile
                                closeModal={this.closeModalAddGoodFile}
                                storeGoods={this.storeGoods}
                            />
                        }

                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModalHistoryPaid} bsSize="large" onHide={this.closeModalHistoryPaid}>
                    <Modal.Header closeButton closeLabel="Đóng">
                        <Modal.Title>Thanh toán</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <HistoryPaid
                            importGoodId={this.props.params.importGoodId}
                            closeModal={this.closeModalHistoryPaid}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

StoreImportContainer.propTypes = {
    importGoodActions: PropTypes.object.isRequired,
    formImportGood: PropTypes.object.isRequired,
    warehouses: PropTypes.array.isRequired,
    isLoadingWarehouses: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isStoring: PropTypes.bool.isRequired,
    type: PropTypes.string,
    route: PropTypes.object,
};

function mapStateToProps(state) {
    let supplier = state.importGoods.formImportGood.supplier;
    if (supplier && supplier.id) {
        supplier = {
            ...supplier,
            value: supplier.id,
            label: supplier.name + ` (${supplier.phone})`,
        };
    }
    let warehouse = state.importGoods.formImportGood.warehouse;
    if (warehouse && warehouse.id) {
        warehouse = {
            ...warehouse,
            value: warehouse.id,
            label: warehouse.name
        };
    }

    let dataImportGoods = {
        ...state.importGoods.formImportGood,
        supplier,
        warehouse: warehouse
    };
    return {
        formImportGood: dataImportGoods,
        isLoading: state.importGoods.importGood.isLoading,
        isStoring: state.importGoods.formImportGood.isStoring,
        warehouses: state.importGoods.warehouses,
        isLoadingWarehouses: state.importGoods.isLoadingWarehouses,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreImportContainer);
