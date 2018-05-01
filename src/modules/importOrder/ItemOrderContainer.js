import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as importOrderActions from "./importOrderActions";
import Loading from "../../components/common/Loading";
import ImportItemOrderList from "./ImportItemOrderList";
import PropTypes from "prop-types";
import Pagination from "../../components/common/Pagination";

class ItemOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
        };
        this.loadHistoryImportOrder = this.loadHistoryImportOrder.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.loadImportOrder = this.loadImportOrder.bind(this);
    }

    componentWillMount() {
        this.props.importOrderActions.loadAllImportOrder(1);
    }

    loadImportOrder(page) {
        this.setState({page: page});
        this.props.importOrderActions.loadAllImportOrder(page);
    }

    changeStatus(id, success) {
        this.props.importOrderActions.changeStatusImportOrder(id, () => {
            success();

            this.props.importOrderActions.loadAllImportOrder(this.props.paginator.current_page);
        });
    }

    loadHistoryImportOrder(page, id) {
        this.props.importOrderActions.loadHistoryImportOrder(page, id);
    }

    render() {
        return (
            <div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card">

                                    <div className="card-content">
                                        <div className="flex" style={{justifyContent: "space-between"}}>
                                            <div className="flex">
                                                <h4 className="card-title">
                                                    <strong>Quản lý nhập hàng</strong>
                                                </h4>

                                                <div className="dropdown">
                                                    <Link
                                                        className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                                        type="button"
                                                        data-toggle="tooltip"
                                                        rel="tootip"
                                                        data-original-title="Tạo đơn nhập hàng"
                                                        to="/business/import-order/item/create"
                                                    >
                                                        <strong>+</strong>
                                                    </Link>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {
                                                    this.props.isLoadingItemOrder ? <Loading/> :
                                                        <div>
                                                            <ImportItemOrderList
                                                                data={this.props.importOrders}
                                                                page={this.state.page}
                                                                loadImportOrder={this.loadImportOrder}
                                                                changeStatus={this.changeStatus}
                                                                loadHistoryImportOrder={this.loadHistoryImportOrder}
                                                                historyImportOrder={this.props.historyImportOrder}
                                                                paginator={this.props.paginator_history}

                                                            />
                                                            <div className="card-content">
                                                                <Pagination
                                                                    totalPages={this.props.paginator.total_pages}
                                                                    currentPage={this.state.page}
                                                                    loadDataPage={this.loadImportOrders}
                                                                />
                                                            </div>
                                                        </div>
                                                }

                                            </div>
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

ItemOrderContainer.propTypes = {
    isLoadingItemOrder: PropTypes.bool,
    importOrders: PropTypes.array,
    paginator: PropTypes.object,
    historyImportOrder: PropTypes.array,
    paginator_history: PropTypes.object,
    importOrderActions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoadingItemOrder: state.importOrder.isLoadingItemOrder,
        importOrders: state.importOrder.importOrders,
        paginator: state.importOrder.paginator,
        paginator_history: state.importOrder.paginator_history,
        historyImportOrder: state.importOrder.historyImportOrder,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importOrderActions: bindActionCreators(importOrderActions, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemOrderContainer);