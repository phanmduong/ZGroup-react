import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as historyTransactionsActions from './historyTransactionsActions';
import {avatarEmpty, dotNumber} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import {TYPE_TRANSACTION} from "../../constants/constants";
import ReactSelect from 'react-select';
import {NO_AVATAR} from "../../constants/env";

class HistoryTransactionsContainer extends React.Component {
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
        this.props.historyTransactionsActions.loadHistoryTransactions(page, this.state.type);
    }

    changeType(value) {
        let type = value && value.value ? value.value : "";
        this.setState({type: type, page: 1});
        this.props.historyTransactionsActions.loadHistoryTransactions(1, type);
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
                                        <th/>
                                        <th>Người thực hiện</th>
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
                                            let classStatus = " btn-danger ";
                                            let textStatus = "-";

                                            if (transaction.type == 1) {
                                                classStatus = " btn-success ";
                                                textStatus = "+";
                                            } else if (transaction.type == 2) {
                                                classStatus = " btn-danger ";
                                                textStatus = "-";
                                            }
                                            const avatarSender = transaction.sender && !avatarEmpty(transaction.sender.avatar_url) ?
                                                transaction.sender.avatar_url : NO_AVATAR;
                                            return (
                                                <tr key={transaction.id}>
                                                    <td>
                                                        <div className="avatar-list-staff"
                                                             style={{
                                                                 background: 'url(' + avatarSender + ') center center / cover',
                                                                 display: 'inline-block'
                                                             }}
                                                        />
                                                    </td>
                                                    <td>{transaction.sender ? transaction.sender.name : ""}</td>
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

HistoryTransactionsContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    transactions: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    historyTransactionsActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.historyTransactions.isLoading,
        transactions: state.historyTransactions.transactions,
        totalPages: state.historyTransactions.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        historyTransactionsActions: bindActionCreators(historyTransactionsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTransactionsContainer);