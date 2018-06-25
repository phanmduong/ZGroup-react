import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import TooltipButton from "../../components/common/TooltipButton";
import * as CompanyActions from '../companies/CompanyActions';
import ReactSelect from 'react-select';
import * as helper from '../../helpers/helper';
import AddFieldModal from "./AddFieldModal";
import PropTypes from 'prop-types';
import { browserHistory } from "react-router";

class CreateCompanyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showAddField: false,
        };
        this.changeFields = this.changeFields.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.updateFormDataBonus = this.updateFormDataBonus.bind(this);
        this.updateFormDataType = this.updateFormDataType.bind(this);
        this.submit = this.submit.bind(this);
        this.openAddFieldModal = this.openAddFieldModal.bind(this);
        this.closeAddFieldModal = this.closeAddFieldModal.bind(this);
        this.cancel = this.cancel.bind(this);

    }

    componentWillMount() {
        helper.setFormValidation('#form-company');
        this.props.CompanyActions.loadFields();
        if (this.props.params.companyId)
            this.props.CompanyActions.loadCompany(this.props.params.companyId);
        else this.props.CompanyActions.resetDataCompany();

    }

    componentWillReceiveProps() {

    }

    componentDidUpdate() {
        helper.setFormValidation('#form-company');
    }

    openAddFieldModal() {
        this.setState({ showAddField: true });
    }

    closeAddFieldModal() {
        this.setState({ showAddField: false });
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

    cancel() {
        helper.confirm('error', 'Hủy', "Bạn muốn từ chối yêu cầu này?", () => {
            browserHistory.push("business/companies");
        });
    }

    updateFormData(e) {

        if (!e) return;
        let field = e.target.name;
        let value = e.target.value;
        let newdata = { ...this.props.data, [field]: value };
        this.props.CompanyActions.updateFormData(newdata);
    }

    updateFormDataType(e) {
        if (!e) return;
        let value = e.value;
        let newdata = { ...this.props.data, type: value };
        this.props.CompanyActions.updateFormData(newdata);
    }

    updateFormDataBonus(e) {
        if (!e) return;
        let value = e.value;
        let newdata = {
            ...this.props.data, field: {
                "id": value,
            }
        };
        this.props.CompanyActions.updateFormData(newdata);

    }

    submit() {
        if ($('#form-company').valid()) {
            helper.showNotification("Đang lưu...");
            if (!this.props.params.companyId) this.props.CompanyActions.addCompany(this.props.data);
            else this.props.CompanyActions.editCompany(this.props.params.companyId, this.props.data);
        } else helper.showErrorNotification("Vui lòng nhập đủ các thông tin");
    }


    render() {
        return (
            <div className="content">
                <AddFieldModal
                    show={this.state.showAddField}
                    onHide={this.closeAddFieldModal}
                    loadFields={this.props.CompanyActions.loadFields}
                />

                <div className="container-fluid">{
                    (this.props.isLoadingCompany) ? <Loading /> :
                        <div className="row">
                            <div className="col-md-12">
                                <form role="form" id="form-company" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">

                                                <div className="card-content">
                                                    <h4 className="card-title"> <strong> Thêm công ty </strong> </h4>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Tên công ty"
                                                                required
                                                                type="text"
                                                                name="name"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.name || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Địa chỉ đăng kí kinh doanh"
                                                                required
                                                                type="text"
                                                                name="registered_business_address"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.registered_business_address || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Địa chỉ văn phòng"
                                                                required
                                                                type="text"
                                                                name="office_address"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.office_address || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số điện thoại"
                                                                required
                                                                type="text"
                                                                name="phone_company"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.phone_company || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Mã số thuế"
                                                                required
                                                                type="text"
                                                                name="tax_code"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.tax_code || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <FormInputText
                                                                label="Email"
                                                                required
                                                                type="text"
                                                                name="email"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.email || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label>
                                                                Thông tin tài khoản
                                                            </label></div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số tài khoản"
                                                                required
                                                                type="text"
                                                                name="account_number"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.account_number || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Tên tài khoản"
                                                                required
                                                                type="text"
                                                                name="account_name"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.account_name || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Ngân hàng"
                                                                required
                                                                type="text"
                                                                name="bank_name"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.bank_name || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Chi nhánh"
                                                                required
                                                                type="text"
                                                                name="bank_branch"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.bank_branch || ""}

                                                            />
                                                        </div>


                                                        <div className="col-md-6">
                                                            <label>
                                                                Loại
                                                            </label>
                                                            <ReactSelect
                                                                required
                                                                disabled={false}
                                                                options={[
                                                                    { value: 'provided', label: 'Cung cấp', },
                                                                    { value: 'share', label: 'Phân phối', },
                                                                    { value: 'different', label: 'Khác', },
                                                                ]}
                                                                onChange={this.updateFormDataType}
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

                                                        <div className="col-md-4">
                                                            <ReactSelect
                                                                required
                                                                disabled={false}
                                                                isLoading={this.props.isLoadingFields}
                                                                options={this.changeFields()}
                                                                onChange={this.updateFormDataBonus}
                                                                value={this.props.data.field.id || ""}

                                                                defaultMessage="Tuỳ chọn"
                                                                name="field"
                                                            />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <TooltipButton text="Thêm lĩnh vực" placement="top">
                                                                <button
                                                                    className="btn btn-rose btn-round btn-xs button-add none-margin" type="button"
                                                                    onClick={() => this.openAddFieldModal()}
                                                                >
                                                                    <strong>+</strong>
                                                                </button>
                                                            </TooltipButton>
                                                        </div>


                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Chiết khấu truyện tranh"
                                                                type="number"
                                                                name="discount_comic"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.discount_comic || ""}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Chiết khấu truyện chữ"
                                                                type="number"
                                                                minValue="0"
                                                                name="discount_text"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.discount_text || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Người liên lạc 1"
                                                                required
                                                                type="text"
                                                                name="user_contact"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.user_contact || ""}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số điện thoại người liên lạc 1"
                                                                required
                                                                //disabled={true}
                                                                type="text"
                                                                name="user_contact_phone"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.user_contact_phone || ""}

                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Người liên lạc 2"
                                                                type="text"
                                                                name="user_contact1"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.user_contact1 || ""}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số điện thoại người liên lạc 2"
                                                                type="text"
                                                                name="user_contact_phone1"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.user_contact_phone1 || ""}

                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Người liên lạc 3"
                                                                type="text"
                                                                name="user_contact2"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.user_contact2 || ""}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputText
                                                                label="Số điện thoại người liên lạc 3"
                                                                type="text"
                                                                name="user_contact_phone2"
                                                                updateFormData={this.updateFormData}
                                                                value={this.props.data.user_contact_phone2 || ""}

                                                            />
                                                        </div>
                                                        <div className="col-md-12"
                                                            style={{ display: "flex", flexFlow: "row-reverse" }}>
                                                            {this.props.isSavingCompany ?
                                                                <div>
                                                                    <button disabled className="btn btn-rose  disabled"
                                                                        type="button">
                                                                        <i className="fa fa-spinner fa-spin" /> Đang tải lên
                                                                </button>
                                                                    <button className="btn  disabled"
                                                                        type="button">
                                                                        Hủy
                                                                   </button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <button onClick={this.submit}
                                                                        className="btn btn-rose"
                                                                    >Lưu</button>
                                                                    <button className="btn"
                                                                        onClick={this.cancel}
                                                                        type="button">
                                                                        Hủy
                                                                   </button>
                                                                </div>
                                                            }

                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                }
                </div>
            </div>

        );
    }
}

CreateCompanyContainer.propTypes = {
    CompanyActions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    isLoadingFields: PropTypes.bool.isRequired,
    isSavingField: PropTypes.bool.isRequired,
    isSavingCompany: PropTypes.bool.isRequired,
    isLoanding: PropTypes.bool.isRequired,
    isLoadingCompany: PropTypes.bool.isRequired,
    fields: PropTypes.array.isRequired,
    params: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoadingFields: state.companies.isLoadingFields,
        isSavingField: state.companies.isSavingField,
        isSavingCompany: state.companies.isSavingCompany,
        isLoanding: state.companies.isLoading,
        isLoadingCompany: state.companies.isLoadingCompany,
        data: state.companies.company,
        fields: state.companies.fields,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CompanyActions: bindActionCreators(CompanyActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCompanyContainer);