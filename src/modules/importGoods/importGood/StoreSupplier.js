/**
 * Created by phanmduong on 11/2/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as helper from '../../../helpers/helper';
import FormInputText from '../../../components/common/FormInputText';
import * as importGoodActions from '../importGoodActions';
import PropTypes from 'prop-types';

class StoreSupplier extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            supplier: {}
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.storeSupplier = this.storeSupplier.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation('#form-store-supplier');
    }

    updateFormData(event) {
        const field = event.target.name;
        let supplier = {...this.state.supplier};
        supplier[field] = event.target.value;
        this.setState({supplier: supplier});
    }

    storeSupplier() {
        if ($('#form-store-supplier').valid()) {
            this.props.importGoodActions.storeSupplier(this.state.supplier, this.props.closeModal);
        }
    }

    render() {
        return (
            <form id="form-store-supplier" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <FormInputText
                    name="name"
                    label="Tên nhà cung cấp"
                    value={this.state.supplier.name}
                    updateFormData={this.updateFormData}
                    required
                />
                <FormInputText
                    name="phone"
                    label="Số điện thoại"
                    value={this.state.supplier.phone}
                    updateFormData={this.updateFormData}
                    required
                    type="tel"
                />
                <FormInputText
                    name="email"
                    label="Email"
                    value={this.state.supplier.email}
                    updateFormData={this.updateFormData}
                    required
                    type="email"
                />
                <FormInputText
                    name="address"
                    label="Địa chỉ"
                    value={this.state.supplier.address}
                    updateFormData={this.updateFormData}
                />
                <FormInputText
                    name="code"
                    label="Mã số thuế"
                    value={this.state.supplier.code}
                    updateFormData={this.updateFormData}
                />
                {this.props.isStoringSupplier ?
                    (
                        <button
                            className="btn btn-fill btn-rose disabled"
                        >
                            <i className="fa fa-spinner fa-spin"/>
                            Đang tạo
                        </button>
                    )
                    :
                    (
                        <button
                            className="btn btn-fill btn-rose"
                            onClick={this.storeSupplier}
                        >
                            Tạo
                        </button>
                    )
                }
            </form>
        );
    }
}

StoreSupplier.propTypes = {
    importGoodActions: PropTypes.object.isRequired,
    isStoringSupplier: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isStoringSupplier: state.importGoods.isStoringSupplier,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreSupplier);
