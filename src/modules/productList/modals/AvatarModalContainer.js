import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as modalProductAction from './modalProductAction';
import * as productListAction from '../productListAction';

class AvatarModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showAvatarModal = this.showAvatarModal.bind(this);
    }

    showAvatarModal(e) {
        e.preventDefault();
        this.props.showAvatarModal(this.props.productEditing);
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
                                <div className="fileinput text-center fileinput-exists"
                                     data-provides="fileinput">
                                    <div className="fileinput-new thumbnail">
                                        <img src="https://www.quirkybyte.com/wp-content/uploads/2016/10/4-76.jpg" alt="..."/>
                                    </div>
                                    <div className="fileinput-preview fileinput-exists thumbnail">
                                        <img
                                            src="data:image/png;base64,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"/>
                                    </div>
                                    <div>
                                                    <span className="btn btn-rose btn-xs btn-round btn-file">
                                                        <span className="fileinput-new">Select image</span>
                                                        <span className="fileinput-exists">Change</span>
                                                        <input type="hidden" value="" name=""/><input type="file"
                                                                                                      name="..."/>
                                                    <div className="ripple-container"></div></span>
                                        <a href="#pablo"
                                           className="btn btn-xs btn-danger btn-round fileinput-exists"
                                           data-dismiss="fileinput"><i className="fa fa-times"></i>
                                            Remove</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form method="#" action="#">
                            <div className="form-group label-floating is-empty">
                                <label className="control-label">Tên sản phẩm</label>
                                <input type="password" className="form-control"/>
                                <span className="material-input"></span>
                            </div>
                            <div className="form-group label-floating is-empty">
                                <label className="control-label">Giá bán</label>
                                <input type="password" className="form-control"/>
                                <span className="material-input"></span>
                            </div>
                            <div className="form-group label-floating is-empty">
                                <label className="control-label">Nhà sản xuất</label>
                                <input type="password" className="form-control"/>
                                <span className="material-input"></span>
                            </div>
                            <div className="btn-group bootstrap-select">
                                <button type="button"
                                        className="btn dropdown-toggle bs-placeholder select-with-transition"
                                        data-toggle="dropdown" role="button" title="State"
                                        aria-expanded="false">
                                                <span
                                                    className="filter-option pull-left">Chọn nhóm sản phẩm</span>&nbsp;
                                    <span className="bs-caret"><span className="caret"></span></span>
                                </button>
                                <div className="dropdown-menu open" role="combobox">
                                    <ul className="dropdown-menu inner" role="listbox"
                                        aria-expanded="false">
                                        <li data-original-index="1" className="disabled"><a tabindex="-1"
                                                                                            className=""
                                                                                            data-tokens="null"
                                                                                            role="option"
                                                                                            href="#"
                                                                                            aria-disabled="true"
                                                                                            aria-selected="false"><span
                                            className="text">Sách</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="2"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Tiểu thuyết</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="3"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Truyện tranh</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="4"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Truyện trinh thám</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="1" className="disabled"><a tabindex="-1"
                                                                                            className=""
                                                                                            data-tokens="null"
                                                                                            role="option"
                                                                                            href="#"
                                                                                            aria-disabled="true"
                                                                                            aria-selected="false"><span
                                            className="text">Sách</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="2"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Tiểu thuyết</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="3"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Truyện tranh</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="4"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Truyện trinh thám</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="1" className="disabled"><a tabindex="-1"
                                                                                            className=""
                                                                                            data-tokens="null"
                                                                                            role="option"
                                                                                            href="#"
                                                                                            aria-disabled="true"
                                                                                            aria-selected="false"><span
                                            className="text">Sách</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="2"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Tiểu thuyết</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="3"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Truyện tranh</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                        <li data-original-index="4"><a tabindex="0" className=""
                                                                       data-tokens="null" role="option"
                                                                       aria-disabled="false"
                                                                       aria-selected="false"><span
                                            className="text">Truyện trinh thám</span><span
                                            className="material-icons  check-mark"> done </span></a></li>
                                    </ul>
                                </div>

                            </div>
                            <br/><br/>

                            <button rel="tooltip" data-placement="top" title=""
                                    data-original-title="Remove item" type="button"
                                    className="btn btn-success btn-round" data-dismiss="modal"><i
                                className="material-icons">check</i> Xác nhận
                            </button>
                            <button rel="tooltip" data-placement="top" title=""
                                    data-original-title="Remove item" type="button"
                                    className="btn btn-danger btn-round" data-dismiss="modal"><i
                                className="material-icons">close</i> Huỷ
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
    showAvatarModal: PropTypes.func.isRequired
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