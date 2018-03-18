import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';


class ListChildCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isShowModal: false,
            customerGroups: [],
        };
        this.toggle = this.toggle.bind(this);
        this.openModalGroupCustomer = this.openModalGroupCustomer.bind(this);
        this.closeModalGroupCustomer = this.closeModalGroupCustomer.bind(this);
    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    openModalGroupCustomer(groups) {
        this.setState({isShowModal: true, customerGroups: groups});
    }

    closeModalGroupCustomer() {
        this.setState({isShowModal: false});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <table id="property-table" className="table table-hover" role="grid"
                               aria-describedby="property-table_info">
                            <thead>
                            <tr className="text-rose" role="row">
                                <th>Tên khách hàng</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th> Ngày mua cuối</th>
                                <th> Nhóm khách hàng</th>
                                {/*<th/>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.customersList && this.props.customersList.map(
                                (customer) => {
                                    return (
                                        <tr role="row" className="even" key={customer.id}>
                                            <td className="sorting_1">
                                                <a onClick={() => {
                                                    this.props.openInfoCustomer(customer);
                                                }}>{customer.name}</a>
                                            </td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.last_order}</td>
                                            <td>
                                                <a onClick={() => {
                                                    this.openModalGroupCustomer(customer.count_groups);
                                                }}>{(customer.count_groups ? customer.count_groups : "0") + " Nhóm"}</a>
                                            </td>
                                            {/*<td>*/}
                                            {/*<div className="btn-group-action">*/}
                                            {/*<div style={{display: 'inline-block'}}>*/}
                                            {/*<a data-toggle="tooltip" title type="button"*/}
                                            {/*rel="tooltip"*/}
                                            {/*data-original-title="Sửa"*/}
                                            {/*onClick={() => this.props.openFormDataInEdit(customer)}*/}
                                            {/*>*/}
                                            {/*<i className="material-icons">edit</i>*/}
                                            {/*</a>*/}
                                            {/*</div>*/}
                                            {/*</div>*/}
                                            {/*</td>*/}
                                        </tr>

                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal show={this.state.isShowModal} bsSize="large" bsStyle="primary"
                       onHide={this.closeModalGroupCustomer}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="modal-header">
                                <h4 id="contained-modal-title" className="modal-title">Danh sách nhóm khách hàng</h4>
                            </div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="card">
                            <table id="property-table" className="table table-hover" role="grid"
                                   aria-describedby="property-table_info">
                                <thead>
                                <tr className="text-rose" role="row">
                                    <th>Tên nhóm khách hàng</th>
                                    <th>Mô tả</th>
                                </tr>
                                </thead>
                                <tbody>

                                {this.state.customerGroups && this.state.customerGroups.map(
                                    (group) => {
                                        return (
                                            <tr role="row" className="even" key={group.id}>
                                                <td>
                                                    <div className="bootstrap-tagsinput">
                                                        <span className="tag btn" style={{
                                                            backgroundColor: group.color,
                                                            fontSize: 12
                                                        }}>{group.name + '  '}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{group.description}</td>
                                            </tr>

                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ListChildCustomer.propTypes = {
    customersList: PropTypes.array,
    openFormDataInEdit: PropTypes.func,
    openInfoCustomer: PropTypes.func,
};


export default ListChildCustomer;