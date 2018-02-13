/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as exportOrderActions from "./exportOrderActions";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from 'react-select';
import {browserHistory} from "react-router";
import * as helper from "../../../helpers/helper";

class CreateExportOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changeGood = this.changeGood.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.changeWarehouse = this.changeWarehouse.bind(this);
        this.commitData = this.commitData.bind(this);
    }

    componentWillMount() {
        this.props.exportOrderActions.loadAllGoods();
        this.props.exportOrderActions.loadAllCompanies();
        this.props.exportOrderActions.loadAllWarehourses();
        let id = this.props.params.exportOrderId;
        if (id) {
            this.props.exportOrderActions.loadExportOrder(id, (data) => {
                this.setState({data});
            });
        } else {
            this.setState({data: defaultData});
        }
    }


    updateFormData(e) {
        let name = e.target.name;
        let value = e.target.value;
        let newdata = {
            ...this.state.data,
            [name]: value,
        };
        this.setState({data: newdata});
    }

    changeGood(e) {
        let newdata = {
            ...this.state.data,
            good: e,
            price: e.price
        };
        this.setState({data: newdata});
    }

    changeCompany(e) {
        let newdata = {...this.state.data, company: e};
        this.setState({data: newdata});
    }

    changeWarehouse(e) {
        let newdata = {...this.state.data, warehouse: e};
        this.setState({data: newdata});
    }


    commitData() {
        let {data} = this.state;
        if (!data.company.id) {
            helper.showErrorNotification("Vui lòng chọn Nhà phân phối ");
            return;
        }
        if (!data.good.id) {
            helper.showErrorNotification("Vui lòng chọn Sản phẩm");
            return;
        }
        if (!data.warehouse.id) {
            helper.showErrorNotification("Vui lòng chọn Kho hàng");
            return;
        }

        if (this.props.params.exportOrderId) {
            this.props.exportOrderActions.editExportOrder(
                {
                    ...data,
                    company_id: data.company.id,
                    good_id: data.good.id,
                    warehouse_id: data.warehouse.id,
                    staff_id: this.props.user.id,
                    total_price: data.price * data.quantity,
                });
        }
        else {
            this.props.exportOrderActions.createExportOrder(
                {
                    ...data,
                    company_id: data.company.id,
                    good_id: data.good.id,
                    warehouse_id: data.warehouse.id,
                    staff_id: this.props.user.id,
                    total_price: data.price * data.quantity,
                });
        }
    }

    render() {
        let {data} = this.state;
        let {
            goods, companies, warehouses,
            isLoading, isCommitting, isLoadingGoods, isLoadingCompanies, isLoadingWarehouses
        } = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    {(isLoading) ? <Loading/> :
                        <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose">
                                            <i className="material-icons">local_shipping</i>
                                        </div>

                                        <div className="card-content">
                                            <h4 className="card-title">Xuất hàng</h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>Mã đơn hàng</label>
                                                    <ReactSelect
                                                        disabled={true}
                                                        options={companies || []}
                                                        onChange={()=>{}}
                                                        value={""}
                                                        name="order_code"
                                                        defaultMessage="Chọn mã đơn hàng"
                                                    /></div>
                                                <div className="col-md-6">
                                                    <label>Nhà phân phối </label>
                                                    <ReactSelect
                                                        disabled={isLoadingCompanies || isCommitting}
                                                        options={companies || []}
                                                        onChange={this.changeCompany}
                                                        value={data.company.id || ""}
                                                        name="company"
                                                        defaultMessage="Chọn nhà phân phối "
                                                    /></div>
                                                <div className="col-md-6">
                                                    <label>Kho hàng</label>
                                                    <ReactSelect
                                                        disabled={isLoadingWarehouses || isCommitting}
                                                        options={warehouses || []}
                                                        onChange={this.changeWarehouse}
                                                        value={data.warehouse.id || ""}
                                                        name="warehouse"
                                                        defaultMessage="Chọn kho hàng"
                                                    /></div>
                                                <div className="col-md-6">
                                                    <label>Sản phẩm</label>
                                                    <ReactSelect
                                                        disabled={isLoadingGoods || isCommitting}
                                                        options={goods || []}
                                                        onChange={this.changeGood}
                                                        value={data.good.id || ""}
                                                        name="good"
                                                        defaultMessage="Chọn sản phẩm"
                                                    /></div>
                                                <div className="col-md-6">
                                                    <FormInputText
                                                        label="Giá"
                                                        type="number"
                                                        name="price"
                                                        updateFormData={this.updateFormData}
                                                        value={data.price || ""}
                                                        disabled={isCommitting || isLoadingGoods}
                                                    /></div>
                                                <div className="col-md-6">
                                                    <FormInputText
                                                        label="Số lượng đặt"
                                                        type="number"
                                                        name="quantity"
                                                        updateFormData={this.updateFormData}
                                                        value={data.quantity || ""}
                                                        disabled
                                                    /></div>
                                                <div className="col-md-6">
                                                    <FormInputText
                                                        label="Số lượng xuất"
                                                        type="number"
                                                        name="quantity"
                                                        updateFormData={this.updateFormData}
                                                        value={data.quantity || ""}
                                                        disabled={isCommitting || isLoadingGoods}
                                                    /></div>
                                                {this.props.isCommitting ?
                                                    <div className="col-md-12">
                                                        <button className="btn btn-rose  disabled" type="button"
                                                                disabled>
                                                            <i className="fa fa-spinner fa-spin"/> Đang lưu...
                                                        </button>
                                                    </div>
                                                    :
                                                    <div className="col-md-12">
                                                        <button
                                                            className="btn btn-fill btn-rose"
                                                            type="button"
                                                            onClick={this.commitData}
                                                            disabled={isCommitting}
                                                        > Lưu
                                                        </button>
                                                        <button
                                                            className="btn btn-fill btn-rose" type="button"
                                                            onClick={() => {
                                                                helper.confirm("warning", "Hủy bỏ", "Bạn có chắc muốn hủy không?",
                                                                    () => {
                                                                        return browserHistory.push("/business/export-order");
                                                                    }
                                                                );
                                                            }}
                                                        > Hủy
                                                        </button>
                                                    </div>

                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </form>
                    }
                </div>
            </div>
        );
    }
}

CreateExportOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    exportOrderActions: PropTypes.object.isRequired,
    isCommitting: PropTypes.bool,
    isLoadingGoods: PropTypes.bool,
    isLoadingCompanies: PropTypes.bool,
    isLoadingWarehouses: PropTypes.bool,
    user: PropTypes.object,
    data: PropTypes.object,
    companies: PropTypes.array,
    goods: PropTypes.array,
    warehouses: PropTypes.array,
    params: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.exportOrder.isLoading,
        isCommitting: state.exportOrder.isCommitting,
        isLoadingGoods: state.exportOrder.isLoadingGoods,
        isLoadingCompanies: state.exportOrder.isLoadingCompanies,
        isLoadingWarehouses: state.exportOrder.isLoadingWarehouses,
        user: state.login.user,
        data: state.exportOrder.data,
        companies: state.exportOrder.companies,
        goods: state.exportOrder.goods,
        warehouses: state.exportOrder.warehouses,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        exportOrderActions: bindActionCreators(exportOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExportOrderContainer);

let defaultData = {
    company: {id: null, name: ""},
    staff: {id: null, name: ""},
    good: {id: null, name: ""},
    warehouse: {id: null, name: ""},
    quantity: 1,
    total_price: 0,
    discount: 0,
};