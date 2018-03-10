import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import { connect } from 'react-redux';
import * as orderedGoodActions from "./orderedGoodAction";
import { bindActionCreators } from 'redux';
import * as helper from "../../../helpers/helper";

class orderedList extends React.Component {
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
                return this.props.orderedGoodActions.confirmOrder(id,
                    () => {
                        helper.showNotification("Duyệt thành công.");
                        return this.props.orderedGoodActions.loadAllOrderedGood(this.props.paginator.current_page);
                    }
                );
            }
        );
    }

    render() {
        let { orderedList } = this.props;
        console.log(this.props);
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
                            <th>Tổng giá trị</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {orderedList.map((order, index) => {
                            
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order.company.name}</td>
                                    <td>{order.command_code}</td>
                                    <td>{order.goods.length}</td>

                                    <td>{helper.dotNumber(getTotalPrice(order.goods))}</td>
                                    <td><ButtonGroupAction
                                        editUrl={"/business/ordered-good/edit/" + order.id}
                                        disabledDelete={true}
                                        disabledEdit={order.status > 0}
                                        children={
                                            (order.status == 0) ?
                                                <a data-toggle="tooltip" title="Duyệt"
                                                    type="button"
                                                    onClick={() => { return this.confirm(order.id); }}
                                                    rel="tooltip"
                                                >
                                                    <i className="material-icons">done</i>
                                                </a>
                                                : <div />
                                        }
                                    />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}


orderedList.propTypes = {
    isLoading: PropTypes.bool,
    orderedList: PropTypes.array,
    paginator: PropTypes.object,
    orderedGoodActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderedGood.isLoading,
        orderedList: state.orderedGood.orderedList,
        paginator: state.orderedGood.paginator,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        orderedGoodActions: bindActionCreators(orderedGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(orderedList);

function getTotalPrice(arr) {
    let sum = 0;
    arr.forEach(e => {
        sum += e.total_price;
    });
    return sum;
}