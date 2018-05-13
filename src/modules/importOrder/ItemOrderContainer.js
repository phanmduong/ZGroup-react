import React from "react";
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as importOrderActions from "./importOrderActions";
import Loading from "../../components/common/Loading";
import ImportItemOrderList from "./ImportItemOrderList";
import PropTypes from "prop-types";
import Pagination from "../../components/common/Pagination";
import * as helper from "../../helpers/helper";
import {Panel} from "react-bootstrap";
import ReactSelect from 'react-select';
import InfoImportOrder from "./InfoImportOrder";

class ItemOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            openFilter: false,
            companyId: null,
            showInfoModal: false,
        };
        this.loadHistoryImportOrder = this.loadHistoryImportOrder.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        //this.loadImportOrders = this.loadImportOrders.bind(this);
        this.changeDataCompanies = this.changeDataCompanies.bind(this);
        this.searchByCompany = this.searchByCompany.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
    }

    componentWillMount() {
        this.props.importOrderActions.loadAllImportOrder(1);
        this.props.importOrderActions.loadAllCompanies();
        this.props.importOrderActions.loadAllOrder();
    }

    // loadImportOrders(page) {
    //     console.log(page);
    //     this.setState({page: page});
    //     this.props.importOrderActions.loadAllImportOrder(page);
    // }

    changeStatus(id) {
        // this.props.importOrderActions.changeStatusImportOrder(id, () => {
        //     success();
        //
        //     this.props.importOrderActions.loadAllImportOrder(this.props.paginator.current_page);
        // });
        helper.confirm('success', 'Đồng ý', "Bạn muốn xác nhận yêu cầu này không?", () => {
            this.props.importOrderActions.changeStatusImportOrder(id, () => {
                this.props.importOrderActions.loadAllImportOrder(this.props.paginator.current_page);
            });


        });
    }

    changeDataCompanies() {
        let data = [];
        data = this.props.companies.map((pp) => {
            return {
                ...pp,
                value: pp.id,
                label: pp.name,
            };
        });
        return data;
    }

    loadHistoryImportOrder(page, id) {
        this.props.importOrderActions.loadHistoryImportOrder(page, id);
    }

    searchByCompany(e) {
        if (!e) {
            this.setState({companyId: null});
            this.props.importOrderActions.loadAllImportOrder(1);
            return;
        }
        this.setState({companyId: e.value});
        this.props.importOrderActions.loadAllImportOrder(1, e.value);
    }

    openInfoModal(id) {
        this.setState({showInfoModal: true});
        this.props.importOrderActions.loadImportOrder(id);
    }

    closeInfoModal() {
        this.setState({showInfoModal: false});
    }

    render() {
        return (
            <div>
                <div className="content">
                    <InfoImportOrder
                        show={this.state.showInfoModal}
                        onHide={this.closeInfoModal}
                        data={this.props.importOrder}
                        itemOrders={this.props.itemOrders}
                    />
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
                                                <div style={{
                                                    display: "inline-block"
                                                }}>
                                                    {/*<div className="dropdown">*/}
                                                    <Link
                                                        className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                                        type="button"
                                                        data-toggle="tooltip"
                                                        rel="tootip"
                                                        title="Tạo đơn nhập hàng"
                                                        to="/business/import-order/item/create"
                                                    >
                                                        <strong>+</strong>
                                                    </Link>
                                                    {/*</div>*/}
                                                    <button
                                                        className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                        data-toggle="tooltip"
                                                        rel="tooltip"
                                                        data-original-title="Lọc"
                                                        onClick={() => this.setState({openFilter: !this.state.openFilter})}
                                                        type="button">
                                                        <i className="material-icons"
                                                           style={{margin: "0px -4px", top: 0}}>filter_list</i>
                                                    </button>
                                                </div>
                                            </div>


                                        </div>
                                        <div>
                                            <Panel collapsible expanded={this.state.openFilter}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="col-md-4">
                                                            <label> Công ty </label>
                                                            <ReactSelect
                                                                options={this.changeDataCompanies()}
                                                                onChange={this.searchByCompany}
                                                                value={this.state.companyId}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Panel>
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
                                                                openInfoModal={this.openInfoModal}

                                                            />
                                                            <div>
                                                                <Pagination
                                                                    totalPages={this.props.paginator.total_pages}
                                                                    currentPage={this.props.paginator.current_page}
                                                                    loadDataPage={this.props.importOrderActions.loadAllImportOrder}
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
    companies: PropTypes.array,
    importOrder: PropTypes.object,
    itemOrders: PropTypes.arr,
};

function mapStateToProps(state) {
    return {
        isLoadingItemOrder: state.importOrder.isLoadingItemOrder,
        importOrders: state.importOrder.importOrders,
        paginator: state.importOrder.paginator,
        paginator_history: state.importOrder.paginator_history,
        historyImportOrder: state.importOrder.historyImportOrder,
        companies: state.importOrder.companies,
        importOrder: state.importOrder.importOrder,
        itemOrders: state.importOrder.itemOrders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importOrderActions: bindActionCreators(importOrderActions, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ItemOrderContainer);
