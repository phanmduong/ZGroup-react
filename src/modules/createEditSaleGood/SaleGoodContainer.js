import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createSaleGoodsActions from './createSaleGoodsActions';
import OrderCustomerInfoContainer from "./OrderCustomerInfoContainer";
import ListChildGoods from "./ListChildGoods";
import AddGoodOverlay from "./AddGoodOverlay";
import ReactSelect from 'react-select';
import * as createSaleGoodApis from './createSaleGoodApis';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';



class SaleGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadWarehouses = this.loadWarehouses.bind(this);
        this.changeWarehouse = this.changeWarehouse.bind(this);
        this.createSaleGood = this.createSaleGood.bind(this);
    }

    componentWillMount() {
        this.props.createSaleGoodsActions.loadCustomers();
    }

    changeWarehouse(value){
        this.props.createSaleGoodsActions.changeWarehouse(value.value);
    }
    createSaleGood(e){
        this.props.createSaleGoodsActions.createSaleGood(this.props.createSaleGoods );
        e.preventDefault();
    }
    loadWarehouses(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            createSaleGoodApis.loadWareHouseApi(input).then(res => {
                let warehouses = res.data.data.warehouses.map((warehouse) => {
                    return {
                        ...warehouse,
                        ...{
                            value: warehouse.id,
                            label: warehouse.name + (!helper.isEmptyInput(warehouse.phone) ? ` (${warehouse.phone})` : ""),
                        }
                    };
                });
                callback(null, {options: warehouses, complete: true});
            });
        }.bind(this), 500);
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group">
                        <label className="label-control">Chọn kho hàng</label>
                        <ReactSelect.Async
                            loadOptions={this.loadWarehouses}
                            loadingPlaceholder="Đang tải..."
                            placeholder="Chọn nhà kho"
                            searchPromptText="Không có dữ liệu "
                            onChange={this.changeWarehouse}
                            value={this.props.warehouse}
                        />
                    </div>

                    {this.props.warehouse === 0?
                    null :
                        <div className="card">
                            <div className="card-title"/>
                            <div className="card-header card-header-icon" style={{zIndex : 0}} data-background-color="rose"><i
                                className="material-icons">announcement</i>
                            </div>
                            <div className="card-content">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="card-title">Chi tiết đơn hàng</h4>
                                    </div>
                                    <div className="col-md-2"
                                         style={{
                                             display: 'flex',
                                         }}>
                                        <AddGoodOverlay
                                        />
                                    </div>
                                </div>


                                <ListChildGoods/>
                            </div>

                        </div>

                    }





                    <div className="card-footer">
                        <div className="float-right" style={{marginBottom: '20px'}}>
                            {this.props.isSaving ?
                                <button
                                    className="btn btn-sm btn-success disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/>
                                    Đang cập nhật
                                </button>
                                :

                                <button className="btn btn-sm btn-success"
                                        onClick={(e) => {
                                            this.createSaleGood(e);
                                        }}
                                >
                                    <i className="material-icons">save</i> Lưu
                                </button>
                            }
                            <button className="btn btn-sm btn-danger"
                            onClick={(e)=>{
                                browserHistory.push("/good/goods/orders");
                                e.preventDefault();
                            }}
                            >
                                <i className="material-icons">cancel</i> Huỷ
                            </button>
                        </div>
                    </div>







                </div>
                <div className="col-md-4">
                    <OrderCustomerInfoContainer/>
                </div>
            </div>
        );
    }
}

SaleGoodContainer.propTypes = {
    createSaleGoodsActions: PropTypes.object,
    goodsList: PropTypes.array,
    isLoadingGoodModal: PropTypes.bool,
    isSaving: PropTypes.bool,
    totalGoodPages: PropTypes.number,
    createSaleGoods: PropTypes.object,
    warehouse: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        goodsList: state.createSaleGoods.goodsList,
        isLoadingGoodModal: state.createSaleGoods.isLoadingGoodModal,
        totalGoodPages: state.createSaleGoods.totalGoodPages,
        createSaleGoods: state.createSaleGoods,
        warehouse: state.createSaleGoods.warehouse,
        isSaving: state.createSaleGoods.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSaleGoodsActions: bindActionCreators(createSaleGoodsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleGoodContainer);


