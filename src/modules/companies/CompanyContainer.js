import React from 'react';
import {Link} from 'react-router';
import CompaniesList from "./CompaniesList";
import InfoCompanyModal from "./InfoCompanyModal";
import * as CompanyActions from "./CompanyActions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import ReactSelect from 'react-select';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Pagination from "../../components/common/Pagination";

class CompanyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            ok: 0,
            name: '',
            type: '',
            phone: '',
            address: '',
            partner_code: '',
            openFilter: false,
            company: {
                field: {
                    id: 1,
                },
            },
            showInfoModal: false,
            paginator: {
                current_page: 1,
                limit: 5,
                total_pages: 1,
                total_count: 1
            },
        };
        this.editCompany = this.editCompany.bind(this);
        this.loadCompanies = this.loadCompanies.bind(this);
        this.searchNameCompany = this.searchNameCompany.bind(this);
        this.searchPhoneCompany = this.searchPhoneCompany.bind(this);
        this.searchCodeCompany = this.searchCodeCompany.bind(this);
        this.searchAddressCompany = this.searchAddressCompany.bind(this);
        this.searchCompanybyType = this.searchCompanybyType.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);

    }

    componentWillMount() {
        this.props.CompanyActions.loadCompanies();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({paginator: nextProps.paginator});
    }

    loadCompanies(page = 1) {
        this.setState({
            page
        });
        this.props.CompanyActions.loadCompanies(page);
    }

    editCompany(id, data) {
        this.props.CompanyActions.editCompany(id, data);
    }

    openInfoModal(company) {
        this.setState({showInfoModal: true, company: company,});
    }

    closeInfoModal() {
        this.setState({showInfoModal: false});
    }

    searchNameCompany(value) {
        this.setState({
            page: this.props.paginator.current_page,
            name: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(this.props.paginator.current_page, this.state.type, value, this.state.phone, this.state.address, this.state.partner_code);
        }.bind(this), 500);
    }

    searchPhoneCompany(value) {
        this.setState({
            page: this.props.paginator.current_page,
            phone: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(this.props.paginator.current_page, this.state.type, this.state.name, value, this.state.address, this.state.partner_code);
        }.bind(this), 500);
    }

    searchAddressCompany(value) {
        this.setState({
            page: this.props.paginator.current_page,
            address: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(this.props.paginator.current_page, this.state.type, this.state.name, this.state.phone, value, this.state.partner_code);
        }.bind(this), 500);
    }

    searchCodeCompany(value) {
        this.setState({
            page: this.props.paginator.current_page,
            partner_code: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(this.props.paginator.current_page, this.state.type, this.state.name, this.state.phone, this.state.address, value);
        }.bind(this), 500);
    }

    searchCompanybyType(e) {
        let p = e.value;
        this.setState({
            page: this.props.paginator.current_page,
            type: p,
        });
        this.props.CompanyActions.loadCompanies(this.props.paginator.current_page, p, this.state.name, this.state.phone, this.state.address, this.state.partner_code);
    }

    render() {
        let {partner_code, type, name, phone, address} = this.state;
        return (
            <div className="content">
                <InfoCompanyModal
                    show={this.state.showInfoModal}
                    onHide={this.closeInfoModal}
                    data={this.state.company}
                />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">

                                <div className="card-content">
                                    <div className="flex" style={{justifyContent: "space-between"}}>
                                        <div className="flex">
                                            <h4 className="card-title"><strong> Quản lý công ty đối tác</strong></h4>
                                            <div style={{
                                                display: "inline-block"
                                            }}>
                                                {/*<div className="dropdown">*/}
                                                <Link
                                                    className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
                                                    type="button"
                                                    data-toggle="tooltip"
                                                    rel="tootip"
                                                    title="Tạo công ty"
                                                    to="/business/company/create"
                                                >
                                                    <strong>+</strong>
                                                </Link>
                                                {/*</div>*/}
                                                <button
                                                    className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                    data-toggle="tooltip"
                                                    rel="tooltip"
                                                    data-original-title="Lọc"
                                                    onClick={() => this.setState({openFilter: !this.state.openFilter})}
                                                    type="button">
                                                    <i className="material-icons"
                                                       style={{margin: "0px -4px", top: 0}}>filter_list</i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <Panel collapsible expanded={this.state.openFilter}>
                                        <div className="row">
                                                <div className="col-sm-12">
                                                    <Search
                                                        className="col-md-9"
                                                        placeholder="Tìm kiếm theo mã công ty"
                                                        value={partner_code}
                                                        onChange={this.searchCodeCompany}
                                                    />
                                                    <div className="col-md-3">
                                                        <label> Loại </label>
                                                        <ReactSelect
                                                            options={[
                                                                {value: '', label: 'Tất cả',},
                                                                {value: 'provided', label: 'Cung cấp',},
                                                                {value: 'share', label: 'Phân phối',},
                                                                {value: 'different', label: 'Khác',},
                                                            ]}
                                                            onChange={this.searchCompanybyType}
                                                            value={type || ""}
                                                            defaultMessage="Tuỳ chọn"
                                                            name="type"
                                                        />
                                                    </div>
                                                    <Search
                                                        className="col-md-4"
                                                        placeholder="Tìm kiếm theo tên công ty"
                                                        value={name}
                                                        onChange={this.searchNameCompany}
                                                    />
                                                    <Search
                                                        className="col-md-4"
                                                        placeholder="Tìm kiếm theo số điện thoại công ty"
                                                        value={phone}
                                                        onChange={this.searchPhoneCompany}
                                                    />
                                                    <Search
                                                        className="col-md-4"
                                                        placeholder="Tìm kiếm theo địa chỉ công ty"
                                                        value={address}
                                                        onChange={this.searchAddressCompany}
                                                    />


                                                </div>

                                        </div>
                                    </Panel>
                                    {
                                        this.props.isLoadingCompanies ? <Loading/> :
                                            <CompaniesList
                                                data={this.props.data || []}
                                                editCompany={this.editCompany}
                                                openInfoModal={this.openInfoModal}
                                                // filterData={{
                                                //     partner_code,
                                                //     phone,
                                                //     name,
                                                //     address,
                                                //     type,
                                                // }}
                                                // filterAction={{
                                                //     searchCodeCompany: this.searchCodeCompany,
                                                //     searchCompanybyType: this.searchCompanybyType,
                                                //     searchNameCompany: this.searchNameCompany,
                                                //     searchPhoneCompany: this.searchPhoneCompany,
                                                //     searchAddressCompany: this.searchAddressCompany,
                                                // }}
                                            />
                                    }
                                    <div>
                                        <Pagination
                                            totalPages={this.props.paginator.total_pages}
                                            currentPage={this.props.paginator.current_page}
                                            loadDataPage={this.props.CompanyActions.loadCompanies}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CompanyContainer.propTypes = {
    CompanyActions: PropTypes.object.isRequired,
    isLoadingCompanies: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    paginator: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        isLoadingCompanies: state.companies.isLoadingCompanies,
        data: state.companies.companyList,
        paginator: state.companies.paginator,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CompanyActions: bindActionCreators(CompanyActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer);