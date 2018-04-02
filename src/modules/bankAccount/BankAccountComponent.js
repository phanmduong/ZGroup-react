import React from 'react';
import PropTypes from "prop-types";

class BankAccountComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(

                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead className="text-rose">
                        <tr className="text-zrose">
                            <th>Tên ngân hàng</th>
                            <th>Tên tài khoản</th>
                            <th>Số tài khoản</th>
                            <th>Chủ tài khoản</th>
                            <th>Chi nhánh</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.accounts && this.props.accounts.map((account, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {account.bank_name}
                                        </td>
                                        <td>
                                            {account.bank_account_name}
                                        </td>
                                        <td>
                                            {account.account_number}
                                        </td>
                                        <td>
                                            {account.owner_name}
                                        </td>
                                        <td>
                                            {account.branch}
                                        </td>
                                        <td>
                                            <div className="btn-group-action">
                                                <a style={{color: "#878787"}}
                                                   data-toggle="tooltip" title=""
                                                   type="button" rel="tooltip"
                                                   data-original-title="Sửa"
                                                   onClick={() => this.props.showAddEditBankAccountModal(account)}
                                                >
                                                    <i className="material-icons">edit</i>
                                                </a>
                                            </div>
                                        </td>
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

                BankAccountComponent.propTypes = {
                accounts: PropTypes.array.isRequired,
                showAddEditBankAccountModal: PropTypes.func.isRequired,
            };

export default BankAccountComponent;