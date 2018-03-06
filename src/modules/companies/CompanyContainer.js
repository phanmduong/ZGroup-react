import React from 'react';
import {Link} from 'react-router';
import CompaniesList from "./CompaniesList";
import InfoCompanyModal from "./InfoCompanyModal";
import * as CompanyActions from "./CompanyActions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import _ from 'lodash';
import ReactSelect from 'react-select';
import {Panel} from 'react-bootstrap';
import PropTypes from 'prop-types';

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
            page: 1,
            name: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(1, this.state.type, value,this.state.phone ,this.state.address, this.state.partner_code );
        }.bind(this), 500);
    }

    searchPhoneCompany(value) {
        this.setState({
            page: 1,
            phone: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(1, this.state.type, this.state.name,value ,this.state.address, this.state.partner_code );
        }.bind(this), 500);
    }
    searchAddressCompany(value) {
        this.setState({
            page: 1,
            address: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(1, this.state.type, this.state.name,this.state.phone,value , this.state.partner_code );
        }.bind(this), 500);
    }
    searchCodeCompany(value) {
        this.setState({
            page: 1,
            partner_code: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.CompanyActions.loadCompanies(1, this.state.type, this.state.name,this.state.phone, this.state.address,value  );
        }.bind(this), 500);
    }
    searchCompanybyType(e) {
        let p = e.value;
        this.setState({
            page: 1,
            type: p,
        });
        this.props.CompanyActions.loadCompanies(1, p, this.state.name, this.state.phone ,this.state.address, this.state.partner_code );
    }

    render() {
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
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">home</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Quản lý công ty đối tác</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-3">
                                                    <Link className="btn btn-rose" to="/business/company/create">
                                                        <i className="material-icons keetool-card">add</i>
                                                        Thêm Công Ty
                                                    </Link>
                                                </div>
                                                <div className="col-md-3">
                                                    <button className="btn btn-info btn-rose"
                                                            onClick={() => this.setState({openFilter: !this.state.openFilter})}>
                                                        <i className="material-icons">filter_list</i>
                                                        Lọc
                                                    </button>
                                                </div>
                                            </div>

                                            <Panel collapsible expanded={this.state.openFilter}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="col-sm-12">
                                                            <Search
                                                                className="col-md-9"
                                                                placeholder="Tìm kiếm theo mã công ty"
                                                                value={this.state.partner_code}
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
                                                                    value={this.state.type || ""}
                                                                    defaultMessage="Tuỳ chọn"
                                                                    name="type"
                                                                />
                                                            </div>
                                                            <Search
                                                                className="col-md-4"
                                                                placeholder="Tìm kiếm theo tên công ty"
                                                                value={this.state.name}
                                                                onChange={this.searchNameCompany}
                                                            />
                                                            <Search
                                                                className="col-md-4"
                                                                placeholder="Tìm kiếm theo số điện thoại công ty"
                                                                value={this.state.phone}
                                                                onChange={this.searchPhoneCompany}
                                                            />
                                                            <Search
                                                                className="col-md-4"
                                                                placeholder="Tìm kiếm theo địa chỉ công ty"
                                                                value={this.state.address}
                                                                onChange={this.searchAddressCompany}
                                                            />


                                                        </div>
                                                    </div>
                                                </div>
                                            </Panel>

                                        </div>
                                    </div>
                                    {
                                        this.props.isLoadingCompanies ? <Loading/> :
                                            <CompaniesList
                                                data={this.props.data || []}
                                                editCompany={this.editCompany}
                                                openInfoModal={this.openInfoModal}
                                            />
                                    }
                                    <ul className="pagination pagination-primary">
                                        {_.range(1, this.props.paginator.total_pages + 1).map(page => {

                                            if (Number(this.state.page) === page) {
                                                return (
                                                    <li key={page} className="active">
                                                        <a onClick={() => {
                                                            this.loadCompanies(page);
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={page}>
                                                        <a onClick={() => {
                                                            this.loadCompanies(page);
                                                        }}>{page}</a>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </ul>
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
        data: state.companies.company,
        paginator: state.companies.paginator,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CompanyActions: bindActionCreators(CompanyActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyContainer);