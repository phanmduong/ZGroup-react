import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BankAccountComponent from './BankAccountComponent';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import *as bankAccountAction from "./bankAccountAction";

class BankAccountContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount(){
        this.props.bankAccountAction.loadAllBankAccounts();
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
                                                <button /*onClick={() => this.showAddEditCurrencyModal({
                                                    name: '',
                                                    notation: '',
                                                    ratio: ''
                                                })}*/
                                                        rel="tooltip" data-placement="top" title=""
                                                        className="btn btn-rose">
                                                    Thêm tài khoản ngân hàng
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
                                            <div className="card-content"><h4 className="card-title">Danh sách tài khoản ngân hàng</h4>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> : (
                                                        <BankAccountComponent
                                                            accounts={this.props.accounts}
                                                            //showAddEditCurrencyModal={this.showAddEditCurrencyModal}
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
            </div>
        );
    }
}

BankAccountContainer.propTypes = {
    bankAccountAction: PropTypes.object.isRequired,
    accounts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        accounts: state.bankAccount.accounts,
        isLoading: state.bankAccount.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bankAccountAction: bindActionCreators(bankAccountAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountContainer);
