import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import Loading from "../../components/common/Loading";
import Avatar from "../../components/common/Avatar";
import * as addDiscountActions from './addDiscountActions';
import Search from '../../components/common/Search';
import Pagination from '../../components/common/Pagination';


class ListGoods extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.state = {
            page: 1,
            query: "",
            limit: 6,
        };
        // this.toggleAssign = this.toggleAssign.bind(this);
        this.loadGoods = this.loadGoods.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        this.loadGoods( 1);
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
            this.props.addDiscountActions.loadGoods(this.state.page, this.state.limit, this.state.query);
        }.bind(this), 500);
    }

    updateFormData(good) {
        const field = 'good';
        let discount = {...this.props.discount};
        discount[field] = good;
        this.props.addDiscountActions.updateDiscountFormData(discount);
    }
    // toggleAssign(member) {
    //     this.props.addDiscountActions.assignMember(this.props.card, member);
    // }  Hàm dùng để chọn nhiều người
    loadGoods(page) {
        this.setState({page: page});
        this.props.addDiscountActions.loadGoods(page, this.state.limit, this.state.query);
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
                    placeholder="Tìm kiếm khách hàng"
                />

                {
                    this.props.isLoading ?
                        <Loading/> : (
                            <ListGroup>
                                {this.props.goods.map((good) =>
                                    (
                                        <ListGroupItem
                                            key={good.id}
                                            onClick={(e) => {
                                                this.updateFormData(good);
                                                this.props.toggle();
                                                e.preventDefault();
                                            }}>

                                            <div style={{
                                                display: "flex", justifyContent: "space-between",
                                                lineHeight: "30px"
                                            }}>
                                                <div style={{display: "flex"}}>
                                                    <Avatar size={30} url={good.avatar_url}/>
                                                    {good.name}
                                                </div>
                                                {/*{*/}
                                                {/*good.added && <i className="material-icons">done</i>*/}
                                                {/*}*/}
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

ListGoods.propTypes = {
    discount : PropTypes.object,
    goods: PropTypes.array,
    isLoading: PropTypes.bool,
    addDiscountActions: PropTypes.object.isRequired,
    totalGoodPages : PropTypes.number,
    toggle : PropTypes.func,
};

function mapStateToProps(state) {
    return {
        discount: state.addDiscount.discount,
        goods: state.addDiscount.goods,
        isLoading: state.addDiscount.isLoading,
        totalGoodPages: state.addDiscount.totalGoodPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addDiscountActions: bindActionCreators(addDiscountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGoods);