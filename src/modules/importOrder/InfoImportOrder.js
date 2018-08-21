import React from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import * as helper from "../../helpers/helper";
import ReactSelect from 'react-select';
import FormInputText from "../../components/common/FormInputText";
const textAlign = {textAlign: "right"};

class InfoImportOrder extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.changeDataOrder = this.changeDataOrder.bind(this);

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
    render(){
        let {data} = this.props;
        let sumQuantity = 0, sumPrice = 0, sumImportedQuantity=0;
        let count = 0;
        return(
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    bsSize="large"
                >
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <div className="content">
                            <div className="container-fluid">

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
                                                                                                       //return this.openAddModal(index);
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
                                                                    <td style={textAlign}>{sumImportedQuantity} </td>
                                                                    <td style={textAlign}>{helper.dotNumber(sumPrice)}</td>
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

                                                    <div className="card-content">
                                                        <h4 className="card-title"> <strong>Thông tin </strong> </h4>

                                                        <div>
                                                            <label>Chọn mã đặt hàng</label>
                                                            <ReactSelect
                                                                disabled={true}
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
                                                                               value={data.staff_import_or_export.name}
                                                                               disabled/>
                                                            </div>
                                                            <label className="control-label">Ghi chú</label>
                                                            <div className="comment-input-wrapper">
                                                    <textarea
                                                        id="textarea-card-comment"
                                                        name="note"
                                                        value={data.note}
                                                        disabled
                                                        onKeyUp={() => {}}
                                                        placeholder=""
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
                                                <div className="card">
                                                    <div className="card-content">
                                                        <h4 className="card-title"><strong> Lịch sử </strong></h4>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <thead className="text-rose">
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>Tên</th>
                                                                    <th style={textAlign}>Ngày nhập</th>
                                                                </tr>
                                                                </thead>
                                                                {(data && data.history && data.history.length > 0) ?
                                                                    <tbody>
                                                                    {data.history.map(
                                                                        (obj, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    
                                                                                    <td>{index+1}</td>
                                                                                    <td>{obj.name}</td>
                                                                                    
                                                                                    
                                                                                    <td style={textAlign}>{obj.date}</td>
                                                                                    
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

                                                                
                                                            </table>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                            </div>


                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
InfoImportOrder.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    data: PropTypes.object,
    itemOrders: PropTypes.arr,
};

export default InfoImportOrder;