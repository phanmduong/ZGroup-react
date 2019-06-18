import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {avatarEmpty, dotNumber, round2} from "../../helpers/helper";
import Barchart from "./Barchart";
import Pagination from "../../components/common/Pagination";
import {NO_AVATAR} from "../../constants/env";
import PieChart from "./PieChart";

class SummaryFinanceComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        this.props.loadData();
        this.props.loadHistoryTransaction();
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loading/>
            );
        } else {
            const {total_collect_money, total_spend_money, date_array, spend_money_date, collect_money_date, spend_money_category} = this.props.summary;

            let categories = [];
            let moneyCategory = [];
            let moneyCategoryColors = [];
            if (spend_money_category) {
                 categories = spend_money_category.map(obj => obj.name ? obj.name : "Không có nhóm");
                 moneyCategory = spend_money_category.map(obj => obj.money ? obj.money : 0);
                 moneyCategoryColors = spend_money_category.map(obj => obj.color ? obj.color : null);
            }
            return (
                <div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div className="card-content text-align-left">
                                    <p className="category">Doanh
                                        thu</p>
                                    <h3 className="card-title">{dotNumber(total_collect_money)}đ</h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">list</i>
                                        <a href="#history-transaction"
                                           onClick={() => this.props.changeType("1")}
                                        >Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div className="card-content text-align-left">
                                    <p className="category">Chi phí</p>
                                    <h3 className="card-title">{dotNumber(total_spend_money)}đ</h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">list</i>
                                        <a href="#history-transaction"
                                           onClick={() => this.props.changeType("2")}
                                        >Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div className="card-content text-align-left">
                                    <p className="category">Lợi nhuận</p>
                                    <h3 className="card-title">{dotNumber(total_collect_money - total_spend_money)}đ</h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">timeline</i>
                                        <a href="#chart_spend_money">Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div className="card-content text-align-left">
                                    <p className="category">Chi phí/Doanh thu</p>
                                    <h3 className="card-title">{round2(total_spend_money * 100, total_collect_money)}%</h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">timeline</i>
                                        <a href="#chart_spend_money">Chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="chart_spend_money">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Doanh thu và chi phí</strong>
                                        </h4>
                                        <br/><br/>
                                        <Barchart
                                            label={date_array}
                                            data={[collect_money_date, spend_money_date]}
                                            id="barchar_spend_money"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="chart_spend_money">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Doanh thu và chi phí</strong>
                                        </h4>
                                        <br/><br/>

                                        <PieChart
                                            label={categories}
                                            data={moneyCategory}
                                            colors={moneyCategoryColors}
                                            id={"cost_by_group"}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card" id="history-transaction">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <h4 className="card-title">
                                            <strong>Lịch sử thu/chi</strong>
                                        </h4>
                                        <br/>
                                        <div>
                                            <button
                                                className={"btn btn-round margin-right-10" + (this.props.type == "" ? " btn-rose" : "")}
                                                onClick={() => this.props.changeType("")}
                                            >
                                                Tất cả
                                            </button>
                                            <button
                                                className={"btn btn-round margin-right-10 margin-left-20" + (this.props.type == "1" ? " btn-rose" : "")}
                                                onClick={() => this.props.changeType("1")}
                                            >
                                                Thu
                                            </button>
                                            <button
                                                className={"btn btn-round margin-left-20" + (this.props.type == "2" ? " btn-rose" : "")}
                                                onClick={() => this.props.changeType("2")}
                                            >
                                                Chi
                                            </button>
                                        </div>
                                        {this.props.isLoadingHistoryTransaction ?
                                            <Loading/>
                                            :
                                            <div>
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead className="text-rose">
                                                        <tr>
                                                            <th/>
                                                            <th>Nhân viên</th>
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
                                                            this.props.transactions && this.props.transactions.map((transaction) => {
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

                                                                const avatar = transaction.sender && !avatarEmpty(transaction.sender.avatar_url) ?
                                                                    transaction.sender.avatar_url : NO_AVATAR;
                                                                return (
                                                                    <tr key={transaction.id}>
                                                                        <td>
                                                                            <div className="avatar-list-staff"
                                                                                 style={{
                                                                                     background: 'url(' + avatar + ') center center / cover',
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
                                            currentPage={this.props.page}
                                            loadDataPage={(page) => this.props.loadHistoryTransaction(page)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

SummaryFinanceComponent.propTypes = {
    loadData: PropTypes.func.isRequired,
    loadHistoryTransaction: PropTypes.func.isRequired,
    changeType: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingHistoryTransaction: PropTypes.bool.isRequired,
    summary: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    totalPages: PropTypes.number,
    page: PropTypes.number,
    type: PropTypes.string,
};

export default SummaryFinanceComponent;