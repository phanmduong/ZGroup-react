/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderGoodActions from "./orderGoodAction";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import TooltipButton from '../../../components/common/TooltipButton';
import { Modal } from 'react-bootstrap';
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";
import { browserHistory } from 'react-router';
import ReactSelect from 'react-select';

const textAlign = { textAlign: "right" };
const btnStyle = { marginRight: 10 };

class CreateOrderGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
            showAddModal: false,
            addModalData: defaultAddModalData,
            editIndex: -1,
        };
        this.isEditModal = false;
        this.closeAddModal = this.closeAddModal.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.updateFormAdd = this.updateFormAdd.bind(this);
        this.addGood = this.addGood.bind(this);
        this.remove = this.remove.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.commitData = this.commitData.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
    }

    componentWillMount() {
        this.props.orderGoodActions.loadAllGoods();
        this.props.orderGoodActions.loadAllCompanies();
        let id = this.props.params.orderGoodId;
        if (id) {
            this.props.orderGoodActions.loadOrderGood(id, (data) => {
                let arr = data.goods.map((obj) => {
                    return { ...obj, id: obj.good.id, real_quantity: obj.quantity };
                });
                data.goods = arr;
                this.setState({ data });
            });
        } else {
            this.setState({ data: defaultData });
        }
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }

    componentDidUpdate() {
        helper.setFormValidation('#form-order-good');
    }

    openAddModal(index) {
        if (index || index === 0) {
            this.isEditModal = true;
            this.setState({ showAddModal: true, addModalData: this.state.data.goods[index], editIndex: index });
        } else {
            this.isEditModal = false;
            this.setState({ showAddModal: true, addModalData: defaultAddModalData });
        }
    }

    closeAddModal() {
        this.setState({ showAddModal: false });
    }

    updateFormAdd(e) {
        if (!e) return;
        let { addModalData } = this.state;
        if (!e.target) {
            addModalData = { ...e };
        } else {
            let name = e.target.name;
            let value = e.target.value;
            addModalData = { ...addModalData, [name]: value };
        }
        this.setState({ addModalData });
    }

    onChangeCompany(e) {
        if (e) {
            this.setState({ data: { ...this.state.data, company: e } });
        }
    }

    addGood() {
        if ($('#form-order-good').valid()) {
            if (helper.isEmptyInput(this.state.addModalData.id)) {
                helper.showErrorNotification("Vui lòng chọn sản phẩm");
                return;
            }
        } else { return; }
        let { goods } = this.state.data;
        let good = this.state.addModalData;
        if (this.isEditModal) {
            goods = [...goods.slice(0, this.state.editIndex),
            { ...this.state.addModalData, name: good.name },
            ...goods.slice(this.state.editIndex + 1, goods.length)
            ];
        } else {
            goods = [...goods, { ...this.state.addModalData, name: good.name }];
        }

        this.setState({
            data: { ...this.state.data, goods },
            showAddModal: false,
            addModalData: defaultAddModalData
        });
        helper.showNotification("Đã thêm sản phẩm");
    }

    remove(index) {
        helper.confirm("warning", "Xóa", "Bạn có chắc muốn xóa?", () => {
            let { goods } = this.state.data;
            goods = [...goods.slice(0, index), ...goods.slice(index + 1, goods.length)];
            this.setState({ data: { ...this.state.data, goods } });
        });
    }

    commitData() {
        let { data } = this.state;
        let { user, params } = this.props;
        if (!data.company || helper.isEmptyInput(data.company.id)) {
            helper.showErrorNotification("Vui lòng chọn nhà cung cấp!");
            return;
        } else
            if (!data.goods || data.goods.length == 0) {
                helper.showErrorNotification("Vui lòng thêm sản phẩm!");
                return;
            }
        let res = {
            id: params.orderGoodId,
            ...data,
            staff_id: user.id,
            company_id: data.company.id,
            goods: JSON.stringify(data.goods.map(
                (obj) => {
                    return ({
                        id: obj.id,
                        price: obj.price,
                        quantity: obj.quantity,
                    });
                })
            ),
        };
        if (params.orderGoodId)
            this.props.orderGoodActions.editOrderGood(res);
        else
            this.props.orderGoodActions.createOrderGood(res);
    }

    onChangeNote(e) {
        let note = e.target.value;
        this.setState({ data: { ...this.state.data, note } });
    }

    render() {
        let { isLoading, goods, companies, isCommitting, user } = this.props;
        let { data, showAddModal, addModalData } = this.state;
        let sumQuantity = 0, sumPrice = 0;
        //console.log(this.state);
        return (
            <div className="content">
                <div className="container-fluid">
                    {(isLoading) ? <Loading /> :
                        <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="flex-row flex">
                                                <h4 className="card-title"><strong>Sản phẩm</strong></h4>
                                                <div>
                                                    <TooltipButton text="Thêm sản phẩm" placement="top">
                                                        <button style={{ float: "right" }}
                                                            className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                            type="button"
                                                            onClick={() => this.openAddModal(null)}
                                                        >
                                                            <strong>+</strong>
                                                        </button>
                                                    </TooltipButton>
                                                </div>
                                            </div>

                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="text-rose">
                                                        <tr>
                                                            <th style={{ width: "10%" }}>STT</th>
                                                            <th style={{ width: "40%" }}>Tên</th>
                                                            <th style={textAlign}>Số lượng</th>
                                                            <th style={textAlign}>Phân loại</th>
                                                            <th style={textAlign}>Đơn giá</th>
                                                            <th style={textAlign}>Thành tiền</th>
                                                        </tr>
                                                    </thead>
                                                    {(data && data.goods && data.goods.length > 0) ?
                                                        <tbody>
                                                            {data.goods.map(
                                                                (obj, index) => {
                                                                    let pr = obj.price * obj.quantity * 1, typeGood = "Khác";
                                                                    sumPrice += pr;
                                                                    sumQuantity += obj.quantity * 1;
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{obj.name ? obj.name : obj.good.name}</td>
                                                                            <td style={textAlign}>{obj.quantity}</td>
                                                                            <td style={textAlign}>{typeGood}</td>
                                                                            <td style={textAlign}>{helper.dotNumber(obj.price)}</td>
                                                                            <td style={textAlign}>{helper.dotNumber(obj.price * obj.quantity)}</td>
                                                                            <td><div className="btn-group-action" style={{ display: "flex", justifyContent: "center" }}>
                                                                                <a data-toggle="tooltip" title="Sửa" type="button" rel="tooltip"
                                                                                    onClick={() => {
                                                                                        return this.openAddModal(index);
                                                                                    }}><i className="material-icons">edit</i>
                                                                                </a>
                                                                                <a data-toggle="tooltip" title="Xoá" type="button" rel="tooltip"
                                                                                    onClick={() => {
                                                                                        return this.remove(index);
                                                                                    }}><i className="material-icons">delete</i>
                                                                                </a>
                                                                            </div></td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                        </tbody>
                                                        :
                                                        <tbody>
                                                            <tr><td /><td colSpan={5}>Chưa có sản phẩm</td></tr>
                                                        </tbody>

                                                    }
                                                    <tfoot style={{ fontWeight: "bolder", fontSize: "1.1em" }}>
                                                        <tr>
                                                            <td />
                                                            <td>Tổng</td>
                                                            <td style={textAlign}>{sumQuantity}</td>
                                                            <td />
                                                            <td colSpan={2} style={textAlign}>{helper.dotNumber(sumPrice)}</td>
                                                            <td />
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            {isCommitting ?
                                                <div className="" style={{ display: "flex", flexDirection: "row-reverse", marginTop: 40 }}>
                                                    <button style={btnStyle} className="btn btn-rose disabled" type="button" disabled>
                                                        <i className="fa fa-spinner fa-spin" /> Đang lưu...
                                                                </button>
                                                </div>
                                                :
                                                <div className="" style={{ display: "flex", flexDirection: "row-reverse", marginTop: 40 }}>
                                                    <button
                                                        className="btn btn-fill" type="button"
                                                        style={btnStyle}
                                                        onClick={() => {
                                                            helper.confirm("warning", "Hủy bỏ", "Bạn có chắc muốn hủy không?",
                                                                () => {
                                                                    return browserHistory.push("/business/order-good");
                                                                }
                                                            );
                                                        }}
                                                    ><i className="material-icons">cancel</i> Hủy</button>
                                                    <button
                                                        className="btn btn-fill btn-rose "
                                                        style={btnStyle}
                                                        type="button"
                                                        onClick={this.commitData}
                                                        disabled={isCommitting}
                                                    ><i className="material-icons">add</i>  Lưu</button>
                                                </div>

                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-content">
                                            <h4 className="card-title"><strong>Nhà cung cấp</strong></h4>
                                            <div>
                                                <label>Chọn nhà cung cấp</label>
                                                <ReactSelect
                                                    disabled={isLoading}
                                                    options={companies || []}
                                                    onChange={this.onChangeCompany}
                                                    value={data.company.id}
                                                    name="company"
                                                    defaultMessage="Chọn nhà cung cấp"
                                                />
                                            </div>
                                            <div>
                                                <FormInputText name="" label="Người tạo" value={(data.staff ? data.staff.name : user.name)} disabled />
                                                <FormInputText name="" label="Địa chỉ" value={data.company.office_address} disabled />
                                                <FormInputText name="" label="SĐT Công ty" value={data.company.phone_company} disabled />
                                            </div>
                                            <div>
                                                <label className="control-label">Ghi chú</label>
                                                <div className="comment-input-wrapper">
                                                    <textarea
                                                        id="textarea-card-comment"
                                                        name="note"
                                                        onChange={this.onChangeNote}
                                                        value={data.note}
                                                        onKeyUp={() => {
                                                        }}
                                                        placeholder="Nhập ghi chú"
                                                        className="comment-input"
                                                        required
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
                <Modal bsSize="small" show={showAddModal} onHide={this.closeAddModal}>
                    <Modal.Header>
                        <Modal.Title>Thuộc tính
                                    <a data-toggle="tooltip" title="Đóng" type="button" rel="tooltip"
                                style={{ float: "right", color: "gray" }}
                                onClick={this.closeAddModal}>
                                <i className="material-icons">highlight_off</i></a>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form role="form" id="form-order-good">
                            <div>
                                <label>Chọn sản phẩm</label>
                                <ReactSelect
                                    options={getUnselectedGoods(data.goods, goods, this.isEditModal ? addModalData.id : 0) || []}
                                    onChange={this.updateFormAdd}
                                    value={addModalData.id}
                                    defaultMessage="Chọn nhà sản phẩm"
                                />
                            </div>
                            <FormInputText
                                name="quantity" type="number"
                                label="Số lượng"
                                value={addModalData.quantity}
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
                                required
                            />
                            <FormInputText
                                name="" type="text"
                                label="Thành tiền"
                                value={(addModalData.price * addModalData.quantity)}
                                updateFormData={() => { }}
                                placeholder="Thành tiền"
                                disabled
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button className="btn btn-fill btn-rose" type="button"
                                onClick={this.addGood}
                            ><i className="material-icons">add</i> Thêm
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

CreateOrderGood.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool.isRequired,
    goods: PropTypes.array,
    companies: PropTypes.array,
    orderGoodActions: PropTypes.object,
    user: PropTypes.object,
    params: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderGood.isLoading,
        goods: state.orderGood.goods,
        companies: state.orderGood.companies,
        isCommitting: state.orderGood.isCommitting,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderGoodActions: bindActionCreators(orderGoodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderGood);

function findGood(good, arr) {
    if (!arr || arr.length == 0) return -1;
    for (let i = 0; i < arr.length; i++) {
        if (good.id == arr[i].id) {
            return i;
        }
    }
    return -1;
}

function getUnselectedGoods(chosen, all, editId) {
    let res = [...all];
    chosen.forEach(e => {
        let id = findGood(e, res);
        if (id != -1 && e.id != editId) {
            res = [...res.slice(0, id), ...res.slice(id + 1, res.length)];
        }
    });
    return res;
}

const defaultData = {
    company: { id: "", name: "" },
    goods: [],
    note: "",
};
const defaultAddModalData = {
    id: "",
    quantity: 0,
    price: 0,
};
