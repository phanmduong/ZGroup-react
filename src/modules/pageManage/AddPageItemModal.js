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
class AddPageItemModal extends Component {
    constructor(props) {
        super(props);
        this.closeAddPageItemModal = this.closeAddPageItemModal.bind(this);
        this.updateFormPageItem = this.updateFormPageItem.bind(this);
        this.savePageItem = this.savePageItem.bind(this);
        // self = this;
    }
    closeAddPageItemModal(){
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng ? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                store.isOpenAddPageItemModal = false;
                store.pageItem = {};
            },
        );
    }
    updateFormPageItem(event){
        const field = event.target.name;
        let data = {...store.pageItem};
        data[field] = event.target.value;
        store.pageItem = data;
    }

    savePageItem(){
        store.isEditPageItem ? store.editPageItem() : store.createPageItem();
    }
    render() {

        return (
            <Modal
                show={store.isOpenAddPageItemModal}
                bsStyle="primary"
                onHide={this.closeAddPageItemModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="card-title">
                            <strong>
                                {store.isEditPageItem ? "Sửa Item" : "Thêm item "}
                            </strong>
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form-page-item">
                        <FormInputText
                            label="Tên Item"
                            required
                            name="name"
                            updateFormData={this.updateFormPageItem}
                            value={store.pageItem && store.pageItem.name}
                        />
                        <FormInputText
                            label="Nội dung tiếng anh"
                            // required
                            name="value_en"
                            updateFormData={this.updateFormPageItem}
                            value={store.pageItem && store.pageItem.value_en}
                        />
                        <FormInputText
                            label="Nội dung tiếng việt"
                            // required
                            name="value_vi"
                            updateFormData={this.updateFormPageItem}
                            value={store.pageItem && store.pageItem.value_vi}
                        />
                        {/*<FormInputText*/}
                            {/*label="Từ khóa"*/}
                            {/*// required*/}
                            {/*name="keyword"*/}
                            {/*updateFormData={this.updateFormPageItem}*/}
                            {/*value={store.pageItem && store.pageItem.keyword}*/}
                        {/*/>*/}
                        <div className="modal-footer">
                            {store.isCreatingPageItem || store.isEdittingPageItem?
                                (
                                    <button type="button" className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin "/>{store.isEditPageItem? "Đang sửa" : "Đang thêm"}
                                    </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-rose"
                                            onClick={
                                                () => {
                                                    this.savePageItem();
                                                }}
                                    >{store.isEditPageItem? "Sửa" : "Thêm"}</button>
                                )
                            }
                            <button type="button"
                                    className="btn"
                                    onClick={
                                        () => {
                                            this.closeAddPageItemModal();
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

export default AddPageItemModal;
