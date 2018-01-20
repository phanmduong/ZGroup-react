import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';


import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';
import * as helper from '../../helpers/helper';
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
        this.deleteDiscount = this.deleteDiscount.bind(this);
    }

    componentWillMount() {
        this.loadDiscounts(1, this.state.limit);
    }

    loadDiscounts(page) {
        this.setState({page: page});
        this.props.discountActions.loadDiscounts(page, this.state.limit, this.state.query);
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


    deleteDiscount(id, name) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa " + name,
            function () {
                this.props.discountActions.deleteDiscount(id, name);
            }.bind(this)); // bind để thực hiện hàm khi hiện ra helper thông báo cf xóa
    }


    render() {
        let currentPage = this.state.page;

        return (
            <div className="content">
                <div className="container-fluid">
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">assignment</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Khuyến mãi</h4>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div>
                                                    <button type="button" className="btn btn-rose"
                                                            onClick={() => {
                                                                browserHistory.push('/good/discount/add');
                                                            }}>
                                                        Thêm khuyến mãi
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-md-8">
                                                <Search
                                                    onChange={this.discountsSearchChange}
                                                    value={this.state.query}
                                                    placeholder="Tìm kiếm khuyến mãi"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            {this.props.isLoading ?
                                                <Loading/>
                                                :
                                                <ListChildDiscount
                                                    discountsList={this.props.discountsList}
                                                    deleteDiscount={this.deleteDiscount}
                                                />
                                            }
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