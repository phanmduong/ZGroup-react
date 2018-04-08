import React from "react";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import * as warehouseAction from "./warehouseAction";
import PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import GoodList from "./GoodList";
import HistoryGoodComponent from "./HistoryGoodComponent";
import Pagination from "../../../components/common/Pagination";

class WarehouseContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state ={
            showModal: false,
            page: 1,
            id: 1,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.loadHistory = this.loadHistory.bind(this);
        this.loadGoodList = this.loadGoodList.bind(this);
    }

    componentWillMount() {
        this.props.warehouseAction.loadSummaryGoods(1);
    }
    openModal(id){
        this.setState({showModal: true, id: id});
        this.props.warehouseAction.loadHistoryGood(1,id);
    }
    closeModal(){
        this.setState({showModal: false});
    }
    loadHistory(page,id){
        this.props.warehouseAction.loadHistory(page,id);
    }
    loadGoodList(page){
        this.setState({page: page});
        this.props.warehouseAction.loadSummaryGoods(page);
    }
    render() {
        return (
            <div className="content">
                <HistoryGoodComponent
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    data={this.props.historyGood}
                    loadHistory={this.loadHistory}
                    paginator={this.props.historyPaginator}
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
                                    <h4 className="card-title">Quản lý kho hàng</h4>
                                    {
                                        this.props.isLoading ? <Loading/> :
                                            <div>
                                                <GoodList
                                                    data={this.props.goods}
                                                    openModal={this.openModal}
                                                />

                                                    <Pagination
                                                        totalPages={this.props.paginator.total_pages}
                                                        currentPage={this.state.page}
                                                        loadDataPage={this.loadGoodList}
                                                    />

                                            </div>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

WarehouseContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    goods: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
    warehouseAction: PropTypes.object.isRequired,
    historyGood: PropTypes.array.isRequired,
    historyPaginator: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.zWarehouse.isLoading,
        goods: state.zWarehouse.goods,
        paginator: state.zWarehouse.paginator,
        historyGood: state.zWarehouse.historyGood,
        historyPaginator: state.zWarehouse.historyPaginator,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        warehouseAction: bindActionCreators(warehouseAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseContainer);