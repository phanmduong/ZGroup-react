import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as spendMoneyActions from './spendMoneyActions';
import {dotNumber} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";

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
        this.props.spendMoneyActions.loadHistoryTransactions(page, this.state.type);
    }

    changeType(value) {
        if (value != this.state.type) {
            this.setState({type: value, page: 1});
            this.props.spendMoneyActions.loadHistoryTransactions(1, value);
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">Lịch sử thu/chi</h4>
                    <div>
                        <button className={"btn btn-round margin-right-10" + (this.state.type == "" ? " btn-rose" : "")}
                                onClick={() => this.changeType("")}
                        >
                            Tất cả
                        </button>
                        <button
                            className={"btn btn-round margin-right-10 margin-left-20" + (this.state.type == "1" ? " btn-rose" : "")}
                            onClick={() => this.changeType("1")}
                        >
                            Thu
                        </button>
                        <button
                            className={"btn btn-round margin-left-20" + (this.state.type == "2" ? " btn-rose" : "")}
                            onClick={() => this.changeType("2")}
                        >
                            Chi
                        </button>
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
                                        <th>Nhóm</th>
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
                                            const classType = transaction.type == 1 ? " btn-success " : " btn-danger ";
                                            const textType = transaction.type == 1 ? "Thu" : "Chi";
                                            let classStatus;
                                            let textStatus;

                                            if (transaction.type == 1) {
                                                classStatus = " btn-success ";
                                                textStatus = "+";
                                            } else if (transaction.type == 2) {
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
                                                        {
                                                            transaction.category &&
                                                            <button
                                                                className={"btn btn-sm width-100 bold"}
                                                                style={{backgroundColor: transaction.category.color}}
                                                            >
                                                                {transaction.category.name}
                                                            </button>
                                                        }

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
                                                            className={classStatus + "btn btn-sm width-100 bold lowercase"}>
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
    spendMoneyActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    transactions: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.spendMoney.historyTransaction.isLoading,
        transactions: state.spendMoney.historyTransaction.transactions,
        totalPages: state.spendMoney.historyTransaction.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        spendMoneyActions: bindActionCreators(spendMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTransaction);