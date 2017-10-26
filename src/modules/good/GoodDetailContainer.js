import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import * as goodActions from "../good/goodActions";
import UploadButton from "../../components/common/uploadButton/UploadButton";
import {showErrorNotification} from "../../helpers/helper";
import UploadFilesContainer from "./UploadFilesContainer";
import FilesList from "./FilesList";

class GoodDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            header: "Thêm sản phẩm",
            property: {}
        };
    }

    componentWillMount() {
        this.props.goodActions.loadGood(this.props.params.goodId);

    }

    render() {
        const good = this.props.good;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    {this.props.isLoading ? <Loading/> : (
                        <div className="row">
                            <div className="col-sm-8">

                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Thông tin chi tiết sản phẩm</h4>
                                        <form role="form">
                                            <FormInputText
                                                placeholder="Nhập tên sản phẩm"
                                                label="Tên sản phẩm"
                                                name="name"
                                                disabled={true}
                                                required={true}
                                                value={good.name}/>
                                            <FormInputText
                                                placeholder="Nhập mã sản phẩm"
                                                label="Mã sản phẩm"
                                                name="code"
                                                disabled={true}
                                                required={true}
                                                value={good.code}/>
                                            <FormInputText
                                                placeholder="Nhập mô tả sản phẩm"
                                                label="Mô tả sản phẩm"
                                                disabled={true}
                                                name="description"
                                                value={good.description}/>
                                            <FormInputText
                                                placeholder="Nhập giá sản phẩm"
                                                label="Giá sản phẩm"
                                                name="price"
                                                disabled={true}
                                                type="number"
                                                value={good.price}/>

                                        </form>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">toc</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Thuộc tính bổ sung</h4>
                                        {
                                            good.properties && good.properties.map((property, index) => {
                                                return (
                                                    <FormInputText
                                                        key={index}
                                                        label={property.name}
                                                        name="price"
                                                        disabled={true}
                                                        type="number"
                                                        value={property.value}/>
                                                );
                                            })
                                        }
                                    </div>

                                </div>

                            </div>
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">announcement</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Ảnh</h4>
                                        <label>Avatar</label>
                                        <div style={{
                                            width: "100%",
                                            marginBottom: 10,
                                            paddingBottom: "100%",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: `url("${good.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}")`,
                                        }}/>
                                        <label>Cover</label>
                                        <div>
                                            <img
                                                src={good.cover_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                style={{
                                                    width: "100%"
                                                }}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Tệp tin đính kèm</h4>
                                        <FilesList
                                            disableEdit={true}
                                            files={this.props.good.files}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

GoodDetailContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isUploadingAvatar: PropTypes.bool.isRequired,
    isUploadingCover: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    goodActions: PropTypes.object.isRequired,
    percent: PropTypes.number.isRequired,
    percentCover: PropTypes.number.isRequired,
    good: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.createGood.isLoading,
        isSaving: state.good.createGood.isSaving,
        percentCover: state.good.createGood.percentCover,
        isUploadingAvatar: state.good.createGood.isUploadingAvatar,
        isUploadingCover: state.good.createGood.isUploadingCover,
        good: state.good.createGood.good,
        percent: state.good.createGood.percent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodDetailContainer);