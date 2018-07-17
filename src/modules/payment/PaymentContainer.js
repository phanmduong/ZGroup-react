import React from "react";
import { Link } from "react-router";
import * as PaymentActions from "./PaymentActions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from "../../components/common/Loading";
import PaymentList from './PaymentList';
import InfoPaymentModal from './InfoPaymentModal';
import Select from 'react-select';
import PropTypes from "prop-types";
import Pagination from "../../components/common/Pagination";
import TooltipButton from '../../components/common/TooltipButton';
import { Modal, Panel } from "react-bootstrap";
import {
    newWorkBook,
    appendArrayToWorkBook,
    saveWorkBookToExcel,
    renderExcelColumnArray,
    showErrorMessage,
    dotNumber,
} from "../../helpers/helper";
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL } from "../../constants/constants";


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
            showLoadingModal: false,
        };
        this.loadPayments = this.loadPayments.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.changeCompanies = this.changeCompanies.bind(this);
        this.selectedReceiver = this.selectedReceiver.bind(this);
        this.selectedPayer = this.selectedPayer.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
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
        this.setState({ showInfoModal: true, payment: payment, });
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
        this.setState({ receiver_id: value });
        this.props.PaymentActions.loadPayments(1, value, this.state.payer_id);

    }

    selectedPayer(e) {
        let value = e ? e.value : "";
        this.setState({ payer_id: value });
        this.props.PaymentActions.loadPayments(1, this.state.receiver_id, value);

    }

    changeStatus(id, status) {
        this.props.PaymentActions.changeStatus(id, status, () => this.props.PaymentActions.loadPayments(this.props.paginator.current_page));
    }

    closeInfoModal() {
        this.setState({ showInfoModal: false });
    }
    openLoadingModal = () => {
        this.setState({ showLoadingModal: true });
        this.props.PaymentActions.loadPaymentsNoPaging(this.exportExcel);
    }

    exportExcel = (input) => {
        if (!input || input.length == 0) {
            showErrorMessage("Không có dữ liệu");
            this.setState({ showLoadingModal: false });
            return;
        }
        
        let wb = newWorkBook();
        let data = [];
        let cols = renderExcelColumnArray([15, 25, 25, 25, 25, 25, 25, 25, 25]);//độ rộng cột  
        const head = ['STT', 'Bên gửi', 'Bên nhận', 'Số tiền', 'Nội dung', 'Link ảnh hoá đơn', 'Ngày tạo'];
        

        data = input.map((item, index) => {
            let tm = moment(item.created_at ? item.created_at : "", [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
            /* eslint-disable */
            let res = [
                index + 1,
                item.payer ? item.payer.name : 'Không có',
                item.receiver ? item.receiver.name : 'Không có',
                item.money_value ? dotNumber(item.money_value) : '0',
                item.description ? item.description : '',
                item.bill_image_url ? item.bill_image_url : 'Không có',
                tm,
            ];
            /* eslint-enable */
            return res;
        });
        data = [head, ...data];
        appendArrayToWorkBook(data, wb, "Danh sách hoá đơn", cols,);

        //xuất file
        saveWorkBookToExcel(wb, 'Danh sách hoá đơn');

        this.setState({ showLoadingModal: false });
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
                    <Modal
                        show={this.state.showLoadingModal}
                        onHide={() => { }}>
                        <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                        <Modal.Body><Loading /></Modal.Body>
                    </Modal>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card">

                                    <div className="card-content">
                                        {/* <div className="flex" style={{ justifyContent: "space-between" }}>
                                            <div className="flex">

                                                <h4 className="card-title"><strong> Quản lý danh sách hóa đơn </strong>
                                                </h4>
                                                <div style={{
                                                    display: "inline-block"
                                                }}>
                                                  
                                                    <Link
                                                        className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                                        type="button"
                                                        data-toggle="tooltip"
                                                        rel="tootip"
                                                        title="Tạo thanh toán"
                                                        to="/business/company/payment/create"
                                                    >
                                                        <strong>+</strong>
                                                    </Link>
                                                  
                                                    <button
                                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                        data-toggle="tooltip"
                                                        rel="tooltip"
                                                        data-original-title="Lọc"
                                                        onClick={() => this.setState({ openFilter: !this.state.openFilter })}
                                                        type="button">
                                                        <i className="material-icons"
                                                            style={{ margin: "0px -4px", top: 0 }}>filter_list</i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <div className="flex-row flex">
                                                <h4 className="card-title"><strong> Danh sách hóa đơn </strong></h4>

                                                <div>
                                                    <Link to="/business/company/payment/create" className="btn btn-rose btn-round btn-xs button-add none-margin">
                                                        <strong>+</strong>
                                                    </Link>

                                                </div>
                                                <div>
                                                    <TooltipButton text="Lọc" placement="top">
                                                        <button
                                                            className="btn btn-rose"
                                                            onClick={() => this.setState({ openFilter: !this.state.openFilter })}
                                                            style={{
                                                                borderRadius: 30,
                                                                padding: "0px 11px",
                                                                margin: "-1px 10px",
                                                                minWidth: 25,
                                                                height: 25,
                                                                width: "55%",
                                                            }}
                                                        >
                                                            <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -12, marginTop: -10 }}
                                                            >filter_list</i>
                                                        </button>
                                                    </TooltipButton>
                                                </div>
                                            </div>

                                            <div className="flex-end">
                                                <div>
                                                    <TooltipButton text="Xuất thành file excel" placement="top">
                                                        <button
                                                            className="btn btn-rose"
                                                            onClick={this.openLoadingModal}
                                                            style={{
                                                                borderRadius: 30,
                                                                padding: "0px 11px",
                                                                margin: "-1px 10px",
                                                                minWidth: 25,
                                                                height: 25,
                                                                width: "55%",
                                                            }}
                                                        >
                                                            <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -11, marginTop: -10 }}
                                                            >file_download</i>
                                                        </button>
                                                    </TooltipButton>
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
                                            this.props.isLoadingPayments ? <Loading /> :
                                                <PaymentList
                                                    data={this.props.data || []}
                                                    user={this.props.user || {}}
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

PaymentContainer.propTypes = {
    PaymentActions: PropTypes.object.isRequired,
    isLoadingPayments: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    company: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingPayments: state.payment.isLoadingPayments,
        data: state.payment.listPayment,
        paginator: state.payment.paginator,
        company: state.payment.company,
        summary_money: state.payment.summary_money,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        PaymentActions: bindActionCreators(PaymentActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);