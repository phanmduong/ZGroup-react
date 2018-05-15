import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as landingPageActions from './landingPageActions';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import ListLandingPage from "./ListLandingPage";
import Pagination from "../../components/common/Pagination";

class LandingPageContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: ""
        };
        this.timeOut = null;
        this.deleteLandingPage = this.deleteLandingPage.bind(this);
        this.searchLandingPageChange = this.searchLandingPageChange.bind(this);
        this.loadLoadingPages = this.loadLoadingPages.bind(this);
    }

    componentWillMount() {
        this.loadLoadingPages();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isDeleting !== this.props.isDeleting && !nextProps.isDeleting) {
            this.loadLoadingPages(this.state.page);
        }
    }

    searchLandingPageChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.landingPageActions.loadLandingPages(this.state.page, value);
        }.bind(this), 500);
    }

    deleteLandingPage(landingPage) {
        this.props.landingPageActions.deleteLandingPage(landingPage.id);
    }

    loadLoadingPages(page = 1) {
        this.setState({page});
        this.props.landingPageActions.loadLandingPages(page, this.state.query);
    }

    render() {
        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-content">
                                        <div className="flex-row flex">
                                            <h5 className="card-title">
                                                <strong>Danh sách Landing Page</strong>
                                            </h5>
                                            <div>
                                                <a
                                                    className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                    type="button" href="/build-landing-page">
                                                    <strong>+</strong>
                                                </a>
                                            </div>
                                        </div>
                                        <Search
                                            placeholder="Tìm kiếm"
                                            value={this.state.query}
                                            onChange={this.searchLandingPageChange}
                                        />
                                    </div>

                                    

                                    {this.props.isLoading ? <Loading/> :
                                        <ListLandingPage
                                            landingPages={this.props.landingPages}
                                            deleteLandingPage={this.deleteLandingPage}
                                        />
                                    }
                                    <Pagination
                                        totalPages={this.props.totalPages}
                                        currentPage={this.props.totalPages}
                                        loadDataPage={this.loadLoadingPages}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


LandingPageContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
    totalPages: PropTypes.number,
    landingPages: PropTypes.array,
    landingPageActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.landingPages.isLoading,
        isDeleting: state.landingPages.isDeleting,
        totalPages: state.landingPages.totalPages,
        landingPages: state.landingPages.landingPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        landingPageActions: bindActionCreators(landingPageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer);

