import React from "react";
import {Link} from "react-router";
import * as PaymentActions from "./PaymentActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import _ from 'lodash';
import PaymentList from './PaymentList';
import InfoPaymentModal from './InfoPaymentModal';
import Search from "../../components/common/Search";
import PropTypes from "prop-types";
class PaymentContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state ={
            page: 1,
            search: '',
            paginator: {
                current_page: 1,
                limit: 5,
                total_pages: 1,
                total_count: 1
            },
            showInfoModal: false,
            payment: {
                payer:{
                    id: 0,
                    account_number:""
                },
                receiver:{
                    id: 0,
                    account_number:""
                }
            },
        };
        this.loadPayments = this.loadPayments.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.searchPayment = this.searchPayment.bind(this);

    }
    componentWillMount() {
         this.props.PaymentActions.loadPayments();
    }
    loadPayments(page = 1) {
        this.setState({
           page: page,
        });
        this.props.PaymentActions.loadPayments(page);
    }
    openInfoModal(payment) {
        this.setState({showInfoModal: true, payment: payment,});
    }

    closeInfoModal() {
        this.setState({showInfoModal: false});
    }
    searchPayment(value){
        this.setState({
            page: 1,
            search: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.PaymentActions.loadPayments(1,value);
        }.bind(this), 500);

    }
    render(){
        return(
            <div className="content">
                <InfoPaymentModal
                    show={this.state.showInfoModal}
                    onHide={this.closeInfoModal}
                    data={this.state.payment}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">home</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Quản lý danh sách hóa đơn</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-3">
                                                <Link className="btn btn-rose" to="/business/company/payment/create">
                                                    <i className="material-icons keetool-card">add</i>
                                                    Tạo hóa đơn
                                                </Link>
                                            </div>
                                            <Search
                                                className="col-md-9"
                                                placeholder="Tìm kiếm theo công ty"
                                                value={this.state.search}
                                                onChange={this.searchPayment}
                                            />
                                        </div>
                                    </div>
                                    {
                                        this.props.isLoadingPayments ? <Loading />:
                                        <PaymentList
                                            data={this.props.data || []}
                                            openInfoModal={this.openInfoModal}
                                        />
                                    }
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.paginator.total_pages + 1).map(page => {

                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => {
                                                            this.loadPayments(page);
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => {
                                                            this.loadPayments(page);
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
PaymentContainer.propTypes ={
    PaymentActions: PropTypes.object.isRequired,
    isLoadingPayments: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        isLoadingPayments: state.payment.isLoadingPayments,
        data: state.payment.payment,
        paginator: state.payment.paginator,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        PaymentActions: bindActionCreators(PaymentActions, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (PaymentContainer);