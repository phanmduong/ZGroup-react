/* eslint-disable no-undef */
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
import {confirm} from "../../helpers/helper";


class BasesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.basesSearchChange = this.basesSearchChange.bind(this);
        this.deleteBase = this.deleteBase.bind(this);
        this.loadBases = this.loadBases.bind(this);
        this.state = {
            page: 1,
            query: ""
        };
        this.timeOut = null;
    }

    componentWillMount() {
        this.loadBases();
    }

    deleteBase(base) {
        confirm("error", "Xoá", "Bạn có chắc chắn muốn xoá cơ sở này",
            function () {
                this.props.baseListActions.deleteBase(base);
            }.bind(this));
    }


    basesSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.baseListActions.loadBases(this.state.page, this.state.query);
        }.bind(this), 500);

    }

    loadBases(page = 1) {
        this.setState({page});
        this.props.baseListActions.loadBases(page, this.state.query);
    }


    handleSwitch(state, baseId) {
        if (!state) {
            toastr.error("Phải luôn có 1 trụ sở");
        } else {
            this.props.baseListActions.setDefaultBase(baseId);
        }
    }


    render() {
        const currentPage = this.state.page;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Cơ sở</h4>

                            <div style={{marginTop: "15px"}}>
                                <Link to="/base/create" className="btn btn-rose">
                                    Thêm cơ sở
                                </Link>
                            </div>

                            <Search
                                onChange={this.basesSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"
                            />

                            {this.props.isLoadingBases ? <Loading/> :
                                <ListBase
                                    deleteBase={this.deleteBase}
                                    handleSwitch={this.handleSwitch}
                                    bases={this.props.bases}/>}
                        </div>
                    </div>

                    <div className="card-content">
                        <ul className="pagination pagination-primary">
                            {_.range(1, this.props.totalPages + 1).map(page => {
                                if (Number(currentPage) === page) {
                                    return (
                                        <li key={page} className="active">
                                            <a onClick={() => this.loadBases(page)}>{page}</a>
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={page}>
                                            <a onClick={() => this.loadBases(page)}>{page}</a>
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
        currentPage: state.baseList.currentPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasesContainer);