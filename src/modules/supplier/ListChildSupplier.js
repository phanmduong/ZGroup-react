import React from 'react';
import PropTypes from 'prop-types';


class ListChildSupplier extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <table id="property-table" className="table dataTable" role="grid"
                               aria-describedby="property-table_info">
                            <thead>
                            <tr className="text-rose" role="row">
                                <th>Tên nhà cung cấp</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.suppliersList && this.props.suppliersList.map(
                                (supplier => {
                                    return (
                                        <tr role="row" className="even" key={supplier.id}>
                                            <td className="sorting_1">{supplier.name}</td>
                                            <td>{supplier.phone}</td>
                                            <td>{supplier.email}</td>
                                            <td>{supplier.address}</td>
                                            <td>
                                                <div className="btn-group-action">
                                                    <div style={{display: 'inline-block'}}>
                                                        <a onClick={() => {
                                                               this.props.openFormDataInEdit(supplier, supplier.id);
                                                           }}
                                                        >
                                                            <i className="material-icons">edit</i>
                                                        </a>
                                                        <a onClick={() => this.props.deleteSupplier(supplier.id, supplier.name)}
                                                        >
                                                            <i className="material-icons">delete</i>
                                                        </a>

                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    );
                                })
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

ListChildSupplier.propTypes = {
    suppliersList: PropTypes.array,
    deleteSupplier: PropTypes.func,
    openFormDataInEdit: PropTypes.func,
};


export default ListChildSupplier;