import React from 'react';
import PropTypes from 'prop-types';
import {dotNumber} from "../../helpers/helper";
import HistoryModalContainer from "./HistoryModalContainer";

class InventoryGoodComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Vốn tồn kho</th>
                        <th>Giá trị tồn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.inventories.map((inventory) => {
                            return (
                                <tr key={inventory.id}>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.getHistoryInventories(inventory)}>
                                            {inventory.code}
                                        </a>
                                    </td>
                                    <td style={{width: "200px"}}>{inventory.name}</td>
                                    <td>{inventory.quantity}</td>
                                    <td>{dotNumber(inventory.import_money)}đ</td>
                                    <td>{dotNumber(inventory.money)}đ</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <HistoryModalContainer/>
            </div>
        );
    }
}

InventoryGoodComponent.propTypes = {
    inventories: PropTypes.array.isRequired,
    getHistoryInventories: PropTypes.func.isRequired
};

export default InventoryGoodComponent;