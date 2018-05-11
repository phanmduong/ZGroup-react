import React from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Loading from "../../components/common/Loading";
import * as historyDebtAction from "../historyDebt/historyDebtActions";
import Pagination from "../../components/common/Pagination";
import CompaniesList from "../historyDebt/CompaniesList";
import PropTypes from 'prop-types';
import HistoryDebtModal from "./HistoryDebtModal";
import TooltipButton from '../../components/common/TooltipButton';
import { Modal } from 'react-bootstrap';
import {
    newWorkBook,
    appendJsonToWorkBook,
    saveWorkBookToExcel,
    renderExcelColumnArray,
} from "../../helpers/helper";
import moment from "moment";
import {DATETIME_FORMAT,DATETIME_FORMAT_SQL} from "../../constants/constants";

class HistoryDebtContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            showInfoModal: false,
            id: "",
            showLoadingModal: false,
        };
        this.loadCompanies = this.loadCompanies.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.loadHistoryDebt = this.loadHistoryDebt.bind(this);
    }

    componentWillMount() {
        this.props.historyDebtActions.loadCompanies(1);
    }

    loadCompanies(page) {
        this.props.historyDebtActions.loadCompanies(page);
    }

    loadHistoryDebt(id, page) {
        this.props.historyDebtActions.loadHistoryDebt(id, page);
    }

    openInfoModal(id) {
        this.setState({ showInfoModal: true });
        this.setState({ id: id });
        this.loadHistoryDebt(id, 1);
    }


    closeInfoModal() {
        this.setState({ showInfoModal: false });
    }

    openLoadingModal = () => {
        this.setState({ showLoadingModal: true });
        this.props.historyDebtActions.loadAllHistoryDebt(this.exportExcel);
    }

    exportExcel = (input) => {
        let wb = newWorkBook();
        let data;
        let cols = renderExcelColumnArray([5, 15, 25, 25, 15,]);//độ rộng cột  

        input.forEach(e => {
            data = e.history_debt.map((item, index) => {
                let time = moment(item.date , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
                let type = "Không có";
                switch(item.type){
                    case 'import':{
                        type = 'Nhập';
                        break;
                    }
                    case 'export':{
                        type = 'Xuất';
                        break;
                    }
                    case 'payment':{
                        type = 'Thanh toán';
                        break;
                    }

                }
                /* eslint-disable */
                let res = {
                    'STT': index + 1,
                    'Loại' : type,
                    'Giá trị' : item.value,
                    'Dư nợ' : item.total_value,
                    'Ngày' : time,    
                };
                /* eslint-enable */
                return res;
            });
            appendJsonToWorkBook(data, wb, (e && e.company) ? e.company.name : "Không tên", cols);
        });        

        //xuất file
        saveWorkBookToExcel(wb, 'Danh sách công nợ');

        this.setState({ showLoadingModal: false });
    }

    render() {
        let { current_page, total_pages } = this.props.paginatorCompanies;
        return (
            <div>
                <HistoryDebtModal
                    show={this.state.showInfoModal}
                    onHide={this.closeInfoModal}
                    isLoading={this.props.isLoadingHistoryDebt}
                    data={this.props.historyDebt || []}
                    loadHistoryDebt={this.loadHistoryDebt}
                    paginator={this.props.paginatorHistoryDebt}
                    id={this.state.id}
                />
                <Modal
                    show={this.state.showLoadingModal}
                    onHide={() => { }}>
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading /></Modal.Body>
                </Modal>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-content">

                                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <div className="flex-row flex">
                                        <h4 className="card-title"><strong> Quản lý công nợ</strong> </h4>
                                    </div>
                                        <div className="flex-end">
                                            <div>
                                                <TooltipButton text="Xuất thành file excel" placement="top">
                                                    <button
                                                        className="btn btn-rose"
                                                        onClick={this.openLoadingModal}
                                                        style={{
                                                            borderRadius: 30,
                                                            padding: "0px 11px",
                                                            margin: "-1px 10px",
                                                            minWidth: 25,
                                                            height: 25,
                                                            width: "55%",
                                                        }}
                                                    >
                                                        <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -11, marginTop: -10 }}
                                                        >file_download</i>
                                                    </button>
                                                </TooltipButton>
                                            </div>
                                        </div>

                                    </div>
                                    <div>
                                        {
                                            this.props.isLoadingCompanies ? <Loading /> :
                                                <CompaniesList
                                                    data={this.props.data || []}
                                                    openInfoModal={this.openInfoModal}
                                                />
                                        }
                                    </div>
                                    <div className="card-content">
                                        <Pagination
                                            totalPages={total_pages}
                                            currentPage={current_page}
                                            loadDataPage={this.loadCompanies}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
HistoryDebtContainer.propTypes = {
    historyDebtActions: PropTypes.object.isRequired,
    isLoadingHistoryDebt: PropTypes.bool.isRequired,
    isLoadingCompanies: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    historyDebt: PropTypes.array.isRequired,
    paginatorCompanies: PropTypes.object.isRequired,
    paginatorHistoryDebt: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        isLoadingHistoryDebt: state.historyDebt.isLoadingistoryDebt,
        isLoadingCompanies: state.historyDebt.isLoadingComapnies,
        data: state.historyDebt.companies,
        paginatorCompanies: state.historyDebt.paginatorCompanies,
        paginatorHistoryDebt: state.historyDebt.paginatorHistoryDebt,
        historyDebt: state.historyDebt.historyDebt,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        historyDebtActions: bindActionCreators(historyDebtAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDebtContainer);