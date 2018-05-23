import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormInputText from "../../../components/common/FormInputText";
import * as helper from "../../../helpers/helper";

const textAlign = { textAlign: "right" };

class InfoMoDal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
        };
    }


    componentWillReceiveProps(nextProps) {
        let { data } = nextProps;
        this.setState({
            data: {
                ...data,
            },
        });
    }


    render() {
        //let {data} = this.props;
        let { data } = this.state;
        let sumQuantity = 0, sumPrice = 0;
        return (
            <Modal
                bsSize="large"
                show={this.props.show}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin xuất hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content">
                        <div className="container-fluid">
                            
                                <form role="form" id="form-id" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">

                                                <div className="card-content">
                                                    <h4 className="card-title"><strong>Sản phẩm</strong></h4>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead className="text-rose">
                                                                <tr>
                                                                    <th style={{ width: "10%" }}>STT</th>
                                                                    <th style={{ width: "40%" }}>Tên</th>
                                                                    <th style={textAlign}>Phân loại</th>
                                                                    <th style={textAlign}>Số lượng đặt</th>
                                                                    <th style={textAlign}>Số lượng xuất</th>
                                                                    <th style={textAlign}>Đơn giá</th>
                                                                    <th style={textAlign}>Kho xuất</th>
                                                                    <th style={textAlign}>Thành tiền</th>
                                                                    <th />
                                                                </tr>
                                                            </thead>
                                                            {(data && data.goods && data.goods.length > 0) ?
                                                                <tbody>
                                                                    {data.goods.map(
                                                                        (obj, index) => {
                                                                            let pr = obj.price * obj.export_quantity * 1, typeGood = "Khác";



                                                                            switch (obj.good.kind) {
                                                                                case "book_comic": {
                                                                                    typeGood = "Truyện tranh";
                                                                                    pr -= data.company.discount_comic * pr / 100;
                                                                                    break;
                                                                                }
                                                                                case "book_text": {
                                                                                    typeGood = "Truyện chữ";
                                                                                    pr -= data.company.discount_text * pr / 100;
                                                                                    break;
                                                                                }
                                                                            }

                                                                            sumPrice += pr;
                                                                            sumQuantity += obj.export_quantity * 1;
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{obj.good.name}</td>
                                                                                    {/* <td style={textAlign}>{obj.good.code}</td> */}
                                                                                    <td style={textAlign}>{typeGood}</td>
                                                                                    <td style={textAlign}>{obj.quantity}</td>
                                                                                    <td style={textAlign}>{obj.export_quantity}</td>
                                                                                    <td style={textAlign}>{helper.dotNumber(obj.price)}</td>
                                                                                    <td style={{ ...textAlign, color: (obj.warehouse && obj.warehouse.id) ? "" : "red" }}>
                                                                                        {(obj.warehouse && obj.warehouse.id) ? obj.warehouse.name : "Chưa có"}</td>
                                                                                    <td style={textAlign}>{helper.dotNumber(pr)}</td>
                                                                                    <td/>
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
                                                                    <td />
                                                                    <td colSpan={3} style={textAlign}>Số lượng xuất: {sumQuantity}</td>
                                                                    <td colSpan={3} style={textAlign}>Thành tiền: {helper.dotNumber(sumPrice)}</td>

                                                                    <td />
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
                                                    <h4 className="card-title"><strong>Thông tin</strong></h4>
                                                    <br />
                                                    <div>
                                                        <label>Mã đặt hàng</label>
                                                        <div>{data.command_code}</div>
                                                        </div>
                                                    <div><br />
                                                        <div>
                                                            <div><label>Người tạo đơn hàng</label><br />{data.staff ? data.staff.name : "Không có"}</div><br />
                                                            <div><label>Người xuất hàng</label><br />{data.staff_import_or_export ? data.staff_import_or_export.name : "Không có"}</div><br />
                                                            <FormInputText name="" label="Nhà phân phối" value={data.company.name} disabled />
                                                            <FormInputText name="" label="SĐT liên hệ" value={data.company.phone || "Không có"} disabled />
                                                            <div><label>Chiết khấu truyện tranh</label><br />{data.company.discount_comic || 0}%</div><br />
                                                            <div><label>Chiết khấu truyện chữ</label><br />{data.company.discount_text || 0}%</div><br />
                                                            <FormInputText name="" label="Công ty xuất hàng" value={data.companyDebt.name || "Không có"} disabled />
                                                        </div>
                                                        <label className="control-label">Ghi chú</label>
                                                        <div className="comment-input-wrapper">
                                                            <textarea
                                                                id="textarea-card-comment"
                                                                name="note"
                                                                onChange={()=>{}}
                                                                value={data.note}
                                                                onKeyUp={() => {
                                                                }}
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
                                        </div>
                                    </div>
                                </form>
                        </div>
                        
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

InfoMoDal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    data: PropTypes.object,
};

export default (InfoMoDal);

let defaultData = {
    company: { id: null, name: "" },
    companyDebt: { id: null, name: "" },
    staff: { id: null, name: "" },
    good: [
        // {id: null, name: "", quantity: 0,},
    ],
    warehouse: { id: null, name: "" },
    staff_import_or_export: { id: null, name: "" },
    quantity: 0,
    total_price: 0,
    discount: 0,
};