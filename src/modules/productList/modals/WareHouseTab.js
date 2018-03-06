import React from 'react';
import PropTypes from 'prop-types';

class WareHouseTab extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                {
                    this.props.warehouses.length === 0 ? (
                        <div style={{
                            textAlign: "center",
                            margin: "10px"
                        }}>
                            <h4 className="panel-title"><b>Không có kho hàng nào</b></h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                <tr className="text-rose">
                                    <th>STT</th>
                                    <th>Tên kho</th>
                                    <th>Địa chỉ</th>
                                    <th>Cơ sở</th>
                                    <th>Địa chỉ cơ sở</th>
                                    <th>SL</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.warehouses && this.props.warehouses.map((warehouse, id) => {
                                        return (
                                            <tr key={id}>
                                                <td>{id + 1}</td>
                                                <td>{warehouse.name}</td>
                                                <td>{warehouse.location}</td>
                                                {
                                                    warehouse.base ? (
                                                        <td>{warehouse.base.name}</td>
                                                    ) : (<td>Chưa có</td>)
                                                }
                                                {
                                                    warehouse.base ? (
                                                        <td>{warehouse.base.address}</td>
                                                    ) : (<td>Chưa có</td>)
                                                }
                                                <td>{warehouse.quantity}</td>
                                            </tr>
                                        );
                                    })
                                }
                                <tr>
                                    <td/>
                                    <td><b>Tổng</b></td>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td>
                                        <b>{this.props.warehouses.reduce((sum, warehouse) => sum + warehouse.quantity, 0)}</b>
                                    </td>
                                    <td/>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        );
    }
}

WareHouseTab.propTypes = {
    warehouses: PropTypes.array.isRequired
};

export default WareHouseTab;