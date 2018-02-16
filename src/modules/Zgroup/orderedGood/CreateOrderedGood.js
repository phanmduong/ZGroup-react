/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderedGoodActions from "./orderedGoodAction";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import FormInputSelect from "../../../components/common/FormInputSelect";
import TooltipButton from '../../../components/common/TooltipButton';
import {Modal} from 'react-bootstrap';
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";

const textAlignCenter = {textAlign: "right"};

class CreateOrderedGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
            showAddModal: false,
            addModalData:defaultAddModalData,
            editIndex: -1,
        };
        this.isEditModal = false;
        this.closeAddModal = this.closeAddModal.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.updateFormAdd = this.updateFormAdd.bind(this);
        this.addGood = this.addGood.bind(this);
        this.remove  = this.remove.bind(this);
    }

    componentWillMount() {
    }

    componentDidUpdate(){
        helper.setFormValidation('#form-ordered-good');
    }

    openAddModal(index){
        console.log(index);
        if(!index){
            this.isEditModal = false;
            this.setState({showAddModal: true, addModalData: defaultAddModalData});
        }else {
            this.isEditModal = true;
            this.setState({showAddModal: true, addModalData: this.state.data.goods[index], editIndex: index});
        }
    }

    closeAddModal(){
        this.setState({showAddModal: false});
    }

    updateFormAdd(e){
        let name = e.target.name;
        let value = e.target.value;
        let {addModalData} = this.state;
        if(name==="id"){
            let good = allGood.filter((obj) => obj.id === value)[0];
            addModalData = {...addModalData, [name]: value, ...good};
        }else
        addModalData = {...addModalData, [name]: value};
        this.setState({addModalData});
    }

    addGood(){
        if ($('#form-ordered-good').valid()) {
            if(helper.isEmptyInput(this.state.addModalData.id)){
                helper.showErrorNotification("Vui lòng chọn sản phẩm");
                return;
            }
        }else {return;}
        let {goods} = this.state.data;
        let good = allGood.filter((obj) => obj.id === this.state.addModalData.id)[0];
        if(this.isEditModal){
            goods = [...goods.slice(0, this.state.editIndex),
                {...this.state.addModalData, name: good.name},
                ...goods.slice(this.state.editIndex+1, goods.length)
                ];
        }else {
            goods = [...goods, {...this.state.addModalData,  name: good.name}];
        }

        this.setState({
            data: {...this.state.data, goods},
            showAddModal: false,
            addModalData: defaultAddModalData
        });
    }

    remove(index){
        helper.confirm("warning", "Xóa","Bạn có chắc muốn xóa?", ()=>{
            let {goods} = this.state.data;
            goods = [...goods.slice(0, index),...goods.slice(index+1, goods.length)];
            this.setState({data: {...this.state.data, goods}});
        });
    }

    render() {
        let {isLoading} = this.props;
        let {data, showAddModal, addModalData} = this.state;
        let sumQuantity=0, sumPrice=0;
        return (
                    <div className="content">
                        <div className="container-fluid">
                            {(isLoading) ? <Loading/> :
                                <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">event_available</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Sản phẩm</h4>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead className="text-rose">
                                                            <tr>
                                                                <th style={{width: "10%"}}>STT</th>
                                                                <th style={{width: "40%"}}>Tên</th>
                                                                <th style={textAlignCenter}>Số lượng</th>
                                                                <th style={textAlignCenter}>Đơn giá</th>
                                                                <th style={textAlignCenter}>Thành tiền</th>
                                                                <th>
                                                                    <TooltipButton text="Thêm sản phẩm" placement="top">
                                                                        <button style={{ float: "right"}}
                                                                                className="btn btn-fill btn-rose btn-sm"
                                                                                type="button"
                                                                                onClick={()=> this.openAddModal(null)}
                                                                        ><i className="material-icons">add</i> Thêm
                                                                        </button>
                                                                    </TooltipButton>
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {data.goods.map(
                                                                (obj, index) => {
                                                                    sumPrice += obj.price * obj.quantity ;
                                                                    sumQuantity += obj.quantity *1;
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{obj.name}</td>
                                                                            <td style={textAlignCenter}>{obj.quantity}</td>
                                                                            <td style={textAlignCenter}>{helper.convertMoneyToK(obj.price)}</td>
                                                                            <td style={textAlignCenter}>{helper.convertMoneyToK(obj.price * obj.quantity)}</td>
                                                                            <td><div className="btn-group-action" style={{display:"flex", justifyContent: "center"}}>
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
                                                            <tfoot style={{fontWeight: "bolder"}}>
                                                                <tr>
                                                                    <td/>
                                                                    <td>Tổng</td>
                                                                    <td style={textAlignCenter}>{sumQuantity}</td>
                                                                    <td/>
                                                                    <td style={textAlignCenter}>{helper.convertMoneyToK(sumPrice)}</td>
                                                                    <td/>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">local_shipping</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Nhà phân phối</h4>
                                                    <FormInputSelect
                                                        name=""
                                                        updateFormData={()=>{}}
                                                        label="Chọn nhà phân phối"
                                                        data={[
                                                            {id: "1", name: "Nhà Phân Phối 1"},
                                                            {id: "2", name: "Nhà Phân Phối 2"},
                                                            {id: "3", name: "Nhà Phân Phối 3"},
                                                            ]}
                                                        placeholder="Chọn nhà phân phối"
                                                        value={data.company.id}
                                                    />
                                                    <div>
                                                        <label>Thông tin</label>
                                                        <div>Nội dung</div>
                                                    </div>
                                                    <div>
                                                        <label className="control-label">Ghi chú</label>
                                                        <div className="comment-input-wrapper">
                                                                <textarea
                                                                    id="textarea-card-comment"
                                                                    name="note"
                                                                    onChange={()=>{}}
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
                                       style={{float: "right", color: "gray"}}
                                       onClick={this.closeAddModal}>
                                        <i className="material-icons">highlight_off</i></a>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form role="form" id="form-ordered-good">
                                    <FormInputSelect
                                        name="id"
                                        updateFormData={this.updateFormAdd}
                                        data={allGood}
                                        label="Chọn sản phẩm"
                                        value={addModalData.id}
                                        placeholder="Chọn sản phẩm"
                                    />
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
                                        name="" type="number"
                                        label="Thành tiền"
                                        value={addModalData.price * addModalData.quantity}
                                        updateFormData={() => {}}
                                        placeholder="Thành tiền"
                                        disabled
                                    />
                                </form>
                            </Modal.Body>
                            <Modal.Footer>

                                    <div style={{display: "flex", justifyContent: "flex-end"}}>
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

CreateOrderedGood.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderedGood.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedGoodActions: bindActionCreators(orderedGoodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderedGood);

const defaultData = {
    company: {id: "", name: ""},
    goods: [
        {id: "1", name: "Sản phẩm 1", quantity: 1, price: 3},
        {id: "2", name: "Sản phẩm 2", quantity: 2, price: 4},
        {id: "3", name: "Sản phẩm 3", quantity: 3, price: 5},
    ],
    note: "",
};
const defaultAddModalData= {
    id: "",
    quantity: 0,
    price: 0,
};

const allGood = [
    {id: "", name: "Chọn sản phẩm", quantity: 0, price: 0},
    {id: "1", name: "Sản phẩm 1", quantity: 1, price: 3},
    {id: "2", name: "Sản phẩm 2", quantity: 2, price: 4},
    {id: "3", name: "Sản phẩm 3", quantity: 3, price: 5},
];