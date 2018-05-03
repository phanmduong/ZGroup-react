import React from "react";
import PropTypes from "prop-types";


class ImportItemOrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showInfoModal: false,
            id: 0,
        };
        this.loadHistoryImportOrder = this.loadHistoryImportOrder.bind(this);
    }


    loadHistoryImportOrder(page, id) {
        this.props.loadHistoryImportOrder(page, id);
    }

    render() {
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>STT</th>
                        <th> Mã đặt hàng</th>
                        <th>Nhà cung cấp</th>
                        <th> Số sản phẩm</th>
                        <th> Số lần nhập</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((pp, index) => {
                            return (
                                <tr key={pp.id}>
                                    <td/>
                                    <td> {index + 1} </td>
                                    <td>  {pp.command_code}</td>
                                    <td>  {pp.company.name}</td>
                                    <td> {pp.good_count} </td>
                                    <td> {(pp.goods.length - pp.good_count) / pp.good_count}</td>
                                    <td>
                                        {(pp.status == 2) ?
                                            <div className="btn-group-action">
                                                <a data-toggle="tooltip" title="Duyệt"
                                                   type="button"
                                                   onClick={() =>
                                                       this.props.changeStatus(pp.id)
                                                   }
                                                   rel="tooltip"
                                                >
                                                    <i className="material-icons">done</i>
                                                </a></div>
                                            : <div/>}

                                    </td>

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

ImportItemOrderList.propTypes = {
    data: PropTypes.array.isRequired,
    loadHistoryImportOrder: PropTypes.func,
    paginator: PropTypes.object,
    changeStatus: PropTypes.func,
    historyImportOrder: PropTypes.array,

};

export default (ImportItemOrderList);