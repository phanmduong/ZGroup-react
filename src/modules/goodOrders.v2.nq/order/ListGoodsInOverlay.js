import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import Loading from "../../../components/common/Loading";
import Avatar from "../../../components/common/Avatar";
import * as goodOrderActions from '../goodOrderActions';
import Search from '../../../components/common/Search';
import Pagination from '../../../components/common/Pagination';
import * as helper from '../../../helpers/helper';


class ListGoodsInOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.state = {
            page: 1,
            query: "",
            limit: 6,
        };
        this.loadGoods = this.loadGoods.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentWillMount() {
        this.loadGoods(1);
    }

    loadGoods(page) {
        this.setState({page: page});
        this.props.goodOrderActions.loadGoodsInOverlay(page, this.state.limit, this.state.query,this.props.good_orders);
    }

    onSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.goodOrderActions.loadGoodsInOverlay(this.state.page, this.state.limit, this.state.query,this.props.good_orders);
        }.bind(this), 500);
    }

    updateFormData(good) {
        if (good.quantity === 0) {
            // helper.confirm("error", "Thông báo", good.name + " hiện đã hết hàng");
            helper.showTypeNotification(good.name + " hiện đã hết hàng" , "warning");
        }
        else {
            this.props.goodOrderActions.assignGoodFormData(good);
        }
    }


    render() {
        let currentPage = this.state.page;
        return (
            <div className="kt-overlay" style={{
                width: "350px",
                marginLeft: -80,
            }}>
                <button
                    onClick={this.props.toggle}
                    type="button" className="close"
                    style={{color: '#5a5a5a'}}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
                <h5>Hàng hóa</h5>
                <Search
                    onChange={this.onSearchChange}
                    value={this.state.query}
                    placeholder="Nhập mã barcode hoặc tên hàng hóa ... "
                />

                {
                    this.props.isLoadingGoodOverlay ?
                        <Loading/> : (
                            <ListGroup>
                                {this.props.goodsList && this.props.goodsList.map((good) =>
                                    (
                                        <ListGroupItem
                                            key={good.id}
                                            onClick={(e) => {
                                                this.updateFormData(good);
                                                e.preventDefault();
                                            }}>
                                            <div style={{
                                                display: "flex", justifyContent: "space-between",
                                                lineHeight: "30px"
                                            }}>
                                                <div style={{display: "flex", justifyContent: "spaceBetween"}}>
                                                    <Avatar size={30} url={good.avatar_url}/>
                                                    {good.name}
                                                </div>

                                                <div className="bootstrap-tagsinput">
                                                        <span className="tag btn" style={{
                                                            backgroundColor: "green",
                                                            fontSize: 12
                                                        }}>{good.quantity}
                                                        </span>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    )
                                )}
                                <Pagination
                                    totalPages={this.props.totalGoodPages}
                                    currentPage={currentPage}
                                    loadDataPage={this.loadGoods}
                                />
                            </ListGroup>
                        )
                }

            </div>
        );
    }
}

ListGoodsInOverlay.propTypes = {
    goodOrderActions: PropTypes.object,
    goodsList: PropTypes.array,
    good_orders: PropTypes.array,
    isLoadingGoodOverlay: PropTypes.bool,
    totalGoodPages: PropTypes.number,
    toggle: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        goodsList: state.goodOrders.order.order.goodsList,
        isLoadingGoodOverlay: state.goodOrders.order.order.isLoadingGoodOverlay,
        totalGoodPages: state.goodOrders.order.order.totalGoodPages,
        good_orders : state.goodOrders.order.order.good_orders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodOrderActions: bindActionCreators(goodOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGoodsInOverlay);