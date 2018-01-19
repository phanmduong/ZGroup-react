import React from 'react';
import PropTypes from "prop-types";
import Select from 'react-select';
import {Button} from "react-bootstrap";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";
import PropertyReactSelectValue from "./PropertyReactSelectValue";
import AddChildImagesModal from "./AddChildImagesModal";

class ChildrenProperties extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const product = this.props.product;
        return (
            <div>
                <div className="card-header card-header-icon"
                     data-background-color="rose"
                     style={{zIndex: 0}}>
                    <i className="material-icons">assignment</i>
                </div>
                <div className="card-content"><h4 className="card-title">Danh sách thuộc
                    tính</h4>
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
                            product.property_list && product.property_list.map((property, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <Select
                                                value={property.property_item_id}
                                                placeholder="Chọn tên thuộc tính"
                                                options={
                                                    this.props.properties_list.map((property) => {
                                                        if (this.props.checkElementNotInArray(property)) {
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
                                                onChange={this.props.changePropertySelect(index)}
                                            />
                                        </td>
                                        <td>
                                            <Select.Creatable
                                                multi={true}
                                                placeholder="Nhập giá trị thuộc tính"
                                                options={[]}
                                                onChange={this.props.valueSelectChange(index)}
                                                value={property.value}
                                                valueComponent={PropertyReactSelectValue}
                                            />
                                        </td>
                                        <td>
                                            {
                                                (product.property_list && product.property_list.length > 1) && this.props.type === "create" ? (
                                                    <a style={{color: "#878787"}}
                                                       data-toggle="tooltip" title=""
                                                       type="button" rel="tooltip"
                                                       data-original-title="Xoá"
                                                       onClick={() => this.props.deleteProperties(property.property_item_id, index)}><i
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
                            ((product.property_list && product.property_list.length < this.props.properties_list.length)
                                || !product.property_list ) && this.props.type === "create" ? (
                                <Button onClick={() => this.props.addProperties()}
                                        style={{width: "100%"}}
                                        className="btn btn-simple btn-rose">
                                    <i className="material-icons">add</i> Thêm thuộc
                                    tính
                                </Button>
                            ) : (<div/>)
                        }
                    </div>
                    <div className="row"
                         style={{zIndex: 0}}>
                        <div className="col-md-9"
                             style={{zIndex: 0}}>
                            <CheckBoxMaterial
                                name="sale_status"
                                checked={this.props.goods_count_check}
                                onChange={this.props.selectGoodCountCheck}
                                label={"Có " + this.props.goods_count + " hàng hóa cùng loại"}/>
                        </div>
                        <div className="col-md-3">
                            <button type="button"
                                    className="btn btn-rose btn-sm"
                                    onClick={() => this.props.showPropertiesManageModal()}>
                                <i className="material-icons">list</i>
                                Quản lý thuộc tính
                            </button>
                        </div>
                    </div>
                    {
                        (this.props.goods_count_check && this.props.goods_count > 0) ? (
                            <div className="">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th/>
                                        <th className="col-md-6">Tên</th>
                                        <th className="col-md-2">Mã</th>
                                        <th className="col-md-2">Giá bán</th>
                                        <th className="col-md-2"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        product.children && product.children.map((child, index) => {
                                            let child_images_quantity = child.child_images_url ? JSON.parse(child.child_images_url).length : 0;
                                            return (
                                                <tr key={index}>
                                                    <td data-original-title="Remove item"
                                                        data-toggle="tooltip"
                                                        rel="tooltip">
                                                        <CheckBoxMaterial
                                                            name="sale_status"
                                                            disabled={child.deletable === false ? (true) : (false)}
                                                            checked={child.check}
                                                            onChange={() => this.props.checkChildProduct(index)}
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
                                                               placeholder="Hệ thống tự sinh nếu để trống"
                                                               value={child.barcode}
                                                               onChange={this.props.updateFormData(index)}/>
                                                    </td>
                                                    <td className="form-group">
                                                        <input type="number"
                                                               name="price"
                                                               className="form-control"
                                                               placeholder="0"
                                                               value={child.price}
                                                               onChange={this.props.updateFormData(index)}/>
                                                    </td>
                                                    <td>
                                                        <Button style={{width: "100%"}}
                                                                className="btn btn-simple btn-rose"
                                                                onClick={() => this.props.showAddChildImagesModal(index)}>
                                                            <i className="material-icons">cloud_upload</i>
                                                            {
                                                                child_images_quantity === 0 ? (
                                                                    <span> Thêm </span>
                                                                ) : (<span> {child_images_quantity} </span>)
                                                            }
                                                            ảnh
                                                        </Button>
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
                <AddChildImagesModal/>
            </div>
        );
    }
}

ChildrenProperties.propTypes = {
    product: PropTypes.object.isRequired,
    properties_list: PropTypes.array.isRequired,
    goods_count_check: PropTypes.bool.isRequired,
    goods_count: PropTypes.number.isRequired,
    changePropertySelect: PropTypes.func.isRequired,
    checkElementNotInArray: PropTypes.func.isRequired,
    valueSelectChange: PropTypes.func.isRequired,
    deleteProperties: PropTypes.func.isRequired,
    addProperties: PropTypes.func.isRequired,
    selectGoodCountCheck: PropTypes.func.isRequired,
    checkChildProduct: PropTypes.func.isRequired,
    updateFormData: PropTypes.func.isRequired,
    showAddChildImagesModal: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    showPropertiesManageModal: PropTypes.func.isRequired
};

export default ChildrenProperties;