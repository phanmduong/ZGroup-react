import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import GlobalLoadingContainer from "../globalLoading/GlobalLoadingContainer";
import * as helper from '../../helpers/helper';
import Loading from "../../components/common/Loading";
import ChildrenProperties from "./ChildrenProperties";
import PropertiesManageModal from "./PropertiesManageModal";
import ManufacturesManageModal from "./ManufacturesManageModal";

class CreateProductContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.productId = this.props.params.productId;
        this.state = {
            property: {},
            showAddGoodPropertyModal: false,
            type: "create",
            link: `/good/create-product`
        };
        this.saveProductCreate = this.saveProductCreate.bind(this);
        this.addProperties = this.addProperties.bind(this);
        this.changePropertySelect = this.changePropertySelect.bind(this);
        this.valueSelectChange = this.valueSelectChange.bind(this);
        this.checkElementNotInArray = this.checkElementNotInArray.bind(this);
        this.deleteProperties = this.deleteProperties.bind(this);
        this.checkChildProduct = this.checkChildProduct.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.props.createProductAction.loadProduct(this.props.params.productId);
            this.props.createProductAction.getPropertiesCreateProduct();
            this.setState({
                type: "edit",
                link: `/good/product/${this.productId}/edit`
            });
        } else if (this.props.route.type === "create") {
            this.props.createProductAction.getPropertiesCreateProduct();
            this.props.createProductAction.handleProductCreate({
                name: '',
                code: '',
                description: '',
                price: '',
                avatar_url: '',
                sale_status: 0,
                highlight_status: 0,
                display_status: 0,
                goods_count: 0,
                manufacture_id: '',
                good_category_id: '',
                images_url: [],
                property_list: [
                    {
                        name: 'coool',
                        property_item_id: 3,
                        value: []
                    }
                ],
                children: []
            });
        } else {
            this.setState({
                type: "import",
                link: `/order/${this.props.params.orderId}/warehouse-import`
            });
            this.props.createProductAction.getWarehouseListCreateProduct();
            this.props.createProductAction.handleProductCreate({
                id: this.props.params.orderId,
                warehouse_id: 1,
                name: '',
                code: '',
                description: '',
                price: '',
                avatar_url: '',
                sale_status: 0,
                highlight_status: 0,
                display_status: 0,
                goods_count: 0,
                manufacture_id: '',
                good_category_id: '',
                images_url: [],
                property_list: [
                    {
                        name: 'coool',
                        property_item_id: 3,
                        value: []
                    }
                ],
                children: []
            });
        }
    }

    saveProductCreate() {
        const good = {...this.props.productWorking};
        //const children_not_satisfy = good.children.filter(child => (helper.isEmptyInput(child.price) || helper.isEmptyInput(child.barcode)) && child.check);
        const empty_arr = good.property_list.filter(property => property.value.length === 0);
        if (
            helper.isEmptyInput(good.name)
            || helper.isEmptyInput(good.code)
            || (empty_arr.length > 0 && good.property_list.length > 1)
            || helper.isEmptyInput(good.price)
        //|| children_not_satisfy.length > 0
        ) {
            //if (children_not_satisfy.length > 0) helper.showErrorNotification("Bạn cần nhập đầy đủ thông tin cho sản phẩm con");
            if (helper.isEmptyInput(good.name)) helper.showErrorNotification("Bạn cần nhập Tên sản phẩm");
            if (helper.isEmptyInput(good.code)) helper.showErrorNotification("Bạn cần nhập Mã sản phẩm");
            if (helper.isEmptyInput(good.price)) helper.showErrorNotification("Bạn cần nhập Giá bán sản phẩm");
            if (empty_arr.length > 0 && good.property_list.length > 1) helper.showErrorNotification("Bạn cần nhập giá trị cho thuộc tính");
        } else {
            if (this.state.type === "create") this.props.createProductAction.saveProductCreate(good);
            else if (this.state.type === "edit") this.props.createProductAction.saveProductEdit(good);
            else this.props.createProductAction.importOrder(good);
        }
    }

    changePropertySelect(index) {
        return (value) => {
            let properties = [...this.props.productWorking.property_list];
            let property = {...properties[index]};
            if (value) {
                properties[index] = {
                    name: value.label,
                    property_item_id: value.value,
                    value: property.value
                };
            } else {
                properties[index] = {
                    name: property.name,
                    property_item_id: property.property_item_id,
                    value: property.value
                };
            }
            this.props.createProductAction.handlePropertiesCreate(properties);
            this.props.createProductAction.handleChildrenCreateProduct(helper.childrenBeginAddChild(properties, this.props.productWorking.price));
        };
    }

    valueSelectChange(index) {
        return (value) => {
            const valNotInArr = (val) => {
                let check = true;
                value.forEach(valu => {
                    if (valu.value === val.value) {
                        check = false;
                    }
                });
                return check;
            };
            const childNotRemoved = (child, properties_removed) => {
                let check = true;
                child.properties.forEach(property => {
                    properties_removed.forEach(pro => {
                        if (property.property_item_id === pro.property_item_id && property.value === pro.value) check = false;
                    });
                });
                return check;
            };
            let property_list = [...this.props.productWorking.property_list];
            let property = {...property_list[index]};
            let value_length = value.length;
            if (value.length === 0 && this.props.route.type === "edit") {
                value_length = property.value.length;
            }
            let goods_count = property_list.filter((property, i) => i !== index).reduce((result, property) =>
                property.value.length * result, 1) * value_length;
            property_list[index] = {
                name: property.name,
                property_item_id: property.property_item_id,
                value: (value.length === 0 && this.props.route.type === "edit") ? property.value : value
            };
            this.props.createProductAction.handlePropertiesCreate(property_list);
            this.props.createProductAction.handleGoodCountCreate(goods_count);
            if (value.length > property.value.length) {
                //Khi thêm giá trị mới
                let property_list_add = [...property_list];
                property_list_add[index] = {
                    name: property.name,
                    property_item_id: property.property_item_id,
                    value: [value[value.length - 1]]
                };
                let children = [...this.props.productWorking.children, ...helper.childrenBeginAddChild(property_list_add, this.props.productWorking.price)];
                this.props.createProductAction.handleChildrenCreateProduct(children);
            } else {
                //Khi xóa bớt giá trị
                let properties_removed = (value.length === 0 && this.props.route.type === "edit") ? [] : (
                    property.value.filter(valNotInArr).map(val => {
                        return ({
                            property_item_id: property.property_item_id,
                            value: val.value
                        });
                    })
                );
                let children = [...this.props.productWorking.children].filter(child => childNotRemoved(child, properties_removed));
                this.props.createProductAction.handleChildrenCreateProduct(children);
            }
        };
    }

    addProperties() {
        let arr = this.props.properties_list.filter(this.checkElementNotInArray);
        this.props.createProductAction.addPropertiesCreate({
            name: arr[0].name,
            property_item_id: arr[0].id,
            value: []
        });
    }

    checkElementNotInArray(e) {
        let check = true;
        this.props.productWorking.property_list.forEach(pro => {
            if (pro.property_item_id === e.id) {
                check = false;
            }
        });
        return check;
    }

    deleteProperties(id, index) {
        let product = {...this.props.productWorking};
        let property_list = [...product.property_list].filter(property => id !== property.property_item_id);
        let goods_count = [...product.property_list].filter((property, i) => i !== index).reduce((result, property) =>
            property.value.length * result, 1);
        this.props.createProductAction.handlePropertiesCreate(property_list);
        this.props.createProductAction.handleGoodCountCreate(goods_count);
        this.props.createProductAction.handleChildrenCreateProduct(helper.childrenBeginAddChild(property_list, this.props.productWorking.price));
    }

    checkChildProduct(index) {
        let children = [...this.props.productWorking.children];
        children[index] = {
            ...children[index],
            check: !children[index].check
        };
        this.props.createProductAction.handleChildrenCreateProduct(children);
    }

    updateFormData(index) {
        return (e) => {
            let field = e.target.name;
            let children = [...this.props.productWorking.children];
            children[index] = {
                ...children[index],
                [field]: e.target.value
            };
            this.props.createProductAction.handleChildrenCreateProduct(children);
        };
    }

    render() {
        this.path = this.props.location.pathname;
        let product = this.props.productWorking;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-tabs" data-background-color="rose">
                                <div className="nav-tabs-navigation">
                                    <div className="nav-tabs-wrapper">
                                        <ul className="nav nav-tabs" data-tabs="tabs">
                                            <li className={this.path === this.state.link ? 'active' : ''}>
                                                <IndexLink to={this.state.link}>
                                                    <i className="material-icons">add_box</i>Thông tin trên hệ thống
                                                    <div className="ripple-container"/>
                                                </IndexLink>
                                            </li>
                                            <li className={this.path === `${this.state.link}/website-display` ? 'active' : ''}>
                                                <Link to={`${this.state.link}/website-display`}>
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
                    {
                        this.path === this.state.link && this.path.slice(1, 6) !== "order" ? (
                            <div className="col-md-12">
                                <div className="card">
                                    {
                                        this.props.isLoading ? (
                                            <Loading/>
                                        ) : (
                                            <ChildrenProperties
                                                product={product}
                                                properties_list={this.props.properties_list}
                                                goods_count_check={this.props.goods_count_check}
                                                goods_count={this.props.goods_count}
                                                changePropertySelect={this.changePropertySelect}
                                                checkElementNotInArray={this.checkElementNotInArray}
                                                valueSelectChange={this.valueSelectChange}
                                                deleteProperties={this.deleteProperties}
                                                addProperties={this.addProperties}
                                                selectGoodCountCheck={this.props.createProductAction.selectGoodCountCheck}
                                                checkChildProduct={this.checkChildProduct}
                                                updateFormData={this.updateFormData}
                                                showAddChildImagesModal={this.props.createProductAction.showAddChildImagesModal}
                                                type={this.props.route.type}
                                                showPropertiesManageModal={this.props.createProductAction.showPropertiesManageModal}/>
                                        )
                                    }
                                </div>
                            </div>
                        ) : (<div/>)
                    }
                </div>
                {
                    this.props.isLoading ? (
                        <Loading/>
                    ) : (
                        <button
                            onClick={this.saveProductCreate}
                            className="btn btn-rose">Lưu sản phẩm
                        </button>
                    )
                }
                <GlobalLoadingContainer/>
                <PropertiesManageModal/>
                <ManufacturesManageModal/>
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
    properties_list: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    goods_count: PropTypes.number.isRequired,
    goods_count_check: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        productWorking: state.createProduct.productWorking,
        properties_list: state.createProduct.properties_list,
        isLoading: state.createProduct.isLoading,
        goods_count: state.createProduct.productWorking.goods_count,
        goods_count_check: state.createProduct.goods_count_check
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProductAction: bindActionCreators(createProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductContainer);
