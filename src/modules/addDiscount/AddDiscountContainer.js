import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import AddDiscountComponent from "./AddDiscountComponent";
import * as addDiscountActions from './addDiscountActions';
import * as helper from '../../helpers/helper';
// import Loading from "../../components/common/Loading";
// import Search from '../../components/common/Search';
// import {CUSTOMTYPE} from '../../constants/constants';



class AddDiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateFormData = this.updateFormData.bind(this);
        this.addDiscount = this.addDiscount.bind(this);

    }
    updateFormData(event) {
        const field = event.target.name;
        let discount = {...this.props.discount};
        discount[field] = event.target.value;
        this.props.addDiscountActions.updateDiscountFormData(discount);
    }

    addDiscount(e){
        if ($('#form-add-discount').valid()) {
            if (this.props.discount.start_time === null || this.props.discount.start_time === undefined || this.props.discount.start_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày bắt đầu", 'warning');
                return;
            }
            if (this.props.discount.end_time === null || this.props.discount.end_time === undefined || this.props.discount.end_time === '') {
                helper.showTypeNotification("Vui lòng chọn ngày kết thúc", 'warning');
            }
            else {
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
                        <div>
                            <AddDiscountComponent
                                updateFormData = {this.updateFormData}
                                discount = {this.props.discount}
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
                                                data-original-title="Remove item" className="btn btn-success btn-sm">
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
                                        <button rel="tooltip" data-placement="top" title
                                                data-original-title="Remove item" className="btn btn-danger btn-sm">
                                            <i className="material-icons">cancel</i> Huỷ
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddDiscountContainer.propTypes = {
    addDiscountActions: PropTypes.object,
    discount : PropTypes.object,
    isSaving : PropTypes.bool,

};

function mapStateToProps(state) {
    return {
        addDiscount: state.addDiscount,
        discount : state.addDiscount.discount,
        isSaving : state.addDiscount.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addDiscountActions: bindActionCreators(addDiscountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDiscountContainer);