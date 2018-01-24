import React                            from 'react';
import PropTypes                        from 'prop-types';
import ButtonGroupAction                from "../../components/common/ButtonGroupAction";
import {connect}                        from 'react-redux';
import  * as printOrderActions from "./printOrderActions";
import {bindActionCreators}             from 'redux';

class ListPrintOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("nextProps",nextProps);
    // }

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
                        <th>Đối tác</th>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                        <th>Ngày đặt</th>
                        <th>Ngày nhận</th>
                        <th>Ghi chú</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {listPrintOrder.map((order, index)=>{
                        return(
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.command_code ?
                                    <a className="text-name-student-register"> {order.command_code}</a>
                                    :
                                    "Chưa có"
                                }</td>
                                <td>{order.company.name}</td>
                                <td>{order.good.name}</td>
                                <td>{order.quantity}</td>
                                <td>{order.order_date}</td>
                                <td>{order.receive_date}</td>
                                <td>{order.note}</td>
                                <td><ButtonGroupAction
                                    edit={()=>{}}
                                    disabledDelete={true}
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
    isLoading : PropTypes.bool,
    listPrintOrder : PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
        listPrintOrder: state.printOrder.listPrintOrder,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        printOrderActions: bindActionCreators(printOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPrintOrder);

