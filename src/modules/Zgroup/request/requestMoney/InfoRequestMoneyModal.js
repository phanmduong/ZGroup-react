import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import FormInputText from "../../../../components/common/FormInputText";
import Avatar from "../../../../components/common/Avatar";
import BigCloseButtonForModal from "../../../../components/common/BigCloseButtonForModal";

class PayConfirmModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps() {
    }

    render() {
        let data = {...this.props.data};
        if(!data.company_pay) data.company_pay={};
        if(!data.company_receive) data.company_receive={};
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
                <Modal.Header>
                    <Modal.Title>
                        Tạm ứng
                        <BigCloseButtonForModal onClick={this.props.onHide} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="content">
                        <div className="container-fluid">
                            <form role="form" id="form-request-money" onSubmit={(e) => e.preventDefault()}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">attach_money</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Thông tin</h4>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="col-md-12">
                                                            <h5>Số tiền yêu cầu</h5>
                                                            <FormInputText
                                                                name="money_payment"
                                                                label=""
                                                                type="number"
                                                                updateFormData={() => { }}
                                                                value={data.money_payment}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <h5>Số tiền thực nhận</h5>
                                                            <FormInputText
                                                                name="money_payment"
                                                                label=""
                                                                type="number"
                                                                updateFormData={() => { }}
                                                                value={data.money_received}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <h5>Số tiền đã dùng</h5>
                                                            <FormInputText
                                                                name="money_payment"
                                                                label=""
                                                                type="number"
                                                                updateFormData={() => { }}
                                                                value={data.money_used}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <h5>Số tiền hoàn trả</h5>
                                                            <FormInputText
                                                                name="money_payment"
                                                                label=""
                                                                type="number"
                                                                updateFormData={() => { }}
                                                                value={data.status == 2 ? data.money_received - data.money_used : ""}
                                                                disabled
                                                            />
                                                        </div>




                                                    </div>
                                                    <div className="col-md-6">
                                                        

                                                        <div className="col-md-12">
                                                            <h5>Nguồn ứng</h5>
                                                            <FormInputText
                                                                name="money_payment"
                                                                label=""
                                                                type="number"
                                                                updateFormData={() => { }}
                                                                value={data.company_pay.name || "Không có"}
                                                                disabled
                                                            />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <h5>Nguồn hoàn ứng</h5>
                                                            <FormInputText
                                                                name="money_payment"
                                                                label=""
                                                                type="number"
                                                                updateFormData={() => { }}
                                                                value={data.company_receive.name || "Không có"}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <h5>Hình thức</h5>
                                                            <FormInputText
                                                                name="money_payment"
                                                                label=""
                                                                type="number"
                                                                updateFormData={() => { }}
                                                                value={data.type == "atm" ? "Chuyển khoản" : "Tiền mặt"}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">info</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Người ứng</h4>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Avatar
                                                            url={data.staff.avatar_url || ""}
                                                            size={100}
                                                            style={{ width: "100%", height: 170, maxHeight: 170, maxWidth: 170 }}
                                                        /><br />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label>Tên nhân viên</label>
                                                        <div>{data.staff.name}</div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <label>SĐT</label>
                                                        <div>{data.staff.phone}</div>
                                                    </div>
                                                    <div className="col-md-12">
                                                    <div className="control-label">Ghi chú</div>
                                                        <div className="comment-input-wrapper">
                                                            <textarea
                                                                id="textarea-card-comment"
                                                                name="reason"
                                                                onChange={() => { }}
                                                                value={data.reason}
                                                                onKeyUp={() => { }}
                                                                placeholder="Nhập tại đây"
                                                                className="comment-input"
                                                                style={{ width: "100%", margin: "10px", height: "165px", }}
                                                            />
                                                        </div>
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
                <Modal.Footer>
                    <button style={{ width: 130 }} className="btn" onClick={this.props.onHide}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

PayConfirmModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    data: PropTypes.object,

};


export default PayConfirmModal;