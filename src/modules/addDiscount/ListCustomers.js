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


class ListCustomers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.state = {
            page: 1,
            query: "",
            limit: 6,
        };
        // this.toggleAssign = this.toggleAssign.bind(this);
        this.loadCustomers = this.loadCustomers.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount() {
        this.loadCustomers( 1, this.state.limit );
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
            this.props.addDiscountActions.loadCustomers(this.state.page, this.state.limit, this.state.query);
        }.bind(this), 500);
    }

    updateFormData(customer) {
        const field = 'customer';
        let discount = {...this.props.discount};
        discount[field] = customer;
        this.props.addDiscountActions.updateDiscountFormData(discount);
    }
    // toggleAssign(member) {
    //     this.props.addDiscountActions.assignMember(this.props.card, member);
    // }  Hàm dùng để chọn nhiều người
    loadCustomers(page) {
        this.setState({page: page});
        this.props.addDiscountActions.loadCustomers(page, this.state.limit, this.state.query);
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
                <h5>Khách hàng</h5>
                <Search
                    onChange={this.onSearchChange}
                    value={this.state.query}
                    placeholder="Tìm kiếm khách hàng"
                />

                {
                    this.props.isLoading ?
                        <Loading/> : (
                            <ListGroup>
                                {this.props.customers.map((customer) =>
                                    (
                                        <ListGroupItem
                                            key={customer.id}
                                            onClick={(e) => {
                                                this.updateFormData(customer);
                                                e.preventDefault();
                                                this.props.toggle();
                                            }}>

                                            <div style={{
                                                display: "flex", justifyContent: "space-between",
                                                lineHeight: "30px"
                                            }}>
                                                <div style={{display: "flex"}}>
                                                    <Avatar size={30} url={customer.avatar_url}/>
                                                    {customer.name}
                                                </div>
                                                {/*{*/}
                                                    {/*customer.added && <i className="material-icons">done</i>*/}
                                                {/*}*/}
                                            </div>
                                        </ListGroupItem>
                                    )
                                )}
                                <Pagination
                                    totalPages={this.props.totalCustomerPages}
                                    currentPage={currentPage}
                                    loadDataPage={this.loadCustomers}
                                />
                            </ListGroup>
                        )
                }

            </div>
        );
    }
}

ListCustomers.propTypes = {
    discount : PropTypes.object,
    customers: PropTypes.array,
    isLoading: PropTypes.bool,
    addDiscountActions: PropTypes.object.isRequired,
    totalCustomerPages : PropTypes.number,
    toggle : PropTypes.func,
};

function mapStateToProps(state) {
    return {
        discount: state.addDiscount.discount,
        customers: state.addDiscount.customers,
        isLoading: state.addDiscount.isLoading,
        totalCustomerPages: state.addDiscount.totalCustomerPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addDiscountActions: bindActionCreators(addDiscountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomers);