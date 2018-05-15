import React, { Component } from "react";
import { store } from "./contractStore";
import { observer } from "mobx-react";
import Loading from "../../../components/common/Loading";
import FormInputText from "../../../components/common/FormInputText";
import FormInputMoney from "../../../components/common/FormInputMoney";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import Avatar from "../../../components/common/Avatar";
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { browserHistory } from 'react-router';
import { confirm, setFormValidation, isEmptyInput, showErrorNotification } from "../../../helpers/helper";

const reactSelectMarginTop = { marginTop: 15 };

@observer
class CreateContractContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.exit = this.exit.bind(this);
    }

    componentWillMount() {
        store.loadAllCompanies();
        store.loadStaffs();
        let { contract_id } = this.props.params || {};
        if (contract_id) {
            store.getContractDetail(contract_id);
        } else if (!store.isInfoModal) {
            store.resetData();
        }
        store.createData.staff = this.props.user;

    }

    componentDidMount() {
        setFormValidation("form-data");
    }


    updateFormData(e) {
        let { name, value } = e.target;
        store.createData[name] = value;
    }

    exit() {
        confirm(
            "warning", "Cảnh báo", "Bạn có chắc muốn thoát? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                browserHistory.push("/administration/contract");
            },
        );
    }

    submitData() {
        let { company_a, company_b, sign_staff, type, due_date } = store.createData;
        if ($('#form-data').valid()) {
            if (isEmptyInput(company_a.id)) {
                showErrorNotification("Vui lòng chọn bên A!");
                return;
            }
            if (isEmptyInput(company_b.id)) {
                showErrorNotification("Vui lòng chọn bên B");
                return;
            }
            if (isEmptyInput(sign_staff.id)) {
                showErrorNotification("Bạn chưa chọn người kí!");
                return;
            }
            if (isEmptyInput(type.id)) {
                showErrorNotification("Bạn chưa chọn loại hợp đồng!");
                return;
            }
            if (isEmptyInput(due_date)) {
                showErrorNotification("Bạn chưa chọn ngày hết hạn hợp đồng!");
                return;
            }
        } else { return; }

        if (this.props.params.contract_id)
            store.editContract();
        else store.createContract();
    }

    handleSelect(name, e) {
        this.updateFormData({ target: { name, value: e || {} } });
    }

    render() {
        let { isLoading, isCommitting, isInfoModal, createData, allCompany, allStaff, allContractType } = store;

        //let disableField = true;
        let disableField = isLoading || isCommitting || isInfoModal;
        return (
            <div>
                {
                    isLoading ? <Loading /> :
                        <div className="content">
                            <div className="container-fluid">
                                <form role="form" id="form-data" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-content">
                                                    <h4 className="card-title"><strong>{isInfoModal ? "Thông tin hợp đồng" : ((this.props.params && this.props.params.contract_id) ? "Sửa hợp đồng" : "Tạo hợp đồng")}</strong></h4><br />
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="col-md-6" style={reactSelectMarginTop}>
                                                                <label>Bên A</label>
                                                                <ReactSelect
                                                                    disabled={disableField}
                                                                    options={allCompany}
                                                                    onChange={e => this.handleSelect("company_a", e)}
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
                                                                    onChange={e => this.handleSelect("company_b", e)}
                                                                    value={createData.company_b.id}
                                                                    name="company_b"
                                                                    defaultMessage="Chọn đối tác"
                                                                />
                                                            </div>

                                                            <div className="col-md-6" style={reactSelectMarginTop}>
                                                                <label>Người kí</label>
                                                                <ReactSelect
                                                                    disabled={disableField}
                                                                    options={allStaff}
                                                                    onChange={e => this.handleSelect("sign_staff", e)}
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
                                                                    onChange={e => this.handleSelect("type", e)}
                                                                    value={createData.type.id}
                                                                    name="type"
                                                                    defaultMessage="Chọn đối tác"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="col-md-6" style={{marginTop:10}}>
                                                                <FormInputText
                                                                    name="contract_number"
                                                                    label="Số hợp đồng"
                                                                    type="text"
                                                                    updateFormData={this.updateFormData}
                                                                    disabled={disableField}
                                                                    value={createData.contract_number}
                                                                    required
                                                                />
                                                                <FormInputMoney
                                                                    name="value"
                                                                    label="Giá trị hợp đồng"
                                                                    type="text"
                                                                    updateFormData={this.updateFormData}
                                                                    disabled={disableField}
                                                                    value={createData.value}
                                                                    required
                                                                />
                                                                <div>
                                                                    {
                                                                        disableField ? <div>Ngày hết hạn: {createData.due_date}</div> :
                                                                            <FormInputDateTime
                                                                                name="due_date"
                                                                                id="due_date"
                                                                                label="Ngày hết hạn"
                                                                                type="text"
                                                                                updateFormData={this.updateFormData}
                                                                                value={createData.due_date}
                                                                                required
                                                                            />
                                                                    }
                                                                </div>
                                                            </div>

                                                            
                                                                <div className="col-md-6">
                                                                    <div className="control-label" style={{marginTop:10}}>Ghi chú</div>
                                                                    <div className="comment-input-wrapper">
                                                                        <textarea
                                                                            id="textarea-card-comment"
                                                                            name="note"
                                                                            onChange={this.updateFormData}
                                                                            value={createData.note}
                                                                            onKeyUp={() => { }}
                                                                            placeholder="Nhập tại đây"
                                                                            className="comment-input"
                                                                            style={{ width: "100%", margin: "10px", height: "215px", }}
                                                                            disabled={disableField}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            

                                                        </div>
                                                    </div>

                                                    {!isInfoModal && <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                        {isCommitting ?
                                                            <button className="btn btn-fill btn-rose  disabled" type="button">
                                                                <i className="fa fa-spinner fa-spin" /> Đang lưu</button>
                                                            :
                                                            <div><button className="btn btn-fill btn-rose" type="button"
                                                                onClick={this.submitData} disabled={disableField}
                                                            >Lưu</button>
                                                                <button className="btn btn-fill" type="button" disabled={isCommitting}
                                                                    onClick={this.exit} style={{ marginLeft: 5 }}
                                                                >Hủy</button></div>
                                                        }



                                                    </div>}

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
                                                                url={createData.sign_staff.avatar_url || ""}
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
                                                                url={createData.staff.avatar_url || ""}
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
    params: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(CreateContractContainer);