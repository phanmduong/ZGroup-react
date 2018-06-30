import React, {Component} from "react";
import {observer} from "mobx-react";
import store from "./pageManageStore";
import {Modal} from "react-bootstrap";
// import {observable} from "mobx";
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import ImageUploader from "../../components/common/ImageUploader";
import {NO_IMAGE} from "../../constants/env";
// import {OverlayTrigger,Tooltip} from "react-bootstrap";

// let self;

@observer
class AddPageItemModal extends Component {
    constructor(props) {
        super(props);
        this.closeAddPageItemModal = this.closeAddPageItemModal.bind(this);
        this.savePageItem = this.savePageItem.bind(this);
    }

    closeAddPageItemModal() {
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng ? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                store.isOpenAddPageItemModal = false;
                store.pageItem = {};
            },
        );
    }


    updateFormPageItem = (field, value) => {
        let data = {...store.pageItem};
        data[field] = value;
        store.pageItem = data;
    };

    updateFormImagePageItem = (value) => {
        let data = {...store.pageItem};
        data["value_en"] = value;
        data["value_vi"] = value;
        store.pageItem = data;
    };

    savePageItem() {
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
                            updateFormData={(e) => this.updateFormPageItem('name', e.target.value)}
                            value={store.pageItem && store.pageItem.name}
                        />

                        {store.pageItem.type === "img" ?
                            <div>
                                <label>Banner</label>
                                <ImageUploader
                                    handleFileUpload={value =>
                                        this.updateFormImagePageItem(value)
                                    }
                                    tooltipText="Tải từ máy tính"
                                    image_url={
                                        store.pageItem.value_en
                                            ? helper.validateLinkImage(store.pageItem.value_en)
                                            : NO_IMAGE
                                    }
                                />
                                <FormInputText
                                    label="Link"
                                    name="value_en"
                                    updateFormData={(e) => this.updateFormImagePageItem( e.target.value)}
                                    value={store.pageItem && store.pageItem.value_en}
                                />
                            </div>
                            :
                            (
                                <div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Nội dung tiếng anh
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="value_en"
                                            rows="10"
                                            value={store.pageItem && store.pageItem.value_en}
                                            onChange={(e) => this.updateFormPageItem('value_en', e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">
                                            Nội dung tiếng việt
                                        </label>
                                        <textarea
                                            className="form-control"
                                            name="value_en"
                                            rows="10"
                                            value={store.pageItem && store.pageItem.value_vi}
                                            onChange={(e) => this.updateFormPageItem('value_en', e.target.value)}/>
                                    </div>
                                </div>
                            )
                        }

                        <div className="modal-footer">
                            {store.isCreatingPageItem || store.isEdittingPageItem ?
                                (
                                    <button type="button" className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin "/>{store.isEditPageItem ? "Đang sửa" : "Đang thêm"}
                                    </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-rose"
                                            onClick={
                                                () => {
                                                    this.savePageItem();
                                                }}
                                    >{store.isEditPageItem ? "Sửa" : "Thêm"}</button>
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
