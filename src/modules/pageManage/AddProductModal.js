import React, {Component} from "react";
import {observer} from "mobx-react";
import store from "./pageManageStore";
import {Modal} from "react-bootstrap";
// import {observable} from "mobx";
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import {NO_IMAGE} from "../../constants/env";
// import Loading from "../../components/common/Loading";
// import TooltipButton from "../../components/common/TooltipButton";
import ImageUploader from "../../components/common/ImageUploader";
// import ReactSelect from "react-select";


@observer
class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.closeAddProductModal = this.closeAddProductModal.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }
    closeAddProductModal(){
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng ? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                store.isOpenAddProductModal = false;
                store.product = {};
            },
        );

    }
    updateFormProduct = (field, value) => {
        const product = { ...store.product };
        product[field] = value;
        store.product = product;
    };
    saveProduct() {
        // console.log(store.language_id,store.product.language_id, "bbbbbbbb");
        // console.log(store.isEdittingProduct,"sssssss",store.product.language.value);
      store.isEditProduct ? store.editProduct() : store.createProduct();
    }
    render() {

        return (
            <Modal
                show={store.isOpenAddProductModal}
                bsStyle="primary"
                onHide={this.closeAddProductModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="card-title">
                            <strong>{store.isEditProduct ? "Sửa" : "Thêm"}</strong>
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form-product">

                        <div className="card blog-editor-avatar">
                            <div className="card-content">
                                <label>Banner</label>
                                <ImageUploader
                                    handleFileUpload={url =>
                                        this.updateFormProduct("url", url)
                                    }
                                    tooltipText="Banner"
                                    image_url={
                                        store.product.url
                                            ? helper.validateLinkImage(store.product.url)
                                            : NO_IMAGE
                                    }
                                />
                            </div>
                        </div>

                        <FormInputText
                            label="Tiêu đề"
                            required
                            name="title"
                            updateFormData={(e) => this.updateFormProduct('title',e.target.value)}
                            value={store.product && store.product.title}
                        />
                        {/*<ReactSelect*/}
                            {/*value={store.product.language}*/}
                            {/*options={[{value : 0, label : "vi"},{value : 1, label : "en"}]}*/}
                            {/*onChange={(value) => this.updateFormProduct('language',value)}*/}
                            {/*placeholder="Chọn ngôn ngữ"*/}
                        {/*/>*/}
                        <div className="form-group">
                            <label className="control-label">
                                Mô tả ngắn
                            </label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                value={store.product && store.product.description}
                                onChange={(e) => this.updateFormProduct('description',e.target.value)}/>
                        </div>


                        <div className="modal-footer">
                            {store.isCreatingProduct || store.isEdittingProduct ?
                                (
                                    <button type="button" className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin "/>{store.isEditProduct ? "Đang sửa" : "Đang thêm"}
                                    </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-rose"
                                            onClick={
                                                () => {
                                                    this.saveProduct();
                                                }}
                                    >{store.isEditProduct ? "Sửa" : "Thêm"}</button>
                                )
                            }
                            <button type="button"
                                    className="btn"
                                    onClick={
                                        () => {
                                            this.closeAddProductModal();
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
export default AddProductModal;
