import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PasswordComponent from './PasswordComponent';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import * as passwordAction from "./passwordAction";
import EditPasswordModal from "./EditPasswordModal";
import Pagination from "../../components/common/Pagination";


class PasswordContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            limit : 20,
        };
        this.showEditPasswordModal = this.showEditPasswordModal.bind(this);
        this.loadAllPasswords = this.loadAllPasswords.bind(this);
    }

    componentWillMount() {
        this.props.passwordAction.loadAllPasswords(this.state.page,this.state.limit);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isUpdatingEditModal !== this.props.isUpdatingEditModal && !nextProps.isUpdatingEditModal) {
            this.props.passwordAction.loadAllPasswords(this.state.page,this.state.limit);        }
    }

    showEditPasswordModal(passwordAccount) {
        this.props.passwordAction.showEditPasswordModal();
        this.props.passwordAction.handlePassword(passwordAccount);
    }

    loadAllPasswords(page) {
        this.setState({page: page});
        this.props.passwordAction.loadAllPasswords(
            page,
           this.state.limit,
        );
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}/>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content">
                                              <h4 className="card-title">Danh sách chức năng</h4>
                                                <br/>
                                                {
                                                    this.props.isLoading ? <Loading/> :
                                                        (
                                                            <PasswordComponent
                                                                passwords={this.props.passwords}
                                                                showEditPasswordModal={this.showEditPasswordModal}
                                                            />
                                                        )
                                                }
                                            </div>
                                            <div className="row float-right">
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'right'}}>
                                                    <b style={{marginRight: '15px'}}>
                                                        Hiển thị kêt quả từ {first}
                                                        - {end}/{this.props.totalCount}</b><br/>
                                                    <Pagination
                                                        totalPages={this.props.totalPages}
                                                        currentPage={this.props.currentPage}
                                                        loadDataPage={this.loadAllPasswords || 0}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
                <EditPasswordModal/>
            </div>
        );
    }
}

PasswordContainer.propTypes = {
    passwordAction: PropTypes.object.isRequired,
    passwords: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUpdatingEditModal: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        passwords: state.passwordAccount.passwords,
        isLoading: state.passwordAccount.isLoading,
        isUpdatingEditModal: state.passwordAccount.isUpdatingEditModal,
        totalPages: state.passwordAccount.totalPages,
        totalCount: state.passwordAccount.totalCount,
        currentPage: state.passwordAccount.currentPage,
        limit: state.passwordAccount.limit,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        passwordAction: bindActionCreators(passwordAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordContainer);
