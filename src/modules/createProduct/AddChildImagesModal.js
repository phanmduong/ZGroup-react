import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as createProductAction from './createProductAction';
import UploadManyImages from "../../components/common/UploadManyImages";

class AddChildImagesModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleImages = this.handleImages.bind(this);
    }

    handleImages(images_url) {
        this.props.createProductAction.handleChildImagesModal(images_url, this.props.child_index);
    }

    render() {
        const child = this.props.children && this.props.children[this.props.child_index];
        const images_url = (child && child.child_images_url) ? JSON.parse(child.child_images_url) : [];
        return (
            <Modal show={this.props.childImagesModal}
                   onHide={() => this.props.createProductAction.shutDownAddChildImagesModal()}>
                <a onClick={() => this.props.createProductAction.shutDownAddChildImagesModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Thêm ảnh mô tả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <UploadManyImages images_url={images_url}
                                          handleFileUpload={this.handleImages}
                                          box="box"/>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddChildImagesModal.propTypes = {
    childImagesModal: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired,
    child_index: PropTypes.number.isRequired,
    createProductAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        childImagesModal: state.createProduct.childImagesModal,
        children: state.createProduct.productWorking.children,
        child_index: state.createProduct.child_index
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChildImagesModal);
