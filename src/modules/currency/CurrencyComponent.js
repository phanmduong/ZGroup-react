import React from 'react';
import PropTypes from "prop-types";

class CurrencyComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>Tên</th>
                        <th>Ký hiệu</th>
                        <th>Tỷ lệ</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.currencies && this.props.currencies.map((currency, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {currency.name}
                                    </td>
                                    <td>
                                        {currency.notation}
                                    </td>
                                    <td>
                                        {currency.ratio}
                                    </td>
                                    <td>
                                        <div className="btn-group-action">
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Sửa"
                                               onClick={() => this.props.showAddEditCurrencyModal(currency)}><i
                                                className="material-icons">edit</i>
                                            </a>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Xoá"
                                               onClick={() => this.props.deleteCurrency(currency)}>
                                                <i className="material-icons">delete</i>
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

CurrencyComponent.propTypes = {
    currencies: PropTypes.array.isRequired,
    showAddEditCurrencyModal: PropTypes.func.isRequired,
    deleteCurrency: PropTypes.func.isRequired
};

export default CurrencyComponent;