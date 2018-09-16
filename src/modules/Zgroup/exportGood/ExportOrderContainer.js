import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
import * as exportOrderActions from "./exportOrderActions";
import { Link } from "react-router";
import ListExportGood from "./ListExportOrder";
import TooltipButton from '../../../components/common/TooltipButton';
import {
    newWorkBook,
    appendArrayToWorkBook,
    saveWorkBookToExcel,
    renderExcelColumnArray,
    showErrorMessage,
} from "../../../helpers/helper";
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL } from "../../../constants/constants";
import FormInputDate from '../../../components/common/FormInputDate';
import FormInputText from '../../../components/common/FormInputText';
import { Panel, Modal } from "react-bootstrap";
import ReactSelect from 'react-select';

class ExportOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
            showLoadingModal: false,
            openFilter: false,
            filter: {
                companyId: null,
                command_code: '',
                start_time: '',
                end_time: '',
                page: 1,
            },
        };

    }

    componentWillMount() {
        this.props.exportOrderActions.loadExportOrders();
        this.props.exportOrderActions.loadAllCompanies();
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    // }



    openLoadingModal = () => {
        this.setState({ showLoadingModal: true });
        this.props.exportOrderActions.loadExportOrdersNoPaging(this.exportExcel);
    }

    exportExcel = (input) => {
        if(!input ||  input.length == 0) {
            showErrorMessage("Không có dữ liệu");
            this.setState({ showLoadingModal: false });
            return;
        }
        //console.log(input);
        let wb = newWorkBook();
        let data = [];
        let cols = renderExcelColumnArray([15, 15, 25, 25, 25, 25, 25, 25, 25]);//độ rộng cột  
        let merges = [];
        merges.push(
            { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } },
            { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
        );

        input.forEach((e, od) => {
            data = [];
            const head = ['STT', 'Tên', 'Mã', 'Kho','Giá', 'Số lượng', 'Số lượng xuất', 'Thành tiền', 'Thời gian'];
            if (e.goods && e.goods.length > 0)
                data = e.goods.map((item, index) => {
                    let tm = moment(item.created_at ? item.created_at.date : "", [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
                    /* eslint-disable */
                    let res = [
                        index + 1,
                        item.good ? item.good.name : "Không có",
                        item.good ? item.good.code : "Không có",
                        item.warehouse ? item.warehouse.name : "Không có",
                        item.price ? item.price : '0',
                        item.quantity ? item.quantity : '0',
                        item.export_quantity ? item.export_quantity : '0',
                        item.total_price ? item.total_price : '0',
                        tm,
                    ];
                    /* eslint-enable */
                    return res;
                });
            let time = moment(e.created_at.date || {}, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);

            const info = [
                ['Thông tin', 'Đối tác', 'Người tạo','Người xuất', 'Mã xuất hàng', 'Ngày tạo', ],
                ['',
                    e.company ? e.company.name : "Không tên",
                    e.staff ? e.staff.name : 'Không tên',
                    e.staff_import_or_export ? e.staff_import_or_export.name : 'Không tên',
                    e.command_code ? e.command_code : "Không có",
                    time,
                ],
                    ['Danh sách sản phẩm'],
            ];

            data = [...info, head, ...data];

            appendArrayToWorkBook(data, wb, e.command_code ? e.command_code : "Tab " + (od + 1), cols, null , merges);
        });

        //xuất file
        saveWorkBookToExcel(wb, 'Danh sách xuất hàng');

        this.setState({ showLoadingModal: false });
    }
    
    onFilterChange = (name, value = '') => {
        let filter = { ...this.state.filter };
        filter[name] = value;
        this.setState({ filter });
        this.props.exportOrderActions.loadExportOrders(this.state.filter);
    }

    onDateFilterChange = (e) => {
        let { name, value } = e.target;
        this.onFilterChange(name, value);
    }

    searchByCompany = (e) => {
        e = e ? e : { value: '' };
        this.onFilterChange('companyId', e.value);
    }

    render() {
        const filterClass = "col-md-3 col-sm-6 col-xs-6";
        let { isLoading, paginator, exportOrderActions } = this.props;
        let {filter} = this.state;
        return (
            <div className="content">
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
                                            <h4 className="card-title"><strong>Danh sách xuất hàng</strong></h4>

                                                <div>
                                                    <Link to="/business/export-order/create" className="btn btn-rose btn-round btn-xs button-add none-margin">
                                                        <strong>+</strong>
                                                    </Link>

                                                </div>
                                                <div>
                                                    <TooltipButton text="Lọc" placement="top">
                                                        <button
                                                            className="btn btn-rose"
                                                            onClick={() => this.setState({ openFilter: !this.state.openFilter })}
                                                            style={{
                                                                borderRadius: 30,
                                                                padding: "0px 11px",
                                                                margin: "-1px 10px",
                                                                minWidth: 25,
                                                                height: 25,
                                                                width: "55%",
                                                            }}
                                                        >
                                                            <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -12, marginTop: -10 }}
                                                            >filter_list</i>
                                                        </button>
                                                    </TooltipButton>
                                                </div>
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
                                                            <i className="material-icons" style={{ height: 5, width: 5, marginLeft: -12, marginTop: -10 }}
                                                            >file_download</i>
                                                        </button>
                                                    </TooltipButton>
                                                </div>
                                            </div>
                                    </div>
                                    <div>
                                            <Panel collapsible expanded={this.state.openFilter}>
                                                <div className="row">
                                                <div className={filterClass}>
                                                        <FormInputText
                                                            name="command_code"
                                                            id="command_code"
                                                            value={filter.command_code}
                                                            label="Mã đơn hàng"
                                                            updateFormData={this.onDateFilterChange}
                                                        />
                                                    </div>
                                                <div className={filterClass}>
                                                            <label> Công ty </label>
                                                            <ReactSelect
                                                                options={this.props.companies || []}
                                                                onChange={this.searchByCompany}
                                                                value={this.state.filter.companyId}
                                                            />
                                                        </div>
                                                    
                                                    <div className={filterClass}>
                                                        <FormInputDate
                                                            name="start_time"
                                                            id="start_time"
                                                            value={filter.start_time}
                                                            label="Từ ngày"
                                                            updateFormData={this.onDateFilterChange}
                                                        />
                                                    </div>
                                                    <div className={filterClass}>
                                                        <FormInputDate
                                                            name="end_time"
                                                            id="end_time"
                                                            value={filter.end_time}
                                                            label="Đến ngày"
                                                            updateFormData={this.onDateFilterChange}
                                                        />
                                                    </div>
                                                </div>
                                            </Panel>
                                        </div>
                                    {
                                        isLoading ? <Loading /> :
                                            <ListExportGood />
                                    }
                                    <Pagination
                                        currentPage={paginator.current_page}
                                        totalPages={paginator.total_pages}
                                        loadDataPage={exportOrderActions.loadExportOrders} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ExportOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    paginator: PropTypes.object,
    companies: PropTypes.array,
    exportOrderActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.exportOrder.isLoading,
        paginator: state.exportOrder.paginator,
        companies: state.exportOrder.companies,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        exportOrderActions: bindActionCreators(exportOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportOrderContainer);
