import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import * as createProductAction from './createProductAction';
import GlobalLoadingContainer from "../globalLoading/GlobalLoadingContainer";
import Select from 'react-select';
import {Button} from "react-bootstrap";
import * as helper from '../../helpers/helper';
import Loading from "../../components/common/Loading";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";

class CreateProductContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.productId = this.props.params.productId;
        this.state = {
            property: {},
            showAddGoodPropertyModal: false,
            type: "create",
            link: `/create-product`
        };
        this.saveProductCreate = this.saveProductCreate.bind(this);
        this.addProperties = this.addProperties.bind(this);
        this.changePropertySelect = this.changePropertySelect.bind(this);
        this.valueSelectChange = this.valueSelectChange.bind(this);
        this.checkElementNotInArray = this.checkElementNotInArray.bind(this);
        this.deleteProperties = this.deleteProperties.bind(this);
        this.checkChildProduct = this.checkChildProduct.bind(this);
    }

    componentWillMount() {
        if (this.props.route.type === "edit") {
            this.props.createProductAction.loadProduct(this.props.params.productId);
            this.setState({
                type: this.props.params.type,
                link: `/product/${this.productId}/edit`
            });
        }
    }

    saveProductCreate() {
        const good = {...this.props.productWorking};
        if (!good.name || !good.code) {
            helper.showErrorNotification("Bạn cần nhập Tên và Mã sản phẩm");
        } else {
            if (this.state.type === "create") this.props.createProductAction.saveProductCreate(good);
            else this.props.createProductAction.saveProductEdit(good);
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
            this.props.createProductAction.handleChildrenCreateProduct(helper.childrenBeginAddChild(properties));
        };
    }

    valueSelectChange(index) {
        return (value) => {
            let properties = [...this.props.productWorking.property_list];
            let property = {...properties[index]};
            let goods_count = properties.filter((property, i) => i !== index).reduce((result, property) =>
                property.value.length * result, 1) * value.length;
            properties[index] = {
                name: property.name,
                property_item_id: property.property_item_id,
                value: value
            };
            console.log("properties", properties);
            this.props.createProductAction.handlePropertiesCreate(properties);
            this.props.createProductAction.handleGoodCountCreate(goods_count);
            this.props.createProductAction.handleChildrenCreateProduct(helper.childrenBeginAddChild(properties));
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
        let properties = [...product.property_list].filter(property => id !== property.property_item_id);
        let goods_count = [...product.property_list].filter((property, i) => i !== index).reduce((result, property) =>
            property.value.length * result, 1);
        this.props.createProductAction.handlePropertiesCreate(properties);
        this.props.createProductAction.handleGoodCountCreate(goods_count);
        this.props.createProductAction.handleChildrenCreateProduct(helper.childrenBeginAddChild(properties));
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
                        this.path === this.state.link ? (
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon"
                                         data-background-color="rose"
                                         style={{"z-index": 0}}
                                    ><i
                                        className="material-icons">assignment</i>
                                    </div>
                                    <div className="card-content"><h4 className="card-title">Danh sách thuộc tính</h4>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="col-md-3 label-control">Thuộc tính</th>
                                                <th className="col-md-9 label-control">Giá trị</th>
                                                <th className="label-control"/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {

                                                product.property_list.map((property, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <Select
                                                                    value={property.property_item_id}
                                                                    placeholder="Chọn tên thuộc tính"
                                                                    options={
                                                                        this.props.properties_list.map((property) => {
                                                                            if (this.checkElementNotInArray(property)) {
                                                                                return {
                                                                                    ...property,
                                                                                    value: property.id,
                                                                                    label: property.name
                                                                                };
                                                                            } else return {
                                                                                ...property,
                                                                                value: property.id,
                                                                                label: property.name,
                                                                                disabled: true
                                                                            };
                                                                        })
                                                                    }
                                                                    onChange={this.changePropertySelect(index)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Select.Creatable
                                                                    multi={true}
                                                                    placeholder="Nhập giá trị thuộc tính"
                                                                    options={[]}
                                                                    onChange={this.valueSelectChange(index)}
                                                                    value={property.value}
                                                                />
                                                            </td>
                                                            <td>
                                                                {
                                                                    product.property_list.length > 1 ? (
                                                                        <a style={{color: "#878787"}}
                                                                           data-toggle="tooltip" title=""
                                                                           type="button" rel="tooltip"
                                                                           data-original-title="Xoá"
                                                                           onClick={() => this.deleteProperties(property.property_item_id, index)}><i
                                                                            className="material-icons">delete</i></a>
                                                                    ) : (<div/>)
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        <div>
                                            {
                                                product.property_list.length < this.props.properties_list.length ? (
                                                    <Button onClick={() => this.addProperties()}
                                                            style={{width: "100%"}} className="btn btn-simple btn-rose">
                                                        <i className="material-icons">add</i> Thêm thuộc tính
                                                    </Button>
                                                ) : (<div/>)
                                            }
                                        </div>
                                        <div className="col-md-12">
                                            <CheckBoxMaterial
                                                name="sale_status"
                                                checked={this.props.goods_count_check}
                                                onChange={this.props.createProductAction.selectGoodCountCheck}
                                                label={"Có " + this.props.goods_count + " hàng hóa cùng loại"}/>
                                        </div>
                                        {
                                            (this.props.goods_count_check && this.props.goods_count > 0) ? (
                                                <div className="">
                                                    <table className="table table-hover">
                                                        <thead>
                                                        <tr>
                                                            <th/>
                                                            <th className="col-md-8">Tên</th>
                                                            <th className="col-md-2">Mã</th>
                                                            <th className="col-md-2">Giá bán</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            product.children && product.children.map((child, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <CheckBoxMaterial
                                                                                name="sale_status"
                                                                                checked={child.check}
                                                                                onChange={() => this.checkChildProduct(index)}
                                                                                label=""/>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                child.properties.map((pro, index) => {
                                                                                    return (
                                                                                        <a key={index}>
                                                                                            {`${pro.value} `}
                                                                                        </a>
                                                                                    );
                                                                                })
                                                                            }
                                                                        </td>
                                                                        <td className="form-group">
                                                                            <input type="text"
                                                                                   name="barcode"
                                                                                   className="form-control"
                                                                                   value={child.barcode}
                                                                                   onChange={this.updateFormData(index)}/>
                                                                        </td>
                                                                        <td className="form-group">
                                                                            <input type="text"
                                                                                   name="price"
                                                                                   className="form-control"
                                                                                   placeholder="0"
                                                                                   value={child.price}
                                                                                   onChange={this.updateFormData(index)}/>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (<div/>)
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : (<div/>)
                    }
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
