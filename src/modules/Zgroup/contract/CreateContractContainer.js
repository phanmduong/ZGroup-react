import React, { Component } from "react";
import { store } from "./contractStore";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { } from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";
import FormInputText from "../../../components/common/FormInputText";
import FormInputMoney from "../../../components/common/FormInputMoney";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import Avatar from "../../../components/common/Avatar";
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const reactSelectMarginTop = { marginTop: 15 };

@observer
class CreateContractContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submitData = this.submitData.bind(this);
        this.exit = this.exit.bind(this);
    }

    componentWillMount() {
        store.loadAllCompanies();
        store.loadStaffs();
        store.createData.staff = this.props.user;
        let { contract_id } = this.props.params;
        if (contract_id) {
            store.getContractDetail(contract_id);
        }
    }

    @observable data = {

    };

    updateFormData(e) {
        let { name, value } = e.target;
        store.createData[name] = value;
    }

    exit() {

    }

    submitData() {
        store.createContract();
    }

    render() {
        let { isLoading, isCommitting, createData, allCompany, allStaff, allContractType } = store;

        let disableField = isLoading || isCommitting;
        return (
            <div>
                {
                    isLoading ? <Loading /> :
                        <div className="content">
                            <div className="container-fluid">
                                <form role="form" id="form-request-money" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-content">
                                                    <h4 className="card-title"><strong>Tạo hợp đồng</strong></h4><br />
                                                    <div className="row">
                                                        <div className="col-md-6" style={reactSelectMarginTop}>
                                                            <label>Bên A</label>
                                                            <ReactSelect
                                                                disabled={disableField}
                                                                options={allCompany}
                                                                onChange={e => { this.updateFormData({ target: { name: "company_a", value: e } }); }}
                                                                value={createData.company_a.id}
                                                                name="company_a"
                                                                defaultMessage="Chọn đối tác"
                                                            />
                                                        </div>
                                                        <div className="col-md-6" style={reactSelectMarginTop}>
                                                            <label>Bên B</label>
                                                            <ReactSelect
                                                                disabled={disableField}
                                                                options={allCompany}
                                                                onChange={e => { this.updateFormData({ target: { name: "company_b", value: e } }); }}
                                                                value={createData.company_b.id}
                                                                name="company_a"
                                                                defaultMessage="Chọn đối tác"
                                                            />
                                                        </div>
                                                        <div className="col-md-6" style={reactSelectMarginTop}>
                                                            <label>Người kí</label>
                                                            <ReactSelect
                                                                disabled={disableField}
                                                                options={allStaff}
                                                                onChange={e => { this.updateFormData({ target: { name: "sign_staff", value: e } }); }}
                                                                value={createData.sign_staff.id}
                                                                name="sign_staff"
                                                                defaultMessage="Chọn đối tác"
                                                            />
                                                        </div>
                                                        <div className="col-md-6" style={reactSelectMarginTop}>
                                                            <label>Loại hợp đồng</label>
                                                            <ReactSelect
                                                                disabled={disableField}
                                                                options={allContractType}
                                                                onChange={e => { this.updateFormData({ target: { name: "type", value: e } }); }}
                                                                value={createData.type.id}
                                                                name="sign_staff"
                                                                defaultMessage="Chọn đối tác"
                                                            />
                                                        </div>
                                                        <FormInputText
                                                            className="col-md-6"
                                                            name="contract_number"
                                                            label="Số hợp đồng"
                                                            type="text"
                                                            updateFormData={this.updateFormData}
                                                            disabled={disableField}
                                                            value={createData.contract_number}
                                                            required
                                                        />
                                                        <FormInputMoney
                                                            className="col-md-6"
                                                            name="value"
                                                            label="Giá trị hợp đồng"
                                                            type="text"
                                                            updateFormData={this.updateFormData}
                                                            disabled={disableField}
                                                            value={createData.value}
                                                            required
                                                        />
                                                        <div className="col-md-12">
                                                            <FormInputDateTime
                                                                name="due_date"
                                                                id="due_date"
                                                                label="Ngày hết hạn"
                                                                type="text"
                                                                updateFormData={this.updateFormData}
                                                                disabled={disableField}
                                                                value={createData.due_date}
                                                                required
                                                            /></div>
                                                        <FormInputText
                                                            className="col-md-12"
                                                            name=""
                                                            label=""
                                                            type="text"
                                                            updateFormData={this.updateFormData}
                                                            disabled={disableField}
                                                            value={createData.a}
                                                            required
                                                        />


                                                    </div>

                                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        {isCommitting ?
                                                            <button className="btn btn-fill btn-rose  disabled" type="button">
                                                                <i className="fa fa-spinner fa-spin" /> Đang lưu</button>
                                                            :
                                                            <button className="btn btn-fill btn-rose" type="button"
                                                                onClick={this.submitData} disabled={disableField}
                                                            >Lưu</button>}

                                                        <button className="btn btn-fill" type="button" disabled={isCommitting}
                                                            onClick={this.exit} style={{ marginLeft: 5 }}
                                                        >Hủy</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-content">
                                                    <h4 className="card-title"><strong>Người kí</strong></h4><br />
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Avatar
                                                                url={createData.sign_staff.avatar_url}
                                                                size={100}
                                                                style={{ width: "100%", height: 170, maxHeight: 170, maxWidth: 170 }}
                                                            /><br />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label>Tên nhân viên</label>
                                                            <div>{createData.sign_staff.name}</div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <label>SĐT</label>
                                                            <div>{createData.sign_staff.phone}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-content">
                                                    <h4 className="card-title"><strong>Người tạo</strong></h4><br />
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <Avatar
                                                                url={createData.staff.avatar_url}
                                                                size={100}
                                                                style={{ width: "100%", height: 170, maxHeight: 170, maxWidth: 170 }}
                                                            /><br />
                                                        </div>
                                                        <div className="col-md-12">
                                                            <label>Tên nhân viên</label>
                                                            <div>{createData.staff.name}</div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <label>SĐT</label>
                                                            <div>{createData.staff.phone}</div>
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
        );
    }
}
CreateContractContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(CreateContractContainer);