import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
import FormInputSelect from '../../components/common/FormInputSelect';
import FormInputDate from '../../components/common/FormInputDate';
import AddCustomerOverlay from "./AddCustomerOverlay";
import AddGoodOverlay from "./AddGoodOverlay";
import AddCategoryOverlay from "./AddCategoryOverlay";
// import ReactSelect from 'react-select';


class AddDiscountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({isShowModal: !this.state.isShowModal});
    }


    render() {
        let {discount_value, discount_type, type, used_for, description, name, start_time, end_time, order_value} = this.props.discount;
        let TYPE = [
            {
                name: '',
                id: '',
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
        let USEDFOR = [
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
        // let CATEGORY = {
        //     this.props.categories.map((category) => {
        //         return {
        //             ...category,
        //             value: category.id,
        //             label: category.label,
        //         };
        //     })
        // };
        {/*<div className="form-group col-md-8">*/}
            {/*<label className="label-control">Phân loại: </label>*/}
            {/*<ReactSelect*/}
                {/*name="category"*/}
                {/*value={this.props.discount.category}*/}
                {/*options={CATEGORY[0]}*/}
                {/*onChange={this.props.updateFormData}*/}
                {/*placeholder="Chọn danh mục"*/}
                {/*autosize={true}*/}
            {/*/>*/}
        {/*</div>*/}
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


                                    <FormInputSelect
                                        label="Chọn chương trình khuyến mãi"
                                        name="type"
                                        data={TYPE}
                                        value={type}
                                        required={true}
                                        updateFormData={this.props.updateFormData}
                                    />
                                    <FormInputText
                                        label="Tên"
                                        name="name"
                                        type="text"
                                        updateFormData={this.props.updateFormData}
                                        value={name}
                                        required={true}
                                    />


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
                                                placeholder="Chọn đơn vị"
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
                                                         marginTop: "50px",
                                                         marginLeft: "-16px",
                                                     }}
                                                >{discount_type === 'percentage' ? '%' : '₫'}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">

                                            <FormInputSelect
                                                label="Sử dụng cho"
                                                data={USEDFOR}
                                                required={true}
                                                updateFormData={this.props.updateFormData}
                                                name="used_for"
                                                value={used_for}
                                            />
                                        </div>
                                        <div className="col-md-9">
                                            <div style={{
                                                display: 'flex',
                                                marginTop: "42px"
                                            }}>
                                                {
                                                    this.props.discount.used_for === 'good' ?

                                                        <AddGoodOverlay
                                                            good={this.props.discount.good}
                                                        />
                                                        :
                                                        this.props.discount.used_for === 'category' ?


                                                            <AddCategoryOverlay category={this.props.discount.category} />

                                                            :
                                                            this.props.discount.used_for === 'customer' ?
                                                                <AddCustomerOverlay
                                                                    customer={this.props.discount.customer}
                                                                />
                                                                :
                                                                this.props.discount.used_for === 'order' ?
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
    categories: PropTypes.object,
    updateFormData: PropTypes.func,
};


export default AddDiscountComponent;