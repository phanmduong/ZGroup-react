import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import FormInputText from "../../components/common/FormInputText";
import Select from 'react-select';
import PropTypes from 'prop-types';

class ProductSystemContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            manufacture: '',
            category: ''
        };
    }

    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">mode_edit</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Thông tin cơ bản</h4>
                        <form role="form">
                            <div className="row">
                                <div className="col-md-4">
                                    <h4 className="panel-title">
                                        <div className="checkbox none-margin">
                                            <label>
                                                <input type="checkbox"
                                                       name="sale_status"
                                                       checked="true"
                                                />
                                                Đang kinh doanh
                                            </label>
                                        </div>
                                    </h4>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="panel-title">
                                        <div className="checkbox none-margin">
                                            <label>
                                                <input type="checkbox"
                                                       name="sale_status"
                                                       checked="true"
                                                />
                                                Hiển thị ra website
                                            </label>
                                        </div>
                                    </h4>
                                </div>
                                <div className="col-md-4">
                                    <h4 className="panel-title">
                                        <div className="checkbox none-margin">
                                            <label>
                                                <input type="checkbox"
                                                       name="sale_status"
                                                       checked="true"
                                                />
                                                Nổi bật
                                            </label>
                                        </div>
                                    </h4>
                                </div>
                            </div>
                            <FormInputText
                                placeholder="Nhập tên sản phẩm"
                                label="Tên sản phẩm"
                                name="name"
                                required={true}
                                updateFormData={this.updateFormData}
                                value="batman"/>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormInputText
                                        placeholder="Nhập mã sản phẩm"
                                        label="Mã sản phẩm"
                                        name="code"
                                        required={true}
                                        updateFormData={this.updateFormData}
                                        value="minh anh"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <FormInputText
                                        placeholder="Nhập số lượng sản phẩm"
                                        label="Số lượng sản phẩm"
                                        name="description"
                                        updateFormData={this.updateFormData}
                                        value="fuck"/>
                                </div>
                                <div className="col-md-6">
                                    <FormInputText
                                        placeholder="0"
                                        label="Giá bán"
                                        name="name"
                                        required={true}
                                        updateFormData={this.updateFormData}
                                        value="batman"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label">Nhà sản xuất</label>
                                    <Select
                                        name="manufactures"
                                        value={this.state.manufacture}
                                        options={this.props.manufactures.map((manufacture) => {
                                            return {
                                                ...manufacture,
                                                value: manufacture.id,
                                                label: manufacture.name
                                            };
                                        })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label">Nhóm hàng hóa</label>
                                    <Select
                                        name="categories"
                                        value={this.state.category}
                                        options={this.props.categories.map((category) => {
                                            return {
                                                ...category,
                                                value: category.id,
                                                label: category.label
                                            };
                                        })}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ProductSystemContainer.propTypes = {
    manufactures: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        manufactures: state.createProduct.manufactures,
        categories: state.createProduct.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSystemContainer);