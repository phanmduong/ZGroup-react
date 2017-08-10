import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Link from "react-router/es/Link";
import Search from "../../components/common/Search";
import ListBase from "./ListBase";
import Loading from "../../components/common/Loading";
import _ from 'lodash';
// Import actions here!!
import * as baseListActions from './baseListActions';
import toastr from 'toastr';


class BasesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.basesSearchChange = this.basesSearchChange.bind(this);
        this.deleteBase = this.deleteBase.bind(this);
    }

    basesSearchChange() {

    }

    deleteBase(base) {
        if (confirm("Bạn có chắc muốn xoá cơ sở này")) {
            this.props.baseListActions.deleteBase(base);
        }
    }

    componentWillMount() {
        this.page = 1;
        if (this.props.location.query.page) {
            this.page = this.props.location.query.page;
        }
        this.props.baseListActions.loadBases(this.page);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.query.page && nextProps.location.query.page !== this.page) {
            this.page = nextProps.location.query.page;
            this.props.baseListActions.loadBases(this.page);
        } else if (!nextProps.location.query.page && this.props.location.query.page) {
            this.page = 1;
            this.props.baseListActions.loadBases(this.page);
        }
    }


    handleSwitch(state, baseId) {
        if (!state) {
            toastr.error("Phải luôn có 1 trụ sở");
        } else {
            this.props.baseListActions.setDefaultBase(baseId);
        }
    }


    render() {

        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <ul className="nav nav-tabs">
                        <li className="active"><Link to="/manage/quan-li-nhan-su">Cơ sở</Link></li>
                    </ul>

                    <div style={{marginTop: "15px"}}>
                        <Link to="/base/create" className="btn btn-primary">
                            Thêm cơ sở
                        </Link>
                    </div>

                    <Search
                        onChange={this.basesSearchChange}
                        value={this.props.searchTerm}
                        placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"
                    />
                    {this.props.isLoadingBases ? <Loading/> :
                        <ListBase
                            deleteBase={this.deleteBase}
                            handleSwitch={this.handleSwitch}
                            bases={this.props.bases}/>}

                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(this.page) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <Link to={"/base/list?page=" + page}>{page}</Link>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <Link to={"/base/list?page=" + page}>{page}</Link>
                                        </li>
                                    );
                                }

                            })}
                        </ul>
                    </div>

                </div>
            </div>
        );
    }
}

BasesContainer.propTypes = {
    isLoadingBases: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    baseListActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        bases: state.baseList.bases,
        isLoadingBases: state.baseList.isLoadingBases,
        totalPages: state.baseList.totalPages,
        currentPage: state.baseList.currentPage,
        searchTerm: state.baseList.searchTerm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasesContainer);