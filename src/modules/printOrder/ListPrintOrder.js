import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import { connect } from 'react-redux';
import * as printOrderActions from "./printOrderActions";
import ConfirmOrderModal from "./ConfirmOrderModal";
import { bindActionCreators } from 'redux';
import * as helper from "../../helpers/helper";
import { PRINT_ORDER_STATUS } from "../../constants/constants";
import { Link } from "react-router";
//import ReactSelect from 'react-select';
//import FormInputDate from '../../components/common/FormInputDate';
import Loading from "../../components/common/Loading";
/*  */
const textAlignCenter = { textAlign: "center" };


class ListPrintOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openInfoModal: false,
            data: defaultData,
            statuses: getStatusArr(),
            selectedDate: '',
        };
        this.confirm = this.confirm.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.openConfirmModal = this.openConfirmModal.bind(this);
    }


    componentWillMount() {
        this.props.printOrderActions.getAllCodes();
        this.props.printOrderActions.loadAllGoods();
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



    openConfirmModal(obj) {
        this.setState({ openInfoModal: true, data: obj });
    }
    closeConfirmModal() {
        this.setState({ openInfoModal: false });
    }

    render() {
        let { listPrintOrder, isLoading, } = this.props;


        //console.log(this.props);
        return (
            <div className="table-responsive" style={{ minHeight: 300 }}>
                <ConfirmOrderModal
                    data={this.state.data}
                    show={this.state.openInfoModal}
                    onHide={this.closeConfirmModal}
                    confirmOrder={this.confirm}
                />
                <table id="datatables"
                    className="table table-striped table-no-bordered table-hover"
                    cellSpacing="0" width="100%" style={{ width: "100%" }}>
                    <thead className="text-rose">
                        <tr>
                            <th>STT</th>
                            <th style={textAlignCenter}>Mã giao dịch</th>
                            <th>Tên sách</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                            <th />
                        </tr>
                        {/* <tr>
                            <th />
                            <th style={filterStyle}>
                                <ReactSelect
                                    disabled={isLoading}
                                    className=""
                                    options={codes}
                                    onChange={changeCodeFilter}
                                    value={selectedCode}
                                    name="filter_class"
                                />
                            </th>
                            <th style={filterStyle}>
                                <ReactSelect
                                    disabled={isLoading}
                                    className=""
                                    options={goods}
                                    onChange={changeProduct}
                                    value={selectedProduct}
                                    name="filter_class"
                                />
                            </th>
                            <th style={filterStyle}>
                                 <div className="col-md-12">
                                <FormInputDate
                                    label=""
                                    name="date"
                                    updateFormData={(e) => changeDate(e)}
                                    value={selectedDate}
                                    id="date"

                                /></div> 
                            </th>
                            <th colSpan={2} style={filterStyle}>
                                <ReactSelect
                                    disabled={isLoading}
                                    className=""
                                    options={this.state.statuses}
                                    onChange={changeStatus}
                                    value={selectedStatus}
                                    name="filter_class"
                                />
                            </th>
                        </tr> */}
                    </thead>
                    {
                        isLoading ? <Loading /> :
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
                                            <td>{order.order_date}</td>
                                            <td>{PRINT_ORDER_STATUS[order.status || 0]}</td>
                                            <td><ButtonGroupAction
                                                editUrl={"/business/print-order/edit/" + order.id}
                                                disabledDelete={true}
                                                disabledEdit={order.status > 0}
                                                children={
                                                    (!order.status || order.status == 0) ?
                                                        <a data-toggle="tooltip" title="Duyệt"
                                                            type="button" rel="tooltip"
                                                            onClick={() => {
                                                                return this.openConfirmModal(order);
                                                            }}
                                                        >
                                                            <i className="material-icons">done</i>
                                                        </a>
                                                        : <div />
                                                }
                                            /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>}
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
    changeStatus: PropTypes.func,
    changeCodeFilter: PropTypes.func,
    changeProduct: PropTypes.func,
    codes: PropTypes.array,
    goods: PropTypes.array,
    selectedCode: PropTypes.string,
    selectedProduct: PropTypes.string,
    selectedStatus: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
        listPrintOrder: state.printOrder.listPrintOrder,
        paginator: state.printOrder.paginator,
        codes: state.printOrder.codes,
        goods: state.printOrder.goods,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        printOrderActions: bindActionCreators(printOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPrintOrder);


let defaultData = {
    company: { id: null, name: "" },
    staff: { id: null, name: "" },
    good: { id: null, name: "" },
    quantity: 0,
    command_code: "",
    core1: JSON.stringify({
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    }),
    core2: JSON.stringify({
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    }),
    cover1: JSON.stringify({
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    }),
    cover2: JSON.stringify({
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    }),
    spare_part1: JSON.stringify({
        name: "",
        number: 0,
        material: "",
        size: 0,
        price: 0,
        made_by: "",
    }),
    spare_part2: JSON.stringify({
        name: "",
        number: 0,
        material: "",
        size: 0,
        price: 0,
        made_by: "",
    }),
    packing1: JSON.stringify({
        name: "",
        price: 0,
    }),
    packing2: JSON.stringify({
        name: "",
        price: 0,
    }),
    other: JSON.stringify({
        name: "",
        price: 0,
    }),
    price: 0,
    note: "",
    order_date: null,
    receive_date: null,
};

function getStatusArr() {
    let res = PRINT_ORDER_STATUS.map((obj, id) => { return { value: id, label: obj }; });
    return [{ value: '', label: 'Tất cả' }, ...res];
}