import React                            from 'react';
import PropTypes                        from 'prop-types';
import ButtonGroupAction                from "../../../components/common/ButtonGroupAction";
import {connect}                        from 'react-redux';
import  * as exportOrderActions from "./exportOrderActions";
import {bindActionCreators}             from 'redux';
import * as helper from "../../../helpers/helper";

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

    confirm(id){
        helper.confirm("warning","Xác Nhận Duyệt","Sau khi duyệt sẽ không thể hoàn tác?",
            ()=>{return this.props.exportOrderActions.confirmOrder(id,
                ()=>{
                    helper.showNotification("Duyệt thành công.");
                    return this.props.exportOrderActions.loadExportOrders(this.props.paginator.current_page);
                }
            );}
        );
    }

    render() {
        let {listExportOrder} = this.props;
        console.log(this.props);
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-striped table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th>STT</th>
                        <th>Nhà phân phối</th>
                        <th>Mã đơn hàng</th>
                        <th>Số sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {listExportOrder.map((order, index)=>{
                        return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.company.name}</td>                                
                                <td>{order.command_code}</td>                                
                                <td>{order.goods.length}</td>
                                
                                <td>{helper.dotNumber(getTotalPrice(order.goods))}</td>
                                <td><ButtonGroupAction
                                    editUrl={"/business/export-order/edit/" + order.id}
                                    disabledDelete={true}
                                    disabledEdit={order.status > 2}
                                    children= {
                                        (order.status && (order.status == 2)) ?
                                        <a data-toggle="tooltip" title="Duyệt"
                                           type="button"
                                           onClick={()=>{return this.confirm(order.id);}}
                                           rel="tooltip"
                                        >
                                            <i className="material-icons">done</i>
                                        </a>
                                        : <div/>
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
    isLoading : PropTypes.bool,
    listExportOrder : PropTypes.array,
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

function getTotalPrice(arr){
    let sum = 0;
    arr.forEach(e => {
        sum += e.price;
    });
    return sum;
}