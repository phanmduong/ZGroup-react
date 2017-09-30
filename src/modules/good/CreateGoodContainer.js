import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import * as goodActions from "../good/goodActions";
import UploadButton from "../../components/common/uploadButton/UploadButton";

class CreateGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            header: "Thêm sản phẩm",
            properties: []
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.addProperties = this.addProperty.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let good = {...this.props.good};
        good[field] = event.target.value;
        this.props.goodActions.updateGoodFormData(good);
    }

    addProperties() {
        this.setState({
            properties: [
                ...this.state.properties,
                {
                    name: "",
                    value: ""
                }
            ]
        });
    }

    handleUpload(event) {
        const file = event.target.files[0];
        this.props.goodActions.uploadAvatar(file);
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.setState({
                header: "Sửa sản phẩm"
            });
        }
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

                                        </form>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">toc</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Thuộc tính bổ sung</h4>
                                        <div style={{
                                            display: "flex"
                                        }}>
                                            <table style={{
                                                width: "100%"
                                            }}>
                                                <tr>
                                                    <th>Tên thuộc tính</th>
                                                    <th>Giá trị</th>
                                                </tr>
                                                {
                                                    this.state.properties && this.state.properties.map((property, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    <input
                                                                        style={{width: "100%"}}
                                                                        type="text"/>
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        style={{width: "100%"}}
                                                                        type="text"/>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }

                                            </table>
                                        </div>
                                        <button className="btn btn-simple btn-rose">
                                            <i className="material-icons">add</i> Thêm thuộc tính
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">announcement</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Thông tin</h4>
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
    isUploadingAvatar: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    goodActions: PropTypes.object.isRequired,
    percent: PropTypes.number.isRequired,
    good: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.goodList.isLoading,
        isUploadingAvatar: state.good.createGood.isUploadingAvatar,
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