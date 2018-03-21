/**
 * Created by phanmduong on 9/3/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import Loading from '../../components/common/Loading';
import * as summaryFinanceActions from './summaryFinanceActions';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormInputDate from "../../components/common/FormInputDate";
import {isEmptyInput} from "../../helpers/helper";
import SummaryFinanceComponent from "./SummaryFinanceComponent";

class SummaryFinanceContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            gens: [],
            openFilter: false,
            filter: {
                startTime: '',
                endTime: '',
            },
            page: 1,
            type: ""
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.updateFormFilter = this.updateFormFilter.bind(this);
        this.loadData = this.loadData.bind(this);
        this.loadHistoryTransaction = this.loadHistoryTransaction.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    componentWillMount() {
        this.props.summaryFinanceActions.loadGensData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingGens !== this.props.isLoadingGens && !nextProps.isLoadingGens) {
            this.setState({
                gens: this.getGens(nextProps.gens),
                selectGenId: nextProps.currentGen.id
            });
        }
    }

    getGens(gens) {
        return gens.map(function (gen) {
            return {
                key: gen.id,
                value: 'Khóa ' + gen.name
            };
        });
    }

    loadData(genId, startTime, endTime) {
        this.props.summaryFinanceActions.loadSummaryFinance(genId, startTime, endTime);
        this.setState({type: "", page: 1});
        this.props.summaryFinanceActions.loadHistoryTransactions(1, "", genId, startTime, endTime);
    }

    loadHistoryTransaction(page = 1) {
        this.setState({page: page});
        this.props.summaryFinanceActions.loadHistoryTransactions(page, this.state.type, this.state.selectGenId,
            this.state.filter.startTime, this.state.filter.endTime);
    }

    changeType(value) {
        if (value != this.state.type) {
            this.setState({type: value, page: 1});
            this.props.summaryFinanceActions.loadHistoryTransactions(1, value, this.state.selectGenId,
                this.state.filter.startTime, this.state.filter.endTime);
        }
    }


    onChangeGen(value) {
        this.setState({
            selectGenId: value, filter: {
                startTime: '',
                endTime: '',
            }
        });
        this.loadData(value);
    }

    updateFormFilter(event) {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;


        if (!isEmptyInput(filter.startTime) && !isEmptyInput(filter.endTime)) {
            this.loadData(this.state.selectGenId, filter.startTime, filter.endTime);
        }
        this.setState({filter: filter});
    }

    render() {
        return (
            <div>

                {this.props.isLoadingGens ? <Loading/> :
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={this.state.gens}
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-info btn-rose btn-round"
                                            onClick={() => this.setState({openFilter: !this.state.openFilter})}>
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                            </div>
                            <Panel collapsible expanded={this.state.openFilter}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">filter_list</i>
                                            </div>
                                            <div className="card-content">
                                                <h4 className="card-title">Bộ lọc
                                                    <small/>
                                                </h4>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Từ ngày"
                                                            name="startTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-start-time"
                                                            value={this.state.filter.startTime}
                                                            maxDate={this.state.filter.endTime}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Đến ngày"
                                                            name="endTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-end-time"
                                                            value={this.state.filter.endTime}
                                                            minDate={this.state.filter.startTime}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                            <SummaryFinanceComponent
                                loadData={this.loadData}
                                isLoading={this.props.isLoading}
                                summary={this.props.summary}
                                page={this.state.page}
                                type={this.state.type}
                                isLoadingHistoryTransaction={this.props.isLoadingHistoryTransaction}
                                transactions={this.props.transactions}
                                totalPages={this.props.totalPages}
                                changeType={this.changeType}
                                loadHistoryTransaction={this.loadHistoryTransaction}
                            />
                        </div>
                    )
                }
            </div>
        )
            ;
    }
}

SummaryFinanceContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    transactions: PropTypes.array.isRequired,
    summaryFinanceActions: PropTypes.object.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingHistoryTransaction: PropTypes.bool.isRequired,
    currentGen: PropTypes.object.isRequired,
    summary: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,

};

function mapStateToProps(state) {
    return {
        gens: state.summaryFinance.gens,
        isLoadingGens: state.summaryFinance.isLoadingGens,
        currentGen: state.summaryFinance.currentGen,
        isLoading: state.summaryFinance.isLoading,
        summary: state.summaryFinance.summary,
        isLoadingHistoryTransaction: state.summaryFinance.historyTransaction.isLoading,
        transactions: state.summaryFinance.historyTransaction.transactions,
        totalPages: state.summaryFinance.historyTransaction.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        summaryFinanceActions: bindActionCreators(summaryFinanceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryFinanceContainer);
