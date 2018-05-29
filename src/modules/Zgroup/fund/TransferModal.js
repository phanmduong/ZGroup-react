import React from 'react';
import { Modal } from 'react-bootstrap';
//import * as helper from "../../../helpers/helper";
import BigCloseButtonForModal from '../../../components/common/BigCloseButtonForModal';
import FormInputText from '../../../components/common/FormInputText';
import FormInputMoney from '../../../components/common/FormInputMoney';
import { store } from "./fundStore";
import { observer } from "mobx-react";
import Select from 'react-select';

@observer
class TransferModal extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillReceiveProps() {

    }

    updateForm = (e) => {
        let { name, value } = e.target;
        store.transferData[name] = value;
    }

    render() {
        let { transferData, showTransferModal, isCommitting, allFunds } = store;
        return (
            <Modal
                bsSize="small"
                show={showTransferModal}
                onHide={() => { store.showTransferModal = false; }}>
                <Modal.Header>
                    <Modal.Title>Chuyển<BigCloseButtonForModal
                        onClick={() => { store.showTransferModal = false; }}
                    /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Select
                        options={allFunds || []}
                        onChange={(e) => {
                            return this.updateForm({target:{name: 'receiver_id', value: e ? e.id : ""}});
                        }}
                        value={transferData.receiver_id}
                        defaultMessage="Chọn"
                    />
                    <FormInputText
                        name="content" type="text"
                        label="Nội dung"
                        value={transferData.content}
                        updateFormData={this.updateForm}
                        placeholder="Nhập nội dung"
                    />
                    <FormInputMoney
                        name="money_value"
                        label="Số dư"
                        value={transferData.money_value}
                        updateFormData={this.updateForm}
                        placeholder="Nhập số tiền"
                        required
                    />

                </Modal.Body>
                <Modal.Footer>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button className="btn btn-fill btn-rose" type="button"
                            disabled={isCommitting}
                            onClick={()=>{
                                store.transfer();
                            }}
                        ><i className="material-icons">add</i> Lưu</button>
                        <button className="btn btn-fill" type="button"
                            disabled={isCommitting}
                            onClick={() => { store.showTransferModal = false; }}
                        ><i className="material-icons">cancel</i> Hủy</button>
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }
}


export default (TransferModal);
