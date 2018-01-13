import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import * as CompanyActions from '../companies/CompanyActions';
import ReactSelect from 'react-select';
class CreateCompanyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        this.props.CompanyActions.loadFields();
    }
        render() {
        return (
            <div className="content">
                <div className="container-fluid">{
                    (this.props.isLoadingFields) ? <Loading/> :
                        <form role="form" id="form-company" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose">
                                            <i className="material-icons">home</i>
                                        </div>

                                        <div className="card-content">
                                            <h4 className="card-title">Thêm công ty</h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Tên công ty"
                                                        required
                                                        type="text"
                                                        name="name"
                                                        value={" "}

                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Địa chỉ đăng kí kinh doanh"
                                                        required
                                                        type="text"
                                                        name="registered_address"
                                                        value={" "}

                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Địa chỉ đăng kí kinh doanh"
                                                        required
                                                        type="text"
                                                        name="office_address"
                                                        value={" "}

                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Số điện thoại"
                                                        required
                                                        type="text"
                                                        name="phone_company"
                                                        value={" "}

                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Mã số thuế"
                                                        required
                                                        type="text"
                                                        name="tax_code"
                                                        value={" "}

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
                                                            value={" "}

                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                            label="Tên tài khoản"
                                                            required
                                                            type="text"
                                                            name="account_name"
                                                            value={" "}

                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                            label="Ngân hàng"
                                                            required
                                                            type="text"
                                                            name="bank_name"
                                                            value={" "}

                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FormInputText
                                                            label="Chi nhánh"
                                                            required
                                                            type="text"
                                                            name="bank_branch"
                                                            value={" "}

                                                        />
                                                    </div>
                                                <div className="col-md-12">
                                                    <label>
                                                        Loại
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <ReactSelect
                                                        disabled={false}
                                                        options={[
                                                            {value: 'provided', label: 'Cung cấp',},
                                                            {value: 'share', label: 'Phân phối',},
                                                            {value: 'different', label: 'Khác',},
                                                        ]}
                                                       // onChange={this.updateFormDataType}
                                                        value={" "}

                                                        defaultMessage="Tuỳ chọn"
                                                        name="type"
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Người liên lạc"
                                                        required
                                                        type="text"
                                                        name="contact_person"
                                                        value={" "}

                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Số điện thoại người liên lạc"
                                                        required
                                                        type="text"
                                                        name="contact_phone"
                                                        value={" "}

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

        );
    }
}

function mapStateToProps(state) {
   return{
       isLoadingFields: state.companies.isLoadingFields,
       isSavingField: state.companies.isSavingField,
       isSavingCompany: state.companies.isSavingCompany,
       fields: state.companies.fields,
   };
}
function mapDispatchToProps(dispatch) {
    return{
        CompanyActions: bindActionCreators(CompanyActions, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (CreateCompanyContainer);