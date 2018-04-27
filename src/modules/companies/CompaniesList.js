import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';



class CompaniesList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        //let { partner_code, type, name, phone, address } = this.props.filterData;
        //let { searchCodeCompany, searchCompanybyType, searchNameCompany, searchPhoneCompany, searchAddressCompany } = this.props.filterAction;
        return (
            <div className="table-responsive" style={{minHeight: 400}}>

                <table id="datatables"
                    className="table table-hover"
                    cellSpacing="0" width="100%" style={{ width: "100%" }}>
                    <thead className="text-rose">
                        <tr>
                            <th>STT</th>
                            <th>Mã đối tác</th>
                            <th>Tên công ty</th>
                            <th>Địa chỉ văn phòng</th>
                            <th>Lĩnh vực</th>
                            <th>Số điện thoại liên hệ</th>
                            <th>Loại</th>
                            <th />

                        </tr>
                        {/*<tr>*/}
                            {/*<th />*/}
                            {/*<th>*/}
                                {/*<Search*/}
                                    {/*placeholder="Tìm theo mã công ty"*/}
                                    {/*value={partner_code}*/}
                                    {/*onChange={searchCodeCompany}*/}
                                {/*/>*/}
                            {/*</th>*/}
                            {/*<th>*/}
                                {/*<Search*/}
                                    {/*placeholder="Tìmtheo công ty"*/}
                                    {/*value={name}*/}
                                    {/*onChange={searchNameCompany}*/}
                                {/*/>*/}
                            {/*</th>*/}
                            {/*<th>*/}
                                {/*<Search*/}
                                    {/*placeholder="Tìm theo địa chỉ"*/}
                                    {/*value={address}*/}
                                    {/*onChange={searchAddressCompany}*/}
                                {/*/>*/}
                            {/*</th>*/}
                            {/*<th />*/}
                            {/*<th>*/}
                                {/*<Search*/}
                                    {/*placeholder="Tìm theo SĐT"*/}
                                    {/*value={phone}*/}
                                    {/*onChange={searchPhoneCompany}*/}
                                {/*/>*/}
                            {/*</th>*/}
                            {/*<th colSpan={2}>*/}
                                {/*<div>*/}
                                    {/*<label> Loại </label>*/}
                                    {/*<ReactSelect*/}
                                        {/*options={[*/}
                                            {/*{ value: '', label: 'Tất cả', },*/}
                                            {/*{ value: 'provided', label: 'Cung cấp', },*/}
                                            {/*{ value: 'share', label: 'Phân phối', },*/}
                                            {/*{ value: 'different', label: 'Khác', },*/}
                                        {/*]}*/}
                                        {/*onChange={searchCompanybyType}*/}
                                        {/*value={type || ""}*/}
                                        {/*defaultMessage="Tuỳ chọn"*/}
                                        {/*name="type"*/}
                                    {/*/>*/}
                                {/*</div>*/}
                            {/*</th>*/}

                        {/*</tr>*/}
                    </thead>
                    <tbody>
                        {

                            this.props.data && this.props.data.map((pp, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <a onClick={() => {
                                                return this.props.openInfoModal(pp);
                                            }}>
                                                {pp.partner_code}</a>

                                        </td>
                                        <td>{pp.name}</td>
                                        <td>{pp.office_address}</td>
                                        <td>{pp.field.name}</td>
                                        <td>{pp.phone_company}</td>
                                        <td>{
                                            (pp.type === "provided") ? "Cung cấp" :
                                                (pp.type === "share") ? "Phân phối" : "Khác"
                                        }</td>
                                        <td>
                                            <div className="btn-group-action">
                                                <div style={{ display: "inline-block" }}>
                                                    <Link data-toggle="tooltip" title="Sửa"
                                                        to={"/business/company/edit/" + pp.id}
                                                        type="button" rel="tooltip">
                                                        <i className="material-icons">edit</i>
                                                    </Link>
                                                </div>
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

CompaniesList.propTypes = {
    data: PropTypes.array.isRequired,
    editCompany: PropTypes.func,
    openInfoModal: PropTypes.func,
    filterData: PropTypes.object,
    filterAction: PropTypes.object,
};
export default CompaniesList;