import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as orderedGoodActions from "./orderedGoodAction";
import ListOrderedGood from "./ListOrderedGood";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
//import * as helper from "../../../helpers/helper";
import {Link} from "react-router";

class OrderedGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.orderedGoodActions.loadAllOrderedGood();
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }



    render() {
        let { isLoading, paginator, orderedGoodActions } = this.props;
        //let {data, showAddModal, addModalData} = this.state;

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
                                    <h4 className="card-title">Danh sách đơn hàng</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-sm-3">
                                                <Link to="/business/ordered-good/create" className="btn btn-rose" style={{width: "100%"}}>
                                                <i className="material-icons">add</i> Tạo đơn hàng
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
                                            <ListOrderedGood/>
                                    }
                                    <Pagination
                                        currentPage={paginator.current_page}
                                        totalPages={paginator.total_pages}
                                        loadDataPage={orderedGoodActions.loadAllOrderedGood}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

OrderedGoodContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    orderedGoodActions: PropTypes.object,
    orderedList: PropTypes.array,
    paginator: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderedGood.isLoading,
        orderedList: state.orderedGood.orderedList,
        paginator: state.orderedGood.paginator,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedGoodActions: bindActionCreators(orderedGoodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderedGoodContainer);
