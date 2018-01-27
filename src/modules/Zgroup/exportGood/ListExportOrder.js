import React                            from 'react';
import PropTypes                        from 'prop-types';
import ButtonGroupAction                from "../../../components/common/ButtonGroupAction";
import {connect}                        from 'react-redux';
import  * as exportOrderActions from "./exportOrderActions";
import {bindActionCreators}             from 'redux';

class ListExportOrder extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps",nextProps);
    }

    render() {
        let {listExportOrder} = this.props;
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-striped table-no-bordered table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th>STT</th>
                        <th>Nhà phân phối</th>
                        <th>Tên sản phầm</th>
                        <th>Tên kho</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
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
                                <td>{order.good.name}</td>
                                <td>{order.warehouse.name}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total_price}</td>
                                <td><ButtonGroupAction
                                    editUrl={"/business/export-good/edit/" + order.id}
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


ListExportOrder.propTypes = {
    isLoading : PropTypes.bool,
    listExportOrder : PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.exportOrder.isLoading,
        listExportOrder: state.exportOrder.listExportOrder,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        exportOrderActions: bindActionCreators(exportOrderActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListExportOrder);

