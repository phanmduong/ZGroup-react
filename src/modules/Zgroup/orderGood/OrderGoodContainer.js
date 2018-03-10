import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderGoodActions from "./orderGoodAction";
import ListOrderGood from "./ListOrderGood";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
//import * as helper from "../../../helpers/helper";
import {Link} from "react-router";

class OrderGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.orderGoodActions.loadAllOrderGood();
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }



    render() {
        let { isLoading, paginator, orderGoodActions } = this.props;
        
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">event_note</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách đặt hàng</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-sm-3">
                                                <Link to="/business/order-good/create" className="btn btn-rose" style={{width: "100%"}}>
                                                <i className="material-icons">add</i> Đặt hàng
                                                </Link>
                                            </div>
                                            {/* <Search className="col-sm-9" placeholder="Tìm kiếm"
                                                    value={this.state.query}
                                                    onChange={()=>{}}
                                            /> */}
                                        </div>
                                    </div>
                                    {
                                        isLoading ? <Loading/> :
                                            <ListOrderGood/>
                                    }
                                    <Pagination
                                        currentPage={paginator.current_page}
                                        totalPages={paginator.total_pages}
                                        loadDataPage={orderGoodActions.loadAllOrderGood}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

OrderGoodContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    orderGoodActions: PropTypes.object,
    orderList: PropTypes.array,
    paginator: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderGood.isLoading,
        orderList: state.orderGood.orderList,
        paginator: state.orderGood.paginator,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderGoodActions: bindActionCreators(orderGoodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderGoodContainer);
