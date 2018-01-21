import React from "react";
import ReactSelect from 'react-select';
import * as PaymentActions from "../payment/PaymentActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";

class CreatePaymentContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.changeCompanies = this.changeCompanies.bind(this);
    }
    componentWillMount() {
        helper.setFormValidation('#form-payment');
        this.props.PaymentActions.loadCompanies();
        if(this.props.params.paymentId)
            this.props.PaymentActions.loadPayment(this.props.params.paymentId);
        else this.props.PaymentActions.resetDataPayment();

    }
    changeCompanies(){

    }
    render(){
        return(
            <div className="content">
                <form role="form" id="form-payment" onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">home</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Lưu trữ hóa đơn</h4>
                                    <div className="row">{
                                        (this.props.isLoadingCompanies) ? <Loading />:
                                        <div className="col-md-6">
                                            <label>
                                                Bên gửi
                                            </label>
                                            <ReactSelect
                                                required
                                                disabled={false}
                                                options={this.changeCompanies()}
                                                onChange={this.updateFormDataType}
                                                value={this.props.data.payer.id || ""}
                                                defaultMessage="Tuỳ chọn"
                                                name="payer"
                                            />
                                        </div>
                                    }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isSavingPayment: state.payment.isSavingPayment,
        isLoadingCompanies: state.payment.isLoadingCompanies,
        companies: state.payment.company,
        data: state.payment.payment,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        PaymentActions: bindActionCreators(PaymentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (CreatePaymentContainer);