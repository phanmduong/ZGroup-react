import React from "react";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import * as historyDebtAction from "../historyDebt/historyDebtActions";
import Pagination from "../../components/common/Pagination";
import CompaniesList from "../historyDebt/CompaniesList";
import PropTypes from 'prop-types';
import HistoryDebtModal from "./HistoryDebtModal";

class HistoryDebtContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            showInfoModal: false,
            id: "",
    }
        ;
        this.loadCompanies = this.loadCompanies.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.loadHistoryDebt = this.loadHistoryDebt.bind(this);
    }

    componentWillMount() {
        this.props.historyDebtActions.loadCompanies();
    }

    loadCompanies(page) {
        this.setState({page: page});
        this.loadComapnies(page);
    }

    loadHistoryDebt(id, page) {
        this.props.historyDebtActions.loadHistoryDebt(id, page);
    }

    openInfoModal(id) {
        this.setState({showInfoModal: true});
        this.setState({id: id});
        this.loadHistoryDebt(id, 1);
    }


    closeInfoModal() {
        this.setState({showInfoModal: false});
    }

    render() {
        return (
            <div>
                <HistoryDebtModal
                    show={this.state.showInfoModal}
                    onHide={this.closeInfoModal}
                    isLoading={this.props.isLoadingHistoryDebt}
                    data={this.props.historyDebt || []}
                    loadHistoryDebt={this.loadHistoryDebt}
                    paginator={this.props.paginatorHistoryDebt}
                    id={this.state.id}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">home</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Quản lý công nợ</h4>
                                    <div>
                                        {
                                            this.props.isLoadingCompanies ? <Loading/> :
                                                <CompaniesList
                                                    data={this.props.data || []}
                                                    openInfoModal={this.openInfoModal}
                                                />
                                        }
                                    </div>
                                    <div className="card-content">
                                        <Pagination
                                            totalPages={this.props.paginatorCompanies.total_pages}
                                            currentPage={this.state.page}
                                            loadDataPage={this.loadCompanies}
                                        />
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
HistoryDebtContainer.propTypes = {
    historyDebtActions: PropTypes.object.isRequired,
    isLoadingHistoryDebt: PropTypes.bool.isRequired,
    isLoadingCompanies: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    historyDebt: PropTypes.array.isRequired,
    paginatorCompanies: PropTypes.object.isRequired,
    paginatorHistoryDebt: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        isLoadingHistoryDebt: state.historyDebt.isLoadingistoryDebt,
        isLoadingCompanies : state.historyDebt.isLoadingComapnies,
        data: state.historyDebt.companies,
        paginatorCompanies: state.historyDebt.paginatorCompanies,
        paginatorHistoryDebt: state.historyDebt.paginatorHistoryDebt,
        historyDebt: state.historyDebt.historyDebt,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        historyDebtActions: bindActionCreators(historyDebtAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDebtContainer);