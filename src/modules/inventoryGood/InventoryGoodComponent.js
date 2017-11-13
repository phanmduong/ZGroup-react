import React from 'react';
import PropTypes from 'prop-types';
import {dotNumber} from "../../helpers/helper";
import {Link} from "react-router";
import HistoryModalContainer from "./HistoryModalContainer";

class InventoryGoodComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="material-datatables">
                <table id="imported-goods-table" className="table" width="100%">
                    <thead>
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
                                            onClick={()=>this.props.getHistoryInventories(inventory.id)}>
                                            {inventory.code}
                                        </a>
                                    </td>
                                    <td>{inventory.name}</td>
                                    <td>{inventory.quantity}</td>
                                    <td>{dotNumber(inventory.import_money)}đ</td>
                                    <td>{dotNumber(inventory.money)}đ</td>
                                    <td>
                                        <div className="btn-group-action">
                                            <Link to={`/good/${inventory.id}/edit`}
                                                  style={{color: "#878787"}}
                                                  data-toggle="tooltip" title=""
                                                  type="button" rel="tooltip"
                                                  data-original-title="Sửa"><i
                                                className="material-icons">edit</i></Link>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Xoá"><i
                                                className="material-icons">delete</i></a>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Ngừng kinh doanh">
                                                <i className="material-icons">pause</i></a>
                                        </div>
                                    </td>
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
    inventories:PropTypes.array.isRequired,
    getHistoryInventories:PropTypes.func.isRequired
};

export default InventoryGoodComponent;