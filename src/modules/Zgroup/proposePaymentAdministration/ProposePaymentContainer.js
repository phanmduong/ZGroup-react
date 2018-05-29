import React from "react";
import {Link} from "react-router";
import * as PaymentActions from "./ProposePaymentActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../../components/common/Loading";
import PaymentList from './ProposePaymentList';
import InfoPaymentModal from './InfoProposePaymentModal';
import {Panel} from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from "prop-types";
import Pagination from "../../../components/common/Pagination";
import {DATE_FORMAT, DATETIME_FORMAT_SQL} from "../../../constants/constants";
import moment from "moment/moment";
import FormInputDate from "../../../components/common/FormInputDate";

class ProposePaymentContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            search: '',
            from: "",
            to: "",
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
        this.changeStatus = this.changeStatus.bind(this);
        this.changeFrom = this.changeFrom.bind(this);
        this.changeTo = this.changeTo.bind(this);
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
    changeStatus(id,status){
        this.props.PaymentActions.changeStatus(id,status,()=>this.props.PaymentActions.loadPayments(this.props.paginator.current_page));
    }
    changeFrom(e){
        this.setState({from: e.target.value});
        let from = moment(e.target.value, [DATETIME_FORMAT_SQL, DATE_FORMAT]).format(DATETIME_FORMAT_SQL);
        let to = moment(this.state.to, [DATETIME_FORMAT_SQL, DATE_FORMAT]).format(DATETIME_FORMAT_SQL);
        this.props.PaymentActions.loadPayments(this.props.paginator.current_page,this.state.receiver_id,this.state.payer_id,from,to);
    }
    changeTo(e){
        this.setState({to: e.target.value});
        let from = moment(this.state.from, [DATETIME_FORMAT_SQL, DATE_FORMAT]).format(DATETIME_FORMAT_SQL);
        let to = moment(e.target.value, [DATETIME_FORMAT_SQL, DATE_FORMAT]).format(DATETIME_FORMAT_SQL);
        let {current_page} = this.props.paginator;
        this.props.PaymentActions.loadPayments(current_page,this.state.receiver_id,this.state.payer_id,from,to);

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

                                    <div className="card-content">
                                        <div className="flex" style={{justifyContent: "space-between"}}>
                                            <div className="flex">

                                                <h4 className="card-title"><strong> Đề xuất thanh toán </strong>
                                                </h4>
                                                <div style={{
                                                    display: "inline-block"
                                                }}>
                                                    {/*<div className="dropdown">*/}
                                                    <Link
                                                        className="btn btn-rose btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                                        type="button"
                                                        data-toggle="tooltip"
                                                        rel="tootip"
                                                        title="Tạo thanh toán"
                                                        to="/administration/propose-payment/create"
                                                    >
                                                        <strong>+</strong>
                                                    </Link>
                                                    {/*</div>*/}
                                                    <button
                                                        className="btn btn-rose btn-primary btn-round btn-xs button-add none-margin"
                                                        data-toggle="tooltip"
                                                        rel="tooltip"
                                                        data-original-title="Lọc"
                                                        onClick={() => this.setState({openFilter: !this.state.openFilter})}
                                                        type="button">
                                                        <i className="material-icons"
                                                           style={{margin: "0px -4px", top: 0}}>filter_list</i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <Panel collapsible expanded={this.state.openFilter}>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <FormInputDate
                                                            format={DATE_FORMAT}
                                                            name="startTime"
                                                            id="from"
                                                            label="Từ ngày"
                                                            value={this.state.from}
                                                            updateFormData={this.changeFrom}/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FormInputDate
                                                            name="endTime"
                                                            format={DATE_FORMAT}
                                                            id="to"
                                                            label="Tới ngày"
                                                            value={this.state.to}
                                                            updateFormData={this.changeTo}/>
                                                    </div>
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
                                                    changeStatus={this.changeStatus}
                                                />
                                        }
                                        <div>
                                            <Pagination
                                                totalPages={this.props.paginator.total_pages}
                                                currentPage={this.props.paginator.current_page}
                                                loadDataPage={this.props.PaymentActions.loadPayments}
                                            />
                                        </div>
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

ProposePaymentContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProposePaymentContainer);