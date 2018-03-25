/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as printOrderActions from "./printOrderActions";
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import ReactSelect from 'react-select';
import FormInputText from "../../components/common/FormInputText";
import FormInputDate from "../../components/common/FormInputDate";
import { browserHistory } from 'react-router';
import * as helper from "../../helpers/helper";
import FormInputSelect from "../../components/common/FormInputSelect";
import AddPropertyModal from "./AddPropertyModal";

const nonSelectStyle = { marginTop: 44 };

class CreatePrintOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
            materials: [],
            colors: [],
            sizes: [],
            packings: [],
            showPropsModal: false,
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changeGood = this.changeGood.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.commitData = this.commitData.bind(this);
        this.openAddPropertyModal = this.openAddPropertyModal.bind(this);
        this.closeAddPropertyModal = this.closeAddPropertyModal.bind(this);
    }

    componentWillMount() {
        this.props.printOrderActions.loadAllGoods();
        this.props.printOrderActions.getAllproperties();
        this.props.printOrderActions.loadAllCompanies();
        if (this.props.params.printOrderId) {
            this.props.printOrderActions.loadPrintOrderInfo(this.props.params.printOrderId,
                (data) => {
                    this.setState({
                        data: {
                            ...data,
                            core1: JSON.parse(data.core1),
                            core2: JSON.parse(data.core2),
                            cover1: JSON.parse(data.cover1),
                            cover2: JSON.parse(data.cover2),
                            spare_part1: JSON.parse(data.spare_part1),
                            spare_part2: JSON.parse(data.spare_part2),
                            packing1: JSON.parse(data.packing1),
                            packing2: JSON.parse(data.packing2),
                            other: JSON.parse(data.other),
                        }
                    });
                }
            );
        } else {
            this.setState({ data: defaultData });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoadingPropers && !nextProps.isLoadingPropers) {
            let { properties } = nextProps;
            let materials = getProperty(properties, "material");
            let colors = getProperty(properties, "color");
            let sizes = getProperty(properties, "size");
            let packings = getProperty(properties, "packing");

            this.setState({ materials, colors, sizes, packings });
        }
    }

    updateFormData(e) {
        let name = e.target.name;
        let value = e.target.value;
        let attribute = name.split('-');
        let newdata = { ...this.state.data };
        if (attribute[1]) {
            let newAttribute = { ...this.state.data[attribute[0]] };
            newAttribute[attribute[1]] = value;
            newdata = {
                ...this.state.data,
                [attribute[0]]: newAttribute,
            };
        } else {
            newdata = {
                ...this.state.data,
                [attribute[0]]: value,
            };
        }
        this.setState({ data: newdata });
    }

    changeGood(e) {
        let newdata = { ...this.state.data, good: e };
        this.setState({ data: newdata });
    }

    changeCompany(e) {
        let newdata = { ...this.state.data, company: e };
        this.setState({ data: newdata });
    }

    commitData() {
        let { data } = this.state;
        if (data.quantity <= 0) {
            helper.showErrorNotification("Vui lòng thêm số lượng hợp lệ");
            return;
        }
        if (!data.company.id || !data.good.id) {
            helper.showErrorNotification("Vui lòng chọn Nhà cung cấp và Sản phẩm");
            return;
        }
        if (!data.order_date || !data.receive_date) {
            helper.showErrorNotification("Vui lòng chọn Ngày đặt in và Ngày nhận hàng");
            return;
        }
        if (this.props.params.printOrderId) {
            let commitData = {
                ...data,
                staff_id: this.props.user.id,
                company_id: data.company.id,
                good_id: data.good.id,
                core1: JSON.stringify(data.core1),
                core2: JSON.stringify(data.core2),
                cover1: JSON.stringify(data.cover1),
                cover2: JSON.stringify(data.cover2),
                spare_part1: JSON.stringify(data.spare_part1),
                spare_part2: JSON.stringify(data.spare_part2),
                packing1: JSON.stringify(data.packing1),
                packing2: JSON.stringify(data.packing2),
                other: JSON.stringify(data.other),
            };
            this.props.printOrderActions.editPrintOrder(commitData, () => {
                return browserHistory.push("/business/print-order");
            });
        } else {
            let commitData = {
                ...data,
                staff_id: this.props.user.id,
                company_id: data.company.id,
                good_id: data.good.id,
                core1: JSON.stringify(data.core1),
                core2: JSON.stringify(data.core2),
                cover1: JSON.stringify(data.cover1),
                cover2: JSON.stringify(data.cover2),
                spare_part1: JSON.stringify(data.spare_part1),
                spare_part2: JSON.stringify(data.spare_part2),
                packing1: JSON.stringify(data.packing1),
                packing2: JSON.stringify(data.packing2),
                other: JSON.stringify(data.other),
            };
            this.props.printOrderActions.createPrintOrder(commitData, () => {
                return browserHistory.push("/business/print-order");
            });
        }
    }

    openAddPropertyModal() {
        this.setState({ showPropsModal: true });
    }

    closeAddPropertyModal() {
        this.props.printOrderActions.getAllproperties();
        this.setState({ showPropsModal: false });
    }


    render() {
        let { companies, goods, isLoading, isCommitting, isLoadingPropers } = this.props;
        let { data, materials, sizes, packings, colors } = this.state;
        let total_price =
            data.core1.number * data.core1.price
            +
            data.core2.number * data.core2.price
            +
            data.cover1.number * data.cover1.price
            +
            data.cover2.number * data.cover2.price
            +
            data.spare_part1.number * data.spare_part1.price
            +
            data.spare_part2.number * data.spare_part2.price
            +
            data.packing1.price * 1 + data.packing2.price * 1
            +
            data.other.price * 1
            ;
        let VAT_price = Math.round(1.1 * total_price).toFixed(2);

        return (

            <div className="content">
                <AddPropertyModal
                    show={this.state.showPropsModal}
                    onHide={this.closeAddPropertyModal}
                    data={{ materials, sizes, packings, colors }}
                    editProperty={this.props.printOrderActions.editProperty}
                />
                <div className="container-fluid">
                    {(isLoading) ? <Loading /> :
                        <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose">
                                            <i className="material-icons">assignment</i>
                                        </div>

                                        <div className="card-content">
                                            <h4 className="card-title">Chất liệu</h4>
                                            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                                <button className="btn btn-fill btn-rose" type="button"
                                                    onClick={this.openAddPropertyModal}
                                                    disabled={isCommitting || isLoading || isLoadingPropers}
                                                >
                                                    <i className="material-icons">add</i>Thêm thuộc tính
                                                </button>
                                            </div>
                                            <div className="table-responsive">
                                                <table id="datatables" className="table table-no-bordered"
                                                    cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td width="15%">Ruột 1</td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                minValue="0"
                                                                label="Số trang"
                                                                type="number"
                                                                name="core1-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core1.number || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                            <td colSpan={2}>
                                                                <FormInputSelect
                                                                    data={materials}
                                                                    label="Chất liệu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="core1-material"
                                                                    value={data.core1.material || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={colors}
                                                                    label="Màu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="core1-color"
                                                                    value={data.core1.color || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={sizes}
                                                                    label="Khổ in"
                                                                    updateFormData={this.updateFormData}
                                                                    name="core1-size"
                                                                    value={data.core1.size || ""}
                                                                />

                                                            </td>

                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="core1-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core1.price || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ruột 2</td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Số trang"
                                                                type="number" minValue="0"
                                                                name="core2-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core2.number || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                            <td colSpan={2}>
                                                                <FormInputSelect
                                                                    data={materials}
                                                                    label="Chất liệu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="core2-material"
                                                                    value={data.core2.material || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={colors}
                                                                    label="Màu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="core2-color"
                                                                    value={data.core2.color || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={sizes}
                                                                    label="Khổ in"
                                                                    updateFormData={this.updateFormData}
                                                                    name="core2-size"
                                                                    value={data.core2.size || ""}
                                                                />
                                                            </td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="core2-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core2.price || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bìa 1</td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Số trang"
                                                                type="number" minValue="0"
                                                                name="cover1-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover1.number || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                            <td colSpan={2}>
                                                                <FormInputSelect
                                                                    data={materials}
                                                                    label="Chất liệu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="cover1-material"
                                                                    value={data.cover1.material || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={colors}
                                                                    label="Màu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="cover1-color"
                                                                    value={data.cover1.color || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={sizes}
                                                                    label="Khổ in"
                                                                    updateFormData={this.updateFormData}
                                                                    name="cover1-size"
                                                                    value={data.cover1.size || ""}
                                                                />
                                                            </td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="cover1-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover1.price || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bìa 2</td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Số trang"
                                                                type="number" minValue="0"
                                                                name="cover2-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover2.number || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                            <td colSpan={2}>
                                                                <FormInputSelect
                                                                    data={materials}
                                                                    label="Chất liệu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="cover2-material"
                                                                    value={data.cover2.material || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={colors}
                                                                    label="Màu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="cover2-color"
                                                                    value={data.cover2.color || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={sizes}
                                                                    label="Khổ in"
                                                                    updateFormData={this.updateFormData}
                                                                    name="cover2-size"
                                                                    value={data.cover2.size || ""}
                                                                />
                                                            </td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="cover2-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover2.price || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phụ kiện 1</td>
                                                            <td style={{ width: "15%" }}>
                                                                <div style={nonSelectStyle}><FormInputText
                                                                    label="Tên"
                                                                    type="text"
                                                                    name="spare_part1-name"
                                                                    updateFormData={this.updateFormData}
                                                                    value={data.spare_part1.name || ""}
                                                                    disabled={isCommitting}
                                                                /></div></td>
                                                            <td style={{ width: "10%" }}>
                                                                <div style={nonSelectStyle}><FormInputText
                                                                    label="Số lượng"
                                                                    type="number" minValue="0"
                                                                    name="spare_part1-number"
                                                                    updateFormData={this.updateFormData}
                                                                    value={data.spare_part1.number || ""}
                                                                    disabled={isCommitting}
                                                                /></div></td>
                                                            <td style={{ width: "15%" }}>
                                                                <FormInputSelect
                                                                    data={materials}
                                                                    label="Chất liệu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="spare_part1-material"
                                                                    value={data.spare_part1.material || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "10%" }}>
                                                                <FormInputSelect
                                                                    data={packings}
                                                                    label="Gia công"
                                                                    updateFormData={this.updateFormData}
                                                                    name="spare_part1-made_by"
                                                                    value={data.spare_part1.made_by || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "10%" }}>
                                                                <FormInputSelect
                                                                    data={sizes}
                                                                    label="Khổ in"
                                                                    updateFormData={this.updateFormData}
                                                                    name="spare_part1-size"
                                                                    value={data.spare_part1.size || ""}
                                                                />
                                                            </td>
                                                            <td style={{ width: "10%" }}>
                                                                <div style={nonSelectStyle}><FormInputText
                                                                    label="Giá"
                                                                    type="number" minValue="0"
                                                                    name="spare_part1-price"
                                                                    updateFormData={this.updateFormData}
                                                                    value={data.spare_part1.price || ""}
                                                                    disabled={isCommitting}
                                                                /></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phụ kiện 2</td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="spare_part2-name"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.name || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Số lượng"
                                                                type="number" minValue="0"
                                                                name="spare_part2-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.number || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                            <td>
                                                                <FormInputSelect
                                                                    data={materials}
                                                                    label="Chất liệu"
                                                                    updateFormData={this.updateFormData}
                                                                    name="spare_part2-material"
                                                                    value={data.spare_part2.material || ""}
                                                                />
                                                            </td>
                                                            <td>
                                                                <FormInputSelect
                                                                    data={packings}
                                                                    label="Gia công"
                                                                    updateFormData={this.updateFormData}
                                                                    name="spare_part2-made_by"
                                                                    value={data.spare_part2.made_by || ""}
                                                                />
                                                            </td>
                                                            <td>
                                                                <FormInputSelect
                                                                    data={sizes}
                                                                    label="Khổ in"
                                                                    updateFormData={this.updateFormData}
                                                                    name="spare_part2-size"
                                                                    value={data.spare_part2.size || ""}
                                                                />
                                                            </td>
                                                            <td><div style={nonSelectStyle}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="spare_part2-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.price || ""}
                                                                disabled={isCommitting}
                                                            /></div></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1}>{"Đóng gói - Gia công 1"}</td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="packing1-name"
                                                                updateFormData={this.updateFormData}
                                                                value={data.packing1.name || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="packing1-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.packing1.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1}>{"Đóng gói - Gia công 2"}</td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="packing2-name"
                                                                updateFormData={this.updateFormData}
                                                                value={data.packing2.name || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="packing2-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.packing2.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1}>Khác</td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="other-name"
                                                                updateFormData={this.updateFormData}
                                                                value={data.other.name || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="other-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.other.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>

                                                        <tr>
                                                            <td colSpan={1}>Thời gian</td>
                                                            <td colSpan={3}><FormInputDate
                                                                label="Ngày đặt in"
                                                                name="order_date"
                                                                updateFormData={this.updateFormData}
                                                                value={data.order_date || ""}
                                                                id="form-order-date"
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={3}><FormInputDate
                                                                label="Ngày nhận hàng dự kiến"
                                                                name="receive_date"
                                                                updateFormData={this.updateFormData}
                                                                value={data.receive_date || ""}
                                                                id="form-receive-date"
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose">
                                            <i className="material-icons">contacts</i>
                                        </div>

                                        <div className="card-content">
                                            <h4 className="card-title">Thông tin </h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>Nhà cung cấp</label>
                                                    <ReactSelect
                                                        disabled={this.props.isLoadingCompanies || isCommitting}
                                                        options={companies || []}
                                                        onChange={this.changeCompany}
                                                        value={data.company.id || ""}
                                                        name="company"
                                                        defaultMessage="Chọn nhà cung cấp"
                                                    /></div>
                                                <div className="col-md-12">
                                                    <label>Sản phẩm</label>
                                                    <ReactSelect
                                                        disabled={this.props.isLoadingGoods || isCommitting}
                                                        options={goods || []}
                                                        onChange={this.changeGood}
                                                        value={data.good.id || ""}
                                                        name="good"
                                                        defaultMessage="Chọn sản phẩm"
                                                    /></div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        name="quantity"
                                                        updateFormData={this.updateFormData}
                                                        value={data.quantity}
                                                        type="number"
                                                        minValue="0"
                                                        label="Số lượng in"
                                                        disabled={isLoading}
                                                    />
                                                </div>

                                                <div className="col-md-12">
                                                    <label className="control-label">Ghi chú</label>
                                                    <div className="comment-input-wrapper">
                                                        <textarea
                                                            id="textarea-card-comment"
                                                            name="note"
                                                            onChange={this.updateFormData}
                                                            value={data.note}
                                                            onKeyUp={() => {
                                                            }}
                                                            placeholder="Nhập ghi chú"
                                                            className="comment-input"
                                                            required
                                                            style={{
                                                                width: "100%",
                                                                margin: "10px",
                                                                height: "150px",
                                                            }}
                                                            disabled={isCommitting}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose">
                                            <i className="material-icons">contacts</i>
                                        </div>

                                        <div className="card-content">
                                            <h4 className="card-title">Kết quả</h4>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Tên sản phẩm"
                                                        type="text"
                                                        name="name"
                                                        updateFormData={() => {
                                                        }}
                                                        value={data.good.name || ""}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Mã sản phẩm"
                                                        type="text"
                                                        name="name"
                                                        updateFormData={() => { }}
                                                        value={data.good.code || ""}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Giá thành"
                                                        type="number" minValue="0"
                                                        name="totalprice"
                                                        updateFormData={() => {
                                                        }}
                                                        value={total_price || ""}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="col-md-12">
                                                    <FormInputText
                                                        label="Giá sau VAT(10%)"
                                                        type="number" minValue="0"
                                                        name="vatprice"
                                                        updateFormData={() => {
                                                        }}
                                                        value={VAT_price || ""}
                                                        disabled={true}
                                                    />
                                                </div>

                                                {this.props.isCommitting ?
                                                    <div className="col-md-12">
                                                        <button className="btn btn-rose  disabled" type="button"
                                                            disabled>
                                                            <i className="fa fa-spinner fa-spin" /> Đang tải lên
                                                        </button>
                                                    </div>

                                                    :
                                                    <div className="col-md-12">
                                                        <button
                                                            className="btn btn-fill btn-rose"
                                                            type="button"
                                                            onClick={this.commitData}
                                                            disabled={isCommitting}
                                                        > Lưu
                                                        </button>
                                                        <button
                                                            className="btn btn-fill btn-rose"
                                                            type="button"
                                                            onClick={() => {
                                                                helper.confirm("warning", "Thoát", "Bạn có chắc muốn hủy không?", () => {
                                                                    return browserHistory.push("/business/print-order");
                                                                });
                                                            }}
                                                        > Hủy
                                                        </button>
                                                    </div>

                                                }

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

function getProperty(arr, name) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        if (obj.name == name) {
            res = helper.isEmptyInput(obj.value) ? [] : JSON.parse(obj.value);
        }
    }
    res = res.map((itm) => { return { id: itm, name: itm }; });
    return res;
}

CreatePrintOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool,
    isLoadingInfoPrintOrder: PropTypes.bool,
    isLoadingGoods: PropTypes.bool,
    isLoadingCompanies: PropTypes.bool,
    isLoadingPropers: PropTypes.bool,
    user: PropTypes.object,
    companies: PropTypes.array,
    goods: PropTypes.array,
    data: PropTypes.object,
    printOrderActions: PropTypes.object.isRequired,
    params: PropTypes.object,
    router: PropTypes.object,
    route: PropTypes.object,
    properties: PropTypes.array,

};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
        isCommitting: state.printOrder.isCommitting,
        isLoadingInfoPrintOrder: state.printOrder.isLoadingInfoPrintOrder,
        isLoadingGoods: state.printOrder.isLoadingGoods,
        isLoadingCompanies: state.printOrder.isLoadingCompanies,
        isLoadingPropers: state.printOrder.isLoadingPropers,
        user: state.login.user,
        companies: state.printOrder.companies,
        goods: state.printOrder.goods,
        data: state.printOrder.data,
        properties: state.printOrder.properties,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        printOrderActions: bindActionCreators(printOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePrintOrderContainer);


let defaultData = {
    company: { id: null, name: "" },
    staff: { id: null, name: "" },
    good: { id: null, name: "" },
    quantity: 0,
    command_code: "",
    core1: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    core2: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    cover1: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    cover2: {
        number: 0,
        material: "",
        color: "",
        size: 0,
        price: 0,
    },
    spare_part1: {
        name: "",
        number: 0,
        material: "",
        size: 0,
        price: 0,
        made_by: "",
    },
    spare_part2: {
        name: "",
        number: 0,
        material: "",
        size: 0,
        price: 0,
        made_by: "",
    },
    packing1: {
        name: "",
        price: 0,
    },
    packing2: {
        name: "",
        price: 0,
    },
    other: {
        name: "",
        price: 0,
    },
    price: 0,
    note: "",
    order_date: null,
    receive_date: null,
};