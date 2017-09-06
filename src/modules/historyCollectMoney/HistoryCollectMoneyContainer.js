/**
 * Created by phanmduong on 9/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import * as historyCollectMoneyActions from './historyCollectMoneyActions';
import ListRegister from './ListRegister';

class HistoryCollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
        };
        this.timeOut = null;
        this.loadHistoryCollectMoney = this.loadHistoryCollectMoney.bind(this);
        this.registersSearchChange = this.registersSearchChange.bind(this);
    }

    componentWillMount() {
        this.loadHistoryCollectMoney();
    }

    registersSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.historyCollectMoneyActions.historyCollectMoney(this.state.query, this.state.page);
        }.bind(this), 500);
    }

    loadHistoryCollectMoney(page = 1) {
        this.setState({page});
        this.props.historyCollectMoneyActions.historyCollectMoney(this.state.query, page);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Danh sách học viên đã nộp tiền</h4>
                        <Search
                            onChange={this.registersSearchChange}
                            value={this.state.query}
                            placeholder="Tìm kiếm học viên"
                        />

                        {this.props.isLoading ? <Loading/> :
                            <div>
                                <ListRegister
                                    registers={this.props.registers}
                                />
                                <ul className="pagination pagination-primary">
                                    {_.range(1, this.props.totalPages + 1).map(page => {
                                        if (Number(this.state.page) === page) {
                                            return (
                                                <li key={page} className="active">
                                                    <a onClick={() => this.loadHistoryCollectMoney(page)}>{page}</a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={page}>
                                                    <a onClick={() => this.loadHistoryCollectMoney(page)}>{page}</a>
                                                </li>
                                            );
                                        }

                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPage: state.historyCollectMoney.currentPage,
        totalPages: state.historyCollectMoney.totalPages,
        registers: state.historyCollectMoney.registers,
        isLoading: state.historyCollectMoney.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        historyCollectMoneyActions: bindActionCreators(historyCollectMoneyActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCollectMoneyContainer);
