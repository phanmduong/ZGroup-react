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
        this.removeImageChange = this.removeImageChange.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.handleProduct = this.handleProduct.bind(this);
        this.changeSelectManufacture = this.changeSelectManufacture.bind(this);
        this.changeSelectCategory = this.changeSelectCategory.bind(this);
        this.uploadEditProduct = this.uploadEditProduct.bind(this);
        this.selectStatusProduct = this.selectStatusProduct.bind(this);
    }

    componentWillMount() {
        this.props.productListAction.getManufacturesProductsList();
        this.props.productListAction.getCategoriesProductsList();
    }

    changeSelectManufacture(value) {
        if (value) {
            this.props.modalProductAction.handleManufacture(value.id);
        } else {
            this.props.modalProductAction.handleManufacture('');
        }
    }

    changeSelectCategory(value) {
        if (value) {
            this.props.modalProductAction.handleCategory(value.id);
        } else {
            this.props.modalProductAction.handleCategory('');
        }
    }

    removeImageChange(e) {
        e.preventDefault();
        let productAvatar = {...this.props.productAvatar};
        productAvatar.avatar_url = "";
        this.props.modalProductAction.handleAvatarProduct(productAvatar);
    }

    changeAvatar(e) {
        const file = e.target.files[0];
        this.props.productListAction.changeAvatar(file);
    }

    uploadEditProduct(e) {
        e.preventDefault();
        this.props.productListAction.uploadEditProduct(
            this.props.productAvatar,
            this.props.manufacture_id,
            this.props.good_category_id
        );
    }

    handleProduct(e) {
        const field = e.target.name;
        let product = {...this.props.productAvatar};
        product[field] = e.target.value;
        this.props.modalProductAction.handleAvatarProduct(product);
    }

    selectStatusProduct(e) {
        const field = e.target.name;
        let product = {...this.props.productAvatar};
        e.target.checked ? (
            product[field] = 1
        ) : (
            product[field] = 0
        );
        this.props.modalProductAction.handleAvatarProduct(product);
    }

    render() {
        let product = this.props.productAvatar;
        return (
            <Modal show={this.props.avatarModal}
                   onHide={() => this.props.showAvatarModal(product)}>
                <a onClick={() => this.props.showAvatarModal(product)}
                   id="btn-close-modal"/>
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
                                        this.props.isUploadingAvatar ? (
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                     aria-valuemin="0" aria-valuemax="100"
                                                     style={{width: `${this.props.percent}%`}}>
                                                    <span className="sr-only">{this.props.percent}% Complete</span>
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
                                                    src={product.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
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
                                            product.avatar_url === "" ? (
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
                                       value={product.name}
                                       onChange={this.handleProduct}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Giá bán</label>
                                <input type="number"
                                       name="price"
                                       className="form-control"
                                       value={product.price}
                                       onChange={this.handleProduct}/>
                                <span className="material-input"/>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab">
                                            <a>
                                                <h4 className="panel-title">
                                                    <div className="checkbox none-margin">
                                                        <label>
                                                            <input type="checkbox"
                                                                   name="sale_status"
                                                                   checked={product.sale_status}
                                                                   onChange={this.selectStatusProduct}/>
                                                            <span className="checkbox-material">
                                                                <span className="check"/>
                                                                </span> Đang kinh doanh
                                                        </label>
                                                    </div>
                                                </h4>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab"><a>
                                            <h4 className="panel-title">
                                                <div className="checkbox none-margin">
                                                    <label>
                                                        <input type="checkbox"
                                                               name="display_status"
                                                               checked={product.display_status}
                                                               onChange={this.selectStatusProduct}/>
                                                        <span className="checkbox-material">
                                                                <span className="check"/>
                                                                </span> Hiển thị ra website
                                                    </label>
                                                </div>
                                            </h4>
                                        </a>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab"><a>
                                            <h4 className="panel-title">
                                                <div className="checkbox none-margin">
                                                    <label>
                                                        <input type="checkbox"
                                                               name="highlight_status"
                                                               checked={product.highlight_status}
                                                               onChange={this.selectStatusProduct}/>
                                                        <span className="checkbox-material">
                                                                <span className="check"/>
                                                                </span>Nổi bật
                                                    </label>
                                                </div>
                                            </h4>
                                        </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Nhà sản xuất</label>
                                <Select
                                    name="manufactures"
                                    value={this.props.manufacture_id}
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
                                    value={this.props.good_category_id}
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
                                                onClick={() => this.props.showAvatarModal(product)}>
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
    productAvatar: PropTypes.object.isRequired,
    showAvatarModal: PropTypes.func.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    productListAction: PropTypes.object.isRequired,
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    isModalUpdating: PropTypes.bool,
    isUploadingAvatar: PropTypes.bool,
    percent: PropTypes.number.isRequired,
    manufacture_id: PropTypes.number.isRequired,
    good_category_id: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        productAvatar: state.productList.productEditing.productAvatar,
        isUploadingAvatar: state.productList.productEditing.isUploadingAvatar,
        avatarModal: state.productList.modalInProduct.avatarModal,
        categories: state.productList.categories,
        manufactures: state.productList.manufactures,
        isModalUpdating: state.productList.modalInProduct.isModalUpdating,
        percent: state.productList.productEditing.percent,
        manufacture_id: state.productList.productEditing.manufacture_id,
        good_category_id: state.productList.productEditing.good_category_id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch),
        productListAction: bindActionCreators(productListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarModalContainer);