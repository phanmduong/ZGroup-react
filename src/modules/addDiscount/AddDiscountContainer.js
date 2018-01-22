import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import AddDiscountComponent from "./AddDiscountComponent";
import * as addDiscountActions from './addDiscountActions';
import * as helper from '../../helpers/helper';
import Loading from "../../components/common/Loading";
import {browserHistory} from 'react-router';

// import Search from '../../components/common/Search';


class AddDiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.discountId,
            discount : props.addDiscount.discount};
        this.updateFormData = this.updateFormData.bind(this);
        this.addDiscount = this.addDiscount.bind(this);
        this.loadDiscount = this.loadDiscount.bind(this);
        this.resetDiscount = this.resetDiscount.bind(this);
        this.generateCode = this.generateCode.bind(this);
        this.changeQuantityInProps = this.changeQuantityInProps.bind(this);
        // this.loadCategories = this.loadCategories.bind(this);   Để dự phòng khi category phải chuyển sang select
    }

    componentWillMount() {
        let route = document.location.pathname;
        if (route === '/good/discount/add') {
            this.resetDiscount();
        } else {
            this.loadDiscount(this.props.params.discountId);
        }
    }

    componentDidMount(){
        if (document.location.pathname === '/good/discount/add' ) {
            this.resetDiscount();
        }
    }
    loadDiscount(discountId) {
        this.props.addDiscountActions.loadDiscount(discountId);
    }
    changeQuantityInProps(i){
        const field = 'quantity';
        let discount = {...this.props.discount};
        discount[field] = i;
        this.props.addDiscountActions.updateDiscountFormData(discount);
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
            quantity : 0,
            good: {},
            category: {},
            customer: {},
            customer_group: {},
            shared : '',
        };
        if (document.location.pathname === '/good/discount/add' ) {
            this.setState({discount:discount});
        }
        this.props.addDiscountActions.updateDiscountFormData(this.state.discount);
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
            if (this.props.discount.type === null || this.props.discount.type === undefined || this.props.discount.type === '') {
                helper.showTypeNotification("Vui lòng chọn chương trình khuyến mãi", 'warning');
                return;
            }
            if (this.props.discount.name === null || this.props.discount.name === undefined || this.props.discount.name === '') {
                helper.showTypeNotification("Vui lòng nhập tên khuyến mãi", 'warning');
                return;
            }
            if (this.props.discount.start_time === null || this.props.discount.start_time === undefined || this.props.discount.start_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày bắt đầu", 'warning');
                return;
            }
            if (this.props.discount.end_time === null || this.props.discount.end_time === undefined || this.props.discount.end_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày kết thúc", 'warning');
                return;
            }
            if (this.props.discount.shared === null || this.props.discount.shared === undefined || this.props.discount.shared === '') {
                helper.showTypeNotification("Vui lòng chọn cách dùng", 'warning');
                return;
            }
            if (this.props.discount.end_time < this.props.discount.start_time) {
                helper.showTypeNotification("Vui lòng xem lại ngày", 'warning');
                return;
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
    generateCode(){
        this.props.addDiscountActions.generateCode();
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
                                    generateCode = {this.generateCode}
                                    changeQuantityInProps = {this.changeQuantityInProps}
                                />
                                <div className="card-footer">
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row-reverse',
                                        marginBottom: 70,
                                    }}>
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
                                            <button className="btn btn-info btn-sm"
                                                    onClick={() => this.resetDiscount()}>
                                                <i className="material-icons">cached</i> Reset
                                            </button>
                                            <button className="btn btn-danger btn-sm"
                                                    onClick={(e) => {
                                                        browserHistory.push("/good/discount");
                                                        e.preventDefault();
                                                    }}>
                                                <i className="material-icons">cancel</i> Hủy
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
    addDiscount: PropTypes.object,
    isSaving: PropTypes.bool,
    isLoadingOut: PropTypes.bool,
    params : PropTypes.object,
    discountId : PropTypes.number,
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