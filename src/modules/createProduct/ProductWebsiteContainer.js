import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import FormInputText from "../../components/common/FormInputText";
import ReactEditor from "../../components/common/ReactEditor";
import UploadButton from "../../components/common/uploadButton/UploadButton";
import PropTypes from 'prop-types';

class ProductWebsiteContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleImages = this.handleImages.bind(this);
    }

    handleUpload(event) {
        const file = event.target.files[0];
        this.props.createProductAction.changeAvatar(file);
    }

    handleImages(e){
        const files = e.target.files;
        this.props.createProductAction.changeImage(files);
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">mode_edit</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Thông tin chi tiết</h4>
                        <form role="form">
                            <div className="row">
                                <div className="col-md-8">

                                    <FormInputText
                                        label="Mô tả ngắn"
                                        required
                                        name="description"
                                        updateFormData={this.props.updateFormPostData}
                                        value="fuck"
                                    />
                                    <ReactEditor
                                        urlPost=""
                                        fileField="image"
                                        updateEditor={this.props.updateEditor}
                                        value="minh anh"
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
                                                            src={this.props.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
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
                                </div>
                            </div>
                            <div className="row">
                                <div className="dropzone dz-clickable"
                                     style={{
                                         minHeight: "170px",
                                         backgroundColor: "#dddddd",
                                         textAlign: "center",
                                         paddingTop: "5px"
                                     }}
                                     data-ng-show="dropSupported"
                                     data-multiple="true" accept="image/*">
                                    {
                                        this.props.images.length === 0 ? (
                                            <div>
                                                <h5 className="card-title">(Để tải và hiển thị nhanh, mỗi ảnh nên có
                                                    dung lượng
                                                    không quá 3MB)</h5>
                                                <UploadButton
                                                    style={{
                                                        width: "60%"
                                                    }}
                                                    className="btn btn-rose"
                                                    onChange={this.handleImages}>
                                                    chọn thêm ảnh để mô tả sản phẩm
                                                </UploadButton>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                {
                                                    this.props.images.map((image, index) => {
                                                        return (
                                                            <div key={index} className="col-md-3">
                                                                {
                                                                    this.props.isUploadingImage ? (
                                                                        <div className="progress">
                                                                            <div className="progress-bar"
                                                                                 role="progressbar" aria-valuenow="70"
                                                                                 aria-valuemin="0" aria-valuemax="100"
                                                                                 style={{width: `${this.props.percent}%`}}>
                                                                                <span
                                                                                    className="sr-only">{this.props.percent}% Complete</span>
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
                                                                                    src={image || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
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
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ProductWebsiteContainer.propTypes = {
    isUploadingAvatar: PropTypes.bool.isRequired,
    percent: PropTypes.number.isRequired,
    createProductAction: PropTypes.object.isRequired,
    avatar_url: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    isUploadingImage: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isUploadingAvatar: state.createProduct.isUploadingAvatar,
        percent: state.createProduct.percent,
        avatar_url: state.createProduct.avatar_url,
        images: state.createProduct.images,
        isUploadingImage: state.createProduct.isUploadingImage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWebsiteContainer);