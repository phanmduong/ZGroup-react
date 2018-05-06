import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import { connect } from 'react-redux';
import * as exportOrderActions from "./exportOrderActions";
import { bindActionCreators } from 'redux';
import * as helper from "../../../helpers/helper";
import moment from "moment";

class ListExportOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
        this.confirm = this.confirm.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("next list props",nextProps);
    // }

    confirm(id) {
        helper.confirm("warning", "Xác Nhận Duyệt", "Sau khi duyệt sẽ không thể hoàn tác?",
            () => {
                return this.props.exportOrderActions.confirmOrder(id,
                    () => {
                        helper.showNotification("Duyệt thành công.");
                        return this.props.exportOrderActions.loadExportOrders(this.props.paginator.current_page);
                    }
                );
            }
        );
    }

    render() {
        let { listExportOrder } = this.props;
        //console.log('list', this.props);
        return (
            <div className="table-responsive">

                <table id="datatables"
                    className="table table-striped table-no-bordered table-hover"
                    cellSpacing="0" width="100%" style={{ width: "100%" }}>
                    <thead className="text-rose">
                        <tr>
                            <th>STT</th>
                            <th>Nhà phân phối</th>
                            <th>Mã đơn hàng</th>
                            <th>Số sản phẩm</th>
                            <th>Số lượng xuất</th>
                            <th>Ngày tạo</th>
                            <th>Tổng tiền</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {listExportOrder.map((order, index) => {
                            let tmp = isOverTime(order.created_at);
                            let overTime = order.created_at ? tmp : false;
                            let date = moment(order.created_at.date);
                            return (
                                <tr key={index} style={(overTime && order.status < 3) ? { backgroundColor: "lightcoral", color: "white" } : {}}>
                                    <td>{index + 1}</td>
                                    <td>{order.company.name}</td>
                                    <td>{order.command_code}</td>
                                    <td>{order.goods.length}</td>
                                    <td>{getSumquantity(order.goods)}</td>
                                    <td>{date.format("D-M-YYYY")}</td>
                                    <td>{helper.dotNumber(getTotalPrice(order.goods, order.company))}</td>
                                    <td><ButtonGroupAction
                                        editUrl={"/business/export-order/edit/" + order.id}
                                        disabledDelete={true}
                                        disabledEdit={order.status > 2}
                                        children={
                                            (order.status && (order.status == 2)) ?
                                                <a data-toggle="tooltip" title="Duyệt"
                                                    type="button"
                                                    onClick={() => { return this.confirm(order.id); }}
                                                    rel="tooltip"
                                                >
                                                    <i className="material-icons">done</i>
                                                </a>
                                                : <div />
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


ListExportOrder.propTypes = {
    isLoading: PropTypes.bool,
    listExportOrder: PropTypes.array,
    paginator: PropTypes.object,
    exportOrderActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.exportOrder.isLoading,
        listExportOrder: state.exportOrder.listExportOrder,
        paginator: state.exportOrder.paginator,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        exportOrderActions: bindActionCreators(exportOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExportOrder);

function getTotalPrice(arr, comp) {
    let sum = 0;
    arr.forEach(e => {
        let pr = e.price * e.export_quantity;

        switch (e.good.type) {
            case "book_comic": {
                pr -= comp.discount_comic * pr / 100;
                break;
            }
            case "book_text": {
                pr -= comp.discount_text * pr / 100;
                break;
            }
        }
        sum += pr;
    });
    return sum;
}

function getSumquantity(arr) {
    let sum = 0;
    arr.forEach(e => {
        sum += e.export_quantity;
    });
    return sum;
}

function isOverTime(inp) {
    let cre_date = moment(inp.date);
    while (cre_date.day() == 0 || cre_date.day() == 6) {
        cre_date = cre_date.add(1, "days");
    }
    cre_date = cre_date.add(2, "days");
    let res = moment(moment.now()).isAfter(cre_date);
    return res;
}


