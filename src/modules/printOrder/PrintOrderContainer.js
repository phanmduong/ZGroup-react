import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
//import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import * as printOrderActions from "./printOrderActions";
import ListPrintOrder from "./ListPrintOrder";
import {Link} from "react-router";
import {Panel} from 'react-bootstrap';
import ReactSelect from 'react-select';
import {PRINT_ORDER_STATUS} from '../../constants/constants';

class PrintOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
            openFilterPanel: false,
            statuses: getStatusArr(),
            selectedCode: '',
            selectedProduct: '',
            selectedStatus: '',
            selectedDate: '',
        };
        this.openFilterPanel = this.openFilterPanel.bind(this);
        this.changeCodeFilter = this.changeCodeFilter.bind(this);
        this.loadAllData = this.loadAllData.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeProduct = this.changeProduct.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    componentWillMount() {
        this.props.printOrderActions.getAllCodes();
        this.props.printOrderActions.loadPrintOrders();
        this.props.printOrderActions.loadAllGoods();
    }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    // }

    loadAllData(page,command_code, good_id, status){
        this.props.printOrderActions.loadPrintOrders(page,command_code, good_id, status);
    }

    openFilterPanel(){
        let {openFilterPanel} = this.state;
        this.setState({openFilterPanel: !openFilterPanel});
    }

    changeCodeFilter(e){
        if(!e) e={id: '', value: '', code:'', label:''};
        this.setState({selectedCode: e.value});
        let {paginator} = this.props;
        let {selectedProduct,selectedStatus,selectedDate} = this.state;
        this.loadAllData(
            paginator.current_page,
            e.id == '' ? '' : e.code,
            selectedProduct,
            selectedStatus,
            selectedDate,
        );
    }

    changeStatus(e){
        if(!e) e={id: '', value: '', code:'', label:''};
        this.setState({selectedStatus: e.value});
        let {paginator} = this.props;
        let {selectedProduct,selectedCode, selectedDate} = this.state;
        this.loadAllData(
            paginator.current_page,
            selectedCode,
            selectedProduct,
            e.value,
            selectedDate,
        );
    }

    changeProduct(e){
        if(!e) e={id: '', value: '', code:'', label:''};
        this.setState({selectedProduct: e.value});
        let {paginator} = this.props;
        let {selectedStatus,selectedCode, selectedDate} = this.state;
        this.loadAllData(
            paginator.current_page,
            selectedCode,
            e.value,
            selectedStatus,
            selectedDate,
        );
    }

    changeDate(e){
        //this.setState({selectedDate: e.target.value});
        //this.state.selectedDate = e.target.value;

        let {paginator} = this.props;
        let {selectedStatus,selectedCode, selectedProduct} = this.state;
        this.loadAllData(
            paginator.current_page,
            selectedCode,
            selectedProduct,
            selectedStatus,
            e,
        );
    }

    render() {
        let {paginator, printOrderActions, codes, isLoading, goods} = this.props;
        let {selectedProduct,selectedStatus, selectedCode, selectedDate} = this.state;
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">print</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách đặt in</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-sm-3">
                                                <Link to="/business/print-order/create" className="btn btn-rose"
                                                      style={{width: "100%"}}>
                                                    <i className="material-icons">print</i>
                                                    Đặt In
                                                </Link>
                                            </div>
                                            <div className="col-sm-3">
                                                <button className="btn btn-rose"
                                                       style={{width: "100%"}}
                                                        onClick={this.openFilterPanel}>
                                                    <i className="material-icons">filter_list</i>
                                                    Lọc
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <Panel collapsible expanded={this.state.openFilterPanel}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label style={{color: "#4c4a46"}}>
                                                    Mã giao dịch
                                                </label>
                                                <ReactSelect
                                                    disabled={isLoading}
                                                    className=""
                                                    options={codes}
                                                    onChange={this.changeCodeFilter}
                                                    value={selectedCode}
                                                    name="filter_class"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label style={{color: "#4c4a46"}}>
                                                    Tên sách
                                                </label>
                                                <ReactSelect
                                                    disabled={isLoading}
                                                    className=""
                                                    options={goods}
                                                    onChange={this.changeProduct}
                                                    value={selectedProduct}
                                                    name="filter_class"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label style={{color: "#4c4a46"}}>
                                                    Trạng thái
                                                </label>
                                                <ReactSelect
                                                    disabled={isLoading}
                                                    className=""
                                                    options={this.state.statuses}
                                                    onChange={this.changeStatus}
                                                    value={selectedStatus}
                                                    name="filter_class"
                                                />
                                            </div>
                                        </div>


                                    </Panel>
                                    
                                            <ListPrintOrder
                                                changeCodeFilter={this.changeCodeFilter}
                                                changeProduct={this.changeProduct}
                                                changeStatus={this.changeStatus}
                                                changeDate={this.changeDate}
                                                selectedCode={selectedCode}
                                                selectedProduct={selectedProduct}
                                                selectedStatus={selectedStatus}
                                                selectedDate={selectedDate}
                                            />
                                    
                                    <Pagination
                                        currentPage={paginator.current_page}
                                        totalPages={paginator.total_pages}
                                        loadDataPage={printOrderActions.loadPrintOrders}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function getStatusArr() {
    let res = PRINT_ORDER_STATUS.map((obj,id) => {return {value:id,label:obj};});
    return [{value: '', label:'Tất cả'},...res];
}

PrintOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    printOrderActions: PropTypes.object.isRequired,
    user: PropTypes.object,
    paginator: PropTypes.object,
    codes: PropTypes.array,
    goods: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
        paginator: state.printOrder.paginator,
        codes: state.printOrder.codes,
        goods: state.printOrder.goods,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        printOrderActions: bindActionCreators(printOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintOrderContainer);
