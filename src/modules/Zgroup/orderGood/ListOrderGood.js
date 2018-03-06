import React                            from 'react';
import PropTypes                        from 'prop-types';
import ButtonGroupAction                from "../../../components/common/ButtonGroupAction";
import {connect}                        from 'react-redux';
import  * as orderGoodActions from "./orderGoodAction";
import {bindActionCreators}             from 'redux';
import * as helper from "../../../helpers/helper";

class orderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
        
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("next list props",nextProps);
    // }

    

    render() {
        let {orderList} = this.props;
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-striped table-no-border table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th>STT</th>
                        <th>Nhà cung cấp</th>
                        <th>Mã đặt hàng</th>
                        <th>Số sản phẩm</th>
                        <th>Tổng</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {orderList.map((order, index)=>{
                        return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.company.name}</td>                                
                                <td>{order.command_code}</td>                                
                                <td>{order.goods.length}</td>
                                
                                <td>{helper.dotNumber(getTotalPrice(order.goods))}</td>
                                <td><ButtonGroupAction
                                    editUrl={"/business/order-good/edit/" + order.id}
                                    disabledDelete={true}
                                    children= {
                                        !order.status &&
                                        <a data-toggle="tooltip" title="Duyệt"
                                           type="button"
                                           onClick={()=>{}}
                                           rel="tooltip"
                                        >
                                            <i className="material-icons">done</i>
                                        </a>
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


orderList.propTypes = {
    isLoading : PropTypes.bool,
    orderList : PropTypes.array,
    paginator: PropTypes.object,
    orderGoodActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderGood.isLoading,
        orderList: state.orderGood.orderList,
        paginator: state.orderGood.paginator,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        orderGoodActions: bindActionCreators(orderGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(orderList);

function getTotalPrice(arr){
    let sum = 0;
    arr.forEach(e => {
        sum += e.price;
    });
    return sum;
}