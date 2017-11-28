import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as importGoodActions from '../importGoodActions';
import Loading from '../../../components/common/Loading';
import * as helper from '../../../helpers/helper';

class HistoryPaid extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.importGoodActions.getHistoryPaid(this.props.importGoodId);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loading/>
            );
        } else {
            return (
                <div className="material-datatables">
                    <table id="imported-goods-table" className="table" width="100%">
                        <thead>
                        <tr className="text-rose">
                            <th>STT</th>
                            <th>Nhân viên thu tiền</th>
                            <th>Ngày thu</th>
                            <th>Ghi chú</th>
                            <th>Số tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.historyPaidMoney.map((history, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{history.staff ? history.staff.name : "Không có"}</td>
                                        <td>{history.created_at}</td>
                                        <td>{history.note}</td>
                                        <td>{helper.dotNumber(history.money)} đ</td>
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
}

function mapStateToProps(state) {
    return {
        historyPaidMoney: state.importGoods.importGood.historyPaidMoney,
        isLoading: state.importGoods.importGood.isLoadingHistoryPaid,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPaid);
