import React from 'react';
//import TooltipButton from "../../../components/common/TooltipButton";
import Search from "../../../components/common/Search";
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import CodeComponent from "./CodeComponent";
import AddEditCodeModal from "./AddEditCodeModal";
import {connect} from "react-redux";
import * as codeAction from "./codeAction";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import ShowCodeModal from "./ShowCodeModal";
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

class CodeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.timeOut = null;
        this.state = {
            query: '',
        };
        this.descriptionSearchChange = this.descriptionSearchChange.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
    }

    componentWillMount() {
        this.props.codeAction.getCode(1, 20);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAddEditCode !== this.props.isAddEditCode && !nextProps.isAddEditCode) {
            this.props.codeAction.getCode(1, 20);
        }
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.codeAction.getCode(page, 20);
    }

    descriptionSearchChange(value) {
        this.setState({
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.codeAction.getCode(1, 20, value);
            }.bind(this),
            500
        );
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        const Filter = <Tooltip id="tooltip">Lọc</Tooltip>;
        const Export = <Tooltip id="tooltip">Xuất thành file excel</Tooltip>;
        const Add = <Tooltip id="tooltip">Thêm mã giảm giá</Tooltip>;
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">

                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div style={{display: "flex"}}>
                                <h4 className="card-title">
                                    <strong>Danh sách tất cả mã giảm giá</strong>
                                </h4>
                                <div>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={Add}
                                    >
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={() => {
                                                this.props.codeAction.openModal();
                                                this.props.codeAction.handleCodeModal({});
                                            }}>

                                            <strong>+</strong>
                                        </button>
                                    </OverlayTrigger>
                                </div>
                                <div>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={Filter}
                                    >
                                        <button
                                            //onClick={this.openFilterPanel}
                                            className="btn btn-primary btn-round btn-xs button-add none-margin "
                                            disabled={
                                                this.props.isLoadingCode
                                            }

                                        >
                                            <i className="material-icons"
                                               style={{margin: "0px -4px", top: 0}}
                                            >filter_list</i>
                                        </button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={Export}
                                >
                                    <button
                                        //onClick={this.showLoadingModal}
                                        className="btn btn-primary btn-round btn-xs button-add none-margin "
                                        disabled={
                                            this.props.isLoadingCode
                                        }

                                    >
                                        <i className="material-icons"
                                           style={{margin: "0px -4px", top: 0}}
                                        >file_download</i>
                                    </button>
                                </OverlayTrigger>
                            </div>
                        </div>


                        <Search
                            onChange={this.descriptionSearchChange}
                            value={this.state.query}
                            placeholder="Nhập ý nghĩa để tìm kiếm"
                        />
                        <br/>

                    </div>
                    <div>
                        {
                            this.props.isLoadingCode ? <Loading/> :
                                <CodeComponent
                                    code={this.props.code}/>
                        }


                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {first}
                                    - {end}/{this.props.totalCount}</b><br/>
                                <Pagination
                                    totalPages={this.props.totalPages}
                                    currentPage={this.props.currentPage}
                                    loadDataPage={this.loadOrders}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ShowCodeModal/>
                <AddEditCodeModal/>
            </div>
        );
    }
}

CodeContainer.propTypes = {
    isLoadingCode: PropTypes.bool.isRequired,
    isAddEditCode: PropTypes.bool.isRequired,
    codeAction: PropTypes.object.isRequired,
    code: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
};

function mapStateToProps(state) {
    return {
        isLoadingCode: state.code.isLoadingCode,
        code: state.code.code,
        isAddEditCode: state.code.isAddEditCode,
        totalCount: state.code.totalCount,
        totalPages: state.code.totalPages,
        currentPage: state.code.currentPage,
        limit: state.code.limit,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        codeAction: bindActionCreators(codeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeContainer);