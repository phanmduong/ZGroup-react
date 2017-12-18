import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import Loading from "../../components/common/Loading";
// import Avatar from "../../components/common/Avatar";
import * as addDiscountActions from './addDiscountActions';
import Search from '../../components/common/Search';
import Pagination from '../../components/common/Pagination';


class ListGroupCustomers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            limit: 6,
        };
        // this.toggleAssign = this.toggleAssign.bind(this);
        this.loadGroupCustomers = this.loadGroupCustomers.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

    }

    componentWillMount() {
        this.loadGroupCustomers( 1 );
    }
    loadGroupCustomers(page) {
        this.setState({page: page});
        this.props.addDiscountActions.loadGroupCustomers(page, this.state.limit, this.state.query);
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
            this.props.addDiscountActions.loadGroupCustomers(this.state.page, this.state.limit, this.state.query);
        }.bind(this), 500);
    }


    updateFormData(groupCustomer) {
        const field = 'customer_group';
        let discount = {...this.props.discount};
        discount[field] = groupCustomer;
        this.props.addDiscountActions.updateDiscountFormData(discount);
    }
    // toggleAssign(member) {
    //     this.props.addDiscountActions.assignMember(this.props.card, member);
    // }  Hàm dùng để chọn nhiều người


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
                <h5>Nhóm khách hàng</h5>
                <Search
                    onChange={this.onSearchChange}
                    value={this.state.query}
                    placeholder="Tìm kiếm nhóm khách hàng"
                />

                {
                    this.props.isLoading ?
                        <Loading/> : (
                            <ListGroup>
                                {this.props.groupCustomers.map((groupCustomer) =>
                                    (
                                        <ListGroupItem
                                            key={groupCustomer.id}
                                            onClick={(e) => {
                                                this.updateFormData(groupCustomer);
                                                this.props.toggle();
                                                e.preventDefault();
                                            }}>

                                            <div style={{
                                                display: "flex", justifyContent: "space-between",
                                                lineHeight: "30px"
                                            }}>
                                                <div style={{display: "flex"}}>
                                                    {/*<Avatar size={30} url={m.avatar_url}/>*/}
                                                    {groupCustomer.name}
                                                </div>
                                                {/*{*/}
                                                {/*category.added && <i className="material-icons">done</i>*/}
                                                {/*}*/}
                                            </div>
                                        </ListGroupItem>
                                    )
                                )}
                                <Pagination
                                    totalPages={this.props.totalGroupCustomerPages}
                                    currentPage={currentPage}
                                    loadDataPage={this.loadGroupCustomers}
                                />

                            </ListGroup>
                        )
                }

            </div>
        );
    }
}

ListGroupCustomers.propTypes = {
    discount : PropTypes.object,
    groupCustomers: PropTypes.array,
    isLoading: PropTypes.bool,
    addDiscountActions: PropTypes.object.isRequired,
    totalGroupCustomerPages : PropTypes.number,
    toggle : PropTypes.func,
};

function mapStateToProps(state) {
    return {
        discount: state.addDiscount.discount,
        groupCustomers: state.addDiscount.groupCustomers,
        isLoading: state.addDiscount.isLoading,
        totalGroupCustomerPages: state.addDiscount.totalGroupCustomerPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addDiscountActions: bindActionCreators(addDiscountActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGroupCustomers);