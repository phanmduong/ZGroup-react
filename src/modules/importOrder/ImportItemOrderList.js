import React from "react";
import PropTypes from "prop-types";
import HistoryImportOrderForChangeStatus from "./HistoryImportOrderForChangeStatus";

class ImportItemOrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showInfoModal: false,
            id: 0,
        };
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.loadHistoryImportOrder = this.loadHistoryImportOrder.bind(this);
    }

    openInfoModal(id) {
        this.setState({id: id, showInfoModal: true});
        this.props.loadHistoryImportOrder(1, id);

    }

    closeInfoModal() {
        this.setState({showInfoModal: false});
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
                        <th>Nhà cung cấp</th>
                        <th> Số sản phẩm</th>

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
                                    <td>  {pp.company.name}</td>
                                    <td> {pp.goods.length} </td>

                                    <td>
                                        { (pp.status == 2) ?
                                        <a data-toggle="tooltip" title="Duyệt"
                                           type="button"
                                           onClick={() =>
                                               this.openInfoModal(pp.id)
                                           }
                                           rel="tooltip"
                                        >
                                            <i className="material-icons">done</i>
                                        </a> : <div/> }

                                    </td>

                                </tr>
                            );
                        })
                    }
                    </tbody>

                </table>
                <HistoryImportOrderForChangeStatus
                    show={this.state.showInfoModal}
                    onHide={this.closeInfoModal}
                    data={this.props.historyImportOrder}
                    paginator={this.props.paginator}
                    id={this.state.id}
                    loadHistoryImportOrder={this.loadHistoryImportOrder}
                    changeStatus={this.props.changeStatus}
                />
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