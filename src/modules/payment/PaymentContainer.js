import React from "react";
import {Link} from "react-router";
import * as PaymentActions from "./PaymentActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import _ from 'lodash';
import PaymentList from './PaymentList';
import InfoPaymentModal from './InfoPaymentModal';
import {Panel} from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from "prop-types";

class PaymentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            search: '',
            paginator: {
                current_page: 1,
                limit: 5,
                total_pages: 1,
                total_count: 1
            },
            showInfoModal: false,
            openFilter: false,
            receiver_id: "",
            payer_id: "",
            type: "",
            payment: {
                payer: {
                    id: 0,
                    account_number: ""
                },
                receiver: {
                    id: 0,
                    account_number: ""
                }
            },
        };
        this.loadPayments = this.loadPayments.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.changeCompanies = this.changeCompanies.bind(this);
        this.selectedReceiver = this.selectedReceiver.bind(this);
        this.selectedPayer = this.selectedPayer.bind(this);
    }

    componentWillMount() {
        this.props.PaymentActions.loadPayments();
        this.props.PaymentActions.loadCompanies();
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

    changeCompanies() {
        let data = [];
        data = this.props.company.map((company) => {
            return {
                value: company.id,
                label: company.name,
            };
        });
        return data;

    }

    selectedReceiver(e) {
        let value = e ? e.value : "";
        this.setState({receiver_id: value});
        this.props.PaymentActions.loadPayments(1, value, this.state.payer_id);

    }

    selectedPayer(e) {
        let value = e ? e.value : "";
        this.setState({payer_id: value});
        this.props.PaymentActions.loadPayments(1, this.state.receiver_id, value);

    }


    closeInfoModal() {
        this.setState({showInfoModal: false});
    }

    render() {
        return (
            <div>
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
                                                    <Link className="btn btn-rose"
                                                          to="/business/company/payment/create">
                                                        <i className="material-icons keetool-card">add</i>
                                                        Tạo hóa đơn
                                                    </Link>
                                                </div>
                                                <div className="col-md-7"/>
                                                <div className="col-md-2">
                                                    <button className="btn btn-info btn-rose"
                                                            onClick={() => this.setState({openFilter: !this.state.openFilter})}>
                                                        <i className="material-icons">filter_list</i>
                                                        Lọc
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <Panel collapsible expanded={this.state.openFilter}>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label>
                                                            Tìm kiếm theo công ty gửi
                                                        </label>
                                                        <Select
                                                            options={this.changeCompanies()}
                                                            value={this.state.payer_id}
                                                            onChange={this.selectedPayer}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label>
                                                            Tìm kiếm theo công ty nhận
                                                        </label>
                                                        <Select
                                                            options={this.changeCompanies()}
                                                            value={this.state.receiver_id}
                                                            onChange={this.selectedReceiver}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel>

                                        {
                                            this.props.isLoadingPayments ? <Loading/> :
                                                <PaymentList
                                                    data={this.props.data || []}
                                                    openInfoModal={this.openInfoModal}
                                                    changeStatus={this.props.PaymentActions.changeStatus}
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
            </div>
        );
    }
}

PaymentContainer.propTypes = {
    PaymentActions: PropTypes.object.isRequired,
    isLoadingPayments: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
    company: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingPayments: state.payment.isLoadingPayments,
        data: state.payment.listPayment,
        paginator: state.payment.paginator,
        company: state.payment.company,
        summary_money: state.payment.summary_money,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        PaymentActions: bindActionCreators(PaymentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);