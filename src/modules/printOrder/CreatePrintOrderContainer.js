/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as printOrderActions from "./printOrderActions";
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import ReactSelect from 'react-select';
import FormInputText from "../../components/common/FormInputText";
import FormInputDate from "../../components/common/FormInputDate";
import {browserHistory} from 'react-router';
import * as helper from "../../helpers/helper";

class CreatePrintOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changeGood = this.changeGood.bind(this);
        this.changeCompany = this.changeCompany.bind(this);
        this.commitData = this.commitData.bind(this);
    }

    componentWillMount() {

        //this.props.printOrderActions.resetData();
        this.props.printOrderActions.loadAllGoods();
        this.props.printOrderActions.loadAllCompanies();

        //this.state.data = defaultData;
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
            this.setState({data: defaultData});
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("next", nextProps);
    // }

    updateFormData(e) {
        let name = e.target.name;
        let value = e.target.value;
        let attribute = name.split('-');
        let newdata = {...this.state.data};
        if (attribute[1]) {
            let newAttribute = {...this.state.data[attribute[0]]};
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
        //this.props.printOrderActions.updateFormData(newdata);
        this.setState({data: newdata});
    }

    changeGood(e) {
        let newdata = {...this.state.data, good: e};
        //this.props.printOrderActions.updateFormData(newdata);
        this.setState({data: newdata});
    }

    changeCompany(e) {
        let newdata = {...this.state.data, company: e};
        //this.props.printOrderActions.updateFormData(newdata);
        this.setState({data: newdata});
    }

    commitData() {
        let {data} = this.state;
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

    render() {
        let {companies, goods, isLoading, isCommitting} = this.props;
        let {data} = this.state;
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
//        console.log(total_price,VAT_price,data.core1.number,data.core1.price,data.core2.number,data.core2.price,data.cover1.number,data.cover1.price,data.cover2.number,data.cover2.price,data.spare_part1.number,data.spare_part1.price,data.spare_part2.number,data.spare_part2.price,data.packing1.price ,data.packing2.price,data.other.price)


        return (
            <div className="content">
                <div className="container-fluid">
                    {

                        (isLoading)

                            ?
                            <Loading/> :

                            <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card">
                                            <div className="card-header card-header-icon" data-background-color="rose">
                                                <i className="material-icons">assignment</i>
                                            </div>

                                            <div className="card-content">
                                                <h4 className="card-title">Chất liệu</h4>
                                                <div className="table-responsive">
                                                    <table id="datatables" className="table table-no-bordered"
                                                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                                                        <tbody>
                                                        <tr>
                                                            <td width="15%">Ruột 1</td>
                                                            <td><FormInputText
                                                                minValue="0"
                                                                label="Số trang"
                                                                type="number"
                                                                name="core1-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core1.number || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="core1-material"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core1.material || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="core1-color"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core1.color || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="number" minValue="0"
                                                                name="core1-size"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core1.size || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="core1-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core1.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ruột 2</td>
                                                            <td><FormInputText
                                                                label="Số trang"
                                                                type="number" minValue="0"
                                                                name="core2-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core2.number || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="core2-material"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core2.material || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="core2-color"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core2.color || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="number" minValue="0"
                                                                name="core2-size"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core2.size || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="core2-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.core2.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bìa 1</td>
                                                            <td><FormInputText
                                                                label="Số trang"
                                                                type="number" minValue="0"
                                                                name="cover1-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover1.number || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="cover1-material"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover1.material || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="cover1-color"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover1.color || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="number" minValue="0"
                                                                name="cover1-size"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover1.size || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="cover1-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover1.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bìa 2</td>
                                                            <td><FormInputText
                                                                label="Số trang"
                                                                type="number" minValue="0"
                                                                name="cover2-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover2.number || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="cover2-material"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover2.material || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="cover2-color"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover2.color || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="number" minValue="0"
                                                                name="cover2-size"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover2.size || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="cover2-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.cover2.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phụ kiện 1</td>
                                                            <td><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="spare_part1-name"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part1.name || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Số lượng"
                                                                type="number" minValue="0"
                                                                name="spare_part1-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part1.number || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="spare_part1-material"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part1.material || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Gia công"
                                                                type="text"
                                                                name="spare_part1-made_by"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part1.made_by || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="number" minValue="0"
                                                                name="spare_part1-size"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part1.size || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="spare_part1-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part1.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phụ kiện 2</td>
                                                            <td><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="spare_part2-name"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.name || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Số lượng"
                                                                type="number" minValue="0"
                                                                name="spare_part2-number"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.number || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="spare_part2-material"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.material || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Gia công"
                                                                type="text"
                                                                name="spare_part2-made_by"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.made_by || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="number" minValue="0"
                                                                name="spare_part2-size"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.size || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="number" minValue="0"
                                                                name="spare_part2-price"
                                                                updateFormData={this.updateFormData}
                                                                value={data.spare_part2.price || ""}
                                                                disabled={isCommitting}
                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1}>Đóng gói-
                                                                <wbr/>
                                                                Gia công
                                                                <wbr/>
                                                                1
                                                            </td>
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
                                                            <td colSpan={1}>Đóng gói-
                                                                <wbr/>
                                                                Gia công
                                                                <wbr/>
                                                                2
                                                            </td>
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
                                                                label="Ngày nhận hàng"
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
                                                            name="code"
                                                            updateFormData={() => {
                                                            }}
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
                                                                <i className="fa fa-spinner fa-spin"/> Đang tải lên
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
                                                                    helper.confirm("warning", "Hủy bỏ", "Bạn có chắc muốn hủy không?",
                                                                        () => {
                                                                            return browserHistory.push("/business/print-order");
                                                                        }
                                                                    );
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

CreatePrintOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isCommitting: PropTypes.bool,
    isLoadingInfoPrintOrder: PropTypes.bool,
    isLoadingGoods: PropTypes.bool,
    isLoadingCompanies: PropTypes.bool,
    user: PropTypes.object,
    companies: PropTypes.array,
    goods: PropTypes.array,
    data: PropTypes.object,
    printOrderActions: PropTypes.object.isRequired,
    params: PropTypes.object,

};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
        isCommitting: state.printOrder.isCommitting,
        isLoadingInfoPrintOrder: state.printOrder.isCommitting,
        isLoadingGoods: state.printOrder.isCommitting,
        isLoadingCompanies: state.printOrder.isCommitting,
        user: state.login.user,
        companies: state.printOrder.companies,
        goods: state.printOrder.goods,
        data: state.printOrder.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        printOrderActions: bindActionCreators(printOrderActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePrintOrderContainer);


let defaultData = {
    company: {id: null, name: ""},
    staff: {id: null, name: ""},
    good: {id: null, name: ""},
    quantity: 1,
    command_code: "",
    core1: {
        number: 1,
        material: "",
        color: "",
        size: 1,
        price: 1,
    },
    core2: {
        number: 1,
        material: "",
        color: "",
        size: 1,
        price: 1,
    },
    cover1: {
        number: 1,
        material: "",
        color: "",
        size: 1,
        price: 1,
    },
    cover2: {
        number: 1,
        material: "",
        color: "",
        size: 1,
        price: 1,
    },
    spare_part1: {
        name: "",
        number: 1,
        material: "",
        size: 1,
        price: 1,
        made_by: "",
    },
    spare_part2: {
        name: "",
        number: 1,
        material: "",
        size: 1,
        price: 1,
        made_by: "",
    },
    packing1: {
        name: "",
        price: 1,
    },
    packing2: {
        name: "",
        price: 1,
    },
    other: {
        name: "",
        price: 1,
    },
    price: 1,
    note: "",
    order_date: null,
    receive_date: null,
};