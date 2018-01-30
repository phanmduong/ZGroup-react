import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import  * as printOrderActions from "./printOrderActions";
import ListPrintOrder from  "./ListPrintOrder";
//import Search                   from "../../components/common/Search";
import {Link} from "react-router";

class PrintOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
        };

    }

    componentWillMount() {
        this.props.printOrderActions.loadPrintOrders();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }


    render() {
        let {paginator, printOrderActions} = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">print</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách đặt in</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-sm-3">
                                                <Link to="/business/print-order/create" className="btn btn-rose" style={{width: "100%"}}>
                                                    Đặt In
                                                </Link>
                                            </div>
                                            {/*<Search className="col-sm-9" placeholder="Tìm kiếm"*/}
                                                {/*value={this.state.query}*/}
                                                {/*onChange={()=>{}}*/}
                                            {/*/>*/}
                                        </div>
                                    </div>
                                    {
                                        this.props.isLoading ? <Loading/>:
                                            <ListPrintOrder/>
                                    }
                                    <Pagination
                                        currentPage={paginator.current_page}
                                        totalPages={paginator.total_pages}
                                        loadDataPage={printOrderActions.loadPrintOrders}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PrintOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    paginator: PropTypes.object,
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
        printOrderActions: bindActionCreators(printOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintOrderContainer);
