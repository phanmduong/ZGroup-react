import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CurrencyComponent from './CurrencyComponent';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import *as currencyAction from "./currencyAction";
import AddEditCurrencyModal from "./AddEditCurrencyModal";
import * as helper from "../../helpers/helper";

class CurrencyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showAddEditCurrencyModal = this.showAddEditCurrencyModal.bind(this);
        this.deleteCurrency = this.deleteCurrency.bind(this);
    }

    componentWillMount() {
        this.props.currencyAction.loadAllCurrencies();
    }

    showAddEditCurrencyModal(currency) {
        this.props.currencyAction.handleCurrency(currency);
        this.props.currencyAction.showAddEditCurrencyModal();
    }

    deleteCurrency(currency) {
        helper.confirm("error", "Xóa tiền tệ", "Bạn có chắc muốn xóa loại tiền này", () => {
            this.props.currencyAction.deleteCurrency(currency);
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>
                                                <button onClick={() => this.showAddEditCurrencyModal({
                                                    name: '',
                                                    notation: '',
                                                    ratio: ''
                                                })}
                                                        rel="tooltip" data-placement="top" title=""
                                                        className="btn btn-rose">
                                                    Thêm loại tiền tệ
                                                </button>
                                            </div>
                                            <div>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item" type="button"
                                                        className="btn btn-success">
                                                    <i className="material-icons">print</i> In mã vạch
                                                </button>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item" type="button"
                                                        className="btn btn-info">
                                                    <i className="material-icons">save</i> Lưu về máy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content"><h4 className="card-title">Danh sách
                                                sản phẩm</h4>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <CurrencyComponent
                                                            currencies={this.props.currencies}
                                                            showAddEditCurrencyModal={this.showAddEditCurrencyModal}
                                                            deleteCurrency={this.deleteCurrency}
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
                <AddEditCurrencyModal/>
            </div>
        );
    }
}

CurrencyContainer.propTypes = {
    currencyAction: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        currencies: state.currency.currencies,
        isLoading: state.currency.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        currencyAction: bindActionCreators(currencyAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyContainer);
