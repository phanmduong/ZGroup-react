import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import GlobalLoadingContainer from "../globalLoading/GlobalLoadingContainer";
import {showErrorNotification} from "../../helpers/helper";

class CreateProductContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            property: {},
            showAddGoodPropertyModal: false
        };
        this.saveProductCreate = this.saveProductCreate.bind(this);
    }

    componentWillMount() {
        this.props.createProductAction.getManufacturesCreateProduct();
        this.props.createProductAction.getCategoriesCreateProduct();
    }

    saveProductCreate() {
        const good = {...this.props.productWorking};
        if (!good.name || !good.code) {
            showErrorNotification("Bạn cần nhập Tên và Mã sản phẩm");
        } else {
            this.props.createProductAction.saveProductCreate(good);
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
                                            <li className={this.path === `/create-product` ? 'active' : ''}>
                                                <IndexLink to={`/create-product`}>
                                                    <i className="material-icons">add_box</i>Thông tin trên hệ thống
                                                    <div className="ripple-container"/>
                                                </IndexLink>
                                            </li>
                                            <li className={this.path === `/create-product/website-display` ? 'active' : ''}>
                                                <Link to={`/create-product/website-display`}>
                                                    <i className="material-icons">smartphone</i> Thông tin trên website
                                                    <div className="ripple-container"/>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content">
                                <div className="tab-content">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={this.saveProductCreate}
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductContainer);
