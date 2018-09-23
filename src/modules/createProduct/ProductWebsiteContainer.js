import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import ReactEditor from "../../components/common/ReactEditor";
import PropTypes from 'prop-types';
import {linkUploadImageEditor} from "../../constants/constants";
import UploadManyImages from "../../components/common/UploadManyImages";
import ImageUploader from "../../components/common/ImageUploader";

class ProductWebsiteContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleUpload = this.handleUpload.bind(this);
        this.updateEditorContent = this.updateEditorContent.bind(this);
        this.handleImages = this.handleImages.bind(this);
    }

    handleUpload(image) {
        this.props.createProductAction.handleAvatarWebsiteTab(image);
    }

    updateEditorContent(value) {
        let productWorking = {...this.props.productWorking};
        productWorking.description = value;
        this.props.createProductAction.handleProductCreate(productWorking);
    }

    handleImages(images_url) {
        this.props.createProductAction.handleImagesWebsiteTab(images_url);
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
                            <ImageUploader handleFileUpload={this.handleUpload}
                                           tooltipText="Chọn ảnh đại diện"
                                           image_url={product.avatar_url}/>
                        </div>
                        <div className="card-content">
                            <div className="form-group">
                                <h4 className="card-title">Thêm ảnh mô tả</h4>
                                <UploadManyImages images_url={product.images_url}
                                                  handleFileUpload={this.handleImages}
                                                  box="box-images-website-create"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

ProductWebsiteContainer.propTypes = {
    createProductAction: PropTypes.object.isRequired,
    productWorking: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        productWorking: state.createProduct.productWorking
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductWebsiteContainer);