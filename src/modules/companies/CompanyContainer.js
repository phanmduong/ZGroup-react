import React from 'react';
import {Link} from 'react-router';
import CompaniesList from "./CompaniesList"
import * as CompanyActions from "./CompanyActions";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
class CompanyContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        this.props.CompanyActions.loadCompanies();
    }
    render(){
        return(
            <div className="content">
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
                                            <div className="col-md-3">
                                                <Link className="btn btn-rose" to="/business/company/create">
                                                    <i className="material-icons keetool-card">add</i>
                                                    Thêm Công Ty
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.props.isLoadingCompanies ? <Loading /> :
                                        <CompaniesList
                                           data={this.props.data}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoadingCompanies: state.companies.isLoadingCompanies,
        data: state.companies.company,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CompanyActions: bindActionCreators(CompanyActions, dispatch),
    };
}
export default connect(mapStateToProps,mapDispatchToProps) (CompanyContainer);