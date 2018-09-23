import React from 'react';
import PropTypes from 'prop-types';
import {dotNumber} from "../../helpers/helper";

class InventoryOrderComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>Mã đơn hàng</th>
                        <th>Link sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.inventories && this.props.inventories.map((inventory) => {
                            return (
                                <tr key={inventory.id}>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item">
                                            {inventory.code}
                                        </a>
                                    </td>
                                    <td style={{width: "200px"}}>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           target="_blank"
                                           data-original-title="Remove item"
                                            href={JSON.parse(inventory.attach_info).link}>
                                            {JSON.parse(inventory.attach_info).link}
                                        </a>
                                    </td>
                                    <td>{inventory.quantity}</td>
                                    <td>{dotNumber(inventory.price)}đ</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

InventoryOrderComponent.propTypes = {
    inventories: PropTypes.array.isRequired,
};

export default InventoryOrderComponent;