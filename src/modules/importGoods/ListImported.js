import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {dotNumber} from "../../helpers/helper";
import {Link} from 'react-router';

class ListImported extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-rose">
                        <th className="text-center">Mã hóa đơn</th>
                        <th className="text-center">Tình trạng</th>
                        <th className="text-center">Ngày nhập</th>
                        <th className="text-center">Người nhập</th>
                        <th className="text-center">NCC / KH</th>
                        <th>SL</th>
                        <th>Tổng tiền</th>
                        <th>Nợ</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.importOrders.map((importOrder, index) => {
                            let isCompleted = importOrder.status.trim().toLowerCase() === 'completed';
                            return (
                                <tr key={index}>
                                    <td><Link to={isCompleted ? `/good/import-good/${importOrder.id}` : `/good/import-good/${importOrder.id}/edit`}>{importOrder.code}</Link></td>
                                    <td>{
                                        isCompleted ?
                                            <button className="btn btn-xs btn-main btn-success">
                                                Hoàn thành
                                            </button>
                                            :
                                            <button className="btn btn-xs btn-main btn-info">
                                                Lưu tạm
                                            </button>
                                    }

                                    </td>
                                    <td>{importOrder.created_at}</td>
                                    <td>{importOrder.staff ? importOrder.staff.name : "Không nhập"}</td>
                                    <td>{importOrder.user ? importOrder.user.name : "Không nhập"}</td>
                                    <td>{dotNumber(importOrder.total_quantity)}</td>
                                    <td>{dotNumber(importOrder.total_money)}đ</td>
                                    <td>{dotNumber(importOrder.debt)}đ</td>
                                    <td><ButtonGroupAction
                                        disabledDelete={isCompleted}
                                        disabledEdit={isCompleted}
                                        delete={this.props.deleteImportOrder}
                                        object={importOrder}
                                        editUrl={`/good/import-good/${importOrder.id}/edit`}
                                    /></td>
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

ListImported.propTypes = {
    importOrders: PropTypes.array.isRequired,
    setTable: PropTypes.func.isRequired,
    deleteImportOrder: PropTypes.func.isRequired,
};

export default ListImported;