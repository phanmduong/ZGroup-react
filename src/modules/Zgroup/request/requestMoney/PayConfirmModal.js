import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import FormInputText from "../../../../components/common/FormInputText";
import * as helper from '../../../../helpers/helper';
import BigCloseButtonForModal from "../../../../components/common/BigCloseButtonForModal";

class PayConfirmModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            money_received: 0,
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount(){
        //helper.setFormValidation('#form-conmfirm');
    }

    componentDidMount() {
        helper.setFormValidation('#form-conmfirm');
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.show && !nextProps.show) {
            this.setState({ money_received: 0 });
        }
    }

    updateFormData(e) {
        let value = e.target.value;
        this.setState({ money_received: value });
    }

    close() {
        if($("#form-confirm").valid())
        helper.confirm(
            "warning","Cảnh báo","Bạn có chắc chắn muốn duyệt?",
            () => {
                this.props.submit(this.state.money_received);
            },
        );
        
    }

    render() {
        //console.log("pay",this.props);
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header>
                    <Modal.Title>
                        Duyệt chi tiền
                        <BigCloseButtonForModal onClick={this.props.onHide}/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form" id="form-confirm" onSubmit={(e) => e.preventDefault()}>
                        <div className="row">
                            <div className="col-md-12">
                                <label>Số tiền yêu cầu</label>
                                <div>{this.props.data.money_payment || 0}</div>
                            </div>
                            <div className="col-md-12">
                                <FormInputText
                                    label="Số tiền ứng"
                                    required
                                    name="money_received"
                                    updateFormData={this.updateFormData}
                                    value={this.state.money_received}
                                    type="number"
                                    minValue="0"
                                />
                            </div>
                            
                        </div></form>
                </Modal.Body>
                <Modal.Footer>
                    <button style={{ width: 130 }} className="btn btn-rose" onClick={this.close}>Xác nhận</button>
                    <button style={{ width: 130 }} className="btn" onClick={this.props.onHide}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

PayConfirmModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    submit: PropTypes.func,
    data: PropTypes.object,

};


export default PayConfirmModal;