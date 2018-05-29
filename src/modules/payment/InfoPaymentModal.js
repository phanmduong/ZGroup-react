import React from "react";
import ReactSelect from 'react-select';
import FormInputText from "../../components/common/FormInputText";
import {Modal} from 'react-bootstrap';
import {bindActionCreators} from "redux";
import * as PaymentActions from "./PaymentActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loading from "../../components/common/Loading";

class InfoPaymentModal extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.changeCompanies = this.changeCompanies.bind(this);
    }
    componentWillMount() {
        this.props.PaymentActions.loadCompanies();
    }
    changeCompanies() {
        let data = [];
        data = this.props.companies.map((company) => {
            return {
                value: company.id,
                label: company.name,
                account_number: company.account_number,
            };
        });
        return data;

    }
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <div className="content">
                        <form role="form" id="form-payment" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">


                                        <div className="card-content">
                                            <h4 className="card-title"><strong>Thông tin hóa đơn </strong></h4>
                                            <div className="row">{
                                                (this.props.isLoadingCompanies) ? <Loading/> :
                                                    <div>
                                                        <div className="col-md-6">
                                                            <label>
                                                                Bên gửi
                                                            </label>
                                                            <ReactSelect
                                                                required
                                                                options={this.changeCompanies()}
                                                                disabled
                                                                value={this.props.data.payer.id || ""}
                                                                defaultMessage="Tuỳ chọn"
                                                                name="payer"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số tài khoản"
                                                                type="text"
                                                                name="stk2"
                                                                value={this.props.data.payer.account_number || ""}

                                                            />

                                                        </div>
                                                        <div className="col-md-6">
                                                            <label>
                                                                Bên nhận
                                                            </label>
                                                            <ReactSelect
                                                                required
                                                                disabled
                                                                options={this.changeCompanies()}
                                                                value={this.props.data.receiver.id || ""}
                                                                defaultMessage="Tuỳ chọn"
                                                                name="receiver"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số tài khoản"
                                                                type="text"
                                                                name="stk"
                                                                disabled
                                                                value={this.props.data.receiver.account_number || ""}

                                                            />

                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Số tiền"
                                                                type="text"
                                                                disabled
                                                                required
                                                                name="money_value"
                                                                value={this.props.data.money_value || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Nội dung"
                                                                type="text"
                                                                name="description"
                                                                disabled
                                                                value={this.props.data.description || ""}

                                                            />
                                                        </div>

                                                    </div>


                                            }</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-content">
                                            <h4 className="card-title">Bút toán</h4>

                                            {
                                                 (
                                                    <div>
                                                        <div style={{
                                                            maxWidth: "100%",
                                                            lineHeight: "250px",
                                                            marginBottom: "10px",
                                                            textAlign: "center",
                                                            verticalAlign: "middle",
                                                            boxShadow: " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                            border: "0 none",
                                                            display: "inline-block"
                                                        }}>
                                                            <a href={this.props.data.bill_image_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                               target="_blank"
                                                            >
                                                                <img
                                                                    src={this.props.data.bill_image_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                                    style={{
                                                                        lineHeight: "164px",
                                                                        height: "auto",
                                                                        maxWidth: "100%",
                                                                        maxHeight: "100%",
                                                                        display: "block",
                                                                        marginRight: "auto",
                                                                        marginLeft: "auto",
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: "center",
                                                                        borderRadius: "4px",
                                                                    }}/>
                                                            </a>
                                                        </div>


                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
InfoPaymentModal.propTypes = {
    PaymentActions: PropTypes.object.isRequired,
    isLoadingCompanies: PropTypes.bool,
    companies: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func,
};
function mapStateToProps(state) {
    return {
        isLoadingCompanies: state.payment.isLoadingCompanies,
        companies: state.payment.company,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        PaymentActions: bindActionCreators(PaymentActions, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(InfoPaymentModal);