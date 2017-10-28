import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as modalProductAction from './modalProductAction';
import * as productListAction from '../productListAction';
import UploadButton from "../../../components/common/uploadButton/UploadButton";
import Select from 'react-select';

class AvatarModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          optionsSelect:[]
        };
        this.showAvatarModal = this.showAvatarModal.bind(this);
        this.removeImageChange = this.removeImageChange.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.handleProduct = this.handleProduct.bind(this);
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
                                <div>
                                    {
                                        this.props.productEditing.isUploadingAvatar ? (
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                     aria-valuemin="0" aria-valuemax="100"
                                                     style={{width: `${this.props.productEditing.percent}%`}}>
                                                    <span className="sr-only">{this.props.productEditing.percent}% Complete</span>
                                                </div>
                                            </div>
                                        ):(
                                            <div style={{
                                                width: "100%",
                                                paddingBottom: "100%",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundImage: `url("${this.props.productEditing.productPresent.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}")`,
                                            }}/>
                                        )
                                    }
                                    <div>
                                        {
                                            this.props.productEditing.productPresent.avatar_url === "" ? (
                                                <UploadButton
                                                    className="btn btn-rose btn-xs btn-round"
                                                    onChange={this.changeAvatar}>
                                                    Select image
                                                </UploadButton>
                                            ) : (
                                                <div className="row">
                                                    <UploadButton
                                                        className="btn btn-rose btn-xs btn-round"
                                                        onChange={this.changeAvatar}>
                                                        Change
                                                    </UploadButton>
                                                    <button
                                                        className="btn btn-xs btn-danger btn-round"
                                                        onClick={this.removeImageChange}><i className="fa fa-times"></i>
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
                                <span className="material-input"></span>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Giá bán</label>
                                <input type="text"
                                       name="price"
                                       className="form-control"
                                       value={this.props.productEditing.productPresent.price}
                                       onChange={this.handleProduct}/>
                                <span className="material-input"></span>
                            </div>
                            <Select
                                name="form-field-name"
                                value={this.props.productEditing.productPresent.manufacture}
                                options={this.state.optionsSelect}
                                onChange={this.changeSelect}
                                multi
                                placeholder="Nhà sản xuất"
                            />
                            <Select
                                name="form-field-name"
                                value={this.props.productEditing.productPresent.category}
                                options={this.state.optionsSelect}
                                onChange={this.changeSelect}
                                multi
                                placeholder="Chọn nhóm sản phẩm"
                            />
                            <br/><br/>

                            <button rel="tooltip" data-placement="top" title=""
                                    data-original-title="Remove item" type="button"
                                    className="btn btn-success btn-round" data-dismiss="modal"><i
                                className="material-icons">check</i> Xác nhận
                            </button>
                            <button rel="tooltip" data-placement="top" title=""
                                    data-original-title="Remove item" type="button"
                                    className="btn btn-danger btn-round" data-dismiss="modal"
                                    onClick={this.showAvatarModal}>
                                <i className="material-icons">close</i> Huỷ
                            </button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AvatarModalContainer.propTypes = {
    avatarModal: PropTypes.bool.isRequired,
    productEditing: PropTypes.object.isRequired,
    showAvatarModal: PropTypes.func.isRequired,
    modalProductAction: PropTypes.object.isRequired,
    productListAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        productEditing: state.productList.productEditing,
        avatarModal: state.productList.modalInProduct.avatarModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch),
        productListAction: bindActionCreators(productListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarModalContainer);