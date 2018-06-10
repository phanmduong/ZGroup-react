import React, {Component} from "react";
import {observer} from "mobx-react";
import store from "./pageManageStore";
import {Modal} from "react-bootstrap";
// import {observable} from "mobx";
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
// import {OverlayTrigger,Tooltip} from "react-bootstrap";

// let self;

@observer
class AddPageModal extends Component {
    constructor(props) {
        super(props);
        this.closeAddPageModal = this.closeAddPageModal.bind(this);
        this.updateFormPage = this.updateFormPage.bind(this);
        // self = this;
    }
    closeAddPageModal(){
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng ? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                store.isOpenAddPageModal = false;
                store.page = {};
            },
        );

    }
    updateFormPage(event){
        const field = event.target.name;
        // console.log(store.page,"xxxxxxx",field,store.page[field]);
        let data = {...store.page};
        data[field] = event.target.value;
        store.page = data;
    }
    // createPage(){
    //     store.createPage();
    // }

    render() {

        return (
            <Modal
                show={store.isOpenAddPageModal}
                // bsSize="sm"
                bsStyle="primary"
                onHide={this.closeAddPageModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="card-title">
                            <strong>Thêm trang</strong>
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form id="form-page">
                            <FormInputText
                                label="Tên"
                                required
                                name="name"
                                updateFormData={this.updateFormPage}
                                value={store.page && store.page.name}
                            />
                            <FormInputText
                                label="Email"
                                required
                                name="name_en"
                                updateFormData={this.updateFormPage}
                                value={store.page && store.page.name_en}
                            />
                            <div className="modal-footer">
                                {store.isCreatingPage ?
                                    (
                                        <button type="button" className="btn btn-rose disabled">
                                            <i className="fa fa-spinner fa-spin "/>Đang thêm
                                        </button>
                                    )
                                    :
                                    (
                                        <button type="button" className="btn btn-rose"
                                                onClick={
                                                    () => {
                                                        store.createPage();
                                                    }}
                                        >Thêm</button>
                                    )
                                }
                                <button type="button"
                                        className="btn"
                                        onClick={
                                            () => {
                                                this.closeAddPageModal();
                                            }}
                                >Huỷ
                                </button>
                            </div>
                        </form>


                </Modal.Body>
            </Modal>
        );
    }
}

export default AddPageModal;
