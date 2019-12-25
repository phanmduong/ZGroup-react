import React from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import PropTypes from 'prop-types';
import Avatar from "../../../components/common/Avatar";
import Search from '../../../components/common/Search';
import Loading from "../../../components/common/Loading";
import Pagination from '../../../components/common/Pagination';


class AddCustomerModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            limit: 6, // fix cung
        };
        this.loadFunction = this.loadFunction.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentWillMount() {
        this.loadFunction(1);
    }

    loadFunction(page) {
        this.setState({page: page});
        this.props.loadFunction(page, this.state.limit, this.state.query, this.props.stringId);
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
            this.props.loadFunction(this.state.page, this.state.limit, this.state.query, this.props.stringId);
        }.bind(this), 500);
    }

    updateFormData(item) {
        const field = this.props.fieldName;
        const field2 = this.props.fieldName2;
        let formData = {...this.props.formData};
        formData[field] = [... formData[field], item.id];
        formData[field2] = [... formData[field2], item];
        this.props.updateFormData(formData);
        this.props.assignCustomer(item.id);
    }


    render() {
        let name = this.props.name;
        let isSearch = this.props.isSearch;
        let isPagination = this.props.isPagination;
        let currentPage = this.state.page;
        let customersShowInAddModal = this.props.customersShowInAddModal;

        return (
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">people</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">
                        {name}
                    </h4>
                    <div className="row">
                        <div className="col-md-4" style={{marginTop: 45}}>


                            {isSearch ?
                                <Search
                                    onChange={this.onSearchChange}
                                    value={this.state.query}
                                    placeholder="Tìm kiếm ..."/> : null}
                            {
                                this.props.isLoadingOverlay ?
                                    <Loading/> : (
                                        <ListGroup>
                                            {this.props.items.map((item) =>
                                                (
                                                    <ListGroupItem
                                                        key={item.id}
                                                        onClick={(e) => {
                                                            this.updateFormData(item);
                                                            e.preventDefault();
                                                        }}
                                                    >

                                                        <div style={{
                                                            display: "flex", justifyContent: "space-between",
                                                            lineHeight: "30px"
                                                        }}>
                                                            <div style={{display: "flex"}}>
                                                                {item.avatar_url ?
                                                                    <Avatar size={30} url={item.avatar_url}/> : null}
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                    </ListGroupItem>
                                                )
                                            )}


                                            {isPagination ? <Pagination
                                                totalPages={this.props.totalPages}
                                                currentPage={currentPage}
                                                loadDataPage={this.loadFunction}/> : null}

                                        </ListGroup>
                                    )
                            }
                        </div>
                        <div className="col-md-8">
                            <div className="table-responsive">
                                <table id="property-table" className="table table-hover" role="grid"
                                       aria-describedby="property-table_info">
                                    {customersShowInAddModal && customersShowInAddModal.length !== 0 ?
                                        <thead>

                                        <tr className="text-rose" role="row">
                                            <th/>
                                            <th>Tên khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Địa chỉ</th>
                                            <th> Ngày mua cuối</th>
                                            <th>Tổng tiền hàng</th>
                                            <th> Tiền trả hàng</th>
                                            <th> Tiền nợ</th>
                                        </tr>
                                        </thead>
                                        : null
                                    }
                                    <tbody>
                                    {customersShowInAddModal && customersShowInAddModal.map(
                                        (customer) => {
                                            return (
                                                <tr role="row" className="even" key={customer.id}>
                                                    <td>
                                                        <a>
                                                            <i className="material-icons"
                                                               onClick={() => {
                                                                   this.props.removeCustomer(customer);
                                                               }}
                                                            >delete</i>
                                                        </a>
                                                    </td>
                                                    <td className="sorting_1">{customer.name}</td>
                                                    <td>{customer.phone}</td>
                                                    <td>{customer.address}</td>
                                                    <td>{customer.last_order}</td>
                                                    <td>{customer.total_money}</td>
                                                    <td>{customer.total_paid_money}</td>
                                                    <td>{customer.debt}</td>

                                                </tr>

                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

AddCustomerModal.propTypes = {
    formData: PropTypes.object,
    name: PropTypes.string, //  ten overlays
    icon: PropTypes.string,
    fieldName: PropTypes.string.isRequired,    // ten truong can update
    fieldName2: PropTypes.string.isRequired,    // ten truong can update
    loadFunction: PropTypes.func,    // load list tren overlays
    updateFormData: PropTypes.func,   // de update overlays
    assignCustomer: PropTypes.func,   // de update overlays
    removeCustomer: PropTypes.func,   // de update overlays
    isLoadingOverlay: PropTypes.bool,
    isPagination: PropTypes.bool,
    isSearch: PropTypes.bool,
    items: PropTypes.array,   // element co name , avatar_url , id
    stringId: PropTypes.array,
    customersShowInAddModal: PropTypes.array,
    totalPages: PropTypes.number,
};
export default AddCustomerModal;
