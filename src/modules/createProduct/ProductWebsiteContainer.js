import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import ReactEditor from "../../components/common/ReactEditor";
import PropTypes from 'prop-types';
import {linkUploadImageEditor} from "../../constants/constants";
import TooltipButton from "../../components/common/TooltipButton";

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
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                        <h4 className="card-title"> Mô tả sản phẩm</h4>
                        <ReactEditor
                            urlPost={linkUploadImageEditor()}
                            fileField="image"
                            updateEditor={this.updateEditorContent}
                            value={product.description || ''}
                        />
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
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
                                    <TooltipButton text="Chọn ảnh đại diện" placement="top">
                                        <a type="button" style={{
                                            width: "100%",
                                            lineHeight: "250px",
                                            marginBottom: "10px",
                                            textAlign: "center",
                                            verticalAlign: "middle",
                                            border: "0 none",
                                            display: "inline-block"
                                        }}>
                                            <img
                                                src={product.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                style={{
                                                    lineHeight: "164px",
                                                    height: "auto",
                                                    width: "100%",
                                                    display: "block",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                    borderRadius: "10px",
                                                }}/>
                                            <input type="file"
                                                   accept=".jpg,.png,.gif"
                                                   onChange={this.handleUpload}
                                                   style={{
                                                       cursor: 'pointer',
                                                       opacity: "0.0",
                                                       position: "absolute",
                                                       top: 0,
                                                       left: 0,
                                                       bottom: 0,
                                                       right: 0,
                                                       width: "100%",
                                                       height: "100%"
                                                   }}
                                            />
                                        </a>
                                    </TooltipButton>
                                )
                            }
                        </div>
                        <div className="card-content">
                            <div className="form-group">
                                <h4 className="card-title">Thêm ảnh mô tả</h4>
                                <div className="box-images-website-create">
                                    {
                                        product.images_url && product.images_url.map((image, index) => {
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
                                                                   onClick={() => this.props.createProductAction.deleteImage(image)}
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
                                                            <span
                                                                className="sr-only">{this.props.percent}% Complete</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
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