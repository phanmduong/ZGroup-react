import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import ReactEditor from "../../components/common/ReactEditor";
import UploadButton from "../../components/common/uploadButton/UploadButton";
import PropTypes from 'prop-types';
import {linkUploadImageEditor} from "../../constants/constants";
import Loading from "../../components/common/Loading";

class ProductWebsiteContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleImages = this.handleImages.bind(this);
        this.updateEditorContent = this.updateEditorContent.bind(this);
    }

    handleUpload(event) {
        const file = event.target.files[0];
        this.props.createProductAction.changeAvatar(file);
    }

    handleImages(e) {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        const first_length = this.props.productWorking.images_url ? this.props.productWorking.images_url.length : 0;
        files.map((file) => this.props.createProductAction.changeImage(file, files.length, first_length));
    }

    updateEditorContent(value) {
        let productWorking = {...this.props.productWorking};
        productWorking.description = value;
        this.props.createProductAction.handleProductCreate(productWorking);
    }

    render() {
        const product = this.props.productWorking;
        return (
            <form role="form">
                <div className="row">
                    <div className="col-md-8">
                        <h4 className="card-title"> Mô tả sản phẩm</h4>
                        <ReactEditor
                            urlPost={linkUploadImageEditor()}
                            fileField="image"
                            updateEditor={this.updateEditorContent}
                            value={product.description || ''}
                        />
                    </div>
                    <div className="col-md-4">
                        <div className="card-content">
                            <h4 className="card-title">Ảnh đại diện</h4>
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
                                    <div>
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

                                        <UploadButton
                                            style={{
                                                width: "100%"
                                            }}
                                            className="btn btn-rose"
                                            onChange={this.handleUpload}>
                                            chọn ảnh đại diện
                                        </UploadButton>
                                    </div>
                                )
                            }
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Thêm ảnh mô tả</h4>
                            {
                                (!product.images_url || product.images_url.length === 0) && !this.props.isUploadingImage ? (
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
                                            product.images_url && product.images_url.map((image, index) => {
                                                return (
                                                    <div key={index} className="col-md-4">
                                                        <div className="container-for-images">
                                                            <img style={{
                                                                width: "65px",
                                                                height: "65px",
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
                                                                   onClick={() => this.props.createProductAction.deleteImage(image)}>
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
                                                <div className="col-md-4">
                                                    <div className="container-for-images"
                                                         style={{textAlign: "center"}}>
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
                                        style={{
                                            width: "100%"
                                        }}
                                        className="btn btn-rose"
                                        onChange={this.handleImages}>
                                        Thêm ảnh mô tả
                                    </UploadButton>
                                )
                            }
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

ProductWebsiteContainer.propTypes = {
    isUploadingAvatar: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    createProductAction: PropTypes.object.isRequired,
    isUploadingImage: PropTypes.bool.isRequired,
    productWorking: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isUploadingAvatar: state.createProduct.isUploadingAvatar,
        percent: state.createProduct.percent,
        isUploadingImage: state.createProduct.isUploadingImage,
        productWorking: state.createProduct.productWorking
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWebsiteContainer);