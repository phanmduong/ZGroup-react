import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import AddCustomerOverlay from "./AddCustomerOverlay";
import AddGoodOverlay from "./AddGoodOverlay";
import AddCategoryOverlay from "./AddCategoryOverlay";
import AddGroupCustomerOverlay from "./AddGroupCustomerOverlay";
import CheckBoxMaterial from '../../components/common/CheckBoxMaterial';


// import ReactSelect from 'react-select';


class AddDiscountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            unlimited: (this.props.discount.quantity === -1)
        };
        this.changeQuantity = this.changeQuantity.bind(this);
    }

    toggle() {
        this.setState({isShowModal: !this.state.isShowModal});
    }

    changeQuantity() {
        this.setState({unlimited: !this.state.unlimited}); // Logic có vấn đề do các hàm thực hiện cùng nhau
        if (this.state.unlimited === false) {
            this.props.changeQuantityInProps(-1);
        }
        else {
            this.props.changeQuantityInProps(0);
        }
    }


    render() {
        let {discount_value, discount_type, type, used_for, description, name, start_time, end_time, order_value, quantity, shared} = this.props.discount;
        let TYPE = [
            {
                name: '',
                id: '',
            },
            {
                name: 'Tất cả',
                id: 'all',
            },
            {
                name: 'Mã khuyến mãi',
                id: 'code',
            },
            {
                name: 'Chương trình khuyến mãi',
                id: 'program',
            },
        ];
        let USEDFORCODE = [
            {
                name: '',
                id: '',
            },
            {
                name: 'Tất cả',
                id: 'all',
            },
            {
                name: 'Đơn hàng',
                id: 'order',
            },
            {
                name: 'Hàng hóa',
                id: 'good',
            },
            {
                name: 'Danh mục',
                id: 'category',
            },
            {
                name: 'Khách hàng',
                id: 'customer',
            },
            {
                name: 'Nhóm khách hàng',
                id: 'customer-group',
            },
        ];
        let USEDFORPROGRAM = [
            {
                name: '',
                id: '',
            },
            {
                name: 'Hàng hóa',
                id: 'good',
            },
            {
                name: 'Danh mục',
                id: 'category',
            },
        ];
        let DISCOUNTYPE = [
            {
                name: '',
                id: '',
            },
            {
                name: 'Phần trăm',
                id: 'percentage',
            },
            {
                name: 'VNĐ',
                id: 'fix',
            },

        ];
        let SHARED = [
            {
                name: '',
                id: '',
            },
            {
                name: 'Có thể dùng chung',
                id: 1,
            },
            {
                name: 'Không dùng chung',
                id: 0,
            },

        ];

        return (
            <div>
                <form id="form-add-discount">
                    <div className="row">

                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose"><i
                                    className="material-icons">assignment</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Thêm mã khuyễn mãi</h4>


                                    <div className="row">
                                        <div className="col-md-6">

                                            <FormInputSelect
                                                label="Chọn chương trình khuyến mãi"
                                                name="type"
                                                data={TYPE}
                                                value={type}
                                                updateFormData={this.props.updateFormData}
                                            />
                                        </div>
                                        <div className="col-md-6">

                                            <FormInputSelect
                                                label="Cách dùng"
                                                data={SHARED}
                                                required={true}
                                                updateFormData={this.props.updateFormData}
                                                name="shared"
                                                value={shared}
                                            />
                                        </div>
                                    </div>
                                    {type === "code" ?
                                        <div className="row">
                                            <div className="col-md-8">
                                                <FormInputText
                                                    label="Mã khuyến mãi"
                                                    name="name"
                                                    type="text"
                                                    updateFormData={this.props.updateFormData}
                                                    value={name}
                                                    required={true}
                                                />
                                            </div>
                                            <div className="col-md-3" style={{marginTop: 25, marginLeft: 32}}>
                                                <button className="btn btn-primary btn-xs"
                                                        onClick={(e) => {
                                                            this.props.generateCode();
                                                            e.preventDefault();
                                                        }}
                                                >Tự động tạo mã
                                                </button>
                                            </div>
                                        </div>

                                        :
                                        <FormInputText
                                            label="Tên"
                                            name="name"
                                            type="text"
                                            updateFormData={this.props.updateFormData}
                                            value={name}
                                            required={true}
                                        />
                                    }


                                    <div className="row">
                                        <div className="col-md-3">

                                            {type === "code" ?
                                                <FormInputSelect
                                                    label="Sử dụng cho"
                                                    data={USEDFORCODE}
                                                    required={true}
                                                    updateFormData={this.props.updateFormData}
                                                    name="used_for"
                                                    value={used_for}
                                                />
                                                :
                                                <FormInputSelect
                                                    label="Sử dụng cho"
                                                    data={USEDFORPROGRAM}
                                                    required={true}
                                                    updateFormData={this.props.updateFormData}
                                                    name="used_for"
                                                    value={used_for}
                                                />
                                            }

                                        </div>
                                        <div className="col-md-9">
                                            <div style={{
                                                display: 'flex',
                                                marginTop: "40px",
                                                marginLeft: 200,
                                            }}>
                                                {
                                                    used_for === 'good' ?
                                                        <AddGoodOverlay
                                                            good={this.props.discount.good}
                                                        />
                                                        :
                                                        used_for === 'category' ?
                                                            <AddCategoryOverlay
                                                                category={this.props.discount.category}/>

                                                            :
                                                            used_for === 'customer' ?
                                                                <AddCustomerOverlay
                                                                    customer={this.props.discount.customer}
                                                                />
                                                                :
                                                                used_for === 'customer-group' ?
                                                                    <AddGroupCustomerOverlay
                                                                        groupCustomer={this.props.discount.customer_group}
                                                                    />
                                                                    :
                                                                    used_for === 'order' ?
                                                                        <div>
                                                                            <div className="col-md-10"
                                                                                 style={{marginTop: -16}}>
                                                                                <FormInputText
                                                                                    label="Trị giá đơn hàng từ "
                                                                                    name="order_value"
                                                                                    type="tel"
                                                                                    updateFormData={this.props.updateFormData}
                                                                                    value={order_value}
                                                                                    required={true}
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="col-md-2 input-group-addon border-color-input-group"
                                                                                data-bind="text: $parent.Culture"
                                                                                style={{
                                                                                    width: "12px",
                                                                                    marginTop: "11px",
                                                                                    marginLeft: "-16px",
                                                                                }}
                                                                            >₫
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    <FormInputText
                                        label="Mô tả"
                                        name="description"
                                        type="text"
                                        updateFormData={this.props.updateFormData}
                                        value={description}
                                    />


                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInputSelect
                                                label="Loại khuyến mãi"
                                                data={DISCOUNTYPE}
                                                required={true}
                                                updateFormData={this.props.updateFormData}
                                                name="discount_type"
                                                value={discount_type}
                                            />
                                        </div>
                                        {discount_type === '' ? null :
                                            <div>
                                                <div style={{marginTop: 22}} className="col-md-4">
                                                    <FormInputText
                                                        label={discount_type === 'percentage' ? 'Phần trăm' : 'Số tiền'}
                                                        name="discount_value"
                                                        type="tel"
                                                        updateFormData={this.props.updateFormData}
                                                        value={discount_value}
                                                        required={true}
                                                    />
                                                </div>
                                                <div className="col-md-2 input-group-addon border-color-input-group"
                                                     data-bind="text: $parent.Culture"
                                                     style={{
                                                         width: "12px",
                                                         marginTop: "49px",
                                                         marginLeft: "-16px",
                                                     }}
                                                >{discount_type === 'percentage' ? '%' : '₫'}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    {type === 'code' ?
                                        <div>
                                            <CheckBoxMaterial
                                                label="Sử dụng vô số lần"
                                                name="quantity"
                                                checked={this.state.unlimited}
                                                onChange={() => {
                                                    return this.changeQuantity();
                                                }}
                                            />
                                            {quantity !== -1 ?
                                                <FormInputText
                                                    label="Số lần sử dụng khuyến mãi"
                                                    name="quantity"
                                                    type="number"
                                                    updateFormData={this.props.updateFormData}
                                                    value={quantity}
                                                    required={true}
                                                /> : null
                                            }

                                        </div> : null
                                    }

                                </div>
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="card">

                                <div className="card-header card-header-icon" data-background-color="rose"><i
                                    className="material-icons">today</i></div>
                                <div className="card-content">
                                    <h4 className="card-title">Thời gian áp dụng</h4>
                                    <div className="form-group">
                                        <FormInputDate
                                            label="Bắt đầu khuyễn mãi"
                                            name="start_time"
                                            value={start_time}
                                            placeholder="dd/mm/yyyy"
                                            updateFormData={this.props.updateFormData}
                                            id="form-start-time"
                                            required={true}
                                            maxDate={this.props.discount.end_time !== '' ? this.props.discount.end_time : ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <FormInputDate
                                            label="Hết hạn khuyến mãi"
                                            name="end_time"
                                            value={end_time}
                                            placeholder="dd/mm/yyyy"
                                            updateFormData={this.props.updateFormData}
                                            id="form-end-time"
                                            required={true}
                                            minDate={this.props.discount.start_time !== '' ? this.props.discount.start_time : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </form>
            </div>
        );
    }
}


AddDiscountComponent.propTypes = {
    discount: PropTypes.object,
    updateFormData: PropTypes.func,
    generateCode: PropTypes.func,
    changeQuantityInProps: PropTypes.func,
};


export default AddDiscountComponent;