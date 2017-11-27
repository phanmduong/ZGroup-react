import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import GlobalLoadingContainer from "../globalLoading/GlobalLoadingContainer";
import {showErrorNotification} from "../../helpers/helper";
import Loading from "../../components/common/Loading";

class CreateProductContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.productId = this.props.params.productId;
        this.state = {
            property: {},
            showAddGoodPropertyModal: false
        };
        this.saveProductEdit = this.saveProductEdit.bind(this);
    }

    componentWillMount() {
        this.props.createProductAction.loadProduct(this.props.params.productId);
        this.setState({type: this.props.params.type});
        this.props.createProductAction.getManufacturesCreateProduct();
        this.props.createProductAction.getCategoriesCreateProduct();
    }

    saveProductEdit() {
        const product = {...this.props.productWorking};
        if (!product.name || !product.code) {
            showErrorNotification("Bạn cần nhập Tên và Mã sản phẩm");
        } else {
            this.props.createProductAction.saveProductEdit(product);
        }
    }

    render() {
        this.path = this.props.location.pathname;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-tabs" data-background-color="rose">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <li className={this.path === `/product/${this.productId}/edit` ? 'active' : ''}>
                                                <IndexLink to={`/product/${this.productId}/edit`}>
                                                    <i className="material-icons">add_box</i>Thông tin trên hệ thống
                                                    <div className="ripple-container"/>
                                                </IndexLink>
                                            </li>
                                            <li className={this.path === `/product/${this.productId}/edit/website-display` ? 'active' : ''}>
                                                <Link to={`/product/${this.productId}/edit/website-display`}>
                                                    <i className="material-icons">smartphone</i> Thông tin trên website
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content">
                                {
                                    this.props.isLoading ? (
                                        <Loading/>
                                    ) : (
                                        <div className="tab-content">
                                            {this.props.children}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={this.saveProductEdit}
                    className="btn btn-rose">Lưu sản phẩm
                </button>
                <GlobalLoadingContainer/>
            </div>
        );
    }
}


CreateProductContainer.contextTypes = {
    router: PropTypes.object,
};

CreateProductContainer.propTypes = {
    children: PropTypes.element,
    pathname: PropTypes.string,
    route: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    createProductAction: PropTypes.object.isRequired,
    productWorking: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        productWorking: state.createProduct.productWorking,
        isLoading: state.createProduct.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductContainer);
