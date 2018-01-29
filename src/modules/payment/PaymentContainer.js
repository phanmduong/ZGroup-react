import React from "react";
import {Link} from "react-router";
import * as PaymentActions from "./PaymentActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import _ from 'lodash';
import FormInputDate from "../../components/common/FormInputDate";
import PaymentList from './PaymentList';
import InfoPaymentModal from './InfoPaymentModal';
import {Panel} from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from "prop-types";
import * as helper from "../../helpers/helper";

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
            company_id: "",
            time:{
              startTime: '',
              endTime: '',
            },
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
        this.selectedCompany = this.selectedCompany.bind(this);
        this.updateFormDate = this.updateFormDate.bind(this);
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

    selectedCompany(e) {
        let value = e ? e.value :"";
        this.setState({company_id: value});
        this.props.PaymentActions.loadPayments(1,value);

    }
    updateFormDate(event){
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;
        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.PaymentActions.loadPayments(
                1,
                this.state.company_id,
                time.startTime,
                time.endTime,
            );
            this.setState({
                time: time,
                page: 1
            });
        } else {
            this.setState({
                time: time,
                page: 1
            });
        }
    }
    closeInfoModal() {
        this.setState({showInfoModal: false});
    }

    render() {
        return (
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
                                            <div className="col-md-7">
                                            </div>
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
                                                <div className="col-md-3">
                                                    <label>
                                                        Tìm kiếm theo công ty
                                                    </label>
                                                    <Select
                                                        options={this.changeCompanies()}
                                                        value={this.state.company_id}
                                                        onChange={this.selectedCompany}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <FormInputDate
                                                        label="Từ ngày"
                                                        name="startTime"
                                                        updateFormData={this.updateFormDate}
                                                        id="form-start-time"
                                                        value={this.state.time.startTime}
                                                        maxDate={this.state.time.endTime}
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <FormInputDate
                                                        label="Đến ngày"
                                                        name="endTime"
                                                        updateFormData={this.updateFormDate}
                                                        id="form-end-time"
                                                        value={this.state.time.endTime}
                                                        minDate={this.state.time.startTime}
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

PaymentContainer.propTypes = {
    PaymentActions: PropTypes.object.isRequired,
    isLoadingPayments: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
    summary_money: PropTypes.number.isRequired,
    company: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingPayments: state.payment.isLoadingPayments,
        data: state.payment.payment,
        paginator: state.payment.paginator,
        summary_money: state.payment.summary_money,
        company: state.payment.company,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        PaymentActions: bindActionCreators(PaymentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);