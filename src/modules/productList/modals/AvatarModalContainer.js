import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as modalProductAction from './modalProductAction';
import * as productListAction from '../productListAction';
import UploadButton from "../../../components/common/uploadButton/UploadButton";
import Select from 'react-select';
import Loading from "../../../components/common/Loading";

class AvatarModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showAvatarModal = this.showAvatarModal.bind(this);
        this.removeImageChange = this.removeImageChange.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.handleProduct = this.handleProduct.bind(this);
        this.changeSelectManufacture = this.changeSelectManufacture.bind(this);
        this.changeSelectCategory = this.changeSelectCategory.bind(this);
        this.uploadEditProduct = this.uploadEditProduct.bind(this);
    }

    componentWillMount() {
        this.props.productListAction.getManufacturesProductsList();
        this.props.productListAction.getCategoriesProductsList();
    }

    changeSelectManufacture(value) {
        this.props.modalProductAction.handleManufacture(value.id);
    }

    changeSelectCategory(value) {
        this.props.modalProductAction.handleCategory(value.id);
    }

    showAvatarModal(e) {
        e.preventDefault();
        this.props.showAvatarModal(this.props.productEditing.productPresent);
    }

    removeImageChange(e) {
        e.preventDefault();
        let productPresent = {...this.props.productEditing.productPresent};
        productPresent.avatar_url = "";
        this.props.modalProductAction.handleProduct(productPresent);
    }

    changeAvatar(e) {
        const file = e.target.files[0];
        this.props.productListAction.changeAvatar(file);
    }

    handleProduct(e) {
        const field = e.target.name;
        let productEditing = this.props.productEditing;
        productEditing.productPresent[field] = e.target.value;
        this.props.modalProductAction.handleProduct(productEditing.productPresent);
    }


    uploadEditProduct(e) {
        e.preventDefault();
        this.props.productListAction.uploadEditProduct(
            this.props.productEditing.productPresent,
            this.props.productEditing.manufacture_id,
            this.props.productEditing.good_category_id
        );
    }

    render() {
        return (
            <Modal show={this.props.avatarModal}
                   onHide={this.showAvatarModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thông tin sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <legend>Ảnh đại</legend>
                                <div className="text-center">
                                    {
                                        this.props.productEditing.isUploadingAvatar ? (
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                     aria-valuemin="0" aria-valuemax="100"
                                                     style={{width: `${this.props.productEditing.percent}%`}}>
                                                    <span className="sr-only">{this.props.productEditing.percent}% Complete</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{
                                                maxWidth: "250px",
                                                lineHeight: "250px",
                                                marginBottom: "10px",
                                                textAlign: "center",
                                                verticalAlign: "middle",
                                                boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                border: "0 none",
                                                display: "inline-block"
                                            }}>
                                                <img
                                                    src={this.props.productEditing.productPresent.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                    style={{
                                                        lineHeight: "164px",
                                                        height: "auto",
                                                        maxWidth: "100%",
                                                        maxHeight: "100%",
                                                        display: "block",
                                                        marginRight: "auto",
                                                        marginLeft: "auto",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        borderRadius: "4px",
                                                    }}/>
                                            </div>
                                        )
                                    }
                                    <div>
                                        {
                                            this.props.productEditing.productPresent.avatar_url === "" ? (
                                                <UploadButton
                                                    className="btn btn-rose btn-xs btn-round text-center"
                                                    onChange={this.changeAvatar}>
                                                    Select image
                                                </UploadButton>
                                            ) : (
                                                <div className="row">
                                                    <label className="btn btn-rose btn-xs btn-round">
                                                        <input
                                                            multiple
                                                            className="upload-button-file"
                                                            ref={(ref) => {
                                                                this.input = ref;
                                                            }}
                                                            onChange={this.changeAvatar}
                                                            type="file"
                                                        />Change
                                                    </label>

                                                    <button
                                                        className="btn btn-xs btn-danger btn-round"
                                                        onClick={this.removeImageChange}><i
                                                        className="fa fa-times"/>
                                                        Remove
                                                    </button>

                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form method="#" action="#">
                            <div className="form-group">
                                <label className="control-label">Tên sản phẩm</label>
                                <input type="text"
                                       name="name"
                                       className="form-control"
                                       value={this.props.productEditing.productPresent.name}
                                       onChange={this.handleProduct}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Giá bán</label>
                                <input type="text"
                                       name="price"
                                       className="form-control"
                                       value={this.props.productEditing.productPresent.price}
                                       onChange={this.handleProduct}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Nhà sản xuất</label>
                                <Select
                                    name="manufactures"
                                    value={this.props.productEditing.manufacture_id}
                                    options={this.props.manufactures.map((manufacture) => {
                                        return {
                                            ...manufacture,
                                            value: manufacture.id,
                                            label: manufacture.name
                                        };
                                    })}
                                    onChange={this.changeSelectManufacture}
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Chọn nhóm sản phẩm</label>
                                <Select
                                    name="categories"
                                    value={this.props.productEditing.good_category_id}
                                    options={this.props.categories.map((category) => {
                                        return {
                                            ...category,
                                            value: category.id,
                                            label: category.label
                                        };
                                    })}
                                    onChange={this.changeSelectCategory}
                                />
                            </div>
                            <br/><br/>
                            {
                                this.props.isModalUpdating ? (
                                    <Loading/>
                                ) : (
                                    <div>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-success btn-round" data-dismiss="modal"
                                                onClick={this.uploadEditProduct}><i
                                            className="material-icons">check</i> Xác nhận
                                        </button>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-danger btn-round" data-dismiss="modal"
                                                onClick={this.showAvatarModal}>
                                            <i className="material-icons">close</i> Huỷ
                                        </button>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AvatarModalContainer.propTypes = {
    avatarModal: PropTypes.bool,
    productEditing: PropTypes.object.isRequired,
    showAvatarModal: PropTypes.func.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    productListAction: PropTypes.object.isRequired,
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    manufacturesUpdated: PropTypes.bool.isRequired,
    categoriesUpdated: PropTypes.bool.isRequired,
    handleManufacture: PropTypes.func.isRequired,
    handleCategory: PropTypes.func.isRequired,
    getManufacturesProductsList: PropTypes.func.isRequired,
    getCategoriesProductsList: PropTypes.func.isRequired,
    isModalUpdating: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        productEditing: state.productList.productEditing,
        avatarModal: state.productList.modalInProduct.avatarModal,
        categories: state.productList.categories,
        manufactures: state.productList.manufactures,
        categoriesUpdated: state.productList.categoriesUpdated,
        manufacturesUpdated: state.productList.manufacturesUpdated,
        isModalUpdating: state.productList.modalInProduct.isModalUpdating
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch),
        productListAction: bindActionCreators(productListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarModalContainer);