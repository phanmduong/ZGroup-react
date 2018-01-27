import React from 'react';
import PropTypes from 'prop-types';
import {dotNumber} from "../../helpers/helper";

class InventoryGoodComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th/>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Vốn tồn kho</th>
                        <th>Giá trị tồn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.inventories && this.props.inventories.map((inventory) => {
                            return (
                                <tr key={inventory.id}>
                                    <td style={{width: "40px"}}>
                                        <img style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            verticalAlign: "middle",
                                            background: "url(" + inventory.avatar_url + ") center center / cover",
                                            display: "inline-block",
                                            float: "right",
                                            marginLeft: "3px"
                                        }} data-toggle="tooltip" title="" type="button"
                                             rel="tooltip"
                                             data-original-title=""/>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showWareHouseModal(inventory)}>
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
            </div>
        );
    }
}

InventoryGoodComponent.propTypes = {
    inventories: PropTypes.array.isRequired,
    showWareHouseModal: PropTypes.func.isRequired
};

export default InventoryGoodComponent;