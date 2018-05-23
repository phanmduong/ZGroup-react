import React from "react";
import * as helper from "../../helpers/helper";
import {browserHistory} from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import * as importOrderActions from "../importOrder/importOrderActions";
import FormInputText from "../../components/common/FormInputText";
import ReactSelect from 'react-select';
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";


const textAlign = {textAlign: "right"};
const btnStyle = {marginRight: 10};

class CreateItemImportOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
            showAddModal: false,
            addModalData: defaultAddModalData,
            showInfoModal: false,
            editIndex: -1,
        };
        this.isEditModal = false;
        this.changeDataOrder = this.changeDataOrder.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.changeDataWarehouse = this.changeDataWarehouse.bind(this);
        this.updateWareHouseFormAdd = this.updateWareHouseFormAdd.bind(this);
        this.updateFormAdd = this.updateFormAdd.bind(this);
        this.addGood = this.addGood.bind(this);
        this.commitData = this.commitData.bind(this);
        this.changeDataCompanies = this.changeDataCompanies.bind(this);



    }

    componentWillMount() {
        this.props.importOrderActions.loadAllOrder();
        this.props.importOrderActions.loadAllWarehourses();
        this.props.importOrderActions.loadAllGoods();
        this.props.importOrderActions.loadAllCompanies();
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
    updateFormAdd(e) {
        let name = e.target.name;
        let value = e.target.value;
        let {addModalData} = this.state;
        if (!value) return;
        if (name === "id") {
            let good = this.props.goods.filter((obj) => obj.id * 1 === value * 1)[0];
            if (good) addModalData = {
                ...addModalData,
                [name]: value,
            };
        } else
            addModalData = {...addModalData, [name]: value};
        this.setState({addModalData});
    }

    openAddModal(index) {
        if (index || index === 0) {
            this.isEditModal = true;
            this.setState({showAddModal: true, addModalData: this.state.data.goods[index], editIndex: index});
        }
    }

    closeAddModal() {
        this.setState({showAddModal: false});
    }


    changeDataOrder() {
        let arr = [];
        arr = this.props.itemOrders.map((pp) => {
            return {
                ...pp,
                value: pp.id,
                label: pp.command_code,
            };
        });
        return arr;
    }

    changeDataWarehouse() {
        let arr = [];
        arr = this.props.warehouses.map((pp) => {
            return {
                ...pp,
                value: pp.id,
                label: pp.name,
            };
        });
        return arr;
    }

    changeOrder(e) {
        if (!e) return;
        this.setState({data: e});

    }
    changeCompanies = (e)=>{
        if(!e) return;
        let data = {...this.state.data};
        data.companyDebt = e;
        this.setState({data});
    };
    updateWareHouseFormAdd(e) {
        if (!e) return;
        let newdata = this.state.addModalData;
        this.setState({addModalData: {...newdata, warehouse: e}});
    }

    addGood() {
        if ($('#form-good').valid()) {
            if (!this.state.addModalData.warehouse.id) {
                helper.showErrorNotification("Vui lòng chọn kho xuất!");
                return;
            }

            let {goods} = this.state.data;
            let good = goods.filter((obj) => obj.id === this.state.addModalData.id)[0];
            if (!good) return;

            goods = [...goods.slice(0, this.state.editIndex),
                {
                    ...this.state.addModalData,
                    name: good.name,
                    imported_quantity: this.state.addModalData.imported_quantity
                },
                ...goods.slice(this.state.editIndex + 1, goods.length)
            ];


            this.setState({
                data: {...this.state.data, goods},
                showAddModal: false,
                addModalData: defaultAddModalData
            });
        }
    }


    commitData() {
        let {data} = this.state;
        if (!data.id) {
            helper.showErrorNotification("Vui lòng chọn mã đặt hàng");
            return;
        }
        if (!data.companyDebt.id) {
            helper.showErrorNotification("Vui lòng chọn công ty nhập hàng");
            return;
        }

        let selectedAllWareHouse = true;
        data.goods.forEach(obj => {
            if (!obj.warehouse || !obj.warehouse.id) {

                selectedAllWareHouse = false;
                return;
            }
        });

        if (!selectedAllWareHouse) {
            helper.showErrorMessage("Vui lòng chọn kho xuất cho tất cả sản phẩm");
            return;
        }
        let n = data.good_count;
        let arr = [];
        for(let i=data.goods.length-1 ; i>data.goods.length -1- n;i--){
            arr = [data.goods[i],...arr];
        }
        this.props.importOrderActions.createImportOrder(
            {
                ...data,
                goods: JSON.stringify(arr.map(
                    (obj) => {
                        if (!obj.warehouse || !obj.warehouse.id) return;
                        return ({
                            id: obj.id,
                            good_id: obj.good.id,
                            price: obj.price,
                            quantity: obj.quantity,
                            imported_quantity: obj.imported_quantity,
                            warehouse_id: obj.warehouse.id,
                        });
                    })
                ),
                staff_id: this.props.user.id,
                company_debt_id: data.companyDebt.id,

            });

    }

    render() {
        let {data, addModalData} = this.state;
        let sumQuantity = 0, sumPrice = 0, sumImportedQuantity=0;
        let count = 0;
        return (
            <div className="content">
                <div className="container-fluid">
                    {(this.props.isLoading) ? <Loading/> :
                        <form role="form" id="form-id" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">

                                        <div className="card-content">
                                            <h4 className="card-title"><strong> Sản phẩm </strong></h4>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="text-rose">
                                                    <tr>
                                                        <th style={{width: "10%"}}>Lần nhập</th>
                                                        <th style={{width: "40%"}}>Tên</th>
                                                        <th style={textAlign}>Số lượng đặt</th>
                                                        <th style={textAlign}>Đơn giá</th>
                                                        <th style={textAlign}>Kho nhập</th>
                                                        <th style={textAlign}>Ngày nhập</th>
                                                        <th style={textAlign}>Số lượng nhập</th>
                                                        <th style={textAlign}>Thành tiền</th>


                                                    </tr>
                                                    </thead>
                                                    {(data && data.goods && data.goods.length > 0) ?
                                                        <tbody>
                                                        {data.goods.map(
                                                            (obj, index) => {
                                                                sumPrice += obj.price * parseInt(obj.imported_quantity);
                                                                sumQuantity += obj.quantity * 1;
                                                                count += 1;
                                                                sumImportedQuantity+= parseInt(obj.imported_quantity);
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{index % data.good_count === 0 ? (index / data.good_count + 1) :
                                                                            <p/>}</td>
                                                                        <td>{obj.good.name}</td>
                                                                        <td style={textAlign}>{obj.quantity}</td>
                                                                        <td style={textAlign}>{helper.dotNumber(obj.price)}</td>
                                                                        <td style={{
                                                                            ...textAlign,
                                                                            color: (obj.warehouse && obj.warehouse.id) ? "" : "red"
                                                                        }}>
                                                                            {(obj.warehouse && obj.warehouse.id) ? obj.warehouse.name : "Chưa có"}</td>
                                                                        <td style={textAlign}>{(obj.warehouse && obj.warehouse.id) ? obj.created_at : "Chưa có"}</td>
                                                                        <td style={textAlign}>{obj.imported_quantity}</td>
                                                                        <td style={textAlign}>{helper.dotNumber(obj.price * obj.imported_quantity)}</td>
                                                                        <td>{
                                                                            (obj.status) ?
                                                                                <div/> :
                                                                                <div className="btn-group-action"
                                                                                     style={{
                                                                                         display: "flex",
                                                                                         justifyContent: "center"
                                                                                     }}>
                                                                                    <a data-toggle="tooltip" title="Sửa"
                                                                                       type="button" rel="tooltip"
                                                                                       onClick={() => {
                                                                                           return this.openAddModal(index);
                                                                                       }}><i
                                                                                        className="material-icons">edit</i>
                                                                                    </a>
                                                                                </div>
                                                                        }</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                        :
                                                        <tbody>
                                                        <tr>
                                                            <td/>
                                                            <td colSpan={5}>Chưa có sản phẩm</td>
                                                        </tr>
                                                        </tbody>

                                                    }

                                                    <tfoot style={{fontWeight: "bolder", fontSize: "1.1em"}}>
                                                    <tr>
                                                        <td/>
                                                        <td>Tổng</td>
                                                        <td style={textAlign}>{sumQuantity / (count / parseInt(data.good_count))}</td>
                                                        <td/>
                                                        <td/>
                                                        <td/>
                                                        <td style={textAlign}>{sumImportedQuantity} </td>
                                                        <td style={textAlign}>{helper.dotNumber(sumPrice)}</td>
                                                        <td/>
                                                    </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            {this.props.isLoading ?
                                                <div className="" style={{
                                                    display: "flex",
                                                    flexDirection: "row-reverse",
                                                    marginRight: 30,
                                                    marginTop: 40
                                                }}>
                                                    <button style={btnStyle} className="btn btn-rose disabled"
                                                            type="button" disabled>
                                                        <i className="fa fa-spinner fa-spin"/> Đang lưu...
                                                    </button>
                                                </div>
                                                :
                                                <div className="" style={{
                                                    display: "flex",
                                                    flexDirection: "row-reverse",
                                                    marginRight: 10,
                                                    marginTop: 40
                                                }}>
                                                    <button
                                                        className="btn btn-fill" type="button"
                                                        style={btnStyle}
                                                        onClick={() => {
                                                            helper.confirm("warning", "Hủy bỏ", "Bạn có chắc muốn hủy không?",
                                                                () => {
                                                                    return browserHistory.push("/business/import-order");
                                                                }
                                                            );
                                                        }}
                                                    ><i className="material-icons">cancel</i> Hủy
                                                    </button>
                                                    <button
                                                        className="btn btn-fill btn-rose"
                                                        style={btnStyle}
                                                        type="button"
                                                        onClick={this.commitData}
                                                        disabled={this.props.isLoading}
                                                    ><i className="material-icons">add</i> Lưu
                                                    </button>
                                                </div>

                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">

                                        <div className="card-content">
                                            <h4 className="card-title"> <strong>Thông tin </strong> </h4>

                                            <div>
                                                <label>Chọn mã đặt hàng</label>
                                                <ReactSelect
                                                    disabled={this.props.isLoading}
                                                    options={this.changeDataOrder() || []}
                                                    onChange={this.changeOrder}
                                                    value={data.id}
                                                    name="order"
                                                    defaultMessage="Chọn mã"
                                                /></div>
                                            <div>
                                                <div>
                                                    <FormInputText name="" label="Nhà cung cấp"
                                                                   value={data.company.name} disabled/>
                                                    <FormInputText name="" label="Người nhập hàng"
                                                                   value={data.staff_import_or_export.length ? data.staff_import_or_export.name : this.props.user.name}
                                                                   disabled/>
                                                </div>
                                                <div>
                                                    <label> Chọn công ty nhập hàng </label>
                                                    <ReactSelect
                                                        disabled={this.props.isLoading}
                                                        options={this.changeDataCompanies() || []}
                                                        onChange={this.changeCompanies}
                                                        value={data.companyDebt.id}
                                                        name="order"
                                                        defaultMessage="Chọn công ty"
                                                    />
                                                </div>
                                                <label className="control-label">Ghi chú</label>
                                                <div className="comment-input-wrapper">
                                                    <textarea
                                                        id="textarea-card-comment"
                                                        name="note"
                                                        onChange={this.updateFormData}
                                                        value={data.note}
                                                        onKeyUp={() => {
                                                        }}
                                                        placeholder="Nhập ghi chú"
                                                        className="comment-input"
                                                        style={{
                                                            width: "100%",
                                                            margin: "10px",
                                                            height: "100px",
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>}
                </div>
                <Modal bsSize="small" show={this.state.showAddModal} onHide={this.closeAddModal}>
                    <Modal.Header>
                        <Modal.Title>Thuộc tính
                            <a data-toggle="tooltip" title="Đóng" type="button" rel="tooltip"
                               style={{float: "right", color: "gray"}}
                               onClick={this.closeAddModal}>
                                <i className="material-icons">highlight_off</i></a>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form role="form" id="form-good" onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div>
                                <label>Chọn kho nhập</label>
                                <ReactSelect
                                    disabled={this.props.isLoading}
                                    options={this.changeDataWarehouse() || []}
                                    onChange={this.updateWareHouseFormAdd}
                                    value={addModalData.warehouse.id}
                                    defaultMessage="Chọn kho xuất"
                                /></div>

                            <FormInputText
                                name="imported_quantity" type="number"
                                label="Số lượng nhập"
                                value={addModalData.imported_quantity}
                                minValue="0"
                                updateFormData={this.updateFormAdd}
                                placeholder="Nhập số lượng"
                                required
                            />
                            <FormInputText
                                name="price" type="number"
                                label="Đơn giá"
                                value={addModalData.price}
                                minValue="0"
                                updateFormData={this.updateFormAdd}
                                placeholder="Nhập giá"
                                disabled
                            />
                            <FormInputText
                                name="" type="number"
                                label="Thành tiền"
                                value={addModalData.price * addModalData.imported_quantity}
                                updateFormData={() => {
                                }}
                                placeholder="Thành tiền"
                                disabled
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <button className="btn btn-fill btn-rose" type="button"
                                    onClick={this.addGood}
                            ><i className="material-icons">done</i> Lưu
                            </button>
                            <button className="btn btn-fill" type="button"
                                    onClick={this.closeAddModal}
                            ><i className="material-icons">cancel</i> Hủy
                            </button>
                        </div>

                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

CreateItemImportOrderContainer.propTypes = {
    isLoading: PropTypes.bool,
    itemOrders: PropTypes.array,
    warehouses: PropTypes.array,
    user: PropTypes.object,
    goods: PropTypes.array,
    importOrderActions: PropTypes.object,
    historyImportOrder: PropTypes.array,
    paginator_history: PropTypes.object,
    companies: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.importOrder.isLoading,
        itemOrders: state.importOrder.itemOrders,
        warehouses: state.importOrder.warehouses,
        goods: state.importOrder.goods,
        user: state.login.user,
        companies: state.importOrder.companies,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importOrderActions: bindActionCreators(importOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateItemImportOrderContainer);
let defaultData = {
    company: {id: null, name: ""},
    companyDebt: {id: null, name: ""},
    staff: {id: null, name: ""},
    good: [
        // {id: null, name: "", quantity: 0,},
    ],
    warehouse: {id: null, name: ""},
    imported_quantity: 0,
    quantity: 0,
    staff_import_or_export: [],
    total_price: 0,
    good_count: 1,
    status: 0,
};
const defaultAddModalData = {
    good: {},
    warehouse: {},
};