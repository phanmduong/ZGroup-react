import React, {Component} from "react";
import {observer} from "mobx-react";
import store from "./pageManageStore";
import {Modal} from "react-bootstrap";
// import {observable} from "mobx";
import FormInputText from "../../components/common/FormInputText";
import * as helper from "../../helpers/helper";
import {NO_IMAGE} from "../../constants/env";
import Loading from "../../components/common/Loading";
import TooltipButton from "../../components/common/TooltipButton";


@observer
class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.closeAddProductModal = this.closeAddProductModal.bind(this);
        this.updateFormProduct = this.updateFormProduct.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
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
    updateFormProduct(event){
        const field = event.target.name;
        let data = {...store.product};
        data[field] = event.target.value;
        store.product = data;
    }
    handleFileUpload(event) {
        let file = event.target.files[0];
        console.log(file,"xxxxxxxxxx");
        store.uploadImage(file);
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
                            <strong>Thêm bài viết</strong>
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form-product">

                        <label className="label-control">
                            Ảnh đại diện
                        </label>
                        {store.product && store.product.isUpdatingImage ? (
                            <Loading/>
                        ) : (
                            <TooltipButton
                                text="Chọn ảnh đại diện"
                                placement="top">
                                <a
                                    type="button"
                                    style={{
                                        width: "100%",
                                        marginBottom: "10px",
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                        border: "0 none",
                                        display: "inline-block",
                                        position : "relative",
                                    }}>
                                    <img src={
                                            helper.isEmptyInput(
                                                store.product.imageUrl,
                                            )
                                                ? NO_IMAGE
                                                : store.product.imageUrl
                                        }
                                        style={{
                                            lineHeight: "164px",
                                            height: "auto",
                                            width: "100%",
                                            display: "block",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            boxShadow:
                                                " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                            borderRadius: "10px",
                                        }}/>
                                        <input
                                            type="file"
                                            accept=".jpg,.png,.gif"
                                            onChange={this.handleFileUpload}
                                            style={{
                                                cursor: "pointer",
                                                opacity: "0.0",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                width: "100%",
                                                height: "33%",
                                            }}/>
                                    {/*</img>*/}
                                </a>
                            </TooltipButton>
                        )}

                        <FormInputText
                            label="Tiêu đề"
                            required
                            name="title"
                            updateFormData={this.updateFormProduct}
                            value={store.product && store.product.title}
                        />
                        <div className="form-group">
                            <label className="control-label">
                                Mô tả ngắn
                            </label>
                            <textarea
                                className="form-control"
                                name="description"
                                rows="3"
                                value={store.product && store.product.description}
                                onChange={this.updateFormProduct}/>
                        </div>

                        {/*<div className="modal-footer">*/}
                            {/*{store.isCreatingProduct ?*/}
                                {/*(*/}
                                    {/*<button type="button" className="btn btn-rose disabled">*/}
                                        {/*<i className="fa fa-spinner fa-spin "/>Đang thêm*/}
                                    {/*</button>*/}
                                {/*)*/}
                                {/*:*/}
                                {/*(*/}
                                    {/*<button type="button" className="btn btn-rose"*/}
                                            {/*onClick={*/}
                                                {/*() => {*/}
                                                    {/*store.createProduct();*/}
                                                {/*}}*/}
                                    {/*>Thêm</button>*/}
                                {/*)*/}
                            {/*}*/}
                            {/*<button type="button"*/}
                                    {/*className="btn"*/}
                                    {/*onClick={*/}
                                        {/*() => {*/}
                                            {/*this.closeAddProductModal();*/}
                                        {/*}}*/}
                            {/*>Huỷ*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    </form>


                </Modal.Body>
            </Modal>
        );
    }
}

export default AddProductModal;
