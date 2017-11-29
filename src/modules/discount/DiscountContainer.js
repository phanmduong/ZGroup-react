import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {Link , browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
// import ReactSelect from 'react-select';



import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';
import Pagination from '../../components/common/Pagination';

import * as discountActions from './discountActions';
import ListChildDiscount from './ListChildDiscount';




class DiscountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
        };
        this.loadDiscounts = this.loadDiscounts.bind(this);
        this.discountsSearchChange = this.discountsSearchChange.bind(this);
    }
    componentWillMount() {
        this.loadDiscounts( 1, this.state.limit );
    }
    loadDiscounts(page) {
        this.setState({page: page});
        this.props.discountActions.loadDiscounts(this.state.page, this.state.limit, this.state.query);
    }
    discountsSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.discountActions.loadDiscounts(this.state.page, this.state.limit, this.state.query);
        }.bind(this), 500);
    }


    render() {
        let currentPage = this.state.page;

        return (
            <div className="content">
                <div className="container-fluid">
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                {this.props.isLoading ?
                                    <Loading/>
                                    :
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose">
                                            <i className="material-icons">assignment</i>
                                        </div>
                                        <div className="card-content">
                                            <h4 className="card-title">Nhà kho</h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <div>
                                                            <button rel="tooltip" data-placement="top" title
                                                                    data-original-title="Remove item" type="button"
                                                                    className="btn btn-rose"
                                                            >
                                                                Thêm nhà kho
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Search
                                                                onChange={this.discountsSearchChange}
                                                                value={this.state.query}
                                                                placeholder="Tìm kiếm khuyến mãi"
                                                                className="col-md-12"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="table-responsive">
                                                <ListChildDiscount
                                                    discountsList={this.props.discountsList}
                                                    deleteWareHouse={this.deleteDiscount}
                                                />

                                                <div className="row" style={{float: 'right'}}>
                                                    <div className="col-md-12" style={{textAlign: 'right'}}>
                                                        <Pagination
                                                            totalPages={this.props.totalPages}
                                                            currentPage={currentPage}
                                                            loadDataPage={this.loadDiscounts}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DiscountContainer.propTypes = {
    discountActions: PropTypes.object,
    discountsList: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    totalCount: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        discountsList: state.discounts.discountsList,
        isLoading: state.discounts.isLoading,
        totalPages: state.discounts.totalPages,
        totalCount: state.discounts.totalCount,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        discountActions: bindActionCreators(discountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountContainer);