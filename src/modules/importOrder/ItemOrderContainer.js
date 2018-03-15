import React  from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as importOrderActions from "./importOrderActions";
import Loading from "../../components/common/Loading";
import ImportItemOrderList from "./ImportItemOrderList";
import PropTypes from "prop-types";
import Pagination from "../../components/common/Pagination";

class ItemOrderContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state ={
           page:1,
        };
        this.loadHistoryImportOrder = this.loadHistoryImportOrder.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.loadImportOrder = this.loadImportOrder.bind(this);
    }
    componentWillMount() {
        this.props.importOrderActions.loadAllImportOrder(1);
    }
    loadImportOrder(page){
        this.setState({page: page});
        this.props.importOrderActions.loadAllImportOrder(page);
    }
    changeStatus(id){
        this.props.importOrderActions.changeStatusImportOrder(id);
    }
    loadHistoryImportOrder(page,id){
        this.props.importOrderActions.loadHistoryImportOrder(page,id);
    }
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-3">
                            <Link className="btn btn-rose" to="/business/import-order/item/create">
                                <i className="material-icons">add
                                </i>
                                    Tạo đơn nhập hàng
                            </Link>
                        </div>
                    </div>
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


export default connect(mapStateToProps,mapDispatchToProps) (ItemOrderContainer);