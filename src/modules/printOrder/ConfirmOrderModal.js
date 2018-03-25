import React from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import FormInputDate from "../../components/common/FormInputDate";
// import * as helper from "../../helpers/helper";



class ConfirmOrderModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
        };
    }


    componentWillReceiveProps(nextProps) {
        let {data} = nextProps;
        this.setState({
            data: {
                ...data,
                core1: JSON.parse(data.core1),
                core2: JSON.parse(data.core2),
                cover1: JSON.parse(data.cover1),
                cover2: JSON.parse(data.cover2),
                spare_part1: JSON.parse(data.spare_part1),
                spare_part2: JSON.parse(data.spare_part2),
                packing1: JSON.parse(data.packing1),
                packing2: JSON.parse(data.packing2),
                other: JSON.parse(data.other),
            }
        });
    }


    render() {
        // let {} = this.props;
        let {data} = this.state;
        let total_price =
            data.core1.number * data.core1.price
            +
            data.core2.number * data.core2.price
            +
            data.cover1.number * data.cover1.price
            +
            data.cover2.number * data.cover2.price
            +
            data.spare_part1.number * data.spare_part1.price
            +
            data.spare_part2.number * data.spare_part2.price
            +
            data.packing1.price  + data.packing2.price
            +
            data.other.price
        ;
        let VAT_price = Math.round(1.1 * total_price).toFixed(2);

        return (
            <Modal
                bsSize="large"
                show={this.props.show}
                onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin đặt in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content">
                        <div className="container-fluid">
                            {
                                <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">assignment</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Chất liệu</h4>
                                                    <div className="table-responsive">
                                                        <table id="datatables" className="table table-no-bordered"
                                                               cellSpacing="0" width="100%" style={{width: "100%"}}>
                                                            <tbody>
                                                            <tr>
                                                                <td width="15%">Ruột 1</td>
                                                                <td><div><FormInputText
                                                                    label="Số trang"
                                                                    value={data.core1.number || ""}
                                                                    name=""
                                                                    disabled
                                                                /></div></td>
                                                                <td colSpan={2}>
                                                                    <FormInputText
                                                                        label="Chất liệu"
                                                                        value={data.core1.material || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Màu"
                                                                        value={data.core1.color || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Khổ in"
                                                                        value={data.core1.size || ""}
                                                                        name=""
                                                                        disabled
                                                                    />

                                                                </td>

                                                                <td><div><FormInputText
                                                                    label="Giá"
                                                                    value={data.core1.price || ""}
                                                                    name=""
                                                                    disabled
                                                                /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Ruột 2</td>
                                                                <td><div><FormInputText
                                                                    label="Số trang"
                                                                    value={data.core2.number || ""}
                                                                    name=""
                                                                    disabled
                                                                /></div></td>
                                                                <td colSpan={2}>
                                                                    <FormInputText
                                                                        label="Chất liệu"
                                                                        value={data.core2.material || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Màu"
                                                                        value={data.core2.color || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Khổ in"
                                                                        value={data.core2.size || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td><div><FormInputText
                                                                    label="Giá"
                                                                    value={data.core2.price || ""}
                                                                    name=""
                                                                    disabled
                                                                /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Bìa 1</td>
                                                                <td><div><FormInputText
                                                                    label="Số trang"
                                                                    value={data.cover1.number || ""}
                                                                    name=""
                                                                    disabled
                                                                /></div></td>
                                                                <td colSpan={2}>
                                                                    <FormInputText
                                                                        label="Chất liệu"
                                                                        value={data.cover1.material || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Màu"
                                                                        value={data.cover1.color || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Khổ in"
                                                                        value={data.cover1.size || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td><div><FormInputText
                                                                    label="Giá"
                                                                    value={data.cover1.price || ""}
                                                                    name=""
                                                                    disabled
                                                                /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Bìa 2</td>
                                                                <td><div><FormInputText
                                                                    label="Số trang"
                                                                    value={data.cover2.number || ""}
                                                                    name=""
                                                                    disabled
                                                                /></div></td>
                                                                <td colSpan={2}>
                                                                    <FormInputText
                                                                        label="Chất liệu"
                                                                        disabled
                                                                        value={data.cover2.material || ""}
                                                                        name=""
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Màu"
                                                                        disabled
                                                                        value={data.cover2.color || ""}
                                                                        name=""
                                                                    />
                                                                </td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Khổ in"
                                                                        disabled
                                                                        value={data.cover2.size || ""}
                                                                        name=""
                                                                    />
                                                                </td>
                                                                <td><div><FormInputText
                                                                    label="Giá"
                                                                    disabled
                                                                    value={data.cover2.price || ""}
                                                                    name=""
                                                                /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phụ kiện 1</td>
                                                                <td style={{width: "15%"}}>
                                                                    <div><FormInputText
                                                                        label="Tên"
                                                                        value={data.spare_part1.name || ""}
                                                                        disabled
                                                                        name=""
                                                                    /></div></td>
                                                                <td style={{width: "10%"}}>
                                                                    <div><FormInputText
                                                                        label="Số lượng"
                                                                        value={data.spare_part1.number || ""}
                                                                        name=""
                                                                        disabled
                                                                    /></div></td>
                                                                <td style={{width: "15%"}}>
                                                                    <FormInputText
                                                                        label="Chất liệu"
                                                                        value={data.spare_part1.material || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "10%"}}>
                                                                    <FormInputText
                                                                        label="Gia công"
                                                                        value={data.spare_part1.made_by || ""}
                                                                        name=""
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td style={{width: "10%"}}>
                                                                    <FormInputText
                                                                        label="Khổ in"
                                                                        disabled
                                                                        value={data.spare_part1.size || ""}
                                                                        name=""
                                                                    />
                                                                </td>
                                                                <td style={{width: "10%"}}>
                                                                    <div><FormInputText
                                                                        label="Giá"
                                                                        value={data.spare_part1.price || ""}
                                                                        name=""
                                                                        disabled
                                                                    /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Phụ kiện 2</td>
                                                                <td><div><FormInputText
                                                                    label="Tên"
                                                                    disabled
                                                                    value={data.spare_part2.name || ""}
                                                                    name=""
                                                                /></div></td>
                                                                <td><div><FormInputText
                                                                    label="Số lượng"
                                                                    disabled
                                                                    value={data.spare_part2.number || ""}
                                                                    name=""
                                                                /></div></td>
                                                                <td>
                                                                    <FormInputText
                                                                        label="Chất liệu"
                                                                        disabled
                                                                        value={data.spare_part2.material || ""}
                                                                        name=""
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <FormInputText
                                                                        label="Gia công"
                                                                        disabled
                                                                        value={data.spare_part2.made_by || ""}
                                                                        name=""
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <FormInputText
                                                                        label="Khổ in"
                                                                        disabled
                                                                        value={data.spare_part2.size || ""}
                                                                        name=""
                                                                    />
                                                                </td>
                                                                <td><div><FormInputText
                                                                    label="Giá"
                                                                    disabled
                                                                    value={data.spare_part2.price || ""}
                                                                    name=""
                                                                /></div></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={1}>{"Đóng gói - Gia công 1"}</td>
                                                                <td colSpan={3}><FormInputText
                                                                    label="Tên"
                                                                    disabled
                                                                    value={data.packing1.name || ""}
                                                                    name=""
                                                                /></td>
                                                                <td colSpan={3}><FormInputText
                                                                    label="Giá"
                                                                    disabled
                                                                    value={data.packing1.price || ""}
                                                                    name=""
                                                                /></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={1}>{"Đóng gói - Gia công 2"}</td>
                                                                <td colSpan={3}><FormInputText
                                                                    label="Tên"
                                                                    disabled
                                                                    value={data.packing2.name || ""}
                                                                    name=""
                                                                /></td>
                                                                <td colSpan={3}><FormInputText
                                                                    label="Giá"
                                                                    disabled
                                                                    value={data.packing2.price || ""}
                                                                    name=""
                                                                /></td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={1}>Khác</td>
                                                                <td colSpan={3}><FormInputText
                                                                    label="Tên"
                                                                    value={data.other.name || ""}
                                                                    disabled
                                                                    name=""
                                                                /></td>
                                                                <td colSpan={3}><FormInputText
                                                                    label="Giá"
                                                                    disabled
                                                                    value={data.other.price || ""}
                                                                    name=""
                                                                /></td>
                                                            </tr>

                                                            <tr>
                                                                <td colSpan={1}>Thời gian</td>
                                                                <td colSpan={3}><FormInputDate
                                                                    label="Ngày đặt in"
                                                                    value={data.order_date || ""}
                                                                    id="" name=""
                                                                    updateFormData={()=>{}}
                                                                    disabled
                                                                /></td>
                                                                <td colSpan={3}><FormInputDate
                                                                    label="Ngày nhận hàng dự kiến"
                                                                    value={data.receive_date || ""}
                                                                    updateFormData={()=>{}}
                                                                    id="" name=""
                                                                    disabled
                                                                /></td>
                                                            </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">contacts</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Thông tin </h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <label>Nhà cung cấp</label>
                                                            <div>
                                                                {data.company.name || ""}

                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label>Sản phẩm</label>
                                                            <div>{data.good.name || ""}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label className="control-label">Ghi chú</label>
                                                            <div className="comment-input-wrapper">
                                                                {data.note}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">contacts</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Kết quả</h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Tên sản phẩm"
                                                                type="text"
                                                                name="name"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.good.name || ""}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Giá thành"
                                                                type="number" minValue="0"
                                                                name="totalprice"
                                                                updateFormData={() => {
                                                                }}
                                                                value={total_price || ""}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Giá sau VAT(10%)"
                                                                type="number" minValue="0"
                                                                name="vatprice"
                                                                updateFormData={() => {
                                                                }}
                                                                value={VAT_price || ""}
                                                                disabled={true}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    </div>

                                </form>

                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {this.props.isCommitting ?
                        <button className="btn btn-rose disabled" type="button" style={{width: "25%", float: "right"}}>
                            <i className="fa fa-spinner fa-spin"/> Đang duyệt
                        </button>
                        :
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <div className="col-md-3"><button style={{width: "100%"}}
                                                              className="btn btn-fill btn-rose" type="button"
                                                              onClick={()=>{return this.props.confirmOrder(data.id);}}
                            ><i className="material-icons">check</i> Duyệt
                            </button></div>
                            <div className="col-md-3"><button style={{width: "100%"}}
                                                              className="btn btn-fill" type="button"
                                                              onClick={this.props.onHide}
                            ><i className="material-icons">cancel</i> Đóng
                            </button></div>
                        </div>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

ConfirmOrderModal.propTypes = {
    isCommitting: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    data: PropTypes.object,
    confirmOrder: PropTypes.func,

};

export default (ConfirmOrderModal);


let defaultData = {
    company: {id: null, name: ""},
    staff: {id: null, name: ""},
    good: {id: null, name: ""},
    quantity: 0,
    command_code: "",
    core1: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    core2: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    cover1: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    cover2: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    spare_part1: {
        name: "",
        number: 0,
        material: "",
        size: 0,
        price: 0,
        made_by: "",
    },
    spare_part2: {
        name: "",
        number: 0,
        material: "",
        size: 0,
        price: 0,
        made_by: "",
    },
    packing1: {
        name: "",
        price: 0,
    },
    packing2: {
        name: "",
        price: 0,
    },
    other: {
        name: "",
        price: 0,
    },
    price: 0,
    note: "",
    order_date: null,
    receive_date: null,
};