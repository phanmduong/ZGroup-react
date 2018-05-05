import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
import * as exportOrderActions from "./exportOrderActions";
//import Search from "../../../components/common/Search";
import { Link } from "react-router";
import ListExportGood from "./ListExportOrder";

class ExportOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
        };

    }

    componentWillMount() {
        this.props.exportOrderActions.loadExportOrders();
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    // }


    render() {
        let { isLoading, paginator, exportOrderActions } = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="flex-row flex">
                                        <h4 className="card-title"><strong>Danh sách xuất hàng</strong></h4>
                                        <div>
                                            <Link to="/business/export-order/create" className="btn btn-rose btn-round btn-xs button-add none-margin">
                                                <strong>+</strong>
                                            </Link>
                                        </div>
                                    </div>

                                    {
                                        isLoading ? <Loading /> :
                                            <ListExportGood />
                                    }
                                    <Pagination
                                        currentPage={paginator.current_page}
                                        totalPages={paginator.total_pages}
                                        loadDataPage={exportOrderActions.loadExportOrders} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ExportOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    paginator: PropTypes.object,
    exportOrderActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
        paginator: state.printOrder.paginator,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        exportOrderActions: bindActionCreators(exportOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportOrderContainer);
