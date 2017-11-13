import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import ListChildCustomer from "./ListChildCustomer";
import _ from 'lodash';
import * as customerActions from './customerActions';
import Loading from "../../components/common/Loading";
import Search from '../../components/common/Search';


class CustomerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            limit: 10,
            query: '',
        };
        this.loadCustomers = this.loadCustomers.bind(this);
        this.customersSearchChange = this.customersSearchChange.bind(this);
    }

    componentWillMount() {
        this.loadCustomers(this.state.page, this.state.limit);
        this.props.customerActions.loadTotalAndDebtMoney();
    }

    loadCustomers(page, limit) {
        this.setState({page: page});
        this.props.customerActions.loadCustomers(page, limit);
    }

    customersSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.customerActions.loadCustomers(this.state.page,10, this.state.query);
        }.bind(this), 500);
    }

    render() {
        let currentPage = this.state.page;
        let limit = this.state.limit;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div id="page-wrapper">
                        <div className="container-fluid">
                            <div style={{marginTop: 15}}>
                                <a className="btn btn-rose" href="">Thêm khách hàng</a>
                            </div>
                            {this.props.isLoading ? <Loading/> :
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">assignment</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Danh sách khách hàng</h4>
                                        <div className="table-responsive">
                                            <div id="property-table_wrapper"
                                                 className="dataTables_wrapper form-inline dt-bootstrap">
                                                <div className="row" style={{marginTop: 50}}>
                                                    <div className="col-md-6">
                                                        <div id="property-table_length">
                                                            <label>Phân loại:
                                                                <div className="form-group form-group-sm"
                                                                     style={{marginTop: 0, marginLeft: 20}}>
                                                                    <select name="property-table_length"
                                                                            aria-controls="property-table"
                                                                            className="form-control">
                                                                        <option value={10}>Tất cả</option>
                                                                        <option value={25}>Khách hàng từng mua</option>
                                                                        <option value={50}>Khách hàng còn nợ</option>
                                                                    </select>
                                                                    <span className="material-input"/></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Search
                                                            onChange={this.customersSearchChange}
                                                            value={this.state.query}
                                                            placeholder="Tìm kiếm khách hàng"
                                                            className="col-md-6"
                                                        />
                                                    </div>
                                                </div>
                                                <ListChildCustomer
                                                    customersList={this.props.customersList}
                                                />
                                                <div className="row">
                                                    <div className="col-sm-5">
                                                        <div className="dataTables_info" id="property-table_info"
                                                             role="status" aria-live="polite">Hiển trị
                                                            trang {currentPage} trên tổng số
                                                            {' ' + this.props.totalPages} trang
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-7" style={{textAlign: 'right'}}>
                                                        <ul className="pagination pagination-primary">


                                                            {_.range(1, this.props.totalPages + 1).map(page => {
                                                                if (Number(currentPage) === page) {
                                                                    return (
                                                                        <li key={page} className="active">
                                                                            <a onClick={() => this.loadCustomers(page, limit)}>{page}</a>
                                                                        </li>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <li key={page}>
                                                                            <a onClick={() => this.loadCustomers(page, limit)}>{page}</a>
                                                                        </li>
                                                                    );
                                                                }
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-footer">
                                        <div className="float-right">
                                            <div className="btn btn-info btn-simple"> Tổng khách
                                                hàng: {}
                                            </div>
                                            <div className="btn btn-danger btn-simple"> Tổng
                                                tiền: {this.props.totalMoneys}
                                            </div>
                                            <div className="btn btn-success btn-simple"> Tổng
                                                nợ: {this.props.totalDebtMoneys}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CustomerContainer.propTypes = {
    customerActions: PropTypes.object,
    customersList: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPages: PropTypes.number,
    totalDebtMoneys: PropTypes.number,
    totalMoneys: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        customersList: state.customers.customersList,
        isLoading: state.customers.isLoading,
        totalPages: state.customers.totalPages,
        totalDebtMoneys: state.customers.totalDebtMoneys,
        totalMoneys: state.customers.totalMoneys,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        customerActions: bindActionCreators(customerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);