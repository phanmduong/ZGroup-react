import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import AddDiscountComponent from "./AddDiscountComponent";
import * as addDiscountActions from './addDiscountActions';
import * as helper from '../../helpers/helper';
import Loading from "../../components/common/Loading";

// import Search from '../../components/common/Search';


class AddDiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.discountId,
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.addDiscount = this.addDiscount.bind(this);
        this.loadDiscount = this.loadDiscount.bind(this);
        // this.loadCategories = this.loadCategories.bind(this);   Để dự phòng khi category phải chuyển sang select
    }

    componentWillMount() {
        let isEdit = this.props.params.discountId;
        if (isEdit) {
            this.loadDiscount();

        } else {
            this.resetDiscount();


        }// Chưa xử lí được ..........
        // Nếu muốn add phải xóa hết thông tin đã edit của lần trước
    }

    loadDiscount() {
        this.props.addDiscountActions.loadDiscount(this.props.params.discountId);
    }

    resetDiscount() {
        const discount = {
            name: '',
            description: '',
            discount_type: '',
            discount_value: '',
            type: '',
            used_for: '',
            start_time: '',
            end_time: '',
            order_value: '',
            good: {},
            category: {},
            customer: {},
        };
        this.props.addDiscountActions.updateDiscountFormData(discount);
    }


    // componentWillMount() {
    //     this.loadCategories();
    // }
    // loadCategories() {
    //     this.props.addDiscountActions.loadCategories();
    // }        Để dự phòng khi category phải chuyển sang select
    updateFormData(event) {
        const field = event.target.name;
        let discount = {...this.props.discount};
        discount[field] = event.target.value;
        this.props.addDiscountActions.updateDiscountFormData(discount);
    }

    addDiscount(e) {
        let isEdit;
        this.state.id ? isEdit = true : isEdit = false;
        if ($('#form-add-discount').valid()) {
            if (this.props.discount.start_time === null || this.props.discount.start_time === undefined || this.props.discount.start_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày bắt đầu", 'warning');
                return;
            }
            if (this.props.discount.name === null || this.props.discount.name === undefined || this.props.discount.name === '') {
                helper.showTypeNotification("Vui lòng nhập tên khuyến mãi", 'warning');  // Có thể không cần thiết
            }
            if (this.props.discount.end_time === null || this.props.discount.end_time === undefined || this.props.discount.end_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày kết thúc", 'warning');
            }
            else {
                isEdit ?
                    this.props.addDiscountActions.editDiscount(this.props.discount)
                    :
                    this.props.addDiscountActions.addDiscount(this.props.discount);
            }
        }
        e.preventDefault();
    }


    render() {
        return (
            <div>
                <div className="content">
                    <div className="container-fluid">
                        {this.props.isLoadingOut ? <Loading/> :
                            <div>
                                <AddDiscountComponent
                                    updateFormData={this.updateFormData}
                                    discount={this.props.discount}
                                    // categories={this.props.categories}
                                />
                                <div className="card-footer">
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: 20
                                    }}>
                                        <div>
                                            <button rel="tooltip" data-placement="top" title
                                                    data-original-title="Remove item"
                                                    className="btn btn-success btn-sm">
                                                <i className="material-icons">work</i> Phí vận chuyển
                                            </button>
                                            <button rel="tooltip" data-placement="top" title
                                                    data-original-title="Remove item" className="btn btn-info btn-sm">
                                                <i className="material-icons">card_giftcard</i> Giảm giá
                                            </button>
                                            <button rel="tooltip" data-placement="top" title
                                                    data-original-title="Remove item" className="btn btn-danger btn-sm">
                                                <i className="material-icons">attach_money</i> Thanh toán
                                            </button>
                                        </div>
                                        <div>
                                            {this.props.isSaving ?
                                                <button
                                                    className="btn btn-sm btn-success disabled"
                                                >
                                                    <i className="fa fa-spinner fa-spin"/>
                                                    Đang cập nhật
                                                </button>
                                                :
                                                <button className="btn btn-success btn-sm"
                                                        onClick={(e) => this.addDiscount(e)}>
                                                    <i className="material-icons">save</i> Lưu
                                                </button>
                                            }
                                            <button data-original-title="Remove item" className="btn btn-danger btn-sm"
                                                    onClick={() => this.resetDiscount()}>
                                                <i className="material-icons">cancel</i> Huỷ
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

AddDiscountContainer.propTypes = {
    addDiscountActions: PropTypes.object,
    discount: PropTypes.object,
    isSaving: PropTypes.bool,
    isLoadingOut: PropTypes.bool,
    // categories: PropTypes.object,
};

function mapStateToProps(state) {

    return {
        addDiscount: state.addDiscount,
        discount: state.addDiscount.discount,
        isSaving: state.addDiscount.isSaving,
        isLoadingOut: state.addDiscount.isLoadingOut,
        // categories: state.addDiscount.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addDiscountActions: bindActionCreators(addDiscountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDiscountContainer);