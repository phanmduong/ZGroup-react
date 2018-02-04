import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as createProductAction from './createProductAction';
import TooltipButton from "../../components/common/TooltipButton";

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
                    <div className="form-group">
                        <div className="box">
                            {
                                child && child.child_images_url && JSON.parse(child.child_images_url).map((image, index) => {
                                    return (
                                        <div key={index}
                                             style={{
                                                 padding: "3px"
                                             }}>
                                            <div className="container-for-images">
                                                <img style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    background: "url(" + image + ") center center / cover",
                                                    position: "absolute",
                                                    left: "0",
                                                    borderRadius: "5px"
                                                }}
                                                     data-original-title=""/>
                                                <div className="overlay-for-images"/>
                                                <TooltipButton text="Xóa" placement="top">
                                                    <div className="button-for-images">
                                                        <a rel="tooltip"
                                                           onClick={() => this.deleteImage(image)}
                                                           data-original-title="" title="">
                                                            <i className="material-icons">close</i>
                                                        </a>
                                                    </div>
                                                </TooltipButton>

                                            </div>
                                        </div>
                                    );
                                })
                            }
                            {
                                <div style={{
                                    padding: "3px"
                                }}>
                                    <div className="flex-row-center flex-justify-content-center"
                                         style={{
                                             width: '100%',
                                             height: '100px',
                                             backgroundColor: '#e8e8e8',
                                             position: "relative",
                                             borderRadius: '5px',
                                             cursor: "pointer",
                                             marginTop: '10px',
                                             marginBottom: '10px'
                                         }}>
                                        <TooltipButton text="Tải ảnh" placement="top">
                                            <label>
                                                <i className="material-icons"
                                                   style={{
                                                       fontSize: '40px',
                                                       color: '#919191',
                                                       cursor: "pointer"
                                                   }}>add_a_photo
                                                </i>
                                                <input multiple
                                                       onChange={this.handleImages}
                                                       style={{
                                                           cursor: this.props.isUploadingImage ? 'not-allowed' : 'pointer',
                                                           position: "absolute",
                                                           top: 0,
                                                           left: 0,
                                                           bottom: 0,
                                                           right: 0,
                                                           width: "100%",
                                                           height: "100%",
                                                       }}
                                                       type={this.props.isUploadingImage ? 'text' : 'file'}/>
                                            </label>
                                        </TooltipButton>
                                        {
                                            this.props.isUploadingImage &&
                                            <div className="progress"
                                                 style={{
                                                     position: "absolute",
                                                     left: 0,
                                                     bottom: 0,
                                                     width: '100%',
                                                     zIndex: '100',
                                                     marginBottom: '0'
                                                 }}>
                                                <div className="progress-bar" role="progressbar"
                                                     aria-valuenow="70"
                                                     aria-valuemin="0" aria-valuemax="100"
                                                     style={{width: `${this.props.percent}%`}}>
                                                    <span className="sr-only">{this.props.percent}% Complete</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
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
