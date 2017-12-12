import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as importGoodActions from '../importGoodActions';
import Loading from '../../../components/common/Loading';
import * as helper from '../../../helpers/helper';
import FormInputText from "../../../components/common/FormInputText";
import ReactSelect from "react-select";
import {PAYMENT} from "../../../constants/constants";

import PropTypes from 'prop-types';

class HistoryPaid extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1,
            paidMoney: {
                money: 0,
                note: '',
                payment: ''
            }
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changePayment = this.changePayment.bind(this);
    }

    componentWillMount() {
        this.props.importGoodActions.getHistoryPaid(this.props.importGoodId);
    }

    changeTab(tab) {
        this.setState({
            tab: tab
        });
    }

    updateFormData(event) {
        const field = event.target.name;
        let paidMoney = {...this.state.paidMoney};
        if (field == 'money') {
            if (!isNaN(Number(event.target.value.toString().replace(/\./g, "")))) {
                paidMoney[field] = Number(event.target.value.toString().replace(/\./g, ""));
            }
        } else {
            paidMoney[field] = event.target.value;
        }

        this.setState({paidMoney: paidMoney});
    }

    payment(payment) {
        switch (payment) {
            case "cash":
                return "Tiền mặt";
            case "transfer":
                return "Chuyển tiền";
            case "credit":
                return "Thẻ";
            default:
                return "Không có";
        }
    }

    renderHistory() {
        if (this.props.isLoading) {
            return (
                <Loading/>
            );
        } else
            return (
                <div className="material-datatables">
                    <table id="imported-goods-table" className="table" width="100%">
                        <thead>
                        <tr className="text-rose">
                            <th>STT</th>
                            <th>Nhân viên thu tiền</th>
                            <th>Ngày thu</th>
                            <th>Phương thức</th>
                            <th>Ghi chú</th>
                            <th>Số tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.historyPaidMoney.map((history, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{history.staff ? history.staff.name : "Không có"}</td>
                                        <td>{history.created_at}</td>
                                        <td>{this.payment(history.payment)}</td>
                                        <td>{history.note}</td>
                                        <td>{helper.dotNumber(history.money)} đ</td>
                                    </tr>
                                );
                            })
                        }

                        </tbody>
                    </table>
                </div>
            );
    }

    changePayment(value) {
        let payment = value && value.value ? value.value : "";
        this.setState({
            paidMoney: {
                ...this.state.paidMoney,
                payment: payment
            }
        });
    }

    savePaidMoney() {
        if (this.state.paidMoney.money > this.props.importOrder.debt) {
            helper.showTypeNotification("Bạn đã nhập vượt quá số tiền còn nợ", "warning");
            return;
        }
        this.props.importGoodActions.addPaidMoney(this.state.paidMoney, this.props.importGoodId, this.props.closeModal);
    }

    renderPaidMoney() {
        return (
            <div>
                <form id="form-store-paid-money" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <FormInputText
                        label="Số tiền thanh toán"
                        name="money"
                        updateFormData={this.updateFormData}
                        value={helper.dotNumber(this.state.paidMoney.money)}
                    />
                    <FormInputText
                        label="Ghi chú"
                        name="note"
                        updateFormData={this.updateFormData}
                        value={this.state.paidMoney.note}
                    />
                    <div className="form-group">
                        <label className="label-control">Phương thức thanh toán</label>
                        <ReactSelect
                            name="form-field-name"
                            value={this.state.paidMoney.payment}
                            options={PAYMENT}
                            onChange={this.changePayment}
                            placeholder="Chọn phương thức"
                        />
                    </div>
                    {this.props.isSavingPaidMoney ?
                        (
                            <button
                                className="btn btn-fill btn-rose disabled"
                            >
                                <i className="fa fa-spinner fa-spin"/>
                                {' Đang thêm'}
                            </button>
                        )
                        :
                        (
                            <button
                                className="btn btn-fill btn-rose"
                                onClick={() => this.savePaidMoney()}
                            >
                                Thêm
                            </button>
                        )
                    }
                </form>
            </div>
        );
    }

    render() {
        return (
            <div className="card">
                <div className="card-header card-header-tabs" data-background-color="rose">
                    <div className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                            <ul className="nav nav-tabs" data-tabs="tabs">
                                <li className={this.state.tab === 1 ? "active" : ''}>
                                    <a onClick={() => this.changeTab(1)}>
                                        Lịch sử thanh toán
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                                <li className={this.state.tab === 2 ? "active" : ''}>
                                    <a onClick={() => this.changeTab(2)}>
                                        Thêm thanh toán
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-content">
                    <div className="tab-content">
                        {
                            this.state.tab === 1 ?
                                (
                                    this.renderHistory()
                                )
                                :
                                (
                                    this.renderPaidMoney()
                                )
                        }
                    </div>

                </div>
            </div>
        );

    }
}

HistoryPaid.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSavingPaidMoney: PropTypes.bool.isRequired,
    importOrder: PropTypes.object.isRequired,
    importGoodActions: PropTypes.object.isRequired,
    historyPaidMoney: PropTypes.number.isRequired,
    importGoodId: PropTypes.number.isRequired,
    closeModal: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        historyPaidMoney: state.importGoods.importGood.historyPaidMoney,
        isLoading: state.importGoods.importGood.isLoadingHistoryPaid,
        isSavingPaidMoney: state.importGoods.isSavingPaidMoney,
        importOrder: state.importGoods.importGood.importOrder,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPaid);
