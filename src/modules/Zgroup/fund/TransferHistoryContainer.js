import React, { Component } from "react";
import { observer } from "mobx-react";
import Loading from "../../../components/common/Loading";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { store } from "./fundStore";
import Pagination from "../../../components/common/Pagination";
import { dotNumber } from "../../../helpers/helper";
@observer
class TransferHistoryContainer extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadAllHistoryFund(1);
    }


    render() {

        let { isLoading, historyFund, paginator } = store;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title"><strong>Lịch sử quỹ</strong></h4>
                                </div>
                                <br />
                                {
                                    isLoading ? <Loading /> :
                                        <div className="col-md-12">
                                            {
                                                historyFund.length == 0 ?
                                                    <h3>Không có dữ liệu</h3>
                                                    :
                                                    <div className="table-responsive">
                                                        <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                            <thead className="text-rose">
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>Quỹ gửi</th>
                                                                    <th>Quỹ nhận</th>
                                                                    <th>Số tiền</th>
                                                                    <th>Thời gian</th>
                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {historyFund.map((obj, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>
                                                                                <b style={{ cursor: "pointer" }} onClick={() => { }}>
                                                                                    {obj.payer.name}
                                                                                </b>
                                                                            </td>
                                                                            <td>
                                                                                <b style={{ cursor: "pointer" }} onClick={() => { }}>
                                                                                    {obj.receiver.name}
                                                                                </b>
                                                                            </td>

                                                                            <td>{dotNumber(obj.money_value)}</td>
                                                                            <td>{obj.created_at}</td>

                                                                            
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                                            <Pagination
                                                                currentPage={paginator.current_page}
                                                                totalPages={paginator.total_pages}
                                                                loadDataPage={(page) => { store.loadAllHistoryFund( page); }} />
                                                        </div>
                                                    </div>
                                            }
                                        </div>

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TransferHistoryContainer.propTypes = {
    user: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(TransferHistoryContainer);