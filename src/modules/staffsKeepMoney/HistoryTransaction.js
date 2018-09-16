import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as staffKeepMoneyActions from './staffKeepMoneyActions';
import {dotNumber} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import {TYPE_TRANSACTION} from "../../constants/constants";
import ReactSelect from 'react-select';
import PropTypes from "prop-types";

class HistoryTransaction extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            type: ""
        };
        this.changeType = this.changeType.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    loadData(page = 1) {
        this.setState({page});
        this.props.staffKeepMoneyActions.loadHistoryTransactionStaff(this.props.staff.id, page, this.state.type);
    }

    changeType(value) {
        let type = value && value.value ? value.value : "";
        this.setState({type: type, page: 1});
        this.props.staffKeepMoneyActions.loadHistoryTransactionStaff(this.props.staff.id, 1, type);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">Lịch sử giao dịch</h4>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="label-control">Tìm theo loại giao dịch</label>
                                <ReactSelect
                                    name="form-field-status"
                                    value={this.state.type}
                                    options={TYPE_TRANSACTION}
                                    onChange={this.changeType}
                                    placeholder="Chọn loại giao dịch"
                                />
                            </div>
                        </div>
                    </div>
                    {this.props.isLoading ?
                        <Loading/>
                        :
                        <div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-rose">
                                    <tr>
                                        <th>Loại giao dịch</th>
                                        <th>Lý do</th>
                                        <th>Ngày giờ</th>
                                        <th>Số tiền trước giao dịch</th>
                                        <th className="text-center">Số tiền</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.transactions.map((transaction) => {
                                            const classType = transaction.type === 0 ? " btn-info " :
                                                transaction.type == 1 ? " btn-success " : " btn-danger ";
                                            const textType = transaction.type === 0 ? "Chuyển tiền" :
                                                transaction.type == 1 ? "Thu" : "Chi";
                                            let classStatus;
                                            let textStatus;

                                            if (transaction.type == 1 || (transaction.type == 0 && transaction.receiver_id == this.props.staff.id)) {
                                                classStatus = " btn-success ";
                                                textStatus = "+";
                                            } else if (transaction.type == 2 || (transaction.type == 0 && transaction.sender_id == this.props.staff.id)) {
                                                classStatus = " btn-danger ";
                                                textStatus = "-";
                                            }

                                            return (
                                                <tr key={transaction.id}>
                                                    <td>
                                                        <button
                                                            className={classType + "btn btn-sm width-100 bold"}>
                                                            {textType}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        {transaction.note}
                                                    </td>
                                                    <td>{transaction.updated_at}</td>
                                                    <td className="text-align-right">
                                                        {dotNumber(transaction.before_money)}đ
                                                    </td>
                                                    <td>
                                                        <button
                                                            className={classStatus + "btn width-100 btn-sm bold lowercase"}>
                                                            {textStatus + dotNumber(transaction.money)}đ
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    <Pagination
                        totalPages={this.props.totalPages}
                        currentPage={this.state.page}
                        loadDataPage={(page) => this.loadData(page)}
                    />
                </div>
            </div>
        );
    }
}

HistoryTransaction.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    staffKeepMoneyActions: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    staff: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.staffKeepMoney.historyTransaction.isLoading,
        transactions: state.staffKeepMoney.historyTransaction.transactions,
        totalPages: state.staffKeepMoney.historyTransaction.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffKeepMoneyActions: bindActionCreators(staffKeepMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTransaction);