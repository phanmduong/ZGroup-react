/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as printOrderActions from "./printOrderActions";
import * as PropTypes from "prop-types";
import Loading from "../../components/common/Loading";
import ReactSelect from 'react-select';
import FormInputText from "../../components/common/FormInputText";

class CreatePrintOrderContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log("next", nextProps);

    }

    render() {


        let {companies, goods, data} = this.props;
        return (
            <div className="content">
                <div className="container-fluid">
                    {

                        (this.props.isLoading)

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
                                                    <table id="datatables" className="table table-no-bordered" cellSpacing="0" width="100%" style={{width: "100%"}}>
                                                        <tbody>
                                                        <tr>
                                                            <td width="15%">Ruột 1</td>
                                                            <td><FormInputText
                                                                label="Số trang"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core1.number || ""}

                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="material"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core1.material || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="color"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core1.color || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="text"
                                                                name="size"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core1.size || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core1.prize || ""}

                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ruột 2</td>
                                                            <td><FormInputText
                                                                label="Số trang"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core2.number || ""}

                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="material"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core2.material || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="color"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core2.color || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="text"
                                                                name="size"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core2.size || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.core2.prize || ""}

                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bìa 1</td>
                                                            <td><FormInputText
                                                                label="Số trang"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover1.number || ""}

                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="material"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover1.material || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="color"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover1.color || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="text"
                                                                name="size"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover1.size || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover1.prize || ""}

                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bìa 2</td>
                                                            <td><FormInputText
                                                                label="Số trang"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover2.number || ""}

                                                            /></td>
                                                            <td colSpan={2}><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="material"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover2.material || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Màu"
                                                                type="text"
                                                                name="color"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover2.color || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="text"
                                                                name="size"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover2.size || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.cover2.prize || ""}

                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phụ kiện 1</td>
                                                            <td><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part1.name || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Số lượng"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part1.number || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="material"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part1.material || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Gia công"
                                                                type="text"
                                                                name="color"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part1.made_by || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="text"
                                                                name="size"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part1.size || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part1.prize || ""}

                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phụ kiện 2</td>
                                                            <td><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part2.name || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Số lượng"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part2.number || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Chất liệu"
                                                                type="text"
                                                                name="material"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part2.material || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Gia công"
                                                                type="text"
                                                                name="color"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part2.made_by || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Khổ in"
                                                                type="text"
                                                                name="size"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part2.size || ""}

                                                            /></td>
                                                            <td><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.spare_part2.prize || ""}

                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1}>Đóng gói-<wbr/>Gia công<wbr/>1</td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.packing1.name || ""}

                                                            /></td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.packing2.prize || ""}

                                                            /></td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan={1}>Đóng gói-<wbr/>Gia công<wbr/>2</td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Tên"
                                                                type="text"
                                                                name="pageNum"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.packing2.name || ""}

                                                            /></td>
                                                            <td colSpan={3}><FormInputText
                                                                label="Giá"
                                                                type="text"
                                                                name="price"
                                                                updateFormData={() => {
                                                                }}
                                                                value={data.packing2.prize || ""}

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
                                                            disabled={this.props.isLoading}
                                                            options={companies}
                                                            onChange={() => {
                                                            }}
                                                            value={""}
                                                            name="company"
                                                            defaultMessage="Chọn nhà cung cấp"
                                                        /></div>
                                                    <div className="col-md-12">
                                                        <label>Sản phẩm</label>
                                                        <ReactSelect
                                                            disabled={this.props.isLoading}
                                                            options={goods}
                                                            onChange={() => {
                                                            }}
                                                            value={""}
                                                            name="good"
                                                            defaultMessage="Chọn sản phẩm"
                                                        /></div>
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
    user: PropTypes.object,
    companies: PropTypes.array,
    goods: PropTypes.array,
    data: PropTypes.array,

};

function mapStateToProps(state) {
    return {
        isLoading: state.printOrder.isLoading,
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