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
import {Button} from "react-bootstrap";
import AddGoodPropertyModal from "./AddGoodPropertyModal";
import {TYPE_API} from "../../constants/env";

class CreateGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            header: "Thêm sản phẩm",
            property: {},
            showAddGoodPropertyModal: false
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.addProperties = this.addProperties.bind(this);
        this.handleUploadCover = this.handleUploadCover.bind(this);
        this.removeProperty = this.removeProperty.bind(this);
        this.addPropertyToGood = this.addPropertyToGood.bind(this);
        this.saveGood = this.saveGood.bind(this);
        this.editProperty = this.editProperty.bind(this);
        this.showAddGoodPropertyModal = this.showAddGoodPropertyModal.bind(this);
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.setState({
                header: "Sửa sản phẩm"
            });
            this.props.goodActions.loadGood(this.props.params.goodId);
        }
        this.setState({type: this.props.params.type});
    }

    updateFormData(event) {
        const field = event.target.name;
        let good = {...this.props.good};
        good[field] = event.target.value;
        this.props.goodActions.updateGoodFormData(good);
    }

    addProperties() {
        if (!this.state.property.name || !this.state.property.value) {
            showErrorNotification("Bạn cần nhập đủ cả Tên và Giá Trị thuộc tính");
        } else {
            this.addPropertyToGood();
            this.setState({
                showAddGoodPropertyModal: false
            });
        }
    }

    addPropertyToGood() {
        if (!isNaN(this.state.property.index)) {
            let properties = this.props.good.properties;
            const index = this.state.property.index;
            properties = [...properties.slice(0, index), {...this.state.property}, ...properties.slice(index + 1)];
            this.props.goodActions.updateGoodFormData({
                ...this.props.good,
                properties
            });
        } else {
            const good = {
                ...this.props.good,
                properties: [...this.props.good.properties, this.state.property]
            };
            this.props.goodActions.updateGoodFormData(good);
        }

        this.setState({
            property: {}
        });

    }

    handleUpload(event) {
        const file = event.target.files[0];
        this.props.goodActions.uploadAvatar(file);
    }

    handleUploadCover(event) {
        const file = event.target.files[0];
        this.props.goodActions.uploadCover(file);
    }

    updateProperty(event) {
        const field = event.target.name;
        let property = {...this.state.property};
        property[field] = event.target.value;
        this.setState({
            property
        });
    }

    saveGood() {
        const good = {
            ...this.props.good,
            properties: JSON.stringify(this.props.good.properties),
            files_str: JSON.stringify(this.props.good.files),
            type: this.state.type || this.props.good.type
        };

        if (!good.name || !good.code) {
            showErrorNotification("Bạn cần nhập Tên và Mã sản phẩm");
        } else {
            this.props.goodActions.saveGood(good);
        }
    }

    removeProperty(index) {
        let properties = this.props.good.properties;
        properties = [...properties.slice(0, index), ...properties.slice(index + 1)];
        this.props.goodActions.updateGoodFormData({
            ...this.props.good,
            properties
        });
    }

    showAddGoodPropertyModal(showAddGoodPropertyModal) {
        this.setState({
            showAddGoodPropertyModal
        });
    }

    editProperty(property, index) {
        this.setState({
            showAddGoodPropertyModal: true,
            property: {
                ...property,
                index
            }
        });
    }


    render() {
        const good = this.props.good;
        return (
            <div id="page-wrapper">
                <AddGoodPropertyModal
                    addProperties={this.addProperties}
                    onChange={this.updateProperty}
                    property={this.state.property}
                    close={() => this.showAddGoodPropertyModal(false)}
                    showModal={this.state.showAddGoodPropertyModal}/>
                <div className="container-fluid">
                    {this.props.isLoading ? <Loading/> : (
                        <div className="row">
                            <div className="col-sm-8">

                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">{this.state.header}</h4>
                                        <form role="form">
                                            <FormInputText
                                                placeholder="Nhập tên sản phẩm"
                                                label="Tên sản phẩm"
                                                name="name"
                                                required={true}
                                                updateFormData={this.updateFormData}
                                                value={good.name}/>
                                            <FormInputText
                                                placeholder="Nhập mã sản phẩm"
                                                label="Mã sản phẩm"
                                                name="code"
                                                required={true}
                                                updateFormData={this.updateFormData}
                                                value={good.code}/>
                                            <FormInputText
                                                placeholder="Nhập mô tả sản phẩm"
                                                label="Mô tả sản phẩm"
                                                name="description"
                                                updateFormData={this.updateFormData}
                                                value={good.description}/>
                                            <FormInputText
                                                placeholder="Nhập giá sản phẩm"
                                                label="Giá sản phẩm"
                                                name="price"
                                                type="number"
                                                updateFormData={this.updateFormData}
                                                value={good.price}/>
                                            {TYPE_API !== "zgroup" &&
                                            <FormInputText
                                                placeholder="Nhập link download"
                                                label="Link download"
                                                name="download"
                                                type="text"
                                                updateFormData={this.updateFormData}
                                                value={good.download}/>
                                            }

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
                                                    <div className="form-group" key={index}>
                                                        <label className="control-label">
                                                            {property.name}
                                                            <a onClick={() => this.editProperty(property, index)}
                                                               style={{marginLeft: "5px"}}>
                                                                <i style={{color: "#858585", fontSize: "16px"}}
                                                                   className="material-icons">mode_edit</i>
                                                            </a>
                                                            <a onClick={() => this.removeProperty(index)}>
                                                                <i style={{color: "#858585", fontSize: "16px"}}
                                                                   className="material-icons">delete</i>
                                                            </a>
                                                        </label>
                                                        <p className="form-control-static">
                                                            {property.value}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                        }
                                        <div>
                                            <Button onClick={() => this.showAddGoodPropertyModal(true)}
                                                    style={{width: "100%"}} className="btn btn-simple btn-rose">
                                                <i className="material-icons">add</i> Thêm thuộc tính
                                            </Button>
                                        </div>
                                    </div>


                                </div>
                                {
                                    this.props.isSaving ? (
                                        <Loading/>
                                    ) : (
                                        <button
                                            onClick={this.saveGood}
                                            className="btn btn-rose">Lưu sản phẩm</button>
                                    )
                                }

                            </div>
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">announcement</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Ảnh</h4>
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
                                                        width: "100%",
                                                        paddingBottom: "100%",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        backgroundImage: `url("${good.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}")`,
                                                    }}/>

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

                                        {
                                            this.props.isUploadingCover ? (
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" aria-valuenow="70"
                                                         aria-valuemin="0" aria-valuemax="100"
                                                         style={{width: `${this.props.percentCover}%`}}>
                                                        <span className="sr-only">{this.props.percentCover}% Complete</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <img
                                                        src={good.cover_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                        style={{
                                                            width: "100%"
                                                        }}/>

                                                    <UploadButton
                                                        style={{
                                                            width: "100%"
                                                        }}
                                                        className="btn btn-rose"
                                                        onChange={this.handleUploadCover}>
                                                        chọn ảnh nền
                                                    </UploadButton>
                                                </div>
                                            )
                                        }


                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                    <UploadFilesContainer/>
                                    <div className="card-content">
                                        <FilesList
                                            deleteFile={() => {
                                            }}
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

CreateGoodContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateGoodContainer);