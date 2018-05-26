import React from 'react';
import { Modal } from 'react-bootstrap';
//import * as helper from "../../../helpers/helper";
import BigCloseButtonForModal from '../../../components/common/BigCloseButtonForModal';
import FormInputText from '../../../components/common/FormInputText';
import FormInputMoney from '../../../components/common/FormInputMoney';
import { store } from "./fundStore";
import { observer } from "mobx-react";

@observer
class InfoMoDal extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillReceiveProps() {

    }

    updateForm = (e)=>{
        let {name, value} = e.target;
        store.createData[name] = value;
    }

    render() {
        let { createData, showCreateModal, isCommitting } = store;
        return (
            <Modal
                bsSize="small"
                show={showCreateModal}
                onHide={() => { store.showCreateModal = false; }}>
                <Modal.Header>
                    <Modal.Title>{createData.id ? 'Sửa quỹ' : 'Tạo quỹ'}<BigCloseButtonForModal 
                    onClick={() => { store.showCreateModal = false; }}
                    /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        name="name" type="text"
                        label="Tên"
                        value={createData.name}
                        updateFormData={this.updateForm}
                        placeholder="Nhập số tên"
                        required
                    />
                    <FormInputMoney
                        name="money_value" 
                        label="Số dư"
                        value={createData.money_value}
                        updateFormData={this.updateForm}
                        placeholder="Nhập số tiền"
                        required
                    />

                </Modal.Body>
                <Modal.Footer>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button className="btn btn-fill btn-rose" type="button"
                                disabled={isCommitting}
                                onClick={store.createFund}
                            ><i className="material-icons">add</i> Lưu</button>
                            <button className="btn btn-fill" type="button"
                                disabled={isCommitting}
                                onClick={()=>{store.showCreateModal = false;}}
                            ><i className="material-icons">cancel</i> Hủy</button>
                        </div>

                    </Modal.Footer>
            </Modal>
        );
    }
}


export default (InfoMoDal);
