import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import UploadButton from "../../components/common/uploadButton/UploadButton";
import * as createProductAction from './createProductAction';

class AddChildImagesModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleImages = this.handleImages.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    handleImages(e) {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        const first_length = this.props.children[this.props.child_index].child_images_url ?
            JSON.parse(this.props.children[this.props.child_index].child_images_url).length : 0;
        files.map((file) => this.props.createProductAction.changeChildImageModal(file, files.length, first_length, this.props.child_index));
    }

    deleteImage(image) {
        let children = [...this.props.children];
        let child = {...children[this.props.child_index]};
        let child_images_url = JSON.parse(child.child_images_url).filter(img => img !== image);
        children[this.props.child_index] = {
            ...children[this.props.child_index],
            child_images_url: JSON.stringify(child_images_url)
        };
        this.props.createProductAction.handleChildrenCreateProduct(children);
    }

    render() {
        const child = this.props.children && this.props.children[this.props.child_index];
        return (
            <Modal show={this.props.childImagesModal}
                   onHide={() => this.props.createProductAction.shutDownAddChildImagesModal()}>
                <a onClick={() => this.props.createProductAction.shutDownAddChildImagesModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Thêm ảnh mô tả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-content">
                        {
                            (!child || !child.child_images_url || JSON.parse(child.child_images_url).length === 0) && !this.props.isUploadingImage ? (
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
                                        src={"http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
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
                            ) : (
                                <div className="row">
                                    {
                                        child && child.child_images_url && JSON.parse(child.child_images_url).map((image, index) => {
                                            return (
                                                <div key={index} className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                    <div className="container-for-images">
                                                        <img style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            background: "url(" + image + ") center center / cover",
                                                            position: "absolute",
                                                            left: "0"
                                                        }}
                                                             data-original-title=""
                                                             className="product-image"/>
                                                        <div className="overlay-for-images"/>
                                                        <div className="button-for-images">
                                                            <a rel="tooltip"
                                                               data-original-title="" title=""
                                                               onClick={() => this.deleteImage(image)}>
                                                                <i className="material-icons">close</i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                    {
                                        this.props.isUploadingImage ? (
                                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                                <div style={{
                                                    textAlign: "center",
                                                    marginTop: "30px"
                                                }}>
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar"
                                                             aria-valuenow="70"
                                                             aria-valuemin="0" aria-valuemax="100"
                                                             style={{width: `${this.props.percent}%`}}>
                                                                <span
                                                                    className="sr-only">{this.props.percent}% Complete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div/>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            this.props.isUploadingImage ? (
                                <Loading/>
                            ) : (
                                <UploadButton
                                    className="btn btn-rose btn-xs btn-round text-center"
                                    onChange={this.handleImages}>
                                    Thêm ảnh mô tả
                                </UploadButton>
                            )
                        }
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddChildImagesModal.propTypes = {
    isUploadingImage: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    childImagesModal: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired,
    child_index: PropTypes.number.isRequired,
    createProductAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        percent: state.createProduct.percent,
        isUploadingImage: state.createProduct.isUploadingImage,
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
