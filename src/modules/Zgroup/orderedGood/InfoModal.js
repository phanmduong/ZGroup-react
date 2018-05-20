import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
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
                    <Modal.Title>Đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="content">
                <div className="container-fluid">
                    
                        <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="flex-row flex">
                                                <h4 className="card-title"><strong>Sản phẩm</strong></h4>
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



                                                                    switch (obj.kind) {
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
                                                                    sumQuantity += obj.quantity * 1;
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{obj.name ? obj.name : obj.good.name}</td>
                                                                            <td style={textAlign}>{obj.quantity}</td>
                                                                            <td style={textAlign}>{typeGood}</td>

                                                                            <td style={textAlign}>{helper.dotNumber(obj.price)}</td>
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
                                                            <td>Tổng</td>
                                                            <td style={textAlign}>{sumQuantity}</td>
                                                            <td />
                                                            <td colSpan={2} style={textAlign}>{helper.dotNumber(sumPrice)}</td>
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
                                            <h4 className="card-title"><strong>Nhà phân phối</strong></h4>
                                            <br />
                                            <div>
                                                <label>Nhà phân phối</label>
                                                <div>{data.company.name}</div>
                                            </div><br />
                                            <div>
                                                <div><label>Người tạo đơn hàng</label><br />{data.staff ? data.staff.name : "Không có"}</div><br />
                                                <div><label>Địa chỉ</label><br />{data.company.office_address}</div><br />
                                                <div><label>SĐT liên hệ</label><br />{data.company.phone_company}</div><br />
                                                <div><label>Chiết khấu truyện tranh</label><br />{data.company.discount_comic || 0}%</div><br />
                                                <div><label>Chiết khấu truyện chữ</label><br />{data.company.discount_text || 0}%</div><br />
                                            </div>
                                            <div>
                                                <label>Ghi chú</label>
                                                <div className="comment-input-wrapper">
                                                    <textarea
                                                        id="textarea-card-comment"
                                                        name="note"
                                                        onChange={()=>{}}
                                                        value={data.note || ""}
                                                        onKeyUp={() => {}}
                                                        placeholder=""
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

const defaultData = {
    company: { id: "", name: "", discount_comic: 0, discount_text: 0, },
    goods: [],
    note: "",
};