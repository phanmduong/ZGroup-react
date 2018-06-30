import React, { Component } from "react";
import { observer } from "mobx-react";
import Loading from "../../../components/common/Loading";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { store } from "./fundStore";
import Pagination from "../../../components/common/Pagination";
import { dotNumber } from "../../../helpers/helper";
import TooltipButton from '../../../components/common/TooltipButton';
import Select from 'react-select';
import { Panel } from 'react-bootstrap';
@observer
class TransferHistoryContainer extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadAllHistoryFund(1);
        store.loadAllFundNoPaging();
    }

    filterChange = (name, e)=>{
        store.filter[name] = e ? e.id : null;
        store.loadAllHistoryFund(1);
    }

    render() {

        let { isLoading, historyFund, paginator, filter } = store;
        const filterClass = "col-md-3 col-sm-6 col-xs-6";
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title"><strong>Lịch sử quỹ</strong></h4>
                                    <div>
                                        <TooltipButton text="Lọc" placement="top">
                                            <button
                                                className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                onClick={() => { store.showPanel = !store.showPanel; }}
                                                disabled={isLoading}
                                            >
                                                <i className="material-icons" style={{
                                                    width: 14,
                                                    marginLeft: -4,
                                                    paddingTop: 2,
                                                }}>filter_list</i>
                                            </button>

                                        </TooltipButton>
                                    </div>
                                </div>
                                <Panel collapsible expanded={store.showPanel} bsStyle="primary">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">

                                                <div className={filterClass}>
                                                    <label>Quỹ gửi</label>
                                                    <Select
                                                        options={store.allFunds || []}
                                                        onChange={(e) => { this.filterChange('send_id', e); }}
                                                        value={filter.send_id}
                                                        defaultMessage="Chọn"
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                                <div className={filterClass}>
                                                    <label>Quỹ nhận</label>
                                                    <Select
                                                        options={store.allFunds || []}
                                                        onChange={(e) => { this.filterChange('receive_id', e); }}
                                                        value={filter.receive_id}
                                                        defaultMessage="Chọn"
                                                        disabled={isLoading}
                                                    />
                                                </div>

                                              
                                            </div>
                                           

                                        </div>
                                    </div>
                                </Panel>
                                
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