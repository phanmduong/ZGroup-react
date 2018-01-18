import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import * as CompanyActions from '../companies/CompanyActions';
import ReactSelect from 'react-select';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

class InfoCompanyModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeFields = this.changeFields.bind(this);
    }

    componentWillMount() {
        this.props.CompanyActions.loadFields();
    }

    componentWillReceiveProps() {

    }


    changeFields() {
        let data = [];
        data = this.props.fields.map((field) => {
            return {
                value: field.id,
                label: field.name,
            };
        });
        return data;
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <div className="content">
                        <div className="container-fluid">{
                            (this.props.isLoadingFields) ? <Loading/> :
                                <form role="form" id="form-company" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-header card-header-icon"
                                                     data-background-color="rose">
                                                    <i className="material-icons">home</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Thông tin công ty</h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Tên công ty"
                                                                type="text"
                                                                name="name"
                                                                disabled
                                                                value={this.props.data.name || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Địa chỉ đăng kí kinh doanh"
                                                                type="text"
                                                                name="registered_business_address"
                                                                disabled
                                                                value={this.props.data.registered_business_address || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Địa chỉ đăng kí kinh doanh"
                                                                disabled
                                                                type="text"
                                                                name="office_address"
                                                                value={this.props.data.office_address || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Số điện thoại"
                                                                type="text"
                                                                name="phone_company"
                                                                value={this.props.data.phone_company || ""}
                                                                disabled
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Mã số thuế"
                                                                disabled
                                                                type="text"
                                                                name="tax_code"
                                                                value={this.props.data.tax_code || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label>
                                                                Thông tin tài khoản
                                                            </label></div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số tài khoản"
                                                                type="text"
                                                                name="account_number"
                                                                disabled
                                                                value={this.props.data.account_number || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Tên tài khoản"
                                                                type="text"
                                                                name="account_name"
                                                                disabled
                                                                value={this.props.data.account_name || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Ngân hàng"
                                                                type="text"
                                                                name="bank_name"
                                                                disabled
                                                                value={this.props.data.bank_name || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Chi nhánh"
                                                                type="text"
                                                                name="bank_branch"
                                                                disabled
                                                                value={this.props.data.bank_branch || ""}

                                                            />
                                                        </div>


                                                        <div className="col-md-6">
                                                            <label>
                                                                Loại
                                                            </label>
                                                            <ReactSelect
                                                                disabled
                                                                options={[
                                                                    {value: 'provided', label: 'Cung cấp',},
                                                                    {value: 'share', label: 'Phân phối',},
                                                                    {value: 'different', label: 'Khác',},
                                                                ]}
                                                                value={this.props.data.type || ""}

                                                                defaultMessage="Tuỳ chọn"
                                                                name="type"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label>
                                                                Lĩnh vực
                                                            </label>
                                                        </div>
                                                        <div className="col-md-6">

                                                            <ReactSelect
                                                                disabled
                                                                options={this.changeFields()}
                                                                value={this.props.data.field.id || ""}
                                                                defaultMessage="Tuỳ chọn"
                                                                name="field_id"
                                                            />
                                                        </div>

                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Người liên lạc"
                                                                type="text"
                                                                name="user_contact"
                                                                disabled
                                                                value={this.props.data.user_contact || ""}
                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Số điện thoại người liên lạc"
                                                                type="text"
                                                                name="user_contact_phone"
                                                                disabled
                                                                value={this.props.data.user_contact_phone || ""}

                                                            />
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                        }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        );
    }
}
InfoCompanyModal.propTypes = {
    CompanyActions: PropTypes.object.isRequired,
    isLoadingFields: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func,
};
function mapStateToProps(state) {
    return {
        isLoadingFields: state.companies.isLoadingFields,
        fields: state.companies.fields,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CompanyActions: bindActionCreators(CompanyActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCompanyModal);