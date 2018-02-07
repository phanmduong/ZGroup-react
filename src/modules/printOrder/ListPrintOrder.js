import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {connect} from 'react-redux';
import * as printOrderActions from "./printOrderActions";
import {bindActionCreators} from 'redux';
import * as helper from "../../helpers/helper";
import {PRINT_ORDER_STATUS} from "../../constants/constants";
import {Link} from "react-router";


class ListPrintOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.confirm = this.confirm.bind(this);
    }

    confirm(id) {
        helper.confirm("warning", "Xác Nhận Duyệt", "Sau khi duyệt sẽ không thể hoàn tác?",
            () => {
                return this.props.printOrderActions.confirmOrder(id,
                    () => {
                        helper.showNotification("Duyệt thành công.");
                        return this.props.printOrderActions.loadPrintOrders(this.props.paginator.current_page);
                    }
                );
            }
        );
    }

    render() {
        let {listPrintOrder} = this.props;
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-striped table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th>STT</th>
                        <th>Mã giao dịch</th>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                        <th>Ngày đặt</th>
                        <th>Trạng thái</th>
                        <th style={{width: "10%"}}>Ghi chú</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {listPrintOrder.map((order, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.command_code ?
                                    <Link to={"/business/print-order/edit/" + order.id} className="text-name-student-register"> {order.command_code}</Link>
                                    :
                                    "Chưa có"
                                }</td>
                                <td>{order.good.name}</td>
                                <td>{order.quantity}</td>
                                <td>{order.order_date}</td>
                                <td>{PRINT_ORDER_STATUS[order.status || 0]}</td>
                                <td style={{wordBreak: "break-word"}}>{
                                    order.note.length > 60 ?
                                        (order.note.substring(0, 60) + "...")
                                        :
                                        order.note
                                }</td>
                                <td><ButtonGroupAction
                                    editUrl={"/business/print-order/edit/" + order.id}
                                    disabledDelete={true}
                                    children={
                                        (!order.status  || order.status == 0) ?
                                        <a data-toggle="tooltip" title="Duyệt"
                                           type="button" rel="tooltip"
                                           onClick={() => {
                                               return this.confirm(order.id);
                                           }}
                                        >
                                            <i className="material-icons">done</i>
                                        </a>
                                            :<div/>
                                    }
                                /></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}


ListPrintOrder.propTypes = {
    isLoading: PropTypes.bool,
    listPrintOrder: PropTypes.array,
    paginator: PropTypes.object,
    printOrderActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
        listPrintOrder: state.printOrder.listPrintOrder,
        paginator: state.printOrder.paginator,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        printOrderActions: bindActionCreators(printOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPrintOrder);

