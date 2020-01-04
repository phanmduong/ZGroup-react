import React from 'react';
import FormInputText from "../../../components/common/FormInputText";
import Loading from "../../../components/common/Loading";
import {addDiscountApi as createCoupons} from "../../addDiscount/addDiscountApis";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {isEmptyInput, showErrorNotification} from "../../../helpers/helper";
import {CirclePicker} from "react-color";
import Search from "../../../components/common/Search";
import * as discountActions from "../../discount/discountActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputDate from "../../../components/common/FormInputDate";
import {DISCOUNTYPE} from "../../../constants/constants";
import CheckBoxMaterial from "../../../components/common/CheckBoxMaterial";


class CreateCouponOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            create: false,
            coupon: {discount_type: 'fix', quantity: -1, shared: true},
            isLoading: false,
            isProcessing: false,
            isDeleting: false,
            search: '',
            data: this.props.data ? this.props.data : {}
        };
        this.state = this.initState;
    }

    componentWillMount() {
        this.loadDiscounts(false);
    }

    loadDiscounts = (singleLoad) => {
        let {discountActions} = this.props;
        let isLoadedCoupons = this.props.isLoadedCoupons;
        if (!isLoadedCoupons || singleLoad)
            discountActions.loadDiscounts(1, -1, '');
    };


    editCoupons = (coupon) => {
        this.setState({
            coupon,
            create: true
        });
    };

    updateFormData = (event) => {

        let {value, name, checked} = event.target;
        let coupon = {...this.state.coupon};
        if (name == 'shared') {
            value = checked;
        }

        coupon[name] = value;
        this.setState({
            coupon
        });
    };


    toggle = () => {
        this.setState({
            create: !this.state.create
        });
    };

    saveCoupons = () => {
        let {coupon} = this.state;
        if (isEmptyInput(coupon.name)) {
            showErrorNotification("Bạn cần nhập tên mã giảm giá");
        } else if (coupon.name.length > 20) {
            showErrorNotification("Độ dài mã giảm giá không quá 20 kí tự");
        } else if (isEmptyInput(coupon.color)) {
            showErrorNotification("Bạn cần chọn màu");
        } else if (coupon.discount_type == 'percentage' && coupon.discount_value) {
            showErrorNotification("Giá trị giảm từ 1% -> 100%");
        } else {
            this.setState({
                isLoading: true,
                create: false
            });
            createCoupons({...coupon})
                .then(() => {
                    this.setState({
                        coupon: {},
                        create: false,
                        isLoading: false
                    });
                    this.loadDiscounts(true);
                });


        }
    };

    close = () => {
        // this.setState(this.initState);
    };

    changeColor = (color) => {
        color = color ? color.hex : '';
        this.setState({
            coupon: {
                ...this.state.coupon,
                color
            }
        });
    };

    render() {
        let {isLoading, isProcessing, coupon} = this.state;
        let {isLoadingCoupons, className} = this.props;
        let coupons = this.props.coupons || [];
        let showLoading = isLoading || isLoadingCoupons || isProcessing;
        return (
            <div style={{position: "relative"}}>
                <div
                    className={className}
                    ref="target" onClick={() => {
                    this.setState({show: !this.state.show});
                }}>
                    Mã giảm giá
                </div>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-container" mask="coupon" style={{width: 300, marginTop: 10}}>


                        {!showLoading && <div style={{position: "relative"}}>
                            {
                                this.state.create && (
                                    <a className="text-rose" style={{position: "absolute", left: "0px", top: "2px"}}
                                       onClick={this.toggle}>
                                        <i className="material-icons">keyboard_arrow_left</i>
                                    </a>
                                )
                            }
                            <button
                                onClick={this.close}
                                type="button" className="close"
                                style={{color: '#5a5a5a', fontSize: 20}}>
                                <span aria-hidden="true">×</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <div style={{textAlign: "center", fontSize: 16, color: 'black', marginBottom: 15}}>
                                Mã giảm giá
                            </div>
                        </div>}
                        <div>{showLoading && <Loading/>}</div>
                        {!this.state.create && !showLoading && <div>
                            <Search
                                placeholder="Tìm theo tên"
                                value={this.state.search}
                                onChange={search => this.setState({search})}
                            />
                        </div>}
                        {
                            this.state.create && !isProcessing ? (
                                <div>
                                    <div>
                                        <label>Mã giảm giá</label>
                                        <FormInputText
                                            name="name"
                                            placeholder="Nhập mã giảm giá"
                                            required
                                            value={coupon.name || ""}
                                            updateFormData={this.updateFormData}
                                        /></div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Từ ngày</label>

                                            <FormInputDate
                                                name="start_time"
                                                value={coupon.start_time}
                                                placeholder="yyyy/mm/dd"
                                                updateFormData={this.updateFormData}
                                                required
                                                id="form-start-time"
                                                maxDate={coupon.end_time !== '' ? coupon.end_time : ''}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Đến ngày</label>

                                            <FormInputDate
                                                name="end_time"
                                                value={coupon.end_time}
                                                placeholder="yyyy/mm/dd"
                                                updateFormData={this.updateFormData}
                                                required
                                                id="form-end-time"
                                                minDate={coupon.start_time !== '' ? coupon.start_time : ''}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap input-radio-flex margin-vertical-15">
                                        {DISCOUNTYPE.map((type) => {
                                            return (
                                                <div
                                                    onClick={() => this.updateFormData({
                                                        target: {
                                                            name: 'discount_type',
                                                            value: type.id
                                                        }
                                                    })}
                                                    value={coupon.discount_type === type.id ? 'active' : ''}>
                                                    {type.name}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {DISCOUNTYPE.map((type) => {
                                        if (coupon.discount_type === type.id)
                                            return (
                                                <div className="position-relative">
                                                    <FormInputText
                                                        name="discount_value"
                                                        placeholder="0"
                                                        type="number"
                                                        className="input-no-arrows"
                                                        required
                                                        style={{"appearance": "textfield"}}
                                                        value={(coupon.discount_value || 0)}
                                                        updateFormData={this.updateFormData}
                                                    />
                                                    <div style={{position: 'absolute', right: 15, top: 10,}}>
                                                        {type.suffix}
                                                    </div>
                                                </div>
                                            );
                                    })}
                                    <label>Số lần sử dụng: </label>
                                    <div className="flex flex-wrap input-radio-flex margin-bottom-10">
                                        <div
                                            onClick={() => this.updateFormData({
                                                target: {
                                                    name: 'quantity',
                                                    value: -1
                                                }
                                            })}
                                            value={coupon.quantity === -1 ? 'active' : ''}>
                                            Không giới hạn
                                        </div>
                                        <div
                                            onClick={() => this.updateFormData({
                                                target: {
                                                    name: 'quantity',
                                                    value: 1
                                                }
                                            })}
                                            value={coupon.quantity === -1 ? '' : 'active'}>
                                            Giới hạn
                                        </div>

                                    </div>
                                    {coupon.quantity !== -1 &&
                                    <FormInputText
                                        name="quantity"
                                        type="number"
                                        minValue={1}
                                        placeholder="Nhập số lần sử dụng"
                                        required
                                        value={coupon.quantity || ""}
                                        updateFormData={this.updateFormData}
                                    />
                                    }

                                    <CheckBoxMaterial
                                        onChange={this.updateFormData}
                                        checked={coupon.shared}
                                        name="shared"
                                        label="Cho phép sử dụng cùng các mã khác"
                                    />
                                    <div style={{paddingLeft: "15px", marginTop: "20px"}}>
                                        <CirclePicker
                                            width="100%"
                                            color={coupon.color}
                                            onChangeComplete={this.changeColor}/>
                                    </div>

                                    <div style={{display: "flex"}}>
                                        <button style={{margin: "15px 5px 10px 0"}}
                                                className="btn btn-success width-50-percent"
                                                onClick={this.saveCoupons}>
                                            Lưu
                                        </button>

                                    </div>


                                </div>
                            ) : (
                                <div>
                                    {
                                        !showLoading && (
                                            <div>

                                                {!this.state.isCreate &&
                                                <a className="btn btn-add"
                                                   onClick={() => this.setState({
                                                       create: !this.state.create,
                                                       coupon: this.initState.coupon,
                                                   })}>
                                                    Thêm mã giảm giá mới
                                                    <i className="material-icons">add</i>
                                                </a>
                                                }


                                                <div className="kt-scroll">
                                                    {coupons && coupons
                                                        .filter(coupon => {
                                                            const s1 = coupon.name.trim().toLowerCase();
                                                            const s2 = this.state.search.trim().toLowerCase();
                                                            return s1.includes(s2) || s2.includes(s1);
                                                        })
                                                        .map((coupon) => {
                                                            let type = DISCOUNTYPE.filter(t => t.id == coupon.discount_type)[0] || {};
                                                            let text = `${coupon.name} (-${coupon.discount_value}${type.suffix})`;
                                                            return (
                                                                <div key={coupon.id} style={{
                                                                    marginBottom: 10,
                                                                    display: "flex",
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <div
                                                                        onClick={() => this.editCoupons(coupon)}
                                                                        className="btn"
                                                                        style={{
                                                                            backgroundColor: coupon.color,
                                                                            width: "calc(100% - 30px)",
                                                                            margin: "0",
                                                                            textAlign: 'left',
                                                                            height: 55,
                                                                            padding: '12px 15px',
                                                                        }}>

                                                                        <div><b>{text}</b></div>
                                                                        <div>{`Đã dùng ${coupon.used_quantity}/${coupon.quantity} - ${coupon.expired_in}`}</div>
                                                                    </div>
                                                                    <div className="board-action">
                                                                        <a onClick={() => this.editCoupons(coupon)}>
                                                                            <i style={{
                                                                                backgroundColor: coupon.color,
                                                                                color: 'white'
                                                                            }}
                                                                               className="material-icons">edit</i></a>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }


                    </div>
                </Overlay>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        coupons: state.discounts.discountsList,
        isLoadingCoupons: state.discounts.isLoading,
        isLoadedCoupons: state.discounts.isLoading,
        totalPages: state.discounts.totalPages,
        totalCount: state.discounts.totalCount,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        discountActions: bindActionCreators(discountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCouponOverlay);
