import React, { Component } from "react";
import { observer } from "mobx-react";
import Loading from "../../../components/common/Loading";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { store } from "./fundStore";
import CreateFundModal from "./CreateFundModal";
import TransferModal from "./TransferModal";
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import Pagination from "../../../components/common/Pagination";
import { dotNumber } from "../../../helpers/helper";
import TooltipButton from '../../../components/common/TooltipButton';
import { browserHistory } from 'react-router';
@observer
class FundContainer extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadAllFund();
        store.loadAllFundNoPaging();
    }


    render() {

        let { isLoading, funds, paginator } = store;
        return (
            <div>
                <CreateFundModal />
                <TransferModal />
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title"><strong>Quỹ</strong></h4>
                                    <div>
                                        <button onClick={() => {
                                            store.showCreateModal = true;
                                            store.resetData();
                                        }} className="btn btn-rose btn-round btn-xs button-add none-margin">
                                            <strong>+</strong>
                                        </button>
                                    </div>
                                    <div>
                                        <TooltipButton text="Lịch sử" placement="top">
                                            <button
                                                className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                onClick={() => { browserHistory.push('/administration/history-fund'); }}
                                                disabled={isLoading}
                                            >
                                                <i className="material-icons" style={{
                                                    width: 14,
                                                    marginLeft: -4,
                                                    paddingTop: 2,
                                                }}>history</i>
                                            </button>

                                        </TooltipButton>
                                    </div>
                                </div>
                                <br />
                                {
                                    isLoading ? <Loading /> :
                                        <div className="col-md-12">
                                            {
                                                funds.length == 0 ?
                                                    <h3>Không có dữ liệu</h3>
                                                    :
                                                    <div className="table-responsive">
                                                        <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                            <thead className="text-rose">
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>Tên</th>
                                                                    <th>Số dư</th>
                                                                    <th />
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {funds.map((obj, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>
                                                                                <b style={{ cursor: "pointer" }} onClick={() => { }}>
                                                                                    {obj.name}
                                                                                </b>
                                                                            </td>

                                                                            <td>{dotNumber(obj.money_value)}</td>

                                                                            <td><ButtonGroupAction
                                                                                edit={() => {
                                                                                    store.createData = { ...obj };
                                                                                    store.showCreateModal = true;
                                                                                }}
                                                                                disabledDelete={true}
                                                                                children={
                                                                                    (this.props.user.role == 2 ?
                                                                                        <a data-toggle="tooltip" title="Chuyển quỹ"
                                                                                            type="button"
                                                                                            onClick={() => { store.openTransferModal(obj); }}
                                                                                            rel="tooltip"
                                                                                        >
                                                                                            <i className="material-icons">import_export</i>
                                                                                        </a>
                                                                                        : <div />
                                                                                    )
                                                                                }
                                                                            /></td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                                            <Pagination
                                                                currentPage={paginator.current_page}
                                                                totalPages={paginator.total_pages}
                                                                loadDataPage={(page) => { store.loadAllFund(page); }} />
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

FundContainer.propTypes = {
    user: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(FundContainer);